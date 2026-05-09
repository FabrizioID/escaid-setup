# Input Modes

## Create From Brief

Use when the user gives a goal, offer, copy, or rough campaign idea. Extract the minimum structure:

- objective
- audience
- offer or message
- CTA
- tone/brand
- provided assets
- missing assets

Do not design the whole funnel unless explicitly asked. If higher-level marketing strategy is absent, make small production assumptions or ask one concise question when the missing item blocks the email.

## Convert From Reference

Use when the user provides Canva, screenshot, image, PDF-like visual, website reference, or rough materials. Treat references as visual guidance unless they provide exportable images.

Canva links are not final image URLs. Request/export image files or use an available integration before final HTML.

## Close Advanced HTML

Use when the user provides existing HTML and wants it finalized. Preserve intent but repair email risks:

- replace local/blob/base64/private image sources
- remove scripts/forms/unsupported interactivity
- convert web layout patterns to email-safe tables where needed
- inline critical styles
- keep one responsive breakpoint
- run QA and preview

Do not rewrite the whole email if targeted fixes are enough.

## Iterate Existing Email

Use when the user asks for visual/copy/asset changes. Patch only the necessary blocks. If an image changes, update Drive asset, manifest, HTML reference, preview, and QA.

## Generate Visual Assets

Use when the user asks to create a hero, banner, product visual, background, or supporting image. Generated images are not final assets until exported, uploaded to Drive, published, converted to lh3 URL, and recorded in the manifest.
