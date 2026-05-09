---
name: google-workspace-credentials
description: Check, explain, and prepare Google Workspace MCP authentication and configuration without exposing secrets. Use when Codex needs Google Docs, Google Drive, or Google Sheets MCP access but the MCP is missing, unauthenticated, disconnected, or requires client ID, client secret, OAuth token, service account, environment variables, or project-level setup.
---

# Google Workspace Credentials

Use this skill when Google Workspace MCP access is required but not clearly available.

This skill is a setup and verification guide. It must not store or print secrets in chat, skill files, source code, or committed configuration.

## What To Check

1. List active MCP servers and identify whether a Google Workspace or Google Docs MCP is connected.
2. Check whether the local setup repo contains `mcps/google-workspace-mcp`.
3. Check whether the MCP is built or installable.
4. Check whether expected environment variables or token paths are configured.
5. If credentials are missing, explain the missing piece without asking the user to paste secrets into chat.

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

## Credential Inputs

Supported auth patterns may include:

- OAuth client ID and client secret through environment variables
- OAuth token stored under a local config directory
- profile-specific token storage
- service account JSON path and impersonated Google Workspace user
- remote MCP OAuth handled by the MCP client

Never include actual secret values in skill files or final responses.

## Safe Response Pattern

When credentials are missing, say:

- which MCP is missing or disconnected
- which capability is blocked
- what non-secret config key or token path appears missing
- what the user should configure outside chat

Do not ask the user to paste client secrets. Prefer a local file, environment variable, secret manager, or already configured MCP.

## Escalation

If installing, building, or authorizing the MCP requires network access or opening a browser, request permission through the tool approval flow.
