# SkillOps Healthcheck - ESC-AI

Guia de verificacion rapida para saber si el ecosistema esta listo antes de una jornada operativa.

## Checklist De 5 Minutos

| Area | Prueba segura | Estado esperado |
|---|---|---|
| Skills instaladas | listar `SKILL.md` en `%USERPROFILE%\.codex\skills` | aparecen las skills del setup |
| Setup local | confirmar `escaid-setup\skills` y `escaid-setup\mcps` | repo local presente |
| Magnus memoria | existe `<workspace>\second-brain\MASTER_IDEAS.md` | archivo presente |
| Threads | existen `second-brain/inteligencia/**/threads/_index.md` | indices presentes |
| Notion | `API_get_self` | devuelve workspace/bot |
| n8n | `n8n_health_check` | `success: true` |
| Word/DOCX | listar documentos | responde servidor Word |
| Google Workspace | herramientas `google_docs_cloud` expuestas | deben aparecer tools Docs/Sheets/Drive |
| Drive legacy | busqueda no destructiva | no debe dar `invalid_request` |
| Miro | buscar boards o context get | no debe dar `Auth required` |

## Hallazgos Actuales

Fecha de auditoria: 2026-05-23.

| Area | Estado | Hallazgo |
|---|---|---|
| Skills base ESC-AI | Verde/Amarillo | `google-workspace-editor` ya existe en setup e instalacion local; faltan pruebas post-recarga MCP |
| Versiones skills | Amarillo | Varias instaladas difieren del setup: `magnus-thinker`, `project-thread-assistant`, `documentar-notion`, `n8n-workflow-builder`, Google Docs, etc. |
| Magnus/proyectos | Amarillo | Arquitectura correcta, pero memoria dispersa en varias raices |
| Notion Fabrizio | Verde | MCP responde con bot en `Fabrizio's Workspace` |
| n8n | Verde/Amarillo | API responde; config/template fijados a `n8n-mcp@2.56.0`; requiere recargar MCP para validar gestion de credenciales |
| Word/DOCX | Verde | Servidor Word responde y detecta documentos |
| Google Workspace | Amarillo | MCP configurado, codigo existe y `GOOGLE_MCP_PROFILE=fabrizio` fue agregado en Codex; requiere recargar cliente/MCP para exponer tools |
| docx_drive | Amarillo/Rojo | Credenciales existen, pero busqueda simple fallo con `invalid_request` |
| Miro | Rojo | MCP pide autenticacion (`Auth required`) |
| Excel MCP | Amarillo | Skill existe, pero herramienta Excel no esta expuesta en esta sesion |

## Comandos Locales Utiles

Listar skills instaladas:

```powershell
Get-ChildItem -Path $env:USERPROFILE\.codex\skills -Recurse -Filter SKILL.md |
  ForEach-Object { $_.FullName }
```

Comparar setup contra instaladas:

```powershell
$setup = Get-ChildItem ".\escaid-setup\skills" -Recurse -Filter SKILL.md |
  ForEach-Object { Split-Path (Split-Path $_.FullName -Parent) -Leaf }
$installed = Get-ChildItem "$env:USERPROFILE\.codex\skills" -Recurse -Filter SKILL.md |
  ForEach-Object { Split-Path (Split-Path $_.FullName -Parent) -Leaf }
Compare-Object -ReferenceObject $setup -DifferenceObject $installed
```

Verificar Google Workspace local:

```powershell
Test-Path ".\Proyecto\escaid-setup\mcps\google-workspace-mcp\dist\index.js"
Get-ChildItem "$env:USERPROFILE\.config\scd-mcp-docs" -Recurse -File
```

Si los tokens estan en carpetas de perfil como `fabrizio` o `AECODE`, el MCP debe recibir:

```toml
[mcp_servers.google_docs_cloud.env]
GOOGLE_MCP_PROFILE = "fabrizio"
```

No usar esa linea si el token vive directamente en `~\.config\scd-mcp-docs\token.json`.

Para Claude Code/Antigravity, usar la misma idea en el bloque `env` del MCP:

```json
"env": {
  "GOOGLE_MCP_PROFILE": "fabrizio"
}
```

## Politica De Fallback

| Si falla | Fallback rapido |
|---|---|
| Google Docs MCP | revisar `google-workspace-credentials`; usar Drive export/local DOCX si el usuario acepta |
| Notion MCP | usar perfil local y API fallback con token local |
| n8n MCP | usar REST API directa con pill local |
| Miro MCP | generar HTML/PNG/Markdown y subir luego cuando auth este lista |
| Excel MCP | usar archivo `.xlsx` local con libreria/script o export CSV |
| Word MCP | usar `docx_editor_local` para reemplazos simples |

## No Imprimir Secretos

Un pill local puede contener secretos porque vive en la maquina del usuario, pero los agentes deben:

- leerlos solo cuando la tarea lo requiere;
- no copiarlos a respuestas;
- no escribirlos dentro del repo;
- no incluirlos en logs, docs o mapas operativos;
- reportar solo alias, ruta y estado.
