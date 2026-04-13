---
name: interaction-memory
description: Capture, summarize, and persist important knowledge from relevant work sessions into reusable project memory. Use when Codex should document discoveries, decisions, constraints, requirements, workflows, status changes, source-of-truth updates, or any interaction whose value should survive beyond the current chat.
---

# Interaction Memory

Persist only the knowledge that will matter later. Turn relevant interactions into clean project memory instead of leaving them trapped in chat history.

## Workflow

1. Decide whether the interaction is memory-worthy.
2. Extract only durable knowledge:
   decisions, facts, constraints, risks, patterns, definitions, workflow changes, status updates, or source links.
3. Ignore transient chatter, failed ideas, repeated reasoning, and obvious task execution noise.
4. Store each insight in the smallest correct place.
5. Keep the project's source of truth updated before adding parallel notes.
6. End with a short summary of what was persisted and where.

## Memory-Worthy Signals

Persist when the interaction creates or clarifies:

- a project decision with rationale
- a requirement, objective, or scope boundary
- a business rule or operating constraint
- an important technical pattern or quirk
- a current status change that others will need later
- a reusable workflow or runbook step
- a validated source, link, or artifact worth reusing
- a risk, assumption, or open question that should remain visible

Do not persist:

- casual back-and-forth
- duplicate explanations already captured elsewhere
- secrets, tokens, API keys, or sensitive personal data
- low-signal implementation logs unless they reveal a durable lesson

## Storage Rules

Use the existing project structure when present. If memory is missing, create a lightweight structure before writing.

Prefer this order:

- update `README.md` when the canonical project overview changed
- update `docs/` when a formal explanation or workflow changed
- update `memory/decisions.md` for decisions with rationale
- update `memory/facts.md` for stable facts and constraints
- update `memory/status.md` for current state, next steps, and blockers
- update `memory/open-questions.md` for unresolved but important items
- update `sources/` or `references/` indexes when new evidence matters

Do not scatter the same fact across many files. Keep one source of truth and add cross-references only when needed.

## Writing Rules

- Write in compact, high-signal bullets or short sections.
- Prefer concrete statements over narration.
- Include dates when timing matters.
- Mark assumptions clearly.
- Separate confirmed facts from hypotheses.
- Name the impact of a decision, not just the decision itself.
- When capturing status, include current state, why it changed, and what comes next.

## Standard Output Shapes

Use these patterns when useful:

- Decision:
  date, decision, rationale, impact, follow-up
- Fact:
  statement, evidence/source, confidence, last verified
- Status:
  current state, completed, next actions, blockers
- Workflow note:
  trigger, procedure, exceptions, owner
- Open question:
  question, why it matters, what is needed to resolve it

## File Creation Policy

Create new memory files only when they reduce confusion. Default to a small set of stable files instead of many tiny notes.

If no memory structure exists, start with:

- `memory/decisions.md`
- `memory/facts.md`
- `memory/status.md`
- `memory/open-questions.md`

For templates and suggested layouts, read [references/memory-templates.md](references/memory-templates.md).
