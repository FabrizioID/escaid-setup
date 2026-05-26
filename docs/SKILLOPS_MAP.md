# SkillOps Map - ESC-AI

Mapa operativo de skills del ecosistema. Usar junto con `SKILLOPS_STANDARD.md` y `SKILLOPS_HEALTHCHECK.md`.

## Como Leer Este Mapa

| Campo | Uso |
|---|---|
| Nombre operativo | Nombre humano para decidir rapido que herramienta usar |
| Skill ID | Nombre tecnico real de la carpeta/skill que debe activar el agente |
| Rol | Para que sirve |
| Capa | Si es dominio, apertura MCP, pill/perfil o memoria |

Regla de nombres: mantener nombres propios solo cuando son identidad del sistema (`magnus-thinker`, `goldratts-brain`, `zuckerbergs-mind`, `presentation-orchestrator`). Para el resto, leer primero el nombre operativo y usar el `Skill ID` solo para activacion tecnica.

## Reglas De Precedencia Para Que No Se Pisen

Estas reglas mandan cuando dos skills parecen servir para lo mismo. El objetivo es que cualquier agente elija rapido la ruta correcta.

| Zona | Skill principal | Skills auxiliares | Regla operativa |
|---|---|---|---|
| UI HTML premium ESC-AI | `ui-architect` | `visual-html-craft` legacy | Para artefactos HTML visuales/interactivos del ecosistema ESC-AI, usar siempre `ui-architect`. `visual-html-craft` solo redirige. |
| Frontend app/repo | `frontend-skill` | `ui-architect` si se requiere acabado visual premium | Usar `frontend-skill` cuando hay app real, framework, repo frontend, rutas, componentes o estado de producto. No usarlo para documentacion ni HTML visual aislado de ESC-AI. |
| Documentacion HTML | `documentador-experto` | `doc-desarrollos`, `doc-general` | Usar para documentar sistemas, procesos, conceptos o desarrollos. No reemplaza `ui-architect` cuando el pedido es construir una UI/producto. |
| Presentacion narrativa | `presentation-orchestrator` | `disruptive-presentations`, `slides` | Primero narrativa, estructura y handoff completo. Despues de aprobacion, la produccion visual por defecto es `disruptive-presentations`. |
| Plan/roadmap/checklist ligero | `action-planner` | `documentador-experto`, `ui-architect`, `documentar-notion` | Usar solo cuando no sea software, proceso humano complejo, marketing integral ni deck slide-by-slide. |
| Slide full image | `disruptive-presentations` | `presentation-orchestrator` upstream, `imagegen` como motor, `slides` downstream | Genera slides como imagen final + HTML player + manifest. No crea PPTX editable salvo que luego se pida export. |
| PowerPoint editable | `slides` | `disruptive-presentations` si ya hay imagenes finales | Usar cuando el entregable pedido sea `.pptx` editable, recreacion PPTX o validacion de layout PowerPoint. |
| Excel directo | `excel-user` | `excel-table-builder` si la salida va a Word/APA | Para crear, leer, editar, formatear o analizar `.xlsx`, manda `excel-user`. |
| Tabla Excel a Word/APA | `excel-table-builder` | `excel-user`, `docx-mcp-document-editor`, `apa-7-thesis-format` | No edita workbooks como ruta principal. Convierte datos de Excel/Sheets en tablas defendibles para Word/tesis. |
| Tesis integral | `thesis-research-editor` | `apa-7-thesis-format`, `academic-research-editor`, `docx-mcp-document-editor` | Para tesis completa manda `thesis-research-editor`: metodo, fuentes, redaccion, APA y Word. |
| APA formato | `apa-7-thesis-format` | `thesis-research-editor` | Solo decide/aplica QA formal APA en Word: estilos, tablas, figuras, bibliografia, anexos. No reemplaza juicio metodologico. |
| Revision metodologica ligera | `academic-research-editor` | `thesis-research-editor` | Solo checklist conceptual rapido o legado. Para trabajo serio de tesis usar `thesis-research-editor`. |

## Rutas Base

| Concepto | Ruta absoluta | Ruta portable |
|---|---|---|
| Skills instaladas Codex | `C:\Users\USUARIO\.codex\skills` | `%USERPROFILE%\.codex\skills` |
| Setup local principal | `C:\Users\USUARIO\Desktop\GEN+ TEMP\Machine Learning\escaid-setup` | `<workspace>\escaid-setup` |
| Setup local alterno | `C:\Users\USUARIO\Desktop\GEN+ TEMP\Machine Learning\Proyecto\escaid-setup` | `<workspace>\Proyecto\escaid-setup` |
| Config Codex MCP | `C:\Users\USUARIO\.codex\config.toml` | `%USERPROFILE%\.codex\config.toml` |
| Credenciales Codex | `C:\Users\USUARIO\.codex\credentials` | `%USERPROFILE%\.codex\credentials` |
| Second Brain repo canonico | `C:\Users\USUARIO\Desktop\GEN+ TEMP\Machine Learning\second-brain` | `<workspace>\second-brain` |
| Master Ideas global | `C:\Users\USUARIO\Desktop\GEN+ TEMP\Machine Learning\second-brain\MASTER_IDEAS.md` | `<workspace>\second-brain\MASTER_IDEAS.md` |
| Inteligencia canonica | `C:\Users\USUARIO\Desktop\GEN+ TEMP\Machine Learning\second-brain\inteligencia` | `<workspace>\second-brain\inteligencia` |
| Inteligencia legacy local | `C:\Users\USUARIO\Desktop\GEN+ TEMP\Machine Learning\inteligencia` | `<workspace>\inteligencia` |

## Nucleo Cognitivo Y Memoria

| Nombre operativo | Skill ID | Rol | Capa | Estado | Arranque rapido | Pill/MCP | Prueba segura |
|---|---|---|---|---|---|---|---|
| Magnus Thinker | `magnus-thinker` | Motor de criterio, decision, disrupcion y second brain pull | Dominio estrategico | Verde/Amarillo | Leer `MASTER_IDEAS`, detectar proyecto activo, leer indices de threads relevantes | Filesystem local | Confirmar existencia de `MASTER_IDEAS.md` e indices |
| Hilos de proyecto | `project-thread-assistant` | Crear, actualizar, cerrar e ingestar hilos de proyecto | Memoria operativa | Verde/Amarillo | Escribir siempre en `<workspace>/second-brain/inteligencia/<proyecto>/threads/` | Filesystem local | Verificar `_index.md` y formato de thread |
| Proyectos estrategicos | `strategic-project` | Crear y mantener proyectos persistentes con variables, senales y decisiones | Memoria estructural | Verde/Amarillo | Leer `PROJECT.md`, `memory/*`, `signals/*` desde Second Brain | Filesystem local | Verificar estructura del proyecto |
| Analisis estrategico | `strategic-thinker` | Analisis estrategico entre variables/proyectos | Dominio estrategico | Verde/Amarillo | Leer registry, proyecto(s), variables y tensiones desde Second Brain | Filesystem local | Verificar `references/analysis-protocols.md` |
| Memoria de interacciones | `interaction-memory` | Filtrar y persistir aprendizajes de sesiones sin ensuciar Second Brain | Memoria/promocion | Verde/Amarillo | Detectar proyecto activo, extraer durable vs ruido, coordinar con threads | Filesystem local | Verificar targets `threads/` y `memory/` |
| Planificador de accion | `action-planner` | Convertir ideas en planes accionables y rutas de produccion ligera | Dominio ejecucion | Verde/Amarillo | Clasificar objetivo, descartar dominios especializados, definir entregable | No requiere MCP | Plan/checklist/handoff |

Raiz canonica de escritura: `<workspace>/second-brain/inteligencia`. `<workspace>/inteligencia` queda como legacy local/fallback de lectura mientras se termine la limpieza. Ver `docs/MEMORY_ARCHITECTURE.md`.

Vertical Second Brain/memoria: baseline de potenciacion en `docs/tool-verticals/second-brain-potenciacion.md`. Contrato operativo: threads documentan la sesion, `memory/` conserva aprendizajes estables, `MASTER_IDEAS.md` guarda criterios transversales, y Magnus hace context pull por indices/tags antes de razonar.

Vertical Magnus Thinker: baseline de potenciacion en `docs/tool-verticals/magnus-thinker-potenciacion.md`. Magnus es always-on: corre F1-F13 internamente en cada interaccion, activa pills segun el problema, y solo muestra cadena visual/Coda cuando el usuario lo pide o al cerrar una sesion profunda.

Potenciacion externa Magnus: ver `docs/skill-audits/2026-05-24-magnus-external-frameworks.md`. Se absorbieron Cynefin, Decision Quality, OODA, premortem/red-team, systems leverage y scenario planning como pills de criterio, no como herramientas nuevas.

## Documentacion Y Conocimiento

| Nombre operativo | Skill ID | Rol | Capa | Estado | Arranque rapido | Pill/MCP | Prueba segura |
|---|---|---|---|---|---|---|---|
| Documentador experto | `documentador-experto` | Orquestar documentacion HTML premium | Dominio macro | Verde | Elegir `doc-desarrollos` o `doc-general` | Playwright opcional | Crear/abrir HTML local |
| Documentar desarrollos | `doc-desarrollos` | Documentar herramientas: usuario, tecnica y dominio | Dominio | Verde | Leer sistema, capturas si hay UI, generar 3 docs | Playwright opcional | Captura local o revision HTML |
| Documentar conceptos | `doc-general` | Documentacion visual de conceptos/procesos | Dominio | Verde | Clasificar tema y estructura | Playwright opcional | Preview HTML |
| Documentador legacy | `premium-interactive-docs` | Legacy reemplazada por Documentador experto | Deprecated | Gris | Evitar en trabajos nuevos; usar solo si un documento viejo la invoca | No aplica | N/A |
| Frontend web/app | `frontend-skill` | App/sitio/prototipo frontend | Dominio/UI extra | Extra | Revisar repo, construir UI, probar | Playwright/dev server | Screenshot |
| Arquitecto UI | `ui-architect` | UI HTML de nivel produccion; cubre experiencias HTML visuales/interactivas | Dominio/UI | Amarillo | Usar criterios UI, construir y verificar | Playwright | Screenshot |

Vertical documentacion: baseline de potenciacion en `docs/tool-verticals/documentacion-potenciacion.md`. Las skills `documentador-experto`, `doc-desarrollos` y `doc-general` son dominio/contenido; si la salida es HTML visual se activa `ui-architect`, y si se publica en Notion se activa `documentar-notion`.

## Google, Docs, Sheets, Drive, Word Y Excel

| Nombre operativo | Skill ID | Rol | Capa | Estado | Arranque rapido | Pill/MCP | Prueba segura |
|---|---|---|---|---|---|---|---|
| Abrir Google Workspace | `google-workspace-credentials` | Diagnosticar y habilitar MCP Google Workspace | MCP apertura | Amarillo | Buscar `escaid-setup`, revisar config, token y perfil | `google_docs_cloud` / `google-workspace` | Ver tools Docs/Sheets/Drive expuestas |
| Editor Google Workspace | `google-workspace-editor` | Editor operativo unificado Google Workspace | Amarillo | Confirmar URL/ID, verificar MCP Google, leer antes de editar | Google Workspace MCP + `google-workspace-credentials` | Leer doc/sheet/drive metadata |
| Editor Google Docs | `google-docs-mcp-document-editor` | Editar Google Docs vivos preservando estructura | Dominio + MCP | Amarillo | Activar Google Workspace; leer doc antes de editar | `google_docs_cloud` | Leer documento |
| Editor de propuestas Google Docs | `google-docs-quotation-editor` | Editar cotizaciones/propuestas en Google Docs | Dominio especializado | Amarillo | Usar dominio comercial y luego Google Docs MCP | `google_docs_cloud` | Leer doc/propuesta |
| Editor Word/DOCX | `docx-mcp-document-editor` | Editar Word `.docx` local preservando estructura | Dominio + Word MCP | Verde | Confirmar ruta `.docx`, leer documento antes de editar | Word MCP / `docx_editor_local` | Leer documento |
| Editor de tesis | `thesis-research-editor` | Tesis: metodologia, APA, investigacion, Word | Dominio + Word | Verde | Identificar modo: juicio, investigacion o edicion Word | Word MCP | Leer docx/texto |
| Excel operativo | `excel-user` | Operaciones completas sobre `.xlsx` | Dominio + Excel | Amarillo | Ver si hay Excel MCP; si no, usar archivo local | Excel MCP o script | Abrir/leer workbook |
| Tablas APA desde Excel | `excel-table-builder` | Convertir datos Excel/Sheets en tablas APA/Word | Dominio extra | Gris | Reducir tabla y preparar insercion | Excel/Word opcional | Tabla final |

Vertical Word MCP/DOCX: baseline de potenciacion en `docs/tool-verticals/word-mcp-potenciacion.md`. La base local cubre edicion Word, tablas, estilos, comentarios extraidos, footnotes/endnotes, proteccion y PDF. Hueco externo valioso: tracked changes/redlines nativos y comparacion/auditoria estructural avanzada; no instalar MCP externo sin auditoria.

Nota actual: Google Workspace MCP esta configurado y `GOOGLE_MCP_PROFILE=fabrizio` fue agregado para tokens perfilados. Si las tools no aparecen, recargar Codex/Claude/Antigravity para reiniciar el MCP.

Vertical Google Workspace: baseline de potenciacion completo en `docs/tool-verticals/google-workspace-potenciacion.md`. Capacidades cubiertas: Docs, Sheets, Drive, comentarios, tablas, formato, templates, carpetas, export/download y apertura MCP por perfil. Regla: no buscar otra skill Google paralela salvo que aporte versionado/documentacion automatica, auditoria de schemas Sheets usados por n8n, o sincronizacion especializada no cubierta por el MCP actual.

## Notion

| Nombre operativo | Skill ID | Rol | Capa | Estado | Arranque rapido | Pill/MCP | Prueba segura |
|---|---|---|---|---|---|---|---|
| Documentar en Notion | `documentar-notion` | Crear/actualizar paginas, bases, proyectos y contenido en Notion | Dominio + MCP | Verde/Amarillo | Determinar cuenta, validar conexion, operar conservadoramente | `mcp__notion__` o API fallback | `API_get_self` |
| Notion Fabrizio | `notion-josefabrizioid` | Perfil Notion Fabrizio/GEN+ | MCP apertura/perfil | Verde | Usar cuando proyecto sea Fabrizio, GEN+, Tingo | `%USERPROFILE%\.codex\credentials\notion\josefabrizioid_notion.json` | Validar self/workspace |
| Notion AECODE coordinador | `notion-coordinador-aecode` | Perfil Notion coordinador AECODE | MCP apertura/perfil | Amarillo | Usar cuando sea coordinador/AECODE | `%USERPROFILE%\.codex\credentials\notion\aecode_coordinador_notion.json` | Validar self antes de escribir |

Estado actual probado: `mcp__notion__` responde como bot en `Fabrizio's Workspace`.

## n8n Y Automatizacion

| Nombre operativo | Skill ID | Rol | Capa | Estado | Arranque rapido | Pill/MCP | Prueba segura |
|---|---|---|---|---|---|---|---|
| Constructor n8n | `n8n-workflow-builder` | Crear, revisar, modificar y validar workflows n8n | Dominio + MCP | Verde/Amarillo | Leer pill local, probar MCP, listar workflows | `%USERPROFILE%\.codex\skills\n8n-workflow-builder\pills\n8n-credentials.md` y `mcp__n8n__` | `n8n_health_check` |
| Reporte Meta Ads n8n | `meta-ads-n8n-workflow` | Mantener workflow Meta Ads a Sheets | Dominio n8n especializado | Verde/Amarillo | Usar n8n primero, revisar estado actual | n8n MCP + Google Sheets cred en n8n | Listar workflow objetivo |

Estado actual probado: n8n health OK, workflows listan. Pendiente: `n8n_manage_credentials list` falla con `GET method not allowed`; actualizar MCP o usar UI/API fallback.

Vertical n8n: baseline de potenciacion completo en `docs/tool-verticals/n8n-potenciacion.md`. Capacidades absorbidas: Sticky Notes, sub-workflows, sub-workflow conversion, workflow history, tags, REST API y CLI beta. Regla: no buscar otra skill n8n paralela salvo que aporte algo no cubierto por `n8n-workflow-builder`; primero probar con un workflow real y documentar/refactorizar por etapas.

## Presentaciones, Imagen Y Marketing

| Nombre operativo | Skill ID | Rol | Capa | Estado | Arranque rapido | Pill/MCP | Prueba segura |
|---|---|---|---|---|---|---|---|
| Presentation Orchestrator | `presentation-orchestrator` | Narrativa, estructura y handoff de decks | Dominio | Verde/Amarillo | Definir objetivo, audiencia, slides y handoff minimo por slide | No requiere MCP | Plan + handoff |
| Slides disruptivas | `disruptive-presentations` | Generar slides full image de alto impacto | Dominio + imagen | Verde/Amarillo | Una slide a la vez, usar herramienta imagen directa, guardar manifest | `image_gen` o API fallback | Generar slide/prompt/player |
| PowerPoint editable | `slides` | Crear/editar PPTX con PptxGenJS | Dominio extra | Verde/Amarillo | Usar helpers, renderizar, validar | LibreOffice/Node | Render slide |
| Flyers visuales | `flyer-generator` | Piezas visuales estaticas: flyers, posts, anuncios, covers y creatividades comerciales | Dominio + imagen | Verde/Amarillo | Clasificar modo, elegir patron comercial, generar/evaluar | `image_gen` | Imagen final + prompt |
| Generador de imagenes | `imagegen` | Generar/editar bitmap | Tool base extra | Verde | Llamar herramienta de imagen | `image_gen` | Imagen generada |
| Marketing Master | `marketing-master` | Funnel, crecimiento, contenido, Meta Ads, email, SEO y lifecycle | Dominio marketing | Verde/Amarillo | Leer growth system, elegir subdominio, investigar alternativas si aplica | n8n/Notion/Google opcional | Plan/copy/handoff |
| Emails HTML marketing | `email-html-marketing` | HTML email y Apps Script marketing | Dominio + Google | Amarillo | Crear HTML seguro, preview, opcional Drive/Apps Script | Playwright/Google | Preview HTML |
| Guiones virales | `video-script-generator` | Guiones virales cortos | Dominio | Gris | Validar brief, luego generar variantes | No requiere MCP | Scripts |
| Manual desde video | `video-manual` | Manual visual desde video + transcript | Dominio + Playwright | Amarillo | Leer transcripcion, capturar frames, generar HTML | Playwright | Captura frame |

Vertical presentaciones: baseline de potenciacion en `docs/tool-verticals/presentaciones-potenciacion.md`. Ruta default: `presentation-orchestrator` -> `disruptive-presentations` -> HTML player + manifest -> `slides` solo si se pide PPTX editable. Marp/reveal.js son opcionales para decks Markdown/HTML text-first, no ruta principal ESC-AI.

Capa de arquitectura visual/diagramacion: ver `skills/disruptive-presentations/references/visual-architecture-diagramming.md`. Es una capa de estructura/plantilla para el prompt visual, no un cambio de motor. `disruptive-presentations` sigue generando slides con la herramienta de imagen; Mermaid/D2/Excalidraw/Miro/React Flow/PptxGenJS son referencias de gramatica visual o rutas explicitas solo si el usuario pide otro artifact.

Capa de artificios comerciales disruptivos: ver `skills/disruptive-presentations/references/commercial-disruptive-patterns.md`. Sirve para prompts de slides comerciales/ejecutivas: before-after, tension gap, bottleneck, wedge, flywheel, proof wall, cost of inaction, decision gate, signal vs noise, etc. No genera otro formato.

Vertical flyers/piezas comerciales: baseline de potenciacion en `docs/tool-verticals/flyers-potenciacion.md`. Ruta default: `flyer-generator` -> patron comercial -> prompt final -> imagen con herramienta directa -> QA. No usar para decks/slides, emails, landings o UI.

Vertical marketing: baseline de potenciacion en `docs/tool-verticals/marketing-potenciacion.md`. `marketing-master` es cerebro de crecimiento: funnel, demand creation/capture, lifecycle, data capture, research externo y handoff. No produce visuales finales ni automatizaciones; deriva a `flyer-generator`, `video-script-generator`, `email-html-marketing`, `n8n-workflow-builder`, `documentar-notion` o Google Workspace segun salida.

## Desarrollo, Operacion Y Sistemas

| Nombre operativo | Skill ID | Rol | Capa | Estado | Arranque rapido | Pill/MCP | Prueba segura |
|---|---|---|---|---|---|---|---|
| Zuckerbergs Mind | `zuckerbergs-mind` | Planificacion de software/sistemas tecnicos | Dominio estrategia tecnica | Verde/Amarillo | Confirmar componente tecnico central, planificar, no codificar hasta aprobado | No requiere MCP | Plan tecnico |
| Goldratts Brain | `goldratts-brain` | Procesos humanos y cuellos de botella | Dominio operativo | Verde/Amarillo | Confirmar flujo humano/operativo, restricciones, roles y metricas | No requiere MCP | Mapa proceso |
| Cotizador tecnico | `technical-quotation-builder` | Cotizaciones tecnicas/propuestas | Dominio comercial tecnico | Gris | Definir alcance, unidades, precios, soporte | Docs/Sheets opcional | Tabla/propuesta |
| Sustentos adicionales | `sustento-adicional` | Costos de actividades adicionales | Dominio especializado | Gris | Recibir datos minimos, calcular sustento | Excel opcional | Resultado calculado |
| GitHub repos | `github-repo-ops` | Auth, status, commit, push, pull y permisos GitHub | Apertura + operacion repo | Verde/Amarillo | `gh auth status`, activar cuenta correcta, revisar remote/status | `gh` keyring / Git Credential Manager | `git status -sb` y push controlado |
| Auditor de skills externas | `external-skill-auditor` | Evaluar skills/repos antes de instalar o adaptar | Seguridad + SkillOps | Verde | Leer `SKILL.md`, revisar scripts, comparar solape | Web/Git local | Veredicto adoptar/adaptar/ignorar |
| Permisos de proyecto | `project-permissions-setup` | Reducir prompts de permisos en proyectos | Apertura local | Gris | Crear allowlist read-only | Filesystem | `.claude/settings.json` |

Vertical planning brains: baseline de potenciacion en `docs/tool-verticals/planning-brains-potenciacion.md`. `goldratts-brain`, `zuckerbergs-mind` y `action-planner` ahora tienen `references/external-alternatives.md` para buscar herramientas, repos, plantillas, Reddit, docs oficiales y alternativas ya hechas antes de inventar una ruta custom.

Consistencia planning brains: `action-planner` queda como planificador ligero; `goldratts-brain` para operaciones humanas; `zuckerbergs-mind` para sistemas tecnicos; `presentation-orchestrator` solo para decks/slides. Si hay salida HTML visual, la capa final es `ui-architect`.

## Miro, Mapas Y Flujos

| Nombre operativo | Skill ID | Rol | Capa | Estado | Arranque rapido | Pill/MCP | Prueba segura |
|---|---|---|---|---|---|---|---|
| Mapas y flujos Miro | `miro-maps-and-flows` | Mapas, flujos y diagramas en Miro | Dominio + MCP | Rojo/Amarillo | Confirmar board, usar MCP si auth OK | `mcp__miro__` | `board_search_boards` |

Estado actual: MCP Miro responde `Auth required`. Fallback: generar HTML/PNG/Markdown y subir cuando auth este lista.

## Investigacion Y Tesis

| Nombre operativo | Skill ID | Rol | Capa | Estado | Arranque rapido | Pill/MCP | Prueba segura |
|---|---|---|---|---|---|---|---|
| Editor de tesis | `thesis-research-editor` | Skill principal de tesis | Dominio + Word | Verde | Clasificar modo y operar con Word si hay docx | Word MCP | Leer documento |
| Revision metodologica | `academic-research-editor` | Checklist metodologico ligero | Extra/legacy | Gris | Usar para razonamiento rapido | No requiere MCP | Respuesta metodologica |
| Formato APA tesis | `apa-7-thesis-format` | Formato APA 7 | Extra | Gris | Aplicar con Word/docx | Word MCP | QA estilos |

## Plugins Y Skills De Sistema

| Nombre operativo | Skill ID | Rol | Estado | Nota |
|---|---|---|---|---|
| Creador de skills | `skill-creator` | Crear/actualizar skills | Verde | Sistema Codex |
| Instalador de skills | `skill-installer` | Instalar skills | Verde | Sistema Codex |
| Creador de plugins | `plugin-creator` | Crear plugins Codex | Verde | Sistema Codex |
| Docs OpenAI | `openai-docs` | Docs oficiales OpenAI | Verde | Usar con fuentes oficiales |

## Acciones Prioritarias

1. Recargar Codex/Claude/Antigravity para que el MCP Google tome `GOOGLE_MCP_PROFILE`.
2. Mantener `<workspace>/inteligencia` solo como legacy/fallback; no escribir hilos nuevos ahi.
3. Recargar n8n MCP con `n8n-mcp@2.56.0` y revisar gestion de credenciales.
4. Autenticar Miro o mantenerlo como fallback visual.
5. Revisar skills legacy y decidir alias/fusion/borrado.
6. Mantener pills locales fuera del repo y con rutas documentadas sin valores secretos.

## Limpieza Recomendada

| Item | Decision recomendada | Motivo |
|---|---|---|
| `premium-interactive-docs` | Mantener como alias legacy, no ruta principal | Fue reemplazada por `documentador-experto` + `doc-desarrollos` + `doc-general` |
| `visual-html-craft` | Mantener como alias legacy que redirige a `ui-architect` | La funcion de HTML visual interactivo ya esta cubierta por Arquitecto UI |
| `academic-research-editor` | Mantener como checklist auxiliar/legacy | `thesis-research-editor` es la ruta principal para tesis completa |
| `frontend-skill` | Mantener como extra del sistema, usar `ui-architect` para HTML visual ESC-AI | Puede servir para apps/frontend generales fuera del sistema UI actual |
| `slides` | Mantener como extra util para PPTX editable | No reemplaza `presentation-orchestrator` ni `disruptive-presentations`; complementa cuando se requiere `.pptx` editable |
| `apa-7-thesis-format` | Mantener como complemento APA | Se activa con tesis/Word cuando hay formato APA |
| `excel-table-builder` | Mantener como puente Excel/Word/APA | No reemplaza `excel-user`; sirve para convertir datos en tablas APA/Word |
| Nombres tecnicos en el mapa | No usarlos como lectura principal | Se mantienen solo como `Skill ID` para activacion por agentes |
