# Documentation Domain Contract

This vertical creates documentation knowledge. It does not replace the visual builder.

## Roles

| Skill | Role |
| --- | --- |
| `documentador-experto` | Chooses documentation strategy, audience, structure, depth and route. |
| `doc-desarrollos` | Produces domain content for technical tools/systems: user guide, technical docs, domain docs. |
| `doc-general` | Produces domain content for concepts, processes, manuals, playbooks and general guides. |
| `ui-architect` | Builds the final HTML visual/interactable artifact when requested. |
| `documentar-notion` | Publishes or updates structured content in Notion. |

## Routing

1. If the user asks to document a technical tool/system, use `doc-desarrollos`.
2. If the user asks to document a process, concept, guide, playbook or knowledge artifact, use `doc-general`.
3. If the user asks for HTML visual, interactive, premium, presentation-ready, dashboard-like or scroll experience, prepare a handoff and activate `ui-architect`.
4. If the user asks to save/register/archive in Notion, prepare structured content and activate `documentar-notion`.

## Required Handoff To UI Architect

When calling `ui-architect`, provide:

- document title and purpose;
- target reader;
- sections and hierarchy;
- exact copy or draft copy per section;
- key tables/checklists/diagrams;
- assets/screenshots available;
- visual thesis: mood, density, motion level, brand constraints;
- interaction needs: navigation, tabs, search, filters, accordions, timeline, cards, etc.;
- output constraints: static HTML, local file, project path, GitHub Pages/Vercel readiness.

## Required Handoff To Notion

When calling `documentar-notion`, provide:

- target workspace/account if known;
- target page/database or project;
- title;
- summary;
- structured sections;
- tags/properties;
- related project/thread if relevant;
- whether to create, append or update.

## Anti-Patterns

- Building polished HTML inside the documentation domain skill instead of using `ui-architect`.
- Publishing messy draft content to Notion without structure.
- Treating a technical manual and a conceptual guide as the same document.
- Copying internal prompt names or private agent mechanics into user-facing docs unless explicitly requested.
