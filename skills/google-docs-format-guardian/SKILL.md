---
name: google-docs-format-guardian
description: Use when editing or creating any live Google Docs document where visual format, structure, typography, tables, spacing, inherited styles, or final QA matter, regardless of document type. Pair with google-workspace-editor or google-docs-mcp-document-editor for MCP operations, and with the relevant domain skill for content logic. Especially useful after inserting markdown, replacing sections, editing imported templates, or updating proposals, reports, manuals, contracts, meeting notes, brochures, or executive documents.
---

# Google Docs Format Guardian

Transversal format and QA skill for Google Docs. It is not a domain skill and not quotation-specific.

Use it to make sure a Google Doc looks intentional after content is inserted or edited.

## Skill Stack

Always separate responsibilities:

| Layer | Skill | Responsibility |
|---|---|---|
| Access | `google-workspace-editor` / Google Workspace MCP route | Read and modify Docs/Drive without exposing secrets |
| Document editing | `google-docs-mcp-document-editor` | Preserve document structure and perform safe edits |
| Domain logic | Relevant domain skill | Decide what the document should say |
| Format guardian | This skill | Verify and repair visual hierarchy, spacing, tables, inherited styles, and final QA |

For quotations, also use `technical-quotation-builder` or `google-docs-quotation-editor`.
For non-quotations, do not force quotation logic.

## Core Sequence

1. Think before editing:
   - document purpose
   - audience
   - desired reading path
   - source template constraints
   - domain skill needed
2. Inspect before writing:
   - current headings
   - paragraph styles
   - table patterns
   - fonts and sizes
   - spacing and indents
   - whether visible content is editable text, drawing, image, header/footer, or imported object
3. Plasmar:
   - apply the smallest viable edit
   - prefer targeted paragraph/table/range edits
   - use broad markdown insertion only when the section is meant to be rebuilt
4. Audit:
   - re-read affected sections
   - inspect actual Google Docs style objects, not only visible text
   - fix format drift before telling the user it is done

## Non-Negotiable QA

After editing a visually sensitive Google Doc, verify these actual style fields where possible:

- `namedStyleType`: body paragraphs should not accidentally become `HEADING_1` or `HEADING_2`.
- `bold`: only titles, labels, intentional emphasis, and table headers should be bold.
- `underline`: remove inherited underline unless explicitly intended.
- `backgroundColor`: remove text highlights/fondo heredado unless explicitly intended.
- `foregroundColor`: restore expected text colors after cleanup.
- `weightedFontFamily` and `fontSize`: match the document's body style.
- `indentStart`, `indentFirstLine`, `indentEnd`: inherited indents must be intentional.
- `lineSpacing`, `spaceAbove`, `spaceBelow`: match local document rhythm.
- Table header cell background and body cell text style.

Do not trust a superficial check such as "bodyBold false" if underline, paragraph heading type, or indentation were not inspected.

## Formatting Heuristics

- Preserve the template before improving it.
- Reuse the existing document's strongest table/header pattern.
- Avoid turning all inserted text into headings.
- Avoid global style resets unless the whole rebuilt range is known and safe.
- Keep body text clean: normal weight, no underline, no accidental highlight.
- Use bold surgically for headings, labels, and selected emphasis.
- If a paragraph looks wrong but text styles seem clean, inspect `paragraphStyle`; the issue may be heading type, spacing, or indentation.
- If a table looks wrong but text styles seem clean, inspect cell background, paragraph style inside cells, and header row formatting.
- If the user manually corrects formatting, inspect and learn the resulting style pattern before future edits.

## Learned GEN+ / ESPARQ Pattern

For GEN+ quotation-like Google Docs, when no better template evidence overrides it:

- Body font: `Roboto Condensed`, around `10.5 pt`.
- Table header: dark GEN+ navy `#17365D`, white text, bold.
- Table body: normal text, no underline, no highlight.
- Headings/subheads: bold only where intentional; avoid inherited `HEADING_1` in normal paragraphs.
- Some blocks may intentionally use compact `lineSpacing` around `115`; main paragraphs may use `150`.
- Some sections may intentionally use controlled indents; do not remove them after the user corrects spacing.

This is a reference pattern, not a universal rule. Always inspect the live document.

## Repair Patterns

### When inserted paragraphs become huge/bold/indented

Likely cause: markdown insertion or surviving paragraph inherited `HEADING_1`, heading IDs, or indents.

Repair:

- set body paragraphs to `NORMAL_TEXT`
- set intended body font and size
- remove underline/background
- restore only intentional bold
- reset or match indents from the local template

### When tables inherit underline or bold

Repair:

- style header row separately: bold + white foreground + brand background
- style body cells separately: normal weight + no underline + no text background
- inspect paragraph style inside table cells, not only cell text style

### When a section was manually fixed by the user

Do not overwrite it. Read the corrected style and treat it as local source of truth.

## Gotchas al DUPLICAR Docs (copyFile MCP) — aprendido en cartas Summit 2026

Cuando replicas una carta/plantilla de Google Docs (ej. membrete + cuerpo) duplicando con `copyFile`:

- **El membrete/logo vive como IMAGEN INCRUSTADA** en el cuerpo o header del Doc. `copyFile` lo preserva nativo; **copiar solo el TEXTO a un Doc en blanco lo pierde** (y arrastra espaciado sucio). Para replicar una carta con membrete: duplicar el Doc bueno con `copyFile`, no recrear el texto.
- **`copyFile` puede CORROMPER caracteres especiales** (« » guillemets, · middot, — em-dash): parte párrafos o pierde contenido en la copia. **Regla: auditar el texto completo tras duplicar** (no fiarse de los counts de `findAndReplace`).
- **`findAndReplace` y « »:** los guillemets no siempre matchean en `findText` (sí funcionan en `replaceText`). Evitar « » en los `findText`; usar substrings sin ellos.
- **`findAndReplace` SÍ matchea saltos de línea:** `"Señor\n"` → `"Señores\n"` funciona (útil para reemplazos que cruzan párrafos).
- **Bloque de datos justificado con valor largo que wrappea = se ESTIRA** (huecos horribles entre palabras). Fix: `alignment: START` + `indentEnd: 0` en esos párrafos (mantener `indentStart`). Mismo principio que en Sheets (ver `google-sheets-format-guardian`).
- **Borrar Docs preexistentes suele estar bloqueado** (recurso compartido) → renombrar a "OBSOLETA — NO ENVIAR" en vez de borrar.

Para el flujo operativo de cartas-a-pedido (variables, QA checklist), ver el proyecto, no esta skill.

## Final Response Discipline

When finished, report:

- what section was edited
- what format checks were run
- any remaining limitation caused by drawings/images/imported objects

If only asked to inspect and learn, do not modify the document.
