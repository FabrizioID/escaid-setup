# Plugins

Los plugins se instalan automáticamente desde GitHub al copiar `settings.json`.
No hay código local — Claude Code los descarga desde sus marketplaces.

## Instalados

### co-researcher
- **Marketplace:** `poemswe/co-researcher`
- **Skills:** literature-review, systematic-review, quantitative-analysis, qualitative-research, academic-writing, peer-review, ethics-review, hypothesis-testing, critical-analysis, lateral-thinking, grant-writing, research-methodology
- **Uso:** Capacidades de investigación académica PhD-level

### claude-router
- **Marketplace:** `0xrdan/claude-plugins`
- **Skills:** route, orchestrate, retry, learn, knowledge, router-stats, router-analytics
- **Uso:** Enruta queries al modelo óptimo (Haiku/Sonnet/Opus) reduciendo costos

## Agregar nuevo plugin

1. Encontrar el repo del marketplace en GitHub
2. Agregar en `settings.json`:
```json
"extraKnownMarketplaces": {
  "nombre-marketplace": {
    "source": { "source": "github", "repo": "AUTOR/REPO" }
  }
},
"enabledPlugins": {
  "nombre-plugin@nombre-marketplace": true
}
```
