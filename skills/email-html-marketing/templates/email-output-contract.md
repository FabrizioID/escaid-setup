# Email Output Contract

Return this shape when producing automation-ready output:

```json
{
  "status": "ready",
  "subject": "",
  "preheader": "",
  "html": "",
  "assetManifest": {},
  "qa": {
    "base64": "pass|fail|skipped",
    "imageUrls": "pass|fail|skipped",
    "gmailSafe": "pass|fail|skipped",
    "responsive": "pass|fail|skipped",
    "darkModeTolerant": "pass|fail|skipped",
    "preview": "pass|fail|skipped"
  },
  "warnings": [],
  "errors": [],
  "previewNotes": []
}
```

When responding conversationally, summarize this contract instead of dumping JSON unless the user or automation asks for machine-readable output.
