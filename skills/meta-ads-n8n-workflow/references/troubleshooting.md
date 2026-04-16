# Troubleshooting

## Symptom: zero matches after join

Check:

- whether the join key still uses the composite name
- whether any normalization changed:
  lowercase, trim, and exact concatenation order matter
- whether campaign, ad set, or ad names changed upstream

## Symptom: all rows are zero

Check:

- whether Insights is returning data for the selected time window
- whether the join is failing
- whether the ad is active but legitimately has no recent metrics

## Symptom: ads disappear from the sheet

Check:

- whether the active filter is excluding them through `adset.end_time`
- whether `effective_status` changed
- whether the workflow is suppressing zero rows by mistake

## Symptom: AGG tab loses AI columns

Cause:

- the clear range was widened beyond `A:R`

Fix:

- restore the clear range to `A2:R10000`
- confirm no write node targets `S:U`

## Symptom: Meta token suddenly fails

Check:

- token expiry
- whether the credential in n8n was updated after renewal
- whether the app and ad account scope are still correct
