# Memory Templates

Use these templates only when the project does not already have a better structure.

## Recommended Layout

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

## Thread Naming

Use short slugs:

- `setup-mcps`
- `branding-escaid`
- `assistant-knowledge-base`

If needed, prefix with date:

- `2026-04-13-setup-mcps`

## plan.md

```md
# Plan

## Scope
- What this chat/thread is trying to achieve

## Current plan
- Main workstreams
- Constraints
- Expected output
```

## summary.md

```md
# Summary

## 2026-04-13
- What was accomplished in this session
- What changed
- What matters for the next session
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

## pending.md

```md
# Pending

## Next actions
- Highest-priority next step
- Secondary next step

## Blockers
- Current blocker and why it matters
```

## Shared Memory Templates

### shared/decisions.md

```md
# Decisions

## 2026-04-13 - Short decision title
- Decision: Project-wide decision
- Rationale: Why it was chosen
- Impact: What changes globally
```

### shared/facts.md

```md
# Facts

- Fact: Stable statement
- Source: Link, file, or validated artifact
- Confidence: High | Medium | Low
- Last verified: 2026-04-13
```

### shared/status.md

```md
# Status

- Current state: Where the project stands now
- Completed: Most recent meaningful progress
- Next: Highest-priority next action
- Blockers: Active blocker
```

### shared/open-questions.md

```md
# Open Questions

- Question: What is unresolved
- Why it matters: Why this is important
- Needed to resolve: Evidence, person, or decision required
```
