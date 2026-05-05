# Criterios de UI — Documentador Experto

Referencia de diseño para todas las documentaciones generadas con las sub-skills doc-desarrollos y doc-general.

## Variables CSS base

```css
:root {
  --bg: #0a0a0f;
  --surface: rgba(18,18,26,0.65);
  --surface2: rgba(26,26,38,0.6);
  --border: rgba(124,58,237,0.2);
  --purple: #7c3aed;
  --purple-light: #a855f7;
  --cyan: #22d3ee;
  --green: #34d399;
  --yellow: #fbbf24;
  --red: #f87171;
  --white: #f1f0ff;
  --muted: #8b8ba8;
  --radius: 12px;
}
```

## Fondo animado Canvas 2D

Logos de redes sociales (Instagram, TikTok, YouTube, LinkedIn, X) flotando conectados por líneas.
Usa Path2D con SVG paths de Simple Icons (viewBox 0 0 24 24).

Parámetros:
- NODE_SIZE: 32px
- NODE_COUNT: 18
- CONNECT_DIST: 180
- SPEED: 0.3
- Zona central fade: `(n.x > W*0.18 && n.x < W*0.82) ? 0.45 : 1`
- Canvas: `position: fixed; z-index: 0; pointer-events: none`
- Contenido: `position: relative; z-index: 1`

## Secciones

```css
.doc-section {
  background: rgba(18,18,26,0.65);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(124,58,237,0.2);
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 24px;
}
```

## AOS Init

```javascript
AOS.init({ duration: 600, once: true, offset: 60 });
```

Animaciones usadas: fade-up, fade-right, fade-left, zoom-in.
Delays escalonados en grids: 0, 60, 120, 180... ms.

## Capturas con Playwright

Para guías de usuario con capturas reales de la herramienta:

1. Navegar a la app con Playwright
2. Esperar carga completa (browser_wait_for text)
3. Capturar pantalla completa: `browser_take_screenshot filename="docs/screenshots/nombre.png"`
4. Si la app tiene sidebar izquierdo vacío, recortar con CSS:
   - `.screenshot-wrap.crop-output img { width: 138%; margin-left: -38%; }`
5. Insertar en HTML con `<img src="screenshots/nombre.png">` (path relativo)
6. Vercel sirve los archivos estáticos automáticamente

## Regla del fondo animado vs secciones

El canvas animated background es un elemento de diseño, no decoración.

Tres enfoques válidos (de document-grammar.md):
1. **Semi-transparente**: rgba dark tint + backdrop-filter blur — el canvas se ve a través
2. **Mutación por zona**: canvas cambia color/hue con scroll (GSAP + ScrollTrigger)
3. **Contraste total intencional**: zona blanca o púrpura sólida donde el canvas IS el fondo

NUNCA: fondo sólido opaco que tape el canvas sin intención.

## Navegación entre docs

Todas las docs deben tener header nav que enlace a las otras docs del mismo desarrollo.

```html
<nav>
  <a href="../index.html" class="nav-logo">...</a>
  <div class="nav-links">
    <a href="doc1.html">Doc 1</a>
    <a href="doc2.html">Doc 2</a>
  </div>
  <span class="nav-badge">Tipo de doc</span>
</nav>
```

La app principal debe tener botón "Docs" en su header que apunte a la guía de usuario.
