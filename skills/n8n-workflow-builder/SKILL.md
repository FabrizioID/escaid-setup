---
name: n8n-workflow-builder
description: Copiloto de construcción y gestión de workflows en n8n. Conecta a la instancia real vía MCP (modo gestión completa con 17 tools) o REST API directa. Usar cuando el usuario quiera crear, revisar, modificar, validar o entender workflows en su instancia de n8n (aecode.app.n8n.cloud).
---

# Skill: n8n Workflow Builder

Actúa como arquitecto de automatizaciones en n8n. Conecta a la instancia real del usuario, entiende los flujos existentes y construye nuevos workflows de forma estructurada, validada y lista para deploy.

---

## PASO 0 OBLIGATORIO: Verificar acceso MCP

Al activar, verificar inmediatamente si las tools de gestión están disponibles:

```
ToolSearch: "n8n_health_check n8n_list_workflows"
```

**Si aparecen** → MCP en modo gestión completa. Usar Ruta A.
**Si no aparecen** → MCP en modo documentación. Leer `references/n8n-mcp-setup.md` y activar Ruta B mientras se resuelve.

Credenciales de la instancia: `references/n8n-mcp-setup.md`

---

## RUTAS DE CONEXIÓN

### Ruta A: MCP n8n — Modo Gestión Completa (17 tools)

Disponible cuando el wrapper `.cmd` está configurado correctamente.

**Tools de gestión:**
- `mcp__n8n__n8n_health_check` — verificar conexión
- `mcp__n8n__n8n_list_workflows` — listar todos los workflows
- `mcp__n8n__n8n_get_workflow` — leer workflow por ID (modes: full/details/active/structure/minimal)
- `mcp__n8n__n8n_create_workflow` — crear workflow nuevo
- `mcp__n8n__n8n_update_partial_workflow` — actualizar nodos específicos (diff-based)
- `mcp__n8n__n8n_update_full_workflow` — reemplazar workflow completo
- `mcp__n8n__n8n_delete_workflow` — eliminar workflow
- `mcp__n8n__n8n_validate_workflow` — validar workflow por ID
- `mcp__n8n__n8n_autofix_workflow` — corregir errores comunes automáticamente
- `mcp__n8n__n8n_test_workflow` — probar ejecución (webhook/form/chat/execute)
- `mcp__n8n__n8n_executions` — gestión de ejecuciones (get/list/delete)
- `mcp__n8n__n8n_workflow_versions` — historial de versiones y rollback
- `mcp__n8n__n8n_deploy_template` — deployar template directo a la instancia
- `mcp__n8n__n8n_manage_datatable` — gestión de data tables y filas
- `mcp__n8n__n8n_manage_credentials` — gestión de credenciales
- `mcp__n8n__n8n_generate_workflow` — generar workflow desde descripción en lenguaje natural
- `mcp__n8n__n8n_audit_instance` — auditoría de la instancia

**Tools de documentación (siempre disponibles):**
- `mcp__n8n__search_nodes` — buscar nodos por keyword
- `mcp__n8n__get_node` — info detallada de un nodo (detail: minimal/standard/full)
- `mcp__n8n__validate_node` — validar configuración de nodo
- `mcp__n8n__validate_workflow` — validar estructura de workflow JSON
- `mcp__n8n__get_template` — obtener template por ID
- `mcp__n8n__search_templates` — buscar templates
- `mcp__n8n__tools_documentation` — documentación de las tools

### Ruta B: REST API directa (fallback siempre disponible)

```powershell
$key = "VER_references/n8n-mcp-setup.md"
$base = "https://aecode.app.n8n.cloud"
$h = @{ "X-N8N-API-KEY" = $key }

# Listar workflows
Invoke-RestMethod "$base/api/v1/workflows" -Headers $h

# Leer workflow
Invoke-RestMethod "$base/api/v1/workflows/ID" -Headers $h

# Activar
Invoke-RestMethod "$base/api/v1/workflows/ID/activate" -Method POST -Headers $h
```

**Regla:** intentar Ruta A siempre. Usar Ruta B solo si MCP no tiene tools de gestión.

---

## FLUJOS DE TRABAJO

### Modo Exploración

1. `n8n_list_workflows` — ver todos los workflows
2. Identificar relevantes por nombre, nodos, tags
3. `n8n_get_workflow` con mode='full' para leer en detalle
4. Extraer: nodos clave, conexiones, credenciales, webhooks, Code Nodes
5. Presentar resumen antes de proponer cambios

### Modo Construcción

1. Entender el objetivo
2. `search_nodes` + `get_node(detail='standard')` para cada nodo
3. `search_templates` para encontrar referencias similares
4. Diseñar el JSON del workflow
5. `validate_workflow` antes de crear
6. `n8n_create_workflow` para deployar
7. Confirmar al usuario: nombre, ID, URL directa

### Modo Modificación

1. `n8n_get_workflow` — leer estado actual
2. Proponer cambio al usuario antes de ejecutar
3. `n8n_update_partial_workflow` (preferir sobre full replace)
4. Validar post-modificación
5. Reportar resultado

---

## CONVENCIONES DE NODOS

### Evolution API (WhatsApp)
No hay nodo nativo — usar `n8n-nodes-base.httpRequest`:
- URL: `{{$env.EVOLUTION_BASE_URL}}/endpoint`
- Header: `apikey: {{$env.EVOLUTION_API_KEY}}`
- Ver detalles: `references/evolution-api.md`

### Google Sheets
Nodo: `n8n-nodes-base.googleSheets`
- Requiere credencial OAuth2 en la instancia
- append/read con range A:Z

### Code Node (JavaScript)
Siempre llamar `tools_documentation({topic: "javascript_code_node_guide"})` antes de escribir código.

### Webhook Trigger
- Path único por workflow
- Para Evolution API: path `/evolution/whatsapp`
- Response mode: `lastNode`

---

## CREDENCIALES EN WORKFLOWS

Las credenciales viven en la instancia de n8n, no en el JSON del workflow.

```json
"credentials": {
  "googleSheetsOAuth2Api": { "id": "ID_CRED", "name": "Google Sheets" }
}
```

Si el ID no se conoce → indicar al usuario que lo complete en la UI. Nunca escribir secrets en el JSON.

---

## VALIDACIÓN ANTES DE DEPLOY

Siempre correr `validate_workflow` antes de crear o actualizar:
- Nodos sin conexión de entrada/salida
- Expresiones `{{}}` con referencias inválidas
- Code Nodes con errores de sintaxis
- Webhooks con paths duplicados

Errores → corregir antes. Warnings → reportar y esperar decisión del usuario.

---

## REGLAS

- Verificar disponibilidad de tools de gestión en Paso 0
- Nunca asumir que un workflow no existe sin listar primero
- Nunca sobreescribir sin mostrar el estado actual al usuario
- Siempre validar antes de deploy
- Usar `n8n_update_partial_workflow` sobre full replace cuando sea posible
- Reportar siempre: nombre, ID, estado (activo/inactivo), URL directa al workflow

## Referencias

- `references/n8n-mcp-setup.md` → credenciales, setup del wrapper, diagnóstico
- `references/evolution-api.md` → patrones para WhatsApp via Evolution API
