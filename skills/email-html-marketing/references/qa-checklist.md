# QA Checklist

Run before final delivery.

## Asset QA

- No `file:`, `blob:`, local path, or private Drive source.
- No `data:image` in final HTML unless explicitly requested.
- Every final image has a manifest entry.
- Every final image has `alt`.
- Image widths are explicit and mobile-safe.
- Drive/lh3 URLs are real, not invented.
- If an image changed after feedback, the final HTML uses a new Drive fileId or a clearly refreshed URL.
- No visible crop mistakes: cut-off titles, half borders, clipped people/faces, unwanted brochure headers, duplicated CTA text, or accidental white margins.
- If source image text was recreated as HTML, the old image text is removed/cropped where practical.

## HTML QA

- Main layout is table-based.
- Critical CSS is inline.
- One simple responsive breakpoint exists when needed.
- No JavaScript.
- No forms.
- No external CSS dependency.
- No unsupported app-like layout as core structure.
- CTA is visible and link-ready.
- Footer/legal block exists when required.

## Content QA

- Objective is reflected.
- Audience/tone are respected.
- Offer and CTA are clear.
- Copy hierarchy is scannable.
- No unresolved placeholders.
- No invented claims, dates, prices, or URLs.
- Spanish copy has proper accents, unless the user explicitly requests ASCII-only copy.
- Footer/contact data is real and link-ready when supplied.

## Preview QA

- Desktop preview checked or explicit reason given.
- Mobile preview checked or explicit reason given.
- Broken layout issues patched.
- Re-preview after every crop, Drive URL replacement, spacing change, CTA update, or footer change.
- Inspect the actual screenshot visually; `brokenImages: 0` does not catch bad crops, stale cache, duplicated text, or awkward spacing.

Only mark `ready` when all required checks pass.
