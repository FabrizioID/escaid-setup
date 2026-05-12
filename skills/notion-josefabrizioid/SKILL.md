---
name: notion-josefabrizioid
description: Perfil local para conectar Notion usando la cuenta josefabrizioid. Usar junto con documentar-notion cuando el usuario pida trabajar en la Notion de Jose Fabrizio ID, Fabrizio, GEN+ o josefabrizioid.
---

# Notion Jose Fabrizio ID

Perfil local de cuenta para Notion. No contiene secretos.

## Credencial local

- Alias: `josefabrizioid`
- Archivo esperado: `~/.codex/credentials/notion/josefabrizioid_notion.json`
- Campo de token esperado: `token`

## Protocolo

1. Activar tambien `documentar-notion`.
2. Cargar el token desde el archivo local, nunca desde esta skill.
3. Verificar identidad con `GET /v1/users/me` antes de escribir.
4. Reportar solo alias, workspace y nombre del bot; nunca imprimir el token.
5. Si el MCP activo responde con otra cuenta, usar API fallback con esta credencial o recargar el MCP.

## Arranque rapido

Usar este perfil por defecto cuando el usuario mencione `Fabrizio`, `Jose Fabrizio ID`, `josefabrizioid`, `GEN+`, `Tingo` o `PUENTE TINGO`.

Pagina de prueba rapida:

- `PUENTE TINGO`: `https://www.notion.so/PUENTE-TINGO-1d5d8cc4cfc180908d55c4da6d801474`
- ID: `1d5d8cc4-cfc1-8090-8d55-c4da6d801474`

Si `mcp__notion__` no encuentra `PUENTE TINGO` pero la API con este perfil si lo encuentra, el MCP activo esta autenticado contra otra cuenta. En ese caso:

1. Continuar por API fallback para no bloquear la tarea.
2. Avisar que hay que reiniciar Codex si `~/.codex/config.toml` ya fue corregido.
3. No repetir busquedas amplias en el workspace equivocado.

## MCP local preferido

Configuracion esperada para que el MCP arranque con esta cuenta:

- `~/.codex/config.toml` -> `[mcp_servers.notion]`
- `command = "powershell"`
- `args = ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", "C:\\Users\\USUARIO\\.codex\\mcp\\notion-josefabrizioid\\run-notion-mcp.ps1"]`
- El wrapper lee `~/.codex/credentials/notion/josefabrizioid_notion.json` y exporta `NOTION_TOKEN` antes de ejecutar `@notionhq/notion-mcp-server`.

No guardar el token en `config.toml`.

## Uso esperado

Usar este perfil para crear/actualizar proyectos, actividades, bases inline y listas maestras en el workspace de Notion asociado a `josefabrizioid`.
