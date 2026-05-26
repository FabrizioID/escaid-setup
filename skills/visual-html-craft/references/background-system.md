# Background System — Visual HTML Craft

This file documents the animated background coordination system for HTML experiences.

## The Core Rule

The animated background is a design element, not decoration.
Every section above it must coordinate with it — never cover it without intention.

## Background Selection Protocol

Before building an animated background manually, check whether a complete proven background system already fits the job.

Valid routes:

1. **Library background**: `tsParticles`, `Vanta`, canvas particles, SVG network, WebGL, or another proven system.
2. **Generated visual layer**: a bitmap/vector-like background generated for the subject, then animated subtly with CSS/canvas.
3. **Hybrid semantic system**: a complete network/particle background where the particles are subject-specific images/icons instead of generic dots.
4. **Custom canvas**: only when the background needs precise semantic topology that a library cannot express.

Use external/library systems when they give better motion quality, performance, and polish than hand-made CSS/SVG. Hand-coded decorative lines are a fallback, not the default.

## Semantic Motion Rule

The background must communicate the theme. If the page is about a pipeline, process, academic area, data flow, or operations, use elements from that world:

- agenda / calendar
- email / invitation
- status board
- accepted / confirmed speaker
- marketing post
- document / spreadsheet / model / report
- data nodes / decisions / checks

Do not use random dots, lines, or abstract flows when recognisable workflow assets would communicate the system better.

## Hybrid Pattern: Network + Image Particles

For premium operational documents, prefer:

```text
dark atmospheric base
+ complete particle/link system
+ image-shaped semantic particles
+ very subtle connections
+ slow motion
+ section overlays calibrated to preserve readability
```

Example starting range:

```javascript
particles: {
  number: { value: 8-12 },
  shape: { type: 'image', options: { image: [semantic assets] } },
  opacity: { value: { min: 0.24, max: 0.52 } },
  size: { value: { min: 55, max: 95 } },
  links: { enable: true, distance: 260-320, opacity: 0.05-0.10 },
  move: { enable: true, speed: 0.20-0.35 }
}
```

Calibrate per screenshot. Do not blindly use these numbers.

## Iteration Heuristic

If the user says:

- **"se ve monse / solo stickers"** -> use a complete background system, not isolated floating elements.
- **"las lineas no tienen sentido"** -> remove decorative flows; make the topology semantic or use a proven network background.
- **"no se entiende que son"** -> reduce element count and increase asset size.
- **"se estorban"** -> reduce count first, then connection opacity, then movement speed.
- **"no se ve nada"** -> raise opacity slightly; do not add many elements at once.
- **"un poco mas"** -> make microadjustments, not a redesign.

Validated Summit criterion: fewer large recognisable elements beat many small moving elements. The background should support the content, not become a second interface.

## Three Valid Section Approaches

### 1. Semi-Transparent

Section tint lets the background show through.

```css
section { background: transparent; }
section.alt { background: rgba(8,8,18,0.55); backdrop-filter: blur(2px); }
```

Use for: standard sections in dark-theme documents.

### 2. Canvas Zone Mutation

Background changes hue, brightness, or element color per scroll zone.
Sections are transparent — the canvas IS the atmosphere for that zone.
Use GSAP ScrollTrigger to animate a shared state object.

Use for: creating visual rhythm across a long-scroll page.

### 3. Color-Contrast Zones

Two flavors that coordinate section + canvas together:

**Purple zone**
Section has solid/semi-solid purple background.
Canvas: logos switch to white wireframe so they show through the tint.

```css
section.pzone { background: rgba(109,40,217,0.82); color: #fff; }
```

**White zone**
Canvas transitions to a near-white overlay (88% opacity).
Section is transparent — canvas IS the white background.
Logos render dark on white.

```css
section.wzone { background: transparent; color: #1e1b4b; }
```

## Canvas State Object

One shared object drives all canvas colors. No hardcoded color strings in the draw loop.

```javascript
const bgColor = { h: 270, lit: 0, inv: 0 };
// h   — HSL hue of the entire canvas (logos, connections, pulses, halos)
// lit — white overlay opacity: 0=dark canvas, 1=white background
// inv — logo color invert: 0=use hue color, 1=white logos (for purple zones)
```

In the draw loop, read bgColor every frame:

```javascript
const bh  = bgColor.h;
const lit = bgColor.lit || 0;
const inv = bgColor.inv || 0;
const isLit = lit > 0.5;
const isInv = inv > 0.5;

// White overlay
if (lit > 0.01) {
  ctx.fillStyle = `rgba(255,255,255,${lit * 0.88})`;
  ctx.fillRect(0, 0, W, H);
}

// Dynamic colors — no hardcoded rgba
const connL = isInv ? 90 : isLit ? 38 : 55;
const logoStrokeL = isInv ? 97 : isLit ? 38 : 76;
```

## Animate State with GSAP

```javascript
function shiftBg(h, lit, inv) {
  gsap.to(bgColor, {
    h, lit, inv,
    duration: 1.5,
    ease: 'power2.inOut',
    onUpdate() {
      document.documentElement.style.setProperty('--band-h', Math.round(bgColor.h));
    }
  });
}
```

## Divider Bands

Transparent 80px bands separate zone transitions.
A band: no background, centered label pill, gradient glow line via CSS pseudo-elements.
The glow line color follows `--band-h` CSS variable updated on each transition.

```css
.divband { position:relative; z-index:2; height:80px; display:flex; align-items:center; justify-content:center; }
.divband::before {
  content:''; position:absolute; top:50%; left:4%; right:4%; height:1px;
  background: linear-gradient(90deg, transparent,
    hsla(var(--band-h),68%,66%,.45) 28%,
    hsla(var(--band-h),70%,78%,.7) 50%,
    hsla(var(--band-h),68%,66%,.45) 72%, transparent);
  transform: translateY(-50%);
}
```

## Bidirectional ScrollTrigger — Required

Always define both enter and leave-back states explicitly.
A trigger with only onEnter breaks the state when scrolling back up.

```javascript
const stateMap = [
  { q: '.band-one',  fwd: [248,0,0], bwd: [270,0,0] },
  { q: '.pzone-band', fwd: [270,0,1], bwd: [248,0,0] },
  { q: '.wzone-band', fwd: [265,1,0], bwd: [270,0,1] },
  { q: '.exit-band',  fwd: [270,0,0], bwd: [265,1,0] },
];

stateMap.forEach(({ q, fwd, bwd }) => {
  const el = document.querySelector(q);
  if (!el) return;
  ScrollTrigger.create({
    trigger: el,
    start: 'top 68%',
    onEnter:     () => shiftBg(...fwd),
    onLeaveBack: () => shiftBg(...bwd)
  });
});
```

## Common Mistakes

- Using `onEnter` only — breaks state on scroll up.
- White canvas overlay too opaque (> 0.88) — logos invisible.
- Section background covers canvas without zone coordination — breaks visual coherence.
- GLOW string missing `%` on lightness: `hsla(h,s%,L,a)` is invalid — use `hsla(h,s%,L%,a)`.
- Animating bgColor.h only — forgetting to reset lit and inv when returning to dark zone.
