# Visual Architecture And Diagramming Grammar

Use this reference when a slide, deck, HTML player or handoff needs a diagram, architecture map, system map, process flow, thesis model, funnel, decision tree, data lineage, or cross-variable visual explanation.

## Principle

A diagram is not decoration. It must encode a decision:

- what is the system?
- what moves?
- what blocks?
- what changes state?
- what is upstream/downstream?
- what is optional vs mandatory?
- what is evidence vs inference?
- what must the audience decide after seeing it?

Before choosing a visual style, classify the diagram family.

## Diagram Families

| Family | Use when | Best route |
| --- | --- | --- |
| Architecture map | Services, resources, MCPs, repos, APIs, cloud, CI/CD, data stores | D2 or Mermaid architecture; for final slide, disruptive full-image can stylize it |
| Process flow | Steps, handoffs, approvals, automation, operating workflows | Mermaid flowchart for draft; D2 for polished structure; Miro for workshop boards |
| Sequence | API calls, agent/tool interactions, user-system exchanges | Mermaid sequence diagram |
| State machine | Status transitions, lead states, workflow states, lifecycle | Mermaid state diagram |
| System-of-systems | Multiple projects, tools, humans, memory, feedback loops | D2, Miro, or custom artifact schematic |
| Conceptual model | Thesis framework, strategic model, mental model, hierarchy | Custom artifact schematic, not raw Mermaid |
| Funnel/journey | Marketing, onboarding, sales, learning progression | Custom artifact schematic or Miro |
| Decision tree | Branching logic, triage, qualification, routing | Mermaid for draft; custom schematic for final |
| Interactive node map | User must drag, inspect, collapse, filter or edit nodes | React Flow |
| Sketch / human explanation | Early ideation, workshops, messy team/process maps | Excalidraw or Miro |
| Editable PowerPoint diagram | Final PPTX must remain editable | `slides`/PptxGenJS native shapes |

## Tool Selection

### Mermaid

Use for fast, portable, Markdown-native diagrams:

- flowcharts;
- sequence diagrams;
- state diagrams;
- class/entity sketches;
- architecture-beta drafts.

Strength: easy to store in Markdown and Git, fast for docs.

Limit: visual quality can become generic in high-stakes slides. Use as structure source, then convert into a stronger full-image or PPTX-native version if presentation quality matters.

### D2

Use for polished declarative architecture diagrams:

- software/system architecture;
- resource maps;
- network/data flow;
- diagrams that need themes, sketch mode, ELK layouts, Markdown blocks, icons or animation.

Strength: better visual output and layout control than many quick diagram DSLs. Good for technical documentation and architecture maps.

Limit: still a diagram language; for persuasive slides, treat D2 output as skeleton/evidence and make the final slide explain the insight.

### Excalidraw

Use for human, sketch-like thinking:

- workshops;
- high-level system diagrams;
- messy architecture drafts;
- stakeholder alignment maps.

Strength: low-friction, human-looking, good library ecosystem for system design components.

Limit: not ideal for deterministic, versioned, programmatic diagrams unless an Excalidraw API/MCP route is available and approved.

### React Flow

Use when the output is an interactive application or node editor:

- drag/drop workflow builder;
- MCP map explorer;
- Second Brain graph;
- automations map;
- dependency explorer.

Strength: ready node interactions, panning, zooming, selection and custom nodes.

Limit: overkill for static slides. Use only if interaction is the product.

### PptxGenJS / slides

Use when the final requirement is editable PowerPoint:

- native text boxes;
- native shapes;
- native charts;
- editable tables;
- slide validation and rendering.

Strength: maintains editability. Good downstream after full-image QA if user asks for PPTX.

Limit: not the default disruptive visual generation route.

## Slide Conversion Rule

For high-stakes presentation slides:

1. Draft structure in Mermaid, D2, Miro, Excalidraw, or plain text.
2. Extract the diagram thesis: what the audience must understand.
3. Decide visual mode:
   - `artifact schematic` for operational clarity;
   - `analogy scene` for emotional opening/closing/tension;
   - `hybrid` when a metaphor supports a real system map.
4. Keep visible text minimal: 1 title, 1 anchor phrase, up to 2 labels.
5. Keep internal logic out of the slide image.
6. If factual fidelity matters, preserve original evidence assets in a quiet zone or export later with `slides`.

## Layout Heuristics

- Use left-to-right for time, process, causality and pipelines.
- Use top-to-bottom for hierarchy, governance, responsibility and decomposition.
- Use center-out for ecosystem maps, platforms, hubs and orchestration.
- Use layered bands for maturity, levels, control planes or architecture strata.
- Use swimlanes for responsibilities across people/tools/departments.
- Use matrix only when comparison is the actual point.
- Use radial only when there is a real center of gravity.
- Use Sankey-like width only when quantity/volume is meaningful and sourced.

## Anti-Patterns

- Icon grids that do not explain causality.
- Generic SaaS dashboards pretending to be architecture.
- Decorative node clouds with no directional meaning.
- Too many arrows with no hierarchy.
- Every node same size when importance differs.
- Using Mermaid/D2 output raw when the deck needs persuasion.
- Using generated image for real charts/tables/logos when fidelity matters.

## Source Notes

Primary references checked:

- Mermaid official docs: flowchart, sequence, state and architecture diagrams.
- D2 official docs: declarative diagramming, themes, sketch mode, animation, Markdown and CLI workflow.
- Excalidraw libraries: system design and architecture component libraries.
- React Flow official docs: customizable React component for node-based editors and interactive diagrams.
- PptxGenJS official docs: native PowerPoint objects including text, tables, images and charts.
