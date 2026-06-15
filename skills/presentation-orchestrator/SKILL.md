---
name: presentation-orchestrator
description: Guia de secuencia para construir el CONTENIDO de una presentacion y entregarlo como un MD de handoff a disruptive-presentations. Usar cuando el entregable sea un deck, clase, ponencia, pitch o sustentacion slide-by-slide. NO decide el criterio de contenido (eso es Magnus + presentation-content-pill) ni la ejecucion visual (eso es disruptive). Orquesta el proceso: que contexto pedir, en que orden construir, y produce el contrato por slide.
---

# Presentation Orchestrator

Orchestrator es la **guia de proceso** del vertical de presentaciones. No es el cerebro de criterio ni el motor visual. Hace tres cosas:

1. **Pide el contexto** correcto antes de construir.
2. **Corre la secuencia** de construccion de contenido como guia (contexto -> audiencia -> objetivo -> sensacion -> experiencia -> arco/story-spine -> secuencia slide-by-slide).
3. **Emite un MD de handoff** (estrategia + contrato por slide) y da paso a `disruptive-presentations`.

## Reparto de responsabilidades (CRITICO — leer antes de operar)

| Quien | Que decide | Donde vive |
|---|---|---|
| **Magnus** (cadena F1-F13) | CONSTRUYE el contenido y la secuencia: narrativa, mensaje de cada slide, que dato y por que | motor de pensamiento |
| **`presentation-content-pill`** | el CRITERIO de que hace bueno un contenido de slide (un-foco, carga de valor, nada-aleatorio, tono por fase, marca/CTA, story-spine, foto-worthy) | pill de Magnus |
| **Orchestrator** (esta skill) | el PROCESO: que contexto pedir, en que orden, y el FORMATO de salida (MD de handoff) | aqui |
| **`disruptive-presentations`** | la EJECUCION VISUAL: layout, densidad, variacion de diagramacion, analogia visual, dosificacion de disrupcion, saturacion, prompts e imagenes | skill de produccion |

**Regla:** Orchestrator NO redefine los criterios de contenido — los **invoca** desde la `presentation-content-pill` de Magnus. Si necesitas saber "¿esta slide tiene un solo foco? ¿el dato construye algo? ¿el tono de la fase es correcto?", eso lo decide Magnus con la pill. Orchestrator solo asegura que el proceso corre y que el handoff queda completo.

## Cuando activar / cuando NO

Activar cuando el entregable principal sea presentacion, clase con slides, deck, ponencia, pitch, sustentacion o storytelling slide-by-slide.

No activar para:
- plan operativo sin slides -> `action-planner` o `goldratts-brain`;
- proceso humano / equipo / cuello de botella -> `goldratts-brain`;
- sistema tecnico / app / API -> `zuckerbergs-mind`;
- HTML visual aislado sin narrativa -> `ui-architect`;
- PPTX editable directo -> `slides`.

Si hay duda: "¿Quieres que active Presentation Orchestrator?"

## Ruta del vertical

`Magnus (+ presentation-content-pill) construye el contenido` -> `Orchestrator emite el MD de handoff` -> `disruptive-presentations produce las slides (imagen/HTML) + el player`. `slides`/PPTX solo si el usuario pide export editable despues del QA visual.

---

## CONTEXTO A PEDIR (antes de construir)

Antes de correr la secuencia, asegurar respuestas a (preguntar lo que falte):

- **Modo comunicacional:** clase / keynote / comercial / tecnico / mixto. (Define los pesos — ver `presentation-content-pill`.)
- **Audiencia:** perfil, nivel, expectativas, que ya cree/sabe.
- **Objetivo:** que debe entender, decidir o hacer la audiencia.
- **Sensacion final** deseada.
- **Formato de sesion:** ponencia, clase, workshop, demo, comite, pitch, hibrido.
- **Branding:** colores, logo, plantilla, nivel de animacion. ¿La plantilla es marco rigido, flexible o referencia? (No asumir sobriedad.)
- **Datos reales:** ¿hay datos/proyectos/casos reales del usuario, o se generan ficticios marcados como demo?

### Protocolo de datos reales (CRITICO)
Cuando una slide involucra un proyecto, caso, cliente o cifra real del usuario, **pedir los datos explicitamente antes del handoff**. Nunca inventar ni usar genericos.
- Infraestructura/ingenieria: nombre oficial, tramo/ubicacion, longitud, tipo de intervencion, inversion, plazo, indicadores, entidad ejecutora.
- Comercial/empresarial: nombre del cliente, metricas, fechas/hitos, resultados verificados.
Si el usuario dice "inventalo para demo" -> marcar `[DATOS FICTICIOS — DEMO]` en el handoff.

---

## SECUENCIA DE CONSTRUCCION (la guia)

Correr en orden. En cada paso, **aplicar los criterios de la `presentation-content-pill`** (Magnus juzga; Orchestrator secuencia).

1. **Contexto** — tema, de donde viene el usuario, que ya sabe la audiencia.
2. **Audiencia** — tipo, nivel, expectativas.
3. **Objetivo** — que aprende / entiende / hace despues.
4. **Sensacion final** — que debe sentir al terminar.
5. **Experiencia y dinamicas** — ritmo, momentos clave, formato; si el formato permite interaccion, proponer dinamicas concretas (apertura, sondeo, mini-caso, Mentimeter/Kahoot/Miro, votacion, ejercicio, pausa de reflexion, reto) con sentido narrativo. No forzar interaccion en ponencia formal.
6. **Arco narrativo + Story Spine** — construir el spine antes de la secuencia. Template canonico y criterio en `presentation-content-pill` C6: `Antes -> Problema -> Giro -> Demostracion -> Resultado -> Frase madre`.
7. **Secuencia slide-by-slide** — para cada slide definir el contenido completo (ver campos del handoff abajo). Cada slide debe pasar la vara de la `presentation-content-pill` (un foco, carga de valor, nada-aleatorio, continuidad). Si una slide no mueve la historia -> fusionar, eliminar o volver apoyo.

### Matriz de dinamicas (si hay interaccion)
```
Momento · Dinamica · Herramienta · Pregunta/consigna · Duracion · Output esperado · Como conecta con la siguiente slide · Plan B
```

---

## OUTPUT: MD de handoff (el unico entregable de Orchestrator)

Orchestrator produce **un MD de estrategia/handoff** — NO HTML maestro, NO prompts de imagen (eso lo construye disruptive), NO PPTX. El MD contiene la estrategia (modo, story spine, arco) + el contrato por slide:

```markdown
# Handoff — [Nombre del deck]
Modo: [clase/keynote/comercial/tecnico/mixto]
Story spine: [antes / problema / giro / demostracion / resultado / frase madre]

## Slide [N]
- slide_id:
- tipo: [dato/tendencia/problema/explicacion/caso/demo/evidencia/arquitectura/comparativa/agenda-separador/CTA]
- rol narrativo:
- tesis de la slide:
- mensaje a instalar:
- frase del presentador:
- cambio esperado en la audiencia:
- texto visible exacto: [titulo / subtitulo / hasta 2 labels]
- carga de valor: [dato/tendencia/insight/evidencia/caso/comparacion/objecion/marco/beneficio/CTA]
- dato/fuente requerida: [si/no · fuente · año · o "pendiente"]
- evidencia/asset nativo requerido: [logos/grafico/tabla/screenshot/video/figura real]
- accion requerida del usuario: [adjuntar logo/captura/video/dato interno/caso real]
- restricciones de marca:
- notas internas (NO visibles en la slide):
- dinamica asociada (si aplica):
```

Si falta evidencia o branding, marcarlo como **decision pendiente** en el handoff. No inventar logos, cifras, capturas ni tablas. La eleccion de patron visual, layout, nivel de disrupcion y modo visual (analogy scene / artifact schematic / hybrid) la deriva `disruptive-presentations` a partir de este contrato — Orchestrator no la fija.

---

## MODO DE OPERACION

- **Modo Bloques (default cuando el brief es vago):** correr la secuencia por etapas, validando con el usuario antes de avanzar. Presentar una etapa, preguntar, esperar.
- **Modo Propuesta Completa (brief completo):** si el usuario entrega tema + audiencia + objetivo + sensacion + formato + restricciones (brief de estructura narrativa), condensar las etapas de contexto como confirmaciones y desarrollar arco + secuencia + handoff en un solo bloque. Cierre: "¿Algo que ajustar antes de pasar a produccion visual?"

**Validacion antes del handoff:** Orchestrator es co-diseno guiado. No se activa `disruptive-presentations` sin aprobacion explicita del usuario del plan/handoff. Una vez aprobado, dar paso a disruptive con el MD de handoff.

## Filosofia

- Una presentacion es una experiencia, no slides sueltas.
- Primero el contenido y la narrativa; la forma visual va despues (disruptive).
- Cada slide existe porque mueve la historia, no porque "toca cubrir un punto".
- Menos texto, mas impacto.

## Lo que Orchestrator NO hace

- No decide el criterio de contenido (eso es Magnus + `presentation-content-pill`).
- No decide layout, diagramacion, densidad, analogia visual ni saturacion (eso es `disruptive-presentations`).
- No genera HTML maestro, prompts de imagen, PPTX ni decks editables.
- No salta a produccion visual sin aprobacion del plan.
