# Drive Assets Flow

## Goal

Convert every final email image into a stable public asset URL and manifest entry. Prefer:

```text
https://lh3.googleusercontent.com/d/FILE_ID=w1200
```

Also keep a fallback URL when useful:

```text
https://drive.google.com/uc?export=view&id=FILE_ID
```

## Accepted Inputs

- pasted/uploaded image files
- local image paths
- generated images
- Drive file links
- web image URLs
- HTML `<img>` sources
- base64 image data
- Canva links as references, not final image URLs

## Processing Logic

1. Inventory all image candidates.
2. Classify each as `final_asset`, `reference_only`, `needs_generation`, `needs_export`, or `invalid`.
3. For local/pasted/generated/base64 images, create or locate an actual file.
4. Use available Drive capability to upload the file.
5. Set public-readable permission: `anyone` + `reader`.
6. Extract `fileId`.
7. Build lh3 URL with an explicit width parameter.
8. Add manifest entry with role, src, fallbackSrc, alt, width/height when known, origin, and status.
9. Replace HTML image sources using manifest URLs.

## Cache And Refresh Rule

Drive/lh3 image URLs can cache aggressively. If an edited image still appears old in preview or in the user's browser, assume a stale cached asset before assuming the HTML edit failed.

- Do not rely on replacing media behind the same Drive fileId for visible image changes.
- For recrops, removed text, removed borders, corrected collages, generated-image revisions, or PDF re-exports, upload a new Drive file.
- Set the new file public-readable.
- Replace the HTML `src` with the new `https://lh3.googleusercontent.com/d/NEW_FILE_ID=w1200` URL.
- Re-run preview and visually inspect the screenshot, not only the network/broken-image result.

## Tool Discovery Rule

Before declaring Drive unavailable, search local skills/MCP/tools for Drive upload/publication capability. Prefer a tool that can:

```text
upload image
set public permission
return fileId
build or expose public URL
```

If a suitable tool exists, use or link it. If it does not exist, create a minimal adapter/script only after the user approves credentials/auth setup. Never request secrets in chat; use environment variables, OAuth, Apps Script authorization, or a local secure config.

## Escaid Google Workspace MCP

Escaid Setup may include `mcps/google-workspace-mcp`. Its helper `uploadImageToDrive()` already supports:

- uploading a local image to Drive
- optionally setting public permission with `anyone` + `reader`
- returning a public URL

If this MCP is available but no direct email asset upload tool is exposed, extend or wrap that helper as a dedicated asset tool instead of starting from scratch. The wrapper should return:

```json
{
  "fileId": "DRIVE_FILE_ID",
  "lh3Url": "https://lh3.googleusercontent.com/d/DRIVE_FILE_ID=w1200",
  "fallbackUrl": "https://drive.google.com/uc?export=view&id=DRIVE_FILE_ID",
  "webContentLink": "..."
}
```

For iterative email production, prefer a wrapper option such as `forceNewFile: true` or a timestamped filename so revised visuals get a fresh fileId and avoid stale `lh3` cache.

## Invalid Final Sources

Do not ship final HTML with:

```text
src="file:..."
src="blob:..."
src="data:image/..."
src="./local.png"
src="C:\..."
private drive.google.com links
Canva editor/share links
```

## Status Handling

- `ready`: all final images have public URLs and manifest entries.
- `needs_drive_capability`: no upload/publication tool is available yet.
- `needs_drive_upload`: tool exists but specific assets still need upload.
- `draft_only`: user chose to continue without finalized image assets.
- `qa_failed`: image validation failed after processing.
