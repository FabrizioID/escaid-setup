# Notion - Potenciacion Vertical ESC-AI

Fecha: 2026-05-24

Objetivo: mantener Notion como ruta rapida de documentacion operativa sin romper workspaces, bases, vistas ni plantillas. La prioridad es velocidad con seguridad: perfil correcto, lectura antes de escritura, append conservador, data sources/views bien identificados y credenciales fuera del repo.

## Estado Actual

Skills:

- `documentar-notion`: dominio y reglas de escritura.
- `notion-josefabrizioid`: perfil local Fabrizio/GEN+.
- `notion-coordinador-aecode`: perfil local coordinador AECODE.

Separacion correcta:

| Capa | Ruta | Uso |
|---|---|---|
| Dominio | `documentar-notion` | Decide que crear, actualizar, extender o reportar |
| Perfil | `notion-josefabrizioid` / `notion-coordinador-aecode` | Seleccion de cuenta |
| Pill local | `~/.codex/credentials/notion/*.json` | Token local, nunca versionado |
| MCP/API | easy-notion, oficial, suekou o API fallback | Ejecucion |

## Candidatos Revisados

| Candidato | Fuente | Aporte | Decision |
|---|---|---|---|
| `Grey-Iris/easy-notion-mcp` | https://github.com/Grey-Iris/easy-notion-mcp | Markdown-first, 42 tools, views, comments, users, dry-run, batch entries | Mantener como ruta preferida si esta activo |
| Notion official MCP/API | https://developers.notion.com/guides/mcp/mcp | Ruta oficial/OAuth y API de Notion | Usar cuando este expuesta |
| Notion Views/Data Sources API | https://developers.notion.com/guides/data-apis/working-with-views | `database_id`, `data_source_id`, `views`, API `2026-03-11` | Absorbido como regla critica |
| `suekou/mcp-notion-server` | https://github.com/suekou/mcp-notion-server | API-first 2026-03-11, data sources, tools compactas | Candidato alternativo, no reemplazo |

## Brechas Cerradas

- `easy-notion-mcp` actualizado de 38 a 42 tools segun version auditada.
- `data_source_id` vs `database_id` documentado como regla critica.
- Views API 2026-03-11 formalizada.
- `suekou/mcp-notion-server` queda como candidato si easy/oficial falla en data sources.
- Modo `Markdown Fast Write` para documentacion larga.
- Modo `Data Source / View Guard` para evitar duplicar/borrar vistas.
- Modo `Profile-Safe` para reducir demoras por credenciales/cuenta incorrecta.

## Decision Operativa

Notion queda fuerte y bastante completo. No hace falta instalar otro MCP ahora.

Prioridad:

1. Usar easy-notion-mcp si esta disponible.
2. Usar MCP oficial/remoto/local si ya esta expuesto.
3. Usar API fallback por perfil local cuando el MCP apunte a cuenta incorrecta o falte una tool.
4. Considerar `suekou/mcp-notion-server` solo si hay una necesidad concreta de data sources/views modernas que la ruta actual no resuelva.

## No Hacer

- No escribir tokens en repo, skills ni config versionada.
- No mover paginas o bases sin confirmacion.
- No reemplazar contenido completo si basta append/update seccion.
- No borrar vistas, bases duplicadas o linked views sin dry-run/verificacion.
- No asumir que `database_id` y `data_source_id` son lo mismo.
- No crear tablas estaticas si el contenido necesita gestion como base editable.
