---
name: google-docs-quotation-editor
description: Edit corporate quotations, proposals, and brochures in Google Docs while preserving the original template and visual structure. Use when Codex should update commercial proposals with the Google Workspace MCP, make surgical text changes, insert or refine tables, color table sections, preserve imported layouts, or avoid breaking visually sensitive documents.
---

# Google Docs Quotation Editor

Use this skill for commercial Google Docs that must be edited carefully without breaking the original visual template.

This skill assumes the repo has access to the custom Google Workspace MCP in `mcps/google-workspace-mcp`, including table operations such as insertion, merging, and cell background color updates.

## Quick Start

When this skill triggers:

1. Confirm the Google Doc URL or `documentId`.
2. Confirm the intended Google Docs access route before doing any workaround:
   active Google Workspace MCP tools, local `mcps/google-workspace-mcp`, or the `FabrizioID/escaid-setup` repo copy.
3. Read `references/editing-rules.md`.
4. Read `references/mcp-capabilities.md`.
5. If the task involves tables, read `references/table-patterns.md`.
6. Inspect the current document structure before editing.
7. Run a commercial coherence scan before writing.

## Use This Skill For

- Corporate quotations in Google Docs
- Commercial proposals and brochures with fixed visual identity
- Surgical content replacement inside imported or converted documents
- Table insertion, refinement, and branding alignment
- Updating visible proposal copy without reauthoring the whole document

## Core Rules

- Preserve the template before optimizing wording.
- Prefer surgical changes over broad replacements.
- Do not treat inherited template content as confirmed scope.
- Ask the user before keeping commercial assumptions that were not explicitly confirmed, such as pilots, discounts, client names, reference projects, delivery stages, payment terms, or unit rates.
- Inspect the live document structure before editing tables.
- Confirm the document branding before changing colors, fills, or table styling.
- Before choosing colors, take one existing table in the same document as the visual source of truth whenever possible.
- Treat imported or converted documents as fragile.
- Do not assume a banner, drawing, or embedded header is plain text.
- If the user wants the document to look like the original proposal, keep the layout and change content only.
- If a table already works as a visual pattern, reuse that pattern instead of inventing a new one.
- If a visual issue appears right after editing, allow Google Docs time to finish rendering before assuming the structure is broken.
- When a full-body rewrite would risk the layout, update only the exact values or paragraphs requested.
- If the expected MCP or skill route is missing, inspect the local setup repo before trying alternate API scripts or plugin installs. Default repo: `https://github.com/FabrizioID/escaid-setup`; common local path: `Proyecto/escaid-setup`.
- If access is still unclear after checking active tools, local skills, `~/.codex/config.toml`, and `escaid-setup`, stop and ask the user whether they can lift the restriction or point to the right connector. Do not spend time improvising parallel access methods silently.

## MCP And Skill Discovery

Before editing a Google Docs quotation, establish the canonical route:

1. Check active tool names for a Google Workspace or Google Docs MCP.
2. If the MCP is not exposed in the current tool list, inspect `~/.codex/config.toml` for servers such as `google_docs_cloud`, `google-workspace-mcp`, `google-docs`, or `scd-mcp-docs`.
3. Inspect the local setup repo before using ad hoc fallbacks:
   - `Proyecto/escaid-setup/mcps/google-workspace-mcp`
   - `Proyecto/escaid-setup/skills/google-docs-quotation-editor`
   - `Proyecto/escaid-setup/skills/google-workspace-credentials`
4. Use the local MCP implementation and its profile/token conventions when available.
5. If the route is blocked by auth, missing env vars, missing profile, or unavailable connector exposure, ask the user for direction instead of silently trying unrelated plugins, browser access, or custom scripts.

## Pre-Edit Commercial Coherence Scan

Before making inherited-template edits, scan the document and report questions if any item is ambiguous:

- project name, client, quotation code, and issue date
- whether a pilot exists for this new project
- whether any discount, package price, or prior validation case still applies
- whether the economic table header represents total price, unit rate, or valuation criterion
- consistency between the first economic table and later payment/valuation tables
- unit consistency such as `TON`, `m2`, `m²`, `GLB`, and monthly/daily/resource units
- repeated or contradictory rates, for example `13 USD/TON` in one place and `15 USD/TON` elsewhere
- inherited project names, buildings, phases, blocks, or client-specific terms
- scope text that charges the same work twice or keeps an old additional item
- terms, assumptions, exclusions, and validity that no longer match the current quote

If the scan finds unconfirmed commercial logic, ask before writing. Do not "normalize" the quote by guessing.

## Editing Workflow

Use this order unless the user asks for one narrow change only:

1. Run the pre-edit commercial coherence scan.
2. Ask the user to confirm unclear commercial assumptions before editing.
3. Identify the target area:
   header,
   body copy,
   scope section,
   pricing table,
   comparison table,
   final contact block,
   or embedded graphic.
4. Read the relevant surrounding section before editing.
5. If the task affects tables, inspect table start indices and row logic first.
6. If the task affects colors or visual styling, identify the branding reference first:
   an existing table,
   a visible band,
   the first pricing table,
   or an explicit user-provided sample.
7. If the task affects tables, identify whether the issue comes from:
   cell fill,
   text highlight,
   paragraph shading,
   or delayed Docs rendering.
8. Apply the smallest viable change.
9. Re-read the affected section after the edit.
10. Call out any visual limitation when the object is a drawing or embedded image rather than editable text.

## Table Rules

- Reuse validated table structures when available.
- Reuse the color palette of an existing table in the same document whenever possible.
- Use cell background color intentionally and sparingly.
- Confirm whether text lives in a table cell, a paragraph, or a drawing before editing.
- If color replication matters, inspect the live document structure first and only approximate a palette when the user explicitly accepts approximation.
- If a new comparison table is safer than modifying a fragile legacy block, recreate the table and then style it to match the document pattern.
- When header text shows an unexpected white or colored block, check text background/highlight separately from the cell background.
- After styling a newly inserted table, give Docs a moment to render before deciding the result is wrong.

## Branding Checklist

Before styling any quotation table, confirm these in order:

1. Which existing table is the branding reference.
2. What the header fill looks like.
3. Whether the first column is filled, neutral, or left white.
4. Whether the text uses white-on-brand or dark-on-light treatment.
5. Whether the user wants exact matching or just visual alignment.

If the user has not specified branding, ask or infer it from the first or main pricing table in the document.

## Safe Quote Updates

For visually sensitive quotations:

- prefer updating amounts, deadlines, project names, and scope text surgically
- avoid replacing the entire body with markdown unless the user explicitly wants a rebuild
- if the user restores an earlier version, continue from that restored version and reapply only the minimum necessary edits
- if the user requests a technical comparison table, keep it as technical support text and avoid explicit pricing language unless requested
- when adapting a previous quotation to a new project, preserve price and scope only when the user explicitly says they are the same; otherwise flag the inherited values for confirmation
- when the user says "same price" or "similar scope", still verify whether inherited pilots, discounts, prior buildings, and unit-rate labels apply to the new project

## Routing

Use the first route that matches:

1. If the user asks for a careful wording update, read `references/editing-rules.md`.
2. If the user asks what the Docs MCP can do, read `references/mcp-capabilities.md`.
3. If the user asks to edit or rebuild tables, read `references/table-patterns.md`.
4. If the user asks to change a banner, header strip, or logo block, first verify whether it is a drawing or embedded image.

## Output Discipline

- Always distinguish editable document text from drawings or images.
- Explain when a limitation comes from the object type rather than from the content.
- When touching tables, identify which existing table pattern is being reused.
- When the document is visually fragile, prefer safe and correct over fully automated.
