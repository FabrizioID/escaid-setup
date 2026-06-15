# n8n MCP Setup — Pill de Credenciales y Diagnóstico

## Sistema de PERFILES de instancia (multi-n8n, switch ágil)

> Desde 2026-06-13 el MCP NO está casado con una sola instancia. Usa un **registro de perfiles**:
> el usuario dice "apunta a X" → se voltea el puntero `active` → se recarga el MCP una vez.

**Registro:** `C:\Users\USUARIO\claude-setup\mcps\n8n-instances.json`

```json
{
  "active": "aecode",
  "instances": {
    "aecode":    { "label": "AECODE n8n Cloud", "url": "https://aecode.app.n8n.cloud", "key": "..." },
    "easypanel": { "label": "self-hosted EasyPanel", "url": "https://1erautomatizacion-n8n.n7ixb7.easypanel.host", "key": "..." }
  }
}
```

### Cómo cambiar de instancia (procedimiento para sesiones futuras)
1. Editar el campo `"active"` en `n8n-instances.json` al nombre del perfil deseado (p.ej. `"easypanel"`).
2. (Para agregar una instancia nueva: añadir un objeto en `"instances"` con `url` + `key`; la key se saca de **n8n UI → Settings → API → Create API Key**.)
3. **Recargar el MCP** (reiniciar Claude Code o reconectar el server n8n). Un MCP stdio lee su env SOLO al arrancar — el cambio NO aplica en caliente. Esto es límite del protocolo, no del setup.
4. Confirmar con `n8n_health_check` (mode=diagnostic) → el campo `N8N_API_URL` debe mostrar la instancia nueva.

⚠️ **Verificar la key ANTES de repuntar** (no dejar key muerta):
```bash
curl -s -o /dev/null -w "%{http_code}" -H "X-N8N-API-KEY: LA_KEY" "<URL>/api/v1/workflows?limit=1"  # debe dar 200
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

**Solución probada y funcional:** wrapper que aplica las env vars vía `process.env` ANTES de cargar el paquete. Desde 2026-06-13 el wrapper lee el perfil activo del registro (ver sección de Perfiles arriba), en vez de hardcodear una sola instancia.

### Cadena de archivos wrapper (Claude Code)

`n8n-wrapper.cmd` → llama a `n8n-wrapper.mjs` → lee `n8n-instances.json` → aplica el perfil `active`.

**`C:\Users\USUARIO\claude-setup\mcps\n8n-wrapper.cmd`**
```cmd
@echo off
node "C:\Users\USUARIO\claude-setup\mcps\n8n-wrapper.mjs"
```

**`C:\Users\USUARIO\claude-setup\mcps\n8n-wrapper.mjs`** (resuelve perfil)
```js
import { readFileSync } from 'node:fs';
const registry = JSON.parse(readFileSync(new URL('./n8n-instances.json', import.meta.url), 'utf8'));
const profile = process.env.N8N_PROFILE || registry.active;   // override puntual con N8N_PROFILE
const inst = registry.instances[profile];
process.env.N8N_API_URL = inst.url;
process.env.N8N_BASE_URL = inst.url;
process.env.N8N_API_KEY = inst.key;
process.env.MCP_MODE = 'stdio';
await import('file:///C:/Users/USUARIO/AppData/Roaming/npm/node_modules/n8n-mcp/dist/mcp/stdio-wrapper.js');
```

> Override puntual sin tocar el registro: setear la env var `N8N_PROFILE=easypanel` antes de arrancar el MCP.

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
