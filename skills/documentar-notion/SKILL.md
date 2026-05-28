---
name: documentar-notion
description: Documenta informacion en Notion desde el contexto del agente usando Notion MCP/easy-notion-mcp como ruta principal y Notion API como fallback. Usar cuando el usuario quiera crear proyectos desde plantillas, actualizar proyectos existentes conservando estructura, anadir contenido directo a paginas/bases/secciones o insertar imagenes/texto/tablas/tareas sin romper Notion.
---

# Documentar Notion

Skill para llevar informacion trabajada con el agente hacia Notion de forma conservadora, trazable y reutilizable.

## Principio madre

Por defecto, la skill puede **anadir, completar y extender**.

Por defecto, la skill **no puede borrar, reemplazar, reestructurar, alterar vistas, modificar cronogramas/boards ni mover paginas/bases** sin confirmacion explicita del usuario.

## Rutas de integracion

1. **easy-notion-mcp primero cuando este disponible**: ruta markdown-first, rapida y compacta para paginas, secciones, bases, vistas, comentarios y usuarios.
2. **Notion MCP oficial/remoto o local**: usar cuando el entorno ya lo exponga o cuando convenga trabajar con API JSON directa.
3. **Notion API fallback**: si MCP no esta disponible o se requiere batch/control fino, usar API directa con token local del perfil.
4. **Plan manual**: si no hay permisos o integracion, generar un plan Markdown/JSON para copiar a Notion.

Antes de proponer codigo propio, verificar si el MCP/herramienta nativa resuelve el flujo.

## Paquete operativo

Una llamada a `documentar-notion` debe resolver tres capas sin que el usuario tenga que pedirlas por separado:

| Capa | Skill/ruta | Funcion |
|---|---|---|
| Dominio | `documentar-notion` | Decide que crear, actualizar, extender o documentar en Notion sin romper estructura |
| Apertura/perfil | `notion-josefabrizioid` o `notion-coordinador-aecode` | Selecciona la cuenta correcta y valida identidad |
| Pill local | `~/.codex/credentials/notion/<perfil>_notion.json` | Guarda el token local; nunca imprimirlo |

Las plantillas y patrones de proyecto no son la capa de apertura. Viven como conocimiento de dominio/referencia y solo se leen cuando el flujo lo requiere.

## Arranque rapido obligatorio

Usar este bloque al inicio de cualquier tarea Notion para evitar diagnosticos largos.

### 1. Determinar cuenta

- Si el usuario menciona `Fabrizio`, `Jose Fabrizio ID`, `josefabrizioid`, `GEN+`, `Tingo`, `PUENTE TINGO` o proyectos GEN+, activar tambien `notion-josefabrizioid` y usar alias `josefabrizioid`.
- Si el usuario menciona `coordinador`, `AECODE` o `coordinador@aecode.ai`, activar tambien `notion-coordinador-aecode` y usar alias `coordinador-aecode`.
- Si no hay senal clara de cuenta, preguntar una sola vez: `Uso Notion de Fabrizio o coordinador AECODE?`
- Si la operacion es sensible o hay duda real de workspace, preguntar antes de escribir aunque parezca inferible.
- No preguntar si el proyecto tiene una plantilla conocida con cuenta implicita. `PUENTE TINGO` implica Fabrizio.

### 2. Validar conexion rapida

- Primero intentar MCP activo si las herramientas `mcp__notion__.*` o `mcp__notion-easy__*` estan disponibles.
- Para Fabrizio/Tingo, validar cuenta con `PUENTE TINGO` (`1d5d8cc4cfc180908d55c4da6d801474`).
- Si MCP devuelve `object_not_found` para una pagina que deberia existir, asumir cuenta incorrecta antes de asumir que no existe.
- Si MCP apunta a otra cuenta, no repetir busquedas amplias: usar API fallback del perfil elegido o indicar que hay que reiniciar Codex si `config.toml` fue corregido.

### 3. Mapa de herramientas — cuál usar y cuándo (validado mayo 2026)

**easy-notion-mcp (`mcp__notion-easy__*`) — ruta principal markdown-first**

Usar para:
- `get_me` → validar conexion y workspace.
- `search`, `list_databases` → exploracion del workspace.
- `read_page`, `read_section`, `read_block` → lectura de paginas/secciones (devuelve markdown).
- `create_page`, `append_content` → escritura inicial de paginas con markdown rico (toggles `+++`, columns `:::`, callouts `> [!TIP]`).
- `create_database` (inline o standalone) → crear DBs con `is_inline: true` y schema con `options: [{name, color}]`.
- `add_database_entry`, `update_database_entry` → CRUD de filas con value-by-name resolution.
- `update_data_source` → cambios de schema (rename props, add/remove options) sobre el endpoint moderno.
- `create_view`, `update_view`, `query_view`, `list_views`, `get_view` → vistas con configuracion raw (necesita `property_id`).
- `find_replace` → edicion quirurgica de texto plano sin tocar blocks.
- `update_block` → edicion de un block especifico por id (preserva identidad).
- `archive_page`, `delete_view`, `delete_database_entry` → destructivos (confirmar).

NO usar (limitaciones validadas):
- `replace_content` sin confirmar → DOBLE DESTRUCTIVO (borra body + child_databases). Aprendizaje #2.
- `update_section` sobre seccion sin heading siguiente → borra hasta fin de pagina, incluido bases inline. Aprendizaje #9. Usar sentinela `### MEMORIA OPERATIVA` o cambiar a `find_replace`/`update_block`.
- Callouts multi-linea con bullets → strippea todo menos primera linea. Aprendizaje #10. Usar callout solo titulo + children via REST.
- `archive_page(database_id)` → falla con 404, las DBs no se archivan por este endpoint. Usar `update_data_source(in_trash: true)` o REST PATCH.

**Notion REST API directa — fallback obligatorio para casos que easy-notion no cubre**

Usar cuando:
- Necesitas `property_id` de un schema → `GET /v1/data_sources/{id}` con `Notion-Version: 2026-03-11`. easy-notion's `get_database` NO devuelve IDs. Aprendizaje #1.
- Necesitas agregar children a un callout (bullets, paragraphs) → `PATCH /v1/blocks/{callout_id}/children`. Aprendizaje #10.
- Necesitas asignar un option_id especifico a una fila (bypass name resolution para fixes de phantoms encoding) → `PATCH /v1/pages/{row_id}` con `{"properties": {"<Prop>": {"select": {"id": "<option-id>"}}}}`.
- Necesitas verificar colores reales de options → `GET /v1/data_sources/{id}`. easy-notion's `get_database` no devuelve color.
- Token vive en `~/.codex/credentials/notion/<perfil>_notion.json` campo `token`. NUNCA imprimirlo.

**Notion MCP oficial `mcp__notion__*` (cuando este disponible — no es el caso actual)**

Esperar herramientas tipo `notion_search`, `notion_fetch`, `notion_create_pages`, `notion_update_page`, `notion_create_view`, `notion_update_view`, `notion_query_database_view`. Si esta cargado, preferirlo sobre easy-notion para schemas complejos (puede exponer mas detalle de la API).

**Plan manual (sin MCP ni REST)**

Generar markdown/JSON de plan que el usuario pegue a mano en Notion.

### Versiones de API a usar

- `Notion-Version: 2022-06-28` → endpoints estables: pages, blocks, databases, rows. Usar por defecto cuando no necesites data_sources.
- `Notion-Version: 2026-03-11` → habilita endpoint `/v1/data_sources/{id}` (para property IDs, options con colores) y configuracion fina de views. Usar cuando necesites estos.
- No mezclar version dentro del mismo flujo sin validar. Algunos parametros aceptados en `2022-06-28` fallan en `2026-03-11`.

### 4. Configuracion local esperada

- MCP principal de Notion puede estar configurado en `~/.codex/config.toml`.
- Para Fabrizio, la configuracion preferida es un wrapper local que lee `~/.codex/credentials/notion/josefabrizioid_notion.json` y ejecuta `@notionhq/notion-mcp-server`.
- No escribir tokens dentro de `config.toml` ni dentro de skills.
- Tras cambiar `config.toml`, advertir que Codex debe reiniciarse para que el MCP activo se recargue.

## Modos potenciados 2026

### Markdown Fast Write Mode

Para documentacion larga, minutas, briefs, aprendizajes y contenido narrativo:

1. usar easy-notion-mcp si esta activo;
2. leer pagina/seccion como markdown;
3. aplicar append o update de seccion, no reemplazo total;
4. usar `dry_run` si el cambio puede borrar bloques;
5. verificar lectura final.

### Data Source / View Guard Mode

Para bases, vistas, boards, timelines o reportes:

1. distinguir `database_id` de `data_source_id`;
2. leer schema antes de crear filas;
3. leer vistas vivas antes de replicar filtros;
4. crear o actualizar vistas solo con instruccion clara;
5. no borrar linked views o fuentes viejas hasta verificar conteo y query de la nueva fuente.

### Profile-Safe Mode

Para evitar esperas por credenciales:

1. elegir perfil por alias antes de buscar;
2. validar identidad con MCP o `/v1/users/me`;
3. si MCP activo responde otra cuenta, usar fallback local del perfil o pedir recarga;
4. nunca imprimir tokens ni copiarlos a config versionada.

## Setup de easy-notion-mcp

Para activar easy-notion-mcp en Claude Code:

```bash
npm install -g easy-notion-mcp
claude mcp add notion-easy --env NOTION_TOKEN=<token> -- easy-notion-mcp
```

En `~/.claude.json` (project-scoped) el MCP queda registrado como:

```json
"notion-easy": {
  "type": "stdio",
  "command": "easy-notion-mcp",
  "args": [],
  "env": { "NOTION_TOKEN": "<tu_token_de_integracion>" }
}
```

Verificar conexion con `mcp__notion-easy__get_me`. Si falla con "NOTION_TOKEN is required", revisar que la variable se llame exactamente `NOTION_TOKEN` (no `NOTION_API_KEY`).

### Cuentas, tokens y credenciales

- No guardar tokens, client secrets, refresh tokens ni secretos OAuth dentro de una skill.
- Guardar credenciales por cuenta en `~/.codex/credentials/...` y referenciarlas desde scripts o entorno local.
- Si MCP falla con `object_not_found` pero la pagina esta compartida, sospechar cuenta/integracion incorrecta antes de asumir falta de permisos.
- Verificar identidad con `/v1/users/me` cuando se use Notion API directa.
- Mantener separados los tokens por cuenta/workspace; documentar solo el alias de cuenta y nunca imprimir el secreto.
- Cuando existan perfiles locales de cuenta, cargar el perfil minimo necesario antes de escribir:
  - `notion-josefabrizioid` para Fabrizio / GEN+ / Tingo.
  - `notion-coordinador-aecode` para coordinador AECODE.
- Para el protocolo de seleccion de cuenta, seguir `references/notion-account-profiles.md`.

### Versiones API utiles

- Usar Notion API `2022-06-28` para operaciones estables de paginas, bloques, bases y filas.
- Usar Notion API `2026-03-11` cuando se necesiten `views`, `data_sources` o configuracion fina de vistas.
- No mezclar endpoints sin validar: algunos parametros de bloques aceptados en `2022-06-28` pueden fallar en versiones nuevas.

## Activadores

### Crear proyecto

Trigger ejemplo: `activa skill documentar notion: crear proyecto`

Flujo:
1. Determinar cuenta con el arranque rapido.
2. Pedir nombre del proyecto si no esta claro.
3. Determinar la BD donde vivira el proyecto formal. Si no se puede inferir con seguridad, preguntar antes de crear o mover: `En que BD creo el proyecto como tal?`
   - Para proyectos GEN+ de ingenieria/expediente, la BD formal normalmente es `PROYECTOS`.
   - No crear el proyecto formal dentro de la lista general `ACTIVIDADES` salvo que el usuario lo pida explicitamente.
4. Determinar si ademas necesita seguimiento en la lista general `ACTIVIDADES`.
   - Las actividades generales si van en la lista operativa `ACTIVIDADES` conocida (`T.TRABAJO` / base general), como filas o subitems.
   - Si la BD formal del proyecto no es `ACTIVIDADES`, crear o mantener un padre operativo en `ACTIVIDADES` para agrupar tareas, reuniones realizadas y pendientes visibles en reportes generales.
   - No mover la pagina formal de `PROYECTOS` hacia `ACTIVIDADES`; usar un padre operativo separado si Notion no permite relacionar directamente entre bases.
5. Pedir base raiz/data source destino si no se puede inferir.
6. **REGLA BLOQUEANTE: preguntar SIEMPRE si usa plantilla antes de crear bases o body.** No improvisar "estructura ligera" sin consultar — aprendizaje validado en mayo 2026 (proyecto AGENTE INMOBILIARIO GEN+ tuvo que refactorizarse porque se omitio esta pregunta y se asumio estructura propia).
   - Pregunta sugerida: `Quieres usar la plantilla GEN+ (Tingo-based) para este proyecto?`
   - **No proceder a crear bases hasta tener respuesta explicita.** No vale asumir "es un proyecto chiquito o de software, le pongo solo lo minimo" — ese es el patron que produce refactor caro despues.
   - Si el usuario dice si y no especifica cual, usar la plantilla Tingo (ver `references/template-engineering-project.md` para schema exacto, vistas validadas con config JSON, IDs y flujo paso a paso).
   - La plantilla Tingo **NO es exclusiva de ingenieria estructural**. Aplica tambien a software, agentes IA, automatizaciones, marketing, training y cualquier proyecto GEN+ que viva en `PROYECTOS`. Las bases opcionales (DOCUMENTOS, CONTACTOS CLIENTE) se omiten cuando no hay material concreto.
   - Si el usuario dice no, crear solo la estructura minima necesaria y no replicar bases/vistas de plantilla.
7. Pedir o identificar plantilla a replicar si aplica.
8. Validar permisos, destino y plantilla.
9. Leer la plantilla solo si se confirmo su uso.
10. Crear pagina/proyecto en la base raiz.
11. Replicar estructura posible o aplicar template nativo si existe.
12. Insertar informacion util del contexto del agente.
13. Reportar creado, insertado, omitido y limitaciones.

#### BD formal del proyecto vs actividades generales

Regla operativa GEN+:

- La pagina/proyecto formal debe vivir en la BD que corresponda al sistema de proyectos, normalmente `PROYECTOS` para proyectos GEN+ de ingenieria.
- La lista general `ACTIVIDADES` no reemplaza a `PROYECTOS`; sirve para seguimiento diario, reportes, subitems, actividades completadas y pendientes.
- Si un proyecto formal vive en `PROYECTOS`, crear o conservar un registro padre operativo en `ACTIVIDADES` con el mismo nombre o nombre normalizado. Ese padre puede contener una observacion con el link al proyecto formal.
- Las actividades tecnicas, coordinaciones realizadas, reuniones registradas como hecho operativo y tareas pendientes deben vincularse al padre operativo de `ACTIVIDADES`.
- El estado/avance de una actividad debe mantenerse sincronizado entre la actividad del proyecto y la lista general `ACTIVIDADES`. Si se actualiza `Status`, `% Avance`, fecha, responsable o completado en la base inline del proyecto, buscar su equivalente en la lista general y actualizarlo tambien. Si el cambio nace en la lista general, buscar su equivalente dentro del proyecto y actualizarlo tambien.
- Cuando no exista equivalente claro entre proyecto y lista general, crear la fila faltante o dejar una observacion con el vinculo cruzado. Si hay dos posibles equivalentes, preguntar antes de modificar.
- Las actividades comerciales relacionadas, como cotizacion/alcance comercial, deben ir bajo el padre operativo comercial correspondiente (`Comercial`) y no dentro del proyecto tecnico, salvo instruccion contraria.
- Antes de mover una pagina entre BDs, verificar si se perderan relaciones internas como `Parent item`/`Sub-item`; si ocurre, crear el padre operativo correcto y re-vincular las actividades.
- Si hay ambiguedad entre varias BDs posibles, preguntar. No asumir que una plantilla visual define la BD destino.
- La seleccion de plantilla es una decision separada de la BD destino: primero confirmar donde vive el proyecto formal, luego confirmar si se usa plantilla.

#### Crear proyecto desde plantilla existente

Cuando el usuario entregue una pagina modelo:

1. Leer bloques de la pagina modelo y detectar orden visible: encabezados, accesos, toggles, divisores y bases.
2. Leer cada base hija y su schema: propiedades, tipos, opciones y nombres de title.
3. Leer vistas de cada base con Views API, no solo propiedades. Comparar nombre, tipo y agrupaciones.
4. Crear pagina destino en la base raiz.
5. Crear contenido superior con el orden de la plantilla, adaptando texto al proyecto real.
6. Crear bases inline reales con datos propios del proyecto.
7. Crear/ajustar vistas equivalentes.
8. Cargar filas adaptadas al proyecto, no copiar categorias de la plantilla si no aplican.
9. Verificar visualmente o con fetch/API que no quedaron duplicados ni bases vinculadas a fuentes ocultas.

#### Plantilla GEN+ de referencia

Para proyectos GEN+ tipo expediente/ingenieria, usar como referencia visual y estructural esta pagina modelo cuando el usuario pida "como la plantilla":

- `PUENTE TINGO`: `https://www.notion.so/PUENTE-TINGO-1d5d8cc4cfc180908d55c4da6d801474`

Patron observado:

- Contenido superior: `DESCRIPCIÓN`, `ACCESOS`, `INFORMACIÓN`, toggles operativos y divisor.
- Bases visibles al final como inline reales, ajustadas al proyecto:
  - `ACTIVIDADES` debe existir por defecto para seguimiento operativo.
  - `REUNIONES` debe existir cuando haya coordinaciones, acuerdos o seguimiento con terceros.
  - `DOCUMENTOS` es opcional; crearla solo si el usuario entrega enlaces/documentos o pide control documental propio del proyecto.
  - `CONTACTOS CLIENTE` es opcional; crearla solo si hay contactos externos concretos que gestionar o el usuario la pide.
- `ACTIVIDADES`:
  - Propiedades: `Name`, `Entregable`, `Encargado`, `Fecha Límite`, `Observación`, `% Avance`, `Status`.
  - Vistas validadas (3 vistas, ver `references/template-engineering-project.md` para config JSON exacta y property IDs):
    - `Vista Filtrada`: board agrupado por **Entregable**, quick_filter Status IN [EN PROCESO, POR HACER, PENDIENTE] — vista de trabajo activo por entregable.
    - `Original`: board agrupado por **Entregable**, sin filtro — vista completa por entregable, incluye COMPLETADO.
    - `Status`: table agrupada por **Entregable**, quick_filter Status = PENDIENTE, subtasks parents_and_subitems — vista de planning por entregable.
  - **Importante: el diseno canonico agrupa por Entregable** en las 3 vistas. Esto permite ver el avance por entregable real del proyecto, no por estado abstracto. El Tingo actual (consultado mayo 2026 via `get_view`) tiene los boards agrupados por Status — eso es drift de la plantilla original, no el patron a replicar.
  - `Status`, `% Avance`, `Terminado` o `Completado` deben quedar como propiedades de control/cierre, no como agrupador principal del board cuando el objetivo del usuario sea avanzar por entregables.
  - Colores recomendados para `Status`: `POR HACER` gray, `EN PROCESO` yellow, `COMPLETADO` green, `PENDIENTE` red. Los colores ayudan a leer, pero no reemplazan `Status`, `% Avance`, `Terminado`/`Completado` ni evidencia de cierre.
  - En los proyectos BIM/observaciones, ajustar agrupaciones segun instruccion del usuario; ejemplo validado: columnas por `Entregable`/observacion, y vista adicional por `Entregable interno` si el proyecto necesita ver frentes operativos.
  - Al crear actividades, usar siempre una jerarquia operativa: `Entregable` macro arriba y subactividades ejecutables debajo. El entregable debe ser el resultado/requisito que se busca cerrar; en proyectos con observaciones de revisor, el entregable suele ser la observacion levantada.
  - Si hace falta separar disciplina, paquete tecnico, frente de trabajo o entregable interno, crear/usar un campo auxiliar como `Entregable interno`, `Frente BIM`, `Especialidad` o equivalente. No usar ese campo auxiliar como sustituto del entregable macro cuando el seguimiento se mide por entregables u observaciones.
  - Para `Entregable` y `Entregable interno`, usar colores estables y semanticos por familia cuando sea posible; no copiar colores heredados de otra plantilla si confunden la lectura.
  - `% Avance` solo debe representar avance real validado o reportado por el usuario/evidencia. No usar porcentajes para indicar planificacion, peso, prioridad o "avance de estructura". Las actividades creadas como desglose pendiente deben iniciar en `0%`.
  - Si la actividad requiere informacion de terceros o insumo no confirmado, marcarla como bloqueada/pendiente cuando exista el campo correspondiente; no inventar avance.
- `REUNIONES`:
  - Propiedades: `OBJETIVOS`, `Date`, `ACUERDOS`, `OBSERVACIONES`.
  - Vista `Untitled` table.
- `DOCUMENTOS`:
  - Propiedades: `Nombre`, `Tipo`, `Fecha`, `Versión`, `Estado`, `Link`.
  - Vista `Default view` table.
- `CONTACTOS CLIENTE`:
  - Propiedades: `Nombre`, `Institución`, `Tipo`, `Cargo`, `Email`, `Teléfono`.
  - Vista `Default view` table.

Importante: `PUENTE TINGO` es plantilla de estructura, no fuente de contenido ni lista obligatoria de bases. No copiar sus entregables, responsables, ubicacion, categorias ni bases opcionales si no corresponden al proyecto nuevo. Para proyectos GEN+ ligeros o en etapa comercial/alcance, evitar crear `DOCUMENTOS` y `CONTACTOS CLIENTE` vacias.

#### Aprendizajes validados (mayo 2026) — leer antes de crear/refactorizar

Replica validada de la plantilla Tingo: proyecto `AGENTE INMOBILIARIO GEN+` en base `PROYECTOS` con las 2 bases inline obligatorias, 3 vistas Tingo en ACTIVIDADES y sincronizacion en T.TRABAJO. Lecciones que el skill debia haber evitado y ahora documenta:

**1. `get_database` de easy-notion NO devuelve `property_id`.** Solo devuelve `name` y `type`. Los `property_id` SON obligatorios para `create_view` (la API rechaza con "Fix one: property_id should be defined" si solo pasas `property_name`). Solucion: llamar a la Notion REST API directa con el token local — PowerShell snippet en `references/template-engineering-project.md`. Property IDs son strings cortos como `SxZr`, `qxhs`, `title`. La API los devuelve URL-encoded a veces (e.g., `Gs%5DU` → usar como `Gs]U`).

**2. `replace_content` es DOBLE DESTRUCTIVO.** No solo borra todos los bloques del body — tambien elimina automaticamente las `child_databases` referenciadas en ese body (verificado: child_databases declaradas en el markdown anterior desaparecen del workspace, no quedan orphans). Si vas a refactorizar el body de una pagina que ya tiene bases inline cargadas con filas, **te resignas a recrear las bases y re-insertar todas las filas**. Pedir confirmacion explicita al usuario antes de usar replace_content en una pagina con bases pobladas.

**3. `archive_page(database_id)` falla con 404.** La API trata las DBs distinto de las pages. Para archivar una DB: `PATCH /v1/databases/{id}` con `{"archived": true}` via REST. En la practica las DBs huerfanas tras replace_content ya estan eliminadas automaticamente y este endpoint devuelve 404 — eso es ok, no es un error real.

**4. `create_database` con select/multi_select acepta `options` inline aunque no aparezca en el JSON schema del tool.** Verificado: pasar `[{"name": "Status", "type": "select", "options": ["POR HACER", "EN PROCESO", "COMPLETADO", "PENDIENTE"]}]` funciona. Si una version futura lo rechaza, fallback: crear sin options y dejar que auto-populen al insertar filas.

**4.b. Colores y nombres de select/multi_select son INMUTABLES por option_id — pero PASAR colores al crear el DB FUNCIONA PERFECTAMENTE.** Notion rechaza PATCH para cambiar color de una option existente (`validation_error: Cannot update color of select with id`). También ignora silenciosamente intentos de renombrar (devuelve 200 OK pero no aplica). **CAMINO LIMPIO Y OBLIGATORIO al crear DB nueva**: pasar opciones con formato `[{"name": "X", "color": "red"}, ...]`, NO strings simples. Verificado 2026-05-28: pasando `options: [{name, color}]` en `create_database`, los colores aplican al instante y aparecen en `get_data_source` con el color exacto. No hay razón legítima para crear con strings simples — si lo hiciste, mejor recrear el DB que aplicar el workaround. Si tienes que recolorear post-create (DB con datos vivos):

**Workaround validado "park-and-restore"** (probado en `AGENTE INMOBILIARIO GEN+` 2026-05-28):

1. **PATCH 1**: agregar opción temporal `_PARK_<name>` con `color: default`, manteniendo las opciones originales con sus IDs.
2. **Row updates**: actualizar todas las filas que usan la opción original a usar `_PARK_<name>` (vía `update_database_entry` o REST con option_id explícito).
3. **PATCH 2**: omitir la opción original (se elimina por la regla full-list), manteniendo `_PARK_<name>` y demás opciones intactas.
4. **PATCH 3**: agregar nueva opción con el nombre original + el color deseado. DEBE ser un PATCH separado del paso 2 — combinar delete+add con el mismo `name` en un solo PATCH falla con `Cannot update color of select with name: X` (la API valida por nombre antes de procesar el diff).
5. **Row updates**: actualizar las filas de vuelta del `_PARK_` a la nueva opción con el nombre original (resuelve por name a la nueva).
6. **PATCH 4**: omitir `_PARK_<name>` para borrarla.

Costo: ~5 PATCHes + 2N row updates por opción. Para opciones sin rows (recién creadas, vacías), saltar steps 2 y 5.

**Beware encoding bugs**: en PowerShell con caracteres especiales (ó, ñ, +), pasar el name via JSON inline puede crear opciones fantasma duplicadas. Si después de unpark se ven dos opciones con el "mismo" nombre y colores distintos, fix: PATCH a `/v1/pages/{row_id}` asignando `option_id` explícito (bypassa la name resolution ambigua), luego eliminar el fantasma.

Colores reales Tingo Status (verificados via REST): POR HACER=red, EN PROCESO=yellow, COMPLETADO=green, PENDIENTE=blue. Ver `references/template-engineering-project.md` para colores de Encargado y Entregable.

**5. Sincronizacion con T.TRABAJO general — NO opcional.** Cuando el proyecto vive en `PROYECTOS`, **siempre** crear padre operativo en T.TRABAJO con sub-items espejo. Prefijo de sub-items: `G | <descripcion>` (convencion validada). Pendings con Status=0 explicito + Date de commitment, NO null. Reuniones se cargan tambien como sub-items con Status=100. Mantener ambos lados sincronizados ante cualquier cambio de Status/% Avance/Terminado.

**6. Pendings con Status=0 + Date, no null.** En la lista general T.TRABAJO los pendings deben mostrar `Status: 0` explicito (no null/vacio) y `Date` con la fecha de commitment. Sin esto, el render de la vista filtrada se ve roto y dificulta el reporte de actividades generales.

**7. Body Tingo usa H3 (`###`), no H2.** Headings de secciones superiores (`DESCRIPCIÓN`, `ACCESOS`, `INFORMACIÓN`) son `###`. Sub-bloques colapsables usan `+++ TÍTULO ... +++` (Easy-Notion-MCP los convierte a toggles reales). Sección ACCESOS usa layout `::: columns / ::: column ... :::` **con callouts dentro de cada columna** (sustituto del botón nativo que la API marca unsupported): `> [!TIP]`, `> [!INFO]`, `> [!NOTE]`, `> [!IMPORTANT]`. Sección APRENDIZAJES Y CRITERIOS: cada criterio se documenta como su propio callout `> [!IMPORTANT]` — la sección crece con el tiempo y cada entrada se ve como tarjeta independiente. Ver `references/template-engineering-project.md` para sintaxis exacta y convenciones por tipo de callout.

**8. Plantilla Tingo es agnostica al tipo de proyecto.** No es solo ingenieria estructural. Se uso exitosamente para un agente IA / automatizacion n8n. Las opciones de `Entregable` (select) se adaptan al proyecto (e.g., software: "Desarrollo del agente / Documentacion / Testing / Cierre"); el schema base se mantiene igual.

**9. `update_section` es DOBLE DESTRUCTIVO cuando la seccion editada NO tiene heading siguiente en la pagina.** Validado 2026-05-28 (DOS VECES porque cai en el mismo trap consecutivamente): `update_section(heading="APRENDIZAJES Y CRITERIOS")` en la pagina del inmobiliario BORRO ACTIVIDADES + REUNIONES inline databases que estaban debajo, porque el boundary del H3 se extiende hasta el siguiente heading H3/H2/H1 — y como no habia ninguno, extendio hasta el final de pagina, eliminando todo lo que estaba ahi, incluidos los child_databases.

**Patron SENTINELA obligatorio:** cuando una pagina tenga una seccion H3 que crece con el tiempo (APRENDIZAJES Y CRITERIOS, NOTAS, IDEAS, etc.) **Y** debajo tenga bases inline (ACTIVIDADES, REUNIONES, etc.), insertar SIEMPRE un heading H3 sentinela entre la seccion creciente y las bases. Recomendado: `### MEMORIA OPERATIVA` (descriptivo + neutro). Asi `update_section` sobre la seccion creciente extiende hasta el sentinela, las bases quedan blindadas.

Estructura segura:
```
### APRENDIZAJES Y CRITERIOS
... callouts crecientes
### MEMORIA OPERATIVA   ← sentinela
[ACTIVIDADES inline]
[REUNIONES inline]
```

Alternativa si por alguna razon no se puede agregar el sentinela: usar `find_replace` o `update_block` para edicion quirurgica, nunca `update_section`. Una seccion sin boundary siguiente es una bomba de tiempo para `update_section`.

**10. Callouts multi-linea con children: easy-notion solo preserva la primera linea; REST API SI soporta children completos.** Confirmado 2026-05-28: pasar `> [!IMPORTANT]\n> **Titulo**\n> - bullet 1\n> - bullet 2` (con o sin lineas vacias `>`, con o sin sintaxis tight) — easy-notion strippea todo excepto la primera linea del callout. Notion API SI permite callouts con children blocks. Workaround validado:

1. Crear el callout con solo el titulo via easy-notion `update_section`/`append_content`/`create_page`: `> [!IMPORTANT]\n> **Titulo del criterio**`.
2. Encontrar el block_id del callout: `GET /v1/blocks/{page_id}/children` y filtrar por `type == "callout"`.
3. Agregar bullets/paragraphs como children via REST: `PATCH /v1/blocks/{callout_id}/children` con array `children` de blocks `bulleted_list_item`, `paragraph`, etc. Cada block tiene `rich_text` array con annotations (`bold`, `italic`, `code`) por segmento.

Asi cada criterio queda visualmente como UNA tarjeta callout completa, no como callout-banner + contenido suelto debajo. Patron recomendado para secciones tipo `APRENDIZAJES Y CRITERIOS` donde cada entrada debe sentirse autonoma.

**11. NUNCA inventar nombres/datos del cliente.** Si el usuario menciona "Lily" en pasada (e.g., "actualizamos el de Lily") NO inferir que Lily es el cliente, asesor, o usuario sin confirmar. Usar placeholders explicitos como "Por confirmar" en campos no validados. Validado 2026-05-28: yo invente `CLIENTE: Lily / Inmobiliaria` en el proyecto inmobiliario sin tener confirmacion — error grave que violaba la regla Magnus de no fabricar datos. Si falta info, dejarla vacia o como placeholder, nunca llenar con inferencia.

### Actualizar proyecto

Trigger ejemplo: `activa skill documentar notion: actualizar proyecto`

Regla critica:

- No crear entradas en `REUNIONES` durante una actualizacion de estado, cierre de tramo, cierre documental, seguimiento por WhatsApp/correo o validacion operativa, salvo que el usuario diga explicitamente que hubo una reunion o pida "carga esto a reuniones".
- Si la evidencia dice "seguimiento", "se converso", "se confirmo", "se envio", "se cerro" o "quedo documentado" sin describir una reunion real, registrar el hecho en `ACTIVIDADES`, `CONTROL`, `DOCUMENTOS`, observacion del proyecto o hilo de memoria, no en `REUNIONES`.
- `REUNIONES` representa encuentros reales con objetivo, fecha, observaciones y acuerdos. No usarla como bitacora generica de cierres.

Flujo:
1. Determinar cuenta con el arranque rapido.
2. Pedir proyecto/pagina destino solo si no se puede inferir.
3. Buscar coincidencias; si hay ambiguedad real, pedir seleccion.
4. Leer estructura y contenido existente.
5. Leer tambien el padre operativo y subitems equivalentes en la lista general `ACTIVIDADES`, cuando existan.
6. Comparar con informacion nueva disponible en el agente.
7. Clasificar cambios: nuevo, duplicado, campo vacio, extension, conflicto, reemplazo, destructivo.
8. Si se actualiza estado/avance de una actividad, sincronizar ambos lados:
   - Proyecto inline `ACTIVIDADES` -> lista general `ACTIVIDADES`.
   - Lista general `ACTIVIDADES` -> proyecto inline `ACTIVIDADES`.
   - Mapear por nombre normalizado, entregable, fecha y observacion/link cuando no haya relation directa.
9. Ejecutar solo cambios seguros.
10. Pedir confirmacion para reemplazos, eliminaciones o cambios estructurales.
11. Reportar resultado, indicando que entidades quedaron sincronizadas y si alguna quedo pendiente por ambiguedad.

### Anadir contenido directo

Trigger ejemplo: `anade esto a Notion`

Flujo:
1. Preguntar donde insertarlo.
2. Preguntar formato: texto, tabla estatica, base de datos inline, imagen, bloque, tarea, cronograma, fila de base de datos o seccion.
3. Validar destino.
4. Insertar sin alterar el resto.
5. Confirmar ubicacion y formato.

### Cargar reunion

Trigger ejemplo: `sube la reunion a Notion` / `carga esto a reuniones`

Usar este activador solo cuando el usuario lo pida de forma explicita o cuando el input describa inequívocamente una reunion real realizada o programada. Si solo hay cierre de actividad, seguimiento a una persona, mensaje de confirmacion, correo, WhatsApp, entrega documental o evidencia de Drive, no crear registro en `REUNIONES`; actualizar actividades/control/documentos segun corresponda.

#### Preprocesamiento ICE obligatorio

Antes de registrar cualquier reunion, activar primero `meeting-ice-processor`, incluso si el input del usuario no es una transcripcion literal sino notas manuales, memoria hablada, acuerdos sueltos o resumen informal.

Secuencia obligatoria:

1. Procesar el input con `meeting-ice-processor`.
2. Obtener objetivo, observaciones fieles, acuerdos/pendientes, actividades trazables y puntos sueltos.
3. Registrar en Notion usando esta skill.
4. Generar mensaje WhatsApp curado.

Regla de densidad:

- Notion conserva la sustancia real: observaciones completas, decisiones, razonamiento, tensiones, puntos sueltos y estructura ICE dentro de la pagina de reunion.
- WhatsApp es directo y mas compacto, pero no debe omitir temas necesarios; agrupar antes que borrar.

Cuando se cree o actualice una pagina de reunion, insertar tambien una seccion `ICE - Estructura trazable de la reunion` con:
- `I - Ideas e insights`
- `C - Compromisos y cierres`
- `E - Ejecucion pendiente`
- `Puntos sueltos / por aclarar`

Si la reunion abarca varios proyectos, productos o frentes, insertar ademas una seccion `Macrosecciones / frentes de la reunion` antes o despues del ICE. Cada frente debe conservar su propio contexto y no mezclarse en una sola lista plana.

Formato recomendado:

- `Frente: [nombre]`
  - `Que se converso`
  - `Ideas / decisiones clave`
  - `Acuerdos / pendientes`
  - `Responsables`
  - `Puntos sueltos`
  - `Riesgos / ambiguedades`
  - `Preguntas de seguimiento`
  - `Plan trazable del frente`

Usar macrosecciones cuando aparezcan temas como AECODE Fase 2, AECODE Fase 3, GEN+, agentes, TessIA, Summit, SAMI, marketing/webinars, certificaciones, n8n, libro, partners, cliente externo o cualquier proyecto separado. Esta capa ayuda a que Notion funcione como memoria de proyecto, no solo como acta.

Si existe esta capa, no concentrar todos los acuerdos, puntos sueltos, riesgos y preguntas en bloques globales. Esos bloques pueden existir como sintesis, pero la memoria primaria debe quedar separada por frente/proyecto.

Regla de cantidad de frentes:

- 1 frente: registrar una sola estructura de reunion, sin forzar macrosecciones.
- 2-3 frentes: registrar cada frente como mini-acta completa. Este es el caso mas comun.
- 4+ frentes: mantener estructura por frente, pero cuidar longitud; si hace falta, guardar por tandas y confirmar antes de continuar.

Orden por defecto para Notion y WhatsApp: **frente -> secciones**. No invertirlo a **seccion -> frentes** salvo pedido explicito del usuario.

Cada frente debe conservar la estructura tradicional de reunion como mini-acta. No reemplazar el ICE por prosa suelta. Orden recomendado dentro de cada frente:

1. `Ficha del frente`
2. `Resumen del frente`
3. `Temas clave`
4. `ICE`
   - `I - Ideas e insights`
   - `C - Compromisos y cierres`
   - `E - Ejecucion pendiente`
5. `Acuerdos / pendientes trazables`
6. `Puntos sueltos`
7. `Riesgos / ambiguedades`
8. `Preguntas de seguimiento`
9. `Plan trazable`

Usar tablas cuando haya comparacion, ownership o seguimiento: temas, acuerdos, puntos sueltos, riesgos y plan. Usar bullets para resumen e insights.

Este activador produce dos salidas: registro en Notion y mensaje listo para WhatsApp.

**Paso 1 - Registrar en Notion REUNIONES**

Crear entrada en la base REUNIONES del proyecto usando:
- OBJETIVOS: titulo/objetivo de la reunion
- Date: fecha de la reunion (ISO)
- OBSERVACIONES: lista de observaciones detalladas
- ACUERDOS: lista de acuerdos y pendientes

**Paso 1b - Registrar tambien como actividad general**

Toda reunion realizada tambien cuenta como actividad operativa. Si el proyecto tiene seguimiento en la lista general `ACTIVIDADES`, crear o actualizar una fila/subitem ahi, vinculada al padre operativo del proyecto:
- Actividad: `G | Reunion ...`
- Empresa: empresa/proyecto correspondiente.
- Date: fecha real de la reunion.
- Status: `100` cuando la reunion ya ocurrio.
- Observacion: resumen breve de objetivo, acuerdos y pendientes.

No basta con crear la fila en la base inline `REUNIONES` del proyecto. La reunion debe aparecer tambien en la lista general de actividades para que entre en reportes y seguimiento diario. Si la vista general filtra `Checkbox = false`, dejar `Checkbox` sin marcar y usar `Status = 100` para indicar que esta realizada, salvo que el usuario indique otro criterio.

**Paso 2 - Mensaje WhatsApp para copiar y pegar**

Despues de documentar una reunion, si el usuario pide mensaje para WhatsApp/WSP, entregar siempre un mensaje de grupo con estructura **titulo/frente -> secciones**. Esta regla aplica aunque la reunion tenga un solo frente; no responder con resumen libre ni con listas separadas fuera del molde.

```text
*REUNIONES ([DD/MM/AAAA]) - [Titulo o frente]*

*Objetivo:*
• [objetivo principal de la reunion]

*Observaciones:*
• [punto 1]
• [punto 2]
• ...

*Acuerdos / Pendientes:*
• [acuerdo o pendiente 1]
• [acuerdo o pendiente 2]
• ...

✅ [cierre si aplica, ej: "Todo lo demas aprobado y validado en reunion."]
```

Regla de titulo: la primera linea debe ser siempre `*REUNIONES ([DD/MM/AAAA]) - [Titulo o frente]*`. Usar fecha real de la reunion; si falta, usar `Sin fecha`. Para reuniones con 2+ frentes, repetir el bloque completo por cada frente y usar el nombre del frente en el titulo.

Reglas del formato WA:
- Texto plano, sin markdown de codigo, sin tablas.
- Negrita solo con asteriscos simples (*texto*).
- Cada punto es una linea con bullet `•`.
- Tono directo, sin saludos ni firmas.
- Maximo 20 lineas en total; si hay mas contenido, agrupar puntos similares.
- Separar `Observaciones` de `Acuerdos / Pendientes`.
- No usar encabezados alternativos como `Resumen`, `Punto principal`, `Criterios`, `Acuerdos` o `Pendientes por definir` fuera del molde validado.
- No reemplazar el titulo por `FRENTE:`; el frente o tema va despues del guion en la primera linea.
- Si no hay validacion general, omitir el cierre con check.

### Reporte de actividades generales

Trigger ejemplo: `dame la lista de actividades generales`, `reporte de actividades generales`, `actividades generales para WSP`, `status general de actividades`.

Este activador usa la Notion de Fabrizio/GEN+ y la pagina:

- `T.TRABAJO (8 hr: 09:00 - 17:00)`: `https://www.notion.so/T-TRABAJO-8-hr-09-00-17-00-241d8cc4cfc180e7bce2f01e6a14c7f4`
- Page ID: `241d8cc4-cfc1-80e7-bce2-f01e6a14c7f4`

Fuente operativa validada:

- Base inline `ACTIVIDADES`.
- Database ID: `2dcd8cc4-cfc1-806c-bda6-f9c4862a9cfd`.
- Data source ID: `2dcd8cc4-cfc1-8121-a268-000b4f55c021`.
- Vista de referencia: `Tabla Filtrada`.
- View ID: `2dcd8cc4-cfc1-819e-87ac-000ce5033d79`.
- Configuracion historica validada de la vista:
  - `quick_filters`: propiedad `Checkbox` igual a `false`.
  - Agrupacion visual por `Empresa`.
  - Subtareas visibles con `parents_and_subitems`.
- La fuente de verdad es la configuracion viva de la vista `Tabla Filtrada`. Si el usuario agrega, quita o cambia filtros en esa vista, el reporte debe leer y respetar esos filtros actuales.

Regla de arranque obligatoria:

- Para este activador, arrancar siempre con Notion MCP. No usar scripts locales, `urllib`, requests directos a la API, tokens locales ni otros medios como primera ruta.
- Primero validar con MCP la pagina `T.TRABAJO`, la base `ACTIVIDADES` y la vista `Tabla Filtrada`.
- Primero intentar consultar directamente la vista `Tabla Filtrada` o leer su configuracion actual. No asumir filtros estaticos.
- Si el MCP no tiene una herramienta directa para consultar una vista, usar MCP para leer la configuracion viva de la vista y luego usar MCP para consultar el `data_source_id` replicando esos filtros actuales.
- Usar el filtro historico `Checkbox = false` solo como fallback si no se puede leer la configuracion de la vista viva. Si se usa este fallback, decirlo explicitamente en la respuesta.
- Solo usar API directa o lectura de credenciales locales si el usuario lo autoriza explicitamente o si no existe ninguna herramienta MCP disponible en la sesion. Si ocurre, decirlo de forma clara antes de continuar.

Reglas de consulta:

1. Usar Notion MCP para ubicar/validar pagina, base, data source y vista.
2. No consultar toda la base como reporte final si el usuario pide `actividades generales`; el alcance por defecto es la vista `Tabla Filtrada`.
3. Leer primero la configuracion viva de `Tabla Filtrada` y replicar exactamente sus filtros actuales. Si el usuario agrego filtros manualmente en Notion, esos filtros mandan.
4. Si el MCP expone una herramienta de consulta de vista, preferir esa ruta. Si solo expone query de data source, construir el query a partir de los filtros actuales de la vista.
5. No usar `Checkbox = false` como filtro estatico salvo fallback declarado. Ese filtro solo es la configuracion historica conocida.
6. Incluir filas padre/proyectos visibles y subitems visibles. Los padres funcionan como proyectos; los subitems son actividades.
7. Agrupar salida por empresa y luego por proyecto.
8. Usar `Status >= 100` como completada; `Status < 100` o vacio como pendiente. Pueden existir actividades completadas en status 100 aun visibles si la vista las incluye.
9. Mostrar el porcentaje de `Status` en cada actividad cuando exista.
10. No omitir proyectos visibles aunque no tengan pendientes.
11. Si se generan archivos TXT, tambien responder textual en el chat cuando el usuario pida formato para WhatsApp.

Formato WhatsApp validado:

```text
*REPORTE DE ACTIVIDADES*
*Fecha:* DD/MM/AAAA

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🟣 *AECODE*
*Proyectos visibles:* N
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*Puntos clave generales:*
- [Aporte/valor logrado por actividades completadas y pendientes relevantes.]
- [Desarrollo de herramientas, control de procesos, gestion academica, comercial u operativa segun corresponda.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*DESGLOSE POR PROYECTO*

*Nombre del proyecto*
*Completadas:*
- [Actividad] - XX%

*Pendientes:*
- [Actividad] - XX%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔵 *GEN+*
*Proyectos visibles:* N
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*Puntos clave generales:*
- [Aporte/valor logrado en proyectos, gestion tecnica, BIM, entregables, coordinaciones o modelos.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*DESGLOSE POR PROYECTO*

*Nombre del proyecto*
...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚪ *ThesIA*
*Proyectos visibles:* N
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*Puntos clave generales:*
- [Aporte/valor del seguimiento academico o documental.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*DESGLOSE POR PROYECTO*

*Nombre del proyecto*
...
```

Reglas visuales del formato:

- Separar cada empresa con doble linea: una linea larga antes del encabezado de empresa y otra despues de `*Proyectos visibles:* N`.
- Antes de `*DESGLOSE POR PROYECTO*`, usar una sola linea larga. No poner segunda linea debajo del titulo de desglose.
- Dentro de cada empresa, siempre mostrar primero `*Puntos clave generales:*` y despues el desglose por proyecto.
- El separador estandar es `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`.
- Usar `*Proyectos visibles:* N`, no `*Proyectos activos:* N`, porque el reporte depende de la vista filtrada.

Lineamientos de redaccion para `Puntos clave generales`:

- No titular como `Resumen de aporte`; usar siempre `Puntos clave generales`.
- Redactar en viñetas breves, enfocadas en valor, avance y desbloqueo operativo.
- Para AECODE/marketing, mencionar `desarrollo de herramientas` cuando aplique.
- Para automatizacion n8n, no decir `cierre operativo` si el programa esta arrancando; describirlo como arranque, control de procesos y avance de sesiones/talleres.
- Para GEN+, enfocar en gestion tecnica, trazabilidad de entregables, avance BIM/modelos, coordinaciones y desbloqueo de pendientes.
- No incluir una viñeta generica tipo `Falta alinear pendientes al planning` salvo que el usuario lo pida explicitamente.
- Usar bolitas por empresa: AECODE morado, GEN+ azul, ThesIA verde.

### Matrices y contenido editable

Cuando la informacion tendra vida operativa, evaluacion, filtros, orden, estados o ownership, no usar una tabla Markdown/HTML como salida principal. Preferir:

1. Crear una base de datos inline real dentro de la pagina destino.
2. Definir propiedades utiles antes de cargar filas: titulo, orden, descripcion, estado, relevancia, responsable, audiencia, fecha, tags o recomendacion.
3. Cargar cada item como fila/pagina de la base.
4. Crear o ajustar una vista principal limpia con las columnas clave.
5. Evitar vistas duplicadas: si se crea la base y luego una vista vinculada, dejar solo una representacion visible salvo que el usuario pida varias vistas.

Usar tabla estatica solo cuando el contenido sea puramente expositivo y no necesite gestion posterior.

### Bases inline, linked views y vistas

Puntos aprendidos en proyectos GEN+:

- En Notion API, un bloque `child_database` puede ser una base inline real o una linked database view. No asumir que ambas cosas son iguales.
- Si el usuario pide "inline", normalmente quiere ver la base editable directamente en la pagina, sin tener que entrar a otra pagina/base.
- Para una base inline real, crear la base con `POST /v1/databases` y `is_inline: true`, con `parent.page_id` igual a la pagina destino.
- Evitar crear solo linked database views con `POST /v1/views` + `create_database` si el usuario espera una fuente propia. Eso crea un contenedor visual que puede depender de otro data source.
- Si se usan linked views temporalmente, no archivar/eliminar la fuente original hasta migrar datos a una base inline real y verificar queries.
- Para migrar de linked/source a inline real:
  1. Restaurar temporalmente la fuente si esta archivada.
  2. Consultar filas de la fuente.
  3. Crear base inline real nueva con `is_inline: true`.
  4. Migrar filas.
  5. Replicar vistas sobre la nueva base.
  6. Verificar conteo de filas y vistas.
  7. Recién despues archivar la linked view y la fuente vieja si corresponde.
- Antes de archivar cualquier base, verificar que la nueva base responde a query y que la pagina visible muestra solo la estructura deseada.

### Views API

Cuando haya que igualar vistas de una plantilla:

- Listar vistas con `GET /v1/views?database_id=<database_id>`.
- Leer cada vista con `GET /v1/views/<view_id>`.
- Crear vistas con `POST /v1/views`.
- Actualizar vistas con `PATCH /v1/views/<view_id>`.
- Usar `data_sources[0].id` de `GET /v1/databases/<database_id>` para crear vistas.
- Para boards, configurar `group_by` segun la plantilla o instruccion del usuario.
- Para tablas agrupadas, configurar `configuration.type = "table"` y `group_by`.
- Ejemplo operativo:
  - Board de actividades agrupado por `Status`.
  - Vista tabla `Status` agrupada por `Entregable`.
- No copiar a ciegas filtros, agrupaciones ni categorias de la plantilla; adaptar a la informacion real del proyecto.

### Accesos tipo botones

- Los botones nativos o bloques especiales de Notion pueden aparecer como `unsupported` por API.
- Si la API no expone el bloque boton, usar una aproximacion segura: columnas con callouts o textos enlazados con titulo corto (`MIRO`, `DRIVE`, `MATRIZ`, `LOG`), evitando URLs largas.
- Indicar la limitacion si el usuario exige el boton nativo exacto: puede requerir ajuste manual en UI.

### Codificacion

- En Windows/PowerShell, usar Python con `-X utf8` o escapes Unicode para evitar que tildes y `ñ` entren como `?`.
- Verificar despues los textos visibles de pagina, propiedades y filas.
- Corregir nombres de propiedades si quedan con codificacion rota, por ejemplo `Observación` y `Fecha Límite`.

## Cambios seguros vs sensibles

Seguro por defecto:
- Crear pagina nueva si destino y plantilla estan confirmados.
- Anadir bloque.
- Anadir fila nueva.
- Crear base de datos inline nueva si el usuario pidio contenido gestionable o editable y el parent esta confirmado.
- Completar campo vacio.
- Extender seccion existente.
- Insertar imagen nueva si la ruta es valida.

Requiere confirmacion:
- Reemplazar texto existente.
- Cambiar propiedades/schema.
- Cambiar relaciones.
- Alterar fechas, estados, cronogramas o boards.
- Reordenar estructura.
- Mover/reparentar paginas o bases.
- Reemplazar imagen existente.
- Eliminar vistas, bases duplicadas o bloques hijos. Si el sistema advierte que un replace borraria child pages/databases, preservar esos bloques o pedir confirmacion explicita.

Prohibido salvo instruccion literal:
- Eliminar contenido.
- Eliminar paginas o bases.
- Romper plantillas, vistas, cronogramas o bases internas.

## Imagenes

Si hay imagenes del usuario o generadas:
1. Detectar si son URL publica, archivo local, imagen adjunta o artefacto generado.
2. Preferir upload/soporte nativo si MCP/API lo permite.
3. Si no se puede subir, insertar placeholder/caption con referencia.
4. No afirmar que la imagen fue insertada si solo se inserto una referencia.

Limitacion conocida: easy-notion-mcp y la Notion API no permiten upload de imagenes locales ni pegado de clipboard. Solo se pueden insertar imagenes via URL publica externa.

## Validaciones obligatorias

Antes de escribir:
- Existe destino.
- Existe plantilla si aplica.
- Hay permisos de lectura/escritura.
- No hay multiples destinos ambiguos.
- La estructura fue leida o se declara modo parcial.
- El contenido no es duplicado probable.
- El cambio no implica reemplazo/eliminacion sin confirmacion.
- Las imagenes tienen ruta viable.
- Si se crean bases o vistas, verificar despues con fetch/API que no quedaron duplicadas visibles.
- Si se crean bases inline, verificar que sean fuentes propias cuando el usuario no pidio linked views.
- Si se archivan bloques antiguos, verificar que los datos sigan consultables desde la nueva base.
- Si se replica una plantilla, verificar que las categorias/opciones correspondan al proyecto nuevo y no sean herencia accidental del modelo.

## Referencia tecnica

Para limites de Notion MCP/API, contratos internos, templates, blocks, imagenes y diffs, leer:

`references/notion-mcp-and-api-patterns.md`

Para candidatos MCP, riesgos y rutas alternativas, leer:

`references/notion-mcp-candidates.md`

Para la plantilla de referencia de proyectos de ingenieria (estructura PUENTE-TINGO), leer:

`references/template-engineering-project.md`

## Script fallback

Si MCP no esta disponible o se necesita preparar un plan/diff local, usar:

`scripts/notion_documenter.py`

El script es fallback; no reemplaza la ruta MCP-first.

## Formato de salida

Al terminar, responder:

```markdown
Destino:
- <pagina/base/proyecto>

Ruta usada:
- Notion MCP | easy-notion-mcp | API fallback | Plan manual

Cambios aplicados:
- ...

Cambios omitidos:
- ...

Requieren confirmacion:
- ...

Limitaciones:
- ...

Siguiente paso:
- ...
```
