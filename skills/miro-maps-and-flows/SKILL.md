---
name: miro-maps-and-flows
description: Design visual maps, flows, and board-ready system diagrams for Miro. Use when Codex should choose the right diagram family from user references, create a more expressive HTML/PDF version first when visual clarity matters, and then recreate the strongest possible Miro adaptation using docs, diagrams, and tables with honest limits.
---

# Miro Maps and Flows

Use this skill when the user wants a map, flow, board diagram, growth map, systemic map, persona board, onboarding map, or Miro-ready visual explanation.

This skill is not only for drawing arrows.
Its job is to choose the right diagram language, make the structure understandable fast, and adapt the result to the real limits of Miro.

## Quick Start

When this skill triggers:

1. Read [references/diagram-families.md](references/diagram-families.md).
2. Identify whether the user needs:
   - a direct Miro-operational artifact,
   - a premium visual explanation,
   - or both.
3. If visual clarity, editorial hierarchy, or creative freedom matter, build the premium `HTML/PDF` version first.
4. Then recreate the strongest possible adaptation in Miro.
5. Be explicit about what was preserved and what Miro cannot reproduce exactly.

## Core Rule

Default sequence for high-importance visual work:

1. define the diagram family from the request and references
2. create the premium visual version in `HTML/PDF`
3. validate clarity, labels, hierarchy, and visual rhythm
4. adapt that version into Miro
5. explain any loss of fidelity honestly

If the user asks for a simple operational flow and does not need visual polish, you may go directly to Miro.

## Routing

Use the first route that matches:

1. If the user shares references and wants something `xvr`, editorial, premium, or presentation-ready, read [references/diagram-families.md](references/diagram-families.md) and create `HTML/PDF` first.
2. If the user wants a collaborative board artifact, recreate the approved structure in Miro after the premium pass.
3. If the user only wants a quick internal flow, still choose a diagram family first, then simplify it for Miro.
4. If the user asks why Miro cannot match the premium version exactly, explain the constraint clearly:
   Miro MCP supports documents, diagrams, and tables, but not freeform art direction or pixel-perfect manual layout.

## Diagram Selection

Choose one primary family before drawing:

- `growth-map` for funnel logic, conversion systems, retention, nurturing, reactivation
- `systemic-map` for architecture, layers, operating models, roles, and data systems
- `persona-board` for user psychology, motivations, objections, pains, and context
- `onboarding-flow` for journeys, product stages, automation sequences, and lifecycle transitions
- `bpmn-clean` for process accountability, swimlane-like logic, and operational handoffs

Avoid defaulting to a generic flowchart when another family explains the system better.

## HTML/PDF First

When the work needs explanation quality or visual freedom:

- compose the piece like a board, not like a code diagram
- use bands, strong headers, semantic color blocks, and a clear focal node
- keep labels short and layered:
  title + optional subtitle
- make the main path visually dominant
- move secondary notes, legends, and commentary outside the main route
- split giant systems into modular pieces when one diagram becomes cognitively heavy

Use the premium version as the source of truth for Miro adaptation.

## Miro Adaptation Rules

When recreating in Miro:

- preserve the structure first:
  bands, layers, decision node, grouped blocks, loops
- prioritize readability over literal imitation
- use documents for explanatory context
- use diagrams for structured relationships
- use tables only when tabular scanning is better than arrows or blocks
- keep one visual family per board area
- prefer several smaller pieces over one giant board dump

## Non-Negotiable Rules

- Never claim Miro will look identical to the premium version if the tooling cannot support it.
- Never skip diagram-family selection on visual work.
- Never ship a premium export without checking that labels fit and diagrams render correctly.
- Never use long operational sentences inside nodes when a short strategic label will do.
- Never overload one board when modular diagrams would explain the system better.

## Output Discipline

- State the chosen diagram family.
- State whether the work followed `HTML/PDF -> Miro` or `direct Miro`.
- Distinguish the premium master from the Miro adaptation.
- When references were provided, mention which visual principles were reused.
