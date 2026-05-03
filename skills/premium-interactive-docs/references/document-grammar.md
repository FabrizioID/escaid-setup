# Document Grammar for Premium Interactive Guides

Use this file to build visually strong long-form documentation.

## Core Idea

The goal is not to dump information.
The goal is to package understanding.

Good premium documentation should:

- explain fast
- feel intentional
- remain readable
- support presentation and reuse

## Section Model

Default sequence:

1. Hero
2. Architecture or overview
3. Main system or flow
4. Core decisions or logic
5. Outputs and usage
6. Risks, maintenance, or next layer

## Hero Pattern

Hero should include:

- strong title
- compact subtitle
- 2-5 chips or tags
- side cards with key truths
- visual atmosphere

The first screen should work like a poster.

## Visual Ingredients

Use a restrained set:

- deep background with atmosphere
- glass or low-chrome surfaces
- semantic color coding
- big section headers
- clean rounded panels
- board-style diagrams
- grouped metrics, steps, timelines, or chat examples
- short labels with optional subtitles

## Motion Ingredients

Use only what improves feel or hierarchy:

- custom cursor
- mouse-follow glow
- subtle particles
- dot-grid drift
- section reveal on scroll
- hover lift
- animated chat or message blocks
- slight hero tilt

## Animated Background Rules

When the document uses a canvas, Three.js, or particle animation as background, sections must never fight the background — they must coordinate with it.

### The Core Rule

The animated background is a design element, not decoration.
Every section that sits above it must choose one of three valid approaches.
Never use a solid opaque background that simply covers the canvas without intention.

### Three Valid Approaches

**1. Semi-transparent sections**
Section uses rgba dark tint + backdrop-filter blur.
The background stays visible through the tint.
Use for standard dark-theme sections.

**2. Canvas mutation by zone**
The background changes hue, brightness, or element color as the user scrolls into each section zone.
Sections remain transparent — the canvas IS the atmosphere.
Use GSAP + ScrollTrigger to animate a shared state object.

**3. Color-contrast zones**
Two flavors:
- Purple zone: section has solid or semi-solid purple background. Canvas logos switch to white wireframe so they show through the tint.
- White zone: canvas transitions to a near-white overlay. Section is transparent. Canvas IS the white background. Logos render dark on white.

Both require the canvas and section to move together — not independently.

### Canvas Zone State System

Use a shared object to drive all canvas colors dynamically:

```
const bgColor = { h: 270, lit: 0, inv: 0 };
// h   — hue of entire canvas (logos, connections, pulses)
// lit — white overlay opacity: 0=dark, 1=white bg
// inv — invert logos to white: 0=off, 1=on (for purple zones)
```

Animate it with GSAP:

```
gsap.to(bgColor, { h: 265, lit: 1, inv: 0, duration: 1.5, ease: 'power2.inOut' });
```

The canvas draw loop reads bgColor every frame — no manual color strings in draw code.

### Divider Bands

Place transparent bands between zone transitions.
A band: 80px height, no background, centered label pill, horizontal gradient glow line.
The band line color follows a CSS variable updated on each transition.
Bands signal the visual shift without creating abrupt boundaries.

### ScrollTrigger Bidirectional Requirement

Always define both directions explicitly per trigger:

```
ScrollTrigger.create({
  trigger: el,
  start: 'top 68%',
  onEnter:     () => shiftBg(h, lit, inv),             // scrolling down
  onLeaveBack: () => shiftBg(prevH, prevLit, prevInv)  // scrolling back up
});
```

A trigger with only onEnter breaks the state when the user scrolls back up.
Always pair enter and leaveBack with the correct before/after state for each zone boundary.

## Readability Rules

- labels must stay short
- each section gets one job
- one visual idea per section
- do not bury meaning under decoration
- if motion reduces clarity, remove it

## Diagram Patterns

Use whichever fits best:

- layered system board
- growth map
- flow stack
- decision rail
- merge diagram
- timeline
- output cards
- chat example

## Export Discipline

1. finish HTML first
2. verify hierarchy and legibility
3. export PDF if needed
4. adapt key diagrams to Miro only when collaborative use is required