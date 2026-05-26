# Auditoria De Skill Externa - Skills Supply

Fuente: https://github.com/803/skills-supply
Skill/proyecto: `sk`
Fecha: 2026-05-24

## Veredicto

Decision: Adaptar
Confianza: Media/Alta
Riesgo: Medio

## Valor

- Que aporta: manifiesto unico (`agents.toml`) para declarar paquetes de skills y sincronizarlos entre Claude Code, Codex, OpenCode, Factory y Amp.
- Que problema resuelve: evita copias manuales entre agentes y crea una fuente de verdad versionable para equipos/multiples maquinas.
- Que skill ESC-AI potencia: SkillOps general, sync Codex-Claude-Antigravity, `external-skill-auditor`, `skill-creator`.

## Riesgos

- Seguridad: es una CLI completa, no una skill documental. Escribe en carpetas de skills de agentes, crea symlinks/copia carpetas, usa estado `.sk-state.json` y puede remover targets gestionados.
- Credenciales: incluye comandos de auth que usan Git Credential Manager o `.git-credentials`; esto requiere politica local clara antes de usarlo.
- Dependencias: monorepo Node/TypeScript con dependencias npm, Postgres/Docker para partes web/API/discovery y scripts de release.
- Mantenimiento: proyecto joven; requiere pruebas propias en Windows y contra la estructura actual de ESC-AI antes de adoptarlo.

## Solape

- Skill propia relacionada: arquitectura SkillOps actual, sync manual Codex/Claude, docs `SKILLOPS_MAP.md` y `SKILLOPS_STANDARD.md`.
- Diferencial real: resuelve sync multiagente con manifests, prefijos, estado gestionado y proteccion contra sobreescritura de skills manuales.
- Riesgo de confusion: puede introducir una segunda fuente de verdad si se usa junto al repo `escaid-setup` sin definir quien manda.

## Recomendacion Operativa

- Instalar directo: No por ahora.
- Adaptar como referencia: Si.
- Cambios propuestos a skills propias: crear un manifest propio `skillops.toml` o `agents.toml` en `escaid-setup` con origen/destino de skills, hashes y modo dry-run antes de copiar.
- Prueba segura: prototipo local de solo lectura que compare `escaid-setup/skills`, `%USERPROFILE%/.codex/skills` y `%USERPROFILE%/.claude/skills` sin escribir.

## Decision Final

No instalar `sk` todavia. Usar su arquitectura como inspiracion para una herramienta ESC-AI de sync controlado, con dry-run obligatorio, sin auth externa y sin tocar credenciales.
