---
name: n8n-workflow-builder
description: Copiloto de construcción y gestión de workflows en n8n. Conecta a la instancia real vía MCP (17 tools) o REST API directa. Usar cuando el usuario quiera crear, revisar, modificar, validar o entender workflows en su instancia de n8n (aecode.app.n8n.cloud). Incluye patrones para Evolution API (WhatsApp), sesiones con staticData, sub-workflows, y upload a Google Drive.
---

# Skill: n8n Workflow Builder

Actúa como arquitecto de automatizaciones en n8n. Tu objetivo es conectar a la instancia real del usuario, entender los flujos existentes y construir nuevos workflows de forma estructurada, validada y lista para deploy.
## PAQUETE OPERATIVO

Una llamada a `n8n-workflow-builder` debe activar estas capas:

| Capa | Ruta | Funcion |
|---|---|---|
| Dominio | `n8n-workflow-builder` | Diseñar, revisar, modificar y validar workflows |
| Apertura MCP | `mcp__n8n__*` | Probar salud, listar workflows, leer/crear/actualizar/validar |
| Pill local | `C:\Users\USUARIO\.codex\skills\n8n-workflow-builder\pills\n8n-credentials.md` | Guarda URL/API key local; nunca imprimir valores |
| Fallback | REST API directa | Usar si el MCP falla o no expone una operacion necesaria |

Arranque veloz esperado: leer pill en silencio, probar `n8n_health_check`, listar workflows solo si la tarea lo requiere, y evitar diagnosticos largos si REST fallback puede resolver.

Actúa como arquitecto de automatizaciones en n8n. Conecta a la instancia real del usuario, entiende los flujos existentes y construye nuevos workflows de forma estructurada, validada y lista para deploy.

---

# ACTIVACIÓN — PASO 0 OBLIGATORIO: Leer credenciales

**Antes de cualquier acción**, leer el pill de credenciales:

```
C:\Users\USUARIO\.codex\skills\n8n-workflow-builder\pills\n8n-credentials.md
```

Extraer:
- `N8N_BASE_URL` → URL base de la instancia
- `N8N_API_KEY` → key para header `X-N8N-API-KEY`

Si el pill no tiene las credenciales completadas (todavía dice `PONER_URL_AQUI`), pedir al usuario que las complete antes de continuar.

---

# CONEXIÓN — DOS RUTAS

## Ruta A: MCP n8n (si está configurado con API URL)

Los tools `mcp__n8n__*` permiten listar y gestionar workflows si el MCP tiene `N8N_API_URL` configurado en `settings.json`. Verificar con el tool de health check si está disponible.

Herramientas disponibles cuando el MCP está conectado:
- `n8n_health_check` — verificar conexión
- `n8n_list_workflows` — listar todos los workflows
- `n8n_get_workflow` — leer un workflow por ID
- `n8n_create_workflow` — crear workflow nuevo
- `n8n_update_partial_workflow` — actualizar nodos específicos
- `n8n_validate_workflow` — validar antes de activar
- `n8n_test_workflow` — probar ejecución

## Ruta B: REST API directa via Bash/PowerShell (fallback siempre disponible)

Usar las credenciales del pill para llamadas HTTP directas. Esta ruta funciona siempre, independiente del estado del MCP.

```powershell
# Listar workflows
$headers = @{ "X-N8N-API-KEY" = "API_KEY_DEL_PILL" }
Invoke-RestMethod -Uri "BASE_URL/api/v1/workflows" -Headers $headers

# Obtener workflow por ID
Invoke-RestMethod -Uri "BASE_URL/api/v1/workflows/ID" -Headers $headers

# Activar workflow
Invoke-RestMethod -Uri "BASE_URL/api/v1/workflows/ID/activate" -Method POST -Headers $headers
```

**Regla:** intentar Ruta A primero. Si falla o no están disponibles los tools, usar Ruta B sin interrumpir al usuario.

---

# FLUJO DE TRABAJO

## Modo Exploración (leer flujos existentes)

1. Listar todos los workflows activos e inactivos
2. Identificar los relevantes al objetivo (por nombre, nodos usados, tags)
3. Leer los workflows relevantes en detalle
4. Extraer: nodos clave, conexiones, credenciales usadas, webhooks configurados, lógica del Code Node si existe
5. Presentar resumen estructurado al usuario antes de proponer modificaciones

## Modo Construcción (crear flujo nuevo)

1. Entender el objetivo del workflow
2. Buscar referencias con `search_nodes` + `get_node` para cada nodo necesario
3. Buscar templates similares con `search_templates`
4. Diseñar la estructura JSON del workflow
5. Validar con `validate_workflow` antes de crear
6. Crear en la instancia con `n8n_create_workflow` o Ruta B
7. Confirmar al usuario: nombre, ID, URL directa al workflow

## Modo Modificación (editar flujo existente)

1. Leer el workflow actual completo
2. Identificar qué cambiar sin romper lo existente
3. Proponer el cambio al usuario antes de ejecutar
4. Usar `n8n_update_partial_workflow` cuando sea posible (menos riesgo que reemplazar todo)
5. Validar post-modificación
6. Reportar resultado

---

# CONVENCIONES DE NODOS

## Evolution API (WhatsApp)
No existe nodo nativo. Siempre usar `n8n-nodes-base.httpRequest` con:
- URL: `{{$env.EVOLUTION_BASE_URL}}/endpoint`
- Headers: `{ "apikey": "{{$env.EVOLUTION_API_KEY}}" }`
- Leer referencia: `references/evolution-api.md`

## Google Sheets
Nodo nativo: `n8n-nodes-base.googleSheets`
- Requiere credencial OAuth2 configurada en la instancia
- Para append usar operation `append`
- Para leer usar operation `read` con range A:Z

## Google Drive
Nodo nativo: `n8n-nodes-base.googleDrive`
- Para upload usar operation `upload`
- El archivo puede venir como base64 o buffer desde el Code Node anterior

## Code Node (JavaScript)
Usar para: lógica de sesión, parsing de URLs, extracción de campos, transformaciones complejas.
Siempre llamar `tools_documentation({topic: "javascript_code_node_guide"})` antes de escribir código en un Code Node.

## Webhook Trigger
Nodo: `n8n-nodes-base.webhook`
- Path único por workflow — evitar colisiones
- Para Evolution API: path sugerido `/evolution/whatsapp`
- Response mode: `lastNode` para responder al webhook con el resultado

---

# GESTIÓN DE CREDENCIALES EN n8n

Las credenciales (Google OAuth, Evolution API key, etc.) viven en la instancia de n8n, no en el workflow JSON.

Al crear un workflow que use credenciales:
- Referenciar por nombre: `"credentials": { "googleSheetsOAuth2Api": { "id": "ID_CRED", "name": "Google Sheets" } }`
- Si el ID no se conoce, indicar al usuario que lo complete manualmente en la UI de n8n
- Nunca escribir credenciales en texto plano dentro del workflow JSON

---

# VALIDACIÓN ANTES DE DEPLOY

Siempre correr `validate_workflow` antes de crear o actualizar. Revisar:
- Nodos sin conexión de entrada/salida
- Expresiones `{{}}` con referencias inválidas
- Code Nodes con errores de sintaxis
- Webhooks con paths duplicados

Si hay errores → corregir antes de crear. Si hay warnings → reportar al usuario y esperar decisión.

---

# PATRONES APRENDIDOS (instancia aecode.app.n8n.cloud)

## Sesiones persistentes con staticData

Para agentes conversacionales en WhatsApp que acumulan datos mensaje a mensaje:

```javascript
const sd = $getWorkflowStaticData('global');
if (!sd.sessions) sd.sessions = {};
// Abrir sesión
sd.sessions[remoteJid] = { createdAt: Date.now(), campo1: null, campo2: null };
// Cerrar sesión
delete sd.sessions[remoteJid];
```

**Cuidado:** staticData es compartido entre todas las ejecuciones del workflow. Limpiar siempre las sesiones expiradas.

## Sub-workflow con executeWorkflowTrigger

Para modularizar: el workflow padre llama al hijo con `n8n-nodes-base.executeWorkflow`, el hijo usa `n8n-nodes-base.executeWorkflowTrigger` como trigger. El hijo recibe el item del padre y devuelve items al padre.

- Los sub-workflows NO necesitan estar activos para ser llamados desde el padre
- El sub-workflow heredea los datos del padre como `$json`

## n8n_update_partial_workflow — limitaciones clave

- `patchNodeField` solo funciona en campos cuyo valor sea **string** — NO funciona en objetos ni arrays
- Para arrays (como `ignoreAutoMapFields`, `assignments.assignments`) → usar `removeNode` + `addNode` para reemplazar el nodo completo
- Las operaciones son atómicas por defecto (`continueOnError: false`); si una falla, todas se revierten
- Siempre hacer `n8n_get_workflow` con `mode: 'full'` antes de patchear para obtener el texto exacto del campo

## Patrones v2 absorbidos

Cuando el trabajo implique Wait nodes, sub-workflows, import/export JSON, MCP parcial o workflows como codigo, leer:

- `references/n8n-v2-operational-patterns.md`
- `references/n8n-v2-troubleshooting.md`

Estos archivos son referencia interna absorbida desde auditoria externa. No reemplazan el arranque oficial de esta skill: pill local, MCP primero, REST fallback y validacion antes de deploy.

## Llamar a Gemini desde un Code Node

Para razonamiento/extracción NLP dentro de un Code Node:

```javascript
const r = await this.helpers.httpRequest({
  method: 'POST',
  url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=API_KEY',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0 } }),
  json: true
});
const text = r.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
```

## Evolution API — descarga de media (imágenes/videos)

```javascript
// En el Code Node que pasa datos al sub-workflow:
if (data.esImagen || data.esDocumento) {
  session.mediaData = { messageKey: data.messageKey, messageContent: data.messageContent };
}

// En el sub-workflow, descargar base64:
POST http://VPS:8080/chat/getBase64FromMediaMessage/INSTANCIA
{ "message": { "key": messageKey, "message": messageContent } }
// Devuelve: { base64: "...", mimetype: "image/jpeg" }
```

## Google Drive — upload desde base64

```javascript
// Code Node para convertir base64 a binary:
const buf = Buffer.from(base64Data, 'base64');
const binaryData = await this.helpers.prepareBinaryData(buf, filename, mimeType);
return [{ json: { filename }, binary: { data: binaryData } }];
// Luego Google Drive node con operation: 'upload', inputDataFieldName: 'data'
```

## Evolution API — limitación crítica

**Solo soporta UN webhook por instancia.** Si se cambia el webhook, el flujo master deja de funcionar. Para añadir comandos nuevos a un bot existente, siempre hacerlo **dentro del mismo workflow** (nuevo bloque de nodos + conexión desde la cadena de comandos existente), NUNCA creando un webhook separado.

## autoMapInputData en Google Sheets — cuidado con schema cacheado

Cuando se usa `mappingMode: "autoMapInputData"`, n8n cachea el schema de las columnas del sheet. Si el schema tiene columnas viejas, se crean columnas duplicadas. Solución: agregar un Code Node "Limpiar para Sheets" antes del nodo de Sheets que solo emita los campos exactos que se quieren escribir.

---

# CREDENCIALES EN LA INSTANCIA aecode.app.n8n.cloud

| Propósito | Tipo | ID | Nombre |
|---|---|---|---|
| Google Sheets (marketing) | googleSheetsOAuth2Api | LbS1j9b5KuCLQ7k2 | Google Sheets account 5 |
| Google Drive (proyectos) | googleDriveOAuth2Api | jpX9s8v2mrozyiQv | GEN+Proyectos Drive |
| Google Sheets (general) | googleSheetsOAuth2Api | 4oZBTuspJnwYB2vb | GEN+ SHEETS CREDENTIAL |

---

# WORKFLOWS CLAVE (aecode.app.n8n.cloud)

| Workflow | ID | Descripción |
|---|---|---|
| Aecodito Centro de Operaciones v3.0 | Ma67AAArvHx4wX15 | Bot maestro WhatsApp — NUNCA romper |
| Refs ADS - Guardar Referencia | wfHPoqIpdBKeuza6 | Sub-workflow guardado refs en Sheets+Drive |

---

# REGLAS

- Leer pill de credenciales siempre en Paso 0
- Nunca asumir que un workflow no existe sin haber listado primero
- **NUNCA modificar Aecodito (Ma67AAArvHx4wX15) con PUT completo** — solo `n8n_update_partial_workflow`
- Siempre validar antes de deploy
- Si un nodo no existe en la instancia, buscar alternativa o community node equivalente
- Reportar siempre: nombre del workflow, ID, estado (activo/inactivo), URL directa
