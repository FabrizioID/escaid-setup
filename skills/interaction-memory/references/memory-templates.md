# Memory Templates

Use these templates only when the project does not already have a better structure.

## Minimal Memory Layout

```text
memory/
|-- decisions.md
|-- facts.md
|-- status.md
`-- open-questions.md
```

## decisions.md

```md
# Decisions

## 2026-04-13 - Short decision title
- Decision: What was decided
- Rationale: Why this was chosen
- Impact: What changes because of it
- Follow-up: What still needs to happen
```

## facts.md

```md
# Facts

## Domain facts
- Fact: Stable statement
- Source: Link, file, or validated artifact
- Confidence: High | Medium | Low
- Last verified: 2026-04-13
```

## status.md

```md
# Status

## Current
- State: Where the project stands now
- Completed: Most recent meaningful progress
- Next: Highest-priority next actions
- Blockers: Anything actively blocking progress
```

## open-questions.md

```md
# Open Questions

## Question title
- Question: What is unresolved
- Why it matters: Why this is important
- Needed to resolve: Evidence, person, or decision required
```

## Source-of-Truth Rule

- If a fact belongs in `README.md` or `docs/`, update that file first.
- Use `memory/` for working memory, decisions, status, and cross-session continuity.
- Avoid duplicating long source material; link to it and summarize only the durable insight.
