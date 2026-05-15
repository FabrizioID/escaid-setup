---
name: google-workspace-credentials
description: Locate, verify, explain, and prepare the Google Workspace MCP for Google Docs, Sheets, and Drive without exposing secrets. Use when any agent, including Claude Code or Codex, needs Google Docs/Sheets/Drive access but cannot find the MCP, has a different repo layout, sees stale paths, is unauthenticated, or needs client ID, client secret, OAuth token, service account, environment variables, or project setup.
---

# Google Workspace Credentials

Use this skill when Google Workspace MCP access is required but not clearly available. This is a portable troubleshooting protocol for agents that do not share the same local repo layout.

This skill is a setup and verification guide. It must not store or print secrets in chat, skill files, source code, or committed configuration.

## Non-Negotiable Rules

- Do not assume the repo is in `Proyecto/escaid-setup`. Search for it.
- Do not declare the MCP unavailable until you have checked active tools, client config, and local `escaid-setup` copies.
- Do not ask the user to paste secrets. Point to local secret files or environment variables instead.
- Do not silently switch to browser-only, public web, plugin install, or ad hoc API access when a configured local MCP likely exists.

## MCP Names To Recognize

Common names may include:

- `google_docs_cloud`
- `google-workspace`
- `google-docs`
- `google-workspace-mcp`
- `scd-mcp-docs`
- `SCD MCP Docs`

The server usually runs either from a local Node build:

`mcps/google-workspace-mcp/dist/index.js`

or from the npm package:

`scd-mcp-docs`

## Canonical Source

- repo: `https://github.com/FabrizioID/escaid-setup`
- setup repo folder name: `escaid-setup`
- MCP folder inside repo: `mcps/google-workspace-mcp`
- local entrypoint inside repo: `mcps/google-workspace-mcp/dist/index.js`
- auth command from MCP folder: `node .\dist\index.js auth` on Windows, or `node ./dist/index.js auth` on macOS/Linux
- npm fallback command: `npx -y scd-mcp-docs`
- token path used by the MCP source: `~/.config/scd-mcp-docs/token.json`
- profile token path: `~/.config/scd-mcp-docs/<profile>/token.json`, which requires `GOOGLE_MCP_PROFILE=<profile>` in the MCP env
- legacy docs may mention `~/.config/google-docs-mcp/token.json`; treat that as a legacy clue, not the primary path

Common local repo paths in this workspace family:

- Windows Codex: `%USERPROFILE%\Desktop\GEN+ TEMP\Machine Learning\Proyecto\escaid-setup`
- Windows alternate clone: `%USERPROFILE%\Desktop\GEN+ TEMP\Machine Learning\escaid-setup`
- Generic: any folder named `escaid-setup` containing `mcps/google-workspace-mcp`

Never hard-code one of these paths as the only valid route.

## Config Files To Inspect

Check every config location that exists for the active client:

- Codex: `~/.codex/config.toml`
- Claude Code/project: `.mcp.json`, `.claude/settings.json`, or repo-provided `settings.json`
- Claude Desktop: the local Claude desktop config for the OS, when available
- Project setup template: `escaid-setup/settings.json`

Look for MCP entries whose command/args contain `google`, `workspace`, `docs`, `sheets`, `drive`, `scd-mcp-docs`, or `mcps/google-workspace-mcp/dist/index.js`.

## Portable Discovery Protocol

1. List active MCP tools/servers exposed in the current session.
2. Inspect the client config files listed above.
3. Search local disk or current workspace for `escaid-setup` and for `mcps/google-workspace-mcp/package.json`.
4. Verify the MCP folder has `package.json` and either `dist/index.js` or build scripts.
5. Verify token/credential state without printing secrets:
   - `~/.config/scd-mcp-docs/token.json`
   - `~/.config/scd-mcp-docs/<profile>/token.json`
   - legacy clue: `~/.config/google-docs-mcp/token.json`
   - `mcps/google-workspace-mcp/credentials.json`
   - environment variables such as `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
6. If the token is under `~/.config/scd-mcp-docs/<profile>/token.json`, the MCP config must include `GOOGLE_MCP_PROFILE=<profile>` in `env`. Without this, the server looks for the unprofiled token and can fail to start, leaving no MCP tools exposed.
7. If `dist/index.js` is missing but source exists, say the MCP needs install/build in `mcps/google-workspace-mcp`.
8. If token is missing, instruct the user to run the auth command locally; do not request secret values in chat.
9. If the MCP exists in config but tools are not exposed, tell the user to restart the MCP client/session after fixing config or auth.

## Profile Token Rule

The MCP source checks `GOOGLE_MCP_PROFILE` to choose a token folder.

- No profile env: reads `~/.config/scd-mcp-docs/token.json`
- With `GOOGLE_MCP_PROFILE=fabrizio`: reads `~/.config/scd-mcp-docs/fabrizio/token.json`

If an agent finds a token inside a named profile folder, it must add the matching env var to the MCP config. This is a common cause of "MCP configured but tools not active" in Claude.

## Credential Inputs

Supported auth patterns may include:

- OAuth client ID and client secret through environment variables
- OAuth token stored under a local config directory
- profile-specific token storage
- service account JSON path and impersonated Google Workspace user
- remote MCP OAuth handled by the MCP client

Never include actual secret values in skill files or final responses.

## Claude-Specific Notes

Claude may not have Codex's `~/.codex/config.toml`. In that case, do not stop. Use the repo's `settings.json` as the template and replace `SETUP_DIR` with the absolute path to the discovered `escaid-setup` folder.

Expected Claude-style stdio entry:

```json
{
  "google-workspace": {
    "type": "stdio",
    "command": "node",
    "args": ["ABSOLUTE_PATH_TO_ESCAID_SETUP/mcps/google-workspace-mcp/dist/index.js"],
    "env": {
      "GOOGLE_MCP_PROFILE": "PROFILE_NAME_IF_TOKEN_IS_PROFILED"
    }
  }
}
```

Use an empty `env` only when the token is at `~/.config/scd-mcp-docs/token.json`. If the token is at `~/.config/scd-mcp-docs/fabrizio/token.json`, use `"GOOGLE_MCP_PROFILE": "fabrizio"`.

If Claude says it "cannot find" the MCP, verify these concrete things before concluding failure:

- The config file being edited is the one Claude is actually loading.
- `ABSOLUTE_PATH_TO_ESCAID_SETUP` was replaced and no `SETUP_DIR` placeholder remains.
- The path with spaces is passed as one args item, not split manually.
- `dist/index.js` exists.
- The OAuth token exists or the auth flow has been run.
- If the token is in a profile folder, the MCP env includes the matching `GOOGLE_MCP_PROFILE`.
- Claude was restarted after config changes.

## Reference

For an example config and token notes, read `references/expected-config.md` only when needed.

## Safe Response Pattern

When credentials are missing, say:

- which MCP is missing or disconnected
- which capability is blocked
- what non-secret config key or token path appears missing
- what the user should configure outside chat
- whether `escaid-setup` was checked and what canonical route it indicated

Do not ask the user to paste client secrets. Prefer a local file, environment variable, secret manager, or already configured MCP.

## Escalation

If installing, building, or authorizing the MCP requires network access or opening a browser, request permission through the tool approval flow.
