---
name: meta-ads-n8n-workflow
description: Build, debug, and maintain the free n8n workflow that replaces Adveronix for Meta Ads reporting. Use when Codex should work on the Meta Ads to Google Sheets pipeline, inspect or update the RAW_Adveronix and AGG_Ads flow logic, troubleshoot matching between Ads API and Insights API, renew the Meta token, or verify active-ad filtering and aggregation behavior.
---

# Meta Ads n8n Workflow

Use this skill for the AECODE workflow that replaces the paid Adveronix add-on with an n8n cloud flow that reads Meta Ads data and writes to Google Sheets.

## Quick Start

When this skill triggers:

1. Read [references/current-state.md](references/current-state.md).
2. Read [references/decisions.md](references/decisions.md).
3. Read [references/maintenance.md](references/maintenance.md).
4. If the user asks to modify the workflow, inspect the live n8n workflow and the local JSON source of truth before proposing changes.
5. Preserve the existing contract with Google Sheets, especially columns that are intentionally left untouched.

## What This Skill Covers

- Meta Ads insights extraction through Graph API
- Active-ad filtering logic
- Matching Ads API output with Insights API output
- Writing to `RAW_Adveronix`
- Writing aggregated 7-day metrics to `AGG_Ads`
- Token renewal and operational maintenance
- Troubleshooting when the sheet shows zeros, missing rows, or mismatched joins

## Primary Workflow

Use this order unless the user asks for only one narrow task:

1. Confirm whether the task is about the RAW tab, the AGG tab, or both.
2. Confirm whether the issue is extraction, filtering, matching, aggregation, or write-back.
3. Reuse the existing design decisions from [references/decisions.md](references/decisions.md) unless there is clear evidence they should change.
4. Treat the local workflow JSON and the n8n cloud workflow as a pair that must stay aligned.
5. After changes, validate expected outcomes in the destination sheet, not only in n8n execution output.

## Non-Negotiable Rules

- Do not reintroduce Graph API `filtering` in the Insights node unless there is a confirmed reason and a direct test proves it works in n8n.
- Do not switch the join back to `ad_id` unless the API behavior has clearly changed and is verified.
- Keep the active filter based on `effective_status` plus `adset.end_time` unless the user explicitly asks to redefine what counts as active.
- Do not clear or overwrite columns `S:U` in `AGG_Ads`.
- If an active ad has no insights, keep the zero-row behavior unless the user asks to suppress those rows.
- Never store secrets or fresh tokens in the skill files.

## Routing

Use the first route that matches:

1. If the user asks why rows are missing or why metrics are zero, read [references/troubleshooting.md](references/troubleshooting.md).
2. If the user asks how the workflow currently works, read [references/current-state.md](references/current-state.md).
3. If the user asks why a certain design exists, read [references/decisions.md](references/decisions.md).
4. If the user asks about token renewal, sheet contract, or operational care, read [references/maintenance.md](references/maintenance.md).
5. If the user asks to extend the workflow, start from [references/current-state.md](references/current-state.md) and then apply the existing constraints.

## Output Discipline

- Be explicit about whether a recommendation affects RAW, AGG, or both.
- Distinguish confirmed behavior from hypotheses.
- When suggesting workflow changes, name the exact node or logic block that should change.
- When suggesting verification, specify the sheet tab and the expected visible result.
