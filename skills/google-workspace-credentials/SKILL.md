---
name: google-workspace-credentials
description: Check, explain, and prepare Google Workspace MCP authentication and configuration without exposing secrets. Use when Codex needs Google Docs, Google Drive, or Google Sheets MCP access but the MCP is missing, unauthenticated, disconnected, or requires client ID, client secret, OAuth token, service account, environment variables, or project-level setup.
---

# Google Workspace Credentials

Use this skill when Google Workspace MCP access is required but not clearly available.

This skill is a setup and verification guide. It must not store or print secrets in chat, skill files, source code, or committed configuration.

## What To Check

1. List active MCP servers and identify whether a Google Workspace or Google Docs MCP is connected.
2. Search `~/.codex/config.toml` for configured MCP servers before assuming the connector is unavailable.
3. Check whether the local setup repo contains `mcps/google-workspace-mcp`.
4. Check whether the MCP is built or installable.
5. Check whether expected environment variables, profile names, or token paths are configured.
6. If the configured route is unclear or blocked, ask the user before trying unrelated plugins, browser flows, or custom alternate access methods.
7. If credentials are missing, explain the missing piece without asking the user to paste secrets into chat.

## Expected MCP

Common names may include:

- `google-workspace`
- `google-docs`
- `google-workspace-mcp`
- `scd-mcp-docs`

The setup may point to a local Node server such as:

`mcps/google-workspace-mcp/dist/index.js`

or to an npm package such as:

`scd-mcp-docs`

In this workspace family, the canonical local setup source is:

- repo: `https://github.com/FabrizioID/escaid-setup`
- common local path: `Proyecto/escaid-setup`
- common MCP path: `Proyecto/escaid-setup/mcps/google-workspace-mcp/dist/index.js`
- common configured server name: `google_docs_cloud`
- common profile/token storage: `~/.config/scd-mcp-docs/<profile>/token.json`

If active tools do not expose the MCP but `~/.codex/config.toml` lists it, inspect the local repo and profile setup before declaring the MCP unavailable.

## Credential Inputs

Supported auth patterns may include:

- OAuth client ID and client secret through environment variables
- OAuth token stored under a local config directory
- profile-specific token storage
- service account JSON path and impersonated Google Workspace user
- remote MCP OAuth handled by the MCP client

Never include actual secret values in skill files or final responses.

## Discovery Order

Use this exact order before falling back:

1. Search active tools for Google Docs, Google Drive, or Google Workspace capabilities.
2. Inspect `~/.codex/config.toml` for MCP server names and command paths.
3. Inspect `Proyecto/escaid-setup` or another local checkout of `FabrizioID/escaid-setup`.
4. Read the relevant local skill pill if present:
   - `skills/google-docs-quotation-editor`
   - `skills/google-docs-mcp-document-editor`
   - `skills/google-workspace-credentials`
5. Inspect MCP docs/source enough to learn its expected env vars, profile names, token paths, and credential resolution.
6. Try the canonical MCP route or its documented local invocation.
7. If that fails because of session exposure, auth, missing env, or stale token, ask the user whether they can lift the restriction or point to the right profile.

Do not silently switch to a plugin install, browser-only workflow, public web access, or ad hoc API method when a configured local MCP likely exists. The user may be able to unblock the intended route faster.

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
