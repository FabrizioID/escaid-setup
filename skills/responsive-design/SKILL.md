---
name: responsive-design
description: Use when any HTML/CSS/JS or frontend app needs to adapt across mobile, tablet and desktop reliably. Covers breakpoint strategy, container queries, fluid typography, touch targets, iOS Safari quirks, scale-preserving patterns for fixed-design artefacts (badges, posters, generators) and mobile pitfalls of DOM-to-image export (foreignObject + data URI). Activar cuando se diseñe, audite o rescate la versión responsive de un sitio, landing, prototipo, generador o producto.
---

# Responsive Design

Skill operativa transversal para resolver versión responsive. No reemplaza `frontend-skill` ni `ui-architect` — los complementa con criterios y recetas concretas que en mobile fallan más de lo esperado.

ESC-AI routing: invocar cuando el problema sea "no se ve bien en celular", "hay que adaptar para mobile", "el modal se rompe en iPhone", "la foto del badge sale en blanco al descargar", "el botón es muy chico para el dedo", o equivalentes. Para app/repo frontend full, sigue mandando `frontend-skill`; para HTML visual premium ESC-AI, `ui-architect`. Esta skill se monta encima para auditar/aplicar criterios responsive.

## Principios

1. **Mobile-first**. Diseña primero para 320–375 px, luego suma media queries que ENSANCHAN. No al revés — partir de desktop y "hacerlo responsive" después casi siempre rompe.
2. **Fluid > fijo**. Usa `clamp()`, `%`, `vh/vw/cqw`, `min()`, `max()` antes que píxeles duros. El layout se adapta solo en lugar de pelearse con breakpoints.
3. **Preserva la intención de diseño**. Si un artefacto está autorizado a 600×750 (badge, poster, social card), NO lo redimensiones cambiando layout — escálalo visualmente (transform: scale) y mantén el DOM intacto. Esto es clave cuando hay export a imagen.
4. **Mobile-first content ordering**. En grid/flex usa `order` para reordenar; lo importante arriba cuando solo cabe una columna.
5. **Touch targets generosos**. Mínimo 44×44 px (Apple HIG) / 48×48 px (Material). Botones full-width en mobile son más ergonómicos que centrados pequeños.
6. **Safe areas iOS**. `env(safe-area-inset-top/bottom)` para no pasar debajo del notch o la barra home.
7. **Testea en device real**. Chrome DevTools mobile mode NO emula iOS Safari fielmente. Si el target incluye iPhone, probar en iPhone real o BrowserStack.

## Breakpoint Strategy

| Rango | Caso | Acción típica |
|---|---|---|
| ≤ 380 px | Phones chicos (iPhone SE 1ª gen) | Compactar todo: stackear toggles, fuentes -2 px, padding mínimo |
| ≤ 480 px | Phones modernos portrait | Botones full-width, share centrado, ocultar texto del topbar |
| ≤ 720 px | Phones landscape / tablet portrait | Una sola columna, padding suave, fuentes -10–15% |
| ≤ 960 px | Tablets / laptops chicos | Layout 2-col → 1-col, sidebar collapse, navegación hamburguesa |
| > 960 px | Desktop | Layout pleno, hover states activos, multi-columna |

No tomes estos números como ley — son guía. Las breakpoints reales del proyecto deberían venir del **contenido** (¿cuándo el layout se ve mal?) no de devices arbitrarios.

## Container Queries vs Media Queries

Reglas:
- **Media query** = el VIEWPORT cambia → cambio global de layout.
- **Container query** = un CONTENEDOR ESPECÍFICO cambia → cambio local. Útil para componentes que pueden vivir en sidebars, modales, cards de distintos tamaños sin saber el viewport.

```css
/* Container query — el componente reacciona a SU contenedor, no al viewport */
.card-host { container-type: inline-size; }
.card { font-size: 14px; }
@container (min-width: 320px) {
  .card { font-size: 18px; }
}

/* Unidades cqw / cqi: porcentaje del ancho del contenedor */
.scaled {
  /* trick clave: dividir length por length para producir un número escalar */
  transform: scale(calc(100cqw / 600px));
}
```

Soporte: Chromium 105+, Safari 16+, Firefox 110+. Para Safari < 16 conviene fallback a media queries o pulir el min-width base.

## Scale-Preserving Pattern (Badge / Poster / Card de tamaño fijo)

Cuando un componente está diseñado a tamaño autorizado (ej. badge 600×750 que se exporta a PNG 1200×1500) **y** debe verse en mobile sin perder proporciones:

```html
<div class="badge-frame">
  <div class="badge"><!-- autorizado a 600x750 internamente --></div>
</div>
```

```css
.badge-frame {
  container-type: inline-size;
  width: 100%;
  max-width: 600px;
  aspect-ratio: 600 / 750;
  position: relative;
}
.badge-frame > .badge {
  /* Position absolute → no influye en la altura del frame */
  position: absolute;
  top: 0; left: 0;
  /* Tamaño AUTORIZADO siempre — el DOM mide 600×750 incluso scaleado visualmente */
  width: 600px;
  height: 750px;
  /* Escala visual: 100cqw es el ancho real del frame, 600px es el ancho autorizado */
  transform: scale(calc(100cqw / 600px));
  transform-origin: top left;
}
```

Beneficios:
- En desktop a 600 px → scale = 1, badge a tamaño real.
- En mobile a 360 px → scale = 0.6, badge encoge visualmente conservando proporciones.
- **El DOM no cambia** → `offsetWidth/Height` siguen siendo 600/750 → el render a PNG sale full quality (1200×1500 con `pixelRatio: 2`).

Pitfall a evitar: NO uses `flex` o `grid` para redimensionar el componente cambiando el tamaño de sus elementos internos. Eso rompe la jerarquía visual del diseño autorizado.

## Mobile Order Swap

Reordenar el flujo en mobile sin tocar el HTML:

```css
@media (max-width: 960px) {
  .layout { grid-template-columns: 1fr; }
  .form-panel { order: 1; }     /* form arriba */
  .preview-panel { order: 2; }  /* preview debajo */
}
```

Regla operativa para mobile-first content ordering:
- Lo que el usuario USA para llenar → arriba (form, inputs).
- Lo que VE como feedback → debajo (preview, resumen).
- En desktop con dos columnas vuelve al orden natural side-by-side.

## Touch Targets y Acciones

- Botón primario en mobile: `width: 100%`, `padding: 14px 22px`, `font-size: ≥ 15px`. Nunca menos de 44×44 px de área tappable.
- Share buttons: contenedor centrado con `justify-content: center` para que no queden encajonados a un lado.
- Hover NO existe en touch. Cualquier interacción crítica que dependa solo de hover está rota en mobile. Suplementa con tap states (`:active`, `:focus-visible`).
- Cursores `pointer` por sí solos no convierten un div en accesible — agrega `role="button"`, `tabindex="0"` y handlers de Enter/Space si no es un `<button>`.

```html
<div class="upload-box" role="button" tabindex="0">...</div>
```

```js
uploadBox.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); inputPhoto.click(); }
});
```

## Fluid Typography

Tres opciones de menos a más sofisticado:

```css
/* 1. Media queries simples */
h1 { font-size: 28px; }
@media (max-width: 480px) { h1 { font-size: 24px; } }

/* 2. clamp() — interpola entre min y max según viewport */
h1 { font-size: clamp(24px, 4vw, 38px); }

/* 3. clamp() + container query — la tipo reacciona al contenedor, no al viewport */
.card { container-type: inline-size; }
.card h2 { font-size: clamp(18px, 5cqw, 32px); }
```

Recomendación operativa: usa `clamp()` para títulos y CTAs. Mantén media queries simples para body y micro-copy donde la variación es chica.

## Imágenes Responsive

| Caso | Solución |
|---|---|
| Foto que llena un área fija | `width: 100%; height: 100%; object-fit: cover;` |
| Foto que mantiene su ratio | `aspect-ratio: 4/5;` en el contenedor + `object-fit: contain` |
| Foto con resoluciones distintas por viewport | `srcset` + `sizes` |
| Foto que se sube via input file | Crop client-side con Cropper.js a tamaño fijo (ej. 900 px ancho JPEG 0.9 quality) antes de meter al DOM |
| Foto de altísima resolución (camera roll iPhone) | Forzar downsize en upload con `<canvas>` antes de procesar — los HEIC/HEIF de iPhone pueden ser 5+ MB y rompen export-to-image |

## Safe Areas iOS (Notch / Home Indicator)

```css
.topbar {
  padding-top: env(safe-area-inset-top, 16px);
  padding-left: env(safe-area-inset-left, 16px);
  padding-right: env(safe-area-inset-right, 16px);
}
.bottom-bar {
  padding-bottom: env(safe-area-inset-bottom, 16px);
}
```

Requiere `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />` para que los safe areas se respeten.

## Viewport Meta — Configuración Correcta

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

NO uses `user-scalable=no` ni `maximum-scale=1` — accesibilidad rota (zoom es derecho del usuario). Tampoco fijes width en píxeles.

## 100vh Trampa iOS Safari

`100vh` en iOS Safari NO descuenta la barra inferior dinámica (`tab bar`). Resultado: contenido recortado al fondo. Soluciones:

```css
/* Opción 1 (moderna, 2024+): unidades dinámicas */
.modal { height: 100dvh; }   /* dynamic — se ajusta cuando la barra aparece/desaparece */
.modal { height: 100svh; }   /* small — siempre el tamaño chico */
.modal { height: 100lvh; }   /* large — siempre el tamaño grande */

/* Opción 2 (fallback): JS midiendo window.innerHeight y seteando CSS var */
```

## Render-to-Image en Mobile (gotchas reales)

Si el componente debe exportarse a PNG/JPG (badges, posters, capturas) y se ve en mobile:

### Problema 1: el transform: scale rompe el export
html-to-image / modern-screenshot miden el bounding box VISUAL del nodo. Si el componente tiene `transform: scale(0.6)`, el SVG foreignObject sale 0.6× → el resto del contenido se recorta o sale en blanco.

**Fix**: render un **clone offscreen** SIN las transformaciones, no el live.

```js
async function renderOffscreen(node) {
  const w = node.offsetWidth;   // layout box, no afectado por transform
  const h = node.offsetHeight;

  const stage = document.createElement('div');
  stage.style.cssText = `position:fixed;left:-20000px;top:0;width:${w}px;height:${h}px;pointer-events:none`;

  const clone = node.cloneNode(true);
  clone.style.transform = 'none';
  clone.style.position = 'static';
  // Limpia botones de UI que no van al PNG (ej. "Editar foto")
  clone.querySelectorAll('.ui-only').forEach(el => el.remove());

  stage.appendChild(clone);
  document.body.appendChild(stage);

  try {
    // Espera que TODAS las <img> decoded (no solo loaded)
    await Promise.all(
      Array.from(clone.querySelectorAll('img')).map(img =>
        img.decode?.().catch(() => {})
      )
    );
    return await libToPng(clone, { scale: 2, width: w, height: h });
  } finally {
    stage.remove();
  }
}
```

### Problema 2: iOS Safari + foreignObject + `<img src="data:...">` falla en el PRIMER render
Bug histórico de iOS Safari: la imagen no se incluye en el primer render. Segundo render sí.

**Fix**: double-render warmup.

```js
const warmup = await libToPng(clone, opts);  // descarta este
void warmup;
const dataUrl = await libToPng(clone, opts);  // este es el bueno
```

### Problema 3: `html-to-image` es flaky en iOS
Recomendación: usar **`modern-screenshot`** (fork con Safari fixes baked in: `fixSvgXmlDecode`, `drawImageInterval`). Es ESM-only en versiones 4.7+, cargar por jsdelivr `+esm`:

```html
<script type="module">
  import * as ms from 'https://cdn.jsdelivr.net/npm/modern-screenshot@4.7.0/+esm';
  window.modernScreenshot = ms;
  window.dispatchEvent(new Event('modernScreenshotReady'));
</script>
```

### Problema 4: `background-clip: text` (texto con gradient) NO renderiza en html2canvas
html2canvas re-rasteriza y no entiende `background-clip: text`. Usar SIEMPRE `html-to-image` o `modern-screenshot` (rasterizan vía SVG foreignObject que SÍ entiende esa CSS).

### Problema 5: `writing-mode: vertical-rl` + `transform: rotate(180deg)` se rompe en html2canvas
Mismo motivo: solución con foreignObject (html-to-image / modern-screenshot).

### Problema 6: `skipFonts: true` evita errores de CORS
Si la página carga Google Fonts u otro CSS cross-origin, la lib intenta inlinearlo y falla con SecurityError. Las fuentes ya están renderizadas en el browser; con `skipFonts: true` el output es igual y la consola queda limpia.

## File Upload en Mobile

Patrón seguro y a prueba de doble-trigger:

```html
<div class="upload-box" role="button" tabindex="0">
  <input type="file" accept="image/*" />
  <div class="upload-box__inner">...</div>
</div>
```

```css
.upload-box input[type="file"] {
  position: absolute;
  width: 1px; height: 1px;
  opacity: 0;
  pointer-events: none;
  left: -9999px;
}
```

```js
uploadBox.addEventListener('click', (e) => {
  // Guard contra el bubble del input click cuando se dispara programáticamente
  if (e.target.tagName === 'INPUT') return;
  input.click();
});
input.addEventListener('change', (e) => {
  const file = e.target.files?.[0];
  if (file) handle(file);
  e.target.value = '';  // permite re-subir el mismo archivo
});
```

NO uses `<label for="inputId">` envolviendo el input + JS handler — algunos browsers (Safari) bloquean el doble-trigger y el dialog no abre.

## Anti-patterns a Evitar

- `position: fixed` para botones full-width en mobile sin `env(safe-area-inset-bottom)` → se cortan en iPhones con home indicator.
- `overflow: hidden` en body para "evitar scroll horizontal" → cancela momentum scroll en iOS. Mejor encontrar la causa real del overflow.
- `width: 100vw` en hijos → 100vw incluye scrollbar; usar `width: 100%` o `width: 100dvw`.
- Fontes a `0.875rem` o más chicas en mobile sin razón fuerte → texto ilegible. iOS Safari auto-zoom en inputs con font-size < 16px.
- Modal full-screen con altura `100vh` → recortado por la barra de iOS Safari. Usar `100dvh`.
- Botón de upload como `<label>` envolviendo input + click handler manual → conflicto en algunos browsers, el dialog no abre.
- Ratio toggle / segmented control con cards muy chicas → mal touch. Mínimo 44 px de alto en cada opción.

## Testing Checklist

Antes de declarar responsive listo:

- [ ] Chrome DevTools mode mobile: iPhone SE (375), iPhone 14 Pro (390), iPhone Pro Max (430), Android Pixel (412)
- [ ] Pruebas REALES en al menos un iPhone (iOS Safari) y un Android (Chrome)
- [ ] Modo landscape: el form/preview no se cortan
- [ ] Inputs no disparan auto-zoom (font-size ≥ 16px)
- [ ] Touch targets ≥ 44×44 px
- [ ] Safe areas respetadas (notch / home indicator no tapan contenido)
- [ ] Modal/cropper modal usable con teclado virtual abierto
- [ ] Si hay export a imagen: foto sube → crop → download → PNG correcto (en iOS Safari especialmente)
- [ ] Cache busting de assets críticos (CSS/JS) cuando cambias responsive rules

## Playwright Mobile Testing Pattern

```js
// Resize viewport antes de navegar
await page.setViewportSize({ width: 375, height: 812 });
await page.goto(url);

// Verificar layout
const rect = await page.evaluate(() => document.getElementById('badge').getBoundingClientRect());

// Screenshot full page para QA visual
await page.screenshot({ path: 'mobile-375.png', fullPage: true });
```

Limitación: Playwright Chromium NO simula iOS Safari quirks (foreignObject + img, 100vh, safe areas). Para esos casos hay que probar en device real o usar WebKit playwright (`playwright.webkit`).

## Pill MCP relacionada

- **Playwright** — para QA visual y functional en distintos viewports.
- **WebSearch** — para buscar issues conocidos de iOS Safari o librerías cuando el bug es específico (ej: html-to-image + iOS).

## Cuándo NO usar esta skill

- App backend / API → irrelevante.
- Documento PDF estático → no es responsive web.
- Email HTML → tiene reglas propias (tablas, inline styles, gmail-safe). Usar `email-html-marketing`.
- Slides PowerPoint → no es responsive web. Usar `slides` o `disruptive-presentations`.

## Origen de los criterios

Las recetas de scale-preserving, double-render warmup y file upload pattern vienen del badge generator del AI Construction Summit 2026 (`teamdev-genplus/ai-construction-summit-badge`), donde resolver mobile robusto tomó iteraciones reales sobre iPhone con cropping, transform queries y export a PNG. Los criterios generales vienen de Apple HIG, Material Design 3, WCAG 2.2, MDN Web Docs y la documentación oficial de modern-screenshot.
