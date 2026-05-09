---
name: email-html-marketing
description: Create, convert, iterate, or close marketing email HTML that must be Gmail-safe/email-client-safe, responsive, dark-mode tolerant, and ready for automation. Use when the user provides a campaign brief, copy, pasted/uploaded images, generated-image requests, Canva/Drive/web links, screenshots, or an advanced HTML draft and needs final email HTML with image assets normalized through Google Drive/lh3 URLs, QA, and Playwright preview. Also use when Codex must generate or provision Google Apps Script .gs/MailApp automation for sending HTML email from Google Sheets with STATUS-driven triggers, new-row sensors, timed sequences, dynamic placeholders, sheet columns, Drive assets, and installable triggers.
---

# Email HTML Marketing

Use this skill as the production engine for marketing emails. Do not replace a higher-level marketing strategist: consume campaign strategy, offer, audience, CTA, tone, and brand when provided. If they are missing and necessary for the email to work, ask only the smallest useful question or mark explicit assumptions.

## Operating Principle

Never treat loose images, local paths, pasted blobs, base64 data, Canva links, or private Drive links as final email assets. Every image used in final HTML must resolve to a public, email-usable URL and be recorded in an asset manifest. Prefer:

```text
https://lh3.googleusercontent.com/d/FILE_ID=w1200
```

If a Drive upload/publication capability is missing, look for an installed skill/MCP/tool first. If none exists, install or create a minimal Drive adapter when the user approves. Do not pretend that invented Drive IDs or URLs are real.

## Workflow

1. Classify the request mode:
   - Create from brief/copy.
   - Convert from Canva, screenshot, reference image, or rough materials.
   - Close an advanced HTML draft.
   - Iterate an existing email.
   - Generate required visual assets.
   Read `references/input-modes.md`.

2. Confirm minimum commercial structure for the email before automation:
   - Objective.
   - Audience.
   - Main message or offer.
   - CTA.
   - Brand/tone/assets if visually relevant.
   - Dynamic fields that the HTML may need, only at the email-content level.
   If a marketing orchestrator already provided these, do not re-strategize.

3. Normalize image assets:
   - Detect all image sources and visual needs.
   - If the user provides screenshots/captures, treat them as source material for normal email assets: crop, clean, or recreate the useful visual areas as standalone images unless the user provides real source images.
   - Prefer real source images when available, such as logo PNG/SVG, hero JPG/PNG, product render, banner, or Drive assets; use screenshots only as fallback/reference.
   - Generate images only when requested or authorized.
   - Upload/process images through Drive capability.
   - Publish as public-readable.
   - Convert file IDs to lh3 URLs.
   - When a visual asset changes after feedback, upload a new Drive file and replace the URL/fileId instead of relying on the old cached asset.
   - Build or update `assetManifest`.
   Read `references/drive-assets-flow.md` and, when generating visuals, `references/image-generation-flow.md`.

4. Generate or repair HTML:
   - If `references/system-instruction-base.md` has been filled with the user's original system instruction, treat it as the source of truth and preserve its rules unless the current user explicitly overrides them.
   - Use table-based email structure.
   - Inline critical CSS.
   - Use one simple responsive breakpoint.
   - Avoid JavaScript, forms, complex web-app layout, and base64.
   - Preserve the visual intent of advanced HTML while converting unsafe patterns.
   Read `references/html-email-rules.md`.

5. Validate the email artifact before automation:
   - When the user provides screenshots/images/design references, first generate or repair the email HTML and validate the email structure, visual hierarchy, CTAs, placeholders, and assets.
   - Do not ask for Apps Script trigger details, Sheet columns, or CRM structure until the email HTML/objective/schema is accepted or the user explicitly asks to jump to automation.
   - For multi-email campaigns, validate each HTML/objective pair first, such as principal, reminder 1 day before, reminder 1 hour before, and follow-up 1 day after.

6. Generate Apps Script automation when requested or after email validation:
   - Use `.gs` only when the user asks for Google Sheets, Apps Script, MailApp, triggers, or copy/paste sender code, or after they approve the email HTML/schema and ask to operationalize it.
   - Interpret the email objective before choosing the trigger: manual campaign/certificate flows usually use `STATUS_EDIT`; CRM, Meta Ads, form, webhook, or automation lead intake usually uses `NEW_ROW_SENSOR`; reminder/follow-up sequences with multiple HTML files usually use `SEQUENCE_SENSOR`.
   - When the user wants the system ready-made, provision the Sheet/schema, script, HTML files, Drive image URLs, and trigger when tools/permissions are available; otherwise return exact copy/paste artifacts and setup steps.
   - Keep the email HTML and subject templating aligned through the same placeholder mapping.
   - Ask only for missing required setup values.
   Read `references/apps-script-mailapp.md`.

7. Preview with Playwright when a runnable local preview is feasible:
   - Create a temporary local HTML preview.
   - Check desktop and mobile widths.
   - Fix obvious overflow, spacing, broken images, or clipped content.
   Read `references/preview-playwright.md`.

8. Run QA before final delivery:
   - No unresolved placeholders.
   - No local/blob/base64 image sources.
   - Public image URLs or clear non-final status.
   - Alt text and widths on images.
   - No stale Drive/cache URLs after image revisions.
   - No awkward crops, duplicated image text, clipped faces, or leftover brochure borders.
   - Gmail-safe structure.
   - Dark-mode tolerant colors.
   - Contact/footer data is real when supplied.
   - Structured output for automation.
   Read `references/qa-checklist.md`.

9. Return the output contract:
   - HTML final or draft.
   - Asset manifest.
   - QA status.
   - Warnings/errors.
   - Preview notes.
   Use `templates/email-output-contract.md`.

## Status Rules

Use precise statuses:

```text
ready
draft_only
needs_user_input
needs_drive_capability
needs_drive_upload
qa_failed
```

Only use `ready` when the HTML is final, images are public and usable, QA passed, and preview was checked or explicitly skipped with reason.

## Resources

- `references/input-modes.md`: mode decision logic.
- `references/system-instruction-base.md`: placeholder for the user's exact existing email system instruction.
- `references/drive-assets-flow.md`: Drive image normalization and tool fallback.
- `references/html-email-rules.md`: Gmail-safe email HTML constraints.
- `references/image-generation-flow.md`: generated image handling.
- `references/production-lessons.md`: practical lessons from live email closure iterations.
- `references/skill-pills.md`: compact field-tested patterns for HTML, Drive, auth, Apps Script setup, and QA.
- `references/preview-playwright.md`: local preview procedure.
- `references/qa-checklist.md`: final validation checklist.
- `references/automation-contract.md`: Sheets/web/Apps Script integration contract.
- `references/apps-script-mailapp.md`: Google Apps Script `.gs` generator for Sheets, MailApp, triggers, STATUS dispatch, and dynamic placeholders.
- `templates/asset-manifest.json`: canonical asset manifest shape.
- `templates/email-output-contract.md`: final response/output shape.
