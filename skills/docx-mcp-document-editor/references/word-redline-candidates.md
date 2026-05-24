# Word Redline Candidates

Referencia de potenciacion externa para DOCX. No instalar directo sin auditoria.

## Brecha

La skill local `docx-mcp-document-editor` y los MCP actuales permiten edicion, tablas, comentarios extraidos, footnotes, proteccion y PDF. El hueco principal es:

- tracked changes/redlines nativos;
- comentarios anclados insertables/editables;
- comparacion de versiones;
- auditoria estructural avanzada.

## Candidatos

| Repo/herramienta | Aporte | Decision |
|---|---|---|
| `SecurityRonin/docx-mcp` | Track changes, comments, footnotes, headers/footers, images, protection, structural audit | Adaptar como fallback opcional, no reemplazar Word MCP actual |
| `UseJunior/safe-docx` | Safe DOCX editing with redlines/comments/compare | Auditar si redlines es prioridad |
| `hongkongkiwi/docx-mcp` | MCP DOCX en Rust | Comparar arquitectura |
| Adeu | SDK/MCP comercial para native track changes | Referencia, no instalar sin decision |

## Candidato Auditado: `SecurityRonin/docx-mcp`

Fuente: https://github.com/SecurityRonin/docx-mcp

Veredicto operativo: **adoptar criterios y dejar como MCP opcional para redlines**, no reemplazar `word_document_server` ni `docx_editor_local`.

Aporta de forma diferenciada:

- control de cambios nativo en OOXML;
- comentarios anclados, respuestas, resolucion y borrado;
- footnotes/endnotes y validacion;
- auditoria estructural de DOCX;
- revision de paraIds, bookmarks, relaciones, imagenes y artefactos residuales;
- comparacion/review tooling para documentos sensibles.

Riesgos detectados:

- instalador sugiere `curl | bash`; no usar esa ruta;
- dependencias pesadas: Presidio, spaCy y `spacy-transformers`;
- PDF usa LibreOffice por subprocess local;
- README incluye imagen externa de tracking/telemetria visual;
- base grande: instalar solo si hay necesidad real de redlines.

Ruta segura si se habilita:

1. instalar en entorno aislado, no con `curl | bash`;
2. registrar como MCP separado, por ejemplo `docx_redline_mcp`;
3. probar con DOCX descartable;
4. validar `open_document`, `search_text`, `insert_text`, `delete_text`, `add_comment`, `audit_document`, `save_document`;
5. no procesar tesis/contratos reales hasta pasar prueba local;
6. mantener `docx-mcp-document-editor` como skill de dominio principal.

## Regla Operativa

Si el usuario pide `tracked changes`, `redline`, `control de cambios`, revision legal o comparacion de versiones:

1. no prometer que la ruta actual lo soporta;
2. crear copia de seguridad;
3. si `docx_redline_mcp` esta activo y probado, usarlo para redlines reales;
4. si no hay MCP redline activo, entregar copia editada + changelog Markdown;
5. proponer habilitar `SecurityRonin/docx-mcp` solo cuando el beneficio justifique el peso operativo.

## Criterios De Auditoria

- No debe subir documentos a terceros.
- Debe trabajar localmente.
- Debe preservar formato existente.
- Debe soportar comentarios y tracked changes compatibles con Microsoft Word.
- Debe tener operaciones quirurgicas, no solo recrear documentos.
- Debe evitar scripts destructivos o permisos amplios.
- Debe funcionar en Windows.
