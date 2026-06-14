# Learnings: n8n

Errores, gotchas y patrones aprendidos en sesiones de desarrollo real.
Más reciente primero. Leer antes de trabajar en este dominio.

---

## 2026-06-14 — Flujo de clasificación con IA: el IF no lee la salida de Gemini sin Structured Output Parser

**Dominio**: n8n
**Severidad**: 🟡 Importante
**Contexto**: Caso demo de clase (especialización n8n M2): form requerimiento → Gemini clasifica prioridad → If rutea → Data Table / correo

**Síntoma**:
El nodo If (`{{ $json.prioridad }}` = "Alta") nunca entra a la rama true. El flujo "casi funciona" pero el ruteo siempre cae a false.

**Causa raíz**:
El `Basic LLM Chain` (`@n8n/n8n-nodes-langchain.chainLlm`) devuelve la respuesta del modelo como **texto** (`output`), no como JSON parseado. Aunque el prompt diga "devuelve JSON", el nodo siguiente recibe un string, no `{prioridad: ...}`.

**Fix aplicado**:
Conectar un `Structured Output Parser` (`@n8n/n8n-nodes-langchain.outputParserStructured`) al chain por la conexión `ai_outputParser`, con esquema `{material, cantidad, tipo_de_issue, prioridad}`. Recién entonces los nodos siguientes leen `$json.prioridad` directo.

**Receta reutilizable (flujo de clasificación IA)**:
`formTrigger → chainLlm (+ lmChatGoogleGemini por ai_languageModel + outputParserStructured por ai_outputParser) → if → dataTable / set`

**Cómo detectarlo antes**:
- Si vas a rutear (If/Switch) por un campo que produce un nodo de IA → SIEMPRE adjuntar Structured Output Parser; no confiar en "pedí JSON en el prompt".
- El modelo Gemini (`@n8n/n8n-nodes-langchain.lmChatGoogleGemini`) se conecta al chain por `ai_languageModel`, no por `main`.
- Ver también: pills/n8n-generador-asistente.md

**Tags**: #ia #langchain #gemini #chainLlm #outputParser #if #routing #clasificacion

---

## 2026-06-14 — Data Table nativa + 1 sola credencial: patrón para demos/clases sin OAuth caducado

**Dominio**: n8n
**Severidad**: 🟢 Menor (patrón operativo)
**Contexto**: preparar un flujo demostrable en vivo sin que una credencial muera en plena clase

**Síntoma / problema a evitar**:
Demos que dependen de Google Sheets/Gmail (OAuth) se caen en vivo cuando el token caducó (ver google-apis.md 2026-06-06). En clase no hay margen para reconectar.

**Patrón**:
- Almacenamiento → `nodes-base.dataTable` (Data Table nativa): guarda entre ejecuciones, **sin credencial externa**. Operaciones insert/get/update/delete.
- Notificación → simular con `Set` que arma el mensaje ("aquí conectas Gmail/WhatsApp") en vez de enviar de verdad.
- IA → preferir **API key** (Gemini) sobre OAuth: la key no caduca como el refresh token.
- Resultado: el flujo corre con **1 sola credencial viva** (la del modelo).

**Cómo detectarlo antes**:
- Antes de un demo en vivo, contar credenciales vivas del flujo. Cada OAuth = riesgo. Bajar a 1 (API key) cuando se pueda.
- **Verificación segura sin tocar la instancia**: `validate_workflow` del MCP valida un JSON en memoria (estructura, conexiones, tipos) sin crear nada; `search_nodes`/`get_node` son lecturas de catálogo. Sirve para preparar/validar un workflow de antemano sin deployar.

**Tags**: #datatable #credenciales #oauth #demo #clase #gemini #validate #mcp

---

## 2026-05-31 — Deploy de Code node con `this.helpers.*` sin verificar disponibilidad en el task runner

**Dominio**: n8n
**Severidad**: 🟡 Importante
**Contexto**: Nodo `Convertir Fotos Base64` deployado directo a producción sin test aislado

**Síntoma**:
Nodo nuevo falla con "Unknown error" (sin descripción) en primera ejecución real del usuario.

**Causa raíz**:
Se deployó un Code node que llama a `this.helpers.getBinaryDataBuffer()` sin verificar que ese helper existe en n8n 2.22.x con task runner activo. Era una suposición no validada. Los helpers disponibles en Code nodes cambian según versión de n8n y modo de ejecución.

**Fix aplicado**:
Deploy de versión diagnóstica con try/catch que expone el error real y lista los helpers disponibles antes de comprometerse con una implementación.

**Cómo detectarlo antes**:
- Todo Code node nuevo que llame a `this.helpers.*` → probar en aislado PRIMERO con un test manual en n8n UI antes de conectar al flujo de producción
- El nodo debe nacer con try/catch que exponga el error desde el inicio, no añadirlo después de fallar
- Nunca asumir que un helper existe: verificar con `Object.keys(this.helpers || {})` en un diagnóstico rápido

**Tags**: #helpers #taskrunner #testeo #deploy #code-node #getBinaryDataBuffer

---

## 2026-05-30 — `prepareBinaryData` en Code node → httpRequest no puede leer el binario

**Dominio**: n8n
**Severidad**: 🔴 Crítico
**Contexto**: sw-premium generando One Page Premium con gpt-image-2 `/v1/images/edits`

**Síntoma**:
OpenAI responde `"Missing required parameter: 'image'"` aunque el binario aparece correctamente en el output del Code node con key `canvas`.

**Causa raíz**:
`this.helpers.prepareBinaryData(buffer, ...)` en un Code node crea una referencia `filesystem-v2` (un path en disco del task runner). El nodo httpRequest siguiente no puede resolver esa referencia en muchas versiones de n8n (2.22.x con task runner activo) porque el binario vive en el scope del proceso hijo del runner, no en el scope del nodo httpRequest.

**Fix aplicado**:
```javascript
// ✅ CORRECTO — base64 inline, httpRequest lo lee directamente
combined.binary['canvas'] = {
  data: 'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAAV0lEQVR...',
  mimeType: 'image/png',
  fileName: 'canvas.png',
  fileType: 'png'
};

// ❌ PROBLEMÁTICO
const buf = Buffer.from(b64, 'base64');
combined.binary['canvas'] = await this.helpers.prepareBinaryData(buf, 'canvas.png', 'image/png');
```

**Cómo detectarlo antes**:
En el nodo diagnóstico, verificar `dataPrefix` del binario. Si empieza con `filesystem-v2://` en lugar de caracteres base64 (`iVBOR`, `/9j/`, etc.) → el nodo httpRequest siguiente NO lo va a leer.

**Tags**: #binarios #httpRequest #formBinaryData #prepareBinaryData #filesystem-v2 #taskrunner

Ver también: pills/n8n-binary-gotchas.md (ítem 1)

---

## 2026-05-30 — `formBinaryData` con `value=""` envía siempre el mismo binario

**Dominio**: n8n
**Severidad**: 🔴 Crítico
**Contexto**: GPT Edits recibía 4 `image[]` — todas enviaban la misma foto

**Síntoma**:
GPT genera el flyer usando la misma foto 4 veces aunque el item tiene 4 binarios distintos (`data`, `data2`, `data3`, `data4`).

**Causa raíz**:
Cuando el campo `value` de un parámetro `formBinaryData` está vacío `""`, n8n lo interpreta como `data` (el primer binario del item). Si hay 4 entradas con `value=""`, las 4 mandan `data`.

**Fix aplicado**:
En el nodo httpRequest, campo `image[]`, especificar explícitamente:
```
image[] → value = "data"
image[] → value = "data2"
image[] → value = "data3"
image[] → value = "data4"
```

**Cómo detectarlo antes**:
Antes de deploy: revisar TODOS los parámetros `formBinaryData` en httpRequest nodes. Si alguno tiene `value` vacío → bug garantizado. También verificar en la ejecución que `image_tokens` en la respuesta de OpenAI sea proporcional al número de fotos distintas enviadas.

**Tags**: #binarios #httpRequest #formBinaryData #openai #gpt-image-2

Ver también: pills/n8n-binary-gotchas.md (ítem 2)

---

## 2026-05-30 — gpt-image-2 regenera `image[0]` en lugar de copiarlo

**Dominio**: n8n / OpenAI
**Severidad**: 🟡 Importante
**Contexto**: sw-premium enviando 4 fotos reales como image[0..3] a /v1/images/edits

**Síntoma**:
Las fotos en posición 1 y 2 del flyer son inventadas por la IA aunque se enviaron fotos reales. Las posiciones 3 y 4 sí son parecidas a las originales.

**Causa raíz**:
En `/v1/images/edits`, `image[0]` es el **canvas base a editar** — gpt-image-2 lo regenera (puede cambiar su apariencia). `image[1..N]` son referencias que el modelo usa con más fidelidad pero tampoco garantiza pixel-perfect copy.

**Fix aplicado**:
Enviar canvas blanco 64x64 PNG como `image[0]` (inline base64), mover fotos reales a `image[1..4]`:
```javascript
combined.binary['canvas'] = {
  data: 'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAAV0lEQVR4nO3PAQ0AAAjAIPuX1hjM7TRg9rnZ5wpoBbQCWgGtgFZAK6AV0ApoBbQCWgGtgFZAK6AV0ApoBbQCWgGtgFZAK6AV0ApoBbQCWgGtgFZAK7DYAcpT0sJB2IUMAAAAAElFTkSuQmCC',
  mimeType: 'image/png',
  fileName: 'canvas.png',
  fileType: 'png'
};
```
Y en el prompt: `"image[0] is a BLANK WHITE CANVAS. The REAL PROPERTY PHOTOS are: image[1]=PHOTO 1, image[2]=PHOTO 2..."`

**Cómo detectarlo antes**:
Recordar siempre: en `/edits`, el primer input es el canvas. Si quieres que TODAS las fotos sean fieles al original, ninguna puede ir en posición 0. Alternativa definitiva para pixel-perfect: HTML + Gotenberg (renderiza fotos como `<img>` directo).

**Tags**: #gpt-image-2 #openai #edits #canvas #fotos #pixel-perfect

Ver también: pills/n8n-binary-gotchas.md (ítem 3)

---

## 2026-05-30 — Task runner crash por ejecuciones concurrentes — "Offer expired"

**Dominio**: n8n / Docker
**Severidad**: 🔴 Crítico
**Contexto**: 10+ mensajes simultáneos en WhatsApp → todos los Code nodes fallan

**Síntoma**:
Logs del contenedor muestran `Task rejected: Offer expired - not accepted within validity window`. Las ejecuciones quedan en estado `new` en la DB y nunca terminan. El workflow parece activo pero no procesa nada.

**Causa raíz**:
El task runner (proceso `@n8n/task-runner`) tiene capacidad limitada. Con alta concurrencia, los tasks se encolan y expiran antes de ser aceptados. Las ejecuciones en estado `new` bloquean recursos y el runner no se recupera solo.

**Fix aplicado**:
```bash
# Limitar ejecuciones concurrentes
docker service update --env-add N8N_CONCURRENCY_PRODUCTION_LIMIT=5 1erautomatizacion_n8n

# Limpiar ejecuciones stuck post-crash
sqlite3 /var/lib/docker/volumes/1erautomatizacion_n8n_data/_data/database.sqlite \
  "UPDATE execution_entity SET status='crashed', stoppedAt=datetime('now') WHERE status='new';"
```

**Cómo detectarlo antes**:
Si llegan >5 mensajes simultáneos y hay Code nodes con lógica pesada → activar el límite de concurrencia antes de que crashee. Monitorear `docker service logs` en las primeras horas de producción con carga real.

**Tags**: #taskrunner #concurrencia #crash #docker #sqlite #executions

Ver también: pills/n8n-binary-gotchas.md (ítem 5)

---

## 2026-05-30 — PUT workflow 400: `settings must NOT have additional properties`

**Dominio**: n8n API
**Severidad**: 🟡 Importante
**Contexto**: Intentando actualizar workflow via REST API PUT

**Síntoma**:
`PUT /api/v1/workflows/{id}` responde 400 con `"settings must NOT have additional properties"`.

**Causa raíz**:
El objeto `settings` del workflow puede contener campos que la API no acepta en PUT, como `binaryMode`. n8n lo guarda internamente pero rechaza recibirlo en updates.

**Fix aplicado**:
```javascript
const cleanSettings = {
  executionOrder: wf.settings.executionOrder
  // agregar solo si existen: saveManualExecutions, callerPolicy, errorWorkflow, timezone
};
```

**Cómo detectarlo antes**:
Antes de hacer PUT, filtrar `settings` a solo los campos conocidos/permitidos. Nunca hacer re-PUT del objeto settings tal como viene del GET.

**Tags**: #api #put #settings #400 #n8n-api

Ver también: pills/n8n-testing.md (sección "Bugs conocidos")

---

## 2026-05-30 — n8n MCP vía `npx n8n-mcp` no activa modo gestión (apunta a cloud)

**Dominio**: n8n / Claude MCP
**Severidad**: 🟡 Importante
**Contexto**: Claude Code no podía leer ni modificar workflows del VPS

**Síntoma**:
El MCP responde pero todas las operaciones apuntan a `aecode.app.n8n.cloud` en lugar del VPS. Las credenciales del VPS en `settings.json` no se propagan al proceso `npx`.

**Causa raíz**:
`npx n8n-mcp@2.56.0` con env vars en `settings.json` → las variables de entorno no se pasan correctamente al proceso hijo en Windows.

**Fix aplicado**:
Usar wrapper `.cmd` que hardcodea las credenciales:
```json
"n8n": {
  "type": "stdio",
  "command": "C:\\Users\\USUARIO\\claude-setup\\mcps\\n8n-wrapper.cmd",
  "args": [],
  "env": {}
}
```

**Cómo detectarlo antes**:
Al inicio de cualquier sesión n8n, ejecutar `n8n_health_check` y verificar que la URL en la respuesta sea la del VPS (`1erautomatizacion-n8n.n7ixb7.easypanel.host`), no la de cloud.

**Tags**: #mcp #n8n-mcp #vps #credenciales #windows


---

## 2026-06-02 — Debug nodo a nodo: el patrón universal de diagnóstico

**Dominio**: n8n / debugging general
**Severidad**: 🟢 Patrón positivo (aprendizaje de método)
**Contexto**: Sesión larga de debugging de sw-premium y sw-registrar

**El patrón:**
Para cualquier proceso secuencial (n8n, Python, API, pipeline), diagnosticar siempre nodo a nodo:
1. Input de cada nodo → qué entra
2. Output de cada nodo → qué sale
3. Identificar el nodo exacto donde los datos cambiaron inesperadamente
4. No el síntoma al final — el nodo específico donde se rompe

**Casos reales resueltos con este patrón:**
- `Extractor IA → output: "es_propiedad: false"` → todos los campos vacíos desde ese punto
- `Gemini Vision → output: campos en inglés` → merge falló porque esperaba español
- `Append Sheets → no ejecutó` → rama paralela abortada por error anterior en otra rama
- `Merge Binarios → binary: {}` → nodo Set upstream había eliminado el binario
- `GPT Responses → success` pero `Extraer Resultado → error` → código leía `resp.output` en lugar de `resp.body.output`

**Por qué importa:**
El síntoma final (flyer sin datos, Sheets vacío, binary missing) nunca indica la causa real. Solo el trace nodo a nodo la revela. Cada error se resuelve diferente PORQUE el nodo de falla es diferente.

**Extrapolación:**
Este patrón aplica a cualquier lenguaje o proceso:
- Script Python: print del output de cada función
- API chain: log de cada response intermedio
- Pipeline de datos: sample de cada transformación
- Docker compose: logs de cada servicio en el orden correcto

**Tags**: #debugging #nodo-a-nodo #metodologia #universal #qa

---

## 2026-06-03 — batch-one-page-1am: fixes aplicados en la misma sesión

**Dominio**: n8n
**Severidad**: 🟡 Operacional
**Contexto**: Creación del workflow de batch nocturno + fixes relacionados

**Fixes aplicados en la sesión:**
- Gemini Selección: deduplicación por file_id (evita fotos repetidas cuando hay menos de 4)
- Merge Binarios overrides para 2 y 3 fotos (evita que GPT invente galería extra)
- continueOnFail en Gemini Vision (evita que overload de Gemini corte el registro)
- Es Batch? IF node en sw-premium: cuando batch_mode=true, salta Enviar Premium
- batch-one-page-1am: pasa batch_mode:true para no spam al grupo de producción

**Bug específico confirmado:**
GPT /v1/responses devuelve `message` en lugar de `image_generation_call` cuando recibe fotos duplicadas (detecta inconsistencia y responde con texto). Fix: enviar solo fotos únicas.

**Tags**: #batch #fotos-duplicadas #gemini-overload #continueOnFail #batch_mode

---

## 2026-06-08 — n8n-mcp validator: errores que son falsos positivos (no bloquean)

**Dominio**: n8n / n8n-mcp
**Severidad**: 🟢 Patrón (evita perder tiempo)

**Síntoma**:
`n8n_validate_workflow` reporta "errores" en workflows que corren perfecto en producción: `googleDrive: Invalid value for 'operation'`, `googleSheets: Range/Values required for update`, Code node `Cannot return primitive values directly`, `URL missing http://` (cuando va en expresión).

**Causa raíz**:
El validador estático malinterpreta configs de nodos nuevos / Code con return condicional / URLs en expresión. NO refleja runtime.

**Cómo distinguir real vs falso positivo**:
- La verdad es el **historial de ejecución** (`n8n_executions list/get`), no el validador.
- Lo que SÍ bloquea el `save` de `n8n_update_partial_workflow`: estructuras de operador mal formadas (ej. operador unario `notEmpty` sin `singleValue:true`, o `continueOnFail` + `onError` juntos). Esos hay que corregirlos aunque estén en nodos que no tocaste (n8n valida todo el workflow al guardar).
- Falsos positivos (operation/range/primitive/url-en-expresión): ignorar.

**Tags**: #mcp #validator #falsos-positivos #notEmpty #continueOnFail #ejecuciones

---

## 2026-06-08 — Patrones de calidad: flyer GPT terreno-aware, default ciudad, timezone, enrutado de hoja

**Dominio**: n8n / OpenAI / Google Sheets
**Severidad**: 🟢 Patrón positivo

**Patrones aplicados (agente inmobiliario):**

- **GPT image flyer no respeta datos del prompt** (inventa teléfono `123-4567`, muestra "0 recámaras" en terrenos, cambia la fachada): reforzar con reglas explícitas de máxima prioridad — *"render phone EXACTLY 663-438-31-52, never a placeholder"*, *"use ONLY the real photos, never replace the facade"*, y para terrenos *"FINAL AUTHORITY: do NOT show bedrooms/bathrooms/parking"*. Poner la regla del caso especial como ÚLTIMA instrucción (GPT pesa más lo último). Aún así requiere validación visual — el prompt mitiga, no garantiza.

- **Default de campo + timezone en Code node**: ciudad vacía → `'Tijuana'`; timestamps en zona local con el hack `new Date(new Date().toLocaleString('en-US',{timeZone:'America/Tijuana'}))` (los getters luego devuelven hora local sin reescribir el resto del código).

- **Enrutar filas a otra pestaña sin nodos nuevos**: en Google Sheets append, `sheetName.value` como expresión condicional → `={{ (incompleta) ? 'hoja de testeo' : 'Inventario' }}`. Separa pruebas/incompletas del inventario real con 1 expresión.

- **`.startsWith`/`.includes` sobre celdas de Sheets**: siempre `String(x||'')` — una fila con ID numérico (escrito a mano) rompe el filtro con `is not a function`.

**Tags**: #gpt-image #prompt-engineering #terreno #timezone #sheets #append #sheetName #string-coercion
