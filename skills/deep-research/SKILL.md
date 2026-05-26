---
name: deep-research
description: "Use for serious investigation of any topic that needs external evidence: market research, user behavior, competitors, technical questions, academic/literature review, legal/regulatory overview, product strategy, pricing, trends, fact-checking, or source-backed recommendations. Search the web and, when useful, papers, official docs, reports, datasets, Reddit/forums, reviews, and primary sources; synthesize with citations and clear confidence levels."
---

# Deep Research

Research real-world questions with source-backed synthesis, not intuition-only reasoning.

Use this skill when the user asks to investigate, research, verify, compare, benchmark, find evidence, cite sources, study how people behave, analyze trends, review papers, or make a decision that would be weaker without current external context.

## Core Contract

Always separate:

- **Evidence:** directly supported by a cited source.
- **Signal:** repeated pattern from forums, reviews, comments, searches, or multiple weak sources.
- **Inference:** strategic/technical synthesis from evidence plus context.
- **Assumption:** plausible but not yet verified.

Never present intuition as evidence. If sources are thin or conflicting, say so.

## Research Modes

Choose the smallest mode that fits the stakes.

### Quick Scan
Use for low-risk questions or orientation.
- 3-5 sources
- competitor/product pages or official docs first
- short synthesis with links

### Standard Research
Use for strategic choices, product packaging, market behavior, technical decisions, or recommendations.
- 6-12 sources
- mix source types
- compare claims across sources
- identify unknowns and validation steps

### Deep Dive
Use for important business, academic, technical, or high-stakes decisions.
- iterative searches
- primary sources prioritized
- reports/papers where available
- community/user evidence if behavior matters
- source quality grading
- explicit confidence and contradictions

## Source Mix

Pick sources based on the question:

- **Official / primary:** docs, product pages, government pages, standards, filings, reports from the original organization.
- **Academic:** papers, abstracts, institutional repositories, Google Scholar/arXiv/PubMed-like sources when relevant.
- **Market / reports:** industry reports, surveys, credible consultancies, platform reports, benchmark studies.
- **Competitors:** pricing pages, landing pages, help docs, curriculum pages, changelogs, case studies.
- **Behavioral:** Reddit, forums, reviews, YouTube comments, communities, Q&A sites, social posts.
- **Data:** public datasets, APIs, official statistics, dashboards.
- **News:** only for recent events; prefer multiple reputable outlets plus primary confirmations.

For technical research, prefer primary docs, specs, source repos, release notes, and papers.
For high-stakes medical/legal/financial topics, browse current authoritative sources and keep advice non-prescriptive.

## Multi-Angle Research Lens

When the user says "investiga", do not only check what competitors do. Internally build a cross-angle evidence map so Magnus can reason with richer constraints.

Select the relevant angles based on the context. Do not apply every lens by default.

- **User psychology:** motivations, fears, status signals, trust triggers, perceived risk, cognitive load, habit, identity, motivation, objections.
- **Buying behavior:** what people pay for, who decides, price sensitivity, bundle preference, certification value, proof needed, switching costs.
- **Market economics:** TAM/SAM-like size signals, willingness to pay, pricing models, margins, distribution costs, labor constraints, opportunity cost, macro trends.
- **Competitive landscape:** direct competitors, adjacent alternatives, substitutes, free options, open-source/community options, incumbent behaviors.
- **Category language:** words users naturally use, search terms, job titles, role names, tool names, pain vocabulary, avoided jargon.
- **Adoption dynamics:** onboarding friction, activation moment, time-to-value, retention loops, social proof, network effects, community behavior.
- **Operational feasibility:** available assets, content supply, expert incentives, production cost, QA burden, certification burden, support burden.
- **Technical feasibility:** data availability, integrations, model quality, automation limits, infrastructure, maintainability.
- **Institutional/regulatory:** credentials, standards, compliance, official recognition, procurement requirements, licensing, legal constraints.
- **Evidence of demand:** search trends, job posts, course reviews, forum questions, waitlists, communities, competitor enrollment claims, public datasets.
- **Contrary signals:** why this may fail, user skepticism, failed products, complaints, churn causes, better substitutes.

For each chosen angle, capture:

```text
Angle:
Evidence:
Signal strength:
Implication:
Open question:
```

Do not force every angle into every answer. Use enough angles to avoid a narrow conclusion.

Visibility rule:
- The lens map is internal by default.
- Do not show the selected lenses, discarded lenses, or full research scaffolding unless the user asks to see the research process.
- In the final answer, show only the relevant findings, recommendation, confidence/unknowns, and important sources.
- If a lens materially changes the decision, mention the implication, not the behind-the-scenes lens name.

## Search Protocol

1. Define the research question and decision.
2. If the prompt is vague, ask 1-3 clarification questions before researching. Clarify scope, timeframe, geography/market, source type, and output depth.
3. Identify which Multi-Angle Research Lens items matter most.
4. List what would change the answer.
5. Search in batches with different angles:
   - official/product
   - competitor/benchmark
   - report/survey/paper
   - community/forum/review
   - psychology/behavior
   - economics/pricing/market
   - jobs/roles/demand
   - contrary evidence
6. Open and inspect sources, not just snippets.
7. Track source quality and dates.
8. Cross-check important claims with at least two independent sources when possible.
9. Synthesize into options, tradeoffs, recommendation, and validation.

Useful query patterns:

```text
site:official-domain.com <topic> pricing documentation
<topic> report survey 2025 pdf
<topic> academic paper systematic review
site:reddit.com <topic> worth it problem alternative
<competitor> pricing curriculum certificate
<role> skills roadmap certification
<product category> user reviews complaints
<topic> psychology adoption behavior study
<topic> willingness to pay pricing survey
<role> job postings skills requirements
<category> market size growth report
<topic> why people quit churn complaints
```

## Reproducibility

For Standard Research and Deep Dive work, preserve enough context that the research can be repeated or extended:

- record the final research question
- list the main search queries used
- keep source URLs in the final answer
- note the research date when recency matters
- state scope limits and excluded source types
- if working in a project folder, save a compact markdown memo only when the user asks or when the research becomes durable project memory

Do not require a long report by default. Reproducibility can be lightweight.

## Phase Gates For Deep Dive

For high-stakes or academic deep dives, use gated phases. Do not jump to synthesis before enough sources have been inspected.

1. **Frontier scan:** current state, recent sources, key terms.
2. **Landscape survey:** broader source set, competing frameworks, major actors.
3. **Deep reading:** inspect the most important sources directly, not just snippets.
4. **Implementation / evidence check:** look for real products, code, datasets, case studies, pricing, reviews, or adoption proof where relevant.
5. **Synthesis:** compare, classify, identify gaps and contradictions.
6. **Decision/report:** recommendation, confidence, validation path, sources.

Use phase gates flexibly. A product packaging decision does not need 80 papers; a literature review may.

Before final synthesis, verify:
- key claims have at least one cited source
- important sources were opened, not only search snippets
- community evidence is labelled as anecdotal/signal
- contradictions and missing evidence are explicit

## Evidence Grading

- **A:** Primary source, official data, peer-reviewed paper, published report with methodology.
- **B:** Credible secondary analysis, case study, reputable industry publication, strong docs.
- **C:** Community pattern, review cluster, forum thread, expert blog with examples.
- **D:** Isolated anecdote, marketing claim, unsourced post, stale source.

Use lower-grade evidence for language, pain points, and hypotheses. Do not use it alone for hard conclusions.

## Reddit / Forums / Reviews

Use them to discover language, friction, objections, and edge cases.

Rules:
- label as anecdotal/community signal
- cite threads/pages when used
- prefer patterns across multiple threads
- do not treat upvotes or comments as representative samples
- short quotes only when the wording itself matters

## Output Formats

For most tasks:

```text
Research Question
Key Findings
Evidence Table
Implications
Recommendation
Confidence / Unknowns
Sources
```

For decision work:

```text
Decision Being Made
What Evidence Says
Options
Tradeoffs
Recommended Path
Validation Experiment
Sources
```

For academic/literature work:

```text
Scope
Themes
Consensus
Contradictions
Gaps
Useful Papers / Sources
Implications
```

Keep answers concise unless the user asks for a full memo.

## Magnus Integration

When Magnus is active:
- Run this before converging on decisions that depend on real-world behavior, market structure, product patterns, technical facts, or external constraints.
- Feed findings into strategic reasoning as constraints.
- Surface contradictions between intuition and evidence.
- If evidence is insufficient, propose the smallest real validation test.
- Use the Multi-Angle Research Lens to give Magnus more variables to cross: psychology, economics, adoption, operations, competition, category language, and contrary evidence.

For product architecture questions like AECODE F3, inspect:
- learning platforms, AEC/BIM education competitors, and credential models
- user behavior around courses, routes, certificates, microlearning, and role-based upskilling
- community language about what feels confusing, valuable, rigid, or worth paying for
- how competitors package modular content, subscriptions, bundles, certificates, and career paths
