# Visual Architecture And Diagramming Grammar

Use this reference when a slide, deck, HTML player or handoff needs a diagram, architecture map, system map, process flow, thesis model, funnel, decision tree, data lineage, or cross-variable visual explanation.

This reference does not change the production engine. In ESC-AI presentations, `disruptive-presentations` still generates the final slide with the image tool by default. Mermaid, D2, Excalidraw, Miro, React Flow and PptxGenJS are used here as structural references: they help choose the layout grammar, diagram family, reading path and template logic. Do not switch to those tools as output generators unless the user explicitly asks for editable code, workshop board, interactive app, or PPTX export.

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

| Family | Use when | Structural pattern for the image prompt |
| --- | --- | --- |
| Architecture map | Services, resources, MCPs, repos, APIs, cloud, CI/CD, data stores | D2/Mermaid-like grouped services, layers, resource nodes and directional edges |
| Process flow | Steps, handoffs, approvals, automation, operating workflows | Mermaid/D2-like left-to-right flow, swimlanes, gates and feedback loops |
| Sequence | API calls, agent/tool interactions, user-system exchanges | Mermaid-like lifelines, ordered messages and returns |
| State machine | Status transitions, lead states, workflow states, lifecycle | Mermaid-like states, transitions, terminal states and exception paths |
| System-of-systems | Multiple projects, tools, humans, memory, feedback loops | D2/Miro-like ecosystem map with hubs, layers, feedback loops and boundaries |
| Conceptual model | Thesis framework, strategic model, mental model, hierarchy | Custom artifact schematic, not raw Mermaid |
| Funnel/journey | Marketing, onboarding, sales, learning progression | Custom artifact schematic or Miro |
| Decision tree | Branching logic, triage, qualification, routing | Mermaid-like branching, yes/no gates and terminal outcomes |
| Interactive node map | User must drag, inspect, collapse, filter or edit nodes | React Flow-like node/edge grammar only if making an app; for slides, use static node-map composition |
| Sketch / human explanation | Early ideation, workshops, messy team/process maps | Excalidraw/Miro-like informal board grammar |
| Editable PowerPoint diagram | Final PPTX must remain editable | Use `slides`/PptxGenJS only in export phase; for image slides, imitate native shape clarity |

## Structural References, Not Default Generators

### Mermaid

Use its grammar as reference for:

- flowcharts;
- sequence diagrams;
- state diagrams;
- class/entity sketches;
- architecture-beta drafts.

Strength as reference: forces clean direction, named states, clear edges and explicit branching.

Do not render raw Mermaid as the final slide unless the user asks for docs/Markdown output. For `disruptive-presentations`, translate Mermaid-like logic into the image prompt's composition.

### D2

Use its grammar as reference for:

- software/system architecture;
- resource maps;
- network/data flow;
- diagrams that need themes, sketch mode, ELK layouts, Markdown blocks, icons or animation.

Strength as reference: good grouped nodes, container boundaries, clean architecture topology and layout logic.

Do not route final slide generation to D2 unless the user asks for a `.d2` artifact. For image slides, use D2-like grouping and edge logic inside the final prompt.

### Excalidraw

Use its grammar as reference for:

- workshops;
- high-level system diagrams;
- messy architecture drafts;
- stakeholder alignment maps.

Strength as reference: good for human-readable board layouts, loose clusters, annotations and tangible components.

Do not create Excalidraw artifacts from this skill unless the user asks for a board/sketch output. For image slides, borrow the informal board grammar if it helps comprehension.

### React Flow

Use its grammar as reference only when the visual needs to feel like a node editor:

- drag/drop workflow builder;
- MCP map explorer;
- Second Brain graph;
- automations map;
- dependency explorer.

Strength as reference: clear nodes, handles, edges, zoomable canvas logic and inspectable systems.

Do not use React Flow for static slides. Use it only if the deliverable is an interactive app or if the user asks for a node-map UI.

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

1. Select a structural grammar inspired by Mermaid, D2, Miro, Excalidraw, React Flow, PptxGenJS or plain text.
2. Extract the diagram thesis: what the audience must understand.
3. Decide visual mode:
   - `artifact schematic` for operational clarity;
   - `analogy scene` for emotional opening/closing/tension;
   - `hybrid` when a metaphor supports a real system map.
4. Keep visible text minimal: 1 title, 1 anchor phrase, up to 2 labels.
5. Keep internal logic out of the slide image.
6. If factual fidelity matters, preserve original evidence assets in a quiet zone or export later with `slides`.
7. Generate the final slide with the image tool unless the user explicitly requested a different artifact type.

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
