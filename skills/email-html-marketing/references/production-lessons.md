# Production Lessons

Use these lessons during real email closure, especially when converting PDFs, brochures, screenshots, or advanced HTML into final marketing email HTML.

## Drive/lh3 Cache

Google Drive and `lh3.googleusercontent.com` can keep serving an old visual even after the file content was updated. If the user says the image still looks unchanged, treat cache as the first suspect.

- For meaningful visual changes, upload a new file and use a new Drive fileId.
- Replace the HTML `src` with the new `lh3` URL.
- Re-preview the actual rendered email after the URL change.
- Do not trust `brokenImages: 0` as proof that the visual is current.

This applies to crops, removed text, corrected collages, map trims, exported PDF slices, and generated image revisions.

## Crop Discipline

Brochure images often contain useful visuals mixed with headings, captions, borders, page margins, and decorative bands. Crop for the email role, not for the original brochure page.

Check for:

- cut-off titles or subtitles
- accidental white margins
- clipped people, faces, logos, or relevant labels
- half-visible borders or container edges
- duplicated CTA or headline text
- text that belongs better as live HTML

## Live Text Versus Image Text

Prefer live HTML text when the message is promotional, explanatory, repeated elsewhere, likely to change, or poorly cropped inside an image. Keep text inside images only when it is part of the clean visual asset and remains legible on mobile.

Good pattern:

- crop a client collage to keep the photos
- recreate "Ellos ya invirtieron" as live HTML above
- recreate the CTA or supporting line as live HTML below

Risky pattern:

- keep a full brochure block with big embedded title and footer line
- add the same title again in HTML
- crop the image so the embedded line is half visible

## Iteration Protocol

After every user visual correction:

1. Identify whether the issue is HTML spacing/copy or image pixels.
2. If pixels changed, regenerate/export/crop the image.
3. Upload as a fresh Drive file when using Drive/lh3.
4. Replace the HTML URL.
5. Preview again and inspect the screenshot visually.

## Email Card Styling

For finished marketing emails, a general outer shell can use rounded corners and a subtle shadow when the brand style allows it. Keep the inner structure email-safe with tables, inline CSS, explicit widths, and one responsive breakpoint.

Default to a polished modern-tech feel for this skill unless the brand brief says otherwise:

- rounded image corners, cards, buttons, and outer containers
- subtle shadows or soft lift around cards and hero areas
- restrained glow/highlight accents near important CTAs or technical visuals
- clean borders so the layout still works when shadows are ignored by an email client

Do not over-style operational emails, but marketing emails should not look like raw tables.

## Gmail Hidden Content Dots

Gmail can surface hidden preheader markup as a small collapsed `...` control inside the email body. If the user reports a visible `...` near the greeting or headline, remove the hidden preheader block and re-upload the HTML.

Common risky pattern:

```html
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">...</div>
```

The fix is usually to delete the hidden preheader entirely or use a safer preview-text approach only when it does not render visible artifacts.

## Live Trigger Versioning

When an Apps Script automation sends email from a Sheet, add a version marker to the code and write it back to the row after send. A received email can be misleading because Gmail and Drive cache assets; the Sheet audit row is the source of truth for which template ran.

Use this during debugging:

- unique test row ID
- `TEMPLATE_VERSION`
- sent timestamp
- last error/status column
- final image file IDs in the manifest
