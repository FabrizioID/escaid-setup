# HTML Email Rules

## Structure

- Use table-based layout for main structure.
- Keep a centered container, commonly 600px wide.
- Use inline CSS for critical rendering.
- Include a simple `<style>` block only for supported responsive behavior.
- Use one breakpoint, typically `max-width: 600px`.
- Use semantic copy hierarchy but email-safe markup.

## Default Modern Tech Styling

Unless the brand brief asks for a flatter or more institutional look, finish marketing emails with a modern tech feel:

- rounded outer shell, cards, buttons, and image corners
- subtle shadows or soft elevation on major blocks
- thin borders so sections remain clear when shadows are ignored
- restrained glow/highlight accents around CTAs or technical visuals
- practical spacing and live text hierarchy over decorative complexity

Keep all of this secondary to email compatibility. Use table structure and inline CSS first; effects are polish, not layout.

## Images

Each final image must include:

```html
<img src="PUBLIC_URL" width="600" alt="..." style="display:block;width:100%;max-width:600px;height:auto;border:0;outline:none;text-decoration:none;">
```

Use role-appropriate widths:

- logo: 120-240px
- hero: 600-1200px source, displayed at container width
- full-width section image: container width
- icon/small visual: fixed pixel width with mobile fallback

## Screenshot-To-Asset Policy

When the user provides screenshots instead of real image files:

- Use the screenshot as a visual source, not automatically as final email artwork.
- Convert screenshots into normal email assets when feasible:
  - crop the useful hero/banner/logo area
  - remove browser/UI borders, duplicated text, extra whitespace, or low-value surrounding content
  - recreate editable headings, body copy, bullets, and CTAs as live HTML
- If the screenshot is the only source and the user wants speed/exact replication, it may be used as a draft image asset, but mark the result `draft_only` until it is exported/uploaded to a public email-safe URL.
- If the user later provides real assets, replace screenshot-derived assets with the real files.

## Image Text Policy

Prefer live HTML text over text baked into images when the text is promotional, explanatory, duplicated elsewhere, likely to be edited, or hard to crop cleanly. This keeps the email easier to revise, more legible on mobile, and safer for dark mode/accessibility.

When a brochure/PDF screenshot contains useful photos plus unwanted headings, captions, borders, decorative bands, or repeated CTA text:

- crop the image to preserve the useful photo/visual area
- recreate headings, captions, CTAs, and explanatory lines as live HTML
- avoid showing the same phrase both in the image and in HTML
- re-preview after the crop because automated image checks will not catch awkward composition

Examples:

- Client proof collage: keep the client photos; recreate "Ellos ya invirtieron" and supporting lines as HTML.
- Map section: keep the map/route visual; avoid duplicated location bands if the same idea is explained above.
- Amenity/brochure cards: keep embedded labels only if they are complete, readable, and visually clean on mobile.

## Avoid

- JavaScript
- forms
- canvas
- video as core content
- external CSS dependencies
- CSS grid/flex as main layout
- fixed/absolute positioning for critical layout
- base64 images
- unsupported web-app animation
- heavy background-image dependence
- hidden preheader blocks that create visible Gmail `...` collapsed controls

## Dark Mode Tolerance

Do not promise perfect dark-mode control across clients. Use solid backgrounds, sufficient contrast, border-safe buttons, and images that remain legible if clients invert colors. Prefer text as live HTML over text baked into images when legibility matters.

## Marketing Structure

Maintain basic email-marketing coherence:

- optional subject/preheader when requested
- opening headline
- supporting copy
- visual hierarchy
- CTA
- secondary details
- footer/legal area when applicable

Do not invent campaign strategy when another skill or the user already provided it.
