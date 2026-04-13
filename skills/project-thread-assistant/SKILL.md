---
name: project-thread-assistant
description: Run a persistent local assistant with memory organized by chat thread plus shared project knowledge. Use when Codex should open or reuse a thread folder, document relevant work into `assistant/`, preserve generated artifacts, promote durable knowledge to shared memory, or operate with connected apps using the active thread as context.
---

# Project Thread Assistant

Operate a persistent assistant whose memory lives in the workspace under `assistant/`.

Use this skill to keep continuity across chats, preserve reusable context, and anchor app operations to the current thread instead of relying on transient conversation context.

## Quick Start

When invoked, do this first:

1. Confirm that the workspace has an `assistant/` folder.
2. Read `assistant/AGENT.md`.
3. Read `assistant/index/project-map.md`.
4. Identify the active thread, or create one if the user names a new topic.
5. Read the active thread's `summary.md`, `decisions.md`, and `pending.md`.
6. Read shared memory only after the thread.

If the workspace does not have the expected structure, create it before continuing.

If `assistant/scripts/open_thread.py` exists, prefer it for opening or resuming a thread and updating the index.

For layout details and file semantics, read [references/memory-layout.md](references/memory-layout.md).

## Supported User Intents

Treat requests like these as direct triggers:

- `abre un hilo <tema>`
- `documenta este chat`
- `ingesta este archivo en el hilo actual`
- `promueve esto a shared`
- `genera este entregable en el hilo`
- `usa este hilo como contexto para trabajar con apps`

Also use this skill when the user wants:

- a personalized assistant with persistent memory
- continuity across multiple chats
- documentation that survives context window limits
- app actions anchored to a specific thread of work

## Core Modes

Use one or more of these modes on every invocation:

1. Open or resume thread
2. Capture thread memory
3. Promote to shared memory
4. Ingest a source into the active thread
5. Save a generated artifact into the thread
6. Use the active thread as context for app work

## Thread Workflow

When opening or resuming a thread:

1. Choose or derive the slug.
2. Prefer `python assistant/scripts/open_thread.py --name "<topic>" --purpose "<short purpose>"`.
3. If the script is unavailable, create the thread folder manually.
4. Ensure the folder contains:
   - `thread.md`
   - `summary.md`
   - `decisions.md`
   - `pending.md`
   - `sources.md`
   - `artifacts/`
5. Update `assistant/index/chats-index.md`.
6. Treat that thread as the default destination for related documentation and artifacts.

If the user does not provide a name, derive one from the topic. If ambiguity remains, prefix it with the current date.

## Documentation Rules

When documenting a chat:

- write compact durable notes, not transcript dumps
- separate facts, decisions, and pending items
- keep artifacts in the thread folder when they belong to that line of work
- capture only knowledge that will help future sessions
- never store secrets or credentials

Use semi-automatic behavior:

- if a milestone is clearly relevant, propose documenting it
- if the user confirms or the request is explicit, update the thread files
- do not capture every exchange by default

## Shared Memory Rules

Promote to `assistant/memory/shared/` only when something matters across threads:

- stable facts
- project-wide decisions
- major status changes
- unresolved questions with multi-thread impact

Do not promote:

- scratch notes
- temporary hypotheses
- chat-local logistics

## Apps Pattern

When the user asks to work with connected apps:

1. Use the active thread as the context anchor.
2. Perform the requested app action.
3. Write back only the useful result into the thread.
4. Promote to shared memory only if the result becomes durable project knowledge.

## Output Discipline

Prefer updating existing files over creating new ad hoc files.

Only create new files in the thread when the user explicitly wants a new deliverable or when the artifact clearly belongs in `artifacts/`.
