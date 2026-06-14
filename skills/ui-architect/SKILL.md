---
name: ui-architect
description: Diseña y construye UIs HTML de nivel producción — landing pages, dashboards, portfolios 3D, tours interactivos, cualquier artefacto donde el HTML IS the product. Opera en dos modos: Sketch-to-UI (interpreta bocetos) y Brief-to-UI (decisiones autónomas de diseño). Tiene absorbidos dos sistemas visuales de producción real: Dark Luxury Tech y Neon World 3D. Activar cuando el usuario quiera una UI premium, un artefacto visual HTML, o necesite elevar el diseño de algo existente.
tools:
  - Read
  - Write
  - WebFetch
  - mcp__playwright__browser_navigate
  - mcp__playwright__browser_take_screenshot
  - mcp__playwright__browser_snapshot
---

# Visual HTML Craft

## Paquete operativo

`ui-architect` es la skill canonica para HTML visual interactivo en ESC-AI. Absorbe el rol antiguo de `visual-html-craft`.

Regla de no solape: usar `ui-architect` cuando el entregable sea un artefacto HTML visual/premium donde el HTML es el producto. Usar `frontend-skill` solo cuando haya app/repo/frontend real con componentes, rutas, estado o framework. Usar `documentador-experto` cuando el objetivo sea documentar un sistema, proceso o concepto.

| Capa | Ruta | Funcion |
|---|---|---|
| Dominio | `ui-architect` | Decidir layout, UI, sistema visual, interaccion y acabado premium |
| Apertura/verificacion | Playwright MCP o navegador local | Renderizar, inspeccionar y tomar screenshots |
| Fallback | HTML local sin servidor o dev server | Usar segun el tipo de app/artefacto |

Arranque veloz: entender objetivo y audiencia, elegir modo Sketch-to-UI, Brief-to-UI o Rescue Pass, construir el artefacto usable, abrirlo y verificar screenshot antes de cerrar.

## Routing UI 2026

Leer `references/ui-ecosystem-candidates.md` cuando se necesite escoger libreria, referencia visual o fuente de componentes. Leer `references/web-ui-research-2026.md` cuando el usuario pida buscar criterios/librerias/herramientas, mejorar una skill de UI, elevar una interfaz que se siente generica, o diseñar una UI importante con referencias externas. Leer `references/ui-validation-protocol.md` antes de cerrar cualquier UI con canvas, motion, 3D o responsive sensible.

| Pedido | Ruta |
|---|---|
| HTML visual autocontenido, showcase, landing experimental, dashboard visual estatico | `ui-architect` |
| App real con repo, rutas, estado, componentes, React/Vite/Next | `frontend-skill` |
| Documentacion interactiva de sistema/proceso/desarrollo | `documentador-experto` |
| Skill antigua `visual-html-craft` | Redirigir a `ui-architect` |
| Skill antigua `premium-interactive-docs` | Redirigir a `documentador-experto` |

## Modern Component Strategy

Para artefactos HTML autocontenidos, no instalar frameworks salvo que el repo ya los use. Usar CSS/JS directo, CDN controlado y componentes propios.

Para apps React/Next/Vite, preferir:

1. `shadcn/ui` o Radix como base de primitives cuando el repo ya usa React/Tailwind;
2. componentes cherry-picked de Magic UI, Aceternity o Motion Primitives solo si encajan con el producto;
3. Vercel AI Elements, Nexus UI, Agents UI o patrones agent/chat solo para interfaces AI/agenticas;
4. charts/layers especializados solo cuando la informacion lo exige.

No convertir `ui-architect` en una dependencia de librerias externas. Las librerias son fuente de patrones, no sustituto de criterio visual.

## External Reference Pass

Cuando el resultado dependa de calidad visual actual, no diseñar desde memoria solamente. Hacer un pase corto de referencias:

1. identificar la categoria de UI: landing, app operativa, dashboard, documentacion visual, AI UI, portfolio o experiencia;
2. revisar 3-5 referencias reales o librerias/patrones actuales;
3. extraer decisiones, no copiar: estructura, densidad, paleta, motion, estados, accesibilidad y responsive;
4. elegir una direccion de arte propia y codificar;
5. validar por screenshot.

Regla: una libreria no reemplaza direccion de arte. Si el resultado se ve como demo de componente, rehacer composicion.

## Creative Medium Decision

Antes de construir una UI visual/premium, decidir el medio dominante. No asumir que HTML/CSS/canvas propio es el medio correcto.

Opciones validas:

1. **Imagen generada o asset real primero** — para heroes, fondos conceptuales, producto, analogias materiales, atmosferas y escenas que deben sentirse diseñadas.
2. **Imagen por capas + motion ligero** — para parallax, glints, particulas, mascaras, profundidad y movimiento sin redibujar la escena con HTML.
3. **Libreria/fondo animado probado** — Vanta, tsParticles, shader, Lottie, Rive, Spline, Three.js scene o equivalente, customizado por marca y semantica.
4. **Framer-style composition** — layouts radiales, espirales, stacks, grids, waves, hover/scroll effects, component interactions y page effects cuando aportan narrativa.
5. **HTML/CSS editorial** — texto, layout, secciones, overlays, estados y responsive. HTML compone; no debe fingir ser imagen.

Regla clave: si una escena visual requiere materialidad, profundidad o metafora concreta, generar/usar asset visual antes de codificar. Si el HTML empieza a parecer "bloques intentando diseñar", detener y cambiar de medio.

### Creative Route Matrix

| Necesidad visual | Ruta preferida |
|---|---|
| Analogia material o conceptual | ImageGen / asset hero |
| Fondo vivo abstracto pero moderno | Vanta / shader / WebGL probado |
| Particulas con semantica | tsParticles con shapes, images, icons, logos o figuras del dominio |
| Microinteraccion ilustrada | Rive o Lottie |
| 3D tangible o hero interactivo | Spline o Three.js |
| Layout radial/orbital/espiral | Imagen generada, Framer Layout Composer como referencia, SVG/Three.js si necesita interaccion |
| Dashboard o app operativa | componentes propios, shadcn/Radix si React, motion minimo |
| Documento estrategico visual | asset hero + editorial sections |

La skill puede y debe aportar creatividad: no limitarse a ejecutar literal. Proponer una analogia visual superior cuando el contenido lo permita.

## Verification Gate

Antes de cerrar:

1. abrir la UI en navegador o Playwright;
   - **El Playwright MCP bloquea `file://`** → servir con `python -m http.server <puerto>` desde la carpeta del HTML y navegar a `http://localhost:<puerto>/archivo.html` (cerrar con `pkill -f "http.server <puerto>"`). Los screenshots caen en `.playwright-mcp/` o el cwd.
2. screenshot desktop y mobile cuando haya responsive/motion/canvas/3D;
3. revisar consola sin errores (el `404 favicon.ico` es inofensivo, NO cuenta como error);
4. verificar que texto no se corta ni se superpone;
5. si hay canvas/Three.js, comprobar pixeles no blancos/no negros y movimiento visible;
6. si hay interaccion, probar al menos una accion principal.

## Purpose
Produce self-contained HTML artifacts with premium visual design. Every output must look and feel like a professional product studio shipped it — not a template.

---

## Modos de Entrada

La skill opera en cuatro modos. Detecta cuál aplica automáticamente según el input del usuario y el contexto de la skill que la llama.

---

### MODO 0 — UI Quick Pass

**Cuándo activar:** otra skill ya definió contenido, estructura y branding, y solo necesita que el HTML final se vea profesional sin abrir un proceso largo de diseño. Usar especialmente cuando `presentation-orchestrator`, `goldratts-brain`, `zuckerbergs-mind` o cualquier skill de planificación ya validó el contenido y pide generar un plan, dashboard, player o artefacto HTML.

**Protocolo:**

1. No reiniciar el análisis estratégico ni pedir nueva validación de contenido.
2. Respetar la estructura recibida y elevar solo la UI: jerarquía, ritmo visual, responsive, estados, motion y claridad.
3. Usar fondo con vida visual solo en la dosis necesaria: canvas/SVG/dot-grid/glow sutil, no espectáculo gratuito.
4. Mantener el HTML autocontenido, compartible y listo para abrir.
5. Si el artefacto requiere modo normal/light, implementar toggle fijo con `localStorage`.
6. Documentar al final únicamente las decisiones UI relevantes y la ruta del archivo.

**Regla clave:** en Quick Pass, la UI sirve al contenido ya aprobado. No cambia narrativa, orden, alcance ni promesas.

---

### MODO 1 — Sketch to UI

**Cuándo activar:** el usuario manda una foto, imagen, o descripción textual de un boceto a mano con estructura visual (cajitas, flechas, secciones, texto aproximado).

**Protocolo:**

1. **Leer el sketch** — identificar: zonas de layout, jerarquía de contenido, elementos clave (nav, hero, cards, form, etc.), intención de cada sección
2. **Confirmar lectura** — responder con un resumen de la estructura interpretada en 5-8 bullets antes de codear:
   ```
   Entendí:
   - Nav: logo izquierda + links centrados + CTA
   - Hero: full-viewport con título + subtítulo + 2 botones
   - Sección: 3 cards de features en grid
   - Footer: simple con links
   ¿Correcto o ajusto algo?
   ```
3. **Esperar confirmación** — no generar código hasta que el usuario valide la lectura
4. **Aplicar el preset más adecuado** al contenido — si es una app seria: Dark Luxury Tech; si es un portfolio: Neon World o Custom
5. **Elevar el diseño** — el sketch es la estructura, NO el diseño final. Claude aplica todo el sistema de componentes premium sobre esa estructura

**Regla clave:** el boceto define QUÉ va, la skill define CÓMO se ve. Nunca replicar literalmente un sketch tosco.

---

### MODO 2 — Brief to UI (Criterio Autónomo)

**Cuándo activar:** el usuario da una pauta, idea, o descripción de lo que quiere sin estructura visual explícita.

**Protocolo:**

1. **Extraer del brief:**
   - Propósito comunicacional (¿qué debe sentir quien lo ve?)
   - Audiencia (¿quién lo ve y qué necesita percibir?)
   - Contenido disponible (textos, imágenes, datos)
   - Tono (serio, lúdico, premium, urgente, aspiracional)

2. **Definir el Eje de Comunicación Visual** (ver sección debajo)

3. **Tomar todas las decisiones de diseño** sin preguntar — layout, paleta, tipografía, motion, preset. Solo preguntar si falta información crítica (ej: no hay texto para el hero).

4. **Generar directamente** con el bloque de decisiones documentado al final.

---

### MODO 3 — Rescue Pass / Rediseño de HTML Existente

**Cuándo activar:** el usuario entrega un HTML, screenshot o archivo existente y dice que el contenido está bien pero la UI, fondo, analogía visual, suavidad, jerarquía o acabado se sienten flojos.

**Protocolo:**

1. **Preservar contenido aprobado.** No reescribir narrativa, tesis, orden ni conclusiones salvo errores evidentes o petición explícita.
2. **Auditar la UI actual antes de editar:** fondo/analogía, paleta, tipografía, jerarquía, densidad, cards, ritmo de secciones, motion, responsive y consola.
3. **Detectar la idea nuclear visual:** convertir el tema en una analogía operacional de alto nivel, no en palabras literales flotando.
4. **Elegir el medio correcto:** imagen generada, asset existente, libreria animada, Framer/Spline/Rive/Lottie, Three.js o HTML editorial. No forzar HTML si la pieza pide imagen.
5. **Rehacer primero el sistema visual base:** asset/hero, tokens, layout, fondo vivo, secciones y estados. Luego ajustar detalles.
6. **Eliminar decoración blanda:** gradientes morados genéricos, dots, blobs, redes abstractas, orbes, stickers flotantes, cards repetidas y glows sin función.
7. **Usar motion con una razón:** entrada del hero, profundidad de scroll, microinteracciones y fondo lento que ayude a entender el tema.
8. **Validar con screenshot:** desktop y mobile antes de cerrar. Si algo se ve amateur, iterar.

**Regla clave:** en Rescue Pass, la meta no es "embellecer" el HTML. La meta es que la interfaz tenga dirección de arte, legibilidad y una analogía visual que sostenga el contenido.

---

## Eje de Comunicación Visual

Este es el principio central del Modo 2. Cada elemento de la UI comunica algo — nada es decoración pura.

### Los 4 Layers Comunicantes

```
LAYER 1 — FONDO (Background)
El fondo comunica el universo del producto.
- ¿Es un mundo oscuro y premium? → dark BG con partículas o WebGL
- ¿Es algo vivo y en movimiento? → video loop o canvas animado
- ¿Es confianza y solidez? → gradiente profundo, estático
- ¿Es energía y color? → fondo con paleta saturada y motion

Regla: el fondo nunca es neutro. Siempre dice algo sobre quién eres.

LAYER 2 — IMÁGENES
Las imágenes son el argumento visual del producto.
- Deben ser HD, bien encuadradas, con composición pensada
- Siempre con tratamiento de color coordinado con la paleta
- Usar overlays sutiles para integrarlas al BG (no flotan solas)
- Las imágenes de personas: reales, no stock genérico
- Placeholder: usar unsplash con keywords precisos o descripciones
  que generen imágenes con la estética correcta

LAYER 3 — ÍCONOS / LOGOS
Deben verse reales, HD y estéticos. No clip-art.
- Preferir SVG outline con stroke uniforme
- Monochrome en color del acento o blanco — no multicolor si no es necesario
- Tamaño consistente, alineados al grid
- Logos de terceros: siempre en versión SVG limpia, nunca PNG comprimido
- Si es el logo propio: diseñar una wordmark tipográfica sólida
  con símbolo geométrico simple — nunca un placeholder genérico

LAYER 4 — TIPOGRAFÍA / TEXTO
La tipografía es el tono de voz visual.
- El tamaño del texto hero comunica confianza o urgencia
- El peso (bold vs thin) comunica autoridad vs delicadeza
- El spacing comunica respiración vs densidad
- Dos fuentes máximo: una display (personalidad) + una body (legibilidad)
```

### Coherencia entre Layers

Los 4 layers deben hablar el mismo idioma:

| Si el fondo es... | Las imágenes deben ser... | Los íconos... | La tipografía... |
|---|---|---|---|
| Dark, oscuro, atmosférico | Con overlay oscuro integrado | Outline blanco o teal | Bold condensed caps |
| Neon, vibrante | Saturadas, contrastadas | Filled de colores del neon | Pixel o handwritten |
| Claro, minimalista | Limpias, luz natural, espacio negativo | Outline fino gris | Thin elegante |
| Foto realista | Misma temperatura de color | Coordinados con foto | Sans-serif medio |

---

## Mandatory Briefing (solo si faltan datos críticos)

Claude NO pregunta si tiene suficiente contexto para tomar decisiones. Solo pregunta si falta algo que bloquea la generación:

- **Branding obligatorio:** antes de generar cualquier HTML visual, incluso un soporte/documento simple, confirmar o pedir branding mínimo: marca/proyecto, paleta, tono visual y analogía/fondo semántico esperado. Si el usuario ya dio branding, usarlo. Si no lo dio, preguntar de forma breve antes de producir.
- ¿No hay texto para el hero? → preguntar el mensaje principal
- ¿No hay nombre/marca? → preguntar
- ¿La audiencia es completamente ambigua? → preguntar

Todo lo demás (layout, motion, componentes) Claude lo decide solo y lo documenta al final.

## Fondo Semántico Obligatorio

Para HTML visuales, el fondo animado debe comunicar el mismo universo que el contenido. No usar textura, puntos o gradientes genéricos si el tema permite una analogía clara.

- Si el contenido habla de árboles, el fondo debe sugerir árboles, hojas, ramas, crecimiento o caída según la narrativa.
- Si habla de rutas/skills/plataforma, el fondo debe sugerir nodos, caminos, capas, conexiones, progreso o empaquetamiento.
- Si habla de construcción/BIM, el fondo debe sugerir grillas, planos, modelos, capas, coordenadas o elementos AEC.
- Si habla de "envoltura" o producto vendible, el fondo no debe quedarse en cápsulas literales. Debe sugerir transformación de materia prima en producto: unidades modulares que entran a una línea de ensamblaje, capas que envuelven un núcleo, etiquetas comerciales que aparecen al final, o rutas que se recombinan en empaques vendibles.

Regla: fondo, paleta, tipografía y composición deben reforzar juntos la idea central. Si el fondo no se entiende al explicar el contenido, rediseñarlo.

### Escalera de Analogía Visual

Antes de diseñar el fondo, elegir el nivel correcto. Subir en la escalera si el nivel actual se siente obvio, literal o decorativo.

| Nivel | Tipo | Señal de alerta | Ejemplo para F3/producto |
|---|---|---|---|
| 0 | Decoración genérica | Podría servir para cualquier tema | blobs morados, dots, redes abstractas |
| 1 | Literal débil | Repite palabras del texto sin explicar el sistema | cápsulas flotando, labels "Skill", "Ruta" |
| 2 | Dominio directo | Usa objetos reales del contenido con orden | skill units, evidencias, diplomas, rutas |
| 3 | Sistema operacional | Muestra cómo se transforma el valor | unidades -> ensamblaje -> empaque -> oferta |
| 4 | Metáfora propietaria | Crea una imagen memorable y propia | fábrica silenciosa de productos educativos modulares |

Objetivo normal: nivel 3. Nivel 4 solo si el brief pide una pieza más memorable o disruptiva.

### Prueba de Fondo Semántico

Un fondo pasa si cumple todo:

- Se puede explicar en una frase sin usar "bonito", "tech", "premium" o "futurista".
- No depende de leer labels diminutos para entenderse.
- Tiene 2-4 tipos de elementos como máximo.
- La actividad visual se concentra en bordes o planos secundarios, dejando zonas calmas para texto.
- El movimiento muestra proceso, flujo, agrupación, tensión o transformación; no solo flotación.
- Funciona en captura estática. Si en screenshot no comunica nada, la animación no lo salva.

### Paleta y Mood

No usar púrpura oscuro como default automático para HTML premium. Elegir paleta desde el contenido:

- Producto/decisión/operación: grafito, tinta, verde-teal sobrio, blanco cálido, acento ámbar o cian.
- Educación modular/producto: fondo editorial oscuro o claro con capas, etiquetas, grid y acentos controlados.
- IA/tech: usar cian, azul o verde solo si hay una razón semántica; evitar "neón por neón".
- Presentación ejecutiva: alto contraste, menos glow, más espacio, tipografía fuerte y ritmo editorial.

Si el usuario critica "fondo fofo", "no smooth", "horrible" o similar, asumir que el problema es de dirección de arte completa, no solo de colores.

---

## Core Tech Stack (required on every output)

```
Three.js       → 3D backgrounds, WebGL scenes, modelos interactivos
GSAP + ScrollTrigger → Scroll-driven animations, timelines, scrubbing
Anime.js       → Micro-animations, stagger effects, counters
Canvas 2D      → Fondos custom, wireframes, partículas ligeras
```

Load via CDN. No bundlers. Un único archivo HTML autocontenido.

---

## Design System: Dark Luxury Tech

Preset absorbido de interfaz real de nivel producción. Usar por defecto a menos que el briefing indique otro mood.

### Color Tokens

```css
:root {
  --bg:           #050A0A;      /* negro con undertone teal */
  --surface:      #0D1A18;      /* card bg oscuro */
  --surface-2:    #112520;      /* hover / elevated surface */
  --accent:       #00BFA5;      /* teal primario — botones, highlights, números */
  --accent-deep:  #0A5C52;      /* teal profundo — overlays, gradientes */
  --accent-glow:  rgba(0,191,165,0.15); /* border sutil, glow */
  --overlay:      rgba(5,30,25,0.72);   /* overlay en fotos */
  --text-1:       #FFFFFF;      /* títulos */
  --text-2:       #C8D5D3;      /* body */
  --text-muted:   #6B8A86;      /* labels, hints */
  --border:       rgba(0,191,165,0.12);
  --radius-sm:    8px;
  --radius-md:    14px;
  --radius-lg:    24px;
  --radius-pill:  999px;
}
```

### Typography

```css
/* Fuentes vía Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap');

/* Jerarquía */
--font-display: 'Barlow Condensed', sans-serif;  /* headings, hero */
--font-body:    'Barlow', sans-serif;             /* body, labels */

/* Escala */
--text-hero:    clamp(3.5rem, 8vw, 8rem);   /* hero principal */
--text-h1:      clamp(2.5rem, 5vw, 5rem);
--text-h2:      clamp(1.8rem, 3vw, 3rem);
--text-h3:      1.4rem;
--text-body:    1rem;
--text-label:   0.75rem;

/* Reglas */
/* Headings: font-weight 800-900, text-transform: uppercase, letter-spacing: -0.02em */
/* Labels/tags: font-weight 500, text-transform: uppercase, letter-spacing: 0.18em */
/* Dos colores en un heading: primera línea #FFFFFF, segunda línea var(--accent) */
/* Pull quotes: italic, mix white + teal */
```

---

## Componentes Premium (biblioteca obligatoria)

### 1. Nav Sticky con Glassmorphism

```
- Posición: fixed top, full width
- BG: rgba(5,10,10,0.85) + backdrop-filter: blur(20px)
- Border bottom: var(--border)
- Logo: izquierda — símbolo SVG + nombre en 2 líneas (BRAND / SUBTÍTULO)
- Links: centrados, uppercase, letter-spacing 0.15em, sin subrayado
- CTA button: derecha — pill filled accent, text uppercase spaced
- Al scroll >50px: aumentar blur y opacidad del bg
```

### 2. Hero Full-Viewport

```
- min-height: 100vh
- BG: foto/video con overlay var(--overlay), o Three.js WebGL scene
- Contenido centrado verticalmente
- Announcement bar arriba (ver componente 3)
- Heading: 2 líneas, primera blanca, segunda teal — font-size var(--text-hero)
- Subtítulo: text-2, font-weight 300, letter-spacing 0.05em
- CTA group: 3 botones (outline teal, filled teal con ▶, dark pill)
- Stats bar debajo: 3-4 columnas, número grande teal + label spaced caps
- GSAP: hero elements fade+slide up en stagger al cargar
```

### 3. Announcement Bar / Alert Card

```
- Card oscura border-radius var(--radius-lg)
- Left: thumbnail circular + badge pill (teal uppercase) + título + descripción
- Right: botón "Texto →" (dark pill)
- Carousel dots para múltiples alertas
- Auto-rotate con Anime.js cada 4s
```

### 4. Section Header con Número Grande

```
- Número ("01", "02"...) en var(--accent), font-size 6-8rem, opacity 0.3, font Barlow Condensed 900
- Label spaced caps a la derecha del número (text-muted)
- Heading bold condensed debajo — primera línea blanca, segunda teal
- GSAP ScrollTrigger: número crece de izquierda, texto fade-in
```

### 5. Project / Feature Cards

```
- BG: var(--surface), border: var(--border), border-radius: var(--radius-md)
- Imagen arriba: full-bleed, rounded top corners, overlay gradiente bottom
- Badges top-left: pill filled (teal o variante por status)
- Badge especial top-right: "★ DESTACADO" pill teal
- Cuerpo: nombre bold, ubicación con pin icon muted, specs 3-col (número + label)
- Footer: "DESDE" muted + precio teal bold + "VER DETALLE →" right
- Hover: translateY(-4px), border color var(--accent), box-shadow 0 12px 40px rgba(0,191,165,0.15)
```

### 6. Stats Bar

```
- 3-4 columnas iguales, separadas por border vertical sutil
- Número/texto grande: var(--accent), Barlow Condensed 800, 3-4rem
- Label: uppercase, spaced, var(--text-muted), 0.7rem
- GSAP: count-up animation al entrar en viewport
```

### 7. Pull Quote Cinematográfico

```
- Centrado, max-width 800px, padding vertical amplio
- Primera línea: italic, var(--text-2), font-size 2rem
- Segunda línea: bold, var(--accent), font-size 2.2rem
- GSAP: fade-in + scale(0.95→1) al entrar
```

### 8. Two-Col Split Section

```
- Grid 1fr 1fr, gap 4rem
- Left: visual (imagen con rounded corners o canvas/3D embed)
- Right: label spaced caps + heading two-tone + body + bullet list (● + texto)
- Mobile: stack vertical
```

### 9. Numbered Feature Cards Grid

```
- 4 columnas (2 en tablet, 1 en mobile)
- Card: surface bg, padding 2rem, border: var(--border), border-radius var(--radius-md)
- Top: número teal small + icono SVG outline
- h3 bold + párrafo body
- Hover: border-color var(--accent)
- GSAP stagger: entrada escalonada desde abajo
```

### 10. Location / Info Split

```
- Two-col: left content, right map/visual placeholder
- Left heading: palabras clave en teal inline (ej: "En el corazón de SAN ISIDRO,")
- Lista de POIs: icon square (surface-2 bg) + nombre bold + tiempo muted
- Map placeholder: dark teal bg, pin icon centrado, label + sublabel
```

### 11. Cinematic Story / Chapters

```
- Sections full-height, sticky scroll o reveal progresivo
- Top-left: número grande ("01") + "de 04" muted
- Right: "Capítulo N · Nombre" spaced caps + h3 bold + body + "Sigue ›" link muted
- BG: foto full-bleed con overlay, o canvas animation
- GSAP ScrollTrigger pin + scrub
```

### 12. Contact Section

```
- BG: gradiente de var(--accent-deep) a var(--bg)
- Two-col: left info, right form
- Left: "— CONTACTO" label + heading split-color + párrafo + contact items (icon + label + dato)
- Form (right): inputs dark (bg: var(--surface), border: var(--border), text white)
  labels uppercase spaced encima de cada input
  submit: pill filled accent full-width
- Focus state: border var(--accent) + glow sutil
```

### 13. Tour 3D Page (layout completo)

```
- BG: #000 puro
- Nav flotante top: 3 zonas
  Left: "← Volver al sitio" pill dark
  Center: tabs "TOUR BRAND 3D | MODELO INTERACTIVO" con separador |
  Right: "▶ AUTO-TOUR" pill accent
- Viewport: Three.js canvas full-screen, modelo 3D central
  Material: MeshStandardMaterial dark teal-metallic
  OrbitControls: drag para girar, scroll para zoom
  Hotspots numerados (01, 02, 03): círculos SVG con pin vertical encima, posicionados via raycasting
  Click hotspot → panel lateral se actualiza
- Info panel bottom-left: glass card (blur bg), label teal + heading + descripción
- Tab bar bottom-center: pill tabs con active filled teal
- Hint bar bottom: tiny spaced caps muted
- Auto-tour: GSAP timeline que rota la cámara automáticamente entre hotspots
```

### 14. Footer

```
- BG: var(--bg), border-top: var(--border)
- 3 columnas: brand (logo + tagline), navegación, redes sociales
- Brand tagline: text-muted, italic
- Links: text-muted, hover: text var(--accent)
- Social: iconos SVG outline en pills surface
- Bottom bar: © + links legales + año, separados por border-top
```

---

## Motion Design System

### Curvas de Easing

```js
const ease = {
  smooth:   'power2.out',
  sharp:    'power3.inOut',
  spring:   'elastic.out(1, 0.5)',
  cinematic:'power4.out',
};
```

### Duraciones Estándar

```js
const duration = {
  fast:   0.3,   // hovers, micro-interactions
  medium: 0.6,   // reveal de elementos
  slow:   1.0,   // secciones enteras
  epic:   1.5,   // hero, transiciones full-page
};
```

### Jerarquía de Movimiento

```
1. BG / canvas anima primero (siempre visible)
2. Heading hero → stagger línea por línea
3. CTAs → 0.15s delay por botón
4. Stats → count-up al entrar en viewport
5. Cards → stagger 0.1s entre cards
6. Imágenes → scale(1.05→1) en reveal
```

### Reglas ScrollTrigger

```js
// Toda animación de scroll debe ser bidireccional
ScrollTrigger.create({
  trigger: '.section',
  start: 'top 80%',
  end: 'bottom 20%',
  toggleActions: 'play reverse play reverse',
  // ...
});
```

---

## Reglas Absolutas

1. **Fondo nunca tapado** — Las secciones van sobre el BG animado, nunca con `background: white` sólido sin tratamiento. Usar overlay semi-transparente, mutación de canvas, o contraste total negro.

2. **Hero es un poster** — Si lo printás en A3 se ve bien. Typography masiva, BG potente, CTA claro.

3. **Dos tonos en headings** — Primera línea blanca, segunda (o keyword clave) en `var(--accent)`. Nunca todo del mismo color.

4. **Labels siempre uppercase spaced** — `text-transform: uppercase; letter-spacing: 0.15em`. Sin excepciones para etiquetas de sección, badges, hints.

5. **Botones siempre pill** — `border-radius: var(--radius-pill)`. Los botones cuadrados no existen en este sistema.

6. **Números de sección son decoración** — `01`, `02` grandes y transparentes (opacity 0.2-0.3) en teal. No son el foco, son profundidad visual.

7. **Hover siempre tiene respuesta** — Cada elemento interactivo tiene hover (translateY, border-color, glow, escala). Nada estático que parezca clickeable.

8. **Mobile-first en CSS, premium-first en diseño** — El diseño se concibe en desktop premium, pero el CSS lo implementa mobile-first.

9. **Sin errores de consola** — Antes de entregar, verificar que no hay JS errors.

10. **CSS custom properties para todo** — Sin valores hardcodeados de color o spacing. Todo vía variables del design token.

---

## Assets y Entrega Portátil

**Verificar identidad del asset antes de usarlo.** Un logo encontrado por nombre puede ser de OTRA marca con el mismo nombre (Kaman Aerospace ≠ KAMAN incubadora; "Presto" retail ≠ RIB Presto; el favicon de un producto suele ser el símbolo genérico de la empresa madre, no el del producto). Confirmar la marca VISUALMENTE sobre el fondo real, no por el nombre del archivo/slug. Descargar local, nunca hotlink. Contraste: logo oscuro monocromo sobre fondo oscuro → recolorear a claro por CSS; logo con fondo opaco → no invertir (sale bloque blanco) → texto; wordmark ancho → no entra inline → texto. Si no hay logo de la marca correcta → texto, nunca el logo ajeno ni una imagen rota.

**Entrega portátil.** Un HTML con rutas relativas (`assets/...`) se rompe al descargarlo suelto (la descarga del chat aplana carpetas → no encuentra `assets/...`). Entregar self-contained (assets en base64, un archivo que no se rompe al moverlo) o un `.zip` que conserve la estructura; nunca archivos sueltos. En esta skill el output ya es "un único archivo HTML autocontenido" — embeber en base64 cumple esto de forma natural.

## Entregable Estructurado

Todo output termina con un bloque de decisiones de diseño:

```html
<!--
VISUAL DECISIONS:
- Mood: Dark Luxury Tech
- BG type: [foto+overlay / WebGL Three.js / Canvas 2D / gradiente puro]
- Paleta: var(--accent) #00BFA5 sobre #050A0A
- Tipografía: Barlow Condensed 800 display / Barlow 400 body
- Animaciones: GSAP ScrollTrigger + Anime.js counters
- Componentes usados: [lista]
- Mobile: [breakpoints usados]
- Notas especiales: [cualquier decisión no obvia]
-->
```

---

## Design System: Neon World 3D

Preset absorbido de Jesse Zhou (jesse-zhou.com). Usar cuando el objetivo es un portfolio creativo, una experiencia inmersiva, o cualquier artefacto donde la UI y el mundo visual son una misma cosa.

### Concepto Central

**El sitio ES el mundo.** No hay nav HTML. La navegación vive como objetos 3D dentro de una escena Three.js. El usuario interactúa con el mundo, no con una interfaz.

### Color Tokens — Neon World

```css
:root {
  --nw-bg:        #050505;       /* negro profundo */
  --nw-ground:    #1a1a2e;       /* ground plane oscuro */
  --nw-pink:      #FF2D6B;       /* neón magenta — signs primarios */
  --nw-cyan:      #00F5FF;       /* neón cyan — detalles, luces */
  --nw-green:     #39FF14;       /* neón verde — acentos */
  --nw-yellow:    #FFE000;       /* neón amarillo — signs secundarios */
  --nw-purple:    #9B5DE5;       /* púrpura — luz spill en el suelo */
  --nw-white:     #FFFFFF;
  --nw-emissive-pink:  #FF1A5E; /* emissive material color */
  --nw-emissive-cyan:  #00E5FF;
}
```

### Tipografía — Neon World

```css
/* Letrero principal neón: handwritten/script */
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Press+Start+2P&display=swap');

/* Reglas */
/* Nombre del "local" en 3D: Caveat 700 o similar script bold */
/* Nav signs en el poste: Press Start 2P (pixel retro) o monospace */
/* UI superpuesto (si existe): cualquier sans-serif limpio, muy pequeño */
```

### Three.js Scene Blueprint

```js
// Cámara: perspectiva, FOV 45-60, posición ligeramente elevada y angled
camera.position.set(0, 1.5, 6);
camera.lookAt(0, 1, 0);

// Luces obligatorias:
// 1. AmbientLight muy baja (0.05-0.1) — casi sin ambiente
// 2. PointLight magenta/pink en posición elevada izquierda — intensidad alta, decay 2
// 3. PointLight cyan a la derecha — intensidad media
// 4. PointLight blanco en el centro-top (las "bombillas" físicas del modelo)
// 5. RectAreaLight suave debajo del awning (luz interior del local)

// Ground plane: MeshStandardMaterial gris oscuro, roughness 0.8
// El color de las luces crea el spill de color en el suelo automáticamente

// Niebla sutil:
scene.fog = new THREE.FogExp2(0x050505, 0.08);

// OrbitControls con limits:
controls.enableZoom = false;
controls.minPolarAngle = Math.PI / 3;
controls.maxPolarAngle = Math.PI / 2.2;
controls.minAzimuthAngle = -Math.PI / 4;
controls.maxAzimuthAngle = Math.PI / 4;
// Efecto parallax sutil en mouse move (sin OrbitControls, manual)
```

### Componente 15: 3D World Navigation (Sign Post)

```
Estructura:
- Poste vertical central (CylinderGeometry, material dark metal)
- Base cuadrada pesada en el suelo (BoxGeometry)
- N signs en forma de flecha (PlaneGeometry o extruded shape)
  cada sign apunta en dirección alternada (izquierda/derecha)
  cada sign tiene su propio color neón como background
  texto en pixel font blanco o negro según contraste

Raycasting:
- En cada frame: raycast desde mouse hacia los signs
- On hover: sign escala a 1.05, cursor pointer, leve glow (emissive increase)
- On click: GSAP camera animation hacia esa "sección" del mundo + overlay HTML fade-in

Materiales de signs:
- MeshStandardMaterial con emissive del mismo color (intensidad 0.3)
- Al hover: emissiveIntensity sube a 0.8 con GSAP tween
- CanvasTexture para el texto del sign (canvas 2D → texture Three.js)
```

### Componente 16: Objeto 3D Hero (el "local")

```
Estructura modular del modelo:
- Base/plataforma (Box elevada)
- Fachada principal con ventanas (BoxGeometry + planos superpuestos)
- Techo estilo asiático (geometría inclinada o custom)
- Awning/toldo (plano inclinado translúcido)
- Sign principal NEÓN: texto 3D (TextGeometry) con material emissive
  o plano con CanvasTexture estilo neón (más performante)
- Props de ambiente: stools (CylinderGeometry pequeños), mesa, pizarrón
- Cables entre elementos (TubeGeometry con CatmullRomCurve3)
- "Bombillas" en los postes: SphereGeometry con MeshBasicMaterial blanco
  + PointLight hijo de cada esfera para el glow real

Animación idle:
- Leve float del modelo completo (sin.wave en Y, amplitud 0.03)
- Parpadeo ocasional del letrero neón (emissiveIntensity oscila 0.6-1.0)
- Cables con PhysicsGeometry ligera o animación de Lissajous en puntos medios
```

### Componente 17: Overlay de Contenido (post-click en sign)

```
Cuando el usuario clickea un sign 3D:
1. GSAP: cámara vuela hacia ese punto de la escena (1.2s, power4.out)
2. Scene fade: la escena 3D baja a opacity 0.2 con un overlay oscuro
3. HTML panel: slide-in desde el lado del click
   - Fondo: rgba(5,5,5,0.95) + backdrop-filter blur
   - Borde izquierdo: 3px solid color del sign
   - Contenido: título en pixel font (color del sign) + body en sans-serif
4. Botón "← Volver": regresa la cámara al home position + fade-out panel

Estilos del panel:
position: fixed; top: 0; right: 0; width: min(480px, 90vw); height: 100vh;
background: rgba(5,5,5,0.95); backdrop-filter: blur(24px);
border-left: 3px solid var(--sign-color);
padding: 3rem 2rem; overflow-y: auto;
```

### Técnica: CanvasTexture para texto neón en 3D

```js
function createNeonTexture(text, color, width=512, height=128) {
  const canvas = document.createElement('canvas');
  canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  // Fondo del sign
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
  
  // Glow effect
  ctx.shadowColor = color;
  ctx.shadowBlur = 20;
  
  // Texto
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${height * 0.5}px 'Press Start 2P'`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width/2, height/2);
  
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}
```

---

## Elección de Preset

Al inicio de cada output, Claude selecciona el preset más adecuado:

| Preset | Cuándo usarlo | Mood |
|--------|--------------|------|
| **Dark Luxury Tech** | Landing pages, real estate, dashboards, presentaciones corporativas premium | Serio, premium, teal oscuro |
| **Neon World 3D** | Portfolios creativos, experiencias inmersivas, showrooms de producto, sites experimentales | Lúdico, cyberpunk, neón vibrante |
| **Custom** | El briefing define una identidad diferente a los dos presets | Variable |

---

## Auto-Auditoría Final (antes de entregar)

**Para Dark Luxury Tech:**
- [ ] ¿El hero funciona como poster impreso?
- [ ] ¿Hay al menos 3 layers de profundidad visual (BG / mid / foreground)?
- [ ] ¿El scroll tiene al menos 2 puntos de transformación animados?
- [ ] ¿Todos los headings principales tienen dos tonos de color?
- [ ] ¿Los botones son pill y tienen hover state?
- [ ] ¿Los labels de sección están en uppercase spaced?
- [ ] ¿Los números de sección son decorativos (opacity < 0.4)?
- [ ] ¿Las stats tienen count-up animation?
- [ ] ¿Mobile se ve limpio y no roto?
- [ ] ¿Consola limpia?

**Para Neon World 3D:**
- [ ] ¿La escena Three.js carga en <3s?
- [ ] ¿El raycasting de hover responde fluidamente?
- [ ] ¿Las luces neón crean spill de color visible en el ground plane?
- [ ] ¿El modelo 3D tiene animación idle (float + parpadeo neón)?
- [ ] ¿Los sign materials tienen emissive que sube en hover?
- [ ] ¿El panel de contenido hace transición suave al clickear?
- [ ] ¿La cámara tiene límites de órbita razonables?
- [ ] ¿La niebla sutil enmarca la escena sin cortar el modelo?
- [ ] ¿Consola limpia?
