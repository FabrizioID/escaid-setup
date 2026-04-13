---
name: interaction-memory
description: Capture, summarize, and persist important knowledge from relevant work sessions into reusable project memory. Use when Codex should open a dedicated memory folder for the current chat, document a thread continuously, save generated artifacts into the chat folder, or extract durable decisions, facts, status, and follow-ups from any interaction worth keeping.
---

# Interaction Memory

Persist relevant work outside the chat. Support both project-wide memory and chat-specific thread folders.

## Core Modes

Use one of these modes every time:

1. Thread mode:
   create or reuse a dedicated folder for the current chat and store chat-specific outputs there.
2. Shared mode:
   update the project's shared memory with knowledge that belongs to the whole project.
3. Mixed mode:
   save chat-local detail in the thread folder and also promote durable project-wide knowledge to shared memory.

## Thread Workflow

When the user says things like:

- document this chat
- create a folder for this chat
- everything from this chat goes here
- open a thread for this work
- save all generated files in this chat folder

do this:

1. Create a thread folder if it does not exist.
2. Put all relevant chat documentation there from that point onward.
3. Store generated documents and supporting notes in the same thread folder when appropriate.
4. Keep the thread folder as the default destination for later documentation in that chat unless the user changes it.

Prefer a structure like:

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

For templates and naming patterns, read [references/memory-templates.md](references/memory-templates.md).

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

Promote knowledge to shared memory only when it matters beyond this chat:

- project-wide decisions
- stable requirements
- business rules
- reusable workflows
- technical quirks
- important status changes

Do not pollute shared memory with chat-local noise.

## Writing Rules

- Write compact, durable notes.
- Separate confirmed facts from assumptions.
- Include dates when timing matters.
- Avoid repeated narration of the whole conversation.
- Never store secrets, tokens, or sensitive values.
- Keep one source of truth when possible.

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
