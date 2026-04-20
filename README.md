# Escaid Setup

Repositorio maestro para replicar el entorno de Escaid en cualquier maquina.
Contiene MCPs custom, plugins, skills y configuracion global.

Los repos de MCPs en GitHub se agrupan con la convencion `sc-mcp-*` y el topic `sc-mcps` para que funcionen como una familia ordenada.

---

## Estructura

```text
escaid-setup/
|-- mcps/
|   |-- google-workspace-mcp/  <- submodule: FabrizioID/sc-mcp-google-workspace
|   |-- word-document/         <- submodule: GongRzhe/Office-Word-MCP-Server
|   `-- docx-editor-local/     <- submodule: FabrizioID/sc-mcp-docx-local
|-- plugins/
|   `-- README.md              <- co-researcher + claude-router (marketplace)
|-- skills/
|   |-- interaction-memory/    <- skill para memoria shared + carpetas por chat
|   |-- project-thread-assistant/ <- skill para asistente persistente con memoria por hilo
|   `-- marketing-master/      <- skill custom para estrategia/marketing
|-- settings.json              <- config global sanitizada (sin secrets)
|-- .env.example               <- template de variables y rutas sensibles
`-- setup.ps1                  <- script de instalacion automatica (Windows)
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
git clone --recurse-submodules https://github.com/FabrizioID/escaid-setup.git
cd escaid-setup
powershell -ExecutionPolicy Bypass -File setup.ps1
```

El script automatiza:

- Build del `google-workspace-mcp`
- Instalacion de dependencias para `docx-editor-local`
- Instalacion de dependencias Python para `word-document`
- Copia de `settings.json` a `~/.claude/` con paths actualizados
- Copia de todas las skills custom desde `skills/` a `~/.codex/skills`
- Registro de los MCPs locales/npx en Claude Code

---

## MCPs incluidos

| MCP | Tipo | Repo | Notas |
|-----|------|------|-------|
| **google-workspace-mcp** | Node (local) | `FabrizioID/sc-mcp-google-workspace` | Docs + Sheets + Drive + extensiones custom |
| **word-document** | Python (local) | `GongRzhe/Office-Word-MCP-Server` | Stock |
| **docx-editor-local** | Node (local) | `FabrizioID/sc-mcp-docx-local` | Lee y reemplaza texto en `.docx` via Word COM automation |
| **playwright** | npx | `@playwright/mcp` | Auto-descarga |
| **docx-drive** | npx | `@modelcontextprotocol/server-gdrive` | Requiere rutas locales a credenciales Google |
| **n8n** | npx | `n8n-mcp` | Requiere API key |
| **canva** | HTTP OAuth | `https://mcp.canva.com/mcp` | Auth manual |
| **miro** | HTTP OAuth | `https://mcp.miro.com/` | Auth en primer uso |

---

## Skills incluidos

| Skill | Tipo | Notas |
|-------|------|-------|
| `interaction-memory` | Custom | Captura memoria compartida del proyecto y tambien crea carpetas por chat/hilo |
| `project-thread-assistant` | Custom | Opera un asistente persistente con memoria por hilo, shared memory y contexto para apps conectadas |
| `marketing-master` | Custom | Orquesta estrategia de funnels, contenido, Meta Ads, email y SEO |
| `meta-ads-n8n-workflow` | Custom | Mantiene el flujo n8n que reemplaza Adveronix para Meta Ads hacia Google Sheets |
| `google-docs-quotation-editor` | Custom | Edita cotizaciones y propuestas en Google Docs sin romper la plantilla visual, usando el MCP de Google Workspace |
| `miro-maps-and-flows` | Custom | Diseña mapas y flujos visuales con lógica de diagrama correcta, crea primero una versión premium en HTML/PDF cuando importa la claridad visual y luego la adapta a Miro |
| `premium-interactive-docs` | Custom | Documenta sistemas, agentes y flujos como guías HTML premium con jerarquía visual, motion, exportación a PDF y posible adaptación posterior a Miro |

---

## Como funciona `interaction-memory`

La skill no guarda nada en el chat. Documenta en archivos del proyecto actual.

Tiene dos niveles:

- memoria compartida del proyecto:
  - `memory/shared/decisions.md`
  - `memory/shared/facts.md`
  - `memory/shared/status.md`
  - `memory/shared/open-questions.md`
- memoria por chat o hilo:
  - `memory/chats/<thread-name>/plan.md`
  - `memory/chats/<thread-name>/summary.md`
  - `memory/chats/<thread-name>/decisions.md`
  - `memory/chats/<thread-name>/pending.md`
  - `memory/chats/<thread-name>/artifacts/`

Comportamiento esperado:

- si al inicio dices que este chat debe quedar documentado, se crea una carpeta propia del hilo
- desde ese momento los planes, resúmenes, notas y artefactos relevantes van ahí
- si luego aparece conocimiento que aplica al proyecto completo, también se promueve a `memory/shared/`
- no crea una carpeta nueva por cada mensaje; una carpeta representa un hilo o chat de trabajo

---

## Como funciona `project-thread-assistant`

Esta skill no solo documenta interacciones. Sirve para operar un asistente persistente dentro del proyecto actual.

Base esperada en cada proyecto:

- `assistant/AGENT.md`
- `assistant/index/`
- `assistant/memory/shared/`
- `assistant/memory/chats/<thread-name>/`
- `assistant/templates/`

Flujo esperado:

- abre o reutiliza un hilo de trabajo
- lee primero la memoria del hilo activo
- consulta `shared/` solo despues del hilo
- documenta hitos relevantes de forma semi-automatica
- guarda artefactos dentro del hilo
- usa ese hilo como contexto cuando trabaja con apps conectadas

Ejemplos de uso:

- `Usa $project-thread-assistant y abre un hilo aecode-asistente`
- `Usa $project-thread-assistant y documenta este chat`
- `Usa $project-thread-assistant y promueve esto a shared`
- `Usa $project-thread-assistant y usa este hilo como contexto para trabajar con apps`

---

## Plugins (marketplaces)

Se instalan automaticamente desde GitHub via `settings.json`:

| Plugin | Marketplace | Repo |
|--------|-------------|------|
| `co-researcher` | `co-researcher-marketplace` | `poemswe/co-researcher` |
| `claude-router` | `0xrdan-plugins` | `0xrdan/claude-plugins` |

---

## Auth manual (post-setup)

### Google OAuth (google-workspace-mcp)

```powershell
cd mcps\google-workspace-mcp
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
| Google OAuth token (google-workspace-mcp) | `%USERPROFILE%\.config\google-docs-mcp\token.json` |
| Google credentials.json (google-workspace-mcp) | `mcps\google-workspace-mcp\credentials.json` (local, gitignored) |
| docx-drive credentials | `%USERPROFILE%\.codex\mcp\docx_drive\` |
| N8N API Key | Variable de entorno / `.env` |
| Canva token | Manejado internamente por Claude Code |
| Miro token | Manejado internamente por Claude Code |

---

## Actualizar un MCP custom

```powershell
cd mcps\google-workspace-mcp
git add .
git commit -m "feat: descripcion del cambio"
git push origin main

cd ..\..
git add mcps/google-workspace-mcp
git commit -m "chore: bump google-workspace-mcp"
git push
```

---

## Agregar nuevo MCP

```powershell
# MCP con repo propio (submodule)
git submodule add https://github.com/FabrizioID/sc-mcp-nombre.git mcps/nombre-mcp

# MCP solo npx o HTTP
# Agregar entrada en settings.json bajo "mcpServers"
```
