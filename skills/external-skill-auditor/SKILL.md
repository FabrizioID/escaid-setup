---
name: external-skill-auditor
description: Auditar skills externas antes de instalarlas o adaptarlas al ecosistema ESC-AI. Usar cuando el usuario pase un repo, URL, SKILL.md, marketplace o candidato de skill y quiera decidir si adoptar, adaptar, absorber criterios o ignorar. Revisa seguridad, scripts, permisos, credenciales, dependencias, solape con SkillOps, calidad del frontmatter, trigger, rutas, mantenimiento y compatibilidad Codex/Claude/Antigravity.
---

# External Skill Auditor

Compuerta obligatoria antes de instalar skills externas. El objetivo no es encontrar skills bonitas, sino proteger velocidad, seguridad y coherencia del ecosistema.

## Paquete operativo

| Capa | Ruta | Funcion |
|---|---|---|
| Dominio | `external-skill-auditor` | Evaluar valor, riesgo y solape de una skill externa |
| Fuente | URL/repo/SKILL.md local | Insumo a auditar |
| Referencia interna | `docs/SKILLOPS_MAP.md`, `docs/SKILLOPS_STANDARD.md`, `docs/SKILL_MARKET_SCAN.md` | Comparar contra arquitectura ESC-AI |
| Salida | Matriz adoptar/adaptar/absorber/ignorar | Decision accionable |

## Arranque rapido

1. Identificar fuente: GitHub repo, carpeta local, archivo `SKILL.md`, marketplace o snippet.
2. Leer `SKILL.md` completo.
3. Si existen `scripts/`, `assets/`, `references/`, `.env.example`, `package.json`, `requirements.txt` o instaladores, revisar nombres y puntos de entrada antes de ejecutar nada.
4. Leer `docs/SKILLOPS_MAP.md` para detectar solapes.
5. Emitir veredicto: `Adoptar`, `Adaptar`, `Absorber criterio` o `Ignorar`.

## Checklist De Seguridad

Marcar riesgo `Alto` si aparece cualquiera de estos puntos:

- Pide pegar tokens, API keys o passwords en chat o archivos versionados.
- Ejecuta comandos remotos tipo `curl | bash`, `irm | iex`, `Invoke-Expression`, `eval`, `exec` o descarga binarios sin checksum.
- Hace `git push`, `rm`, `Remove-Item`, `rmdir`, `del`, `format`, `chmod -R`, `chown -R`, `sudo`, `Start-Process` o cambios globales sin justificacion estricta.
- Lee carpetas amplias de credenciales: `.ssh`, `.config`, `.aws`, `.gnupg`, keychains, browser profiles.
- Incluye scripts ofuscados, minificados o con red saliente no explicada.
- Su descripcion promete algo distinto a lo que hacen sus scripts.
- Exfiltra contenido a servicios externos sin permiso explicito.

Marcar riesgo `Medio` si:

- Tiene dependencias npm/pip no fijadas.
- Requiere servicios externos pero no documenta scopes o credenciales.
- Tiene mucha documentacion pero pocas pruebas.
- Solapa fuertemente con una skill propia sin aportar diferencial claro.

## Checklist De Calidad

Evaluar:

- `name` corto, lowercase, hyphen-case, menor a 64 caracteres.
- `description` explica que hace y cuando usarla.
- Tiene scope claro: una skill, un proposito.
- Usa progressive disclosure: referencias largas fuera de `SKILL.md`.
- Tiene triggers concretos.
- Declara dependencias, herramientas, credenciales y fallbacks.
- No mezcla dominio, credenciales y ejecucion sin separar capas.
- Puede convivir con Codex, Claude Code y Antigravity.
- Tiene licencia compatible o al menos fuente clara.

## Checklist De Solape SkillOps

Comparar contra:

- `ui-architect`, `frontend-skill`, `documentador-experto`.
- `n8n-workflow-builder`, `meta-ads-n8n-workflow`.
- `google-workspace-editor`, `docx-mcp-document-editor`, `excel-user`.
- `thesis-research-editor`, `apa-7-thesis-format`.
- `presentation-orchestrator`, `disruptive-presentations`, `slides`.
- `magnus-thinker`, `project-thread-assistant`, `strategic-project`.
- `github-repo-ops`.

Regla: si una skill externa solo duplica una propia, no instalar. Extraer criterios utiles y mejorar la skill propia.

## Salida Estandar

```markdown
## Auditoria De Skill Externa

Fuente: <repo/url/path>
Skill: <name>
Fecha: <YYYY-MM-DD>

### Veredicto
Decision: Adoptar | Adaptar | Absorber criterio | Ignorar
Confianza: Alta | Media | Baja
Riesgo: Bajo | Medio | Alto

### Valor
- Que aporta:
- Que problema resuelve:
- Que skill ESC-AI potencia:

### Riesgos
- Seguridad:
- Credenciales:
- Dependencias:
- Mantenimiento:

### Solape
- Skill propia relacionada:
- Diferencial real:
- Riesgo de confusion:

### Recomendacion Operativa
- Instalar directo:
- Adaptar como referencia:
- Cambios propuestos a skills propias:
- Prueba segura:

### Decision Final
<accion concreta>
```

## Politica De Instalacion

No instalar automaticamente salvo que:

1. El usuario lo pida explicitamente.
2. El riesgo sea bajo o este mitigado.
3. No haya solape peligroso.
4. Se haya creado backup de skills locales.
5. Se haya documentado la decision en `docs/SKILL_MARKET_SCAN.md` o en el hilo del proyecto.

