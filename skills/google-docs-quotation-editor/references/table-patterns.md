# Table Patterns

## Reuse Existing Good Tables

If the document already contains one validated table with the right look and spacing, use that as the visual pattern.

## Common Approved Pattern

For detailed module tables:

- 4 columns:
  - `Módulo/Tema`
  - `Subitems`
  - `Objetivo Específico`
  - `Materiales de Estudio`
- a header row
- a second row used as the module band
- the module band merged across all 4 columns
- optional gray or approved brand fill on the module band
- progressive unit rows below

## Safe Procedure

1. Locate the table start index.
2. Confirm which row is the header and which row is the module band.
3. Insert or update row content first.
4. Merge cells only after the target row exists.
5. Apply background color after merging.
6. Re-read the table structure when the document is imported or has prior conversion issues.

## Avoid

- rebuilding a stable table from scratch unless necessary
- applying broad formatting changes across unrelated rows
- assuming the same index after a prior structural edit without re-reading
