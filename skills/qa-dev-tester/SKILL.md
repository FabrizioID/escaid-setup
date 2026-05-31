---
name: qa-dev-tester
description: Evaluador QA en dos momentos — auditoría pre-deploy del código (antes de tocar producción) y casuística de ejecución (después de deploy). Detecta riesgos en Code nodes, flujos de binarios, formBinaryData y helpers de n8n antes de que fallen en producción.
---

# QA Dev Tester

Opera en dos momentos distintos. El error más caro es el que se descubre cuando el usuario ya está probando en producción.

```
MOMENTO 1 — Antes de deployar  →  Auditoría de código (sin tocar producción)
MOMENTO 2 — Después de deployar →  Casuística de ejecución (con producción real)
```

Ambos momentos son obligatorios. No se salta el Momento 1.

---

## Detección Automática

1. Si el usuario dice "voy a deployar", "aplica este cambio", "agrega este nodo" → **activar Momento 1 primero**
2. Si el usuario dice "prueba esto", "testeá el workflow", "revisa la ejecución" → **Momento 2**
3. Si no está claro → preguntar: "¿Quieres auditar antes de deployar o revisar ejecuciones ya corridas?"

---

## MOMENTO 1 — Auditoría Pre-Deploy (ANTES de tocar producción)

Leer el código/nodo/workflow y detectar riesgos antes de que lleguen al servidor.

### 1A — Auditoría de Code Nodes

Para cada Code node nuevo o modificado, verificar:

**Helpers de n8n — riesgo alto**
- ¿El código llama a `this.helpers.*` o `$helpers.*`?
  - Si sí → **FLAG**: helpers no garantizados. Debe verificarse en aislado antes de conectar al flujo.
  - Método: deployar el nodo con try/catch que liste `Object.keys(this.helpers || {})` y ejecutar una vez en n8n UI antes de conectar.
  - Helpers de alto riesgo: `getBinaryDataBuffer`, `prepareBinaryData`, `httpRequest`, `binaryToBuffer`

**Modo de ejecución vs helpers**
- `runOnceForAllItems` + `this.helpers.*` → **ERROR**: helpers no disponibles en este modo
- `runOnceForEachItem` + `this.helpers.*` → OK, pero verificar igual

**Binarios creados en Code node**
- ¿El código usa `prepareBinaryData` y el resultado va a un httpRequest `formBinaryData`?
  - Si sí → **FLAG**: el binario resultante será `filesystem-v2` y el httpRequest NO podrá leerlo
  - Fix obligatorio: usar base64 inline en su lugar

**Retorno del nodo**
- ¿El `return` siempre devuelve un array? ¿Cubre el caso de error con try/catch visible?
- ¿El nodo puede retornar `undefined` o `null` en algún path? → falla silenciosa

---

### 1B — Auditoría de httpRequest con formBinaryData

Para cada httpRequest que use `formBinaryData`, verificar campo por campo:

| Check | Señal de riesgo |
|---|---|
| `value` vacío `""` en algún parámetro | **BUG**: n8n defaultea a `data` — todos los campos con value vacío mandan el mismo binario |
| Binario viene de Code node con `prepareBinaryData` | **BUG**: filesystem-v2 scope — el httpRequest no lo puede leer |
| Binario viene de descarga (httpRequest/Drive) y no pasó por conversión | **RIESGO**: filesystem-v2 — verificar si el httpRequest destino puede leerlo |
| `image[]` con múltiples entradas hacia OpenAI `/edits` | Verificar que image[0] es el canvas base, no una foto real |

---

### 1C — Auditoría de Flujo de Binarios

Trazar el camino de cada binario desde su origen hasta su consumidor final:

```
Origen → Nodo intermedio → Consumidor final
```

Para cada binario en el flujo, responder:
1. ¿Dónde se crea? (httpRequest download, Drive, Code node, etc.)
2. ¿En qué formato queda? (base64 inline / filesystem-v2)
3. ¿Quién lo consume? (otro Code node / httpRequest formBinaryData)
4. ¿Es compatible el formato origen con lo que espera el consumidor?

**Tabla de compatibilidad:**

| Origen del binario | Consumidor | Compatible |
|---|---|---|
| httpRequest download | httpRequest formBinaryData | ⚠️ Depende de versión — verificar con diagnóstico |
| Google Drive node download | httpRequest formBinaryData | ⚠️ Mismo riesgo — filesystem-v2 |
| Code node `prepareBinaryData` | httpRequest formBinaryData | ❌ NO — filesystem-v2 scope incompatible |
| Code node base64 inline `{ data: b64, mimeType }` | httpRequest formBinaryData | ✅ Siempre funciona |
| Cualquier binario | Code node `runOnceForAllItems` | ✅ Solo lectura, no necesita helpers |
| Cualquier binario | Code node `runOnceForEachItem` + `this.helpers` | ✅ Con verificación previa |

---

### 1D — Auditoría de Conexiones y Rutas

- ¿Todos los outputs del Switch/IF tienen nodo conectado? (outputs sin conectar = datos que desaparecen silenciosamente)
- ¿Los nodos de error tienen manejo explícito o simplemente no conectan?
- ¿El flujo puede terminar sin responder al usuario en algún path?

---

### Reporte del Momento 1

```
## Auditoría Pre-Deploy

### Riesgos Críticos (bloquean deploy)
- [ ] Code node "X": usa this.helpers.getBinaryDataBuffer sin verificar disponibilidad
- [ ] httpRequest "Y": formBinaryData value="" en 3 parámetros → todos mandan mismo binario

### Riesgos Medios (pueden fallar en casos edge)
- [ ] ...

### OK
- [ ] ...

Veredicto: BLOQUEAR deploy hasta resolver críticos / OK para deploy
```

**Regla:** Si hay un riesgo crítico → no deployar hasta resolverlo. Proponer el fix primero.

---

## MOMENTO 2 — Casuística de Ejecución (DESPUÉS de deploy)

### Paso 0 — Precondiciones obligatorias

**1. Verificar instancia del MCP**
```
GET https://VPS/api/v1/executions?workflowId=ID&limit=3
```
Si devuelve 0 → MCP apunta a instancia incorrecta. Usar REST API directa.

**2. Leer firma de ejecuciones recientes**

| Firma | Diagnóstico | Acción |
|---|---|---|
| `finished: false` + <5 seg + runData vacío | Falla de infra | Verificar dependencias externas antes de generar casos |
| `finished: true` + `status: error` | Falla de lógica | Identificar nodo fallido con `includeData=true` |
| Todo success | Workflow OK | Proceder con casuística |

**3. Workflow activo**: confirmar `active: true`

**4. Sesiones contaminadas**: si el workflow usa `staticData`, aislar estado entre casos

---

### Simulación de recorrido de usuario (User Journey)

**Protocolo genérico — aplicar antes de cualquier casuística abstracta.**

El recorrido de usuario es la prueba más valiosa porque simula exactamente lo que hará una persona real en producción, en el orden en que lo haría.

#### Paso 1 — Mapear los recorridos principales

Para el workflow a testear, identificar los 2-4 flujos que un usuario real usaría con más frecuencia:

```
Recorrido A: [nombre] — [trigger] → [resultado esperado]
Recorrido B: [nombre] — [trigger] → [resultado esperado]
Recorrido C: [nombre] — [trigger con variante] → [resultado esperado distinto]
```

Ejemplo para bot WhatsApp con sw-premium:
```
A — Usuario con foto en Drive:   !genbot premium → flyer con fotos reales
B — Usuario sin foto:            !genbot premium → flyer generado desde texto
C — Propiedad no encontrada:     !genbot premium → mensaje de error amigable
```

#### Paso 2 — Trazar checkpoints por recorrido

Para cada recorrido, mapear el camino nodo a nodo como una cadena de checkpoints:

```
[Trigger] → [Nodo 1] → [Decisión] → [Nodo 2] → ... → [Respuesta al usuario]
     ↓            ↓          ↓            ↓                    ↓
  ¿llegó?    ¿output OK?  ¿branch     ¿datos            ¿recibió el
             ¿formato?    correcto?   correctos?         resultado?
```

Cada checkpoint responde: **¿el output de este nodo es el input correcto para el siguiente?**

Señales de ruptura de cadena:
- Output tiene keys distintos a los que espera el nodo siguiente
- Binario en formato incompatible (filesystem-v2 → httpRequest)
- Branch equivocado en IF/Switch
- Array vacío donde se esperan items
- Nodo termina pero el siguiente no se ejecuta

#### Paso 3 — Ejecutar en orden real

1. Disparar el trigger exactamente como lo haría el usuario (mismo payload, mismo canal)
2. Verificar cada checkpoint con `GET /executions/ID?includeData=true`
3. Anotar en qué checkpoint se rompe la cadena — ese es el nodo a reparar
4. NO pasar al siguiente recorrido hasta que el actual complete de inicio a fin

#### Paso 4 — Recorridos de error intencional

Después de que los recorridos happy path funcionan, probar los caminos de error que el usuario podría triggear:
- ¿Qué pasa si el usuario manda el comando en un grupo incorrecto?
- ¿Qué pasa si el usuario manda el comando dos veces seguidas?
- ¿Qué pasa si el dato que necesita el workflow no existe en Sheets/Drive?
- ¿El usuario recibe un mensaje de error útil o silencio?

#### Recorridos de referencia para este proyecto

**Bot WhatsApp (clientefull02 + sub-workflows):**
```
!new prop → acumula mensajes/fotos → !new prop fin → sw-registrar → confirmación
!genbot premium → sw-premium → flyer → Drive → WhatsApp
!genbot catalogo → sw-catalogo → PDF → WhatsApp
Mensaje en grupo incorrecto → silencio (sin respuesta)
Mismo mensaje x2 → una sola respuesta
```

**Para cada nuevo workflow:** documentar sus 3-4 recorridos aquí antes de ejecutar casos abstractos.

---

### Casuística para workflows n8n

**Happy path:**
- Input completo válido de inicio a fin
- Verificar cada nodo intermedio, no solo el resultado final

**Casos límite:**
- Input vacío `{}`
- Campos null/undefined
- Sin foto → ¿genera diseño desde texto o falla?
- Con foto Cloudinary → path A funciona
- Con foto Drive → path B funciona
- Sin foto en ningún lado → path C (sin foto) funciona

**Casos de binarios (cuando el flujo tiene imágenes):**
- Verificar en el output de cada nodo: `dataPrefix` de los binarios
  - Base64 real: empieza con `iVBOR`, `/9j/`, `R0lGOD`, etc.
  - Filesystem-v2: empieza con `filesystem-v2://` → **RIESGO** si va a httpRequest formBinaryData
- Después del nodo de conversión: confirmar que `dataPrefix` ya no es `filesystem-v2`

**Casos de error externo:**
- OpenAI no responde / responde 4xx
- Drive folder vacío
- Sheets sin propiedad encontrada

---

### Ejecución

1. Completar Paso 0 (precondiciones)
2. `validate_workflow` — errores estructurales
3. Simular recorrido de usuario real primero
4. Luego casos límite y de error
5. Para cada ejecución con error: obtener con `includeData=true` y reportar nodo fallido + input exacto

---

## MOMENTO 3 — Stress Testing y Concurrencia

**Cuándo activar:** workflows de bots o sistemas que reciben múltiples requests simultáneos (WhatsApp, webhooks, APIs). Activar siempre antes de primera puesta en producción con carga real, o cuando el usuario reporte comportamiento extraño bajo carga.

**Por qué importa:** el happy path funciona con 1 usuario. El sistema se rompe con 5 usuarios simultáneos, mensajes duplicados en ráfaga, sesiones que se solapan, o Code nodes pesados que saturan el task runner. Estos fallos son los más difíciles de reproducir y los que más daño hacen en producción.

---

### 3A — Casos de Concurrencia

**Ráfaga simultánea**
- Enviar N requests al mismo tiempo (N = `N8N_CONCURRENCY_PRODUCTION_LIMIT` + 2 para estresar el límite)
- ¿El task runner acepta todos, rechaza los extras limpiamente, o crashea?
- Señal de crash: ejecuciones quedan en estado `new` sin progresar + logs `Offer expired`

**Mismo usuario, mensaje duplicado**
- Enviar el mismo `messageId` dos veces con < 500ms entre ellos
- ¿El dedup del staticData funciona? → solo una ejecución llega a procesar
- Señal de falla: dos respuestas llegan al usuario o el staticData queda en estado corrupto

**Dos usuarios, mismo grupo, comandos distintos**
- Usuario A abre sesión `!new prop` + Usuario B manda `!genbot premium` al mismo tiempo
- ¿Los sessions en staticData se aíslan correctamente por `groupJid`?
- Señal de falla: la sesión de A contiene datos de B o viceversa

**Sesión larga + timeout**
- Abrir sesión, esperar exactamente `SESSION_TIMEOUT + 1 segundo`, intentar acumular
- ¿La sesión expiró limpiamente? ¿El mensaje llega como nuevo comando o como acumulación huérfana?

**Flujo pesado (Code node + API externa) bajo carga**
- Lanzar 3-5 ejecuciones de sw-premium simultáneamente (cada una llama a OpenAI)
- ¿Todas completan? ¿Alguna queda en `waiting` o `new`?
- Si el límite de concurrencia está activo: ¿las extra esperan en cola o fallan?

---

### 3B — Cómo ejecutar stress test en n8n

**Método A — REST API paralela** (para workflows con webhook trigger):
```bash
# Enviar N requests casi simultáneos
for i in 1 2 3 4 5; do
  curl -s -X POST "https://VPS/webhook/ID" \
    -H "Content-Type: application/json" \
    -d '{"test": true, "idx": '$i'}' &
done
wait
```

**Método B — Monitor de ejecuciones durante la ráfaga**:
```bash
# Monitorear estado cada 2 segundos durante 30 segundos
GET /api/v1/executions?workflowId=ID&limit=20&includeData=false
# Buscar: cuántas en status=new, running, error, success
```

**Señales de alerta bajo carga**:

| Señal | Causa probable | Fix |
|---|---|---|
| Ejecuciones acumulándose en `new` | Task runner saturado | Bajar `N8N_CONCURRENCY_PRODUCTION_LIMIT` |
| `Offer expired` en logs del contenedor | Task runner timeout | Mismo fix + revisar `N8N_RUNNERS_TASK_TIMEOUT` |
| Respuestas duplicadas al usuario | Dedup en staticData no funciona bajo carga | Revisar lógica de dedup con messageId |
| Sesiones mezcladas entre usuarios | staticData no aislado por jid | Revisar que la key sea `sessions[groupJid]` no `sessions` global |
| Error 500 en webhook | n8n colapsó bajo carga | `N8N_CONCURRENCY_PRODUCTION_LIMIT` demasiado alto |

---

### 3C — Umbrales recomendados para este VPS

Basado en incidentes producción (mayo 2026):

| Variable | Valor seguro | Valor que crashea |
|---|---|---|
| `N8N_CONCURRENCY_PRODUCTION_LIMIT` | 5 | 10+ con Code nodes pesados |
| `N8N_RUNNERS_TASK_TIMEOUT` | 60s | por defecto, OK |
| Ejecuciones simultáneas de sw-premium | 2-3 | 5+ (OpenAI calls paralelas) |
| Mensajes WhatsApp simultáneos | 5 | 10+ sin límite de concurrencia |

---

### 3D — Reporte de Stress Test

```
## Stress Test — [workflow] — [fecha]

| Caso | Carga | Resultado | Observación |
|---|---|---|---|
| Ráfaga 5 mensajes simultáneos | 5 concurrent | ✅ OK | Todas completan en <8s |
| Mensaje duplicado (mismo ID) | x2 en 200ms | ✅ OK | Dedup funciona — 1 respuesta |
| 2 sesiones simultáneas distintos usuarios | 2 concurrent | ❌ FALLA | staticData se mezcla |
| 3 sw-premium paralelos | 3 concurrent | ⚠️ WARN | El 3ro queda en waiting 12s |

Límite seguro identificado: X ejecuciones concurrentes
Recomendación: [acción concreta]
```

---

## Relación entre qa-dev-tester y n8n-testing pill

**División de responsabilidad:**

| Capa | Herramienta | Qué hace |
|---|---|---|
| Pre-deploy (código) | `qa-dev-tester` Momento 1 | Audita el código antes de que llegue al servidor |
| Post-deploy funcional | `qa-dev-tester` Momento 2 | Happy path + casos límite + recorrido de usuario |
| Post-deploy carga | `qa-dev-tester` Momento 3 | Stress, concurrencia, timing, saturación |
| Debugging en producción | `n8n-testing` Modo A | Diagnostica qué se rompió en una ejecución real |
| Pre-deploy lógica de routing | `n8n-testing` Modo B | Runner local para nodo de normalización/routing |

**Cuándo usar cada uno:**

- Desarrollando algo nuevo → `qa-dev-tester` Momento 1 primero, luego Momentos 2 y 3
- Algo se rompió en producción → `n8n-testing` Modo A (no tocar código hasta saber qué es)
- Cambiando lógica del router/normalizer → `n8n-testing` Modo B (runner local antes de deploy)
- Primera vez que sale a producción con usuarios reales → `qa-dev-tester` Momento 3 obligatorio

**No duplicar:** el diagnóstico de nodo fallido específico (`includeData=true`, firma de ejecuciones) vive en `n8n-testing`. El QA skill lo referencia pero no lo repite. Si hay conflicto, `n8n-testing` es la fuente de verdad para debugging.

---

## Modo Landing (HTML/Frontend)

**Navegación:**
- Cargar URL, verificar carga sin errores de consola JS
- Todos los elementos críticos visibles (hero, CTA, formulario)
- No hay imágenes rotas

**Interacción:**
- Cada botón CTA: clic y verificar destino
- Formulario vacío → validación correcta
- Formulario con datos inválidos → validación correcta
- Formulario con datos válidos → submit funciona

**Responsive:**
- Mobile 375px — sin overflow horizontal
- Tablet 768px — layout correcto
- Desktop 1280px — diseño completo

**Ejecución**: Playwright MCP — navigate → snapshot → resize → fill/click → screenshot → console_messages

---

## Modo Script (Python / C#)

**Inputs normales:** caso típico, datos mínimos válidos

**Inputs límite:** `""`, `[]`, `{}`, `None`, `0`, `-1`, overflow

**Errores esperados:** archivo no existe, ruta inválida, API falla, permisos

**Datos malformados:** JSON inválido, encoding inesperado, fecha incorrecta

**Ejecución**: leer script → identificar entradas/dependencias/puntos de fallo → ejecutar con Bash/PowerShell → capturar stdout/stderr/exit code

---

## Reporte Final

```
| Caso                            | Resultado | Observación                              |
|---------------------------------|-----------|------------------------------------------|
| Happy path completo             | ✅ OK     | Flyer generado y enviado                 |
| Foto Drive → binario formato    | ❌ FALLA  | filesystem-v2 llega a GPT Edits          |
| Sin foto → diseño texto         | ✅ OK     |                                          |
| formBinaryData value vacío      | ❌ FALLA  | Detectado en Auditoría Pre-Deploy        |
```

Terminar con:
- **Críticos a corregir** — fallan en producción real
- **Mejoras posibles** — no rompen pero no son robustos
- **Sólido** — confirmado funcionando

---

## Reglas

- **Momento 1 es obligatorio antes de deployar.** No hay excepción.
- No modificar el desarrollo evaluado en Momento 2. Solo leer, ejecutar y reportar.
- Si un caso no se puede automatizar → "manual requerido" con instrucciones exactas.
- Ser directo: qué falla, por qué, sin suavizar.
- El testeo termina cuando hay al menos una ejecución real completa con `finished: true` verificada.
