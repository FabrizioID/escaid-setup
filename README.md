# Claude Code — Setup Centralizado

Repositorio maestro para replicar el entorno de Claude Code en cualquier máquina.
Contiene MCPs custom, plugins, skills y configuración global.

---

## Estructura

```
claude-setup/
├── mcps/
│   ├── google-docs-mcp/     ← submodule: FabrizioID/SCD_MCP_Docs (CUSTOM)
│   │                           Docs + Sheets + Drive con tools extra:
│   │                           mergeTableCells, setTableCellBackgroundColor
│   └── word-document/       ← submodule: GongRzhe/Office-Word-MCP-Server
├── plugins/
│   └── README.md            ← co-researcher + claude-router (marketplace)
├── skills/                  ← skills custom (vacío por ahora)
├── settings.json            ← config global sanitizada (sin secrets)
├── .env.example             ← template de variables de entorno
└── setup.ps1                ← script de instalación automática (Windows)
```

---

## Setup en máquina nueva

### Requisitos previos
- [Node.js](https://nodejs.org/) (v18+)
- [Python](https://python.org/) (3.10+)
- [Claude Code CLI](https://claude.ai/code)
- [GitHub CLI](https://cli.github.com/) (`gh`)

### Instalación

```powershell
git clone --recurse-submodules https://github.com/FabrizioID/claude-setup.git
cd claude-setup
powershell -ExecutionPolicy Bypass -File setup.ps1
```

El script automatiza:
- Build del `google-docs-mcp`
- Instalación de dependencias Python para `word-document`
- Copia de `settings.json` a `~/.claude/` con paths actualizados
- Registro de todos los MCPs en Claude Code

---

## MCPs incluidos

| MCP | Tipo | Repo | Notas |
|-----|------|------|-------|
| **google-docs-mcp** | Node (local) | `FabrizioID/SCD_MCP_Docs` | Custom: +mergeTableCells, +setTableCellBackgroundColor |
| **word-document** | Python (local) | `GongRzhe/Office-Word-MCP-Server` | Stock |
| **playwright** | npx | `@playwright/mcp` | Auto-descarga |
| **n8n** | npx | `n8n-mcp` | Requiere API key |
| **canva** | HTTP OAuth | `https://mcp.canva.com/mcp` | Auth manual |

---

## Plugins (marketplaces)

Se instalan automáticamente desde GitHub via `settings.json`:

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
Abre el browser → autenticar con Google → token guardado en `%USERPROFILE%\.config\google-docs-mcp\token.json`

### Canva OAuth
En Claude Code, escribe:
> "usa el mcp de canva para listar mis diseños"

El browser se abre automáticamente para el login.

### n8n API Key
Agregar en el entorno de sistema (o `.env`):
```
N8N_BASE_URL=https://tu-instancia.app.n8n.cloud
N8N_API_KEY=tu_api_key
```

---

## Secrets — qué NO está en este repo

| Secret | Dónde vive |
|--------|-----------|
| Google OAuth token | `%USERPROFILE%\.config\google-docs-mcp\token.json` |
| Google credentials.json | `mcps\google-docs-mcp\credentials.json` (local, gitignored) |
| N8N API Key | Variable de entorno / `.env` |
| Canva token | Manejado internamente por Claude Code |

---

## Actualizar un MCP custom

```powershell
cd mcps\google-docs-mcp
# ... hacer cambios ...
git add . && git commit -m "feat: descripcion del cambio"
git push origin main

# Actualizar referencia en el repo maestro
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

# MCP solo npx (sin codigo local)
# Agregar entrada en settings.json bajo "mcpServers"
```
