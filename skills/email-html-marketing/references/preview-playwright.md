# Playwright Preview

Use Playwright or browser tooling when a local preview is feasible.

## Procedure

1. Write a temporary preview HTML file containing the email HTML.
2. Open it in a browser context.
3. Capture or inspect at desktop width around 900-1200px.
4. Capture or inspect at mobile width around 375-430px.
5. Check:
   - broken images
   - horizontal overflow
   - text too small or cramped
   - CTA visibility
   - image scaling
   - dark or low-contrast areas
   - clipped content
6. Patch obvious issues and preview again when changes are material.

If Playwright preview is unavailable, state that preview was skipped and keep status below `ready` unless the user explicitly accepts a non-previewed final.
