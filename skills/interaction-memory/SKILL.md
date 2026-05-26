---
name: interaction-memory
description: Capture, summarize, and persist important knowledge from relevant work sessions into reusable project memory without polluting Second Brain. Use when Codex should extract durable decisions, facts, criteria, status, follow-ups, artifacts, or session summaries; when there is an active strategic project, route canonical threads through project-thread-assistant under second-brain/inteligencia/<proyecto>/threads/.
---

# Interaction Memory

Persist relevant work outside the chat. This skill is a lightweight capture and promotion layer. It does not replace `project-thread-assistant` for canonical strategic threads.

## SkillOps Contract

Use this skill to decide what is worth remembering and where it belongs.

Canonical priority:

1. If there is an active project in Second Brain, use `project-thread-assistant` for thread files in `second-brain/inteligencia/<proyecto>/threads/`.
2. Use `interaction-memory` to extract durable facts, decisions, criteria, status, follow-ups and artifact notes from the current session.
3. Promote only stable reusable knowledge to `second-brain/inteligencia/<proyecto>/memory/`.
4. Promote cross-project ideas only to `second-brain/MASTER_IDEAS.md` when they affect more than one project.
5. If there is no active project, create a local lightweight memory folder only when the user explicitly asks to document/save/track the chat.

Do not create parallel strategic memory under random `memory/chats/` folders when a Second Brain project exists.

## Core Modes

Use one of these modes every time:

1. Second Brain capture mode:
   summarize the session, then route canonical thread work to `project-thread-assistant`.
2. Promotion mode:
   promote durable knowledge into project memory files such as facts, decisions, criteria, variables, tensions or status.
3. Local thread mode:
   create or reuse a dedicated folder for the current chat only when no Second Brain project exists or the user asks for local artifact organization.
4. Mixed mode:
   save chat-local artifacts and also promote durable knowledge to Second Brain memory.

## Thread Workflow

When the user says things like:

- document this chat
- create a folder for this chat
- everything from this chat goes here
- open a thread for this work
- save all generated files in this chat folder

first determine whether there is an active Second Brain project.

If a project exists, prefer:

```text
second-brain/inteligencia/<proyecto>/threads/<YYYY-MM-DD>-<slug>.md
```

and route thread creation/update/closure to `project-thread-assistant`.

If no project exists or the user explicitly wants a local chat folder, do this:

1. Create a thread folder if it does not exist.
2. Put all relevant chat documentation there from that point onward.
3. Store generated documents and supporting notes in the same thread folder when appropriate.
4. Keep the thread folder as the default destination for later documentation in that chat unless the user changes it.

Prefer this local fallback structure:

```text
memory/
|-- shared/
|   |-- decisions.md
|   |-- facts.md
|   |-- status.md
|   `-- open-questions.md
`-- chats/
    `-- <thread-name>/
        |-- plan.md
        |-- summary.md
        |-- decisions.md
        |-- pending.md
        `-- artifacts/
```

For templates, naming patterns and the Second Brain mapping, read [references/memory-templates.md](references/memory-templates.md).

## Thread Naming

If the user gives a thread name, use it.

If not, derive a short slug from the topic, for example:

- `setup-mcps`
- `branding-escaid`
- `assistant-knowledge-base`

If ambiguity remains, include the date prefix:

- `2026-04-13-setup-mcps`

Use lowercase letters, digits, and hyphens only.

## What Goes In The Thread Folder

Use:

- `plan.md` for plans, scope, and working goals created in this chat
- `summary.md` for condensed session summaries
- `decisions.md` for chat-local decisions and rationale
- `pending.md` for next steps, blockers, and unresolved tasks
- `artifacts/` for files generated during the chat when they belong to this thread

If a file is created before documentation starts but clearly belongs to the thread, move or copy it into the thread folder and note that action in the summary.

If the thread folder already exists before the user says "document", do not create a second folder. Start writing into the existing one.

## Shared Memory Rules

Promote knowledge to shared/project memory only when it matters beyond this chat:

- project-wide decisions;
- stable requirements;
- business rules;
- reusable workflows;
- technical quirks;
- important status changes;
- criteria Magnus should apply again;
- variables or tensions that change future decisions.

Do not pollute shared memory with chat-local noise.

## Promotion Targets In Second Brain

When a project exists, use these targets:

| Knowledge type | Target |
| --- | --- |
| Session detail | `threads/<fecha>-<slug>.md` via `project-thread-assistant` |
| Stable fact | `memory/facts.md` |
| Decision | `memory/decisions.md` |
| Reusable criterion | `memory/criteria.md` |
| Active tension/risk | `memory/tensions.md` |
| Variable to track | `memory/variables.md` |
| Current state | `memory/status.md` |
| External signal | `signals/<fecha>-<slug>.md` |
| Strategic synthesis | `analysis/<fecha>-<slug>.md` |
| Cross-project idea | `second-brain/MASTER_IDEAS.md` |

If unsure whether to promote, list candidates and ask/mark as pending rather than writing noisy memory.

## Writing Rules

- Write compact, durable notes.
- Separate confirmed facts from assumptions.
- Include dates when timing matters.
- Avoid repeated narration of the whole conversation.
- Never store secrets, tokens, or sensitive values.
- Keep one source of truth when possible.
- Use dates for decisions, status and facts that can decay.
- Prefer bullets with source/context over transcript-like prose.
- Preserve uncertainty: label assumptions and confidence.

## Standard Actions

When the user asks to document the current chat, do one or more of these actions:

- open thread folder
- update `plan.md`
- append a session summary
- record decisions
- record pending items
- save or relocate generated artifacts
- promote shared knowledge if warranted

## Retroactive Documentation

If the user asks to document the chat late:

1. Create the thread folder.
2. Reconstruct only the important outcomes from the current chat.
3. Save concise summaries, not full transcript dumps.
4. Move important artifacts into the thread folder when useful.

## Default Behavior

- If a thread folder is already established for the current chat, keep documenting there.
- If no folder exists yet, do not create one automatically unless the user explicitly asks to document, save, track, or open a thread.
- If the user asks to document "this chat", default to thread mode.
- If the user asks to "update project memory", default to shared mode.
- If a Second Brain project is active, default to Second Brain capture mode and coordinate with `project-thread-assistant`.
