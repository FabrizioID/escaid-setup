---
name: n8n-binary-gotchas
type: pill
local-only: false
---

# n8n Binary Data — Comportamientos No Documentados

Pill de referencia rápida para evitar bugs silenciosos con binarios en workflows.

---

## 1. `prepareBinaryData` en Code node → httpRequest formBinaryData

**BUG**: Binarios creados con `await this.helpers.prepareBinaryData(buffer, 'file.png', 'image/png')` en un Code node se guardan como `filesystem-v2` pero el nodo httpRequest siguiente **no puede leerlos** en muchas versiones (incluyendo 2.22.x con task runner activo).

**Síntoma**: OpenAI responde `"Missing required parameter: 'image'"` aunque el binario sí aparece en el output del Code node como `filesystem-v2`.

**Fix correcto**: Usar base64 inline en lugar de filesystem-v2:
```javascript
// ✅ CORRECTO — no usa filesystem, httpRequest lo lee directamente
combined.binary['canvas'] = {
  data: 'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAAV0lEQVR4nO3PAQ0...',
  mimeType: 'image/png',
  fileName: 'canvas.png',
  fileType: 'png'
};

// ❌ PROBLEMÁTICO — filesystem-v2 no accesible desde el nodo siguiente
const canvasBuf = Buffer.from(b64, 'base64');
combined.binary['canvas'] = await this.helpers.prepareBinaryData(canvasBuf, 'canvas.png', 'image/png');
```

**Regla**: Si necesitas crear un binario nuevo en un Code node para mandarlo al nodo siguiente vía httpRequest formBinaryData → usa base64 inline siempre.

---

## 2. httpRequest `formBinaryData` con `value` vacío

**BUG**: Si el campo `value` de un parámetro `formBinaryData` está vacío `""`, n8n **defaultea silenciosamente a `data`** (el primer binario del item).

**Síntoma**: Si tienes 4 entradas `image[]` con `value=""`, las 4 mandan el mismo binario `data`. GPT recibe la misma foto 4 veces.

**Fix**: Siempre especificar explícitamente el nombre del binario:
```
image[] → value = "data"
image[] → value = "data2"
image[] → value = "data3"
image[] → value = "data4"
```

**Verificación rápida** post-deploy: en la ejecución de prueba, checar que GPT Edits recibe `image_tokens` proporcional al número de fotos distintas.

---

## 3. gpt-image-2 `/v1/images/edits` con múltiples imágenes

**Comportamiento**: La **primera imagen** (`image[0]`) es el canvas base a editar. Las imágenes 2-N son referencias adicionales que GPT usa para "inspirarse", pero no garantiza copiarlas pixel-perfect.

**Consecuencia práctica**: Si mandas 4 fotos reales como `image[0..3]`, GPT edita la foto 1 (puede generarla diferente) y usa 2-4 como referencia (más fieles pero no exactas). Típicamente fotos en posiciones 3-4 salen más parecidas a las originales.

**Fix si necesitas fotos 100% reales en el flyer**: usar canvas blanco como `image[0]` + fotos reales como `image[1..4]`:
```javascript
// Agrega canvas blanco 64x64 PNG como primer input
combined.binary['canvas'] = {
  data: 'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAAV0lEQVR4nO3PAQ0AAAjAIPuX1hjM7TRg9rnZ5wpoBbQCWgGtgFZAK6AV0ApoBbQCWgGtgFZAK6AV0ApoBbQCWgGtgFZAK6AV0ApoBbQCWgGtgFZAK7DYAcpT0sJB2IUMAAAAAElFTkSuQmCC',
  mimeType: 'image/png',
  fileName: 'canvas.png',
  fileType: 'png'
};
```
Y en el prompt: `"image[0] es un canvas en blanco. Las fotos reales son image[1]=FOTO1, image[2]=FOTO2..."`.

**Alternativa definitiva** (100% pixel-perfect): HTML template con fotos como `<img src="data:image/jpeg;base64,...">` + Gotenberg para renderizar a PNG.

---

## 4. Code node: `runOnceForAllItems` vs `runOnceForEachItem`

| Modo | `this.helpers` disponible | `$helpers` disponible |
|---|---|---|
| `runOnceForAllItems` | ❌ | ❌ |
| `runOnceForEachItem` | ✅ | ✅ |

Si el Code node necesita `this.helpers.prepareBinaryData`, `this.helpers.httpRequest` o acceder a binarios → **debe usar `runOnceForEachItem`**.

---

## 5. Task runner: concurrencia y crashes

**Variables de control**:
```
N8N_RUNNERS_MAX_CONCURRENCY=5    # tareas concurrentes por runner (default: 5)
N8N_CONCURRENCY_PRODUCTION_LIMIT=5  # ejecuciones de producción paralelas
N8N_RUNNERS_TASK_TIMEOUT=60      # segundos antes de "Offer expired" (default: 60)
```

**Síntoma de crash**: logs con `Task rejected: Offer expired - not accepted within validity window`. Ocurre cuando se mandan 10+ mensajes simultáneos a un workflow con Code nodes pesados.

**Fix permanente**:
```bash
docker service update --env-add N8N_CONCURRENCY_PRODUCTION_LIMIT=5 1erautomatizacion_n8n
```

**Fix de limpieza post-crash**: si hay 100+ ejecuciones en estado `new` en la DB:
```bash
sqlite3 /var/lib/docker/volumes/1erautomatizacion_n8n_data/_data/database.sqlite \
  "UPDATE execution_entity SET status='crashed', stoppedAt=datetime('now') WHERE status='new';"
```

---

## 6. Nodo diagnóstico — patrón estándar

Agregar temporalmente antes del nodo problemático para verificar qué datos llegan:

```javascript
// DIAGNOSTIC NODE — remover antes de producción
const item = $input.first();
const jsonKeys = Object.keys(item.json || {});
const binaryKeys = Object.keys(item.binary || {});

const diag = {
  json_keys: jsonKeys,
  json_sample: Object.fromEntries(jsonKeys.slice(0,5).map(k => [k, String(item.json[k]).substring(0,80)])),
  binary_keys: binaryKeys,
  binary_info: Object.fromEntries(binaryKeys.map(k => [k, {
    mimeType: item.binary[k]?.mimeType,
    dataPrefix: String(item.binary[k]?.data || '').substring(0, 30),
    fileName: item.binary[k]?.fileName
  }]))
};

// Loggea en n8n execution output — visible en el panel
return [{ json: diag, binary: item.binary || {} }];
```

**Cuándo usarlo**: antes de un httpRequest que manda binarios, antes de un nodo que falla con datos inesperados, o cuando el output de un Code node parece incorrecto.
