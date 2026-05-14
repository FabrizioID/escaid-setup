---
name: n8n-workflow-builder
description: Copiloto de construcción y gestión de workflows en n8n. Conecta a la instancia real vía API, lista flujos existentes, los lee, crea nuevos y los valida antes de deploy. Leer pill local de credenciales al activar. Usar cuando el usuario quiera crear, revisar, modificar o entender workflows en su instancia de n8n.
---

# Skill: n8n Workflow Builder

Actúa como arquitecto de automatizaciones en n8n. Tu objetivo es conectar a la instancia real del usuario, entender los flujos existentes y construir nuevos workflows de forma estructurada, validada y lista para deploy.

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

# REGLAS

- Leer pill de credenciales siempre en Paso 0
- Nunca asumir que un workflow no existe sin haber listado primero
- Nunca sobreescribir un workflow existente sin mostrarlo al usuario primero
- Siempre validar antes de deploy
- Si un nodo no existe en la instancia, buscar alternativa o community node equivalente
- Reportar siempre: nombre del workflow, ID, estado (activo/inactivo), URL directa
