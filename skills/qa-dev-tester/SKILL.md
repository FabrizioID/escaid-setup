---
name: qa-dev-tester
description: Evaluador de casuística QA para cualquier desarrollo terminado. Usar cuando el usuario quiera probar un workflow n8n, una landing, o un script Python/C# contra casos límite y ver cómo reacciona. Genera casos de prueba agresivos, los ejecuta usando los MCPs disponibles, y reporta resultados en chat. No requiere setup externo.
---

# QA Dev Tester

Evalúa cualquier desarrollo terminado generando y ejecutando casuística agresiva: casos normales, límite, vacíos, errores esperados y escenarios de fallo.

## Detección Automática

Antes de cualquier acción, identificar el tipo de desarrollo:

1. Si el usuario menciona nodos, workflow, n8n, ejecución → **Modo Workflow**
2. Si menciona HTML, landing, página, formulario, responsive → **Modo Landing**
3. Si menciona script, función, Python, C#, código → **Modo Script**
4. Si no está claro, preguntar con una sola pregunta: "¿Es un workflow n8n, una landing, o un script?"

---

## Modo Workflow (n8n)

### Paso 0 — Precondiciones antes de generar casos (OBLIGATORIO)

Antes de generar o ejecutar cualquier caso de prueba:

**1. Verificar qué instancia usa el MCP**
El MCP n8n puede estar apuntando a `aecode.app.n8n.cloud` mientras el workflow a testear vive en el VPS. Confirmar con una ejecución reciente:
```bash
GET https://VPS/api/v1/executions?workflowId=ID&limit=3&includeData=false
```
Si devuelve 0 resultados → el MCP apunta a la instancia equivocada. Usar REST API directa.

**2. Leer la firma de ejecuciones recientes**
```bash
GET https://VPS/api/v1/executions?workflowId=ID&limit=10&includeData=false
```

| Firma | Lo que indica | Qué hacer antes de testear |
|---|---|---|
| `finished: false` + 1-5 seg + runData vacío | Infra caída (servidor externo, connection refused) | Verificar dependencias externas. Tests van a fallar por infra, no por lógica |
| `finished: true` + error | Fallo de lógica en nodo específico | Identificar el nodo fallido antes de generar casos |
| Todo success | Workflow funcionando | Proceder con casuística normal |

> Si la firma muestra `finished: false` → NO ejecutar casos de prueba todavía. Primero confirmar que la infraestructura externa responde (`curl http://host:puerto`, credenciales válidas, sub-workflows activos). Los tests son válidos solo cuando la infra está confirmada.

**3. Verificar que el workflow está activo**
Un workflow inactivo devuelve error inmediato. Confirmar `active: true` antes de testear.

**4. Para bots con `staticData` (sesiones): aislar estado entre casos**
Si el workflow usa `$getWorkflowStaticData('global')` para sesiones (`propSessions`, `loteSessions`), los casos de prueba pueden contaminarse entre sí.
- Cada caso de sesión debe comenzar con estado limpio
- Documentar en el reporte si un caso falló por estado residual de otro caso
- Preferir ejecutar casos de sesión en orden: open → acumular → close

---

### Casuística a generar siempre

**Casos felices (happy path):**
- Input completo y válido con datos reales o mock
- Flujo ejecutado de inicio a fin sin interrupciones

**Casos límite:**
- Input vacío `{}`
- Input con campos null o undefined
- Input con strings vacíos `""`
- Números negativos, cero, valores extremos (0, -1, 999999)
- Fechas inválidas o fuera de rango

**Casos de error externo:**
- API no responde (timeout simulado)
- API responde con error 4xx o 5xx
- Credencial expirada o inválida
- Webhook recibe payload malformado

**Casos de datos:**
- Lista vacía donde se espera array con datos
- Array con un solo elemento
- Array con 1000+ elementos
- Datos con caracteres especiales, tildes, emojis

### Casos específicos para bots WhatsApp (Evolution API + sesiones)

Si el workflow es un bot de WhatsApp con routing de comandos:

| Caso | Qué verifica |
|---|---|
| Comando correcto + grupo objetivo | Routing al sub-workflow correcto |
| Mismo messageId enviado 2 veces | Dedup funciona — responde solo una vez |
| Grupo incorrecto | `is_target_group: false` → ignorado sin respuesta |
| Sesión abierta + audio/video | No acumula (`es_xxx_acumulado: false`) |
| Sesión abierta + texto/imagen | Sí acumula (`es_xxx_acumulado: true`) |
| Comando `fin` sin sesión activa | No falla, ignora o responde apropiado |
| Sesión expirada (>5 min sin actividad) | No acumula, `prop_active: false` |

Para estos casos, usar el QA runner local antes de testear en VPS:
```bash
node test-normalizar.js <ruta-al-jsCode-del-nodo.js>
```
El runner auto-detecta comandos, grupos objetivo y tipos de sesión escaneando el código. Genera los casos solos.

### Ejecución

1. Completar Paso 0 (precondiciones) antes de cualquier test
2. Usar `mcp__n8n__n8n_validate_workflow` — reportar errores estructurales
3. Para Code nodes de routing: correr QA runner local primero (rápido, sin tocar producción)
4. Usar `mcp__n8n__n8n_test_workflow` con cada caso generado
5. Revisar ejecuciones con `GET /api/v1/executions/ID?includeData=true` para ver qué datos fluyeron
6. Si hay error en un nodo, reportar: qué nodo falló, qué input lo provocó, qué devolvió

---

## Modo Landing (HTML/Frontend)

### Casuística a generar siempre

**Navegación y carga:**
- Cargar la URL y verificar que la página responde (sin errores de consola JS)
- Verificar que todos los elementos críticos están visibles (hero, CTA, formulario)
- Verificar que no hay imágenes rotas

**Interacción:**
- Hacer clic en cada botón CTA y verificar que redirige o abre lo correcto
- Si hay formulario: enviar con todos los campos vacíos
- Si hay formulario: enviar con datos inválidos (email sin @, teléfono con letras)
- Si hay formulario: enviar con datos válidos completos

**Responsive:**
- Viewport mobile 375px — verificar que no hay overflow horizontal
- Viewport tablet 768px — verificar que el layout cambia correctamente
- Viewport desktop 1280px — verificar diseño completo

**Rendimiento visual:**
- Screenshot completo para detectar elementos rotos visualmente

### Ejecución

1. Usar `mcp__playwright__browser_navigate` con la URL
2. Usar `mcp__playwright__browser_snapshot` para auditar el DOM
3. Usar `mcp__playwright__browser_resize` para cambiar viewports
4. Usar `mcp__playwright__browser_fill_form` + `mcp__playwright__browser_click` para interacciones
5. Usar `mcp__playwright__browser_take_screenshot` al final de cada viewport
6. Reportar errores de consola con `mcp__playwright__browser_console_messages`

---

## Modo Script (Python / C#)

### Casuística a generar siempre

**Inputs normales:**
- Caso típico de uso con datos reales
- Caso con datos mínimos válidos

**Inputs límite:**
- String vacío `""`
- Lista vacía `[]`
- Diccionario vacío `{}`
- None / null
- Número 0 y número negativo
- Valor máximo esperado + 1 (overflow intencional)

**Errores esperados:**
- Archivo que no existe
- Ruta inválida
- Conexión a DB o API que falla
- Permisos insuficientes (simulado)

**Datos malformados:**
- JSON inválido como string
- Encoding inesperado (ñ, 中文, emojis)
- Fecha en formato incorrecto

### Ejecución

1. Leer el script completo
2. Identificar: entradas del script, dependencias externas, puntos de fallo posibles
3. Generar casos de prueba como llamadas al script o como inputs directos
4. Ejecutar con `Bash` o `PowerShell` según el lenguaje
5. Capturar stdout, stderr y código de salida
6. Para cada caso: reportar si pasó, falló, o lanzó excepción no manejada

---

## Reporte Final

Siempre al terminar, mostrar tabla resumen:

```
| Caso                        | Resultado | Observación                        |
|-----------------------------|-----------|------------------------------------|
| Happy path                  | ✅ OK     |                                    |
| Input vacío                 | ❌ FALLA  | Nodo X lanza error no manejado     |
| API timeout                 | ⚠️ WARN   | Reintenta pero no tiene fallback   |
| Formulario con email inválido | ✅ OK   | Muestra validación correcta        |
```

Terminar siempre con:
- **Casos críticos a corregir** (los que fallan en producción real)
- **Casos que podrían mejorar** (no rompen pero no son robustos)
- **Lo que sí funciona bien** (confirmar qué es sólido)

---

## Reglas de Operación

- No modificar el desarrollo evaluado. Solo leer, ejecutar y reportar.
- Si un caso no se puede ejecutar automáticamente, describirlo como "manual requerido" con instrucciones claras.
- Si el desarrollo necesita credenciales reales para ejecutarse, preguntar antes de intentar.
- Reportar siempre en chat, no crear documentos a menos que el usuario lo pida.
- Ser directo: decir exactamente qué falla y por qué, sin suavizar.
