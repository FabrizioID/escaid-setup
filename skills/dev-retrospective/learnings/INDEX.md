# Dev Learnings Index

Índice de archivos de learnings por dominio. Actualizar al agregar una nueva entrada.

| Archivo | Dominio | Entradas | Última actualización |
|---------|---------|----------|---------------------|
| [n8n.md](n8n.md) | n8n workflows, binarios, API, MCP | 5 | 2026-05-30 |
| [evolution-api.md](evolution-api.md) | WhatsApp, media, mensajes | — | — |
| [openai-api.md](openai-api.md) | GPT, imágenes, multipart | — | — |
| [google-apis.md](google-apis.md) | Drive, Sheets, auth | — | — |
| [docker-vps.md](docker-vps.md) | Docker Swarm, env vars, crashes | — | — |
| [general.md](general.md) | Patrones cross-dominio | — | — |

## Bugs críticos (🔴) — referencia rápida

| Fecha | Bug | Dominio | Fix en |
|-------|-----|---------|--------|
| 2026-05-30 | `prepareBinaryData` → filesystem-v2 no legible por httpRequest | n8n | n8n.md |
| 2026-05-30 | `formBinaryData value=""` envía siempre `data` | n8n | n8n.md |
| 2026-05-30 | Task runner crash con concurrencia alta | n8n/Docker | n8n.md |
