# Auditoria Externa - Notion MCP Candidates

Fecha: 2026-05-24

Fuentes:

- https://github.com/Grey-Iris/easy-notion-mcp
- https://github.com/suekou/mcp-notion-server
- https://developers.notion.com/guides/data-apis/working-with-views
- https://developers.notion.com/guides/mcp/mcp

## Veredicto

Decision: **Adaptar criterios y mantener rutas actuales**.

Confianza: Alta para criterios; media para instalacion de nuevos MCP.

Riesgo: Medio si se exponen tokens, HTTP sin bearer o herramientas destructivas sin dry-run.

## Valor

`easy-notion-mcp` aporta la ruta mas rapida para documentacion diaria: markdown, secciones, toggles, bases, vistas, comentarios y batch entries.

`suekou/mcp-notion-server` aporta una ruta API-first actualizada a Notion API `2026-03-11`, util para data sources y herramientas compactas.

La documentacion oficial de Notion confirma que `database_id`, `data_source_id` y `view_id` deben tratarse por separado en la API moderna.

## Riesgos

- Tokens `NOTION_TOKEN` / `NOTION_API_TOKEN` deben vivir solo en credenciales locales o env del MCP.
- HTTP de easy-notion requiere bearer en static-token mode.
- `file://` uploads pueden tocar filesystem local; usar solo stdio y rutas controladas.
- Herramientas destructivas deben requerir confirmacion/dry-run.
- MCP alternativos pueden duplicar tool surface y confundir agentes si se registran con el mismo nombre.

## Solape

Skill propia relacionada: `documentar-notion`.

Diferencial real:

- easy-notion: escritura y lectura markdown, token efficiency, batch y views.
- suekou: API moderna compacta, data source model y raw fallback.

Riesgo de confusion: alto si se instalan varios servidores como `notion`. Usar nombres separados: `notion-easy`, `notion-official`, `notion-api2026`.

## Recomendacion Operativa

- No instalar nada nuevo ahora.
- Potenciar `documentar-notion` con modos 2026.
- Mantener perfiles separados para Fabrizio y coordinador.
- Si se prueba suekou, hacerlo con nombre separado y una pagina descartable.
- Para Notion privado, preferir stdio/API local sobre HTTP remoto.

## Decision Final

Absorbido en:

- `skills/documentar-notion/SKILL.md`
- `skills/documentar-notion/references/notion-mcp-and-api-patterns.md`
- `skills/documentar-notion/references/notion-mcp-candidates.md`
- `docs/tool-verticals/notion-potenciacion.md`
