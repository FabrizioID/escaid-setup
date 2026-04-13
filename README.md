# Claude Code - Setup Centralizado

Repositorio maestro para replicar el entorno de Claude Code en cualquier maquina.
Contiene MCPs custom, plugins, skills y configuracion global.

---

## Estructura

```text
claude-setup/
|-- mcps/
|   |-- google-docs-mcp/     <- submodule: FabrizioID/SCD_MCP_Docs (custom)
|   |-- word-document/       <- submodule: GongRzhe/Office-Word-MCP-Server
|   `-- docx-editor-local/   <- MCP local versionado en este repo
|-- plugins/
|   `-- README.md            <- co-researcher + claude-router (marketplace)
|-- skills/
|   `-- marketing-master/    <- skill custom para Codex
|-- settings.json            <- config global sanitizada (sin secrets)
|-- .env.example             <- template de variables y rutas sensibles
`-- setup.ps1                <- script de instalacion automatica (Windows)
```

---

## Setup en maquina nueva

### Requisitos previos

- [Node.js](https://nodejs.org/) (v18+)
- [Python](https://python.org/) (3.10+)
- [Claude Code CLI](https://claude.ai/code)
- [GitHub CLI](https://cli.github.com/) (`gh`)

### Instalacion

```powershell
git clone --recurse-submodules https://github.com/FabrizioID/claude-setup.git
cd claude-setup
powershell -ExecutionPolicy Bypass -File setup.ps1
```

El script automatiza:

- Build del `google-docs-mcp`
- Instalacion de dependencias para `docx-editor-local`
- Instalacion de dependencias Python para `word-document`
- Copia de `settings.json` a `~/.claude/` con paths actualizados
- Copia del skill `marketing-master` a `~/.codex/skills`
- Registro de los MCPs locales/npx en Claude Code

---

## MCPs incluidos

| MCP | Tipo | Repo | Notas |
|-----|------|------|-------|
| **google-docs-mcp** | Node (local) | `FabrizioID/SCD_MCP_Docs` | Custom: +mergeTableCells, +setTableCellBackgroundColor |
| **word-document** | Python (local) | `GongRzhe/Office-Word-MCP-Server` | Stock |
| **docx-editor-local** | Node (local) | `vendored` | Lee y reemplaza texto en `.docx` via Word COM automation |
| **playwright** | npx | `@playwright/mcp` | Auto-descarga |
| **docx-drive** | npx | `@modelcontextprotocol/server-gdrive` | Requiere rutas locales a credenciales Google |
| **n8n** | npx | `n8n-mcp` | Requiere API key |
| **canva** | HTTP OAuth | `https://mcp.canva.com/mcp` | Auth manual |
| **miro** | HTTP OAuth | `https://mcp.miro.com/` | Auth en primer uso |

---

## Skills incluidos

| Skill | Tipo | Notas |
|-------|------|-------|
| `marketing-master` | Custom | Orquesta estrategia de funnels, contenido, Meta Ads, email y SEO |

---

## Plugins (marketplaces)

Se instalan automaticamente desde GitHub via `settings.json`:

| Plugin | Marketplace | Repo |
|--------|-------------|------|
| `co-researcher` | `co-researcher-marketplace` | `poemswe/co-researcher` |
| `claude-router` | `0xrdan-plugins` | `0xrdan/claude-plugins` |

---

## Auth manual (post-setup)

### Google OAuth (google-docs-mcp + Sheets)

```powershell
cd mcps\google-docs-mcp
node .\dist\index.js auth
```

Abre el browser, autentica con Google y el token se guarda en `%USERPROFILE%\.config\google-docs-mcp\token.json`.

### docx-drive

Coloca tus archivos de credenciales en:

```text
%USERPROFILE%\.codex\mcp\docx_drive\.gdrive-server-credentials.json
%USERPROFILE%\.codex\mcp\docx_drive\gcp-oauth.keys.json
```

### Canva OAuth

En Claude Code, escribe:

> usa el mcp de canva para listar mis disenos

El browser se abre automaticamente para el login.

### Miro OAuth

Usa cualquier tool de Miro por primera vez en Claude Code y se disparara el login si hace falta.

### n8n API Key

Agregar en el entorno de sistema o en `.env`:

```text
N8N_BASE_URL=https://tu-instancia.app.n8n.cloud
N8N_API_KEY=tu_api_key
```

---

## Secrets - que NO esta en este repo

| Secret | Donde vive |
|--------|------------|
| Google OAuth token (google-docs-mcp) | `%USERPROFILE%\.config\google-docs-mcp\token.json` |
| Google credentials.json (google-docs-mcp) | `mcps\google-docs-mcp\credentials.json` (local, gitignored) |
| docx-drive credentials | `%USERPROFILE%\.codex\mcp\docx_drive\` |
| N8N API Key | Variable de entorno / `.env` |
| Canva token | Manejado internamente por Claude Code |
| Miro token | Manejado internamente por Claude Code |

---

## Actualizar un MCP custom

```powershell
cd mcps\google-docs-mcp
git add .
git commit -m "feat: descripcion del cambio"
git push origin main

cd ..\..
git add mcps/google-docs-mcp
git commit -m "chore: bump google-docs-mcp"
git push
```

---

## Agregar nuevo MCP

```powershell
# MCP con repo propio (submodule)
git submodule add https://github.com/AUTOR/REPO.git mcps/nombre-mcp

# MCP solo npx o HTTP
# Agregar entrada en settings.json bajo "mcpServers"
```
