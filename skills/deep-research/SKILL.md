---
name: deep-research
description: "Use for serious investigation of any topic that needs external evidence: market research, user behavior, competitors, technical questions, academic/literature review, legal/regulatory overview, product strategy, pricing, trends, fact-checking, source-backed recommendations, or systematic public-web scraping/source mining. Search the web and, when useful, papers, official docs, reports, datasets, Reddit/forums, reviews, and primary sources; synthesize with citations and clear confidence levels."
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

## Purpose-Led Synthesis Contract

Research is not a pile of facts. It must sustain a decision, thesis or narrative with real-world logic.

Before final output, convert evidence into a connected argument:

```text
Initial problem:
Strategic thesis:
Why this matters now:
Real dangers / constraints:
Evidence that supports the danger:
Existing solutions or enterprise patterns:
What those patterns imply for this user/client:
Recommended move:
What remains uncertain:
```

If the output only lists sources, vendors, features or isolated facts, it is incomplete. The result must tell the user what the evidence means in relation to the original problem.

Use this chain for client-facing research:

```text
Problem -> Risk -> Evidence -> Pattern -> Solution -> Tradeoff -> Recommendation
```

For high-stakes strategic work, hand off the evidence to Magnus / Strategic Thinker as raw material, not as the final answer. Deep Research explores deeply; Magnus gives shape, intent, hierarchy and conclusion.

## Gap-Filling and First-Principles Pass

Before synthesizing, run a gap audit. Treat unexplained concepts, technical terms, hidden actors, missing flows, undefined risks and assumed knowledge as research gaps.

For each important claim, ask:

```text
What must be true for this claim to be valid?
What term or mechanism would a non-specialist not understand?
Where does the risk actually enter the system?
Who touches the information?
What information is sensitive, exactly?
Through which channel can it leak?
What control reduces that risk?
What evidence proves that control exists or is standard practice?
```

Use a first-principles ladder when the topic is complex:

```text
Surface claim:
Underlying mechanism:
Actors involved:
Data / money / decision flow:
Failure points:
Base truth or necessary assumption:
Evidence that supports it:
Open question if not provable:
```

Do not use unexplained jargon in the final answer. If a term is necessary, define it in context the first time it appears. Example: instead of only saying "tenant", explain it as "the company's private Microsoft/Azure environment where users, permissions, files and policies live".

When researching security, privacy, AI, finance, law, construction or enterprise operations, decompose the problem end to end:

```text
Actors -> data created -> storage -> access -> processing -> sharing -> decision -> audit -> failure/leak paths -> controls
```

## Layer Transition and Angle Discipline

Layered research must explain why each layer exists and how it changes the next layer. Do not present layers as independent sections.

Use a visible reasoning trace instead of raw hidden chain-of-thought:

```text
Layer:
Why this layer is necessary:
Question it answers:
What it revealed:
What gap remains:
Why the next layer follows:
```

Before expanding a topic, choose the angles that are necessary for the decision. Angles are not decorative categories; they are lenses that prevent blind spots.

Common angle families:

- Technical: architecture, integrations, model behavior, cloud, APIs, security controls.
- Legal/compliance: privacy, contracts, IP, liability, audit, data processing roles.
- Operational: who creates data, who updates it, where workflows break, field adoption.
- Financial: cost, margin, leakage, ROI, procurement, vendor lock-in.
- Psychological/trust: fear, adoption resistance, perceived control, executive confidence.
- Political/internal power: who gains visibility, who loses discretion, approval dynamics.
- Commercial: how to sell the solution without triggering fear or commoditizing the offer.
- Disruptive: what non-obvious move reframes the client's problem or creates unfair advantage.

For each important angle, generate at least one disruptive question:

```text
What assumption are we accepting too early?
What would make the safest-looking option unsafe?
What would make the riskiest-looking option strategically superior?
Who benefits if the current confusion remains?
Where is the hidden asset or hidden liability?
What should not be automated even if it can be?
What must be true for the client to trust this?
```

The final synthesis should show connection, not just coverage:

```text
Because Layer A revealed X, Layer B must test Y.
Because Angle Z changes the risk, the recommendation shifts from option 1 to option 2.
```

Iterations must not become separate appendices unless the user explicitly asks for a log. Each iteration should refine the same structure in place: merge new evidence, close gaps, update sublayers, revise angle variables, and change conclusions where warranted. Avoid "Iteration 2" sections that leave old and new reasoning disconnected.

Angles are variable-extraction engines, not labels. Each angle must identify what variables matter, what evidence can validate them, what uncertainty remains, and how the decision changes. If an angle is psychological, legal, financial, operational or technical, it still needs its own sublayers, evidence and implications.

When a problem is strategic and multi-dimensional, prefer **angle-first decomposition**:

```text
Research angle -> fronts inside that angle -> sublayers -> gaps -> evidence -> implications -> decision change
```

Do not separate "angles" from "layers" as unrelated sections. The angle is often the delimiter that decides which layers matter. For example, the technical angle may generate cloud/model/RAG/security layers, while the psychological angle may generate trust/fear/adoption/perceived-control layers. Each angle should expose different variables and different gaps.

Use system-flow layers only as a shared backbone when needed; then revisit each angle and ask what the backbone misses from that perspective.

### Recursive Question-Evidence Chain

Every angle, front, layer and sublayer must be triggered by a question and resolved through evidence or a labeled inference. If there is no question, the section is probably decorative. If there is no evidence/hallazgo, it is not deep research.

Use this recursive unit:

```text
Question that triggers this layer:
Why this question matters:
Evidence sought:
Evidence found:
Finding / hallazgo:
What this resolves:
New gap or next question opened:
Decision impact:
```

Apply it repeatedly:

```text
angle question
-> front question
-> sublayer question
-> evidence/hallazgo
-> next sublayer question or decision
```

For Deep Research Proper, increase source density: important fronts and sublayers should carry citations or explicitly state that evidence is still missing and must be validated. Do not concentrate all citations in one bibliography or a few high-level sections.

When a sublayer opens new gaps, continue recursively. Do not assume one sublayer produces only one gap. A sublayer may produce zero, one, or several relevant gaps; each relevant gap becomes its own child branch until evidence is sufficient, the branch stops changing the decision, or the remaining gap must be marked as explicitly unresolved.

```text
sublayer finding
-> unresolved mechanism A -> sub-sublayer question -> evidence -> expanded finding -> decision/gap
-> unresolved mechanism B -> sub-sublayer question -> evidence -> expanded finding -> decision/gap
-> unresolved mechanism C -> sub-sublayer question -> evidence -> expanded finding -> decision/gap
```

Do not stop at "finding labels." Explain what was found, why it matters, what it does not prove, and what decision it changes. If the output is a table, make evidence/finding cells wide enough or split them into multi-line blocks so the reasoning is readable.

### Disruption as a Chain Event

Disruption is not always an initial angle. It is a Magnus event that can occur:

- at the beginning, when the initial framing is too narrow;
- during research, when a finding breaks an assumption;
- at the end, when new variables allow a sharper strategic reframing.

When disruption occurs, document it as:

```text
Assumption being challenged:
Why Magnus surfaced it:
Evidence or reasoning that pressures the assumption:
New disruptive question:
Research needed to answer it:
How the decision could change:
```

Do not treat disruptive questions as rhetorical decoration. They must either be answered with evidence/reasoning, or become explicit research gaps.

## Research Depth Engine

Use this engine for any serious investigation, not only company research. Magnus must not treat "deep research" as a longer Google answer. It is an intelligence workflow: plan, collect, analyze, verify, report, and preserve uncertainty.

### Activation Contract

There are two different research behaviors:

1. **Research Assist** - default when Magnus needs external context to reason.
   - Purpose: feed Magnus enough current evidence to cross variables without stopping every interaction.
   - Depth: usually L0-L2.
   - Behavior: quick source check, a few high-signal sources, same angle/layer/gap logic in compressed form.
   - Output: concise synthesis with 2-4 key angles, limited sublayers, truth base, useful caveats and next gaps.
   - Time expectation: fast.

2. **Deep Research Proper** - only when the user explicitly asks for deep research or uses equivalent wording.
   - Triggers: "deep research", "investiga a profundidad", "investiga bien profundo", "exprime todo", "L3", "L4", "dossier", "fuentes completas", "matriz de evidencia", "no te quedes corto", or equivalent.
   - Purpose: produce a decision-grade investigation.
   - Depth: L3-L5 unless constrained.
   - Behavior: multi-round search, open and inspect sources, source-class diversity, contradiction search, evidence ledger, claim-source mapping, confidence ratings and validation questions.
   - Output: structured findings with sources near claims, angles that changed the decision, risks, unknowns and next validation steps.
   - Time expectation: slower; do not pretend it is complete if only a quick scan was performed.

If the user explicitly asks for Deep Research Proper, do not answer from memory or a short scan. If tool/time/source limits prevent true depth, say so and label the result as a partial pass.

### Same Method, Different Depth

Research Assist and Deep Research Proper use the same intellectual structure. They differ in expansion, not in logic.

Both modes must preserve this backbone:

```text
objective -> necessary angles -> fronts/layers -> sublayers -> gaps -> evidence/signal/inference -> base truth -> conclusion/recommendation
```

Use this replicable sequence:

1. Define the research objective and the decision it must support.
2. Identify the necessary angles for that decision.
3. For each angle, open the key fronts/layers that explain the problem.
4. For each layer, ask the question that justifies its existence.
5. Gather evidence, signal or labeled inference for that question.
6. Extract the finding and explain why it matters.
7. Detect gaps created by the finding.
8. Branch recursively only into gaps that may change the decision.
9. Stop each branch when evidence is sufficient, the branch becomes irrelevant, or the gap must be validated by the client.
10. Connect the branches into a base truth.
11. Convert the base truth into conclusion, recommendation, tradeoffs and next validation steps.

Do not make Research Assist a casual fact dump. Even in a short pass, identify the problem being answered, inspect multiple angles, surface the most important gaps, and connect evidence to a conclusion.

Use this compression rule:

| Element | Research Assist | Deep Research Proper |
|---|---|---|
| Objective | 1 clear decision/problem | decision-grade brief with audience, stakes and stop condition |
| Angles | 2-4 necessary angles | all decision-relevant angles, including disruptive/psychological/legal/technical when needed |
| Layers | 1-2 layers per key angle | multi-layer expansion per angle |
| Sublayers | only where a real gap changes the answer | recursive branches until sufficient, irrelevant or explicitly unresolved |
| Gaps | top gaps only | full gap tree with child branches |
| Evidence | few high-signal sources, label weak areas | dense source mapping, primary sources, contradiction checks |
| Output | short connected synthesis | dossier, matrix, narrative and decision logic |

Research Assist may say: "This is a quick pass; I am only opening the strongest branches." It must not imply exhaustive coverage.

Deep Research Proper must show how branches were expanded, why they stopped, and what remains unresolved.

### Depth Ladder

Before researching, choose the depth explicitly:

| Level | When | Minimum behavior |
|---|---|---|
| L0 Orientation | Quick definition, low stakes | 2-3 sources, no broad claims |
| L1 Quick Scan | Need direction today | 3-5 sources, strongest evidence only |
| L2 Standard Research | Decision, proposal, product, client, strategy | 6-12 sources across at least 3 source classes |
| L3 Deep Dive | High impact, public claims, academic/legal/financial/client-facing | iterative search, primary sources, contradiction search, evidence matrix |
| L4 Source Mining | Dataset needed | schema first, broad extraction, dedupe, confidence scoring |
| L5 Investigation Dossier | Sensitive/strategic due diligence | provenance log, claim audit, adversarial checks, unknowns and validation plan |

If the user asks for "profundo", "a fondo", "exprime", "mas poder", "no te quedes corto", "todos los datos relevantes", or the answer will guide a client-facing decision, default to L3 or L4 unless time/tool limits make that impossible.

### Intelligence Requirement

Start by defining internally:

```text
Decision this research supports:
Audience:
What would change the recommendation:
Entities / aliases:
Geography and timeframe:
Required source classes:
Claims that require primary evidence:
Known unknowns:
Stop condition:
```

If a reasonable scope can be inferred, proceed. Ask only when missing scope would make the research misleading.

### Evidence Ledger

For L2+, maintain a compact evidence ledger while researching:

```text
Claim:
Source:
Source class:
Source quality:
Date/freshness:
What the source actually supports:
What it does not support:
Corroboration:
Confidence:
```

Do not wait until the final answer to decide what sources support what claims. Build the mapping during research.

### Source Quality Order

Prefer evidence in this order, adjusting by domain:

1. Primary/official source: company, government, court, regulator, standards body, original paper, official docs.
2. Direct ecosystem source: client, partner, supplier, project owner, certifier, event organizer.
3. Reputable analysis/report: academic, consultancy, industry report, credible media with named sources.
4. Public behavior signal: reviews, forums, comments, job posts, social posts, communities.
5. Weak/directory source: aggregator, scraped profile, generic listing, AI-written article, SEO page.

Weak sources can generate leads, not conclusions. Upgrade them through primary or direct ecosystem evidence.

### Verification Moves

Adopt these verification moves before closing material claims:

- **SIFT:** stop, investigate the source, find better coverage, trace claims/quotes/media to original context.
- **Corroborate:** seek at least two independent sources for important claims unless the primary source is authoritative and sufficient.
- **Contradict:** search for disconfirming evidence, stale data, sanctions, disputes, rebrands, expired domains, changed leadership, or conflicting numbers.
- **Triangulate entities:** distinguish legal entity, brand, holding, subsidiary, product, project, and person.
- **Check dates:** mark whether a source is current, historical, undated, or stale.
- **Audit citation fit:** verify that the cited source actually supports the sentence it is attached to.
- **Label gaps:** if a claim cannot be verified publicly, state the gap and create a validation question.

### Research Artifact Standards

For any report, deck, HTML, proposal, client memo or strategic brief:

- Attach sources near claims, not only in a final bibliography.
- Include confidence/unknowns for sensitive or decision-changing claims.
- Separate "what we know", "what signals suggest", "what we infer", and "what to validate".
- Preserve query/source diversity enough that a future agent can continue the investigation.
- If the output is visual, include a source section plus inline support for major data points.

### Anti-Shallow Checks

Before finalizing, ask:

- Did I inspect sources or only search snippets?
- Did I search aliases, old names and related entities?
- Did I include at least one contrary/risk query?
- Did I mine primary sources before secondary summaries?
- Did I confuse a project, client, contractor and owner?
- Did I produce a useful decision map, or just a biography/summary?
- Did each major recommendation have a source-backed reason or clearly marked inference?
- Did the output sustain a thesis connected to the user's original problem, or did it merely dump facts?
- Did I define non-common technical terms and fill concept gaps before using them as premises?
- Did I decompose the problem end to end enough to locate where the risk, cost or value is created?

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

### Web Scraping / Source Mining
Use when the research question requires systematic extraction from many public web sources, not just reading a few pages.

Activate this mode when the user asks to "scrapear", "raspar", "levantar una base", "buscar todos", "extraer de la web", "mapear candidatos", "armar un dataset", "revisar muchos perfiles", "barrer fuentes", or when the answer would be weak if only the first search results are used.

The goal is not aggressive crawling. It is structured public-source mining:
- define the dataset schema before collecting;
- generate query families and source classes;
- collect only public, relevant fields;
- respect access boundaries, robots/ToS signals, rate limits, and privacy;
- deduplicate entities across sources;
- preserve URLs, dates, query strings, and confidence;
- separate extracted facts from inferred labels.

### Speaker / Expert Discovery
Use when the user needs candidate speakers, advisors, interviewees, jurors, partners, or niche experts for an event, course, research panel, podcast, webinar, or business opportunity.

This is not a casual "find 5 people" search. Treat it as a talent-intelligence task:
- build a search map before concluding;
- search beyond the first visible results;
- deduplicate names across LinkedIn, YouTube, papers, company pages, event agendas, course pages, patents, GitHub, and professional associations;
- score candidates by fit, evidence strength, location, credibility, audience value, and contactability;
- separate confirmed evidence from weak signals;
- never claim a person has a skill, location, or experience unless a public source supports it.

Use this mode especially when the user asks for "ponentes", "speakers", "expertos", "personas", "LinkedIn", "base de datos de ponentes", "quien sabe de X", or similar.

### Company Intelligence / Commercial Due Diligence

Use when the user needs to understand a company before a meeting, sales visit, proposal, partnership, investment conversation, procurement decision, or strategic outreach.

Activate this mode when the user asks who a company is, what ecosystem it belongs to, what services it provides, who its clients/partners are, what projects it has delivered, how mature it is, what technology/automation/AI opportunities may fit, or when the user says they need "more power", "exprimir mas", "investigar mas a fondo", "mapa de empresa", "conexiones", "clientes", "proyectos", "proveedores", "RUC", "OSCE", "RNP", "LinkedIn", "organigrama", or similar.

This is not a generic company summary. Treat it as public-source commercial intelligence:
- identify legal names, brand names, old names, subsidiaries, holding relationships, RUC/tax IDs, addresses, domains and aliases;
- map business lines, revenue mix signals, certifications, compliance posture, registrations and procurement capacity;
- mine project pages, client pages, case studies, public contracts, supplier directories, PDFs, theses, environmental files, permits, news and social/professional profiles;
- extract structured entities: projects, clients, locations, scope, area, budget, dates, duration, height/floors, subcontractors, banks, supervisors, public bodies, technologies, certifications;
- separate what is confirmed from official/primary sources from weak directory data and inference;
- convert findings into meeting intelligence: what to ask, what not to assume, where to enter, which offer modules fit, what evidence supports each angle.

Recommended source classes:
- company official site: home, about, companies, projects, clients, indicators, press, certifications, contact;
- official/government registries: RUC/SUNAT-like pages, RNP/OSCE/public procurement, regulators, municipal/government files;
- project evidence: project detail pages, brochures, Mivivienda-like publications, environmental studies, theses/repositories, construction suppliers;
- ecosystem evidence: clients, banks, consultants, subcontractors, architects, engineering/geotechnical firms, certifiers, auditors;
- professional/social: LinkedIn company and people pages, job posts, event mentions, interviews, YouTube or press;
- risk/contrary evidence: sanctions, disputes, complaints, expired domains, inactive registrations, conflicting addresses, stale pages.

Dataset schema for company/project mining:

```text
Entity type:
Canonical name:
Aliases / old names:
Source URL:
Source quality: official | government | partner | directory | media | academic | weak
Claim:
Evidence excerpt or field:
Date / freshness:
Confidence:
Implication:
Open validation question:
```

For construction/infrastructure/inmobiliaria companies, also extract:

```text
Project:
Business line:
Client / promotor / contractor:
Location:
Scope:
Area / units / floors / duration / budget:
Dates:
Certifications / compliance signals:
Operational pain implied:
Technology opportunity:
Evidence source:
Confidence:
```

Output patterns:
- **Meeting brief:** 1-page synthesis with "what they are", "what they likely care about", "what to ask", "what to offer".
- **Evidence matrix:** table mapping each claim to source quality and confidence.
- **Ecosystem map:** holding/subsidiaries/clients/projects/providers/regulators.
- **Opportunity map:** pains by business function and technology modules that could solve them.
- **Unknowns to validate:** exact questions for the meeting; never fill these with assumptions.

Failure modes to avoid:
- stopping at the official homepage;
- treating a brand, holding, subsidiary and contractor as the same entity without checking aliases;
- claiming current operations from stale project pages without dates;
- turning weak directory data into fact;
- proposing technology before mapping business lines and operational pains;
- hiding uncertainty in polished language.

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
- **Internal power and incentives:** who benefits, who loses control, who approves, who blocks, political risk, accountability shifts, status threats.
- **Trust, privacy and risk:** confidentiality, data residency, permissions, auditability, hallucination tolerance, brand/legal/reputational risk.
- **Operational flow:** where work actually moves: intake, approval, production, QA, procurement, handoff, reporting, billing, post-sale/support.
- **Financial control:** cost leakage, cashflow, working capital, forecast, margin, ROI, loss avoidance, payback, budget owner.
- **Technology adoption:** existing stack, IT constraints, security posture, change management, workflow fit, training burden, support burden.
- **Decision architecture:** buyer vs user vs blocker, procurement path, proof needed, pilot shape, success metric, next decision gate.
- **Language/perception:** words that lower resistance, words that trigger skepticism, category framing, executive vs operator language.

Angle selection rule:
- Pick the angles that can change the recommendation, not the longest list.
- For enterprise, construction, operations, healthcare, legal, finance, education, government or other trust-heavy contexts, include at least: operational flow, internal power/incentives, trust/privacy/risk, financial control and technology adoption.
- For consumer products, include at least: psychology, behavior, language/perception, adoption and economics.
- For strategic client-facing recommendations, show a compact "Angulos que cambiaron la decision" section unless the user explicitly asks for a short answer.
- If an angle was considered but had no evidence, label it as an open validation question rather than filling it with intuition.

For each chosen angle, capture:

```text
Angle:
Evidence:
Signal strength:
Implication:
Open question:
Decision impact:
```

Do not force every angle into every answer. Use enough angles to avoid a narrow conclusion.

Visibility rule:
- The lens map is internal by default.
- Do not show discarded lenses or full research scaffolding unless the user asks to see the research process.
- In the final answer, show only the relevant findings, recommendation, confidence/unknowns, and important sources.
- Default to an executive synthesis: show the few findings that change the decision, not the full research trail.
- Keep query logs, source inventory, angle maps, extraction tables, and detailed notes internal unless the user asks for "mas detalle", "fuentes completas", "como investigaste", "dataset", "tabla", "todos los angulos", or equivalent.
- When research is used only to strengthen Magnus' reasoning, output the decision impact and strongest evidence, not a report.
- If a lens materially changes the decision, mention the implication, not the behind-the-scenes lens name.
- If the user explicitly asks for "angulos", "lentes", "todos los angulos", "desde varios angulos", "como investigaste", or says a prior answer did not show the angles, include a compact **Angulos cubiertos** section before or after the synthesis.
- For strategic/product research where the user repeatedly asks to "investigar todos los angulos", include a compact angle summary by default unless the requested output is intentionally short.

Compact angle summary format:

```text
Angulo:
Que busque:
Hallazgo:
Fuente/senal:
Impacto en la decision:
Pregunta de validacion:
```

Keep this summary selective: show the angles that materially shaped the recommendation, not every possible lens. Avoid exposing raw scratchpad, long query logs, or discarded dead ends unless explicitly requested.

## Source-To-Claim Mapping

When research will feed a strategic recommendation, HTML report, deck, proposal, table, product decision, legal/regulatory note, certification logic, pricing model, or any artifact meant to persuade others, do not leave sources only in a final bibliography.

For every material claim or decision criterion, keep a nearby source mapping:

```text
Claim / criterion:
Evidence source:
Source quality:
Implication:
Confidence:
```

Output rule:
- If the user asks for chat synthesis, cite the source next to the finding or in the same bullet/paragraph.
- If the user asks for an HTML/report/deck, each evidence-sensitive section must include inline source cards, source links, footnotes, or a compact "Sustento" block directly under the claim.
- A final "Fuentes" section is optional support, not a substitute for claim-level attribution.
- If a section uses inferred strategy from multiple sources, say "Inferencia desde..." and list the strongest 1-3 sources nearby.
- If no source directly supports a claim, label it as inference/assumption and propose how to validate it.
- In normal chat, prefer 3-7 high-signal findings over exhaustive coverage.
- Only produce long reports, full bibliographies, scraping tables, methodology logs, or angle-by-angle walkthroughs when the user asks for that level of detail or when the artifact requires it.

Triggers for mandatory claim-level sources:
- certification, credentials, legal/regulatory, procurement, SUNEDU/OSCE/CIP/ISO/vendor claims;
- market size, pricing, willingness to pay, labor demand, ROI, economic arguments;
- psychology/user behavior claims;
- competitor benchmarks;
- technical feasibility or platform/vendor capability claims;
- any recommendation that changes what the user will build, sell, promise, or publish.

Failure mode to avoid:
- Researching multiple angles correctly, then producing a polished artifact where the audience cannot tell which claim came from which source. In those cases, revise the artifact so the source is visibly attached to the argument.

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
9. Build a claim-to-source map for every material recommendation, especially if the output will be shown to a team/client.
10. If the user asked for angles/lenses or the work is a broad strategic investigation, prepare a compact angle summary with source/signal and impact.
11. Synthesize into options, tradeoffs, recommendation, validation, and visible source placement plan.

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
site:<company-domain> proyectos clientes indicadores certificaciones
site:<company-domain> "Plazo de Ejecución" "Cliente" "<company-or-alias>"
"<company>" RUC OR "tax id" OR "registro nacional de proveedores"
"<company>" OSCE OR RNP OR SUNAT OR licitacion OR sancion
"<company>" "<project>" "<client>" "<city>"
"<company>" LinkedIn gerencia operaciones proyectos calidad
"<company>" ISO 9001 ISO 14001 ISO 45001 Bureau Veritas SGS
"<company>" proveedor contratista promotor constructor principal
```

## Web Scraping / Source Mining Protocol

Use this protocol when investigation needs breadth, repeated extraction, or a reusable dataset.

### 1. Scrape Brief

Before collecting, define:
- decision the dataset will support;
- entity type: person, company, project, product, paper, event, job post, course, tool, review, regulation, price, etc.;
- geography/timeframe;
- required fields;
- optional enrichment fields;
- exclusion rules;
- source classes to inspect;
- confidence threshold for inclusion;
- output format: chat table, CSV/XLSX, markdown memo, JSON, Notion/Sheets, or local database.

### 2. Source Map

Build source classes before searching:
- search engine result pages as discovery only;
- official/company/institution pages;
- public directories and associations;
- event agendas and speaker pages;
- PDFs, brochures, reports, proceedings;
- academic databases and repositories;
- YouTube/channel/video pages;
- public social/profile snippets;
- GitHub/repositories;
- job boards and course pages;
- forums/reviews/community sources.

Do not treat one source class as complete. If only one class was searched, label the result "first pass".

### 3. Query Expansion

Generate query families by:
- synonyms and acronyms;
- Spanish/English/local terms;
- tool names and product names;
- role titles;
- company/institution names;
- country/city variants;
- negative queries and contrary terms;
- known candidate/entity names once discovered.

Track the most useful queries so the research can be repeated.

### 4. Extraction Method

Choose the lightest valid method:
- manual open/read for small sets;
- search snippets only for weak discovery signals;
- structured APIs where available;
- sitemap/robots-aware crawl for public pages;
- HTML parsing for repeated public pages;
- PDF/text extraction for reports and brochures;
- browser automation only when rendering is required and allowed.

Stop or downgrade to manual review when:
- the page requires login;
- bot protection blocks access;
- robots/ToS clearly disallow the target;
- the data is personal, sensitive, or irrelevant;
- scraping would overload the site.

### 4B. Tool Routing Ladder

When multiple scraping paths are possible, route from lightest to heaviest:

1. **Built-in web search/open:** quick evidence, low volume, no dataset needed.
2. **Direct public fetch / HTML parsing:** static pages, simple lists, public documents.
3. **PDF/text extraction:** brochures, reports, proceedings, public directories.
4. **Browser automation:** JS-rendered pages, interaction needed, screenshots/visual verification.
5. **Structured platform actors/APIs:** repeated extraction from known platforms such as Google Maps, YouTube, LinkedIn snippets, Reddit, reviews, marketplaces, or job boards.
6. **Custom scraper/spider:** only when repeated pages, pagination, or a reusable dataset justify it.
7. **Paid unlocker/proxy/cloud browser:** only when the user explicitly approves cost/auth and the target is appropriate.

Before using external scraping platforms, check:
- credentials/auth state;
- expected cost or free-tier limits;
- target platform ToS/robots constraints;
- output schema;
- whether the same answer can be reached through a lower-friction source.

Useful external skill patterns audited:
- Apify-style: select a prebuilt Actor first, fetch its input schema, run, then retrieve dataset; good for platform-specific extraction and CSV/JSON outputs.
- Bright Data-style: separate `search`, `scrape`, `data feeds`, browser/API paths, and budget checks; good when anti-bot/JS rendering is the blocker.
- Browserbase-style: distinguish fetch/search APIs from interactive browser sessions; good for browser-required pages and reproducible session artifacts.
- Scrapling-style: adaptive route from HTTP/static fetch to JS browser to stealth/spider; good as an implementation idea, but avoid bypass-oriented behavior unless explicitly lawful and approved.

### 5. Data Hygiene

For each extracted row, keep:
- source URL;
- source title;
- extraction date;
- field-level evidence;
- source quality grade;
- confidence;
- notes/open validation.

Normalize:
- names with accents/no accents;
- duplicate entities;
- companies vs people;
- dates;
- countries/cities;
- tool names and acronyms.

### 6. Evidence and Privacy Boundaries

Allowed:
- public facts relevant to the research decision;
- public professional links;
- business contact data only when clearly public or provided by the user;
- public posts, talks, papers, videos, projects, product pages, and official statements.

Avoid:
- bypassing logins, paywalls, anti-bot controls, or private APIs;
- storing unnecessary personal data;
- exposing private emails/phones from scraped pages without a clear public-business context;
- using scraped personal data for sensitive profiling.

Robots.txt is not the whole legal question, but it is a practical boundary signal. Respect it by default. Use rate limiting, small batches, and clear source logs when automated collection is used.

### 7. Output

For scraping/source-mining tasks, output:
- scope and limits;
- source classes checked;
- result table/dataset;
- confidence labels;
- gaps and next-source recommendations;
- files created, if any.

If the user asked for a deployable database, create a CSV/XLSX/JSON with stable columns and a separate `sources` or `evidence_url` field.

## Speaker / Expert Discovery Protocol

When searching for people, do not rely only on the first 5 search results. Use a layered funnel.

### 1. Define the candidate brief

Capture the target:
- topic/domain;
- geography: local, regional, international, virtual OK or not;
- seniority: executive, technical practitioner, academic, founder, public communicator;
- event format: keynote, panel, demo, workshop, debate, pre-event, sponsor slot;
- must-have skills vs nice-to-have signals;
- exclusions: competitors, sponsors only, non-local, weak public evidence, purely academic, no LinkedIn, etc.

If the user gives enough constraints, proceed. If not, ask only the minimum clarifying question.

### 2. Build query families

Generate multiple search families instead of one query:

```text
site:linkedin.com/in "<skill>" "<domain>" "<country>"
site:linkedin.com/in "<tool>" "<domain>" "<country>"
"<domain local term>" "<skill>" "<country>"
"<acronym>" "<expanded term>" "<country>"
"<person/topic>" "webinar"
"<topic>" "speaker" "<country>"
"<topic>" "curso" "<country>"
"<topic>" "congreso" "<country>"
"<topic>" "paper" "<country>"
"<topic>" "YouTube" "<country>" "speaker"
site:company.com "<topic>" "<person role>"
site:university.edu "<topic>" "<country>"
```

Always include Spanish/English variants when relevant:
- "inteligencia artificial", "IA", "AI";
- "puentes", "bridges", "BrIM", "Bridge Information Modeling";
- "gemelo digital", "digital twin";
- "vision por computadora", "computer vision".

### 3. Scraping / extraction stance

Use "scraping" as systematic extraction from public pages, not as aggressive or authenticated harvesting.

Allowed:
- search engine results;
- public LinkedIn snippets and publicly accessible profile pages;
- public YouTube channel/video metadata and descriptions;
- event agenda pages;
- company pages;
- research pages, papers, conference profiles;
- public PDFs and brochures;
- public GitHub/repositories.

Avoid or do not do:
- bypassing login walls or anti-bot protections;
- scraping private LinkedIn data;
- collecting personal data beyond professional contact fields relevant to the user's request;
- presenting emails/phones from scraped sources unless the user provided them or they are clearly public business contact data.

If only a LinkedIn snippet is visible, label it as "LinkedIn snippet signal" and do not overclaim.

### 4. Candidate evidence matrix

For every candidate, capture:

```text
Name:
Primary profile URL:
Location evidence:
Current role/company:
Must-have evidence:
Nice-to-have evidence:
Public artifacts: posts, papers, talks, courses, videos, projects
Fit score:
Confidence:
Recommended format:
Why contact / why not:
Open validation question:
```

Fit score suggestion:
- 30% domain fit;
- 20% geography/logistical fit;
- 20% credibility and proof artifacts;
- 15% communication/event value;
- 10% contactability;
- 5% novelty or strategic upside.

Adjust weights when the user explicitly prioritizes one criterion.

### 5. Deduplication and name variants

Search name variants before excluding a person:
- accents/no accents;
- first name vs nickname;
- paternal/maternal surnames;
- Spanish/English job titles;
- company name + person;
- email username if user provided one;
- YouTube/channel name if no LinkedIn appears.

If the user proposes a missing person, rerun the candidate search by name and explain whether the miss came from query coverage, weak indexing, spelling, or source visibility.

### 6. Output discipline

For speaker lists, use a table with:
- name;
- LinkedIn or strongest profile link;
- evidence summary;
- event/block fit;
- confidence;
- validation question before invitation.

Separate candidates into:
- Tier A: contact first;
- Tier B: validate;
- Tier C: only if the agenda needs coverage or a niche angle.

When the search is incomplete, say "first pass" or "not exhaustive" and list the remaining sources to inspect.

## Reproducibility

For Standard Research and Deep Dive work, preserve enough context that the research can be repeated or extended:

- record the final research question
- list the main search queries used
- keep source URLs in the final answer
- note the research date when recency matters
- state scope limits and excluded source types
- if working in a project folder, save a compact markdown memo only when the user asks or when the research becomes durable project memory

Do not require a long report by default. Reproducibility can be lightweight.

## Default Compression Contract

Deep Research exists to make decisions better, not to flood the user.

By default, return:
- bottom-line recommendation or answer;
- 3-7 decision-changing findings;
- confidence level and key unknowns;
- strongest sources attached to the claims that matter;
- next validation step when evidence is incomplete.

Keep internal unless requested:
- full query log;
- exhaustive source list;
- discarded sources;
- full angle map;
- scraping raw rows;
- detailed methodology;
- long literature notes;
- source-by-source summaries that do not change the decision.

Escalate detail only when the user asks, the deliverable is a formal report/deck/thesis section, or traceability is operationally required.

For scraping/source-mining tasks, also record:
- source classes checked and not checked;
- queries used;
- extraction method used;
- row count / candidate count;
- deduplication rule;
- fields that were inferred vs directly extracted;
- cost/auth/tool constraints;
- whether results are exhaustive or first-pass.

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

Default to Markdown. A rendered Markdown document is usually enough for research speed. Do not generate HTML, slides, dashboards or visual reports unless the user explicitly asks for them or the visual artifact is clearly part of the deliverable.

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
