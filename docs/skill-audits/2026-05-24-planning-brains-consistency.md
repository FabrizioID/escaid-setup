# Audit - Planning Brains Consistency

Fecha: 2026-05-24

## Skills revisadas

- `presentation-orchestrator`
- `goldratts-brain`
- `zuckerbergs-mind`
- `action-planner`

## Hallazgos

- `action-planner` era demasiado amplio y podia capturar tareas que pertenecen a Goldratt, Zuckerberg, Marketing, Documentacion u Orchestrator.
- `presentation-orchestrator` tenia tension interna: declaraba que no disena visualmente, pero tambien exigia HTML maestro visual. Se aclaro que define contenido/handoff y `ui-architect` construye o pule la capa visual.
- `goldratts-brain` y `zuckerbergs-mind` todavia mencionaban `premium-interactive-docs`, que ya es legacy/deprecada.
- `goldratts-brain`, `zuckerbergs-mind` y `action-planner` seguian en gris en el mapa aunque ya tienen separacion y referencias externas.

## Correcciones

- Se agrego contrato de consistencia a las 4 skills.
- Se reforzaron reglas de no activacion.
- Se reemplazaron rutas legacy `premium-interactive-docs` por `documentador-experto` + `ui-architect`.
- Se ajusto `action-planner`: puede responder en propuesta completa si el brief esta claro, no debe forzar validacion etapa por etapa siempre.
- Se actualizo `SKILLOPS_MAP.md` con una regla explicita de separacion.

## Regla operativa

- Deck/slides/storytelling de presentacion -> `presentation-orchestrator`.
- Proceso humano/equipo/cuello de botella -> `goldratts-brain`.
- Sistema tecnico/software/API/automatizacion con codigo -> `zuckerbergs-mind`.
- Plan, roadmap, checklist o estructura ligera -> `action-planner`.
- HTML visual final -> `ui-architect`.

