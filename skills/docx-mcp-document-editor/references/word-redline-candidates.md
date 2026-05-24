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
| `SecurityRonin/docx-mcp` | Track changes, comments, footnotes, headers/footers, images, protection, structural audit | Auditar primero |
| `UseJunior/safe-docx` | Safe DOCX editing with redlines/comments/compare | Auditar si redlines es prioridad |
| `hongkongkiwi/docx-mcp` | MCP DOCX en Rust | Comparar arquitectura |
| Adeu | SDK/MCP comercial para native track changes | Referencia, no instalar sin decision |

## Regla Operativa

Si el usuario pide `tracked changes`, `redline`, `control de cambios`, revision legal o comparacion de versiones:

1. no prometer que la ruta actual lo soporta;
2. crear copia de seguridad;
3. si no hay MCP redline activo, entregar copia editada + changelog Markdown;
4. proponer auditoria de `SecurityRonin/docx-mcp` o `safe-docx` antes de instalar.

## Criterios De Auditoria

- No debe subir documentos a terceros.
- Debe trabajar localmente.
- Debe preservar formato existente.
- Debe soportar comentarios y tracked changes compatibles con Microsoft Word.
- Debe tener operaciones quirurgicas, no solo recrear documentos.
- Debe evitar scripts destructivos o permisos amplios.
- Debe funcionar en Windows.
