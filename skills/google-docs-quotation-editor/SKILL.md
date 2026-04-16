---
name: google-docs-quotation-editor
description: Edit corporate quotations, proposals, and brochures in Google Docs while preserving the original template and visual structure. Use when Codex should update commercial proposals with the Google Workspace MCP, make surgical text changes, insert or refine module tables, merge cells, color table sections, preserve imported layouts, or avoid breaking visually sensitive documents.
---

# Google Docs Quotation Editor

Use this skill for commercial documents in Google Docs that must be updated carefully without breaking the original visual template.

This skill assumes the repo has access to the custom Google Workspace MCP in `mcps/google-workspace-mcp`, including extended table operations.

## Quick Start

When this skill triggers:

1. Confirm the Google Doc URL or `documentId`.
2. Read [references/editing-rules.md](references/editing-rules.md).
3. Read [references/mcp-capabilities.md](references/mcp-capabilities.md).
4. If the task involves tables, read [references/table-patterns.md](references/table-patterns.md).
5. Inspect the current document structure before editing.

## Use This Skill For

- Corporate quotations in Google Docs
- Commercial proposals and brochures with fixed visual identity
- Surgical content replacement inside an imported or converted document
- Detailed table editing where structure must remain stable
- Module tables with merged title rows and color styling
- Updating visible proposal copy without reauthoring the whole document

## Core Rules

- Preserve the template before optimizing the wording.
- Prefer surgical changes over broad replacements.
- Inspect the live document structure before editing tables.
- Treat imported or converted documents as fragile.
- Do not assume a banner, drawing, or embedded header is plain text.
- If the user says the document must “look like the original proposal,” keep the layout and change content only.
- If a table already works as a visual pattern, reuse that pattern instead of inventing a new one.

## Editing Workflow

Use this order unless the user asks for one narrow change only:

1. Identify the target area:
   header,
   body copy,
   module table,
   pricing table,
   final contact block,
   or embedded graphic.
2. Read the relevant surrounding section before editing.
3. If the task affects tables, inspect table start indices and row logic first.
4. Apply the smallest viable change.
5. Re-read the affected section after the edit.
6. Call out any visual limitation when the object is a drawing or embedded image rather than editable text.

## Table Rules

- Reuse validated table structures when available.
- For module tables, keep the 4-column logic when that is the approved pattern.
- Use merged rows for module labels only when the existing table style requires it.
- Use cell background color intentionally and sparingly.
- Confirm whether text lives in a table cell, a paragraph, or a drawing before editing.

## Routing

Use the first route that matches:

1. If the user asks for a careful wording update, read [references/editing-rules.md](references/editing-rules.md).
2. If the user asks what the Docs MCP can do, read [references/mcp-capabilities.md](references/mcp-capabilities.md).
3. If the user asks to edit or rebuild module tables, read [references/table-patterns.md](references/table-patterns.md).
4. If the user asks to change a banner, header strip, or logo block, first verify whether it is a drawing or embedded image.

## Output Discipline

- Always distinguish editable document text from drawings or images.
- Explain when a limitation comes from the object type rather than from the content.
- When touching tables, identify exactly which table pattern is being reused.
- When the document is visually fragile, prefer “safe and correct” over “fully automated.”
