---
name: visual-html-craft
description: Build visually stunning interactive HTML experiences — landing pages, skill showcases, animated dashboards, UI prototypes, and visual reports. Use when the output is an experience-first HTML artifact with animated backgrounds, canvas effects, Three.js scenes, or sophisticated scroll interactions. Not for documentation or system explanation — use premium-interactive-docs for that.
---

# Visual HTML Craft

Use this skill when the HTML IS the product — not a way to explain something else.

Landing pages. Skill showcases. Animated reports. Visual UI prototypes.
The goal is an experience that looks and feels like a premium product.

## When to Use vs premium-interactive-docs

| visual-html-craft | premium-interactive-docs |
|---|---|
| Landing pages and showcases | System architecture guides |
| Skill documentation with visual identity | Agent manuals and workflow docs |
| Animated experience-first HTML | Technical explainers with structure |
| UI prototypes and design systems | Operations and process guides |
| Focus: experience + visual impact | Focus: understanding + clarity |

## Quick Start

Before writing any HTML:

1. Define the visual identity: palette, mood, background type.
2. Define the background system: what animates behind sections.
3. Define the section map: how many zones, which treatment for each.
4. Build the hero first — must work as a standalone poster.
5. Add sections respecting background coordination rules.
6. Wire up scroll transitions and light/dark toggle.

## Core Stack

These four libraries are required on every output:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
```

- **Three.js** — 3D backgrounds, holographic elements, particle systems, WebGL scenes.
- **GSAP + ScrollTrigger** — section reveals, scroll-driven state transitions, zone animations.
- **Anime.js** — micro-animations, stagger on lists and grids, counter animations, icon entries.
- **Canvas 2D (native)** — custom backgrounds, icon/logo networks, wireframe graphics.

## Visual Identity

Define before building:

- **Primary hue** — the dominant color of the canvas background and accent elements.
- **Mood** — tech-dark, editorial, organic, minimal, cinematic.
- **Background type** — canvas network, Three.js scene, particle field, or gradient drift.
- **Typography scale** — hero size, section titles, body, labels, monospace for code blocks.

## Animated Background System

The background is a design element, not decoration.
Read [references/background-system.md](references/background-system.md) for full implementation.

Core rule: every section above an animated background must choose one of three approaches:

1. **Semi-transparent** — rgba dark tint + backdrop-filter blur. Background stays visible through.
2. **Canvas zone mutation** — background changes hue, brightness, or element color as user scrolls. Sections are transparent. Canvas IS the atmosphere.
3. **Color-contrast zone** — section has solid purple or white. Canvas coordinates: logos go white on purple zones, canvas goes white on white zones.

Never use a flat opaque section that covers the canvas without coordination.

## Section Design Rules

Each section gets:

- One visual job only.
- One background treatment from the three valid approaches.
- A GSAP scroll reveal on entry.
- No solid opaque cover without zone coordination.

Divider bands between zones: transparent, 80px height, label pill, gradient glow line.

## Scroll State System

Use a shared state object for the canvas. Animate it with GSAP on scroll triggers.

```javascript
const bgColor = { h: 270, lit: 0, inv: 0 };
// h   — canvas hue (logos, connections, pulses all follow this)
// lit — white overlay: 0=dark, 1=white background
// inv — logo invert: 0=default color, 1=white logos (for purple zones)
```

ScrollTrigger transitions must always define both directions:

```javascript
ScrollTrigger.create({
  trigger: el,
  start: 'top 68%',
  onEnter:     () => shiftBg(h, lit, inv),
  onLeaveBack: () => shiftBg(prevH, prevLit, prevInv)
});
```

## Light / Dark Toggle

Every output includes a fixed toggle that switches between:

- **Normal**: dark or branded theme — full visual expression.
- **Light**: white background, branded accents, same structure.

Implemented via `.light` class on `body`. State persisted in `localStorage`.

## Hero Rules

The first screen must work as a standalone poster:

- Strong title with accent span.
- Subtitle or descriptor.
- 2-4 stat or feature chips.
- Background fully visible and animated behind the hero content.
- No opaque cover on the hero.

## Output Checklist

Before delivering:

- [ ] Visual identity defined and applied consistently.
- [ ] Background animates and is visible on hero.
- [ ] All sections use a valid background treatment.
- [ ] Scroll transitions work going down AND back up.
- [ ] Light/dark toggle works and is persisted.
- [ ] Mobile layout does not break key sections.
- [ ] No JS errors in console on load.

## Non-Negotiable Rules

- Never start from a template — define the visual identity first.
- Never cover the animated background with a flat opaque section.
- Never add motion that competes with readability.
- Never ship without testing scroll in both directions.
- Never use generic dashboard cards for an experience-first output.