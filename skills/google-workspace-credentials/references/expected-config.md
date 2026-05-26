# Expected Config

Use this file when an agent needs concrete config examples after reading the main skill. Do not paste or commit secrets.

## Claude Code / Claude Project Config

Use this shape in `.mcp.json`, `.claude/settings.json`, or the client-specific MCP config location. Replace `ABSOLUTE_PATH_TO_ESCAID_SETUP` with the discovered repo path. Keep the full path as one JSON string even when it contains spaces.

```json
{
  "mcpServers": {
    "google-workspace": {
      "type": "stdio",
      "command": "node",
      "args": [
        "ABSOLUTE_PATH_TO_ESCAID_SETUP/mcps/google-workspace-mcp/dist/index.js"
      ],
      "env": {
        "GOOGLE_MCP_PROFILE": "PROFILE_NAME_IF_TOKEN_IS_PROFILED"
      }
    }
  }
}
```

Use `{}` for `env` only when the token is stored at `~/.config/scd-mcp-docs/token.json`.

If the token is stored at `~/.config/scd-mcp-docs/fabrizio/token.json`, the config must use:

```json
"env": {
  "GOOGLE_MCP_PROFILE": "fabrizio"
}
```

If the repo-provided `settings.json` contains `SETUP_DIR`, it is a template placeholder. Replace it before using the config in Claude.

## Codex Config

Codex may use `~/.codex/config.toml`:

```toml
[mcp_servers.google_docs_cloud]
command = "node"
args = ["C:\\Users\\USER\\path\\to\\escaid-setup\\mcps\\google-workspace-mcp\\dist\\index.js"]
```

## NPM Fallback

If the local repo cannot be found but npm access is allowed, this package entry is valid:

```json
{
  "mcpServers": {
    "google-docs": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "scd-mcp-docs"],
      "env": {}
    }
  }
}
```

Some deployments use `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` environment variables. Do not print their values.

## Local Auth

## Token Storage

From `mcps/google-workspace-mcp`, run:

```powershell
node .\dist\index.js auth
```

The current MCP source stores OAuth refresh tokens at:

```text
~/.config/scd-mcp-docs/token.json
```

When `GOOGLE_MCP_PROFILE` is set, the token path becomes:

```text
~/.config/scd-mcp-docs/<profile>/token.json
```

Example: `GOOGLE_MCP_PROFILE=fabrizio` makes the MCP read `~/.config/scd-mcp-docs/fabrizio/token.json`.

Legacy docs may mention:

```text
~/.config/google-docs-mcp/token.json
```

Treat that as a clue from older setup docs. The source code and npm docs use `scd-mcp-docs`.

## Verification Checklist

- The MCP config file is the one the active client loads.
- No `SETUP_DIR` placeholder remains.
- The path points to an existing `dist/index.js`.
- `credentials.json` exists in `mcps/google-workspace-mcp` or env credentials are configured.
- `~/.config/scd-mcp-docs/token.json` exists after auth.
- If the token is inside a profile folder, `GOOGLE_MCP_PROFILE` matches that folder name.
- The MCP client was restarted after config/auth changes.

## Remote MCP

For remote deployment, the MCP may expose an HTTP/streamable endpoint and handle sign-in through the MCP client. In that case, local client secrets may not be needed in the active workspace.
