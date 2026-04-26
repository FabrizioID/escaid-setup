---
name: project-permissions-setup
description: Quickly set up a read-only permission allowlist for a new project. Run at the start of any new project to reduce permission prompts for known safe tools. Scans recent transcripts and creates .claude/settings.json with safe read-only patterns.
---

# Project Permissions Setup

Use this skill when starting a new project to configure `.claude/settings.json` with a permission allowlist, reducing interruptions for safe read-only operations.

## When to use

- First session in a new project directory
- User says "configura permisos", "reduce prompts de permisos", or "setup permissions"
- After cloning a new repo or creating a new project folder

## Steps

1. **Run the built-in skill** `fewer-permission-prompts` — it scans recent transcripts across all projects and identifies high-frequency read-only patterns automatically.

2. **Always include this base allowlist** for this environment (known safe read-only tools):

```json
{
  "permissions": {
    "allow": [
      "mcp__word-document-server__get_paragraph_text_from_document",
      "mcp__word-document-server__find_text_in_document",
      "mcp__word-document-server__get_document_info",
      "mcp__playwright__browser_take_screenshot",
      "mcp__playwright__browser_snapshot",
      "mcp__playwright__browser_wait_for",
      "mcp__playwright__browser_tabs"
    ]
  }
}
```

3. **Write to `.claude/settings.json`** in the project root (not `settings.local.json`, not `~/.claude/settings.json`). Create it if it doesn't exist.

4. **Do NOT add** write/mutate MCP tools, shell interpreters (python, node, bash wildcards), or anything with side effects. When in doubt, leave it out.

## Notes

- `settings.local.json` is for per-session or gitignored overrides — keep it separate
- `settings.json` travels with the project (can be committed to git)
- The global `~/.claude/settings.json` already has `defaultMode: bypassPermissions` — project-level settings layer on top
