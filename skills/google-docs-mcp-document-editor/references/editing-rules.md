# Editing Rules

## General Principle

Change content without casually changing structure. In Google Docs, the visible layout can include normal document text, tables, headers, footers, drawings, positioned images, and imported objects.

## Safe Defaults

- Prefer replacing specific paragraphs, cells, or ranges over global search-and-replace.
- Read the section before editing it.
- After editing, read the affected section again.
- Keep the visual hierarchy: titles, subheads, lists, tables, captions, notes, and contact blocks.
- Preserve existing brand colors, table widths, spacing, and heading levels unless the user asks for redesign.

## Imported Document Caution

If the Google Doc was imported or converted:

- table behavior may be fragile
- text can be split into unusual ranges
- headers may be drawings instead of plain paragraphs
- some visible objects may not be editable through the Docs API

In these cases:

- avoid aggressive replacements
- inspect exact ranges or table indices first
- prefer minimal edits with validation after each step
- call out object-type limitations clearly

## Wording Discipline

Respect the document type. A proposal, thesis, report, contract, brochure, and meeting note need different language. Use the relevant domain skill for specialized content decisions, then apply this skill for Google Docs editing.
