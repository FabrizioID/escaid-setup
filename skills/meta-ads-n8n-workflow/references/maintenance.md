# Maintenance

## Regular Maintenance

- Renew the Meta token before expiry.
- Keep the live n8n workflow aligned with the local JSON source of truth.
- After each logic change, verify the sheet output visually.

## Token Renewal

- Current pattern: generate a short-lived token in Graph API Explorer, then exchange it using `fb_exchange_token` to obtain a roughly 60-day token.
- Do not store the token in the skill or in git-tracked files.
- Update the corresponding n8n credential only.

## Sheet Contract

- `RAW_Adveronix` is the detailed output tab.
- `AGG_Ads` is the aggregated output tab.
- Do not touch columns `S:U` in `AGG_Ads`.

## Validation Checklist

After a workflow change, verify:

1. Active ads appear in `RAW_Adveronix`.
2. Metrics such as spend and impressions are not unexpectedly zero.
3. Ads with no insights appear as zero rows only when that is expected.
4. `AGG_Ads` writes only to `A:R`.
5. The name-based join still produces matches.

## Source References

- Live workflow: `Meta Ads → RAW_Adveronix (Cada Hora)` in n8n cloud
- Local source-of-truth JSON in the original project workspace:
  `meta_ads_raw_adveronix.json`

Keep these aligned whenever edits are made.
