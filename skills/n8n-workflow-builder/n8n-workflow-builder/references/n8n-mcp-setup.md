# n8n MCP Setup — Pill de Credenciales y Diagnóstico

## Credenciales de la instancia (josefabrizioid)

```
N8N_BASE_URL = https://aecode.app.n8n.cloud
N8N_API_URL  = https://aecode.app.n8n.cloud
N8N_API_KEY  = [ROTAR KEY AQUÍ — ver Claude Code settings.json o .claude.json]
```

El API key se obtiene en: **n8n UI → Settings → API → Create API Key**

---

## Arquitectura real del MCP (Claude Code VSCode)

El MCP de n8n usa el paquete `n8n-mcp` de czlonkowski. Este paquete tiene DOS modos:

| Modo | Tools disponibles | Cuándo activa |
|---|---|---|
| Documentación | 7 tools (search_nodes, get_node, validate_*, etc.) | Sin N8N_API_URL |
| Gestión completa | 24 tools (7 doc + 17 gestión) | Con N8N_API_URL + N8N_API_KEY |

**Las 17 tools de gestión:**
`n8n_create_workflow`, `n8n_get_workflow`, `n8n_update_full_workflow`, `n8n_update_partial_workflow`,
`n8n_delete_workflow`, `n8n_list_workflows`, `n8n_validate_workflow`, `n8n_autofix_workflow`,
`n8n_test_workflow`, `n8n_executions`, `n8n_health_check`, `n8n_workflow_versions`,
`n8n_deploy_template`, `n8n_manage_datatable`, `n8n_manage_credentials`,
`n8n_generate_workflow`, `n8n_audit_instance`

---

## Problema conocido: env vars no se pasan correctamente vía npx

`npx -y n8n-mcp` y `node stdio-wrapper.js` con env en settings.json NO activan el modo gestión aunque las variables estén configuradas. El paquete arranca en modo documentación.

**Solución probada y funcional:** wrapper `.cmd` que hardcodea las credenciales.

### Archivo wrapper (Claude Code)

Ubicación: `C:\Users\USUARIO\claude-setup\mcps\n8n-wrapper.cmd`

```cmd
@echo off
set N8N_API_URL=https://aecode.app.n8n.cloud
set N8N_BASE_URL=https://aecode.app.n8n.cloud
set N8N_API_KEY=TU_API_KEY_AQUI
set MCP_MODE=stdio
set LOG_LEVEL=error
set DISABLE_CONSOLE_OUTPUT=true
node "C:\Users\USUARIO\AppData\Roaming\npm\node_modules\n8n-mcp\dist\mcp\stdio-wrapper.js"
```

### Config en `~/.claude/settings.json` y `~/.claude.json`

```json
"n8n": {
  "type": "stdio",
  "command": "C:\\Users\\USUARIO\\claude-setup\\mcps\\n8n-wrapper.cmd",
  "args": [],
  "env": {}
}
```

⚠️ **CRÍTICO**: actualizar en AMBOS archivos:
- `C:\Users\USUARIO\.claude\settings.json`
- `C:\Users\USUARIO\.claude.json` → buscar la entrada del proyecto `c:/Users/USUARIO/Desktop/GEN+ TEMP/Machine Learning` Y la entrada global

### Config Codex (`~/.codex/config.toml`)

```toml
[mcp_servers.n8n]
command = "C:\\Users\\USUARIO\\claude-setup\\mcps\\n8n-wrapper.cmd"
args = []
```

---

## Diagnóstico rápido

### ¿Cuántos tools tiene el MCP?

```
ToolSearch: "n8n_health_check n8n_list_workflows"
```

- 0 resultados → MCP en modo documentación (falta wrapper/credenciales)
- Resultados encontrados → MCP en modo gestión completa ✓

### Verificar con VSCode log

```
%APPDATA%\Code\logs\<timestamp>\window1\exthost\Anthropic.claude-code\Claude VSCode.log
```

Buscar: `MCP server "n8n": Connection established`
→ Si dice `n8n-documentation-mcp` con `version: 2.53.0`, el nombre es SIEMPRE ese (hardcodeado). No indica el modo.
→ El modo real se confirma buscando `n8n_health_check` en ToolSearch.

### Verificar key válida

```powershell
curl -s -o /dev/null -w "%{http_code}" `
  -H "X-N8N-API-KEY: TU_KEY" `
  "https://aecode.app.n8n.cloud/api/v1/workflows?limit=1"
# Debe responder 200
```

---

## Instalación del paquete (si no está instalado globalmente)

```powershell
npm install -g n8n-mcp@2.53.0
```

Verificar: `C:\Users\USUARIO\AppData\Roaming\npm\node_modules\n8n-mcp\dist\mcp\stdio-wrapper.js` debe existir.
