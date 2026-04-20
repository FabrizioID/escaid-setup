---
name: premium-interactive-docs
description: Create premium interactive documentation in HTML first, with strong visual hierarchy, animations, atmosphere, diagrams, and later optional PDF or Miro adaptations. Use when Codex should explain a system, agent, workflow, manual, or operating guide as a visually rich interactive document rather than a plain markdown or static report.
---

# Premium Interactive Docs

Use this skill when the user wants documentation that feels like a polished product guide, interactive manual, visual system explainer, or premium long-form artifact.

This skill is for documentation that should do more than store facts.
It should help people understand, remember, present, and navigate a system.

## Quick Start

When this skill triggers:

1. Identify the system, workflow, agent, or process to explain.
2. Decide whether the output should be:
   - interactive `HTML`,
   - `HTML + PDF`,
   - or `HTML + PDF + Miro adaptation`.
3. Read [references/document-grammar.md](references/document-grammar.md).
4. Write three things before building:
   - visual thesis
   - content plan
   - interaction thesis
5. Build the `HTML` version first.
6. Only after the HTML is clear and visually strong, export to PDF or adapt further.

## Core Rule

Default workflow for premium documentation:

1. define what the document must explain
2. choose the dominant documentation pattern
3. build the interactive `HTML` master
4. validate hierarchy, readability, and motion
5. export to PDF if needed
6. adapt to Miro only if collaborative board usage is also required

Do not start from PDF or Miro when the user wants a high-design documentation artifact.

## Supported Document Types

Choose the closest primary type before writing:

- `system-guide` for architecture, operations, and technical-business systems
- `agent-manual` for assistants, bots, automations, and operating agents
- `workflow-guide` for end-to-end process explanation
- `playbook` for operational procedures, team instructions, and repeatable execution
- `showcase-doc` for presentation-ready explanation of a product, process, or system

## Visual Thesis

Write one short sentence that defines:

- mood
- material
- energy

Examples:

- dark control-room guide with ambient glow and calm motion
- editorial system manual with glass surfaces and precise color-coded blocks
- futuristic ops guide with cinematic hero, particles, and interactive reveals

## Content Plan

Default sequence:

1. hero
2. system overview
3. main flows or layers
4. key logic or decisions
5. outputs and consumption
6. risks, maintenance, or operating notes

Each section gets one job only.

## Interaction Thesis

Include 2-4 motion ideas that improve understanding or atmosphere.

Good defaults:

- custom cursor for premium desktop feel
- mouse glow for depth
- subtle particles or animated dot-grid for atmosphere
- scroll reveal by section
- hover lift on key blocks
- animated chat or message examples
- light hero reaction to mouse

Do not add motion that competes with clarity.

## HTML First

The HTML version is the source of truth.

When building it:

- design it as a long-form visual artifact, not as a markdown dump
- create a strong first screen
- keep the structure readable in a quick scroll
- combine explanation with visual grouping
- use semantic colors consistently
- split dense systems into clean sections instead of giant one-shot diagrams

## Documentation Grammar

Default visual ingredients:

- atmospheric background
- strong cover or hero
- section labels
- large uppercase section titles when the visual language supports it
- glass or low-chrome panels
- board-like diagrams
- grouped metrics, steps, timelines, or chat examples
- short labels with optional subtitles

## Export Rules

After the HTML is done:

- export to PDF only if the user needs a static shareable artifact
- remember that motion only exists in HTML
- keep PDF as a clean static snapshot, not as the primary design target

## Miro Relationship

If the user also needs Miro:

- use the HTML guide as the visual and structural master
- adapt the key diagrams, not the full experience
- explain clearly that motion, exact layout, and premium composition will not transfer exactly

## Non-Negotiable Rules

- Never begin with a plain markdown doc when the user explicitly wants premium visual documentation.
- Never let motion overpower hierarchy or reading.
- Never export without checking legibility of titles, blocks, and diagrams.
- Never treat PDF as the creative master when HTML is the richer medium.
- Never overload a page with too many visual tricks at once.
- Never use generic dashboard-card design for a premium guide unless the content truly needs app UI.

## Output Discipline

- State the chosen document type.
- State the visual thesis.
- State whether the artifact is `HTML only`, `HTML + PDF`, or `HTML + PDF + Miro`.
- Distinguish between the interactive master and static exports.
