# Web UI Research 2026

Investigacion externa para potenciar `ui-architect` y `frontend-skill`. Usar cuando el usuario pida elevar UI, buscar librerias, auditar diseño, evitar AI slop, construir una landing/app visual, o rescatar un HTML existente.

Fecha de investigacion: 2026-05-26.

## Tesis

La ventaja no esta en "usar mas librerias". Esta en combinar:

1. **direccion de arte y analogia visual propia**;
2. **componentes owned/copy-paste** cuando hay app real;
3. **referencias reales por patron de flujo** antes de diseñar;
4. **motion con accesibilidad y performance**;
5. **QA visual por screenshot**, consola y responsive.

Actualizacion posterior: la ruta creativa no es solo elegir entre "HTML" o "imagen". La skill debe operar como director de arte tecnico: decidir si la pieza necesita imagen generada, asset existente, libreria animada, Framer/Spline/Rive/Lottie, shader, particulas customizadas, o composicion HTML sobria.

## Criterios Absorbidos

### 1. Open-Code Antes Que Black Box

El ecosistema 2026 favorece componentes copiables y editables sobre dependencias cerradas cuando la UI debe tener identidad propia.

- `shadcn/ui`: componentes React copiables, basados en Radix UI y Tailwind, con ownership del codigo.
- `Animate UI`, `React Bits`, `Magic UI`, `Aceternity`, `21st.dev`: utiles como patrones o componentes cherry-picked, no como sistema visual completo.
- Regla: si el repo ya usa React/Tailwind, partir de primitives owned. Si es HTML autocontenido, tomar la idea visual y reimplementarla simple.

### 2. Referencia Real Antes De Inventar

Para flujos y productos, usar referencias reales:

- `Mobbin`: patrones UI/UX de apps, web apps y websites; tiene MCP/API para agentes.
- `Page Flows`: flujos reales grabados y anotados; util para onboarding, checkout, conversion, dashboards y estados.
- `Godly`, `Awwwards`, `Landingfolio`, `Refero`: inspiracion visual; sirven para lenguaje visual, no para copiar estructuras.

Regla: antes de rediseñar una UI importante, buscar 3-5 referencias por tipo de producto o flujo y extraer patrones: layout, densidad, estados, motion, jerarquia, microcopy y contraste.

### 3. Accesibilidad Como Piso De Calidad Visual

WCAG 2.2 y Apple HIG convierten varios "detalles" en requisitos:

- foco visible y no obstruido;
- tamaño minimo de target;
- contraste suficiente;
- no depender solo del color;
- layout adaptable;
- tipografia legible y sin truncamiento;
- soporte de reduced motion.

Regla: una UI premium que falla accesibilidad no es premium; es una maqueta.

### 4. Motion Con Proposito Y Preferencias

Motion debe mejorar jerarquia, orientacion o atmosfera. No puede existir solo para "verse caro".

- Respetar `prefers-reduced-motion`.
- Reemplazar desplazamientos grandes/parallax por opacity o transiciones suaves cuando el usuario pide reduced motion.
- Evitar autoplay, grandes escalados, rotaciones y fondos excesivamente activos en UIs operativas.
- Para HTML visual, usar motion en tres capas: fondo lento, entrada/scroll, microinteraccion.

### 5. Performance Como Criterio De Diseño

web.dev/Core Web Vitals fija el estandar de sensacion:

- INP bueno: <= 200 ms en el percentil 75.
- Evitar layout thrashing: no mezclar updates de estilo con lecturas de layout dentro de loops.
- Canvas/Three.js debe degradar en mobile y respetar DPR razonable.
- Evitar fondos pesados si compiten con LCP, scroll o input.

Regla: si la animacion baja la respuesta, se simplifica.

### 6. AI UI Es Una Categoria Propia

Para interfaces con agentes/IA no basta un chat bonito:

- Vercel AI Elements: message threads, input boxes, reasoning panels y response actions sobre shadcn/ui.
- Patrones clave: reasoning visible, tool calls, confirm/apply/undo, streaming, artifacts, controles generativos y estado del agente.
- Regla: toda accion AI que cambie datos o archivos necesita control humano claro: preview, confirmacion, undo o historial.

### 7. Skills Externas: Absorber, No Duplicar

Skills externas revisadas:

- `ce-frontend-design` (Cursor): fuerte en detectar design system, calidad visual y verificacion por screenshot.
- `frontend-design` Codex/registries: fuerte en tokens, semantica, reduced motion, focus visible y AI human-in-control.
- `frontend-design-review`: fuerte como modo auditoria con hallazgos por severidad.
- `codex-design-skill`: pequeño; valor limitado como instalacion, util como señal de categoria.

Decision: no instalar por defecto. Absorber criterios en `ui-architect` y `frontend-skill`.

### 8. Framer Como Criterio De Direccion Creativa

Framer muestra una ruta que no depende de dibujar todo con HTML:

- Framer Academy enfatiza effects, component interactions, text effects, page transitions y scroll transforms como recursos de narrativa, no solo decoracion.
- Framer Marketplace tiene plugins de workflow visual como Layout Composer, que compone radial, spiral, sphere, polygon, curve, stack, grid y wave con palette, jitter, blur, perspective, motion y hover. Esto valida que layouts orbitals/radiales son un recurso de direccion visual, no un "canvas inventado".
- Framer MCP / Design Bridge MCP permiten que agentes trabajen sobre canvas real, componentes, tokens, paginas, CMS y layers. Si el usuario trabaja en Framer, conviene usar o instalar MCP/plugin antes de recrear a mano.
- Framer plugins incluyen Rive, LottieFiles, Unsplash, Lummi, Vanta backgrounds, UI kits y design workflow tools. Señal: usar ecosistema de assets/animacion antes que forzar CSS.

Regla absorbida: si la UI se siente como "HTML intentando diseñar", retroceder y elegir un medio visual mejor.

### 9. Matriz Creativa De Fondos Y Heroes

| Ruta | Cuándo usar | Cómo customizar | Riesgo |
|---|---|---|---|
| Imagen generada | Hero conceptual, marca, producto, analogia material | generar fondo/objeto con espacio para texto, luego overlay y motion sutil | si no hay direccion, queda stock-like |
| Imagen por capas | Cuando se quiere animacion con profundidad | fondo, objeto, luces, particulas, foreground separados | requiere mas assets |
| Framer/Spline/Rive/Lottie | Cuando la pieza necesita interaccion o motion de calidad visual | insertar/embed, ajustar triggers, hover, scroll, state machine | dependencia externa / peso |
| Vanta/tsParticles/shader | Fondo abstracto o atmosferico probado | colores, velocidad, densidad, formas, iconos o imagenes de particulas | generico si no se semantiza |
| Three.js custom | 3D unico, producto/objeto central, escena interactiva | modelar escena, luces, camara, materiales | caro en tiempo/performance |
| HTML/CSS sobrio | Editorial, data, estructura, layout, texto | tipografia, grid, overlay, secciones, responsive | no debe fingir imagen |

La decision creativa debe responder: "que medio comunica mejor la analogia con menos artificio?"

### 10. Animated Backgrounds Con Semantica

Un fondo animado puede venir de libreria si se customiza:

- `tsParticles`: soporta shapes como circle, square, polygon, image, emoji y text; permite convertir logos, iconos o figuras de conocimiento en particulas con movimiento y links.
- `Vanta.js`: fondos 3D listos sobre Three.js; usar cuando se necesita atmosfera moderna rapida y no hay objeto hero especifico.
- `Rive`: ideal para animaciones interactivas con state machines, especialmente explicaciones, iconos vivos, onboarding o productos educativos.
- `Spline`: ideal para objetos/escenas 3D tangibles, embeds y hero interactions.
- `Lottie`: ideal para loops vectoriales, iconos narrativos, microinteracciones y loaders con bajo esfuerzo.

Regla: una libreria se acepta solo si se vuelve especifica por tema, marca o iconografia. Particulas genericas sin semantica son decoracion.

## Matriz De Uso

| Necesidad | Herramienta/referencia | Decision |
|---|---|---|
| App React/Tailwind real | shadcn/ui, Radix/Base UI, Tailwind | Usar si el repo ya encaja |
| Landing/producto con motion | Magic UI, Aceternity, React Bits, Animate UI | Cherry-pick o reinterpretar |
| HTML autocontenido | CSS/JS propio + inspiracion externa | No instalar frameworks |
| Hero conceptual/premium | ImageGen + asset pipeline | Generar imagen primero, HTML compone |
| Fondo animado semantico | tsParticles/Vanta/Rive/Lottie/Spline | Customizar color, forma, iconos, velocidad, densidad |
| Layout orbital/radial | Framer Layout Composer, imagen generada, SVG/Three.js | Usar si la analogia lo pide |
| UI agentica/chat | Vercel AI Elements, assistant-ui, CopilotKit | Solo si hay AI real |
| Flujos UX reales | Mobbin, Page Flows | Buscar antes de diseñar |
| Inspiracion visual premium | Godly, Awwwards, Landingfolio, Refero | Extraer direccion de arte |
| QA visual | Playwright, screenshots, console, mobile | Obligatorio |
| Accesibilidad | WCAG 2.2, Apple HIG, axe/Lighthouse cuando aplique | Piso no negociable |

## Protocolo De Research Antes De UI

Usar cuando el usuario pida "mejorar diseño", "potenciar skill", "buscar referencias", "no se ve premium", "horrible", "fofo", "no smooth", o cuando el entregable sera presentado.

1. Clasificar superficie: landing, app operativa, dashboard, documentacion visual, AI UI, portfolio/experiencia.
2. Buscar 3-5 referencias vivas del mismo tipo o flujo.
3. Extraer patrones, no estilos sueltos:
   - estructura de primera pantalla;
   - densidad;
   - paleta/material;
   - motion;
   - estados;
   - responsividad;
   - microcopy;
   - accesibilidad evidente.
4. Elegir una direccion de arte propia.
5. Codificar.
6. Validar screenshot desktop/mobile + consola + accion principal.

## Anti-Patrones Detectados

- Purple gradient of doom: morado oscuro + glow + cards sin razon de marca.
- Generic SaaS soup: hero centrado + nav + card grid + badges.
- Fondo semantico falso: labels flotantes o particulas que repiten palabras del contenido.
- Motion demo reel: efectos lindos que no orientan ni explican.
- Component hoarding: meter muchas librerias porque existen.
- Screenshot blindness: cerrar sin mirar captura real.
- AI UI sin control humano: acciones generadas sin preview, confirmacion o undo.
- HTML pretending to be image: cajas, divs, canvas y cards intentando reemplazar un asset visual real.
- Libreria sin marca: Vanta/particles/shader bonito pero intercambiable con cualquier producto.

## Fuentes Revisadas

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- Apple Human Interface Guidelines: https://developer.apple.com/design/human-interface-guidelines
- Apple UI Design Dos and Don'ts: https://developer.apple.com/design/tips/
- web.dev INP/Core Web Vitals: https://web.dev/articles/optimize-inp
- MDN prefers-reduced-motion: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
- Motion useReducedMotion: https://motion.dev/docs/react-use-reduced-motion
- shadcn/ui: https://www.shadcn.io/ui
- Animate UI: https://animate-ui.com/docs
- React Bits: https://reactbits.dev/
- 21st.dev via shadcn awesome: https://www.shadcn.io/awesome/item/21st-dev
- Vercel AI Elements: https://vercel.com/changelog/introducing-ai-elements
- Mobbin MCP/API docs: https://docs.mobbin.com/
- Page Flows: https://pageflows.com/
- Godly: https://godly.website/
- Cursor ce-frontend-design: https://cursor.com/marketplace/skills/ce-frontend-design
- Codex frontend-design registry: https://skillregistry.dev/skills/design/frontend-design
- Frontend Design Review skill: https://claudskills.com/skills/frontend-design-review/
- Framer Academy Animations & Effects: https://framerapp.com/academy/topics/effects.html
- Framer component interactions: https://www.framer.com/academy/lessons/framer-animations-component-interactions
- Framer Design Bridge MCP: https://www.framer.com/marketplace/plugins/design-bridge-mcp/
- Framer MCP plugin: https://www.framer.com/marketplace/plugins/mcp
- Framer Layout Composer: https://www.framer.com/marketplace/plugins/layout-composer/
- Framer Design Workflow plugins: https://www.framer.com/marketplace/plugins/category/design-workflow/
- Framer Vanta Backgrounds component: https://www.framer.com/marketplace/components/vanta-backgrounds/
- Vanta.js: https://www.vantajs.com/
- tsParticles shape docs: https://particles.js.org/options/particles-shape
- Rive: https://rive.app/
- Rive State Machines: https://rive.app/docs/editor/state-machine/state-machine
- Spline: https://spline.design/
- Spline 3D Web Experiences: https://spline.design/solutions/3d-web-experiences
