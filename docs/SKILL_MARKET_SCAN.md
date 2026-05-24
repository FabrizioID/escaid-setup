# Skill Market Scan - 2026-05-24

Radar de repos/skills externos que pueden potenciar ESC-AI. No instalar directo sin auditoria: cada candidato debe pasar por lectura de `SKILL.md`, revision de scripts, comparacion de solape y prueba local.

## Criterio De Decision

| Decision | Significado |
|---|---|
| Adoptar | Instalar o traer casi directo, con ajustes menores de rutas/credenciales |
| Adaptar | No instalar completo; extraer patrones, referencias o checklist |
| Absorber criterio | Convertir una idea externa en mejora de una skill propia |
| Ignorar | Mucho solape, riesgo o bajo valor |

## Hallazgos Prioritarios

| Prioridad | Fuente | Que aporta | Skill ESC-AI afectada | Decision | Nota |
|---|---|---|---|---|---|
| Alta | `803/skills-supply` | Manifiesto `agents.toml` para sincronizar skills entre Claude, Codex, OpenCode, Factory, Amp | SkillOps / sync Codex-Claude-Antigravity | Adaptar | Podria reemplazar sync manual con una fuente de verdad versionada |
| Alta | `splinesreticulating/n8n-v2-workflow-skill` | Referencias n8n v2: nodos, expresiones, Wait nodes, sub-workflows, troubleshooting | `n8n-workflow-builder` | Absorber criterio | Nuestra skill ya conecta a instancia real; esta aporta biblioteca v2 y patrones |
| Alta | `glebis/claude-skills` - Skill Studio | Entrevista JTBD para disenar skills/agentes/automatizaciones y exportar `design.md`/mapa | `skill-creator`, `zuckerbergs-mind`, `n8n-workflow-builder` | Adaptar | Encaja con tu necesidad de velocidad + brief estructurado antes de construir |
| Media/Alta | `Agents365-ai/drawio-skill` | Genera diagramas draw.io exportables a PNG/SVG/PDF | `miro-maps-and-flows`, `documentador-experto` | Adaptar | Puede complementar Miro cuando Miro MCP falle o se requiera diagrama editable |
| Media/Alta | `awesome-skills/code-review-skill` | Code review progresivo por lenguaje/framework, severidad y seguridad | `github-repo-ops`, desarrollo software | Adaptar | Crear una skill propia de review o absorber checklist; no instalar completo sin auditar |
| Media | `TechyMT/claude-code-superpowers` | 16 patrones de ingenieria: domain model, error handling, interfaces, creating-skills | `zuckerbergs-mind`, `skill-creator`, frontend/dev | Absorber criterio | Util para fortalecer criterio tecnico sin crear solape excesivo |
| Media | `daymade/claude-code-skills` | Skills Claude Code: github-ops, doc-to-markdown, mermaid-tools, skills-search, skill-reviewer | `github-repo-ops`, docs, SkillOps | Adaptar | Ya creamos `github-repo-ops`; revisar `skills-search` y `skill-reviewer` |
| Media | `claude-office-skills/skills` | Skills de oficina/documentos reales | Google Docs/Word/Excel | Comparar | Solo vale si mejora formato, contratos, propuestas o QA documental |
| Baja/Exploratoria | `Randroids-Dojo/skills` | Compatibilidad dual Codex/Claude/OpenCode y convenciones de instalacion | SkillOps | Absorber criterio | Bueno como referencia de interoperabilidad, no como install directo |
| Baja/Exploratoria | `ClaudSkills` | Registry/buscador masivo de skills por tags | SkillOps discovery | Usar como buscador | No instalar desde registry sin revisar repos fuente |

## Rutas De Potenciacion Recomendadas

### 1. SkillOps Sync Manifest

Crear una mejora propia inspirada en `skills-supply`:

- `escaid-setup/skillops.toml` o `agents.toml`
- declarar origen de cada skill: setup, local extra, system, legacy
- destinos: Codex, Claude, Antigravity/OpenCode si aplica
- comando/script de sync que copie y verifique conteos/hash

Objetivo: dejar de depender de copias manuales entre `~/.codex/skills` y `~/.claude/skills`.

### 2. n8n v2 Reference Pack

No reemplazar `n8n-workflow-builder`. Mejor crear:

```text
skills/n8n-workflow-builder/references/n8n-v2-patterns.md
skills/n8n-workflow-builder/references/n8n-v2-troubleshooting.md
skills/n8n-workflow-builder/references/wait-node-patterns.md
```

Tomar como guia los temas del repo externo: expresiones, Wait nodes, Execute Sub-Workflow, node versioning y limitaciones MCP.

### 3. Skill Design Interview

Crear sub-skill o modo dentro de `skill-creator`:

- brief de nueva skill
- triggers reales
- inputs/outputs
- dominio vs MCP opener vs pill local
- riesgos de solape
- rutas de prueba

Esto reforzaria la creacion de nuevas skills sin improvisar.

### 4. Diagramas Editables

No instalar `drawio-skill` directo todavia. Evaluar si conviene:

- sub-skill `drawio-diagram-builder`
- o extender `miro-maps-and-flows` con fallback draw.io

Caso de uso: diagramas tecnicos exportables cuando Miro esta sin auth o cuando el usuario necesita archivo editable.

### 5. Skill Reviewer / Auditor

Antes de instalar skills externas, usar la skill propia:

`external-skill-auditor`

Funciones:

- leer `SKILL.md`
- detectar scripts peligrosos
- detectar credenciales/env vars
- comparar con SkillOps Map
- recomendar adoptar/adaptar/ignorar

Esta es probablemente la siguiente skill mas importante si vamos a comprar en el mercado.

Estado: creada como compuerta oficial de auditoria antes de instalar/adaptar skills externas.

## Fuentes

- OpenAI skills catalog: https://github.com/openai/skills
- Claude Code skills docs: https://docs.claude.com/en/docs/claude-code/skills
- Skills Supply: https://github.com/803/skills-supply
- n8n v2 workflow skill: https://github.com/splinesreticulating/n8n-v2-workflow-skill
- glebis Claude skills / Skill Studio: https://github.com/glebis/claude-skills
- drawio skill: https://github.com/Agents365-ai/drawio-skill
- code review skill: https://github.com/awesome-skills/code-review-skill
- Claude Code superpowers: https://github.com/TechyMT/claude-code-superpowers
- daymade Claude Code skills: https://github.com/daymade/claude-code-skills
- Randroids Dojo skills: https://github.com/randroids-dojo/skills
- ClaudSkills registry: https://claudskills.com/
