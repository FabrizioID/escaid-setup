# Automation Contract

Use this contract when another skill, a web app, Google Sheets, or Apps Script consumes the output.

## Inputs

```json
{
  "campaignId": "string",
  "mode": "create|convert|close_html|iterate",
  "brief": "string",
  "htmlInput": "string|null",
  "brand": {
    "name": "string|null",
    "colors": [],
    "tone": "string|null"
  },
  "assets": [],
  "requirements": {
    "driveRequired": true,
    "previewRequired": true
  }
}
```

## Outputs

```json
{
  "status": "ready|draft_only|needs_user_input|needs_drive_capability|needs_drive_upload|qa_failed",
  "html": "string",
  "assetManifest": {},
  "qa": {},
  "warnings": [],
  "errors": [],
  "preview": {
    "desktop": "checked|skipped",
    "mobile": "checked|skipped",
    "notes": []
  }
}
```

## Sheets-Friendly Columns

- campaign_id
- mode
- status
- subject
- preheader
- html
- asset_manifest_json
- qa_json
- warnings_json
- errors_json
- preview_status
- updated_at
