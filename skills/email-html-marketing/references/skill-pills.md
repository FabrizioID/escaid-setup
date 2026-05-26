# Skill Pills

Compact production patterns learned from live email + Apps Script deployments. Use these as defaults before reaching for longer references.

## Email Visual Defaults

- Default to a modern tech finish when the brand allows it: rounded corners on containers, cards, images, and buttons; soft borders; restrained shadows; and small highlight/glow accents.
- Keep effects email-safe: do not rely on shadows, gradients, or glows as the only separator. Pair them with solid backgrounds, spacing, and borders.
- Good default values: 600px centered table, 6-10px border radius, `#e4e8ef` borders, subtle `box-shadow`, strong CTA color, and plenty of white space.
- For construction/BIM/tech education, make the email feel practical and modern: clean hierarchy, dark technical hero visuals, bright accent CTA, and card-like information blocks.

## Gmail Collapsed Dots

- If Gmail shows a small `...` collapsed-content control near the top of the email body, suspect hidden preheader markup.
- Remove hidden preheader blocks such as `display:none;max-height:0;overflow:hidden` when they surface visually.
- Do not let preview text preservation beat body cleanliness. A visible `...` near the greeting is a real QA issue.

## Drive Image Assets

- Final image URLs should be public and email-usable, preferably:

```text
https://lh3.googleusercontent.com/d/FILE_ID=w1200
```

- If a visual changed, upload a new Drive file and replace the file ID. Drive/lh3 cache can keep serving old pixels.
- If a Drive API request fails but the public `lh3` URL returns an image, the OAuth account may lack Drive metadata access even though the file is public. Use the working public image URL and record that limitation.
- Keep a manifest with logical asset names, Drive file IDs, final `lh3` URLs, and source notes.

## Brochure PDF CTA

- For a "Descargar brochure" CTA, upload the PDF to Drive, set public reader access, and link the button to:

```text
https://drive.google.com/uc?export=download&id=FILE_ID
```

- Keep the normal Drive view URL in the manifest for human checking, but use the download URL in the email CTA when the user asks for direct download behavior.

## Apps Script Trigger Integrity

- Add a `TEMPLATE_VERSION` and write it to a `TEMPLATE_VERSION`/audit column after a successful send. This proves which uploaded HTML/code generated the email.
- If the user receives an old email after code upload, suspect stale installed triggers, old deployments, or a different Apps Script project/account. Reinstall triggers from the current code and test with a unique row ID.
- A temporary web app setup endpoint can run `setupTriggers()` and return `setupTriggers ok`. Protect it with a setup key and delete or disable the deployment after setup.
- Apps Script Execution API can fail with Cloud project mismatch or 403 even when the script exists. Use the web app setup fallback when direct `scripts.run` is blocked.
- For CRM/Meta rows, prefer a time-driven scanner for reliability. Use `onEdit` only when the integration is confirmed to fire spreadsheet edits.

## Auth And Accounts

- Never store real client secrets, tokens, refresh tokens, setup keys, or user secrets in this skill. Store placeholders and paths only.
- Confirm the active Google account is the intended owner/deployer and has access to Sheet, Drive assets, and Apps Script.
- Keep OAuth credentials and tokens separated by project/account profile. Use clear local profile names, but do not write secret values into docs.
- Browser profile matters during auth. If the wrong Google account opens, launch the exact browser/profile or ask the user to complete auth in the intended profile.
- When Google blocks an unverified OAuth app, the OAuth client must be in a project/user configuration that permits that account, or the project must be verified/tester-whitelisted.

## Test Protocol

- Insert a synthetic lead row with a unique ID, test email, populated dynamic fields, and blank processed/status.
- Wait at least one scan interval for time-driven triggers, or trigger the exact manual status/edit flow.
- Verify the Sheet row, not only the inbox: expected sent status, sent timestamp, empty last error, and matching `TEMPLATE_VERSION`.
- If Gmail still shows old imagery, verify the HTML source in Apps Script, the image file ID, and the received email asset URL.
