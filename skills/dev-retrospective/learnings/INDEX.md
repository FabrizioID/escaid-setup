# Dev Learnings Index

Índice de archivos de learnings por dominio. Actualizar al agregar una nueva entrada.

| Archivo | Dominio | Entradas | Última actualización |
|---------|---------|----------|---------------------|
| [n8n.md](n8n.md) | n8n workflows, binarios, API, MCP | 12 | 2026-06-14 |
| [evolution-api.md](evolution-api.md) | WhatsApp, webhook, número compartido | 2 | 2026-06-08 |
| [openai-api.md](openai-api.md) | GPT, imágenes, multipart | — | — |
| [google-apis.md](google-apis.md) | Drive, Sheets, OAuth | 1 | 2026-06-06 |
| [docker-vps.md](docker-vps.md) | Docker Swarm, env vars, crashes | — | — |
| [general.md](general.md) | Patrones cross-dominio (Playwright/HTML, tooling) | 1 | 2026-06-14 |

## Bugs críticos (🔴) — referencia rápida

| Fecha | Bug | Dominio | Fix en |
|-------|-----|---------|--------|
| 2026-05-30 | `prepareBinaryData` → filesystem-v2 no legible por httpRequest | n8n | n8n.md |
| 2026-05-30 | `formBinaryData value=""` envía siempre `data` | n8n | n8n.md |
| 2026-05-30 | Task runner crash con concurrencia alta | n8n/Docker | n8n.md |
| 2026-05-31 | Deploy de Code node con helpers sin verificar disponibilidad | n8n | n8n.md |
| 2026-06-06 | OAuth Google en "Testing" → refresh token muere a 7 días | Google | google-apis.md |
| 2026-06-08 | Webhook Evolution con UPDATE/SEND_MESSAGE → replays y sesiones fantasma | Evolution | evolution-api.md |
