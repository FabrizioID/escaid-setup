# Presentation Visual Pill

Activar cuando Magnus juzga COMO se ve una slide (la ejecucion visual de un deck). Es el lente de calidad visual transversal: aplica a cualquier slide sin importar el modo. Las MODALIDADES (comercial/keynote/tecnico, escalera de disrupcion, librería de patrones y tecnicas) y el pipeline que escribe el MD de prompts viven en `disruptive-presentations`. El CONTENIDO/mensaje vive en `presentation-content-pill`. La marca vive en `brand-genplus-pill` o en el branding del cliente.

**No duplicar — referenciar:** psicologia/mensaje -> `presentation-content-pill` + `marketing-pill`; lenguaje publico -> `terminology-perception-pill`; los modos y la escalera de disrupcion los define `disruptive-presentations`.

## Criterios de calidad visual (la vara)

**V1 — Glow / efectos de IA: una sola regla por modo.** Glows, halos, trails luminosos, neon, particulas brillantes y luces digitales artificiales son delatores de "imagen IA" y matan credibilidad. Regla unica: **prohibidos en comercial y tecnico; permitidos y controlados solo en keynote / disrupcion fuerte** (donde el visual ES el mensaje). Default: sin glow salvo que el modo lo autorice. La profundidad premium viene de luz natural direccional + sombras realistas, no de efectos digitales.

**V2 — Premium, no generico.** Nunca "flat vector / icon style / cartoon / 2D flat" (resultado infantil). Si: ilustracion editorial con profundidad por sombra y textura, materialidad realista sin photorealismo, nivel Behance. Para elementos tecnicos: line-art fino y contenido en comercial; render 3D cinematografico solo en keynote.

**V3 — Imagen que ACOMPAÑA vs que COMUNICA.**
- Acompaña (atmosfera, estilo): desaturada, opacity 15-25%, fade hacia el texto, integrada al fondo. El texto es protagonista.
- Comunica (evidencia, argumento): B&N a opacidad completa, sangra al borde, peso visual real; un bloque de color de marca como puente.

**V4 — Foto-worthy (lado visual).** Un elemento dominante que se entiende en 2s, negative space generoso, tension o belleza editorial. Si hay mas de 3 elementos compitiendo, nadie la fotografia. (El lado-mensaje del foto-worthy esta en `presentation-content-pill` C7.)

**V5 — Densidad y saturacion.** Todas las zonas con contenido proporcional; nunca espacio vacio sin intencion. Cuando el protagonista es texto grande (cita, pregunta, stat), NO agregar titulo adicional — un elemento domina, el resto sirve. Maximo por card: titulo + 1 linea + 3 items + 1 hero.

**V6 — Anti-repeticion de layout.** Nunca el mismo patron en slides consecutivas (cards en fila, radial, split, stat hero, full-bleed, timeline). El cambio de diagramacion señala un nuevo momento del argumento.

**V7 — Jerarquia.** Tres pesos tipograficos distintos (micro-label letter-spaced -> titulo bold -> descripcion regular). En stats el numero domina (display), la unidad y la etiqueta muy por debajo. Nunca todo al mismo peso.

**V8 — Profundidad sin efectos.** Sombras realistas (blur 8-40px, offset diagonal, opacity 8-35%), 3 capas Z (fondo textura / contenido / hero), luz natural. Fondo blanco nunca crudo: grano sutil, gradiente imperceptible o luz direccional.

**V9 — Texto en la imagen, minimo.** Maximo 1 titulo + 1 frase ancla + hasta 2 labels. Nunca depender del generador para parrafos densos, tablas o listas largas; eso produce texto basura.

**V10 — Evidencia y marcas reales no se redibujan.** Charts, tablas, capturas, logos oficiales o figuras de tesis se preservan/insertan como assets reales, no se piden al generador. Interfaces reales (n8n, Revit, dashboards): reconstruccion fiel verificada, nunca inventada.

**V11 — Dial academico.** Para tesis, jurado, defensa, reporte tecnico o legal: bajar el ruido visual pero mantener la disrupcion en la analogia y la arquitectura de evidencia. Academico NO es generico ni timido. Sin neon ni glow ni dashboards falsos; si charts/tablas reales, la legibilidad de la evidencia gana sobre el espectaculo. Analogias tipo: calibration board, evidence wall, method map, inspection window, banco tecnico.

## Regla

El criterio decide si una slide se ve premium, legible y creible. La modalidad (que patron, que nivel de disrupcion) y la escritura del prompt las ejecuta `disruptive-presentations`. Una slide con efectos de IA visibles, flat, saturada o con texto basura, falla — por linda que parezca.
