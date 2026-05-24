# Meta Ads

Use this reference for Meta Ads strategy, account structure, and campaign design.

## Goal

Choose the right campaign objective, account structure, and optimization event for the funnel stage and business goal.

For reporting, lead routing, Sheets sync or workflow changes, pair this with `meta-ads-n8n-workflow` or `n8n-workflow-builder`.

## Minimum Inputs

- Business goal
- Offer
- Audience
- Funnel stage
- Conversion path
- Available creatives
- Budget range
- Existing data signals
- Tracking reality: pixel/CAPI, lead form, WhatsApp/messages, CRM, offline conversions or no reliable tracking

## Strategy Logic

- Start with the real business action:
  lead,
  message,
  purchase,
  booked call,
  landing conversion,
  app event,
  traffic support,
  awareness support.
- Use current Ads Manager reality first. Platform objective names and available optimization events can vary by account, region and campaign setup.
- Match the objective to the conversion event the account can actually optimize for.
- Separate cold prospecting from retargeting.
- Distinguish testing from scaling structure.
- Prefer broader signal-driven structures when the account has enough conversion data; avoid over-segmenting tiny budgets.

## For Each Campaign

Specify:

- objective
- campaign role
- audience type
- ad set logic
- creative angle
- optimization event
- budget logic
- KPI
- learning decision: kill, iterate, scale, or collect more signal

## Common Uses

- Awareness and category entry
- Prospecting for lead generation
- Direct response messages
- Retargeting and conversion recovery
- Event or webinar fill
- Launch support

## Guardrails

- Do not pick an objective just because it sounds similar to the goal.
- Do not mix cold and hot audiences in the same ad set logic.
- Define what counts as a qualified lead before scaling.
- Use the event the account has enough signal to optimize on.
- Do not judge creative only by cheap CPL. Check lead quality, sales acceptance and downstream movement.
