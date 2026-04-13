# Memory Layout

This skill expects a workspace-local `assistant/` folder.

## Minimum Layout

```text
assistant/
|-- AGENT.md
|-- index/
|   |-- project-map.md
|   |-- chats-index.md
|   `-- entities.md
|-- memory/
|   |-- shared/
|   |   |-- facts.md
|   |   |-- decisions.md
|   |   |-- status.md
|   |   `-- open-questions.md
|   `-- chats/
|       `-- <chat-slug>/
|           |-- thread.md
|           |-- summary.md
|           |-- decisions.md
|           |-- pending.md
|           |-- sources.md
|           `-- artifacts/
|-- inbox/
|-- outputs/
`-- templates/
```

## Reading Order

1. `assistant/AGENT.md`
2. `assistant/index/project-map.md`
3. active thread `thread.md`
4. active thread `summary.md`
5. active thread `decisions.md`
6. active thread `pending.md`
7. shared memory only after thread-local context

## File Roles

- `thread.md`: scope and identity of the thread
- `summary.md`: compressed session memory
- `decisions.md`: confirmed decisions and rationale
- `pending.md`: next actions and blockers
- `sources.md`: traceability for inputs
- `artifacts/`: generated outputs belonging to that thread

## Shared Files

- `facts.md`: confirmed reusable facts
- `decisions.md`: project-wide decisions
- `status.md`: major state changes
- `open-questions.md`: unresolved cross-thread issues
