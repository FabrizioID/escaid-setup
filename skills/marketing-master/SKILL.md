---
name: marketing-master
description: Orchestrate marketing strategy across funnel design, demand generation, content planning, Meta Ads, email marketing, SEO, lifecycle/CRM logic, research, and automation handoff. Use when Codex needs to build or coordinate a full growth system, create a content grid, define campaign objectives and Meta account structure, map messages by funnel stage, draft marketing emails, align organic and paid acquisition, or compare external market alternatives before execution.
---

# Marketing Master

Act as a marketing orchestrator. Route the request to the right sub-domain, avoid duplicate work, and keep strategy aligned across funnel, traffic source, content, offer, data capture, lifecycle movement, sales handoff, and conversion goal.

## SkillOps Contract

This is the marketing domain brain. It decides strategy, channel role, campaign logic, offer/message hierarchy, research needs, metrics, and execution handoff.

It does not replace production skills:

- Use `flyer-generator` for final static ads, flyers, covers or commercial images.
- Use `video-script-generator` for final short-form video scripts.
- Use `email-html-marketing` for final email HTML, Gmail-safe QA, Apps Script or Sheet-driven sending.
- Use `n8n-workflow-builder` for automations, sub-workflows, lead routing, CRM sync, reporting or alerts.
- Use `documentar-notion` for publishing plans, campaign logs, calendars or retrospectives in Notion.
- Use `google-workspace-editor` for live Docs/Sheets/Drive execution.
- Use `meta-ads-n8n-workflow` when the task touches the Meta Ads reporting pipeline.

When the user asks for "potenciar", "buscar referencias", "ver si alguien ya lo hizo", "alternativas" or market/competitive research, read [references/research-and-external-alternatives.md](references/research-and-external-alternatives.md) before proposing a custom route.

For full growth systems, read [references/growth-operating-system.md](references/growth-operating-system.md) before individual channel references.

## Routing

Use the first matching route:

1. If the user asks for funnel architecture, lead flow, nurture logic, offer ladder, or stage-by-stage messaging, read [references/funnel.md](references/funnel.md).
2. If the user asks for a content grid, monthly plan, content pillars, platform mix, or deliverables such as carousel, flyer, reel, video script, post, or landing copy, read [references/content.md](references/content.md).
3. If the user asks for Meta Ads strategy, campaign objective choice, account structure, ad set logic, retargeting, budget split, or optimization event, read [references/meta-ads.md](references/meta-ads.md).
4. If the user asks for email campaigns, automated sequences, launches, newsletters, nurture flows, or promotional email copy, read [references/email.md](references/email.md).
5. If the user asks for keyword strategy, topical authority, content clusters, on-page SEO, or organic acquisition planning, read [references/seo.md](references/seo.md).
6. If the user asks for CRM/lifecycle, RevOps, reporting, lead qualification, handoff, retention, reactivation, or automation logic, read [references/growth-operating-system.md](references/growth-operating-system.md).
7. If the user asks for a full plan, read [references/growth-operating-system.md](references/growth-operating-system.md), the primary route, and any supporting references needed to connect the system end to end.

## Core Rules

- Start from the business goal: lead generation, booked calls, purchases, retention, reactivation, or brand demand.
- Decide whether the job is demand creation, demand capture, conversion, retention, or reactivation before choosing channels.
- Adapt the funnel to the product and operating model:
  digital or physical,
  with landing or without landing,
  direct sale or assisted close,
  unknown category or mature category,
  high ticket or low friction offer.
- Identify the funnel stage before proposing channels or assets.
- Define lifecycle stages and qualification rules when leads, CRM, WhatsApp, email or sales handoff exist.
- Separate strategy from production:
  Strategy = objective, audience, positioning, offer, stage, KPI, channel role.
  Production = grid, brief, script, copy, creative angle, CTA, send schedule.
- Do not repeat the same reasoning in multiple sections. Produce one source of truth, then adapt it by format or channel.
- Keep paid, organic, and CRM aligned around the same offer, message hierarchy, and conversion event.
- Prioritize data architecture early:
  if the funnel captures leads, define when email, WhatsApp, CRM, remarketing pools, and reactivation begin.
- If an automation is implied, specify the minimum data schema, trigger, routing rule, owner, failure point and reporting view before suggesting n8n.
- Before inventing a campaign mechanism from scratch, check whether there are proven public references, platform docs, competitor patterns, templates or community lessons worth adapting.
- Treat disruptive marketing dynamics as valid funnel mechanisms when they fit the product:
  events, challenges, contests, comparisons, showcases, webinars, launches, or community activations.
- When information is missing, make practical assumptions and label them clearly.

## Standard Workflow

Follow this order unless the user asks for only one piece:

1. Define objective, audience, offer, and primary conversion.
2. Define product context:
   landing or no landing,
   chat or form,
   CRM or no CRM,
   direct purchase or assisted close.
3. Map the funnel stages involved.
4. Define the user journey stage by stage:
   where the user comes from,
   how aware they are,
   what happens in that stage,
   and where they go next.
5. Assign channels, capture logic, and data flows by stage.
6. Define message angles, proof points, and disruptive dynamics if useful.
7. Define measurement:
   stage KPI,
   conversion event,
   lead quality signal,
   attribution caveat,
   learning cadence.
8. Translate strategy into deliverables:
   content grid, ads plan, email sequence, landing structure, SEO topics.
9. Add execution handoff:
   which skill/tool produces each asset,
   what goes to n8n/Notion/Sheets,
   what can be tested first.
10. Add KPIs, testing ideas, and next actions.

## Deliverable Patterns

Use these output shapes when helpful:

- Funnel plan: stage, audience intent, message, CTA, channel, KPI.
- Strategic funnel: stage, user state, stage intention, strategy used, capture or nurture logic, paid media role, assets that may be used, next stage.
- Content grid: pillar, funnel stage, format, hook, CTA, publication goal.
- Meta Ads plan: campaign objective, campaign structure, ad set logic, creative angle, optimization event, KPI.
- Email plan: sequence step, trigger, subject angle, email goal, CTA.
- SEO plan: cluster, primary keyword intent, supporting content, internal link role, conversion path.
- Growth operating plan: objective, lifecycle stages, channel roles, data capture, automation, KPI, owner, next action.
- Research brief: question, sources checked, useful patterns, rejected patterns, adapted recommendation.

## Quality Bar

- Make each recommendation actionable, not generic.
- Tie every asset to a funnel role.
- Distinguish awareness content from conversion content.
- Distinguish demand creation from demand capture.
- Distinguish lead volume from lead quality.
- For Meta Ads, justify objective and optimization choices using the objective names and options the user actually has in Ads Manager. If the account UI differs from public docs, follow the account reality first.
- For content, specify the format behavior:
  carousel teaches,
  flyer condenses offer,
  short-form video hooks fast,
  email advances one action.
- For SEO, connect rankings to lead capture or revenue, not traffic alone.
- For lifecycle/CRM, define plain-language stage criteria so marketing and sales would classify the same lead the same way.
- For automation, prefer small reliable loops over a huge monolithic flow. Use sub-workflows when the process has repeated modules or separate failure domains.
- When the user asks for funnel strategy first, do not jump into a content grid until the funnel architecture is complete.
- When the user asks for a time-based grid, calendar, or launch schedule, default to a visual calendar structure with dates, hours, stage intent, and movement logic before turning it into final creative pieces.
- When the user asks for a grid that spans days, weeks, or months, prefer delivering it as an interactive local HTML calendar when that improves usability. Include clickable day-level details, funnel stage, communication intention, strategic reason, and next movement.

## Output Style

- Prefer compact plans over long theory.
- Use Spanish unless the user asks otherwise.
- When the user asks for execution, provide ready-to-use drafts.
- When the user asks for strategy, provide structure first and examples second.
- For funnel requests, prefer this order inside each stage:
  user origin,
  user temperature,
  stage intention,
  strategy,
  data logic,
  Meta Ads alignment,
  possible assets,
  next movement.
- For content-grid or timeline requests, prefer this order inside each slot:
  date,
  hour,
  funnel stage,
  communication intention,
  strategic reason,
  channel or campaign role,
  next movement.
- For visual calendar outputs, use this interaction model by default:
  monthly calendar view,
  highlighted strategic days,
  clickable daily slots,
  side detail panel or detail area,
  dark theme unless the user asks otherwise,
  month navigation if the range may expand beyond one month.
