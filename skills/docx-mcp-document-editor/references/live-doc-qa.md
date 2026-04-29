# Live Document QA

Use this checklist after editing a live Google Doc or Docx.

## Semantic QA

- The edited text says the same thing the user intended.
- The document does not contain old concepts from previous drafts.
- Headings, rows, bullets, and notes match the agreed hierarchy.
- No paragraph contradicts the economic table or scope table.
- The output is readable as a professional document, not only as inserted text.

## Visual QA

- Tables still have the expected number of rows and columns.
- Header colors, brand fills, and borders follow the existing pattern.
- Bold is limited to headers, labels, and intended emphasis.
- Body text is not accidentally all bold.
- Bullets and line breaks support scanning.
- No mojibake or broken characters were introduced.

## Tool QA

- Reread the affected area after any table structural operation.
- Recompute or rediscover indices after insertions/deletions.
- Validate using exported markdown/text when direct visual inspection is limited.
- If Docs rendering is delayed, wait and reread before assuming failure.
