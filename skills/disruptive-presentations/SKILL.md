---
name: disruptive-presentations
description: "Motor de generacion de slides disruptivas de alta calidad visual. Modo activo: FULL IMAGE con ChatGPT/GPT Image, para generar slides completas como imagen final con interpretacion semantica, decision de analogia, alternativas de diagramacion, prompt final, debug completo y, cuando aplica, insercion posterior de evidencia nativa real como graficos, tablas, logos o figuras de tesis. Modo legacy disponible: HTML + Imagen 4 + Canva export. Usar cuando el usuario quiera crear o mejorar slides individuales, una presentacion completa, una clase visual, una sustentacion academica, o depurar el razonamiento visual de una slide."
---

# Disruptive Presentations

Full legacy prompt templates and HTML shell -> [references/full-reference.md](references/full-reference.md)

Visual architecture and diagramming grammar -> [references/visual-architecture-diagramming.md](references/visual-architecture-diagramming.md)

Commercial disruptive slide patterns -> [references/commercial-disruptive-patterns.md](references/commercial-disruptive-patterns.md)

---

## DEFAULT MODE: PROMPT PRODUCTION

Disruptive produce prompts — no ejecuta la generación de imágenes por defecto.

Output estándar: un MD con todos los prompts numerados y listos para copiar y pegar en ChatGPT Image o GPT Image 2.

Disruptive NO llama a ChatGPT Image ni genera imágenes automáticamente a menos que el usuario lo solicite explícitamente con frases como:
- "genera la imagen"
- "córrelo tú"
- "produce la slide directamente"

Si el usuario no lo pide — solo produce el MD de prompts y se detiene ahí.

Use this mode unless the user explicitly asks for editable HTML layout, Imagen 4, Canva export, or legacy mode.

Current goal: generate each slide as one finished 16:9 image. Do not build HTML as the slide composition method in this phase. Do not manually place coordinates. The slide image must carry the concept through visual thesis, composition, metaphor, typography, spacing, and text integration.

Routing: `presentation-orchestrator` defines narrative, sequence, and handoff prompts; `disruptive-presentations` produces the final full-image slides and HTML player; `slides` is only for editable `.pptx` authoring/export after visual QA or when the user explicitly asks for PPTX/editability.

Clarification:
* Forbidden by default: using HTML/CSS as the slide design/composition engine.
* Required for decks: a global HTML presentation player that loads the generated PNG slides in order and lets the user present them full-screen.

Do not generate PPTX as the default output. PPTX, Canva export, or editable deck conversion is a later export phase after image generation and QA.

### Vertical Contract

This skill is the production layer, not the narrative architect and not the editable-PPTX exporter.

Inputs expected from `presentation-orchestrator`:

- slide id;
- communication mode: class/training, keynote/vision, commercial/sales, technical/implementation, mixed;
- commercial/teaching slide type: data, trend, problem, explanation, case, demo, evidence, architecture, comparison, agenda/separator, CTA;
- narrative role;
- slide thesis;
- message to install;
- presenter phrase;
- audience shift;
- exact visible text;
- value payload: data, trend, insight, evidence, case, comparison, objection resolved, decision frame, business benefit or CTA;
- data/source requirement;
- suggested visual mode;
- native evidence/assets required;
- required user action before production: attach logo, screenshot, video, template, chart, real UI or internal data;
- brand constraints;
- internal notes that must not be rendered.

If the input arrives without that structure, build the missing teaching payload before generating. If the missing item is factual evidence, logo, chart, table, screenshot, thesis figure, or brand asset, stop and ask or mark it as pending instead of hallucinating it.

Output contract:

- versioned image folder per production pass;
- `manifest.md` or `manifest.json` with slide id, prompt summary, accepted PNG path, QA status and evidence assets used;
- HTML presentation player as the primary review/presentation artifact;
- optional PPTX only after QA or explicit user request through `slides`.

### Prompt-First Mode

If the user asks for prompts, prompt final, "pasame el prompt", "mejorame esta slide", "yo genero la imagen", or similar, do not generate images. Produce the final image-generation prompt only.

Generate images only when the user explicitly asks to generate/create/render the slide images or deck images.

When producing a prompt-only answer:

1. First state any user action needed outside the prompt:
   - attach real logos;
   - attach template/reference slide;
   - attach screenshots/video/product capture;
   - provide validated source/data;
   - replace logos manually after generation if exact fidelity matters.
2. Then provide the final prompt.
3. The final prompt must explicitly say: `Generate one final 16:9 slide image`.
4. Do not put instructions to the user inside the prompt unless they are part of production.
5. If exact logos/charts/screenshots are required and not attached, instruct the model to reserve clean placeholders instead of inventing them.

### Communication Mode Dosing

Disruption is not constant. Dose it by communication mode:

| Mode | Analogy | Disruption | Evidence | Diagramming | Best visual energy |
| --- | --- | --- | --- | --- | --- |
| Class / training | medium-high | medium-high | medium | medium | memorable analogies, explanatory diagrams, examples |
| Keynote / vision | medium-high | medium | medium | medium | controlled full-scene moments, trends, visual thesis |
| Commercial / sales | very low | low | very high | high | data, real assets, product proof, clean comparisons |
| Technical / implementation | low | low-medium | high | very high | architecture, process, matrices, dependencies |
| Mixed | declared per slide | declared per slide | declared per slide | declared per slide | adapt by block |

Commercial mode rule:

```text
Do not sell illusion. Sell demonstrable reality.
```

For commercial decks, disruption should come from hierarchy, contrast, data, proof, real screenshots, clean charts, product evidence, and precise diagramming. Avoid strong visual metaphors unless explicitly requested or approved as a controlled exception.

### Commercial Prompt Grammar

For commercial prompt-only work, prefer these slide families:

- `commercial data slide`: title, chart/data, source, business implication;
- `three-card argument`: three proof cards with data/image/title/subtitle;
- `commercial comparison`: two sides, clear contrast, final business takeaway;
- `product evidence slide`: real product screenshot/video/mockup as protagonist;
- `evidence video slide`: video/capture fullscreen or dominant, minimal text;
- `portfolio collage`: real project images arranged as proof wall;
- `agenda/separator`: large section titles to split attention and narrative;
- `external signal`: official-looking Big Tech/regulation/trend signal plus interpretation;
- `split-panel modular workflow`: product promise on one side, process cards on the other;
- `architecture/process`: flow, layers, matrix or dashboard-style system map.

Do not over-apply one family. A commercial deck needs rhythm: agenda, data, comparison, evidence, product, process, case and CTA should alternate.

### Criterio Premium vs Genérico en Elementos Visuales Técnicos (CRÍTICO)

**Regla fundamental de modo por visual:**

| Modo | Rol del visual | Estilo |
|---|---|---|
| Disruptivo/keynote | El visual ES el mensaje — protagonista | 3D cinematográfico, glow, profundidad dramática, esferas de cristal, renders premium |
| Comercial/suave | El visual APOYA al texto — secundario | Line-art minimalista, ilustración técnica fina, sin relleno, sin glow, elegante y contenido |

**En modo comercial NUNCA usar:**
- Renders 3D dramáticos con glow y esferas de cristal
- Visualizaciones cinematográficas tipo NVIDIA/DeepMind
- Cualquier elemento visual que compita con el texto en protagonismo

**En modo comercial SÍ usar:**
- Line-art técnico: trazos finos (1-2px), sin relleno o relleno muy sutil, monocromático en el color de acento
- Ilustraciones estilo Apple technical docs o McKinsey report diagrams
- Íconos de trazo fino (stroke icons, no filled)
- Diagramas esquemáticos limpios — precisos, no decorativos
- El visual ocupa su zona y no sangra dramáticamente — está contenido

**Regla crítica — imagen que acompaña vs imagen que comunica:**

Esta distinción define el tratamiento visual de toda foto en modo comercial:

| Rol de la imagen | Función | Tratamiento |
|---|---|---|
| **Acompaña** — da estilo, atmósfera, elegancia | No dice nada específico — es ambiente | Desvanecida, ghosted, wireframe, opacity 15-25%, fade hacia el texto, integrada al fondo |
| **Comunica** — demuestra algo, es argumento | Dice algo específico — es evidencia | Foto real con presencia, B&N pero opacidad completa, bleeding al borde, peso visual real |

### Criterio de analogías en modo comercial (CRÍTICO)

En presentaciones comerciales las analogías tienen reglas estrictas — completamente distintas al modo disruptivo/keynote:

**Dónde va la analogía en comercial:**
- En el **elemento visual de fondo** — ghosted, wireframe, casi invisible
- En **2-3 palabras sueltas** dentro del texto — nunca como título, nunca como párrafo
- Nunca como concepto principal — el texto principal siempre es ejecutivo y directo

**Dónde NO va en comercial:**
- En el título — un gerente no puede presentar "Tienes los ingredientes pero no el plato" a otros gerentes
- En frases de cierre largas — generan confusión técnica o conceptual
- Como elemento visual protagonista — la analogía es fondo, no frente

**Niveles de disrupción y analogía por modo:**

| Modo | Analogía | Visual | Texto |
|---|---|---|---|
| Keynote/disruptivo fuerte | Protagonista — título, hero visual | Cinematográfico, 3D, glow | Metafórico, emocional |
| Comercial con disrupción suave | Fondo ghosted wireframe + 2-3 palabras sutiles | Wireframe blueprint, ghosted | Ejecutivo directo |
| Comercial puro | Sin analogía | Diagrama limpio, cards | 100% ejecutivo |

### Criterio CRÍTICO — Prohibido efectos de IA visibles

Glows, trails luminosos, halos eléctricos, partículas brillantes, rayos de luz digital, efectos neón y cualquier elemento que "brille eléctricamente" son indicadores inmediatos de imagen generada por IA. Destruyen la credibilidad visual de la slide.

**NUNCA usar:**
- Glows o halos alrededor de objetos o texto
- Trails luminosos (flechas o líneas con brillo)
- Partículas brillantes flotando
- Efectos neón o eléctricos de cualquier tipo
- Luces digitales artificiales

**SÍ usar para profundidad y dramatismo:**
- Luz natural direccional — luz de ventana, luz de faro, luz de luna
- Sombras suaves y realistas con offset diagonal
- Contraste entre zonas iluminadas y zonas oscuras — cinematográfico
- Bokeh o desenfoque de fondo — fotográfico, no digital
- Materiales con textura real — madera, piedra, agua, metal

**La premium viene de composición y luz natural — no de efectos digitales.**

### Criterio — Coherencia entre estilo visual y analogía

El estilo visual debe ser coherente con el concepto de la analogía. No aplicar dark/neón por default.

| Tipo de analogía | Estilo correcto |
|---|---|
| Cotidiana, editorial, de negocios (faro, mapa, brecha) | Ilustración premium limpia, fondo light, sin efectos |
| Naturaleza, arquitectura, ingeniería | Ilustración editorial con textura y materialidad |
| Tecnología, futuro, sci-fi, espacio | Ahí sí: dark, dramático, efectos controlados |
| Datos, métricas, procesos | Diagrama limpio comercial, sin analogía visual |

Regla: el estilo sirve al concepto — no al revés. Nunca aplicar dark/neón solo porque "se ve impactante".

"Flat vector" e "icon style" producen ilustraciones de aspecto infantil o de app. Para slides premium el estilo correcto es ilustración editorial con profundidad y materialidad.

**NUNCA usar en prompts de ilustración:**
- "flat vector illustration"
- "simple shapes"
- "icon style scaled up"
- "cartoon style"
- "flat design"
- "2D flat"

**SÍ usar para ilustración premium:**
- "detailed editorial illustration with subtle depth"
- "paper texture on sticky notes, slight shadows suggesting physical weight"
- "architectural line weight variation on structures"
- "realistic material feel without photorealism"
- "Behance premium editorial illustration style"
- "sophisticated minimal — not flat, not cartoon, not childish"
- "illustration with depth achieved through shadow and texture, not color fills"

**La diferencia en práctica:**
- ❌ Flat: formas sólidas de color, sin sombra, sin textura — parece app infantil
- ✅ Premium: mismas formas pero con sombra sutil, variación de línea, textura de material — parece diseño editorial de calidad
- **No foto real** — demasiado peso visual
- **No ilustración cartoon** — no profesional
- **Wireframe de trazo** — líneas delgadas (1-1.5px), sin relleno, sin sombra, estilo blueprint técnico o sketch de arquitecto
- Líneas ligeramente irregulares — sugieren naturalidad sin perder precisión
- Opacity 12-18% — visible y notable pero no dominante
- Fade upward — desaparece hacia la zona del texto
- El vacío/brecha en la ilustración debe alinearse con el elemento visual que representa esa misma brecha en el contenido

**Instrucción de prompt para wireframe analógico:**
```
Background analogy rendered in pure wireframe/blueprint 
line style — lines only, no fill, no shading, no gradients.
Stroke weight 1-1.5px, dark navy at 15% opacity.
Lines slightly irregular — suggests natural form through 
line variation, not geometric perfection.
Hand-drawn blueprint feel — like an architect's technical 
sketch, not a cartoon, not a photo.
Fades upward — fully transparent by middle of slide.
The void/gap in the illustration aligns with the 
content gap element (dashed line, card gap, etc.)
```

### Criterio de hooks emocionales en slides comerciales (CRÍTICO)

El título o cierre de una slide comercial debe generar una emoción específica — no solo informar. El hook funciona cuando el gerente piensa *"eso me pasa a mí."*

**Estructura de hook efectivo:**
- Nombra el dolor real del gerente en lenguaje cotidiano
- Sin jerga técnica
- Máximo 10 palabras
- La segunda parte llega en electric blue o bold — es el punch
- Genera incomodidad productiva: el gerente se reconoce y quiere resolver

**Test de hook:** ¿Un gerente que ve esto piensa "eso me pasa a mí"? Si sí — funciona. Si no — reescribir.

**Ejemplos verificados en sesión:**
- ❌ "La brecha no está en los datos. Está en la inteligencia que los conecta." — no tiene sentido técnico ni ejecutivo
- ❌ "Tienes los ingredientes pero no el plato." — válido para keynote, inapropiado para comercial
- ✅ "Tener datos no sirve de nada si no puedes usarlos." — directo, el gerente se reconoce, genera incomodidad productiva

### Regla CRÍTICA — Protocolo de Reconstrucción Visual Verificada

Cuando una slide incluye interfaces reales, herramientas, flujos, productos, logos o elementos visuales que existen en el mundo real, disruptive NO debe inventarlos desde memoria o imaginación.

**Bloque obligatorio AL INICIO de cualquier prompt con contenido real:**

```
MODO RECONSTRUCCIÓN VISUAL VERIFICADA

La fidelidad visual es más importante que la creatividad.

FASE 1 — INVESTIGACIÓN OBLIGATORIA
Antes de generar la imagen:
- Busca referencias visuales actuales y oficiales en la web.
- Prioriza: 1. Sitio oficial  2. Documentación oficial  
  3. Capturas oficiales  4. Material de prensa oficial
- Analiza visualmente: colores, proporciones, iconografía, 
  tipografía, espaciado, bordes, sombras, conectores, 
  jerarquía visual y layout.
- Extrae únicamente elementos verificables visualmente.
NO uses conocimiento previo. NO uses memoria.
NO completes elementos faltantes mediante inferencia.

FASE 2 — AUDITORÍA DE REFERENCIAS
Antes de renderizar, indica internamente:
- Qué elementos fueron verificados.
- Qué elementos no pudieron verificarse.
- Qué partes poseen evidencia visual directa.
Si un elemento no puede verificarse: 
mantén representación neutra, no inventes detalles.

FASE 3 — RECONSTRUCCIÓN
Genera una reconstrucción visual basada en referencias.
Objetivo: parecer una captura real — no arte conceptual, 
no una reinterpretación.
Prioridades: 1. Fidelidad visual  2. Exactitud estructural  
3. Consistencia con referencia  4. Estética
La creatividad tiene prioridad mínima.

REGLA CRÍTICA
La generación será considerada incorrecta si:
- Algún componente fue reconstruido desde memoria.
- Se inventan iconos, colores, nodos, estilos de conexión o layouts.

Actúa como: "Un diseñador UI que debe replicar una captura 
existente con máxima fidelidad."
No actúes como: "Un ilustrador que debe imaginar cómo se ve."
```

**Cuándo activar — cualquier mención de:**
n8n, Make, Notion, Slack, HubSpot, Salesforce, Jira, Monday,
Revit, Civil 3D, ETABS, SAP2000, ACC, Navisworks,
o cualquier interfaz, dashboard, nodo o marca con apariencia oficial documentada.

Todo texto visible en una slide debe sonar como algo que una persona real diría en una conversación. Si suena a eslogan, jerga de consultor o pitch forzado — reescribir.

**Patrones que suenan mal — evitar siempre:**
- Estructura "No es X, es Y" — suena construido y artificial
- "Adoptar IA", "implementar la solución" — jerga técnica que nadie usa en conversación real
- "La mayoría ya X. La minoría Y." — estructura cortada, suena rara
- Preguntas retóricas que empujan acción: "¿Dónde estás tú?" — demasiado directo, se siente venta agresiva
- Frases de dos palabras separadas por punto: "El mercado decidió. Tú también." — telegráfico y forzado

**Tono de cierre por fase de la presentación:**

Fase 1 — diagnóstico/conciencia (slides de datos, contexto del sector):
- Frase de síntesis interpretativa — lo que significan los datos juntos
- Tono de reporte de consultoría, no de pitch
- El gerente lee y piensa solo — no se le fuerza ninguna conclusión
- Test: ¿podría aparecer en un reporte de McKinsey o Gartner? Si sí — correcto

Fase 2 — solución/cierre (slides de producto, propuesta, CTA):
- Frases más directas, orientadas a acción
- CTAs naturales, no agresivos ni eslogan

**Ejemplos verificados en sesión:**
- ❌ "La pregunta no es si adoptar IA. Es cuánto te está costando no haberlo hecho ya." — venta agresiva disfrazada de pregunta
- ❌ "El mercado ya decidió. La pregunta es dónde estás tú." — eslogan de pitch, muy forzado
- ❌ "La mayoría ya la tiene. La minoría la sabe usar." — suena raro, nadie habla así
- ✅ "El sector está comenzando a moverse hacia la IA, pero la mayoría aún está en etapas tempranas." — síntesis informativa, tono de consultor
- ✅ "Los números muestran un sector en movimiento, con una brecha entre adopción e implementación real." — correcto para fase 1

**Imagen que acompaña — instrucción de prompt:**
```
The image accompanies — it provides atmosphere and elegance, 
not argument. Treatment: fully desaturated, opacity 18-22%, 
positioned right/center, fades with a soft gradient toward 
the left where the text lives. Fully transparent by 35% 
from left edge. No frame, no container — integrated into 
the background. The text is the protagonist. The image is 
the environment.
```

**Imagen que comunica — instrucción de prompt:**
```
The image communicates — it is evidence or demonstration. 
Treatment: fully desaturated (B&W) but full opacity, 
bleeds to the right and bottom edges, no fade. 
A solid electric blue rectangle (50-60px wide) at the 
inner edge acts as color bridge. The image has weight 
and presence — it shares protagonist status with the text.
```

```
Commercial visual pattern (premium):
- Real photograph relevant to the topic — not animated, 
  not simplified, not illustrated
- Fully desaturated (black and white, no color) — 
  so it does not compete with the brand color system
- Bleeds to the right and/or bottom edge — not framed 
  or contained in a box
- A solid brand color rectangle (electric blue, 60-80px wide, 
  full height or partial) sits at the inner edge of the photo — 
  acts as a color bridge between the B&W photo and the 
  white content zone
- No glow, no dramatic shadows, no effects — 
  just the photo with desaturation treatment
- The photo is real and architectural/technical in nature — 
  structural steel, server racks, data centers, circuit boards, 
  industrial machinery — whatever is relevant to the topic

For AI topic specifically, ideal photo subjects:
server racks in a data center, GPU hardware close-up, 
fiber optic cables, circuit board detail, 
research lab equipment — real, physical, technical.
```

Ejemplos concretos:

| Elemento | Versión colegio ❌ | Versión premium ✅ |
|---|---|---|
| Red neuronal | Círculos 2D conectados por líneas planas | Esferas 3D con luz propia, conexiones con gradiente y glow, profundidad de capas |
| Flujo de datos | Flechas y cajas rectangulares | Partículas en movimiento, streams de luz, nodos que emiten energía |
| Arquitectura cloud | Rectángulos apilados con iconos | Bloques con sombra volumétrica, perspectiva isométrica, iluminación ambiental |
| Cerebro/IA | Silueta de cerebro con circuitos | Estructura orgánica con luz azul interna, textura translúcida, profundidad |
| Grafo de nodos | Puntos y líneas grises planas | Nodos como esferas con specular highlight, conexiones como hilos de luz |

**Instrucción para prompts de ChatGPT Image cuando se pide un elemento técnico:**

Nunca describir como diagrama 2D. Siempre pedir:
```
Render this as a premium 3D visualization, not a flat diagram.
Nodes/elements must have: specular highlights (light reflection at top-left), 
soft drop shadows below, ambient glow in the accent color, 
and visible depth separation between layers (Z-depth).
The overall feel should match the quality of NVIDIA, DeepMind or Apple 
product visualization — not a textbook illustration.
```

**Para redes neuronales específicamente:**
```
Neural network rendered as a 3D visualization: 
- Nodes are translucent glass spheres with electric blue light inside, 
  specular highlight at top-left, soft glow radiating outward
- Connection lines are thin luminous threads (gradient from blue to invisible) 
  not solid lines
- Layers have visible Z-depth — input layer furthest back, output layer forward
- Background receives ambient blue light from the nodes
- Overall: cinematic, premium, like a DeepMind or NVIDIA product visual
```

Estos criterios aplican a slides en modo comercial/suave. Son reglas de cómo se estructura y dibuja bien — no de color ni branding.

**Cards — la unidad base:**
- Border-radius 12-16px en todas las cards — consistente en toda la slide
- Borde 1px: gris claro (#E5E7EB) en slides light, blanco 10% opacity en slides dark
- Drop shadow muy suave: blur 8-12px, opacity 8-12% — casi imperceptible pero da flotación
- Padding interno generoso — el contenido no toca los bordes de la card
- Una card = una idea. Nunca lista de 5+ items dentro de una card
- La card más importante recibe borde de acento (1px del color de marca) — no las demás

**Jerarquía dentro de la slide:**
- Micro-label primero: pequeño, letter-spaced, color de acento — establece el contexto
- Título: grande, bold, oscuro — la afirmación principal
- Descripción bajo título: regular, gris, 1-2 líneas — complementa sin repetir
- Cards/diagrama: el argumento visual — ocupa 60-70% de la slide
- Nunca todo al mismo peso tipográfico — la jerarquía es el diseño

**Diagramas de flujo con nodos reales — criterios adicionales:**

- **Sin fondo de canvas oscuro en slides comerciales** — los nodos flotan directamente sobre el fondo blanco de la slide. El fondo oscuro del canvas hace ruido visual y compite con el diseño. Reservar el canvas oscuro solo para slides de clase técnica o keynote donde se quiere replicar la interfaz real.

- **Nodo hero con callout explicativo** — cuando el objetivo de la slide es explicar un nodo específico, ese nodo debe: ser visualmente más grande que los demás (1.5x-2x), tener un borde de acento más prominente, y tener un callout — una línea o flecha que apunta a una descripción lateral o inferior que explica qué hace ese nodo. El callout es el argumento; el nodo es el objeto.
- Las flechas/conectores son finas y grises — no protagonizan, solo conectan
- Cada nodo tiene: ícono o logo (si aplica) + nombre bold + descripción tiny
- Los nodos de herramientas externas usan su logo real o un placeholder geométrico representativo
- Flujo horizontal para procesos lineales, radial para relaciones de dependencia

**Fases/roadmap horizontal:**
- Número de fase en círculo de color sólido (acento) encima de cada card
- Cards conectadas por flecha delgada gris entre ellas
- Duración en badge pequeño gris dentro de la card
- Precio o resultado en bold grande al final de cada card — el número domina

**Niveles/jerarquía de datos:**
- Badges de color diferenciado por nivel o categoría — el color comunica la categoría, no la decoración
- Cada badge: texto corto, peso bold, color de fondo que se lee de un vistazo
- Los niveles de mayor riesgo o urgencia reciben colores cálidos (amber, rojo) — los neutros van en azul/gris

**Diagramas concéntricos (capas/seguridad):**
- Rectángulos o círculos anidados, cada capa con borde de su propio color
- La capa más interna (lo más protegido o importante) tiene fondo sólido de acento
- Labels de cada capa en la esquina superior del rectángulo — no centrados
- Flechas externas a la derecha apuntando a cards de explicación

**Splits asimétricos (foto + texto):**
- Foto o visual técnico ocupa 40-50% del ancho, bleeding al borde — no en un cuadro flotante
- La foto va en B&N desaturada para no competir con el sistema de color
- Bloque de color sólido del acento en esquina de la foto — acento geométrico que conecta foto con sistema
- El texto respira en el lado opuesto — no hay elementos decorativos adicionales

### Sistema de composición modular — principios recombinables (CRÍTICO)

Lo que importa no es replicar un layout exacto sino entender los **principios de composición** que lo hacen funcionar. Estos principios se pueden recombinar en infinitas variaciones — cada combinación genera una diagramación distinta con la misma esencia de calidad.

**Los 6 principios modulares:**

**1. Zona de color lateral**
- Puede ser izquierda o derecha, 35-50% de ancho
- Fondo sólido del color de marca
- Genera contraste inmediato con zona blanca opuesta
- Variaciones: header color (franja superior), footer color, banda diagonal

**2. Foto/imagen de contexto como overlay**
- Va dentro de la zona de color, detrás del texto
- Opacity 20-30% — atmósfera, nunca contenido
- Desaturada o con tinte del color de la zona
- Reemplazable por imagen real sin romper el diseño

**3. Stats en footer de zona**
- Números grandes (Black 20-24px) + etiqueta pequeña (Regular 10px)
- Pueden ir en zona color o zona blanca
- Separados por línea thin o simplemente por espacio
- Mismo color en todos los stats — no semáforo

**4. Grid de features**
- 2x2 es el más común pero puede ser 1x3, 2x3, etc.
- Separadores de línea thin entre features — NO cards con bordes
- Ícono outline pequeño + nombre bold + descripción concisa 1-2 líneas
- Zona blanca siempre

**5. Elemento hero sangrando por esquina**
- Sutil — máximo 30% del ancho de su zona
- Siempre en esquina — superior derecha, inferior derecha, superior izquierda
- Opacity 85-90% — ligeramente suavizado
- Nunca tapa contenido — retrocede si hay texto cerca
- Es un acento, no un protagonista

**6. Pills de categorías en footer**
- Outline style — borde del color de texto, fondo transparente
- 2-4 pills máximo
- Resumen de tecnologías, categorías o servicios

**Combinaciones posibles:**

```
Variación A (original):
[ZONA COLOR IZQ] | [FEATURES GRID + HERO ESQUINA SUP DER]
[STATS FOOTER IZQ] | [PILLS FOOTER DER]

Variación B:
[HERO ESQUINA SUP IZQ + FEATURES GRID] | [ZONA COLOR DER]
[PILLS FOOTER IZQ] | [STATS FOOTER DER]

Variación C:
[ZONA COLOR HEADER TOP — full width]
[FEATURES GRID IZQ] | [STATS + HERO ESQUINA INF DER]

Variación D:
[ZONA COLOR IZQ angosta 30%] | [ZONA BLANCA CENTRAL] | [HERO esquina]
```

La clave: **nunca replicar la misma variación en slides consecutivas** — rotar los principios para que cada slide tenga personalidad propia.

### Patrón — Contenido en ventana flotante sobre fondo inmersivo

Layout de alto impacto para slides de apertura, transición o presentación de concepto. La imagen comunica el contexto, el card contiene el argumento.

**Estructura:**
```
┌─────────────────────────────────────────────────────┐
│ [NAV HORIZONTAL TOP — tabs de sección]              │
│                                                     │
│  [IMAGEN FULL-BLEED — ocupa 100% del fondo]        │
│                                                     │
│         ┌──────────────────────────┐                │
│         │ [LOGO(S)]               │                │
│         │ Título grande           │                │
│         │ 2x2 checkmarks          │                │
│         │ FRASE DE TRANSICIÓN     │                │
│         └──────────────────────────┘                │
│                                                     │
│[BANDA LATERAL IZQ — título sección rotado + logo]  │
└─────────────────────────────────────────────────────┘
```

**Reglas del patrón:**

Imagen full-bleed:
- Ocupa 100% de la slide — no tiene zona, no tiene frame
- Foto real o render de alta calidad del contexto
- Puede ser oscura/dramática porque el card blanco genera el contraste

Card flotante central (glassmorphism):
- Fondo blanco 85-92% opacity — semi-transparente
- Border-radius 16-20px — generoso
- Drop shadow suave (blur 30px, opacity 20%) — flota visiblemente
- Ocupa 55-65% del ancho de la slide, centrado
- Contiene: logos, título, features, frase de cierre
- Todo el contenido vive aquí — nada fuera del card

Navegación horizontal top:
- Tabs de secciones del deck — el usuario sabe dónde está
- Tab activo: color de acento bold
- Tabs inactivos: gris suave, Regular
- Fondo de la barra nav: dark navy semitransparente o color de marca
- Solo aplica en decks con múltiples secciones definidas

Banda lateral vertical de identidad:
- Franja angosta (30-40px) en borde izquierdo o derecho
- Color de acento sólido
- Título de sección rotado 90° — white, small, letter-spaced
- Logo en esquina inferior de la banda
- Da profundidad y marca sin ocupar espacio horizontal

Frase de transición en footer del card:
- Formato: "DE [ESTADO ACTUAL] → [ESTADO DESEADO]"
- Caps, Bold, dark navy, centrado dentro del card
- Thin separator line arriba
- No es CTA — es postura/síntesis del argumento

Cuándo usar este patrón:
- Slides de apertura de sección
- Presentación de concepto o producto con contexto visual fuerte
- Slides donde la imagen comunica más que cualquier diagrama

### Patrón — Gráfico de datos con jerarquía visual y síntesis interpretativa

Layout limpio para slides de datos cuantitativos. El gráfico habla solo — la síntesis en footer confirma lo que el ojo ya vio.

**Principios de este patrón:**

**Color como jerarquía, no decoración:**
- Segmento/barra/elemento hero: color más oscuro o más saturado — el dato más importante
- Elementos secundarios: escala de grises descendente según importancia
- Acento de color (verde, azul) solo para 1 elemento que merece atención especial
- Nunca colores aleatorios — cada color tiene una razón

**Gráfico de torta/donut con jerarquía:**
- El segmento más importante visualmente más oscuro Y físicamente separado del resto (slight offset)
- Labels externos con líneas de callout finas (0.5px, gris)
- Badge/tooltip flotante para el dato secundario más relevante
- Donut hole central vacío o con dato total

**Gráfico de barras con jerarquía:**
- Barra hero: color de acento sólido
- Barras secundarias: gris en escala descendente
- Labels de valor encima de cada barra, no dentro
- Eje Y limpio — sin líneas de grid pesadas, solo guías sutiles

**Fondo y contenedor:**
- Fondo blanco puro — sin card, sin sombra, sin marco
- El gráfico respira — padding generoso alrededor
- Título del gráfico: dark navy Regular 14px, arriba izquierda
- Badge de categoría: outline pill arriba derecha (ej: "MIXTO", "LATAM", "2025")

**Footer de síntesis interpretativa (OBLIGATORIO):**
- Línea thin gray separadora
- Frase de síntesis: lo que significan los datos juntos — tono consultor, no vendedor
- "**Fuente:**" en bold + nombre de fuente en regular — mismo párrafo
- Nunca más de 2 líneas
- Nunca frase de venta — solo interpretación informativa

Layout de alta efectividad para slides de presentación de producto o servicio con métricas:

**Estructura:**

```
┌─────────────────────┬──────────────────────────────┐
│                     │   TÍTULO GRANDE               │
│  ZONA COLOR         │   Subtítulo                   │
│  (40% ancho)        ├──────────────────────────────┤
│                     │   [2x2 grid de features]      │
│  Logo(s)            │   Feature 1  │  Feature 2     │
│  Título hero        │   Feature 3  │  Feature 4     │
│  Subtítulo          ├──────────────────────────────┤
│                     │   [Pills de categorías]       │
├─────────────────────┘                               │
│  Stats footer:                    [PRODUCTO HERO]   │
│  N1 · N2 · N3                     bleeding derecha  │
└─────────────────────────────────────────────────────┘
```

**Reglas del patrón:**

Zona color (izquierda):
- Fondo sólido del color de marca — azul eléctrico, navy, o acento principal
- Foto real de proyecto/contexto como overlay a 30-40% opacity detrás del texto
- Logo(s) en la parte superior
- Título grande en blanco bold — ocupa la mayor parte de la zona
- Stats en el footer de esta zona: números grandes bold con etiqueta small debajo
- Los stats pueden tener colores distintos para diferenciar — pero dentro de un sistema máximo 2-3 colores

Zona blanca (derecha):
- Fondo blanco puro
- Título principal en dark navy bold — grande
- Subtítulo o tagline debajo
- Grid de 2x2 features: cada feature con nombre bold y descripción concisa 1-2 líneas máximo
- Separadores de línea entre features — thin gray, no cards con bordes
- Pills de categorías en el footer — outline style, small

Producto hero:
- Objeto real (cámara, dispositivo, producto físico) renderizado o fotografiado
- Posicionado en la zona derecha, sangrando por el borde derecho y/o superior
- Sin fondo, sin sombra dura — producto limpio sobre blanco
- Puede haber dos elementos del producto si se complementan (cámara + panel)
- El producto no compite con el texto — se posiciona en zona de aire

Cuándo usar este patrón:
- Presentación de producto o servicio con características
- Landing page de propuesta comercial
- Slide de "qué ofrecemos" o "nuestro servicio"

**Criterio de tamaño del hero element sangrando (CRÍTICO):**
El producto o elemento hero que sangra por el borde debe ser sutil — un acento visual que enriquece la composición, no un protagonista que compite con el contenido. 

Reglas:
- Ocupa máximo 30-35% del ancho de la zona derecha
- Posicionado en esquina superior derecha — no centrado
- Opacity 85-90% — ligeramente suavizado, no a plena potencia
- Si hay texto cerca, el hero element retrocede — nunca tapa contenido
- La sensación debe ser: "hay algo ahí que enriquece" no "mira esto"

**Watermark tipográfico:**
- Palabra clave de la marca o sección en tipografía muy grande, gris muy claro (5-8% opacity), centrada en el fondo
- No compite con el contenido — es textura y profundidad

**Regla de economía visual en comercial:**
- Si se puede quitar un elemento sin perder significado, se quita
- Cada elemento debe justificar su presencia: informa, jerarquiza o conecta
- Decoración sin función = ruido — eliminarlo siempre

### Traducción De Criterios A Lenguaje De Prompt (ChatGPT Image)

Los criterios anteriores son abstractos. Aquí están traducidos al lenguaje exacto que produce resultados en ChatGPT Image / GPT Image 2:

**Cards:**
```
White rounded cards (border-radius 14px) with 1px light gray border (#E5E7EB) 
and very subtle drop shadow (blur 10px, offset 4px down-right, opacity 8%). 
Cards float slightly above the background. Internal padding is generous — 
content never touches card edges. Each card contains exactly one concept.
The most important card has a 1px electric blue border instead of gray.
```

**Jerarquía tipográfica:**
```
Typography system: 
- Micro-label: 11px, Space Grotesk Medium, electric blue (#1A5CFF), 
  letter-spacing 2px, all caps — appears first, sets context
- Title: 36-42px, Space Grotesk Bold, dark navy (#0A1628) — main claim
- Description: 14px, Space Grotesk Regular, medium gray (#6B7280) — 
  one or two lines maximum
- Card headers: 16px, Space Grotesk Bold, dark navy or electric blue
- Card body: 12px, Space Grotesk Regular, gray — always concise
Never use the same weight for two consecutive hierarchy levels.
```

**Diagramas de flujo:**
```
Flow diagram: nodes as dark navy rounded squares (border-radius 10px) 
with white icon centered inside. The central/most important node is 
20-30% larger than the others and has a darker background (#0A1628 vs #1A2540). 
Connector lines are thin (1px), light gray (#D1D5DB), with small arrowheads. 
Each node has a label below in 11px Regular gray. No decorative elements on 
connectors — just the line and arrow.
```

**Fases horizontales:**
```
Phase roadmap: 4-5 white cards side by side, connected by thin gray arrows.
Above each card, a solid circle (28px diameter, electric blue #1A5CFF) 
with the phase number in white bold. Inside each card: phase name in bold,
duration as a small gray pill badge, description in 12px regular, 
result in bold at bottom. The price or key metric appears as the largest 
text element inside the card.
```

**Split asimétrico foto+texto:**
```
Left 45%: architectural or technical photograph, fully desaturated (black 
and white), bleeding to the left and bottom edges — no frame or border. 
A solid electric blue rectangle (60px wide, full card height) sits at the 
right edge of the photo, acting as a color bridge to the white zone.
Right 55%: clean white background, text left-aligned, generous top margin.
No decorative elements in the text zone — just hierarchy.
```

**Watermark tipográfico:**
```
Background watermark: the word "IA" or the brand key term rendered in 
a very large sans-serif (400-500px), dark navy at 5% opacity, centered 
in the background. It is texture, not content — visible only on close 
inspection.
```

**Armonía de color en modo comercial GEN+:**
```
Color system (strict):
- Background: #FFFFFF (light slides) or #0A1628 (dark slides)
- Primary accent: electric blue #1A5CFF — micro-labels, borders of 
  hero card, numbered circles, CTA elements
- Text primary: dark navy #0A1628 (on light) or white #FFFFFF (on dark)
- Text secondary: medium gray #6B7280
- Warning/urgency accent: amber #F59E0B — only for risk or legal items
- Never use more than 3 active colors in one slide
- No gradients on text — only on background zones if needed
```

### Logos And Native Evidence

Real logos are allowed and often useful in commercial slides when they add recognition, ecosystem context, integration proof or market credibility.

Rules:

- use real logos only if attached/provided or if exact fidelity is inserted natively later;
- do not recolor real logos into the brand palette unless the user explicitly asks;
- do not invent official logos;
- if logos are not attached, reserve placeholders or use text labels;
- charts, tables, screenshots, official announcement images and product UI should be native assets when fidelity matters.

If using a generated prompt for ChatGPT/GPT Image and the user will generate manually, warn outside the prompt:

```text
Attach the real logos/screenshots if you need exact fidelity; otherwise generate with placeholders and replace later.
```

External deck frameworks:

- `reveal.js` and `Marp` are acceptable only when the user asks for Markdown/HTML technical decks or text-first export workflows.
- They are not the default route for ESC-AI disruptive full-image slides.
- If used, document that most Markdown-to-PPTX routes may produce less editable PowerPoint output than a native `slides`/PptxGenJS build.

### Sequential Production + Internal QA

When generating a deck after an approved Orchestrator plan, do not ask the user to approve every slide one by one unless they explicitly request that level of review.

Default behavior:

1. Generate slides sequentially and visibly in chat.
2. After each generated slide, run an internal QA pass yourself.
3. Save/copy the accepted slide into the ordered output folder.
4. Update the HTML player/review artifact immediately.
5. Continue to the next slide without waiting for user validation.

The user can interrupt at any time if they see a problem. Progress updates are for visibility, not mandatory approval gates.

Internal QA means the assistant checks:

- whether the slide teaches the intended message;
- whether the visual metaphor or diagram is understandable;
- whether the template was respected or intentionally broken as planned;
- whether unexpected slide numbers, random labels, fake UI noise, or text artifacts appeared;
- whether generated text is readable and in the expected language;
- whether the slide is too cluttered, generic, or decorative;
- whether brand signals and visual hierarchy are coherent;
- whether the slide should be accepted, regenerated, or marked as needing review.

If an obvious failure appears, regenerate immediately with a corrected prompt without asking the user first. Obvious failures include wrong visible text, unwanted numbering, broken template use, unreadable/gibberish text, severe clutter, or a visual that does not communicate the lesson.

If the issue is subjective or strategic rather than clearly wrong, continue but flag it in the progress note as `needs review`.

Rule:

`QA slide by slide is the assistant's internal production control, not a requirement for user approval after every image.`

### Production Sequence For Approved Decks

When the user approves a plan and says to generate slides, run this sequence:

1. Treat the run as fresh production. Do not reuse prior images unless explicitly asked.
2. State, before any image call, the absolute image folder, each separate HTML player path, optional review player path, and generation mode.
3. Use the direct image tool by default. Use API only for explicit API requests, true native evidence insertion, or direct-tool-unavailable fallback.
4. For each slide, create the teaching payload first:
   - message to install;
   - presenter phrase;
   - audience shift;
   - visible takeaway;
   - visual proof.
5. Decide visual mode:
   - `analogy scene` for openers, tension, payoff, evolution, closing;
   - `artifact schematic` for inputs, steps, validations, outputs, matrices, lists;
   - `hybrid` when a light metaphor supports an operational explanation.
6. Build the final image prompt with brand lock, visible text only, internal-note exclusion, and visual proof.
7. Generate one image in chat.
8. Copy the generated PNG to the declared folder, preserving the original generated-image file.
9. Rebuild the HTML player immediately so the new PNG is stacked in order.
10. Report the current slide, absolute PNG path, HTML player path, and next slide.
11. Continue until complete unless the user interrupts.
12. Do not convert progress updates into approval gates. The user approves the plan/handoff; the assistant produces and self-QAs slides unless the user interrupts or asks for manual review.

Never let the user feel that generation is hidden. The chat must show progress and the local player must grow slide by slide.

When invoked after `presentation-orchestrator`, the default interpretation of "hacer slides", "generar slides", "continua", "dale" or "arranca" is:

`generate image slides -> copy them into an ordered folder -> update global HTML presentation player`

It does **not** mean:

`create PPTX`, `use PptxGenJS`, `switch to slides skill`, `build an HTML deck as layout`.

### Visible one-by-one generation rule

Do not generate a whole deck hidden in a batch by default.

When producing a deck in ChatGPT/Codex:

1. Before the first image, state the output folder for PNGs and the HTML player path, using full absolute paths. This must happen before any image generation call.
2. Generate one slide image at a time in the chat using the direct image tool when available.
3. After each image appears, copy the generated PNG into the ordered deck folder when the environment exposes a generated-image path.
4. Update/rebuild the HTML presentation player immediately after each copied image.
5. Send a short progress update: current slide, saved filename, current player path, and next slide.
6. Continue without asking for approval after every slide unless the user asks to pause or revise.

The user should be able to watch progress in the chat and open the HTML player in parallel. Never let generation feel hidden.

Minimum pre-generation announcement:

```text
Carpeta de imagenes:
[absolute path]

HTML player:
[absolute path]

Modo de generacion:
direct image tool | API fallback | API native evidence
```

If the deck has multiple separate presentations, state one image folder and one HTML player per presentation before generating the first image. A combined review player can be listed only as secondary.

### No-recycle rule

When invoked after an approved Orchestrator plan, treat the next deck generation as a fresh production pass unless the user explicitly says to reuse existing images.

Do not silently reuse, skip, cache, inherit, or treat old PNGs as valid because filenames already exist. Existing images from earlier attempts are references or rejected drafts until they pass current QA. If a script has `skip existing`, `cache`, `reuse`, or `exists -> continue` behavior, disable it or write to a new versioned output folder.

Default output policy:

* create a new versioned folder for a new approved generation pass;
* save every generated PNG with full absolute path available in a manifest;
* keep prompts next to images;
* keep rejected/draft folders separate or delete them when the user asks to clean root causes;
* do not merge old and new slides in a final player.

### Orchestrator prompt transformation rule

Prompts from `presentation-orchestrator` are a handoff, not always the final image prompt.

Before generating each slide, reinterpret the Orchestrator prompt through this skill's disruptive pipeline:

1. write the slide thesis: `This slide is really communicating X through Y`;
2. decide whether the slide needs analogy, disruptive diagramming, or both;
3. if the slide is commercial, persuasive, strategic, pitch-like, educational or executive, select a pattern from `references/commercial-disruptive-patterns.md`;
4. reject generic corporate/dashboard/icon layouts unless the slide's job explicitly requires a quiet schematic;
5. compress visible text to 1 title + 1 subtitle + up to 2 labels;
6. build the final image prompt from semantic interpretation, not from the raw bullet list;
7. only then generate the image.

### Slide Text Visibility Gate

Separate source content into three buckets before prompting:

1. **Visible slide text**: what the audience should read on the slide.
2. **Presenter/internal note**: production status, ownership, who must create something, facilitation reminders, demo timing, file names, implementation caveats, and speaker-only instructions.
3. **Teaching message**: the concrete idea the slide must teach, the phrase the presenter can say, and the mental shift the audience should experience.
4. **Visual guidance**: what the image should imply through layout, objects, emphasis, or flow without writing it as copy.

Never render presenter/internal notes as slide text. Names such as "Fabrizio", ownership statements like "debe ser creado por X", reminders like "mostrar GPT aqui", or implementation status like "ya existe / falta crear" are internal unless the user explicitly says the audience must see them.

If a slide needs to communicate a status to the audience, rewrite it as audience-safe copy:

- Internal: `Debe ser creado por Fabrizio`
- Audience-safe: `GPT a configurar`
- Internal: `Mostrar el GPT existente aqui`
- Audience-safe: `Demo en vivo`
- Internal: `No construir flujo avanzado`
- Audience-safe: `Evolucion posible`

The final image prompt must include a negative constraint: `Do not render internal notes, owner names, facilitator instructions, file names, or implementation reminders as visible text.`

### Didactic Content Gate

A beautiful slide is not enough. Before generating, define the slide's teaching payload:

- `message to install`: one sentence the audience should retain;
- `presenter phrase`: one sentence the speaker can say while showing the slide;
- `audience shift`: from what belief to what belief;
- `visible takeaway`: the minimum text that carries the lesson on the slide;
- `visual proof`: what the image shows that makes the lesson feel true.

If these are missing, do not generate yet. Build them from the Orchestrator plan or from the user's prompt.

The production prompt must not only describe a scene. It must explicitly say what the slide is teaching and how the visual proves it.

Prompt pattern:

```text
Teaching purpose: [message to install].
Presenter meaning: the audience should understand that [concrete lesson].
Visible text: [exact copy].
Visual proof: show [objects/flow/contrast] so the viewer sees [lesson] before reading.
```

Reject a generated slide if it looks impressive but the viewer cannot answer: "what did this teach me?"

Recommended visible text balance:

- 1 title;
- 1 didactic anchor phrase;
- up to 2 support labels.

Good anchor phrase patterns:

- `No decide por el equipo; ordena lo critico para revisar mejor.`
- `La plantilla define la forma; las fuentes aportan contenido verificable.`
- `De ayuda puntual a proceso trazable.`
- `El resultado no es el final: es un borrador para validar.`

Do not overload every slide with a sentence if the slide is a pure title or closing. But most explanatory slides need at least one compact phrase that teaches the lesson.

If the generated image looks like a plain HTML layout, stock dashboard, generic SaaS screen, icon grid, or decorative tech background, fail QA and regenerate with a stronger metaphor or diagramming structure.

### Separate-deck rule

If the Orchestrator asks for multiple PPTs or separate presentations, generate separate image folders and/or separate players for each deck. A combined review player is allowed only as a secondary QA artifact, never as the final delivery structure.

### API/native evidence rule

Use API/CLI image generation only when one of these is true:

- the user explicitly requests API/GPT Image;
- the slide needs native insertion or compositing of factual evidence: charts, tables, screenshots, official logos, thesis figures, real UI, or other assets that must remain exact;
- the direct chat image tool is unavailable and the user approves the API route.

If using API for this workflow, use **ChatGPT/GPT Image 2** as the required model. Do not silently downgrade to a lower image model. If GPT Image 2 is unavailable, stop and ask before using any fallback.

Local file routing, manifests, HTML players, or the user's need to locate outputs are not enough reason by themselves to use the API. They are delivery/traceability needs, not native insertion needs.

If there is no native evidence insertion and the user mainly needs to watch the image appear in the chat, use the direct image-generation tool by default. API/CLI is a fallback path for environments where direct image generation is unavailable, for example when this skill is run from a model/client that cannot call the image tool. If using API as fallback, state that direct image generation was unavailable and still save paths/manifests clearly.

Native evidence insertion means an external image/table/chart/screenshot/logo/figure must be preserved and placed into or composited with the generated slide output. A reference image used only for inspiration, style, or context is not native insertion.

Brand lock rule:

If the user gives a brand palette, it overrides topic defaults. Apply it as a hard production constraint in every prompt and in the generator wrapper. Do not let semantic colors such as risk red, warning yellow, success green, or generic tech violet override the declared brand. Express risk/priority with scale, position, intensity, contrast, shape, and hierarchy unless the user explicitly allows semantic colors.

HTML presentation player requirement:

When producing a deck, the HTML artifact must be ready to use as a presentation, not a vertical review document.

It must:
* show one slide at a time, centered in the viewport;
* preserve 16:9 aspect ratio;
* use the generated PNG as the full slide image;
* support keyboard navigation: ArrowRight / Space / PageDown / Enter = next, ArrowLeft / PageUp / Backspace = previous, Home = first, End = last, F = fullscreen;
* include visible previous/next arrow buttons;
* include a slide counter;
* support direct links through hash or query if practical, e.g. `#12`;
* preload adjacent images when practical;
* use a dark neutral stage around the slide;
* never stack all slides vertically as the primary output.

Optional:
* thumbnail rail or overview mode;
* presenter notes panel;
* QA mode that lists all slides, but this must be secondary to the presentation player.

Core rule:

`The image is not decoration. The image is part of the argument.`

Disruption rule:

`Disruption is not an extra visual effect. It must be implicit in the analogy and/or in the diagramming structure. If no analogy is selected, the layout itself must carry the disruption.`

Template rule:

`A template is a brand frame, not a creative cage. Use it to align background, logo, header, spacing, and colors; keep the disruptive visual idea alive inside the space the template defines.`

Brand adaptation rule:

`When the user provides a template, brand, or corporate frame, do not lower disruption by default. Adapt the disruptive thesis to that branding. The brand frame controls logo, margins, typography, palette and fixed structure; it does not authorize generic corporate diagrams unless the slide's purpose truly calls for a quiet diagram.`

Template-policy gate:

`If a deck arrives from Presentation Orchestrator with a user-provided template but without an explicit template policy, pause before generating images and ask whether the template is rigid, flexible, or a brand frame with controlled breaks. Also ask which slides may break or tension the template. Do not infer "sobrio institucional" from the mere existence of a template.`

Explicit disruptive mandate rule:

`If the user names this skill, asks for disruptive slides, or says to use disruption, the default intensity is high. Each slide must pass either the analogy gate or the disruptive diagramming gate. A clean premium slide is not enough unless the composition itself carries the argument.`

Controlled break rule:

`Even when a template is provided, 1 to 3 high-impact slides in a deck may intentionally break the template if the concept needs a full-scene metaphor. Keep subtle brand signals, but let the idea dominate. Do this sparingly: openings, section transitions, core concepts, or closings.`

Analogy coherence rule:

`Analogies are not random decorations. Within the same section, keep them in a shared conceptual family unless a new section begins or a different analogy is clearly stronger. Prefer connected worlds such as navigation/control/logistics, construction/engineering, or exploration/knowledge.`

Analogy dosing rule:

`Do not force an analogy into every slide. Strong analogy scenes belong to openers, core tension, key payoff, evolution and closing. Operational slides should usually be schematic, matrix-based, checklist-based, artifact-based, or structured-output based. A schematic slide can still be disruptive through hierarchy, spacing, scale, trace lines, object grouping, and reading path.`

For each slide, classify visual mode before prompting:

- `analogy scene`: memorable metaphor dominates the slide.
- `artifact schematic`: real work objects, documents, matrices, checklists, outputs, and flows are arranged clearly with premium visual hierarchy.
- `hybrid`: one consistent analogy family supports a mostly schematic layout.

Across one deck, keep 30-45% analogy/hybrid and 55-70% schematic/artifact slides unless the user explicitly requests a cinematic deck. If consecutive slides are in the same topic, preserve the same visual world instead of inventing a new metaphor each time.

### Integration Background Slides

Use a full-background integration scene only for evolution, system-level, or transition slides. The background must communicate the process, not just atmosphere.

Required components:

- one clear didactic anchor phrase over the background;
- visible integration logic, such as documents + criteria + validation + report;
- traceability lines or lanes that make the connection visible;
- a calm text zone with no card unless contrast absolutely requires it;
- same brand palette as the deck.

Reject generic control rooms, abstract tech wallpaper, or dashboards that do not show what is being integrated.

Disruption rhythm rule:

`Disruption does not mean every slide must be cinematic or metaphor-heavy. Some slides should be diagrams, schemas, tables, matrices or simple control panels. But even quiet slides must avoid default bullet layouts and must make the visual structure do cognitive work. Use high-disruption slides for openers, transitions, core concepts and closings; use precise disruptive diagrams for operational/explanatory slides.`

### Criterio foto-worthy (CRÍTICO — aplicar en QA de cada slide)

Cada slide debe pasar este test antes de aprobar: **¿Un asistente en la audiencia sacaría el celular para fotografiar esta slide?**

Si la respuesta es no, la slide falla QA visual independientemente de que el contenido sea correcto.

Para que una slide sea foto-worthy:
- Un solo elemento visual dominante que se entienda en 2 segundos
- El texto visible debe sentirse como una frase que vale la pena guardar
- Negative space generoso — lo que no está es tan importante como lo que está
- Composición con tensión visual o belleza editorial — no información empaquetada
- Si hay más de 3 elementos compitiendo por atención, nadie la fotografía

### Criterio anti-saturación en slides de texto grande

Cuando el protagonista de la slide es texto grande (cita, definición, pregunta, stat), NO agregar título adicional. El título compite con el texto principal y satura.

Regla: un elemento domina, el resto sirve. Nunca dos elementos grandes en la misma slide.

Aplicación por tipo:
- Slide de pregunta: solo la pregunta — nada más
- Slide de cita/definición: cita grande + atribución pequeña — sin título
- Slide de stat: número grande + fuente pequeña — sin título explicativo
- Slide de fondo oscuro con texto: NO repetir el recurso de fondo completo en slides consecutivas — alterna con fondo claro para que el contraste funcione

### Regla anti-repetición de recurso visual

Usar fondo oscuro completo máximo 2 slides consecutivas. Si la slide previa ya usó fondo dark, la siguiente debe invertir a blanco o light — aunque sean del mismo bloque temático. La repetición del mismo recurso mata el impacto del primero.

### Criterio fondo blanco premium (CRÍTICO)

Fondo blanco puro sin tratamiento = papel en blanco = slide simplona. Nunca usar blanco puro sin al menos uno de estos tratamientos:

- Textura de grain o noise sutil (2-4% opacity) que da profundidad fotográfica
- Gradiente muy suave de blanco a gris frío imperceptible pero presente
- Luz direccional: foco de luz suave desde una esquina que crea profundidad sin color
- Geometría de fondo: formas grandes a opacity 3-5%, apenas visibles pero presentes
- Contexto ambiental: superficie que evoca papel de diseño, concreto claro, lino blanco

Regla: el fondo blanco debe sentirse como una superficie con carácter, no como ausencia de fondo.

### Criterio de composición asimétrica (CRÍTICO)

Composición centrada y simétrica = genérica. Para que una slide se vea hecha por un diseñador:

- El elemento tipográfico de fondo (?, comillas, número gigante) debe estar desplazado — NO centrado. Preferir esquina inferior derecha o superior izquierda, parcialmente cortado por el borde
- El texto principal rompe levemente el eje central — alineado a izquierda o con offset deliberado
- La tensión entre elemento de fondo desplazado y texto principal es lo que crea profundidad
- Regla práctica: si puedes trazar un eje de simetría perfecto en la slide, la composición necesita ajuste

### Lenguaje de diseño visual de referencia (CRÍTICO — aplicar siempre)

Extraído de decks premium de nivel Behance/Awwwards. Estas son las instrucciones específicas que ChatGPT Image necesita para producir slides de diseñador:

**Sombras con profundidad real:**
- Drop shadows con blur 30-40px, offset diagonal 15-20px, opacidad 25-35%
- Las cards, objetos y mockups flotan sobre el fondo — no están pegados
- Nunca sombra dura ni sombra de PowerPoint — siempre difusa y con color

**Cards y contenedores:**
- Border-radius 12-16px consistente en todo el sistema
- Borde interior de 1px en blanco con 12-18% opacidad — crea separación del fondo
- Padding interno generoso — el contenido respira dentro de la card
- Fondo de card ligeramente más claro o más oscuro que el fondo base (glassmorphism sutil)

**Objetos 3D y mockups:**
- Renders en perspectiva con iluminación propia: luz desde arriba-izquierda
- Sombra hacia abajo-derecha con blur suave
- Elementos que se salen o se cortan en el borde del slide — no están centrados y completos
- Reflejos y highlights en superficies brillantes

**Figuras geométricas y elementos de acento:**
- Glow/halo de luz suave alrededor de elementos de acento (esferas, íconos, puntos)
- Formas geométricas grandes a baja opacidad como textura de fondo
- Nunca formas decorativas sin propósito — cada forma refuerza la composición

**Jerarquía de profundidad Z (3 capas obligatorias):**
- Capa fondo: textura, gradiente o formas geométricas a baja opacidad
- Capa media: cards, contenido principal, texto
- Capa frontal: elemento hero que sobresale — objeto 3D, número gigante, figura

**Tipografía de diseñador:**
- Peso variable visible: título en bold/black, subtítulo en regular, etiquetas en medium
- El tamaño del título debe ser al menos 3x el tamaño del body
- Stats y números: el número en display bold enorme, la unidad (%, +, x) en tamaño diferente
- Nunca todo el texto del mismo peso o tamaño

Instrucción directa para prompts de ChatGPT Image:
Cuando se pida una slide premium, incluir siempre: "Apply realistic drop shadows with 30-40px blur and diagonal offset to all floating elements. Use 3 distinct depth layers: background texture, mid-layer content, foreground hero element. Add subtle glow or light halo around accent elements. Cards must have rounded corners (12-16px radius), inner border at low opacity, and generous internal padding."

### Sistema visual GEN+ — referencia canónica (APLICAR SIEMPRE en slides GEN+)

Extraído de las slides comerciales reales de GEN+. Este es el DNA del sistema, no una interpretación.

**Paleta:**
- Fondo light: blanco puro (#FFFFFF) — nunca gris medio
- Fondo dark: navy oscuro (#0A1628 o similar) — nunca negro puro
- Azul eléctrico GEN+ (#1A5CFF aprox): logo, títulos de sección en micro-label, badges, acentos, precios, CTAs
- Navy oscuro (#0A1628): texto principal en slides light
- Gris medio: descripciones, texto secundario
- Nunca más de 3 colores activos en una slide

**Tipografía — jerarquía exacta GEN+:**
- Micro-label superior: Space Grotesk Medium, letter-spaced, electric blue, todo caps — "SITUACIÓN ACTUAL", "ALCANCE FUNCIONAL", etc.
- Título principal: Bold muy grande, dark navy en light / blanco en dark
- Descripción bajo título: Regular, gris, 1-2 líneas máximo
- Headers de card: Bold, electric blue o dark navy
- Body de card: Regular pequeño, gris — siempre conciso, nunca párrafos

**Cards — sistema estándar GEN+:**
- Border-radius 12-16px
- Slides light: fondo blanco, borde 1px gris claro (#E5E7EB), drop shadow blur 8-12px opacity 8%
- Slides dark: fondo navy medio (#1A2540), borde 1px blanco opacity 10%
- Padding interno: generoso — el contenido no toca los bordes
- Nunca más de 3-4 líneas de texto dentro de una card

**Elementos de marca característicos:**
- Watermark tipográfico de fondo: "GEN" en gris muy claro (5-8% opacity) como textura de fondo
- Logo GEN+ siempre en esquina superior — izquierda en light, derecha en dark
- Micro-label de sección en electric blue letter-spaced como primer elemento antes del título

**Layouts que usa GEN+ por tipo de contenido:**
- Situación/problema: diagrama de red con nodos + card de cita con dato verificado a la derecha
- Módulos/categorías: grid de 4 cards con header bold en azul y bullets dentro
- Seguridad por capas: rectángulos concéntricos anidados, el más interno con fondo azul sólido
- Fases/roadmap: cards horizontales conectadas por flecha, número en círculo azul encima
- Niveles/jerarquía: badges de color (N1 azul, N2 cyan, N3 naranja, N4 rojo) + row horizontal
- Clientes: grid de cards blancas con logo centrado, fondo levemente tintado
- Split hero: foto arquitectónica B&N bleeding derecha + bloque texto izquierda + acento azul en esquina

**Lo que hace premium estas slides:**
- Nodo central más grande y oscuro en diagramas de flujo — jerarquía visual clara
- Precios: "USD" en Regular pequeño + número en Bold grande — peso diferenciado
- Foto en B&N (desaturada) + bloque de color azul sólido en esquina = identidad editorial
- Las flechas conectoras entre fases son finas y grises — no protagonizan, solo conectan
- Cada card tiene solo UNA cosa principal — nunca lista de 5+ items en una card

**Foto con color overlay:**
Cuando se use una foto real como elemento de slide, nunca usarla cruda. Aplicar un color overlay en el tono del sistema de branding al 65-80% de opacidad con blend mode multiply o color. La foto se convierte en parte del sistema de color — no en una foto suelta pegada.

**Cards con border-radius asimétrico:**
Las cards no son rectángulos simples. Pueden tener border-radius completo en un lado y esquinas más cerradas en el otro. Esto da personalidad geométrica sin romper la limpieza. Instrucción para prompts: "rounded card with full radius on left side, sharp corners on right" o variaciones.

**Tipografía de 3 pesos simultáneos:**
En una sola slide pueden coexistir: título en Black/ExtraBold enorme + subtítulo en Regular pequeño + número o label en Bold mediano como marca de agua o acento. Los tres pesos distintos crean jerarquía visual sin necesitar colores adicionales.

**Elementos que sangran del contenedor:**
Las imágenes, objetos 3D o elementos hero no están contenidos dentro de la slide — se cortan en los bordes, sangran fuera del frame. Esto crea tensión y movimiento. Instrucción para prompts: "element partially bleeds off the right/bottom edge of the slide frame."

**Blanco y negro vs color:**
Una foto o elemento en escala de grises completamente desaturado + contenido principal en color = profundidad sin sombras. El contraste B&N vs color es más potente que cualquier sombra. Usar especialmente para fotos de personas o elementos de contexto que no deben competir con el contenido principal.

**Jerarquía agresiva en stats:**
Número: tamaño display máximo, peso Black. Unidad (%,+,x,MM): mismo peso pero 60% del tamaño. Etiqueta descriptiva: Regular, 20% del tamaño del número. La distancia tipográfica entre el número y su etiqueta debe ser extrema para que el número domine visualmente.

Disruption intensity ladder:

Before generating any deck or batch, assign every slide one of three intensity levels. This is mandatory.

1. **Normal / schematic**
   - Use for agenda, definitions, tables, requirements, procedural explanations, recap, factual lists.
   - Visual language: clean schema, matrix, comparison table, roadmap, simple diagram.
   - Disruption source: hierarchy, spacing, reading path, non-boring structure.
   - It must still be visually premium; it may be quieter, not generic.

2. **Soft disruption**
   - Use for explanatory concepts, bridges, method slides, workshop instructions, comparisons.
   - Visual language: strong diagramming with objects, pieces, icons, flows, layers, loops, boards, signals.
   - Disruption source: metaphor-light or diagram-as-argument.
   - The image does not need a cinematic background, but the visual must communicate the idea before reading.

3. **Strong disruption / analogy scene**
   - Use for openers, core tensions, paradigm shifts, major demos, section transitions, memorable conclusions, and 1-4 key conceptual slides in a deck.
   - Visual language: strong analogy with an image/scene/background inside the template free area, or controlled template break if explicitly justified.
   - Disruption source: analogy that embodies the idea, not decoration.
   - Examples: wind tunnel for model comparison, factory of clarity for a workshop, custom prosthetic/tool for personalized tools, translation booth for prompt engineering, map/territory for AI subfields.

Deck rhythm requirement:

For a deck of 10-20 slides, include at least:
* 2 strong disruption slides;
* 4-7 soft disruption slides;
* the rest normal/schematic but visually premium.

For a deck over 20 slides, include at least:
* 3-5 strong disruption slides;
* a recurring family of soft-disruption diagrams;
* quiet schematic slides for operational clarity.

Never make all slides strong. Never make all slides schematic. The deck must breathe.

Template-aware intensity:

When a template is provided:
* Normal = use the white/free area for clean schema.
* Soft = use objects, icons, diagrams, loops or layered systems inside the free area.
* Strong = use a background-like analogy scene inside the free area while preserving the fixed template frame.
* Controlled break is allowed only if the user explicitly accepts it or the template would destroy the concept.

If the user says the deck lacks disruption, first identify which slides deserve intensity upgrade instead of regenerating everything.

Native evidence rule:

`When the user provides original charts, tables, figures, screenshots, logos, thesis visuals, or says to use evidence/data "tal cual", the generated image creates the stage; the original asset carries the facts. Do not ask GPT Image to redraw factual evidence that must remain accurate.`

Academic disruption rule:

`Academic does not mean generic. For thesis, jury, professional, legal, or technical defense decks, lower visual noise but keep the disruption in the analogy, diagramming, evidence hierarchy, and reading path. The slide must feel rigorous, not timid.`

Academic style is not triggered by the word "engineering" alone. A corporate engineering training, sales enablement deck, implementation pitch, demo, workshop, or executive capability presentation should usually use **corporate premium / technical demo** style, not academic thesis style. Use academic style only when the context is explicitly thesis, university, jury, research defense, academic report, formal method validation, regulatory/legal evidence, or exact scientific/technical proof.

If the deck is about engineering work but the goal is adoption, training, commercial conversation, productivity, or implementation opportunity, keep the style executive, practical, premium, and demonstrative. It can be rigorous without looking like a thesis defense.

---

## INPUT CONTRACT

Accept direct user input or structured input from `presentation-orchestrator`.

Minimum fields:

```yaml
objective: what the slide must communicate
base_text: title, subtitle, concepts, numbers, or short copy
context: class, deck, audience situation, or topic
audience: learner, executive, client, technical team, sponsor, etc.
tone: technical | inspirational | reflective | energetic | executive | premium
disruption_intensity: normal | soft | strong
disruption_role: agenda | definition | comparison | method | demo | workshop | paradigm_shift | closing | other
brand:
  fonts: Inter, Ruberoid, Plus Jakarta Sans, or similar clean geometric sans
  colors: optional brand colors or accent guidance
  avoid: loud colors, clutter, generic tech decoration
template:
  provided: true/false
  must_preserve: logo, header, sidebars, lines, margins, background, footer
  free_area: where the disruptive scene can live
debug: true
```

If a field is missing, infer conservatively from context. Ask only when the missing information changes the visual decision materially, such as brand, audience, required text, or factual accuracy.

### Style routing gate

Before selecting visual style, classify the deck/slide environment:

| Environment | Use style | Avoid |
|---|---|---|
| Corporate training / demo | premium technical demo, practical, clear, adoption-oriented | thesis-defense sobriety, academic headers, overformal evidence boards |
| Executive pitch / implementation opportunity | premium executive, strategic, restrained but persuasive | classroom look, excessive process detail |
| Workshop / hands-on class | clear operational visual systems, steps, artifacts, visible outputs | cinematic drama that slows action |
| Thesis / jury / university | academic rigorous, restrained, evidence-forward | generic corporate dashboard, loud effects |
| Legal / compliance / contractual | restrained professional, evidence hierarchy, risk clarity | playful metaphors, overpromising autonomy |
| Software/product feature | real UI or generated clean equivalent where tool usage matters | fake dashboards, tutorial screenshots |

Do not let one keyword override the environment. "Engineering" can be corporate, academic, legal, workshop, or product depending on goal and audience.

---

## TEMPLATE-AWARE DISRUPTION

Before generating, decide whether the slide has a template or not.

Also decide whether this is a normal template slide or a controlled template break:

- normal template slide: preserve the frame and inject the disruptive idea inside the available area
- controlled break slide: remove or minimize the frame, keep only subtle brand signals, and let the analogy become the whole scene

Important:

- Template provided does not mean "make it safer". It means "make the strongest disruptive version that still belongs to the brand".
- Do not treat a corporate or training template as a reason to downgrade into cards, bullets, or generic icons.
- If the user's direction is explicitly disruptive, preserve that mandate unless the deck type or factual constraints justify lowering intensity.
- If lowering intensity, state the reason in the debug block: academic precision, legal/regulatory caution, dense factual evidence, exact table/chart readability, or formal executive restraint.

Use controlled break only when:

- the slide is an opener, transition, central concept, or closing
- the analogy is strong enough to be remembered without explanation
- the brand frame would weaken the concept
- the deck has enough normal slides around it to preserve consistency

### When to Lower Disruption

Lower disruption only when the slide's job genuinely requires it:

- academic or thesis defense slide where exact evidence and method clarity dominate;
- legal, compliance, safety, or contractual slide where restraint builds trust;
- dense technical table, formula, chart, screenshot or original evidence that must remain readable;
- formal board/executive update where the best move is calm authority rather than metaphor;
- step-by-step instruction slide where over-metaphor would slow comprehension.

Even then, do not fall back to flat bullet lists. Use a precise diagram, hierarchy, table, matrix, annotated evidence zone, or structured flow.

### No Template

Use full visual freedom. The analogy can become the whole world of the slide.

Examples:

- galaxy concept -> full-screen cosmic/orbital scene
- lighthouse concept -> full-bleed fog and light beam
- ocean depth concept -> entire slide becomes underwater hierarchy
- decision observatory -> whole slide becomes the room/scene

Rules:

- Let the metaphor dominate the background, depth, lighting, and reading path.
- Integrate the title and key text into the scene.
- Use cinematic or editorial composition when it clarifies the message.
- Preserve elegance and readability; do not turn freedom into clutter.

### Template Provided

Use the template as a brand frame. Preserve fixed brand elements and inject disruption into the free area.

What to preserve:

- logo placement
- header or footer system
- sidebars, lines, margins, and white space
- brand colors, fonts, and overall corporate mood

What to avoid:

- treating the template as a reason to downgrade into cards, grids, or safe corporate layout by default
- flattening a strong analogy into generic icons
- making the visual idea merely decorative

How to adapt:

- Identify the free content area first.
- Make the analogy inhabit that area as a contained scene, object, map, orbit, diagram, or visual system.
- Use phrasing such as: `Use the template as the exact visual foundation and brand frame, but do not let it flatten the concept.`
- If the no-template version would be full-screen, convert it into a contained version:
  - full-screen galaxy -> contained orbital system inside the white content area
  - full-bleed lighthouse -> contained beam crossing the content area
  - full ocean scene -> contained depth window or vertical cutaway
  - full cinematic room -> contained architectural panel or perspective viewport
- The template should align the disruption, not contain it into mediocrity.

Decision rule:

`No template = maximum scene freedom. Template = maximum concept intensity inside brand constraints.`

---

## FULL IMAGE PIPELINE

### 0. Native Evidence And Brand Assets

Use this before semantic interpretation when the user provides original evidence or brand assets.

Native evidence includes: thesis charts, tables, screenshots, diagrams, lab reports, financial tables, original figures, mandatory logos, seals, or reference images that must remain factually faithful.

Workflow:

1. Identify each asset's role:
   - `evidence`: factual chart/table/figure/screenshot to preserve;
   - `brand`: logo, institutional seal, official color or template;
   - `style reference`: mood or visual direction only;
   - `source material`: content to interpret, not necessarily visible.
2. Measure factual assets before prompting: pixel width, height, and aspect ratio.
3. Extract the exact thesis/report facts that must appear in the prompt. Put only verified facts in the prompt.
4. Choose an analogy that can naturally contain an evidence zone. Do not say only "leave blank space"; make the blank a meaningful object in the analogy:
   - calibration sheet;
   - lab notebook page;
   - evidence board;
   - technical drawing surface;
   - instrument panel glass;
   - report sheet on a desk;
   - inspection window;
   - dashboard only when the topic is actually control/monitoring.
5. Prompt GPT Image to generate the full slide/background with a protected integrated evidence zone:
   - exact location as relative coordinates when useful;
   - aspect ratio of the original asset;
   - no generated graph/table/axes/text inside;
   - no objects crossing the area;
   - no hard border unless the asset ratio is guaranteed to match.
6. Generate the native image with the selected style and analogy.
7. Insert the real evidence asset afterward with image compositing or PPTX object placement.
8. Insert real brand assets afterward when fidelity matters. Do not let GPT invent official logos.
9. QA at full size: evidence must be readable, aligned, not distorted, and not look like a random sticker.

### 0.0 Image Source And Provenance Gate

Before generating or composing any slide, classify the origin of every visual element:

| Source type | Meaning | Rule |
|---|---|---|
| `generated_scene` | New GPT Image visual created for the slide | Must be freshly generated for the current pass and saved with the final prompt |
| `native_evidence` | Real chart, table, screenshot, logo, figure, document, or UI that must remain exact | Insert/composite after generation; never ask GPT Image to redraw it |
| `reference_only` | Mood, style, composition, or inspiration image | Do not copy literally; record that it influenced style only |
| `stock_or_web_asset` | External photo/icon/visual asset | Record source URL/path and license/usage note when available |
| `old_draft` | Previous generated slide/image | Treat as rejected reference only unless user explicitly approves reuse |

Every accepted output must have traceable provenance:

* final PNG path;
* final prompt path;
* model/tool used;
* source type for the background/scene;
* list of native evidence or brand assets inserted afterward, with paths;
* whether any reference image influenced the result.

If the slide uses only generated imagery, state `source_type: generated_scene`. If it uses real evidence or assets, list them. If provenance is unknown, fail QA until clarified or regenerate from scratch.

Default placement rule:

`For factual evidence, prefer a soft white/neutral quiet zone with no visible border. If a visible frame reveals misalignment, remove the frame and let whitespace absorb small differences.`

Failure modes:

- generated chart/table appears -> fail QA; regenerate or cover it with the original asset;
- evidence too small -> enlarge evidence zone and simplify surrounding scene;
- evidence floats -> integrate it as a sheet, board, aperture, or surface in the analogy;
- evidence frame does not fit -> remove frame; never distort factual evidence;
- prompt becomes less disruptive because of blank space -> change analogy so the evidence zone is part of the metaphor.

Useful prompt language:

```text
Reserve a calm integrated white area for the original [chart/table/figure] to be inserted later. This area is part of the scene as a [calibration sheet / evidence board / lab notebook page]. Do not draw any chart, axes, table, labels, fake data or placeholder text inside. Keep all visual elements outside this protected area. No hard border; use only subtle paper texture and soft shadow.
```

### 0.1 Academic Style Dial

For thesis defenses, juries, university presentations, engineering reports, legal/compliance, or high-stakes professional decks:

- Use high conceptual disruption but low visual noise.
- Prefer clean scientific infographics, precise linework, large evidence, restrained hierarchy, and strong whitespace.
- Make the disruption live in the analogy and evidence architecture, not in loud effects.
- Good analogies: calibration board, technical bench, evidence wall, method map, inspection window, simulation console, decision matrix, controlled experiment, process cutaway.
- Avoid: neon, cyberpunk, excessive glassmorphism, decorative particles, fake dashboards, cinematic drama that competes with evidence.
- If the slide contains real charts/tables, evidence readability outranks spectacle.

Academic full-image prompt pattern:

```text
Semantic interpretation: [what is being proved].
Analogy selected: [academic analogy] because [structural fit].
Style: formal thesis defense, clean academic infographic, institutional palette, precise linework, generous whitespace.
Evidence zone: [size/aspect/position], integrated as [meaningful surface], no generated data inside.
Facts to render exactly: [verified short facts only].
Avoid: invented data, fake logos, fake axes, misspelled labels, visual clutter.
```

### 0.2 Brand Pill: UNI Thesis / Presentation

Activate this pill only when the user explicitly says the deck, thesis, class, or slides are for UNI / Universidad Nacional de Ingenieria, or provides a UNI template/logo.

Rules:

- Palette: UNI wine red / guinda + white as primary system; graphite gray as neutral; small green/blue accents only when semantically justified by chemistry, environment, water, or data.
- Logo: use the real UNI logo/seal supplied by the user or extracted from the source. Insert it after generation when fidelity matters. Do not ask GPT Image to invent the logo.
- Logo placement: small and clean in a corner/header safe zone. Do not generate a giant decorative ring, fake seal, cropped logo, or low-fidelity emblem.
- Header/footer: prefer sober academic header line, thin wine-red separators, and clean footer only when needed. Avoid overframing every slide.
- Tone: formal engineering thesis defense, rigorous, confident, restrained.
- Text: keep Spanish academic labels short; avoid relying on GPT Image for long paragraphs or dense tables.
- If the user gives a mandatory template, preserve its fixed elements but still apply disruption in the free area.

Prompt snippet:

```text
UNI academic presentation style: wine red and white, sober engineering thesis defense, clean header line, small safe zone for the real UNI logo to be inserted later. Do not draw or invent the logo; leave the logo area clean and uncropped.
```

### 1. Semantic Interpretation

Before selecting an image or layout, classify the slide:

| Content type | Use when | Primary visual strategy |
|---|---|---|
| conceptual | abstract idea, principle, mental model | metaphor, spatial analogy, iconic scene |
| sequential | process, pipeline, before/after over time | path, flow, stages, depth progression |
| comparative | two or more elements in tension | split world, contrast field, balance, mirror |
| enumerative | components, attributes, categories | radial, constellation, 3D cluster, non-flat grid |
| metric | numbers, rankings, evidence | giant metrics, editorial data, restrained visual field |
| systemic | many relationships or forces | network, orbit, map, architecture, control room |
| narrative | opening, closing, persuasion, emotional turn | cinematic thesis image, editorial hero, symbolic scene |

Also define:

- textual prompt nucleus: the exact concept, phrase, tension, or relation that must not be lost
- communication thesis: what the viewer must understand or feel
- original-theme anchors: 3 to 5 words or ideas that any analogy must stay close to
- disruption intensity: normal / soft / strong
- why this intensity fits this slide
- disruption opportunity: what conventional slide pattern must be broken and why
- template mode: no template / template provided
- template constraints: what must stay fixed and what area can host the disruptive scene
- depth: low, medium, high
- emotional intent: clarity, urgency, awe, trust, tension, ambition, relief
- text load: minimal, moderate, risky

Write the thesis as:

`This slide is really communicating "[message]" through "[visual mechanism]".`

If this sentence is weak, do not generate yet.

---

### 2. Analogy Gate

Decide whether to use visual analogy.

Use the intensity ladder first:

* Normal slides may skip analogy if a strong schema/table/roadmap communicates better.
* Soft disruption slides should evaluate metaphor-light options or diagrammatic metaphors.
* Strong disruption slides must evaluate at least 3 analogies and select one that can become an image/scene/background inside the slide.

If a slide is marked strong and no analogy is selected, explain why and switch to a strong non-metaphorical visual mechanism. Do not silently downgrade it to a generic diagram.

The analogy generator starts from the textual prompt nucleus. Generate analogies by similarity, not by spectacle. The winning analogy is the one most semantically and structurally attached to the original theme while still creating a disruptive visual reading.

Use analogy when:

- the concept is abstract, deep, or difficult to feel through text
- the audience needs intuition before detail
- the metaphor makes the idea more concrete, memorable, or emotionally legible
- the content is conceptual, narrative, systemic, or a high-level transition

Avoid analogy when:

- the slide requires factual precision or software specificity
- the content is already visually concrete
- the metaphor would add ambiguity
- the deck needs an executive data slide, not poetic interpretation

If analogy is useful, generate at least 3 options:

```text
Analogia A: [name]
- Visual: what the image would show
- Similarity to original prompt: high/medium/low
- Structural match: what relation it preserves (depth, sequence, tension, hierarchy, system, etc.)
- Disruption move: what makes the slide non-obvious without breaking meaning
- Why it communicates: semantic fit
- Risk: possible confusion, cliche, or overdrama

Analogia B: ...
Analogia C: ...
Selected: [name] because it has the strongest similarity to the original prompt and the cleanest disruptive visual path.
Moonshot preserved: [bolder option worth testing later]
```

When the slide belongs to an existing section, also evaluate family coherence:

```text
Section visual family: [navigation/control/logistics | construction/engineering | exploration/knowledge | other]
Does this analogy belong to the family? [yes/no]
If no, why is the exception worth it?
Could an analogy from the same family work better?
```

Do not jump between unrelated analogy worlds inside the same section by default.

Bad pattern:

`boat -> bull -> kitchen -> galaxy`

Better pattern:

`lighthouse -> control tower -> logistics port -> control room`

Exception:

Use a different analogy only when the slide starts a new section or when the new metaphor is clearly more precise, memorable, and useful.

If no analogy is selected, state:

`No analogy selected because [reason]. Disruption moves to diagramming. Visual strategy: [diagram/editorial/data/system].`

Selection priority:

1. semantic similarity to the textual prompt
2. structural similarity to the concept relation
3. clarity for the audience
4. ability to become a clean diagram/layout
5. disruptive potential
6. aesthetic potential

Do not choose the most spectacular analogy if it drifts away from the original topic.

---

### 3. Layout Exploration

Generate at least 2 layout alternatives before choosing.

The layout must be derived from the selected analogy. If there is no analogy, the layout must become the disruptive mechanism by itself.

If a template is provided, create two mental versions before selecting:

1. no-template ideal: the strongest possible version of the analogy with full freedom
2. template adaptation: the same disruptive idea contained inside the template's free area

Choose the template adaptation only after preserving the core visual force of the no-template ideal.

If the no-template ideal is dramatically stronger and the slide is a key moment, propose or generate a controlled template-break variant. Label it clearly:

```text
Template version: [how the concept lives inside the brand frame]
Controlled-break version: [how the concept becomes the whole scene]
Recommendation: [template | controlled break] because [reason]
```

Examples:

- depth concept -> layered descent, vertical depth zones, nested thresholds
- sequence -> path, stations, tunnel, timeline in perspective, process arena
- comparison -> split world, mirror tension, forked path, before/after field
- enumeration -> roulette, radial orbit, circular modules, constellation, non-flat grid
- system -> nodes, control map, orbital dependencies, architecture stack
- hierarchy -> levels, strata, tower, stack, nested frames
- metric -> giant number field, editorial data monument, scale contrast

Useful layout families:

- full-bleed cinematic metaphor with quiet text zone
- ocean/depth hierarchy
- radial or orbital system
- perspective 3D progression
- asymmetric editorial composition
- split-world comparison
- giant metric field
- constellation map
- architectural stack
- cinematic object plus callouts
- pure typography with symbolic background

Avoid:

- flat bullet list
- generic left-title/right-image by habit
- four equal cards unless the content genuinely needs parity
- decorative particles, abstract orbs, circuit boards, or geometric clutter with no semantic role
- more visual elements than the message can support

Score each layout quickly:

| Criterion | Question |
|---|---|
| clarity | Is the idea understood within 3 seconds? |
| semantic fit | Does the composition embody the message? |
| elegance | Is there enough negative space and restraint? |
| disruption | Does it escape a conventional slide pattern? |
| disruption source | Does disruption come from analogy, diagramming, or both? |
| template fit | If there is a template, does the disruptive idea live inside it without being weakened? |
| text safety | Can text be readable without crowding? |
| risk | What could fail in image generation? |

Select one winner and one backup.

---

### 4. Prompt Assembly

Build the final image prompt in this order:

1. Format: finished 16:9 premium presentation slide, single image
2. Communication goal
3. Visual thesis
4. Similarity logic: why the chosen analogy or diagram is close to the original prompt
5. Disruption source: analogy, diagramming, or both
6. Template mode:
   - no template: let the scene/metaphor dominate the whole slide
   - template provided: preserve fixed template elements and place the disruptive visual system inside the free area
7. Base scene or metaphor
8. Main composition and reading path
9. Text to include, max 4 text elements
10. Text integration: where it lives and why that zone is calm
11. Visual style: Apple-like, elegant, minimal, editorial, high-end
12. Typography: clean geometric sans similar to Inter / Plus Jakarta Sans / Ruberoid
13. Brand color guidance using color names, not hex codes
14. Constraints: no clutter, no generated text artifacts, no watermarks, no stock-photo feel, no random UI, no unreadable text
15. Language lock: all visible text must be in the requested language

Prompt target: usually 120-220 words. Be specific enough to control composition, but not so overloaded that the image model collapses into clutter.

Text rule:

- Prefer 1 title + 1 subtitle + up to 2 short labels.
- If the base text has more than 4 items, compress before prompting or ask whether to split into multiple slides.
- Never rely on the image model to render dense paragraphs, tables, small labels, or long lists.

---

### 5. Generate Image

Use ChatGPT image generation when available. Generate one finished 16:9 slide image at a time, visibly in the chat.

If generation is not available in the current environment, output the full debug block plus the final prompt ready to paste into the image generator. Do not silently switch to HTML.

If the user explicitly requests GPT Image, API, native-image generation, or evidence-native workflow, do not replace the workflow with HTML. Generate the slide image first, then composite original evidence/brand assets afterward.

When using an API/CLI path:

- use GPT Image 2 unless the user explicitly approves another model;
- save the exact prompt next to the output;
- save the raw generated image;
- save the final composited image;
- report the paths and which assets were inserted natively;
- never print API keys.

Regeneration loop:

1. If text is wrong, garbled, misspelled, or cluttered: regenerate with stricter text constraints.
2. If metaphor is beautiful but unclear: change analogy or simplify scene.
3. If layout is conventional: change layout family, not just style words.
4. After 3 failed attempts: switch analogy or use the backup layout.

---

### 6. Debug Output

Always return the reasoning when `debug: true` or when the user is testing the skill.

```text
=== DEBUG SLIDE [N] ===

INPUT SUMMARY
- Objective:
- Base text:
- Context:
- Audience:
- Brand/style:

INTERPRETATION
- Content type:
- Environment/style route: corporate training / executive pitch / workshop / academic / legal / product
- Textual prompt nucleus:
- Original-theme anchors:
- Conceptual depth:
- Disruption opportunity:
- Template mode:
- Template constraints / free area:
- Emotional intent:
- Text load:
- Communication thesis:

ANALOGY DECISION
- Use analogy: yes/no
- Why:
- Options considered:
  A. [name] / similarity: / structural match: / disruption move: / risk:
  B. [name] / similarity: / structural match: / disruption move: / risk:
  C. [name] / similarity: / structural match: / disruption move: / risk:
- Selected:
- Moonshot preserved:

LAYOUT DECISION
- Disruption source: analogy / diagramming / both
- No-template ideal:
- Template adaptation:
- Options considered:
  1. [layout] / derived from: / text integration: / disruption move:
  2. [layout] / derived from: / text integration: / disruption move:
- Selected:
- Backup:

FINAL IMAGE PROMPT
[complete prompt]

QA RESULT
- Concept visible without text:
- Text legible:
- Max 4 text elements:
- No artifacts:
- Elegant/non-saturated:
- Image adds meaning:

OUTPUT
- Image generated or prompt ready:
- Provenance:
  - source_type:
  - model/tool:
  - final_png_path:
  - prompt_path:
  - native_assets_inserted:
  - references_used:
```

For normal production requests, summarize the debug briefly unless the user asks for full trace.

---

## FULL IMAGE STYLE RULES

- Use Apple-like restraint: confident negative space, precise hierarchy, premium materials, quiet color.
- Keep the slide emotionally clear: calm, sharp, intentional.
- Use visual analogies only when they clarify the message.
- Let the composition do cognitive work: depth, contrast, scale, alignment, direction, proximity, and light should communicate relationships.
- Prefer real-world, cinematic, editorial, or high-end 3D scenes over generic "AI tech" decoration.
- Integrate text into the scene naturally, but keep it readable and sparse.
- Use brand accents as signals, not as flood fill.
- When a slide is for executives or non-technical audiences, translate technology into outcomes: speed, control, productivity, risk, cost, opportunity, decision quality.

Hard rejects:

- flat bullet-list slide
- crowded infographic
- neon chaos
- generic particles/orbs/circuit backgrounds
- tiny unreadable labels
- random fake UI
- generated text artifacts in important areas
- stock-photo background with unrelated text slapped on top
- metaphor that is prettier than it is meaningful

---

## FULL IMAGE QA CHECKLIST

Fail and revise if any critical item fails:

0. The slide is freshly generated for this approved pass, not silently reused from a previous folder/cache.
1. The image communicates the concept before reading the text.
2. The selected analogy or visual strategy fits the message.
3. The analogy, if used, is the closest useful similarity to the original prompt, not just a pretty metaphor.
4. If no analogy is used, the diagramming itself creates the disruption.
5. If a template is used, the template aligns the disruption without weakening it.
6. If no template is used, the visual world fully supports the analogy.
7. Text is readable, short, and correct.
8. There are no generated text artifacts, watermarks, fake logos, or malformed UI.
9. The slide feels like one coherent idea.
10. The layout is not a conventional bullet slide.
11. The visual is elegant and not saturated.
12. The image adds meaning rather than decoration.
13. Native evidence, if used, is original, readable, not distorted, and visually integrated.
14. Official logos, if used, are real assets inserted afterward or faithfully preserved from the template.
15. For academic slides, the style is rigorous and restrained while still using analogy/diagramming to avoid generic layouts.
16. The image has the required slide aspect ratio for the target player/export. If it is 3:2 or another ratio while the deck is 16:9, fail QA unless a deliberate postprocess creates a true 16:9 final slide without distortion.
17. The output path is traceable: full image path, prompt path, player path, and deck membership are known.
18. The environment/style route is correct. Corporate engineering training must not be mistaken for academic thesis style unless the user explicitly frames it that way.
19. Image provenance is documented: generated scene, native evidence, brand assets, references, or old drafts are clearly identified.

After QA, state the next action:

- accept
- regenerate with prompt revision
- switch analogy
- switch layout
- split into multiple slides
- use legacy HTML mode for layout precision

Do not stop and ask the user after every accepted slide. A short progress note is enough:

```text
Slide X accepted and saved. Player updated to X/N. Next: Slide Y.
```

If regenerated, say briefly why:

```text
Slide X regenerated because [clear QA failure]. Accepted version saved. Next: Slide Y.
```

---

## LEGACY MODE: HTML + IMAGEN 4

Use only when the user explicitly asks for HTML, editable exported deck, Canva handoff, tighter layout control, or when full-image generation repeatedly fails due to text or diagram precision.

## LEGACY PIPELINE (10 steps)

1. **Plan** - topic, brand color, slide count (default 11), assign one disruption technique per slide (no repeats)
2. **Disruption thesis** - define the one visual idea the slide must communicate before choosing layout
3. **Layout map** - decide headline zone, image zone, quiet zones, and reading path before prompting images
4. **HTML shell** - create with `go(0)`, `scale()`, keyboard nav, brand CSS variable `--g`
5. **Prompts** - one per slide, unique technique, max 4 text items, end with language lock
6. **Generate** - sequential only, sleep 30s on 429 rate limit
7. **Coordinate fit** - place HTML text only after reading the image as a grid and identifying safe, high-contrast zones
8. **QA** - extract previews and review all slides against checklist
9. **Fix** - refine prompt, re-place content, or regenerate any failures. After 3 image fails switch technique
10. **Canva export** - Canva MCP: create design -> upload PNGs -> Magic Layers -> editable

---

## BRANDING COLORS (by topic)
| Topic | Accent color |
|-------|-------------|
| ML / Data Science | bright apple green |
| Computer Vision | golden yellow |
| AI Agents | electric violet |
| Business / Finance | electric blue or hot magenta |
| Health / Medical | clean teal |
| BIM / Engineering | electric blue |

Dark background plus one accent plus white text by default.

Exception: if the strongest deck direction is clearly light, keep the whole system consistently light instead of forcing dark slides back in.

---

## DISRUPTION SEQUENCE - 3 questions before each slide
0. What **environment/style route** is this? (corporate training / executive pitch / workshop / academic / legal / product)
1. What **type** of content is this? (title / definition / hierarchy / process / taxonomy / deep-dive / applications / metrics / ecosystem / closing)
2. What **metaphor** makes the concept clearer, not just prettier?
3. Does this **contrast** structurally with the previous slide?
4. What is the **source/provenance** of the visual? (generated scene / native evidence / reference only / stock or web asset / old draft)

### Anti-repetition rules
- Never use the same layout twice in a row
- Alternate dark-heavy and lighter slides every 2-3 slides
- After a complex diagram, make the next slide simpler
- After 3 dark slides, make the next one light
- Title and closing must look nothing alike
- Do not repeat `title left / visual right` by habit

### 11-slide variety grid
| Slide | Purpose | Technique |
|-------|---------|-----------|
| S1 | Title | Movie Poster Hero |
| S2 | Definition | Full Bleed Photo Metaphor or Mixed Containment |
| S3 | Core concept | Circular Loop or Concentric Circles |
| S4 | Architecture | Isometric 3D Stack or Factory Pipeline |
| S5 | Components | Hexagonal Grid or Constellation Map |
| S6 | Deep dive | Hacker Terminal or 3D Object plus Annotations |
| S7 | Knowledge/memory | Surreal Library or Staggered Portrait Cards |
| S8 | Applications | Asymmetric Magazine Collage |
| S9 | Metrics/rankings | Giant Metrics plus Separator Lines or F1 Leaderboard |
| S10 | Ecosystem/future | Aerial City Network |
| S11 | Close | Pure Typography |

---

## 20 DISRUPTION TECHNIQUES (quick reference)
01. **Movie Poster Hero** - massive 3D glowing subject, text asymmetric lower-left, vertical text right edge
02. **Full Bleed Photo Metaphor** - real photo as background, 3 content zones matching photo depth and light
03. **Circular Loop Diagram** - glowing nodes on circle, clockwise arrows, subject at center
04. **Isometric 3D Stack** - floating translucent layers at 30 degrees, glowing edges, circuit texture background
05. **Hexagonal Grid** - 4 hexagons in staggered 2 by 2 arrangement, gradient fills, icon watermarks
06. **Hacker Terminal** - dark workstation photo background, rounded terminal panel, THOUGHT / ACTION / OBSERVATION lines
07. **Constellation Map** - space background, glowing star nodes, thin connecting lines, floating label cards
08. **Surreal Library** - infinite library photo, holographic floating cards at different angles and depths
09. **Asymmetric Magazine Collage** - 1 large, 2 small bottom-left, 1 tall right, never 4 equal blocks
10. **F1 Leaderboard** - race or stadium photo background, dark ranked panel with medal icons per row
11. **Aerial City Network** - night city aerial photo, brand-color nodes plus connection lines plus label cards
12. **Pure Typography** - ghost symbol background, massive 2-line heading, formula, pills
13. **Ocean Depth Hierarchy** - underwater photo, 3 horizontal depth zones as 3 hierarchy levels
14. **Prism Spectrum** - light-through-prism photo, 3 zones as 3 processing levels
15. **Factory or Studio Pipeline** - industrial or studio photo, 5 floating station cards, center card glows
16. **3D Object plus Callout Annotations** - dramatic 3D sculptural object, 4 labels connected by dotted lines
17. **Mixed Containment** - tension between rounded white cards, direct-on-background text, and photo bleed
18. **Staggered Portrait Cards** - tall vertical photo cards at different heights, tinted background per card
19. **Giant Metrics plus Separator Lines** - 3 rows: massive number plus thin line plus small description
20. **Dot Grid Texture** - hexagonal dot pattern at low opacity as depth layer under any technique

---

## DISRUPTION THESIS RULE
Before any prompt, write one sentence in this form:

`This slide is really communicating X through Y.`

Examples:
- `This slide is really communicating "AI transforms chaos into clarity" through a left-to-right translation scene.`
- `This slide is really communicating "same model, different outcome" through one source splitting into unequal results.`
- `This slide is really communicating "AI estimates, it does not know" through many possible options with one highlighted as most likely.`

If the final slide does not make that sentence feel inevitable, it is not ready.

---

## VISUAL METAPHOR PRINCIPLE
**The image must be the communication. Ask: "Could someone understand the topic from the image alone?"**

Good:
- Ocean = hierarchy
- Factory = pipeline
- ECG = model health
- F1 = benchmark race
- Night city = multi-agent network
- Prism = data layers
- Library = knowledge domain
- Translation scene = chaos to clarity
- Choice field = many options, one most likely

Bad:
- generic particles
- abstract orbs for everything
- random circuit boards
- floating geometric shapes with no semantic role

---

## IMAGE-FIRST, HTML-SECOND COMPOSITION
- First decide the visual story
- Then generate the image
- Then place HTML text

Rules:
- Do not drop text on top of an image just because there is room
- Use the image as a scene, not as wallpaper
- If the image already carries the concept, reduce HTML to the minimum needed
- If the image is weak, do not decorate it with more labels; regenerate or switch technique
- Support panels are for contrast and spacing, not for compensating a weak concept

---

## COORDINATE MAPPING RULES
Treat every image as a grid before placing HTML.

1. Find the real focal point
2. Find the high-contrast quiet zones
3. Find where visual mass is already heavy
4. Align labels to image geometry, not to instinct alone

Rules:
- Text should live in calm zones, not over noisy detail
- If a concept has a semantic center in the image, align the related text block to that axis
- If multiple layers start touching, spacing wins over decoration
- Remove one container before shrinking text
- If two consecutive slides feel like the same wireframe with different copy, redesign one of them

---

## GENERATED IMAGE HYGIENE
Imagen often produces text garbage. Treat that as a normal failure mode.

Rules:
- Never trust generated text inside images
- If text, letters, numbers, or UI noise appear in key areas, fail QA
- Best fix order:
  1. Regenerate with stronger "no text" constraints
  2. Reframe or crop if artifacts sit outside key zones
  3. Mask or wash contaminated areas only if the slide still reads cleanly
- Do not let visible garbage survive just because the composition is otherwise good

---

## REAL SOFTWARE BACKGROUND CRITERION

When a slide is about a specific tool or software:
- Use a real screenshot or a generated clean equivalent
- The actual working content must dominate the frame
- Never use a webpage, tutorial, or documentation screenshot as the main visual

When the slide is about a concept:
- Use a generated metaphor image instead of pretending there is one canonical software interface

Background checks:
1. Does the actual content dominate?
2. Does it look like the app in use, not a webpage?
3. Is browser chrome or tutorial clutter visible? Reject if yes.

---

## IMAGEN 4 KEY LIMITS
| Problem | Fix |
|---------|-----|
| 5 plus text items causes hallucination | Max 4 items per slide |
| Hex codes render as text | Use color names only |
| English bleeding in | End prompt with a language lock |
| Short prompt causes random composition | Write 100 to 150 word prompts |
| Rate limit 429 | Sleep 30 seconds and retry sequentially |
| WinError 10065 in threads | Use sequential generation only |
| 3D looks cartoonish | Add photorealistic render quality |
| Imagen inserts text in assets | Strengthen no-text constraints and expect QA failure |

---

## PROMPT ELEMENT ORDER
1. Base scene
2. Primary visual
3. Layout proportions and safe zones
4. Text content or intended HTML support zones
5. Brand color
6. Quality directive
7. Language lock as the last line

When prompting support backgrounds for typography:
- explicitly reserve the center or headline zone
- explicitly forbid words, letters, numbers, labels, and readable UI text

---

## QA CHECKLIST
1. Text correct? No garbled words, no asterisks
2. Numbers sequential? No duplicates
3. Layout matches prompt? Asymmetry is actually asymmetric
4. Brand color present where specified?
5. Visual metaphor supports the message?
6. No English where Spanish is expected?
7. Is this the strongest possible version?
8. Are generated-image text artifacts hidden or removed?
9. Are HTML text blocks placed in clean, high-contrast zones?
10. Are there collisions, cramped bands, or stacked containers fighting each other?
11. Does the slide feel like one idea, not a layout plus random additions?

Threshold:
- Fail on 1 to 6 or 8 to 10 -> fix or regenerate
- Fail on 7 or 11 -> judgment call
- 3 fails on the same slide -> switch technique

---

## CANVA MCP EXPORT
1. Run QA extraction and get PNG files
2. Canva MCP -> create 1280 by 720 design -> upload each PNG as a page
3. In Canva editor use Magic Layers for editable conversion

---

## CORE PYTHON PATTERNS

### Imagen 4 API call (sequential, no threading)
```python
import urllib.request, json, time

API_KEY = "YOUR_API_KEY"
URL = "https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict"

def generate_image(prompt, name, out_dir):
    path = f"{out_dir}/{name}.txt"
    payload = {
        "instances": [{"prompt": prompt}],
        "parameters": {
            "sampleCount": 1,
            "aspectRatio": "16:9",
            "safetyFilterLevel": "block_few",
        },
    }
    req = urllib.request.Request(
        f"{URL}?key={API_KEY}",
        data=json.dumps(payload).encode(),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=180) as r:
            b64 = json.loads(r.read())["predictions"][0]["bytesBase64Encoded"]
        with open(path, "w") as f:
            f.write(b64)
    except Exception as e:
        if "429" in str(e):
            time.sleep(30)
            generate_image(prompt, name, out_dir)
        else:
            print(f"ERROR {name}: {e}")
```

### Embed all slides into HTML
```python
import os
import re

def embed_all(html_path, slides_dir, slide_ids):
    with open(html_path, "r", encoding="utf-8") as f:
        html = f.read()
    for sid in slide_ids:
        txt = os.path.join(slides_dir, f"{sid}.txt")
        if not os.path.exists(txt):
            continue
        with open(txt, "r") as f:
            b64 = f.read().strip()
        new_src = f"data:image/png;base64,{b64}"
        pattern = rf'(<div class="slide" id="{sid}"><img src=")[^"]*(")'
        html = re.sub(pattern, rf"\g<1>{new_src}\2", html)
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html)
```

---

## COMPLETED DECKS (reference)
| File | Topic | Color | Notes |
|------|-------|-------|-------|
| ml_presentation.html | Machine Learning | green | Factory-style logic |
| cv_presentation.html | Computer Vision | yellow | Visual pipeline and comparison slides |
| agents_presentation.html | AI Agents | violet | Strong variety in maps, collage, and typography |
| nonicatab_presentation.html | Revit add-in | electric blue | Software-specific composition with real usage feel |

Best first-try techniques:
- movie poster
- terminal
- isometric stack
- aerial city
- asymmetric collage
- pure typography

High-risk techniques:
- numbered charts
- any image that relies on generated text being correct
- any slide where labels are placed before reading the image as a grid
