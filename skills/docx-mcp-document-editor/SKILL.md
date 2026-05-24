---
name: docx-mcp-document-editor
description: Edit local Word/DOCX documents with Word MCP or local DOCX tools while preserving structure, tables, formatting, branding, and text logic. Use when Codex must modify .docx proposals, reports, contracts, letters, quotations, theses, or any visually sensitive Word document where the main challenge is safe document intervention, not domain strategy. For live Google Docs use google-docs-mcp-document-editor or google-workspace-editor instead.
---

# Docx MCP Document Editor

Use this skill when the task is to operate on a local Word/DOCX document without damaging its visual or semantic structure.

This is a document-editing skill, not a quotation strategy skill. If the task also requires building quotation logic, use `technical-quotation-builder` first, then use this skill to insert the result into the document.

## Paquete operativo

Una llamada a esta skill debe elegir la ruta editable correcta:

| Capa | Ruta | Funcion |
|---|---|---|
| Dominio | `docx-mcp-document-editor` | Preservar estructura, tablas, formato, branding y logica textual |
| Apertura MCP | Word MCP o `docx_editor_local` | Abrir, leer y editar documentos `.docx` locales |
| Pill local | Ruta local del documento | No requiere credenciales salvo que el archivo este en un servicio externo |

Arranque veloz: confirmar ruta `.docx`, probar lectura no destructiva, editar solo despues de leer la zona afectada. Si la fuente es Google Docs, cambiar a `google-docs-mcp-document-editor` o `google-workspace-editor`.

## Core Principle

Separate reasoning from editing.

1. Plan the change in plain text before touching the document.
2. Edit the document surgically.
3. Run semantic and visual QA before reporting completion.

Do not reason and edit at the same time when the document is fragile. Tool work can consume attention and cause scope or wording mistakes.

## Workflow

### 1. Document Intake

Before editing:

- identify the document type: proposal, quotation, report, contract, letter, minutes, brochure
- identify the editable technology: Word MCP, Docx MCP/local `.docx`, converted import, or exported markdown
- create or choose a working copy before editing any thesis, contract, proposal, or final report
- inspect the current structure before modifying it
- locate tables, section headings, repeated patterns, branding colors, and fragile imported elements
- distinguish editable text from drawings, images, headers, footers, or embedded objects

For live Google Docs, stop and route to `google-docs-mcp-document-editor` or `google-workspace-editor`; this skill is only for Word/DOCX.

### 2. Pre-Edit Reasoning

Write or mentally confirm the target structure before applying changes:

- target sections and tables
- rows/cells/paragraphs to change
- exact hierarchy implied by the text
- wording that must be inserted
- wording that must not remain
- formatting that must be preserved

If the user gives a correction like "these are not alternatives, they are two activities inside one deliverable", stop editing and rebuild the text logic first.

### 3. Surgical Edit

Prefer narrow operations:

- replace exact paragraphs or cells rather than rewriting the whole body
- update rows only after confirming table indices or row meaning
- reread document structure after structural edits such as row deletion, row insertion, or cell merge
- avoid broad find/replace unless the text is globally safe
- preserve existing headings, table widths, colors, and visual rhythm

When editing tables:

- confirm whether a table row is a header, section band, pricing row, detail row, or note row
- keep row count aligned with the intended meaning
- avoid converting activities into proposals or line items by accident
- avoid duplicating scope across multiple rows

### 4. Formatting Rules

The format is part of the deliverable.

- preserve the document's branding and existing visual grammar
- use the best existing table as the visual source of truth
- keep bold selective: usually headers, row titles, key labels, or first lines only
- avoid leaving full cell bodies in bold unless the template already does so
- preserve line breaks where they help scanability
- do not remove bullets that carry structure
- do not introduce markdown artifacts into live document text
- watch for mojibake or encoding damage after scripts or shell pipelines

### 5. Auto QA

After editing, review the affected content as a reviewer, not as a tool operator.

Check:

- Does each section or row represent the correct unit of meaning?
- Did any bullet contradict the agreed structure?
- Did inherited text from an earlier version remain?
- Are table rows, units, labels, and totals aligned?
- Are bold, bullets, spacing, and line breaks professional?
- Does the document still follow the original communication sequence?
- Does the exported/markdown/text view match the intended text?

If the document is a quotation or proposal, also check commercial hierarchy with `technical-quotation-builder`.

## Potentiated Modes

### Safe Copy First Mode

For important Word files, never treat the only original as the work surface. Create a copy or write to an explicit output path, then report both source and final path.

### Word Structure Audit Mode

For long or fragile files, inspect outline/headings, tables, comments, footnotes, images, fields, headers/footers, and protected sections before editing.

### Table Surgery Mode

For tables, identify the table by index and surrounding text. Confirm row meaning before changing content: header, section band, item row, note row, total row, or annex row.

### Review / Comments Mode

If the user wants review instead of direct edits, extract existing comments and provide proposed comments or a review list. Insert comments only when the active tool supports reliable anchoring.

### Redline / Track Changes Mode

If the user asks for tracked changes, redlines, legal review, or version comparison, read `references/word-redline-candidates.md`. Do not assume the active local route supports native tracked changes.

Operational order:

1. create a working copy;
2. use an active/proven `docx_redline_mcp` route only if available;
3. otherwise use the normal DOCX route and deliver an edited copy plus a changelog;
4. never install a redline MCP through `curl | bash`;
5. treat `SecurityRonin/docx-mcp` as an optional specialized fallback, not the default Word route.

## Common Failure Modes

- Editing a table correctly but leaving the wrong business logic.
- Leaving too much text in bold after replacing a formatted cell.
- Mixing old and new scope in the same paragraph.
- Treating an activity, deliverable, and proposal as the same thing.
- Trusting that a successful API response means the document reads well.
- Failing to reread the document after deleting or inserting rows.

## References

- Read `references/live-doc-qa.md` when the task involves fragile formatting, tables, or repeated correction.
- Read `references/word-redline-candidates.md` when the user asks for tracked changes, redlines, review markup, or Word version comparison.
