# Current State

- Goal: Replace the paid Adveronix add-on with a free n8n workflow that extracts Meta Ads data and writes it to Google Sheets.
- Workflow scope: Meta Ads insights via Graph API, active-ad filtering, write to `RAW_Adveronix`, aggregate 7-day metrics into `AGG_Ads`.
- Current state: Deployed and active in n8n cloud.
- Latest meaningful change: switched matching from `ad_id` to a name-based composite key because Ads API and Insights API returned incompatible IDs in n8n.

## Live Context

- n8n instance: `https://aecode.app.n8n.cloud`
- Workflow name: `Meta Ads → RAW_Adveronix (Cada Hora)`
- Meta Marketing API base: `https://graph.facebook.com/v19.0/act_814556063599421/`
- Destination sheet: `https://docs.google.com/spreadsheets/d/17YTRWRxczWJMJgj-e85o3gSFW9Ymb9UNrROlNMmtRZM`

## Key Behavior

- Insights extraction is separate from the active-ad lookup.
- Active ads are determined downstream, not by using `filtering` inside the Insights node.
- The workflow generates zero rows for active ads that have no Insights data.
- `AGG_Ads` clears and rewrites only `A:R`.

## Expected Tabs

- `RAW_Adveronix`: daily ad-level output
- `AGG_Ads`: aggregated 7-day output

## Known Operational Truths

- Matching works by composite name key:
  `campaign_name || adset_name || ad_name`
- Filtering for truly active ads requires both:
  - `effective_status` in `{ACTIVE, IN_PROCESS}`
  - `adset.end_time` absent or in the future
