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

When a research artifact uses dense tables, add a short **Conceptos de esta tabla** block directly below any table that introduces technical, legal, operational or uncommon terms. Define each concept in 1-3 clear sentences: what it is, why it matters for the user's case, and the main caution if relevant. Do not push all definitions to one glossary if the user needs to read the table immediately. The global glossary can remain, but local concept blocks reduce black-box reading.

This local concept block is mandatory when the table includes terms such as Purview, tenant, DLP, RAG, ZDR, RBAC, MDM, IAM, API, webhook, model, embedding, vector database, agent, evals, guardrails, subprocessor, sensitivity label, ethical wall, SPI/CPI, BIM, scheduling or any acronym/domain term the user may not already use. Do not assume technical vocabulary is understood because it is common to vendors. If a term appears in a table and affects the decision, define it directly below that table.

For tables that include technical concepts, controls, methods, frameworks, case studies or vendor terms, include a visible column such as **Para que sirve / Utilidad para el cliente** unless the same function is already explicit in another column. The reader should understand not only what the concept is, but why it matters and how it helps the decision. Example: do not only say "Morgan Stanley used evals"; explain that evals are test sets/scoring checks used before deployment to see whether the AI answers correctly, cites sources, avoids sensitive data and is safe enough to use. For ESPARQ, evals would help test report answers, SPI/CPI explanations, contract summaries or purchase alerts before putting them in production.

Minimum explanation for a concept/control in research tables:

```text
What it is:
What it is for:
How it applies to this user/client:
What decision or control it enables:
Main caution:
```

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

Before expanding a topic, choose the angles that are necessary for the decision. Angles are not decorative categories, templates or fixed checklists; they are **strategic lenses** that prevent blind spots and extract variables. Common families are useful starting points, but the real angle set must emerge from the problem, Magnus' initial chain, evidence gaps and decision stakes.

Common angle families:

- Technical: architecture, integrations, model behavior, cloud, APIs, security controls.
- Legal/compliance: privacy, contracts, IP, liability, audit, data processing roles.
- Operational: who creates data, who updates it, where workflows break, field adoption.
- Financial: cost, margin, leakage, ROI, procurement, vendor lock-in.
- Psychological/trust: fear, adoption resistance, perceived control, executive confidence.
- Political/internal power: who gains visibility, who loses discretion, approval dynamics.
- Commercial: how to sell the solution without triggering fear or commoditizing the offer.
- Disruptive: what non-obvious move reframes the client's problem or creates unfair advantage.

Do not force these families into every investigation. Technical, psychological, financial, legal and operational angles are often useful, but they are still candidates, not requirements. Also allow problem-specific angles to appear: versioning/dependency angle for development bugs, regulatory angle for compliance, trust/adoption angle for AI, category-language angle for marketing, founder/resource angle for startups, or any other angle Magnus surfaces. If an emergent angle can change the recommendation, promote it to a real research branch with fronts, evidence, gaps and angle conclusion.

For strategic/client work, do not let implementation topics or examples replace the real angle set. "Cases reales", "Morgan Stanley", "Copilot", "Purview", "RAG", "agentes", "dashboard" or "Bilding" are usually **fronts/subfronts or evidence inside an angle**, not angles by themselves. A good angle name should describe the lens, e.g.:

```text
Technical/security angle -> fronts: Purview, prompts, RAG, agents, model deployment.
Psychological/adoption angle -> fronts: trust, fear, field adoption, executive confidence.
Financial/business angle -> fronts: ROI, margin leakage, cost of manual reporting, vendor lock-in.
Operational angle -> fronts: data entry, approvals, multi-project workflow, Bilding integration.
Commercial/proposal angle -> fronts: narrative, scope, phases, pricing logic, objections.
Legal/IP angle -> fronts: data protection, source code ownership, no reuse, subprocessor contracts.
Real-world cases angle? Usually no: cases should be evidence inside each angle, unless the specific research objective is "compare case studies".
```

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

Angles are variable-extraction engines, not labels. Each angle must identify what variables matter, what evidence can validate them, what uncertainty remains, and how the decision changes. If an angle is psychological, legal, financial, operational or technical, it still needs its own fronts, sublayers, evidence and implications.

Before writing the angle list, run an **angle sanity check**:

```text
Is this a lens that changes how we interpret the problem?
Or is it a topic, technology, vendor, case, source type or deliverable?
If it is a topic/vendor/case, place it under the right lens as a front or evidence.
If it is a lens, explain what variables it extracts and what decision it can change.
```

When a problem is strategic and multi-dimensional, prefer **angle-first decomposition**:

```text
Research angle -> fronts inside that angle -> sublayers -> gaps -> evidence -> implications -> decision change
```

Do not separate "angles" from "layers" as unrelated sections. The angle is often the delimiter that decides which layers matter. For example, the technical angle may generate cloud/model/RAG/security layers, while the psychological angle may generate trust/fear/adoption/perceived-control layers. Each angle should expose different variables and different gaps.

Use system-flow layers only as a shared backbone when needed; then revisit each angle and ask what the backbone misses from that perspective.

### Fronts vs Child Branches

Do not confuse **fronts/subfronts** with **child branches**:

- **Front / subfront:** a planned analytical decomposition chosen before or during the angle scan because the angle is broad. Example: inside a technical angle, planned fronts may be prompts, permissions, cloud/provider, open source, RAG and agents. Fronts answer: "What parts must this angle be split into to understand it?"
- **Child branch:** a recursive expansion created only after a researched front/subfront reveals a real gap. Child branches answer: "What new uncertainty did this finding create that could change the decision?"

Deep Research Proper should normally show this visible structure for each major angle:

```text
Angle
-> table of fronts for that angle
   -> front expanded because it is decisive
      -> internal table of subfronts for that front
         -> subfront finding
            -> gap detected
               -> child branch / sub-branch with evidence and decision impact
```

Do not jump straight from an angle to isolated numbered sections if the angle first needs a map of fronts. The front map is the reader's proof that the angle was decomposed intentionally. Numbered sections such as `8.1`, `8.2` usually represent decisive fronts being expanded; deeper numbers such as `8.1.1` may represent child branches if they were created by gaps.

Use labels that preserve causality:

```text
## 8. Technical angle
| Front | Trigger question | Evidence/hallazgo | Gap opened | Expand? |

### 8.1 Prompts as leakage surface
| Subfront | Question | Evidence/hallazgo | What it is for / client utility | Gap opened | Decision |

#### Child branches from P1 - Prompt as data
| Gap detected | Child branch | Evidence/hallazgo | What it is for / client utility | What remains unproven | Decision impact |
```

If a child branch itself reveals another gap, continue as a sub-branch. If it does not change the decision, stop and state why.

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

For Deep Research Proper, increase source density: important fronts, sublayers, gaps and child branches should carry citations or explicitly state that evidence is still missing and must be validated. Do not concentrate all citations in one bibliography or a few high-level sections. Sources must sit next to the claim, gap, finding or decision they support; otherwise the evidence trail becomes a black box.

When a sublayer opens new gaps, continue recursively. Do not assume one sublayer produces only one gap. A sublayer may produce zero, one, or several relevant gaps; each relevant gap becomes its own child branch until evidence is sufficient, the branch stops changing the decision, or the remaining gap must be marked as explicitly unresolved.

If only one section has child branches, audit whether that is genuinely because only that section needed recursion. In Deep Research Proper, most strategic/technical angles usually open at least some child branches. If an angle has no child branches, state why: enough evidence, branch irrelevant to decision, or pending client validation.

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

   Research Assist is **not** a loose web summary. It uses the same reasoning spine as Deep Research Proper, only with fewer sources, fewer expanded branches and shorter writing. Magnus still runs the full F1-F13 chain internally; the visible response shows the decisive variables and phases that changed the recommendation. Do not call this a "mini chain"; call it a **visible trace of decisive Magnus variables** or simply **Traza Magnus visible**.

   Minimum Research Assist output for strategic/client work:

   ```text
   1. Objective and decision supported
   2. Strategic thesis / base truth
   3. Traza Magnus visible: only the F1-F13 phases that changed the decision
   4. Angle map: real angles, not vendors/cases/topics
   5. For each important angle:
      - fronts or decisive fronts
      - evidence/cases with source links
      - what transfers to the user/client
      - conclusion of that angle
   6. Good cases / bad cases or limits when relevant
   7. Academic/literature note when useful, or explicitly say industry evidence is the stronger basis
   8. Remaining gaps / validation questions
   9. Final conclusion connecting variables into the recommendation
   ```

   In Research Assist, **every selected angle must end with a short conclusion**. This conclusion is not a summary of the table; it explains how that angle changes the decision. Example: "The financial angle shows that ROI depends less on saving report hours and more on avoiding even 0.5%-1% of portfolio deviations."

   Cases and academic evidence in Research Assist:

   - Include real-world cases when the topic involves ROI, pricing, adoption, technology implementation, AI, security, operations, product strategy or client proposals.
   - Include both positive cases and negative/limiting evidence when the decision could fail through adoption, scope, risk, poor data, bad implementation or weak governance.
   - Include a compact academic/literature layer if papers or formal studies materially strengthen the claim. If the topic is mostly industry/commercial, explicitly state that industry cases are the stronger evidence base and academic evidence is secondary.
   - Do not dump all cases in a single list if angle-level placement is more useful. Prefer cases inside the angle they support; a small cross-angle case table is acceptable only after angle conclusions.

   Research Assist style:

   - Explain like an analyst telling a coherent story, not like a source extractor.
   - Each table should answer "so what?" through columns such as `Transferencia al cliente`, `Utilidad`, `Decision impact` or a conclusion immediately below.
   - Use compact prose between tables to connect cause and consequence.
   - Do not over-technicalize client-facing findings. If a concept is uncommon, define it directly below the table.

2. **Deep Research Proper** - only when the user explicitly asks for deep research or uses equivalent wording.
   - Triggers: "deep research", "investiga a profundidad", "investiga bien profundo", "exprime todo", "L3", "L4", "dossier", "fuentes completas", "matriz de evidencia", "no te quedes corto", or equivalent.
   - Purpose: produce a decision-grade investigation.
   - Depth: L3-L5 unless constrained.
   - Behavior: multi-round search, open and inspect sources, source-class diversity, contradiction search, evidence ledger, claim-source mapping, confidence ratings and validation questions.
   - Output: structured findings with sources near claims, angles that changed the decision, risks, unknowns and next validation steps.
   - Time expectation: slower; do not pretend it is complete if only a quick scan was performed.

If the user explicitly asks for Deep Research Proper, do not answer from memory, Research Assist, a short scan, or a curated Coda-only structure. This is a hard trigger. If tool/time/source limits prevent true depth, say so and label the result as a partial pass.

For Deep Research Proper, do not over-compress to "save space" when the artifact is a local `.md`. Use the file as the working surface and expand it as needed. If the research is too large for one response, update the artifact iteratively and summarize progress to the user; do not collapse the investigation into a shallow answer.

### Same Method, Different Depth

Research Assist and Deep Research Proper use the same intellectual structure. They differ in expansion, not in logic.

Both modes must preserve this backbone:

```text
objective -> necessary angles -> fronts/layers -> sublayers -> gaps -> evidence/signal/inference -> base truth -> conclusion/recommendation
```

Research Assist must not skip steps just because the answer is shorter. It may compress them:

| Deep Research Proper | Research Assist |
|---|---|
| Full angle maps with many fronts | 2-5 decisive angles with only the fronts that change the decision |
| Many sources per front | 1-3 high-signal sources per decisive front |
| Child branches shown when gaps open | Gaps listed compactly; branch only if it changes the recommendation |
| Full F1-F13 trace may be shown | Full F1-F13 runs internally; visible trace shows decisive phases/variables |
| Conclusion per angle and final closure | Conclusion per angle and final closure still mandatory |
| Detailed cases and academic tables per section | Compact cases and academic note/table where relevant |

Before answering in Research Assist, run this output QA:

```text
Did I define the decision the research supports?
Did Magnus run the full chain internally, with only decisive variables shown?
Did I choose angles as lenses, not topics/vendors/cases?
Did each angle include fronts/evidence/transfer/conclusion?
Did I include real-world cases or explain why they are not relevant?
Did I include academic/literature support when it materially strengthens the claim, or explain why industry evidence is primary?
Did I separate evidence, signal, inference and assumption?
Did the final conclusion connect variables into a recommendation instead of merely summarizing facts?
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

For strategic Deep Research Proper with Magnus, the conclusion must be a reasoned closure, not a short executive summary. It should explain the path from final-chain variables to decision: which variables changed the recommendation, which sources were decisive, what base truth survived, what option wins, what is rejected, and why. Include source links next to the decisive variables or claims in the conclusion itself, not only earlier in the artifact.

The Magnus F1-F13 trace should not be artificially reduced to one question per phase. Magnus may run a broad internal battery; the visible artifact should show the 1-3 decisive questions per phase when they add different variables, especially in disruption, reframing, asymmetry, adoption, feedback and final closure. One visible question is acceptable only when additional questions would be redundant.

When the topic benefits from academic support, include a real academic/literature layer, not only consulting reports, vendor docs and official frameworks. Papers, theses, systematic reviews or scholarly articles are especially useful for adoption, trust, human-in-the-loop, security risks, construction/AEC digital transformation, methods, legal/ethical risk and any claim that needs non-vendor validation. Put those sources inside the relevant angle/front/branch, not only in the final bibliography.

**Both evidence tables are dedicated and repeatable per section — symmetric rule.** A Deep Research Proper artifact has TWO recurring evidence-table types: (1) the per-angle real-world cases table, and (2) the academic/literature table. Both follow the SAME placement rule: each gets its own dedicated table inside EVERY section, angle, or front where that evidence class strengthens the argument — not one global table at the end, and not "scattered inline". If a topic has six angles and academic evidence strengthens four of them, there are four academic tables, one per angle. The academic table structure:

| Fuente académica | Hallazgo | Relevancia para [cliente/decisión] | Grado |
|---|---|---|---|

When you introduce either table type in one section, ask for every other section: "does this evidence class also apply here?" If yes, add the table there too. If a section genuinely does not need one (e.g. the topic is industry-driven, not academic), state that explicitly in that section ("tema de industria, no académico — fuentes formales son sustento secundario aquí") rather than silently leaving it out. The reader should never wonder whether you forgot the table or decided it did not apply — make the decision visible.

**Academic vs. vendor source hierarchy for security/AI/enterprise topics:** peer-reviewed papers and academic preprints (arXiv, ACM, IEEE, PubMed) outrank vendor documentation as evidence of mechanism or risk. Vendor docs confirm product behavior; papers confirm whether the underlying mechanism is real, how severe it is, and what defenses actually work under controlled conditions. When both exist, use papers for the claim and vendor docs for the product-specific implementation. If only vendor docs exist for a claim, label it as vendor assertion, not independent evidence.

**Lateral-path question for AI/data/privacy research (2025–2026 standard):** the central question is no longer "does the provider train with my data?" but "by what lateral paths can my information leave the perimeter even if the provider does not train with it?" Always decompose: training / retention / logs / connectors / agents / RAG / cache / grounding / third-party extensions / telemetry / human review for abuse/compliance. Each path is an independent risk surface. A "no training" commitment does not close the other paths. Treat this decomposition as mandatory when the topic is AI confidentiality, data governance, enterprise AI adoption, or security architecture.

**Honesty rule for residual risk claims:** do not present a universal safety percentage for AI security. NIST explicitly states that many GenAI risks are difficult to estimate and that the science of measurement in this domain remains immature. The correct framing is: auditable engineering objectives (e.g., "zero transmission of restricted data in clear to external models", "100% of connectors in allowlist with privacy evaluation", "no critical exfiltration findings in red teaming before production") rather than statistical guarantees. If the user or client expects a percentage, reframe it as a controlled test result on a specific corpus, not a universal rate.

When the research supports a business, strategy, technology, product, operations or client proposal decision, actively look for **real-world examples / case studies / adoption proof** inside each important angle or front. Do not rely only on abstract patterns, papers or vendor capability pages. The strongest structure is:

```text
Claim or pattern -> real company / sector / country example -> what they did -> source -> what transfers to this user/client -> what does not transfer
```

If no named company case is available, use the closest credible implementation evidence: public case study, government/program case, customer story, interview, public architecture, procurement record, product adoption report, benchmark, incident postmortem, or industry survey with examples. If no credible case exists, mark the gap explicitly instead of implying real adoption.

**Per-angle real-world cases table (mandatory in Deep Research Proper for client/proposal work):** just as academic evidence gets its own dedicated section before the angle's sub-fronts, real-world cases must also get their own table *inside each angle where they are relevant*, not only in a final bibliography or scattered inline. Do not consolidate all cases into one global section — cases mean different things in different angles. The same company (e.g., JPMorgan) may belong in the technical angle as an architecture example, in the psychological/adoption angle as a trust-building pattern, and in the financial/competitive angle as a data-protection decision. Each instance of the case must explain what that angle specifically learned from it.

Use this table structure per angle:

| Empresa / Caso | Que hizo (especifico) | Que demuestra para este angulo | Que transfiere al cliente | Que NO transfiere | Fuente / Grado |
|---|---|---|---|---|---|

Rules for this table:
- Include only cases where the company is named and the action is documented, not vague "a large bank" references.
- If a case only appears as secondary press reporting with no primary disclosure, label it as "ampliamente reportado, fuente primaria no localizada" — do not omit it, but do not present it as primary evidence.
- Each case row must complete both "que transfiere" and "que NO transfiere" — a case without a "no transfiere" limit is overclaiming.
- Cases from sectors adjacent to the client (finance, legal, operations, construction) are more transferable than pure tech company cases; note the sector distance explicitly.
- For psychological/adoption angles, prioritize cases where user sentiment, resistance, or trust trajectory is documented, not just architecture.
- For legal/IP angles, prioritize cases where IP loss, data breach notification, or contract conflict was the reported outcome.
- **The number IS the case.** When a case has a central quantitative fact — price, amount charged, revenue, % change, user count, cost, conversion, time — that figure MUST appear in the row. A pricing/cost/market case without its key figure is incomplete and reads as filler. If you cite "Adobe switched to subscription" you must also cite *for how much* (e.g. "perpetual ~USD 2,600 → USD 54.99–69.99/month"). If the figure is not yet found, run another search specifically for it before finalizing; only if it is genuinely undisclosed do you write "cifra no divulgada" explicitly.
- **Distinguish mirror cases from model cases.** A case can be the *opposite* of the client's situation (mirror) or the *same* (model). Both are valuable but must be labeled. A mirror case (e.g. Adobe retaining IP when the client wants to own it) proves *why* a pattern exists; a model case (e.g. a custom-built platform with disclosed cost) gives the *actual number to transfer*. For decisions that need a concrete figure, always hunt for at least one model case with a real number, not only mirror cases.
- **Balance failure cases with success cases — never only problems.** Incident/failure cases (breaches, lawsuits, leaks, churn) prove the risk is real, but an artifact built only on disasters reads as fear-mongering and gives the client no path forward. For every risk-heavy angle, also find **success cases**: companies that did it well, *how they implemented it*, *how they solved or managed the risk*, and *what result they got* (with the figure). The strongest structure shows both faces: "X failed because it had no governance (cifra del daño) vs Y succeeded because it governed data + kept a human in the loop (cifra del resultado)". The contrast itself is the insight — it shows the difference between disaster and success is not the technology but how it was managed. A proposal-oriented investigation that only documents what goes wrong is incomplete; the client must see that the recommended path has worked for others.
- **Success cases must show the "how", not just the outcome.** A success case is only useful if it explains *how they managed it* — phased rollout, data-quality-first, human-in-the-loop for critical actions, continuous monitoring, governance framework, etc. "Company X adopted AI successfully" is not a case; "Company X started with a low-risk use case, invested in data quality before scaling, kept humans approving critical decisions, and reached N% adoption" is. The "how they solved/managed it" is what transfers to the client; the outcome figure is what proves it worked.
- **Prefer same-sector success cases.** When the client is in construction/finance/health/etc., a success case from the SAME sector (e.g. Vinci for a construction client, −30% document search time) is far more persuasive than a generic tech case. Hunt for sector-specific success stories with figures before falling back to cross-sector examples.

**Proactivity rule — do not wait to be asked.** Real-world cases AND academic sources are part of the default Deep Research Proper deliverable, not add-ons the user has to request. If the research is proposal/decision-oriented and you ship it without a per-angle cases table and without checking for academic support, that is an incomplete pass — even if the user did not explicitly ask for them. Search for both proactively. If after searching they genuinely do not apply or do not exist, say so explicitly ("no se encontró caso real con cifra para X" / "el tema es de industria, no académico — fuentes formales son sustento secundario"). Stating honestly that a source class does not apply is correct; silently omitting it is not.

**Local/national grounding rule — the client's jurisdiction is a first-class research variable (applies at BOTH levels).** When research touches anything regulatory, legal, normative, compliance, standards, certification, procurement or market-structure related, do NOT stop at international/global frameworks (OWASP, NIST, ISO, GDPR, IEEE, etc.). International frameworks give *authority and mechanism* — "why this risk is real, what the global standard says." But what hits the client directly is the **local/national equivalent of their own country**: the specific law, technical norm, regulator, fine amount, or certification that actually applies to them and that they can be sanctioned under.

Always pair the two layers:

| Layer | What it provides | Example (Peruvian client, AI security) |
|---|---|---|
| International framework | Authority, mechanism, "why it matters", global credibility | OWASP LLM Top 10, NIST AI RMF, ISO/IEC 42001 |
| Local/national instrument | Direct applicability, compliance, fines, the regulator with teeth | Ley 29733 (datos personales) + DS 016-2024-JUS, Ley 31814 (IA responsable) + DS 115-2025-PCM, NTP-ISO/IEC 42001:2025, ANPD, multas en UIT/soles |

The local layer is often **more persuasive** than the international one, because it speaks to what the client can actually be fined or sued for in their jurisdiction — it goes straight to what affects them. "Cumples la Ley 31814 peruana y te evitas multas de hasta ~S/ 550,000" lands harder with a Peruvian client than "you follow the NIST framework."

So: when you identify the client's country/jurisdiction (or it can be reasonably inferred), actively search for the national counterpart of every international standard you cite — the local data-protection law, the local AI law, the local technical norm (NTP, NOM, NCh, IRAM, etc.), the local regulator, and the local penalty scale. This is not only for laws: it applies to industry standards, certifications, procurement rules, tax/labor regimes and market benchmarks. If a national instrument exists and you omitted it, the research is incomplete for that client. If none exists yet, say so explicitly ("no hay aún norma nacional específica; aplica el marco internacional X como referencia").

**Family-term completeness check — do not take one face of a multi-part thing as if it were the whole (applies at BOTH levels).** Many things cited in research are not single objects but **families** with several faces. Treating one face as the whole is a silent blind spot: you pick the right piece for the immediate problem but never map that other pieces of the SAME term exist — and one of them surfaces later (in a technical doc, a meeting, a competitor) looking like a gap the research missed.

Before citing a standard, framework, law, technology, provider, methodology or category as if it were one thing, check whether it is actually a family. If it is: briefly enumerate the relevant variants, declare which one(s) apply to the client's problem, and state which are left out and why.

Common family-terms that hide multiple faces:

| Family-term | Faces (must disambiguate which you mean) |
|---|---|
| OWASP | ASVS (app sec) · LLM Top 10 (AI) · API Security Top 10 · Top 10 (web) |
| ISO | 27001 (infosec) · 42001 (AI mgmt) · 9001 (quality) · 27701 (privacy) · 14001 (environment) |
| NIST | CSF · AI RMF · 800-53 · 800-171 |
| SOC | SOC 1 / 2 / 3 · Type I / II |
| "The cloud" | IaaS · PaaS · SaaS |
| "AI" | predictive/ML · generative/LLM · agentic |
| A law | base text + reglamento + decretos supremos + modificatorias |
| A vendor | its multiple products / tiers / contracts |

The test: if you write "we follow / we use [X]" and X has named sub-parts, the reader cannot tell which part you mean — and may need a different face of the same X. The one-sentence fix: *"X has parts A, B, C; we use A because [fit with the problem]; B/C are out of scope because [reason]."*

This is the generalization of the OWASP lesson: the failure was not "we should have researched ASVS too" — ASVS was correctly out of scope. The failure was treating "OWASP" as one thing instead of mapping that it is a family and declaring which face we used and which we left out. Run this check on every family-term so the second face never ambushes the research later.

The final Magnus conclusion must be a variable-crossing closure. Do not merely restate phases or summarize sources. It should name the decisive crosses, such as adoption vs value, workflow vs confidentiality, no-training vs retention/logs, construction maturity vs sophistication, legal/IP vs architecture, and human adoption vs technical controls. Then it must convert those crosses into a concrete decision, rejected options, conditions to proceed and the final base truth.

**Two Magnus chains are mandatory in strategic Deep Research Proper — initial AND final.** The *initial* chain (F1-F13) runs before the evidence and opens the variables/angles. The *final* chain (F1-F13) runs AFTER the evidence is gathered and re-crosses each phase with the real numbers and findings the research produced. These are different tables with different answers — the initial chain asks "what should we investigate?", the final chain asks "now that we know X, Y, Z, what does each phase decide?". Shipping only the initial chain is an incomplete pass. The final chain is what connects the investigation to the closing decision; without it the conclusion floats. If a phase did not change between initial and final, it is fine to compress it, but the final chain must exist as its own visible section before the conclusion.

**Quantitative-decision rule — when the decision is a number, the conclusion must produce that number.** If the research exists to support a price, budget, size, rate, timeline, headcount, or any quantitative decision, the conclusion is NOT done until it lands a concrete tentative figure (or a tight range) WITH its derivation and a "why this number and not more / not less" justification. Do not stop at the structure or the model ("charge in 4 layers") — that is the method, not the answer. The user asked, implicitly or explicitly, "how much?" — and the conclusion must answer it with the calculation shown (e.g. "900–1,600h × USD 45–55/h = USD 45k–88k") anchored to the benchmark sources. A conclusion that explains *how to think about* the number without producing the number is incomplete for a quantitative decision.

In Deep Research Proper, each major angle must also close with an **Angle Conclusion** before moving to the next angle. This is not a generic summary. It should connect that angle's decisive evidence, strongest gaps, what the angle changed in the recommendation, and what remains to validate. Use sources near the claims that mattered most. Tables can carry the evidence, but the angle conclusion must turn the table into meaning.

**Explanation quality rule — applies throughout the entire document, not only in the conclusion:** every time a component, control, concept, angle or decision is explained in an investigation oriented toward a proposal, the explanation must follow this structure:

1. Say what it IS in simple terms — do not assume the reader already knows.
2. Say what specific problem it solves for this client — not generically, but anchored to their pain.
3. Connect it to a real case or evidence that justifies the choice.
4. Use short paragraphs with line breaks between ideas — never a wall of text.

This applies to the conclusion, to angle summaries, to component descriptions, to tables, and to any section where something important is being explained. The test: if a reader who knows nothing about the technology reads the explanation, they should understand what the thing is, why it matters for them, and why this option was chosen over others. If the explanation only names the component without those elements, it is incomplete.

**Narrative sequentiality — explanations must chain, not sit side by side (applies to BOTH Research Assist and Deep Research Proper).** Well-explained blocks placed next to each other are still weak if they are *informative* (isolated facts laid out in a row). The goal is *narrative*: each idea leads into the next, builds on it, and advances toward the decision. The reader is carried by the hand through a reasoning that moves forward — not handed a list of correct-but-disconnected items.

The decisive test: **if you can reorder the paragraphs without the meaning breaking, it is informative (weak); if the order matters because each paragraph leans on the one before it, it is narrative (strong).**

Example of the difference (technical angle of a conclusion):
- Informative (weak): "DLP is X. RAG is Y. API enterprise is Z." — three correct facts, reorderable, no momentum.
- Narrative (strong): "The risk does not live only in the model → so 'no training' is not enough → so there are 10 lateral paths → so the architecture must close each one structurally." — each clause pushes the next; the order cannot be shuffled.

Use connective logic ("por eso", "entonces", "lo que significa que", "y aquí aparece") to make the sequence visible. This is mandatory in the conclusion and strongly preferred wherever an argument is being built — at any research depth, not only deep dives. A Research Assist conclusion is shorter, but it must still flow as a sequence, not as a bullet dump.

**Magnus conclusion structure for proposal-oriented research:**

```
1. Opening decision — one paragraph, what the investigation closes on and why
2. Per-angle synthesis — for each relevant angle:
   - What the angle revealed that changed the recommendation
   - Short paragraphs, real case or evidence inline, reduced citations (decisive ones only)
   - Not a summary of the angle — the specific insight that moved the decision
3. Definitive solution — each component explained with:
   - What it is (simple)
   - What problem it solves for this client specifically
   - Why this option wins over alternatives
   - Real case or evidence that supports it
4. What gets rejected — brief, with the reason and a case that illustrates it
5. Closing phrase — one or two lines, client-facing, proposal-ready
```

Do not collapse the conclusion into a short summary. The conclusion is where the investigation lands — it must carry enough explanation that someone who reads only the conclusion understands what gets built, why, and what was ruled out.

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

When Research Assist is used for strategic questions, do not collapse the structure into a flat list of findings or an over-short answer. Research may run the same internal structure, but the visible output should be curated: a brief **Coda Magnus** with the few questions/variables that changed the frame, a table of selected angles, a developed conclusion for each angle with the most relevant sources underneath, local concepts only where needed, and a strong final conclusion. Do not show the full Magnus chain unless the user asks. Each selected angle should still be developed enough to explain what it reveals, what gap remains and how it changes the recommendation. The difference from Deep Research Proper is fewer search iterations, fewer sources per claim, fewer recursive branches and shorter explanations, not removing angles, fronts, Magnus trace or meaningful development.

Research Assist must also seek at least one real-world case/example when the topic is business, technology, product, operations or proposal-related. In the quick mode, one strong case may be enough; in Deep Research Proper, cases should be mapped across the important angles/fronts.

**Case-quality rules scale by volume, not by principle — they apply at BOTH levels.** The rules above (the number IS the case, balance failure with success, success cases show the "how", prefer same-sector cases, both evidence tables, distinguish mirror/model) are NOT exclusive to Deep Research Proper. They define *quality*, and quality applies even to a single case. What changes between levels is only the quantity:

| Element | Research Assist (L2) | Deep Research Proper (L3+) |
|---|---|---|
| Cases | 1-2 strong cases, still WITH their figure and a success/failure balance where it matters | full per-angle case tables across every relevant angle |
| Case tables | a compact table even for 2-3 cases is fine and preferred over scattered inline | dedicated table per angle |
| Figure rule | still mandatory — a pricing/cost case without its number is incomplete at any level | same |
| Academic | cite if one strong source materially supports a claim; say so if not academic | dedicated academic table per relevant angle |
| Magnus chains | a brief Coda Magnus (few decisive questions) | full initial AND final F1-F13 chains |

So: a Research Assist on "how does competitor X price" must still give competitor X's actual price (figure rule) and, if relevant, one success and one cautionary case — just fewer of them, in a smaller table, with a shorter conclusion. Do not use "this is only Research Assist" as an excuse to drop the figure, drop the success/failure balance, or list cases without a table. Lower depth means fewer rows, not lower standards per row.

Deep Research Proper must show how branches were expanded, why they stopped, and what remains unresolved.

### Deep Research Completion Audit

Before saying "done" on Deep Research Proper, audit the artifact against this checklist and fix missing pieces first:

- Local `.md` artifact exists or was updated as the working surface.
- The `.md` artifact was used as the expandable working surface; Deep Research Proper was not compressed just to fit a chat answer.
- Initial Magnus F1-F13 trace is present when the research is strategic; visible rows show 1-3 decisive questions per relevant phase, not automatically one question per phase.
- Angles are emergent, not a fixed template, and each selected angle has a question mother.
- Each selected angle is a strategic lens such as technical, psychological/adoption, financial/business, operational, legal/IP/compliance, commercial/proposal, political/internal power or another justified lens. Topics, vendors, tools, case studies and deliverables are not promoted to angles unless the research objective specifically requires that comparison.
- Each major angle shows a front map/table before expansion when the angle is broad. The map lists fronts, trigger questions, evidence/hallazgo, gaps opened and whether each front is expanded.
- Major angles are decomposed into numbered sublayers when complexity requires it, e.g. `8.1 Prompts`, `8.2 Permissions`, `8.3 Cloud/retention`, not only one flat table.
- Expanded fronts distinguish planned subfronts from child branches caused by gaps. Do not label a planned subfront as a child branch unless it was created by a finding's unresolved gap.
- If a sublayer reveals a new unresolved mechanism, open visible child sublayers under it, e.g. `8.1.1 Prompt injection`, `8.1.2 Prompt logs`, `8.1.3 Prompt DLP`. These child sublayers are not decorative; they appear only because the parent finding created a real gap that can change the decision.
- Each sublayer has question, evidence/signal/inference, finding, utility/what-it-is-for when a concept/control/case is introduced, gaps and decision impact.
- Important gaps can branch into multiple child branches; child branches explain evidence, what remains unproven and decision impact.
- Academic/literature sources were evaluated and included inside relevant fronts/branches when they strengthen the topic; if not included, the artifact explains why vendor/official/business sources were sufficient.
- Real-world company/sector/country examples or case studies were searched for and attached to relevant fronts when they strengthen the claim. If none were found, the gap is explicit.
- Sources are inline near claims, gaps and findings; final bibliography is not a substitute.
- Dense tables have local **Conceptos de esta tabla** blocks when they introduce non-common terms. Important acronyms and vendor terms used in a table, such as Purview, tenant, DLP, RAG, ZDR, RBAC, API, BIM, evals or subprocessor, are defined directly below that table.
- Tables that introduce controls, methods, tools, cases or technical concepts include a clear **Para que sirve / Utilidad para el cliente** explanation, either as a column or in the local concept block. If the user cannot tell why the concept matters for their decision, the table is incomplete.
- Each major angle closes with an **Angle Conclusion** that turns tables into meaning and names how the angle changed the recommendation.
- Final Magnus chain runs after evidence; visible rows again show 1-3 decisive questions when multiple variables matter.
- Final Magnus conclusion is not a short summary. It explicitly crosses decisive variables, names rejected options, states the winning decision, gives conditions/gates to proceed and ends with a base truth.
- If any element is intentionally omitted, state why: evidence sufficient, irrelevant to decision, or pending client validation.

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

### Local / Provided Sources

Research is not web-only. If the user provides local files, Drive folders, PDFs, Word docs, Sheets, transcripts, screenshots, exports, repo docs, Notion pages or project memory, inspect those sources as part of the evidence base before assuming public web is enough.

Treat client-provided or project-local documents as **internal primary sources** for what the client said, planned, measured, promised or documented. Cite them near claims using the clearest available locator: file path/name, Drive/doc title, page/slide/sheet, section heading, row, timestamp or excerpt label. Separate internal evidence from public evidence, for example: `Internal source: /path/proposal.pdf, p. 4` or `Drive source: "Dashboard Lili", sheet Metas`.

Use web research to verify external facts, current vendors, regulations, benchmarks and public claims; use local/provided sources to understand the actual case, constraints, history and client-specific truth. If local access is unavailable or a Drive link cannot be read, mark the gap and ask for access or an export.

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

1. Internal/client primary source: provided files, Drive docs, transcripts, meeting notes, spreadsheets, project memory, repo docs, signed proposals, official client exports.
2. Primary/official public source: company, government, court, regulator, standards body, original paper, official docs.
3. Direct ecosystem source: client, partner, supplier, project owner, certifier, event organizer.
4. Reputable analysis/report: academic, consultancy, industry report, credible media with named sources.
5. Public behavior signal: reviews, forums, comments, job posts, social posts, communities.
6. Weak/directory source: aggregator, scraped profile, generic listing, AI-written article, SEO page.

Weak sources can generate leads, not conclusions. Upgrade them through primary or direct ecosystem evidence.

**Source grade mapping for AI/security/enterprise research:**
- **Grade A:** peer-reviewed paper, academic preprint with clear methodology, official government/standards body document (NIST, ISO, OWASP), primary incident disclosure from the affected organization.
- **Grade B:** reputable vendor technical documentation (Microsoft Learn, AWS Docs, Google Cloud Docs, Anthropic Terms), credible consultancy report with named methodology, systematic review or meta-analysis.
- **Grade C:** widely reported corporate case (Samsung, JPMorgan) where no primary company disclosure exists — label explicitly as "widely reported, no primary source located."
- **Grade D:** secondary press summary, marketing claim, undated or unattributed vendor blog.
When building a security or privacy argument, Grade A must anchor the mechanism claim; Grade B can confirm product behavior; Grade C may illustrate adoption pattern but must carry an explicit "primary source not verified" label.

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
- For AI/security/privacy topics: did I decompose the full lateral-path surface (training / retention / logs / connectors / agents / RAG / cache / grounding / third-party extensions / telemetry) or did I stop at "no training = safe"?
- Did I use academic papers as mechanism evidence and vendor docs as implementation evidence, or did I conflate them?
- If I stated a safety/security percentage, did I anchor it to a specific test corpus and scope, or did I imply a universal guarantee?

### Output Growth Rule

Do not artificially compress tables, branches, or evidence sections to keep the output short. If a table naturally grows because there are more relevant fronts, gaps, or cases, let it grow. Compression is for chat synthesis only; in `.md` artifacts and Deep Research Proper, completeness wins over brevity. The rule is: compress what does not change the decision; expand what does. Never truncate evidence that carries a decision impact, even if the total output becomes long.

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

For Deep Research Proper, prefer creating or updating a local `.md` artifact instead of placing the whole investigation in chat. The Markdown file is the working surface: iterate in place, expand branches, merge new evidence, revise conclusions, and preserve the structure across turns. The chat response should only summarize what changed, where the file is, and any important caveat. This avoids context/output limits and lets future agents continue the investigation safely.

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
