# Expected Config

## Local Stdio MCP

Common local MCP configuration:

```json
{
  "mcpServers": {
    "google-docs": {
      "command": "npx",
      "args": ["-y", "scd-mcp-docs"],
      "env": {
        "GOOGLE_CLIENT_ID": "...",
        "GOOGLE_CLIENT_SECRET": "..."
      }
    }
  }
}
```

Do not paste actual values in chat.

## Token Storage

OAuth refresh tokens may be stored in a local user config path such as:

```text
~/.config/scd-mcp-docs/token.json
```

or in a profile-specific subfolder when a profile variable is used.

## Remote MCP

For remote deployment, the MCP may expose an HTTP/streamable endpoint and handle sign-in through the MCP client. In that case, local client secrets may not be needed in the active workspace.
