# Research And External Alternatives

Use this when the user asks to potentiate, benchmark, search for alternatives, compare what already exists, or avoid inventing from zero.

## Search Targets

Prefer sources in this order:

1. Official platform docs:
   - Meta Business for campaign objectives and delivery options.
   - Google Search Central for SEO and content quality.
   - Google Ads Help for Google Ads/Performance Max.
   - Email provider docs when deliverability or automation is platform-specific.
2. Competitor and category examples:
   - landing pages;
   - ad libraries;
   - public funnels;
   - content grids;
   - lead magnets;
   - webinar/challenge mechanics.
3. Community learning:
   - Reddit threads;
   - GitHub templates;
   - creator/operator breakdowns;
   - case studies.
4. Reusable templates:
   - Sheets dashboards;
   - n8n workflows;
   - CRM lifecycle maps;
   - campaign calendars;
   - prompt libraries.

## What To Extract

For each useful reference, capture:

- what problem it solves;
- why it works;
- what context it assumes;
- what can be adapted;
- what should not be copied;
- what skill/tool should execute it;
- risk, cost or credential requirement.

## Research Modes

### Campaign Pattern Search

Use when the user wants an idea for launch, lead generation, webinar, challenge, content sprint or offer push.

Output:

- 3-5 external patterns;
- what each pattern is good for;
- recommended adapted mechanism;
- asset list;
- automation/data requirement.

### Tool/Template Search

Use when the user asks if a workflow, dashboard, sheet, repo or template already exists.

Output:

- candidate;
- source;
- install/use effort;
- security/credential risk;
- overlap with existing skills;
- adopt/adapt/ignore verdict.

### Competitor/Market Scan

Use when positioning, offer or messaging needs grounding.

Output:

- category conventions;
- common promises;
- proof patterns;
- weak spots/gaps;
- angle opportunities;
- message recommendation.

## Guardrails

- Do not blindly copy public funnels. Adapt the mechanism to the user's offer, audience, budget and operational capacity.
- Prefer platform documentation for objective/technical decisions.
- Treat Reddit and community posts as field signals, not truth.
- If a candidate requires credentials or code execution, route through `external-skill-auditor` before adopting.
- If the result becomes an automation, route implementation through `n8n-workflow-builder`.
- If the result becomes a visual asset, route final creative through `flyer-generator`, `disruptive-presentations` or `ui-architect` depending on format.

