# Perfiles locales de Notion

Este repo documenta como elegir cuentas de Notion sin guardar secretos en Git.

## Principio

Las credenciales viven solo en la maquina local:

- `~/.codex/credentials/notion/josefabrizioid_notion.json`
- `~/.codex/credentials/notion/aecode_coordinador_notion.json`

Las skills locales viven fuera del repo:

- `~/.codex/skills/notion-josefabrizioid/SKILL.md`
- `~/.codex/skills/notion-coordinador-aecode/SKILL.md`

El repo solo conserva el protocolo de uso. Nunca subir tokens, client secrets, refresh tokens ni archivos `.json` de credenciales.

## Perfil `josefabrizioid`

Usar cuando el usuario diga:

- Notion de Fabrizio
- Notion de Jose Fabrizio ID
- `josefabrizioid`
- GEN+ en Notion

Flujo:

1. Activar `documentar-notion`.
2. Activar el perfil local `notion-josefabrizioid`.
3. Leer el token desde `~/.codex/credentials/notion/josefabrizioid_notion.json`.
4. Verificar con `/v1/users/me`.
5. Si la herramienta MCP cargada responde con otra identidad, usar API fallback con este token o recargar el MCP.

## Perfil `coordinador-aecode`

Usar cuando el usuario diga:

- Notion del coordinador
- AECODE
- `coordinador@aecode.ai`

Flujo:

1. Activar `documentar-notion`.
2. Activar el perfil local `notion-coordinador-aecode`.
3. Confirmar que existe `~/.codex/credentials/notion/aecode_coordinador_notion.json`.
4. Verificar con `/v1/users/me`.
5. Si la herramienta MCP cargada responde con otra identidad, usar API fallback con este token o recargar el MCP.

## Cambio de MCP local

Si se quiere cambiar el servidor local `notion-easy` a un perfil:

```powershell
$cred = Get-Content "$env:USERPROFILE\.codex\credentials\notion\josefabrizioid_notion.json" -Raw | ConvertFrom-Json
claude mcp remove notion-easy -s local
claude mcp add notion-easy -s local -e NOTION_TOKEN=$($cred.token) -- easy-notion-mcp
```

Despues de cambiar el MCP, recargar la sesion si las herramientas ya estaban cargadas.

## Validacion minima

Antes de escribir:

- Verificar identidad con `/v1/users/me`.
- Confirmar que el destino existe.
- Confirmar que el workspace/cuenta coincide con el perfil pedido.
- No imprimir secretos.
- No asumir que un correo de Google es una identidad de Notion.
