# Auditoria Externa - SecurityRonin/docx-mcp

Fecha: 2026-05-24

Fuente: https://github.com/SecurityRonin/docx-mcp

## Veredicto

**Adaptar como fallback opcional para redlines/tracked changes. No reemplazar el Word MCP actual.**

El repositorio cubre una brecha real del ecosistema ESC-AI: control de cambios nativo, comentarios anclados, revision estructural OOXML y auditoria avanzada. La ruta local actual ya cubre edicion Word general, tablas, estilos, footnotes, comentarios extraidos, proteccion y PDF, por lo que este candidato debe entrar solo cuando la tarea exija revision visible tipo Word.

## Aportes Utiles

- `insert_text` y `delete_text` con marcas de revision.
- `get_tracked_changes`, `accept_changes`, `reject_changes` y `set_track_changes`.
- Comentarios anclados, replies, update, delete, resolve y threads.
- Footnotes/endnotes con validacion.
- Auditoria de estructura DOCX: XML, relaciones, paraIds, bookmarks, imagenes, artefactos residuales.
- Trabajo local sobre OOXML, sin necesidad observada de subir documentos a terceros.

## Riesgos

- El instalador documentado usa `curl | bash`; no usar esa ruta.
- Dependencias pesadas: Presidio, spaCy y `spacy-transformers`.
- El export PDF llama LibreOffice/soffice por subprocess local.
- README contiene una imagen externa tipo beacon/telemetria visual.
- Base grande con muchas herramientas; requiere prueba con documentos descartables antes de operar sobre tesis, contratos o propuestas finales.

## Decision Operativa

Mantener tres niveles:

| Nivel | Herramienta | Uso |
|---|---|---|
| Base | `docx_editor_local` | lectura/reemplazo simple con Word COM |
| Principal | `word_document_server` | edicion Word general, tablas, estilos, footnotes, proteccion, PDF |
| Fallback opcional | `SecurityRonin/docx-mcp` como `docx_redline_mcp` | redlines, track changes, comentarios anclados y auditoria OOXML |

## Protocolo De Habilitacion

1. No instalar con `curl | bash`.
2. Instalar en entorno aislado o via `uvx docx-mcp-server`.
3. Registrar como MCP separado: `docx_redline_mcp`.
4. Probar solo con un DOCX descartable.
5. Validar apertura, busqueda, insercion, eliminacion, comentario, auditoria y guardado.
6. Abrir el resultado en Word antes de usarlo en documentos reales.

## Estado

Absorbido en:

- `skills/docx-mcp-document-editor/references/word-redline-candidates.md`
- `docs/tool-verticals/word-mcp-potenciacion.md`

Pendiente solo si el usuario prioriza control de cambios real: instalacion aislada y prueba end-to-end.
