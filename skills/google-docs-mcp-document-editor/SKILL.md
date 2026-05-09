---
name: google-docs-mcp-document-editor
description: Edit live Google Docs documents through a Google Workspace MCP while preserving document structure, tables, formatting, comments, imported layouts, and visual identity. Use when Codex needs to inspect, modify, replace, format, or QA Google Docs content for proposals, reports, theses, brochures, manuals, letters, contracts, meeting notes, or any layout-sensitive document; combine with domain skills such as technical-quotation-builder when the document content needs specialized business logic.
---

# Google Docs MCP Document Editor

Use this skill for careful editing of live Google Docs through the Google Workspace MCP. This is a transversal document-editing skill, not a quotation-only skill.

If the task needs domain logic, use the relevant domain skill first, then use this skill to apply the result in Google Docs.

Examples:

- For a commercial quotation: use `technical-quotation-builder`, then this skill.
- For an academic document: use the thesis or APA skill as needed, then this skill.
- For a visually sensitive proposal or brochure: use this skill directly.

## Required Access

This skill assumes an active Google Workspace MCP with Google Docs, Drive, and optionally Sheets tools. If the tool is missing or unauthenticated, trigger `google-workspace-credentials` before attempting edits.

## Quick Start

1. Confirm the Google Doc URL or `documentId`.
2. Inspect the current document before editing.
3. Identify whether the target content is editable text, a table cell, a drawing, an image, a header/footer, or an imported object.
4. If the task affects tables, read `references/table-editing.md`.
5. Apply the smallest viable change.
6. Re-read the affected section and run semantic and visual QA.

## Editing Workflow

1. Identify the target area:
   title, body copy, heading, list, table, pricing table, figure block, comment thread, final contact block, header/footer, or embedded graphic.
2. Read the surrounding section before editing.
3. Plan exact changes in plain text when the document is fragile.
4. Use targeted MCP operations instead of broad rewrites.
5. Re-read the affected section after every structural edit.
6. Explain any limitation caused by object type, such as drawings or embedded images.

## Core Rules

- Preserve the existing template before improving wording.
- Prefer surgical changes over broad replacements.
- Treat imported or converted documents as fragile.
- Do not assume visible text is editable document text.
- Reuse existing table patterns when they already work visually.
- Do not change table structure until table indices, rows, and cells are confirmed.
- Keep formatting changes narrow: affected paragraphs, rows, cells, or ranges only.
- Do not expose secrets, tokens, client IDs, or client secrets in the document or response.

## Google Docs MCP Operations

Use available MCP tools for:

- reading document content as text, JSON, or markdown
- inserting, replacing, or deleting text by range
- replacing a range with markdown when appropriate
- applying text and paragraph styles
- inserting tables or pre-filled tables
- merging table cells
- setting table cell background colors
- inserting page breaks and images
- listing, adding, replying to, or resolving comments
- locating or creating documents through Drive

When the MCP tool list differs from these names, map the intent to the closest available tool and verify after each mutation.

## QA Checklist

- Did the edited section still keep the document's visual hierarchy?
- Did headings, bullets, table rows, captions, and contact blocks remain aligned?
- Did any old text remain that contradicts the new content?
- Did table rows still represent the right unit of meaning?
- Did formatting apply only to the intended range?
- Did imported graphics, drawings, or headers remain untouched unless explicitly targeted?
- If another domain skill was used, does the final document still follow that domain logic?

## References

- Read `references/editing-rules.md` for fragile-document editing rules.
- Read `references/mcp-capabilities.md` when checking what the Google Workspace MCP should support.
- Read `references/table-editing.md` before editing, rebuilding, merging, or styling tables.
