---
name: disruptive-presentations
description: Capa de ejecucion del vertical de presentaciones. Toma el MD de handoff de presentation-orchestrator y produce un MD de PROMPTS completo por slide, listo para pegar en ChatGPT Image / GPT Image 2. Tiene las MODALIDADES (comercial/keynote/tecnico/clase, escalera de disrupcion, libreria de patrones y tecnicas) y el pipeline que escribe los prompts. NO decide criterio de contenido (eso es presentation-content-pill) ni criterio de calidad visual transversal (eso es presentation-visual-pill). NO genera imagenes ni HTML por defecto.
---

# Disruptive Presentations

Capa de **ejecucion** del vertical. Convierte el contenido (ya decidido por Magnus) en **prompts de imagen** listos para producir.

- **Input:** el MD de handoff de `presentation-orchestrator` (contrato por slide).
- **Output:** **UN MD de prompts completo por slide**, numerado, listo para copiar y pegar en ChatGPT Image / GPT Image 2.
- **NO** genera imagenes dentro de la skill, **NO** arma HTML/player, **NO** PPTX — por defecto. (Esas rutas viven en `references/legacy-html-imagen4.md`, solo si el usuario las pide.)

## Reparto (de donde viene cada cosa)

| Quien | Aporta |
|---|---|
| `presentation-content-pill` (Magnus) | el CONTENIDO/mensaje — ya viene resuelto en el handoff |
| `presentation-visual-pill` (Magnus) | el CRITERIO de calidad visual transversal (glow, premium, image roles, foto-worthy, densidad, jerarquia, profundidad, texto minimo) |
| `brand-genplus-pill` o branding del cliente | la marca (paleta, tipografia, firma) |
| **`disruptive-presentations` (esta skill)** | las MODALIDADES + el pipeline que escribe el MD de prompts |

Disruptive APLICA los criterios de la `presentation-visual-pill` al escribir cada prompt; no los redefine.

## Input — MD de handoff
Consumir el contrato por slide del orchestrator: `tesis`, `mensaje a instalar`, `texto visible exacto`, `carga de valor`, `dato/fuente`, `evidencia/asset requerido`, `restricciones de marca`, `notas internas (no visibles)`. Si llega sin estructura, construir el payload minimo antes de prompear. Si falta evidencia, logo o dato real -> marcar pendiente o pedirlo; **nunca inventar**.

## Output — MD de prompts (el unico entregable por defecto)
Un MD con todos los prompts numerados y completos. Por slide:
```markdown
## SLIDE 01 — [nombre]
> Modo: [comercial/keynote/tecnico/clase] · Patron/tecnica: [nombre] · Disrupcion: [normal/suave/fuerte]
> Accion del usuario (fuera del prompt): [adjuntar logos/captura/video real si aplica]

[PROMPT FINAL COMPLETO — escena base, visual, proporciones/safe zones, texto visible,
marca, directiva de calidad, y como ultima linea el language lock]
```
El usuario abre el MD, copia el prompt 1, lo pega en su generador, sigue con el 2. Sin friccion. Si faltan logos/capturas exactas: instruir reservar placeholders limpios, no inventar.

## MODALIDADES (lo que decide disruptive)

### Modos comunicacionales + dosing
| Modo | Analogia | Disrupcion | Evidencia | Energia visual |
|---|---|---|---|---|
| Clase/formacion | media-alta | media-alta | media | analogias memorables, diagramas explicativos |
| Keynote/vision | media-alta | media | media | escena controlada, tesis visual, recordacion |
| Comercial/venta | muy baja | baja | muy alta | datos, assets reales, prueba, comparacion limpia |
| Tecnico/implementacion | baja | baja-media | alta | arquitectura, proceso, matrices |
| Mixto | declarado por slide |

Regla comercial: no vender ilusion, vender realidad demostrable (datos con fuente, capturas, demos, casos). Evitar analogias grandes, futurismo y "IA magica".

### Escalera de disrupcion + ritmo
- Normal/schematic: agenda, definiciones, tablas, recap (limpio, premium pero quieto).
- Suave: conceptos, metodos, comparaciones (diagrama como argumento).
- Fuerte: apertura, tension central, cambio de paradigma, cierre (analogia como escena).
- Ritmo de deck 10-20 slides: >=2 fuertes, 4-7 suaves, resto normal. Nunca todas fuertes ni todas planas.

### Libreria (referencias — no duplicar inline)
- Patrones comerciales (evidence/comparison/funnel/iceberg/bridge...) -> `references/commercial-disruptive-patterns.md`.
- 20 tecnicas de disrupcion + HTML shell + ejemplo anotado -> `references/full-reference.md`.
- Gramatica de diagrama (familias, layout heuristics, anti-patterns) -> `references/visual-architecture-diagramming.md`.

## PIPELINE (handoff -> prompt)
1. **Interpretacion semantica:** escribir la tesis `esta slide comunica X a traves de Y`. Si es debil, no prompear aun.
2. **Analogy gate:** ¿analogia si/no? Si si, evaluar 3 opciones y elegir la de mayor similitud estructural (no la mas espectacular); mantener familia coherente por seccion.
3. **Modo visual:** `analogy scene` (apertura/tension/cierre) · `artifact schematic` (operativo/datos) · `hybrid`.
4. **Layout:** derivar del modo + patron; nunca repetir el patron de la slide anterior (pill V6).
5. **Ensamblar prompt:** orden = escena base -> visual principal -> proporciones/safe zones -> texto visible (max 1 titulo + 1 ancla + 2 labels) -> marca -> directiva de calidad -> language lock (ultima linea). Aplicar `presentation-visual-pill` (glow por modo, premium no flat, image acompaña/comunica, profundidad por luz no efectos) + la marca activa.
6. **QA del prompt** antes de meterlo al MD (ver gate abajo).

## Reglas de fidelidad
- **Evidencia nativa:** charts, tablas, capturas, logos, figuras reales NO se redibujan — reservar zona limpia / insertar aparte; nunca pedir al generador que invente datos o logos.
- **Reconstruccion verificada:** interfaces reales (n8n, Make, Notion, Revit, Civil 3D, ETABS, dashboards) -> buscar referencia oficial y replicar con fidelidad; prohibido inventar nodos, iconos, colores o layouts.
- **Brand lock:** si hay paleta de marca, sobreescribe defaults tematicos; expresar riesgo/prioridad con escala/posicion/contraste, no con colores semanticos, salvo permiso.
- **Language lock:** todo texto visible en el idioma pedido; ultima linea del prompt.
- **Provenance / no-recycle:** produccion fresca por pase; no reusar prompts/imagenes viejas como validas sin QA.

## QA GATE (antes de entregar el MD de prompts)
- ¿El prompt hace que la imagen comunique el concepto antes de leer el texto?
- ¿Un solo foco, <=4 elementos de texto, foto-worthy?
- ¿Glow correcto para el modo (pill V1) — sin efectos de IA en comercial/tecnico?
- ¿Premium, no flat/cartoon? ¿Profundidad por luz, no por glow?
- ¿Evidencia real reservada (no redibujada)? ¿Interfaces reales por reconstruccion fiel?
- ¿El patron difiere del de la slide anterior?
Si falla: reescribir el prompt, cambiar analogia o cambiar patron.

## Lo que disruptive NO hace
- No decide el contenido/mensaje (vino en el handoff; criterio en `presentation-content-pill`).
- No decide el criterio de calidad visual transversal (lo manda `presentation-visual-pill`).
- No genera imagenes, HTML ni PPTX por defecto — produce el MD de prompts. Legacy (HTML/Imagen4/Canva/player) solo si el usuario lo pide -> `references/legacy-html-imagen4.md`.
