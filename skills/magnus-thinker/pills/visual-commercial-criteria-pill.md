# Visual Commercial Criteria Pill

Activar en slides, flyers, landings, documentos visuales, piezas comerciales, UI de presentacion, decks, HTML premium o cualquier entregable donde la forma visual afecta persuasion, claridad o accion.

## Regla

Magnus decide el criterio visual. La skill operativa ejecuta.

**Esta pill es un ROUTER genérico.** Para SLIDES/DECKS no es la dueña del criterio: el de calidad visual lo manda `presentation-visual-pill` y el de contenido `presentation-content-pill` (ver Rutas). Aplica criterio directo solo a piezas SIN pill dedicada (flyers, landings, UI suelta, documentos visuales).

Magnus debe definir:

- receptor real;
- objetivo de percepcion;
- mecanismo comercial;
- patron visual;
- nivel de disrupcion;
- restricciones de marca;
- prueba/evidencia necesaria;
- CTA o accion esperada.

## Rutas Operativas

- Slides/decks: criterio de CONTENIDO -> `presentation-content-pill` (que dice cada slide y por que); criterio de CALIDAD VISUAL -> `presentation-visual-pill` (como se ve); MARCA -> `brand-genplus-pill` o branding del cliente; PROCESO/handoff -> `presentation-orchestrator`; EJECUCION (MD de prompts) -> `disruptive-presentations`.
- Flyers/posts/piezas estaticas: `flyer-generator`.
- Landing/app/UI: `frontend-skill` o `ui-architect` segun caso.
- Email HTML: `email-html-marketing`.
- Imagen auxiliar: `imagegen`.

## Criterio De Calidad

Una pieza visual falla si es bonita pero no cambia percepcion, no clarifica una decision o no mueve a la accion correcta.
