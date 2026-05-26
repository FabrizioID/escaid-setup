# Notion MCP Candidates

Referencia de potenciacion externa para Notion. No instalar candidatos nuevos sin auditoria.

## Decision

Mantener `documentar-notion` como skill de dominio. Las rutas MCP son herramientas, no reemplazos de la skill.

Prioridad operativa:

1. `easy-notion-mcp` si esta activo y autenticado.
2. Notion MCP oficial/remoto o local si ya esta expuesto.
3. `suekou/mcp-notion-server` como candidato alternativo API-first 2026 si hay brecha con data sources/views.
4. API directa con token local del perfil como fallback.
5. Plan manual si no hay acceso.

## Candidatos

| Repo/herramienta | Aporte | Decision |
|---|---|---|
| `Grey-Iris/easy-notion-mcp` | Markdown-first, 42 tools, paginas, DBs, views, comments, users, dry-run, file upload stdio | Ruta principal si esta activo |
| Notion MCP oficial/remoto | OAuth y tools oficiales Notion | Usar si ya esta disponible |
| `suekou/mcp-notion-server` | API 2026-03-11, data source model, herramientas compactas y raw API fallback | Candidato alternativo |
| API Notion directa | Control fino y batch propio | Fallback por perfil local |

## Riesgos Detectados

### easy-notion-mcp

- Usa token `NOTION_TOKEN`; no guardar en repo.
- HTTP static-token requiere `NOTION_MCP_BEARER`; no exponer sin bearer.
- `file://` uploads solo en stdio; limitar rutas locales y evitar uploads accidentales.
- `replace_content`, `update_section`, `archive_page`, `move_page`, `delete_view`, `delete_database_entry` son sensibles.
- Tiene `NOTION_TRUST_CONTENT`; dejar `false` para defensa contra prompt injection.

### suekou/mcp-notion-server

- Usa token `NOTION_API_TOKEN`; no guardar en repo.
- Es API-first y puede exponer herramientas raw; riesgo de cambios destructivos si se usa sin plan.
- Requiere Node 22/pnpm para desarrollo local.
- Bueno para data sources/views modernas, pero no reemplaza el criterio conservador de `documentar-notion`.

## Regla Operativa

1. Elegir cuenta/perfil antes de buscar.
2. Validar identidad.
3. Leer destino y schema antes de escribir.
4. Para contenido largo, usar markdown append/update seccion.
5. Para bases, distinguir `database_id`, `data_source_id` y `view_id`.
6. Para cambios destructivos, usar dry-run o pedir confirmacion.
7. Para credenciales, usar wrappers/perfiles locales; nunca tokens en skill ni repo.
