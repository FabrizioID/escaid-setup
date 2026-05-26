# External Alternatives For Technical Systems

Use before designing a custom technical solution when existing code, architecture, SDKs, MCPs, templates or products may solve the job faster or better.

## Search Targets

- Official docs and SDKs.
- MCPs, APIs and integrations.
- GitHub repos, examples and awesome lists.
- Architecture examples and C4 diagrams.
- Architecture Decision Records (ADR) examples.
- Reddit/GitHub issues/discussions about trade-offs and failure modes.
- SaaS/open-source alternatives.

## Search Queries

- `<problem> GitHub open source`
- `<problem> SDK official`
- `<service> MCP server`
- `<domain> architecture example C4`
- `<domain> ADR example`
- `<tool> vs <tool> reddit`
- `<workflow> API integration template`
- `<stack> boilerplate`

## Evaluation Criteria

| Criterion | Question |
| --- | --- |
| Build vs buy | Is custom code justified? |
| Maintenance | Who maintains it after delivery? |
| Integration | Does it fit existing stack and credentials? |
| Security | Does it handle auth/secrets safely? |
| Extensibility | Will it survive the next feature? |
| Observability | Can it be debugged and monitored? |
| Lock-in | Is dependency risk acceptable? |
| Speed | Does it accelerate without hiding critical complexity? |

## Required Output

For each serious alternative, include:

- what it is;
- why it fits or does not fit;
- adoption/setup friction;
- risk;
- when to use it;
- whether to adopt, adapt, ignore or build custom.

Use ADR-style reasoning for major technical choices: context, decision, consequences.
