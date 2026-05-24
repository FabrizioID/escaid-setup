# Planning Brains - Potenciacion Vertical ESC-AI

Fecha: 2026-05-24

## Objetivo

Potenciar `goldratts-brain`, `zuckerbergs-mind` y `action-planner` con una capa explicita de busqueda de alternativas reales antes de inventar una solucion propia.

## Separacion

| Skill | Dominio | No usar para |
| --- | --- | --- |
| `goldratts-brain` | Procesos humanos, operaciones, equipos, cuellos de botella | Arquitectura tecnica/software |
| `zuckerbergs-mind` | Apps, sistemas, APIs, automatizaciones tecnicas, software | Procesos humanos no tecnicos |
| `action-planner` | Ordenar ideas, clases, planes, roadmaps, checklists, experiencias | Software o procesos operativos complejos |

## Capa Nueva

Cada skill ahora tiene:

- `references/external-alternatives.md`

La regla comun:

Antes de proponer una solucion propia, buscar si ya existe:

- herramienta;
- plantilla;
- repo GitHub;
- ejemplo oficial;
- hilo Reddit/foro;
- framework;
- SaaS;
- MCP/API/SDK;
- playbook o caso real.

## Criterio

La busqueda no es para copiar. Es para decidir:

- adoptar;
- adaptar;
- ignorar;
- construir custom;
- automatizar despues.

## Fuentes Revisadas

- OMG BPMN y Camunda para procesos operativos/BPMN.
- GitHub awesome BPM, awesome architecture, software architecture/design pattern lists.
- C4 Model para arquitectura visual de software.
- ADR examples para registrar decisiones tecnicas.
- GitHub Topics/product-roadmap y awesome-agile para roadmaps.
- Reddit threads de automation/workflow para observar fricciones reales de herramientas.
