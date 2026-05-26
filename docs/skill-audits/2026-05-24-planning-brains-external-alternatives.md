# Auditoria - Planning Brains External Alternatives

Fecha: 2026-05-24

## Alcance

- `goldratts-brain`
- `zuckerbergs-mind`
- `action-planner`

## Hallazgos

1. Las tres skills ya tenian algun criterio de referencias externas.
2. Faltaba hacerlo explicito como busqueda de alternativas reales ya existentes.
3. Faltaba nombrar GitHub, Reddit, herramientas, plantillas, SDKs/MCPs, BPMN, ADR/C4 y productos comparables.
4. Faltaba separar la evaluacion por dominio para no buscar lo mismo en operaciones, software y planes.

## Cambios

- Se agrego `references/external-alternatives.md` a cada skill.
- Se reforzaron etapas de busqueda en los tres `SKILL.md`.
- Se creo `docs/tool-verticals/planning-brains-potenciacion.md`.

## Decision

Estas skills ahora deben comparar alternativas existentes antes de recomendar construccion custom cuando el problema lo amerite.
