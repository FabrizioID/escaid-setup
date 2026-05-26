---
name: frontend-skill
description: Use when the task asks for a visually strong landing page, website, app, prototype, demo, or game UI. This skill enforces restrained composition, image-led hierarchy, cohesive content structure, and tasteful motion while avoiding generic cards, weak branding, and UI clutter.
---

# Frontend Skill

Use this skill when the quality of the work depends on art direction, hierarchy, restraint, imagery, and motion rather than component count.

ESC-AI routing: use this skill for real frontend apps, websites, repos, frameworks, components, routes, state, dashboards, or product UI implementation. For standalone premium HTML artifacts inside the ESC-AI visual system, use `ui-architect` as the canonical route. For documentation HTML, use `documentador-experto`.

Goal: ship interfaces that feel deliberate, premium, and current. Default toward award-level composition: one big idea, strong imagery, sparse copy, rigorous spacing, and a small number of memorable motions.

## Working Model

Before building, write three things:

- visual thesis: one sentence describing mood, material, and energy
- content plan: hero, support, detail, final CTA
- interaction thesis: 2-3 motion ideas that change the feel of the page

Each section gets one job, one dominant visual idea, and one primary takeaway or action.

## Reference Pass

When the user asks to improve design quality, avoid generic AI-looking UI, choose libraries, or rescue an existing weak interface, gather current references before converging. Use official docs and real product examples when possible.

Good reference families:

- UX flow references: Mobbin, Page Flows, real competitor/product screens.
- Visual direction references: Godly, Awwwards, Landingfolio, Refero, product studio portfolios.
- Component/pattern references for React/Tailwind: shadcn/ui, Radix/Base UI, Magic UI, Aceternity, React Bits, Animate UI, 21st.dev.
- Creative motion/tool references: Framer, Framer Academy effects, Framer Layout Composer, Vanta, tsParticles, Rive, Lottie, Spline, Three.js scenes.
- AI UI references: Vercel AI Elements, assistant-ui, CopilotKit, agent/chat products.
- Quality constraints: WCAG 2.2, Apple HIG, web.dev Core Web Vitals, Motion/MDN reduced-motion guidance.

Extract patterns, not skins: hierarchy, density, spacing, semantic tokens, motion behavior, state design, responsive choices, accessibility and performance constraints. If the design still looks like a component demo after applying a library, the composition failed.

## Medium Before Markup

For visually led work, choose the dominant medium before coding:

- Use generated or sourced images when the scene needs materiality, metaphor, product presence, people, places, environments, packaging, objects, or visual storytelling.
- Use Vanta, tsParticles, shaders, Rive, Lottie, Spline, or Three.js when a proven animated background or interactive object communicates better than handmade div/canvas shapes.
- Use HTML/CSS for layout, typography, overlays, responsive behavior, product states, and composition. Do not use HTML as a substitute for an image when the result should feel tactile or cinematic.
- Use Framer-style patterns as inspiration for radial/spiral layouts, scroll effects, page transitions, interaction states, and canvas-like composition.

If the UI starts to look like blocks trying to become an illustration, stop and switch to an asset/image/libreria route.

## Beautiful Defaults

- Start with composition, not components.
- Prefer a full-bleed hero or full-canvas visual anchor.
- Make the brand or product name the loudest text.
- Keep copy short enough to scan in seconds.
- Use whitespace, alignment, scale, cropping, and contrast before adding chrome.
- Limit the system: two typefaces max, one accent color by default.
- Default to cardless layouts. Use sections, columns, dividers, lists, and media blocks instead.
- Treat the first viewport as a poster, not a document.

## Landing Pages

Default sequence:

1. Hero: brand or product, promise, CTA, and one dominant visual
2. Support: one concrete feature, offer, or proof point
3. Detail: atmosphere, workflow, product depth, or story
4. Final CTA: convert, start, visit, or contact

Hero rules:

- One composition only.
- Full-bleed image or dominant visual plane.
- Canonical full-bleed rule: on branded landing pages, the hero itself must run edge-to-edge with no inherited page gutters, framed container, or shared max-width; constrain only the inner text/action column.
- Brand first, headline second, body third, CTA fourth.
- No hero cards, stat strips, logo clouds, pill soup, or floating dashboards by default.
- Keep headlines to roughly 2-3 lines on desktop and readable in one glance on mobile.
- Keep the text column narrow and anchored to a calm area of the image.
- All text over imagery must maintain strong contrast and clear tap targets.

If the first viewport still works after removing the image, the image is too weak. If the brand disappears after hiding the nav, the hierarchy is too weak.

Viewport budget:

- If the first screen includes a sticky/fixed header, that header counts against the hero. The combined header + hero content must fit within the initial viewport at common desktop and mobile sizes.
- When using `100vh`/`100svh` heroes, subtract persistent UI chrome (`calc(100svh - header-height)`) or overlay the header instead of stacking it in normal flow.

## Apps

Default to Linear-style restraint:

- calm surface hierarchy
- strong typography and spacing
- few colors
- dense but readable information
- minimal chrome
- cards only when the card is the interaction

For app UI, organize around:

- primary workspace
- navigation
- secondary context or inspector
- one clear accent for action or state

Avoid:

- dashboard-card mosaics
- thick borders on every region
- decorative gradients behind routine product UI
- multiple competing accent colors
- ornamental icons that do not improve scanning

If a panel can become plain layout without losing meaning, remove the card treatment.

## Imagery

Imagery must do narrative work.

- Use at least one strong, real-looking image for brands, venues, editorial pages, and lifestyle products.
- Prefer in-situ photography over abstract gradients or fake 3D objects.
- Choose or crop images with a stable tonal area for text.
- Do not use images with embedded signage, logos, or typographic clutter fighting the UI.
- Do not generate images with built-in UI frames, splits, cards, or panels.
- If multiple moments are needed, use multiple images, not one collage.

The first viewport needs a real visual anchor. Decorative texture is not enough.

## Copy

- Write in product language, not design commentary.
- Let the headline carry the meaning.
- Supporting copy should usually be one short sentence.
- Cut repetition between sections.
- Do not include prompt language or design commentary into the UI.
- Give every section one responsibility: explain, prove, deepen, or convert.

If deleting 30 percent of the copy improves the page, keep deleting.

## Utility Copy For Product UI

When the work is a dashboard, app surface, admin tool, or operational workspace, default to utility copy over marketing copy.

- Prioritize orientation, status, and action over promise, mood, or brand voice.
- Start with the working surface itself: KPIs, charts, filters, tables, status, or task context. Do not introduce a hero section unless the user explicitly asks for one.
- Section headings should say what the area is or what the user can do there.
- Good: "Selected KPIs", "Plan status", "Search metrics", "Top segments", "Last sync".
- Avoid aspirational hero lines, metaphors, campaign-style language, and executive-summary banners on product surfaces unless specifically requested.
- Supporting text should explain scope, behavior, freshness, or decision value in one sentence.
- If a sentence could appear in a homepage hero or ad, rewrite it until it sounds like product UI.
- If a section does not help someone operate, monitor, or decide, remove it.
- Litmus check: if an operator scans only headings, labels, and numbers, can they understand the page immediately?

## Motion

Use motion to create presence and hierarchy, not noise.

Ship at least 2-3 intentional motions for visually led work:

- one entrance sequence in the hero
- one scroll-linked, sticky, or depth effect
- one hover, reveal, or layout transition that sharpens affordance

Prefer Framer Motion when available for:

- section reveals
- shared layout transitions
- scroll-linked opacity, translate, or scale shifts
- sticky storytelling
- carousels that advance narrative, not just fill space
- menus, drawers, and modal presence effects

Motion rules:

- noticeable in a quick recording
- smooth on mobile
- fast and restrained
- consistent across the page
- removed if ornamental only

## Animated Backgrounds

Animated backgrounds are valid only when they improve meaning, atmosphere, or orientation. Do not treat "animated background" as a box checked by random particles, abstract lines, or generic glows.

When an HTML/document page needs a live background:

- Search or reuse a proven background system before hand-drawing decorative lines from scratch. Consider libraries such as `tsParticles`, `Vanta`, canvas systems, SVG motion, video/image loops, or generated bitmap layers depending on the context.
- Match the background to the subject. For operational/process docs, use semantic assets from the workflow: agenda, email, status, approval, speaker, marketing, documents, data, models, or domain objects. Avoid generic dots when recognisable micro-assets would communicate better.
- Prefer a complete background system plus semantic customization over isolated floating stickers. A strong pattern is `network/links background + image-shaped particles/assets + subtle connections`.
- Use few, larger, recognisable elements rather than many tiny moving elements. Too many elements become noise; too few or too transparent disappear. Adjust with microchanges.
- Calibrate with screenshots, not intention. Iterate quantity, size, opacity, velocity, and connection opacity until the background is legible but subordinate.
- Preserve calm text zones. Push activity toward edges or behind low-density areas; reduce opacity/quantity behind titles, body text, tables, or cards.
- Keep motion slow and restrained for professional docs. If the user says the page feels busy, reduce count first, then opacity, then speed. If the user says it disappeared, raise opacity slightly before adding many elements.

Working heuristic from Summit pipeline iteration:

- start with 8-12 semantic elements;
- use larger recognisable assets around 55-95px for desktop;
- keep connection opacity very low;
- prefer opacity microadjustments over drastic changes;
- validate desktop and mobile screenshots before calling it done.

## Hard Rules

- No cards by default.
- No hero cards by default.
- No boxed or center-column hero when the brief calls for full bleed.
- No more than one dominant idea per section.
- No section should need many tiny UI devices to explain itself.
- No headline should overpower the brand on branded pages.
- No filler copy.
- No split-screen hero unless text sits on a calm, unified side.
- No more than two typefaces without a clear reason.
- No more than one accent color unless the product already has a strong system.

## Reject These Failures

- Generic SaaS card grid as the first impression
- Beautiful image with weak brand presence
- Strong headline with no clear action
- Busy imagery behind text
- Sections that repeat the same mood statement
- Carousel with no narrative purpose
- App UI made of stacked cards instead of layout

## Litmus Checks

- Is the brand or product unmistakable in the first screen?
- Is there one strong visual anchor?
- Can the page be understood by scanning headlines only?
- Does each section have one job?
- Are cards actually necessary?
- Does motion improve hierarchy or atmosphere?
- Would the design still feel premium if all decorative shadows were removed?
