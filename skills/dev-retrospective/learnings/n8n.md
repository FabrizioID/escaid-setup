# Learnings: n8n

Errores, gotchas y patrones aprendidos en sesiones de desarrollo real.
Más reciente primero. Leer antes de trabajar en este dominio.

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

