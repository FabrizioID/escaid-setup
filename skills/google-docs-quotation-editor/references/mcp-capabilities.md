# MCP Capabilities

This skill relies on the custom Google Workspace MCP wired through `mcps/google-workspace-mcp`.

## Relevant Document Operations

- read document content
- replace ranges with markdown
- insert text
- delete ranges
- insert tables
- insert tables with data
- merge table cells
- set table cell background color
- apply text or paragraph formatting

## Practical Implications

- The skill does not need to reimplement table logic.
- It should point the agent toward the MCP tools already available.
- When a user asks for merged module rows or color bands in tables, use the MCP table operations directly.

## Known Limitation Pattern

Some visible header elements in Google Docs are not plain text:

- drawings
- embedded graphics
- positioned images

These may appear editable in the Google Docs UI but are not always exposed as editable text through the MCP or Docs API structure. Always verify the object type first.
