# Image Generation Flow

Generate images only when the user asks, when a key visual is missing and the user authorizes generation, or when the production brief explicitly calls for a new visual asset.

## Required Steps

1. Clarify only essential visual constraints:
   - role: hero, banner, product visual, texture, icon, supporting image
   - brand direction
   - dimensions/aspect ratio
   - must-include or must-avoid elements
2. Generate or request generation through the available image tool.
3. Save/export the generated image as a file.
4. Upload to Drive through the Drive assets flow.
5. Publish as public-readable.
6. Add to `assetManifest`.
7. Use the manifest URL in HTML.

Never embed generated output directly as base64 in final email HTML.

## Recommended Email Image Shapes

- Hero/banner: 1200x628, 1200x600, or 1200x800 depending on campaign.
- Square support visual: 800x800.
- Logo/mark: use actual brand asset when available; do not fake official logos.

Label generated visuals mentally as generated assets, not official brand assets unless the user provided them.
