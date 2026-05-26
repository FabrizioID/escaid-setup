# MCP Capabilities

This skill relies on a Google Workspace MCP wired to Google Docs, Drive, and optionally Sheets.

## Expected Google Docs Operations

- read document content as plain text, JSON, or markdown
- append text
- insert text at a specific position
- delete ranges
- modify or replace text in a range
- find and replace text
- replace a document or range with markdown
- apply text styles
- apply paragraph styles
- insert tables
- insert tables with data
- merge table cells
- set table cell background color
- insert page breaks
- insert images from URLs or local files
- list, add, reply to, resolve, or delete comments

## Expected Drive Operations

- list documents
- search documents
- get document metadata
- create documents
- create documents from templates
- create folders
- list folder contents
- move, copy, rename, or delete files
- download files
- export Google Workspace files when supported by the MCP/Drive API

## Practical Implications

- Use MCP table operations directly for merged rows, colored bands, and pre-filled tables.
- Use Drive operations to locate or duplicate documents before editing when appropriate.
- Prefer reading as structured JSON for precise range/table work.
- Prefer markdown round-trip only for sections where formatting conversion is acceptable.
- When working on Sheets used by n8n, inspect schema/header rows before writing values or formatting.
- When the MCP lacks a needed operation, read `google-workspace-cli-fallback.md` before inventing custom scripts.

## Known Limitations

Some visible header elements in Google Docs are not plain text:

- drawings
- embedded graphics
- positioned images
- imported header strips

These may appear editable in the UI but may not be exposed as editable text through the MCP or Docs API structure. Verify object type before promising an automated edit.
