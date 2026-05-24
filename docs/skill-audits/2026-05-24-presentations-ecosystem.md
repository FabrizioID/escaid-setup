# Auditoria - Presentaciones ESC-AI

Fecha: 2026-05-24

## Alcance

Revision del vertical de presentaciones:

- `presentation-orchestrator`
- `disruptive-presentations`
- `slides`
- `imagegen`

## Hallazgos

1. `presentation-orchestrator` y `disruptive-presentations` ya tenian una buena separacion: narrativa primero, produccion visual despues.
2. Faltaba un contrato compacto de vertical visible para agentes nuevos.
3. `slides` esta instalado como skill extra/local, pero no versionado dentro del repo `escaid-setup`. Debe tratarse como herramienta externa/base para PPTX editable.
4. `imagegen` es herramienta auxiliar, no deberia aparecer como ruta de arquitectura de presentacion.
5. Marp/reveal.js pueden potenciar decks Markdown/HTML, pero no deben desplazar el flujo ESC-AI full-image ni la ruta PptxGenJS para editabilidad.
6. Faltaba una referencia especifica para arquitectura visual y diagramacion: que usar para arquitectura, procesos, secuencias, estados, sistemas, funnels, decision trees, mapas interactivos y PPTX editable.

## Cambios aplicados

- Se agrego contrato de vertical en `presentation-orchestrator`.
- Se agrego contrato de input/output y manifest en `disruptive-presentations`.
- Se creo el baseline `docs/tool-verticals/presentaciones-potenciacion.md`.
- Se actualizo el mapa SkillOps para reflejar estado y reglas.
- Se agrego `skills/disruptive-presentations/references/visual-architecture-diagramming.md`.
- `presentation-orchestrator` ahora apunta a esa referencia antes del handoff cuando hay diagramacion o arquitectura visual.

## Decision operativa

Ruta default:

`presentation-orchestrator` -> `disruptive-presentations` -> HTML player -> `slides` solo si se pide PPTX editable.

No usar `slides` inmediatamente despues de Orchestrator salvo pedido explicito de PPTX/editabilidad.

No usar Marp/reveal.js como default; usarlos solo para decks tecnicos text-first o Markdown/HTML.

Para diagramacion:

- Mermaid: draft rapido en Markdown para flow, sequence, state y architecture.
- D2: arquitectura y sistemas con mejor estetica declarativa.
- Excalidraw/Miro: ideacion humana y workshops.
- React Flow: mapas interactivos o node editors.
- PptxGenJS/slides: diagramas PowerPoint editables.

## Prueba recomendada

1. Crear mini brief de 3 slides.
2. Ejecutar Orchestrator y generar handoff con campos completos.
3. Generar una slide con Disruptive.
4. Guardar PNG y manifest.
5. Abrir HTML player.
6. Solo si el usuario pide export, pasar a `slides`.
