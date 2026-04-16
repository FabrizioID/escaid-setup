# Decisions

## Join by name, not by ID

- Decision: join Ads API output to Insights API output using the composite key:
  `campaign_name || adset_name || ad_name`
- Rationale: in n8n, `ad_id` from Insights did not reliably match the Ads API output.
- Consequence: duplicate names inside the same campaign and ad set would collide, but this is not expected in the current account.

## Active filter uses status plus end time

- Decision: an ad counts as active only if:
  - `effective_status` is `ACTIVE` or `IN_PROCESS`
  - and `adset.end_time` is empty or in the future
- Rationale: Meta may still report `ACTIVE` for ads attached to ad sets that have already ended.

## No `filtering` inside the Insights node

- Decision: do not use the Graph API `filtering` parameter in the Insights node.
- Rationale: it caused empty results in n8n.
- Consequence: filtering is done downstream in code.

## Pack and unpack around the Clear step

- Decision: package rows into one item before the Google Sheets Clear node, then unpack after.
- Rationale: the Clear node executes once per input item.
- Consequence: this is the reusable pattern when a flow must clear a range exactly once before writing.

## AGG_Ads columns S:U are protected

- Decision: clear range for `AGG_Ads` is `A2:R10000`.
- Rationale: columns `S:U` are managed by another AI workflow.
- Consequence: any write strategy must leave `S:U` untouched.

## Zero rows are intentional

- Decision: if an active ad has no Insights data, emit a row with zeros instead of dropping it.
- Rationale: the user prefers visibility of active ads even with zero spend or no recent metrics.

## Meta token is renewed manually

- Decision: use `fb_exchange_token` to extend the short-lived Graph API Explorer token to about 60 days.
- Consequence: manual renewal is required roughly every 60 days.
