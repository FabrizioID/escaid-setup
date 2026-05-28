# Template: Proyecto GEN+ (Tingo-based)

Plantilla derivada del proyecto PUENTE-TINGO. Validada en mayo 2026 con el proyecto **AGENTE INMOBILIARIO GEN+** — primera replicación exitosa de la estructura completa via easy-notion-mcp + Notion REST API.

Esta plantilla NO es exclusiva de ingeniería estructural. Aplica también a proyectos de software, agentes IA, automatizaciones y cualquier otro proyecto GEN+ que viva en la base `PROYECTOS`. Las propiedades opcionales (DOCUMENTOS, CONTACTOS CLIENTE) se omiten cuando el proyecto no tiene esos artefactos; ACTIVIDADES + REUNIONES son obligatorias por default.

Página modelo de referencia:

- `PUENTE TINGO`: `https://www.notion.so/PUENTE-TINGO-1d5d8cc4cfc180908d55c4da6d801474`

Réplica software validada:

- `AGENTE INMOBILIARIO GEN+`: `https://www.notion.so/AGENTE-INMOBILIARIO-GEN-36ed8cc4cfc18119924ad1413f1a1819`

## Estructura del cuerpo de página

Tingo usa un cuerpo minimalista. La gran mayoría del contenido vive **dentro de las bases inline**, no en headings sueltos del body. El body es solo punto de entrada.

```
[Pagina del proyecto] (vive como fila en PROYECTOS)
  ├── ### DESCRIPCIÓN                    (un párrafo)
  ├── ### ACCESOS                         (columns con CALLOUTS estilo botón)
  ├── ### INFORMACIÓN                     (propiedades + toggles colapsables)
  │     ├── CLIENTE / DEPARTAMENTO / TIPO (texto en negrita)
  │     ├── +++ STACK / PLAZO / COSTO     (toggles +++)
  │     └── +++ FORMAS DE PAGO            (toggle con imagen o link)
  ├── ### APRENDIZAJES Y CRITERIOS        (opcional, cada criterio como CALLOUT)
  ├── ---                                  (divisor)
  ├── ### MEMORIA OPERATIVA                (SENTINELA — blinda APRENDIZAJES de update_section)
  ├── ACTIVIDADES                          (base inline real, NO linked view)
  ├── REUNIONES                            (base inline real)
  ├── DOCUMENTOS                           (opcional)
  └── CONTACTOS CLIENTE                    (opcional)
```

**Importante sobre `### MEMORIA OPERATIVA` (heading sentinela):** se inserta SIEMPRE entre la última sección creciente (APRENDIZAJES Y CRITERIOS) y las bases inline. Esto blinda las bases contra `update_section` sobre cualquier sección anterior — sin el sentinela, el boundary del H3 anterior se extiende hasta fin de página y borra las bases. Ver SKILL.md aprendizaje #9.

Reglas firmes:

- Headings de sección superiores son **H3 (`###`)**, no H2.
- Toggles colapsables usan markdown `+++ TÍTULO ... +++` (Easy-Notion-MCP los convierte a bloques toggle reales de Notion).
- Layout de columnas usa `::: columns / ::: column ... :::`.
- **Callouts** (la aproximación válida cuando Notion expone botones como `unsupported`): `> [!TIP]`, `> [!NOTE]`, `> [!INFO]`, `> [!IMPORTANT]`, `> [!WARNING]`, `> [!SUCCESS]`, `> [!ERROR]`. Cada callout se ve como tarjeta con icono y color.
- Las 4 bases son **bases inline reales** (`is_inline: true`), NO linked views.
- El divisor `---` separa el área "informativa" del área "operacional" (bases).

### Patrón ACCESOS (callouts en columnas — sustituto del botón nativo)

Tingo usa botones nativos que la API marca como `unsupported`. El sustituto cercano son **callouts dentro de columnas** — se ven como tarjetas/botones con icono, color y link clickeable.

```markdown
### ACCESOS

::: columns
::: column
> [!TIP]
> 🔧 [Workflow n8n](https://...)
:::
::: column
> [!INFO]
> 📁 [DRIVE](https://...)
:::
::: column
> [!INFO]
> 📊 [SHEETS](https://...)
:::
::: column
> [!NOTE]
> 📖 MANUAL — local
:::
:::
```

Convención de tipos por uso:
- `[!TIP]` (verde) → herramienta principal del proyecto (workflow, repo, app)
- `[!INFO]` (azul) → recursos externos (Drive, Sheets, dashboards)
- `[!NOTE]` (gris) → documentación, manuales, archivos locales
- `[!IMPORTANT]` (morado) → enlaces críticos que el usuario debe abrir primero
- `[!WARNING]` (ámbar) → pendientes o accesos sin URL todavía

### Patrón APRENDIZAJES Y CRITERIOS (callout por entrada)

Sección de conocimiento del proyecto. Distinta de ACTIVIDADES y REUNIONES. Crece con el tiempo: cada criterio nuevo se documenta como su propio callout, lo que permite que cada uno se vea como tarjeta independiente y se pueda mover/reordenar/colapsar.

```markdown
### APRENDIZAJES Y CRITERIOS

Sección de conocimiento del proyecto — **distinta de ACTIVIDADES y REUNIONES**. Aquí viven ideas clave, criterios reutilizables y valor extraído. Cada criterio se documenta como callout independiente — la sección crece con el tiempo.

> [!IMPORTANT]
> **1. <Título del criterio>**
>
> - **Qué dice:** ...
> - **Por qué importa:** ...
> - **Cómo aplicarlo:** ...
> - **Patrón validado aquí:** ...
>
> **Promoción al kernel global:** criterio #N en `general-criteria-kernel.md` (si aplica).

> [!IMPORTANT]
> **2. <Siguiente criterio>**
> ...
```

Convención: usar `[!IMPORTANT]` (morado) por defecto para criterios — destaca visualmente y comunica peso. Si el criterio es más bien una observación blanda o un tip operativo, usar `[!TIP]` o `[!NOTE]`.

## IDs de referencia

### PUENTE-TINGO (plantilla de origen)

- Página del proyecto: `1d5d8cc4-cfc1-8090-8d55-c4da6d801474`
- Base raíz PROYECTOS: `df0ec712-a340-4f5e-b5e8-e08b84712e08`
- ACTIVIDADES DB: `1dcd8cc4-cfc1-80e4-a666-e11f8d36a286`
- REUNIONES DB: `1dcd8cc4-cfc1-80e1-b17d-ccd249f70c33`
- DOCUMENTOS DB: `8c081802-c72b-4132-82cd-9608e3d129c3`
- CONTACTOS CLIENTE DB: `2cb01817-ce2f-4f28-aecb-ff2e8d0df0c1`

### AGENTE INMOBILIARIO GEN+ (réplica software validada)

- Página del proyecto: `36ed8cc4-cfc1-8119-924a-d1413f1a1819`
- ACTIVIDADES DB: `106d30ec-a66b-4f91-aa9d-426139c4dd73`
- REUNIONES DB: `8f488af9-28bd-4c98-b66c-19d54dc8b78c`
- Padre operativo en T.TRABAJO: `36ed8cc4-cfc1-81cc-bb40-c243e7f8b82e`

## Schemas de propiedades (validados)

### ACTIVIDADES — schema fijo

| Propiedad    | Tipo          | Opciones (fijas / adaptadas)                          |
|--------------|---------------|--------------------------------------------------------|
| Name         | title         | Nombre de la actividad                                 |
| Status       | select        | **FIJO**: POR HACER, EN PROCESO, COMPLETADO, PENDIENTE |
| Entregable   | select        | **ADAPTAR** al proyecto (ver patrón abajo)             |
| Encargado    | multi_select  | **ADAPTAR** al proyecto (personas / equipos)           |
| Fecha Límite | date          | Para pendings: usar fecha de commitment, NO null       |
| Observación  | rich_text     | Contexto, criterio de cierre, link a fuente            |
| % Avance     | number        | 0-100. Para pendings: 0 explícito, NO null             |

**Regla crítica de pendings:** un pending sin `Status`, `Fecha Límite` ni `% Avance` se ve mal en las vistas. **Siempre** Status="PENDIENTE", %Avance=0 (no null), Fecha Límite con la fecha de commitment de la reunión donde se acordó.

### Colores VERIFICADOS en Tingo (no inventar)

**Status** — colores reales fetched vía REST API GET /v1/databases/:

| Option       | Color real Tingo |
|--------------|------------------|
| POR HACER    | **red**          |
| EN PROCESO   | **yellow**       |
| COMPLETADO   | **green**        |
| PENDIENTE    | **blue**         |

**Encargado** (multi_select) — colores por persona en Tingo:

| Option    | Color    |
|-----------|----------|
| Todos     | default  |
| Javier    | purple   |
| Fabrizio  | blue     |
| Israel    | orange   |
| Ivana     | red      |

**Entregable** — Tingo asigna un color distinto a cada entregable de ingeniería. Para proyectos nuevos, adaptar el set de colores al tipo:

| Tipo proyecto    | Patrón de color sugerido (al crear) |
|------------------|-------------------------------------|
| Engineering      | usar exactos de Tingo (blue/purple/orange/yellow/green/red/gray/pink/default/brown) |
| Software/agente  | Desarrollo→blue, Documentación→purple, Testing→yellow, Cierre→green |
| Marketing        | adaptar libre — usar colores que diferencien |

### ⚠️ LIMITACIÓN CRÍTICA: nombres y colores de options son inmutables por option_id

Notion **NO permite actualizar el color de una select option existente vía PATCH** (error `validation_error`: "Cannot update color of select with id: X"). **Tampoco permite renombrar**: la API devuelve 200 OK pero ignora silenciosamente el cambio de `name`. El color y el nombre se fijan al CREAR la opción y son inmutables por option_id.

**Camino limpio (preferido):** pasar opciones con colores al crear el DB:

```json
{
  "name": "Status",
  "type": "select",
  "options": [
    {"name": "POR HACER",   "color": "red"},
    {"name": "EN PROCESO",  "color": "yellow"},
    {"name": "COMPLETADO",  "color": "green"},
    {"name": "PENDIENTE",   "color": "blue"}
  ]
}
```

Si se crean con strings simples (`"options": ["POR HACER", ...]`), todas quedan `color=default`. Para corregir post-create existe el workaround validado abajo.

### 🔧 Workaround "park-and-restore" para recolorear options existentes

Validado en `AGENTE INMOBILIARIO GEN+` (2026-05-28). Aplica cuando la opción tiene filas referenciándola; si no tiene filas, saltar steps 2 y 5.

**Steps:**

1. **PATCH 1** — agregar opción temporal `_PARK_<name>` con `color: default`, manteniendo todas las originales con sus IDs:
   ```json
   "Status": {"select": {"options": [
     {"id": "<existing-id>", "name": "POR HACER"},
     {"name": "_PARK_POR_HACER", "color": "default"}
   ]}}
   ```

2. **Row updates** — actualizar todas las filas que usan la opción original a `_PARK_<name>`:
   ```
   update_database_entry: {"Status": "_PARK_POR_HACER"}
   ```

3. **PATCH 2** — omitir la opción original (se elimina), manteniendo `_PARK_<name>` y demás opciones:
   ```json
   "Status": {"select": {"options": [
     {"id": "<park-id>", "name": "_PARK_POR_HACER"}
     // original omitida → eliminada
   ]}}
   ```

4. **PATCH 3** (separado del paso 2) — agregar la nueva opción con el nombre original + color deseado:
   ```json
   "Status": {"select": {"options": [
     {"id": "<park-id>", "name": "_PARK_POR_HACER"},
     {"name": "POR HACER", "color": "red"}
   ]}}
   ```
   
   ⚠️ **Delete y add deben ser PATCHes separados.** Si se combinan en uno solo (omitir original + add nueva con mismo nombre), la API rechaza con `Cannot update color of select with name: X` — Notion valida por nombre antes de procesar el diff, detecta el "duplicado" y aborta.

5. **Row updates** — restaurar las filas del `_PARK_` a la nueva opción con el nombre original (resuelve por name a la única "POR HACER" restante, que es la nueva con color):
   ```
   update_database_entry: {"Status": "POR HACER"}
   ```

6. **PATCH 4** — omitir `_PARK_<name>` para eliminarla del schema:
   ```json
   "Status": {"select": {"options": [
     {"id": "<new-id>", "name": "POR HACER"}
     // _PARK_ omitida → eliminada
   ]}}
   ```

**Costo:** 4 PATCHes + 2N row updates por opción a recolorear (N = filas que la usan). Para opciones sin filas, saltar steps 2 y 5 → 4 PATCHes total.

**Caso validado completo en `AGENTE INMOBILIARIO GEN+ → ACTIVIDADES`** (`106d30ec-...`):
- Status (4 options, 8 rows): aplicado → 4 colores correctos
- Entregable (4 options, 8 rows): aplicado → 4 colores correctos
- Encargado (multi_select, 3 options, 8 rows): aplicado → 3 colores correctos
- Total: ~60 ops para recolorear las 3 propiedades completas

### Encoding gotcha: phantoms duplicados

Cuando se pasan nombres con caracteres especiales (`ó`, `ñ`, `+`) vía PowerShell con escapes Unicode (`ó`), la API puede crear opciones fantasma con representación de bytes ligeramente diferente, generando duplicados visibles. Signo: dos opciones con el "mismo" nombre y colores distintos.

**Fix:** asignar `option_id` explícito a las filas afectadas vía REST `PATCH /v1/pages/{row_id}` con `{"properties": {"<Prop>": {"select": {"id": "<target-option-id>"}}}}`. Esto bypassa la name resolution ambigua. Luego eliminar el fantasma con un PATCH sobre `/v1/data_sources/{id}` omitiéndolo del array.

Regla visual: los colores ayudan a leer la base, pero NO son la fuente de verdad del cierre. El cierre se determina por `Status`, `% Avance`, `Terminado`/`Completado` y evidencia en `Observación`.

Regla visual: los colores ayudan a leer la base, pero NO son la fuente de verdad del cierre. El cierre se determina por `Status`, `% Avance`, `Terminado`/`Completado` y evidencia en `Observación`.

### REUNIONES — schema fijo

| Propiedad      | Tipo      | Notas                                              |
|----------------|-----------|----------------------------------------------------|
| OBJETIVOS      | title     | Objetivo/título de la reunión                      |
| Date           | date      |                                                    |
| ACUERDOS       | rich_text | Acuerdos + pendientes derivados                    |
| OBSERVACIONES  | rich_text | Notas, contexto, decisiones                        |

### DOCUMENTOS — schema (opcional, solo si hay material)

| Propiedad   | Tipo         | Opciones                                                  |
|-------------|--------------|-----------------------------------------------------------|
| Nombre      | title        |                                                           |
| Tipo        | select       | Plano, Memoria de Cálculo, Estudio, Especificaciones Técnicas, Contrato, Presupuesto, Manual, Doc Técnica, Otro |
| Fecha       | date         |                                                           |
| Versión     | rich_text    | v1.0, Rev A, etc.                                         |
| Estado      | select       | Borrador, En Revisión, Aprobado, Entregado                |
| Link        | url          | Drive, SharePoint, archivo local                          |

### CONTACTOS CLIENTE — schema (opcional, solo si hay contactos externos)

| Propiedad   | Tipo          | Opciones                                                |
|-------------|---------------|---------------------------------------------------------|
| Nombre      | title         |                                                         |
| Institución | rich_text     |                                                         |
| Tipo        | select        | Contraparte Técnica, Supervisor, Cliente, Sponsor, Funcionario |
| Cargo       | rich_text     |                                                         |
| Email       | email         |                                                         |
| Teléfono    | phone_number  |                                                         |

## Vistas validadas — config exacta

### Vistas de ACTIVIDADES (3 vistas — diseño canónico)

**Importante:** el diseño canónico agrupa por **Entregable** en las 3 vistas. Esto refleja el avance real del proyecto por unidad de entregable, no por estado abstracto. El Tingo actual (mayo 2026) tiene los boards agrupados por Status — eso es drift y no debe replicarse.

**1. Vista Filtrada** — board, agrupado por Entregable, muestra trabajo activo

```json
{
  "name": "Vista Filtrada",
  "type": "board",
  "configuration": {
    "type": "board",
    "group_by": {
      "type": "select",
      "property_id": "<id de Entregable>",
      "property_name": "Entregable",
      "sort": {"type": "manual"},
      "hide_empty_groups": false
    }
  },
  "quick_filters": {
    "<id de Status>": {"select": {"equals": ["EN PROCESO", "POR HACER", "PENDIENTE"]}}
  }
}
```

**2. Original** — board, agrupado por Entregable, sin filtro (incluye COMPLETADO)

```json
{
  "name": "Original",
  "type": "board",
  "configuration": {
    "type": "board",
    "group_by": {
      "type": "select",
      "property_id": "<id de Entregable>",
      "property_name": "Entregable",
      "sort": {"type": "manual"},
      "hide_empty_groups": false
    }
  }
}
```

**3. Status** — table agrupada por Entregable, solo PENDIENTES, con subtasks visibles

```json
{
  "name": "Status",
  "type": "table",
  "configuration": {
    "type": "table",
    "group_by": {
      "type": "select",
      "property_id": "<id de Entregable>",
      "property_name": "Entregable",
      "sort": {"type": "manual"},
      "hide_empty_groups": true
    },
    "subtasks": {
      "filter_scope": "parents_and_subitems",
      "toggle_column_id": "title"
    }
  },
  "quick_filters": {
    "<id de Status>": {"select": {"equals": "PENDIENTE"}}
  }
}
```

### Override BIM / observaciones

Cuando el proyecto se mide por observaciones o entregables del revisor, como Carretera Canete, la vista operativa principal puede agruparse por `Entregable` aunque la plantilla Tingo base use boards por `Status`. En ese caso:

- `Entregable`: observacion/requisito del revisor.
- `Entregable interno`: frente operativo GEN+.
- `Status`, `% Avance` y `Terminado` quedan como control de cierre, no como agrupador principal.
- Crear una vista adicional por `Entregable interno` si se necesita ver que frentes operativos cubren cada observacion.

Regla de colores para `Entregable` y `Entregable interno`: usar colores estables y semanticos por familia de trabajo cuando la API/herramienta permita definirlos. No copiar colores heredados de otra plantilla si confunden la lectura. Para BIM/observaciones, `Entregable` representa la observacion/requisito del revisor y puede usar colores neutrales o rotativos; `Entregable interno` debe priorizar lectura operativa por frentes, por ejemplo `Modelo federado` blue, `Interferencias / compatibilizacion` red, `Fichas C1/C2` purple, `PEB / LOD-LOI / TIP` yellow, `CDE / Gestion documental` gray, `Metrados BIM trazables` green, `Simulacion 4D / video` orange.

### Vista de REUNIONES (1 vista)

**Untitled** — table con todas las columnas visibles, wrap_cells true. La vista default creada con la base ya funciona bien; opcionalmente renombrar.

### Configs adicionales de polish (no obligatorias, pero recomendadas)

Las vistas pueden incluir más detalle que `group_by` + `quick_filters`. No son funcionales (las vistas funcionan sin esto), pero replicarlas mejora la lectura del board:

**Para boards (Vista Filtrada y Original) — agrupando por Entregable:**

```json
"configuration": {
  "type": "board",
  "group_by": { "property_id": "<id Entregable>", ... },
  "properties": [
    {"property_id": "title",                  "property_name": "Name",         "visible": true},
    {"property_id": "<id Entregable>",        "property_name": "Entregable",   "visible": false},
    {"property_id": "<id Status>",            "property_name": "Status",       "visible": true},
    {"property_id": "<id Encargado>",         "property_name": "Encargado",    "visible": true},
    {"property_id": "<id Fecha Límite>",      "property_name": "Fecha Límite", "visible": true},
    {"property_id": "<id % Avance>",          "property_name": "% Avance",     "visible": true}
  ],
  "cover": {"type": "page_cover"},
  "cover_size": "small",
  "cover_aspect": "cover"
}
```

Notar: `Entregable` con `visible: false` en las tarjetas porque ya es el eje del group_by — mostrarlo sería redundante. En cambio `Status` y `% Avance` SÍ se muestran en las tarjetas para leer el avance dentro de cada entregable.

**Para la tabla `Status`:**

```json
"configuration": {
  "type": "table",
  "group_by": { ... },
  "subtasks": {"filter_scope": "parents_and_subitems", "toggle_column_id": "title"},
  "properties": [
    {"property_id": "title",             "property_name": "Name",         "visible": true, "width": 472},
    {"property_id": "<id Encargado>",    "property_name": "Encargado",    "visible": true, "width": 200},
    {"property_id": "<id Fecha Límite>", "property_name": "Fecha Límite", "visible": true, "width": 200},
    {"property_id": "<id Status>",       "property_name": "Status",       "visible": true, "width": 200},
    {"property_id": "<id % Avance>",     "property_name": "% Avance",     "visible": true, "width": 200},
    {"property_id": "<id Entregable>",   "property_name": "Entregable",   "visible": true, "width": 200}
  ],
  "frozen_column_index": -1
}
```

Si se omite el array `properties`, Notion muestra todas las columnas con widths default. Funcional pero menos polish.

**Validado:** las vistas del inmobiliario (replica software) se crearon sin `properties` array y funcionan bien — solo les falta el polish de widths fijas y los `visible: false` en boards. Para futuras réplicas que quieran ser visualmente idénticas a Tingo, incluir el array `properties` al crear.

## Property IDs — cómo obtenerlos

**Problema crítico:** `easy-notion-mcp.get_database` NO devuelve los `property_id`. Solo devuelve `name` y `type`. Los `property_id` SÍ son obligatorios para crear vistas con `configuration.group_by.property_id` y `quick_filters`.

**Solución validada:** llamar a la Notion REST API directamente con el token local.

PowerShell:

```powershell
$j = Get-Content "$env:USERPROFILE\.codex\credentials\notion\josefabrizioid_notion.json" -Raw | ConvertFrom-Json
$headers = @{
  "Authorization" = "Bearer $($j.token)"
  "Notion-Version" = "2022-06-28"
}
$dbId = "<database_id>"
$r = Invoke-RestMethod -Uri "https://api.notion.com/v1/databases/$dbId" -Headers $headers -Method GET
$r.properties.PSObject.Properties | ForEach-Object {
  $p = $_.Value
  Write-Output ("PROP: name='{0}' id='{1}' type='{2}'" -f $p.name, $p.id, $p.type)
}
```

El `id` que devuelve la API viene URL-encoded (e.g., `Gs%5DU`). Para usar en `create_view` se pasa **decoded** (e.g., `Gs]U`). Pero la mayoría de IDs son ascii-safe (e.g., `SxZr`, `qxhs`).

**Property IDs reales del inmobiliario (referencia):**

| Propiedad     | property_id |
|---------------|-------------|
| Name          | `title`     |
| Status        | `SxZr`      |
| Entregable    | `qxhs`      |
| Encargado     | `jYCu`      |
| Fecha Límite  | `Gs]U`      |
| Observación   | `fV]m`      |
| % Avance      | `nBJ{`      |

Cada DB nueva tendrá IDs distintos — siempre consultar.

## Sincronización con T.TRABAJO general — NO opcional

Cuando el proyecto formal vive en `PROYECTOS`, debe crearse **siempre** un padre operativo en la lista general `ACTIVIDADES` de T.TRABAJO (DB `2dcd8cc4-cfc1-806c-bda6-f9c4862a9cfd`) con las mismas actividades como sub-items. Esto NO es opcional — es lo que permite que el proyecto entre en los reportes diarios de actividades generales.

### Patrón de sincronización

1. Crear padre operativo:
   - `Actividad` (title): mismo nombre del proyecto (e.g., "AGENTE INMOBILIARIO GEN+")
   - `Empresa`: GEN+ (o la empresa correspondiente)
   - `Macro / Observación`: resumen breve + link al proyecto formal en PROYECTOS

2. Crear cada sub-item con:
   - `Actividad` (title): prefijo `G | ` + descripción (convención validada)
   - `Empresa`: GEN+
   - `Parent item` (relation): ID del padre operativo
   - `Status`: 100 si completado, **0 si pendiente** (NO null)
   - `Date`: fecha de commitment o realización
   - `Observación`: contexto breve

3. Reuniones también se cargan como sub-items en T.TRABAJO con prefijo `G | Reunión ...` y Status=100.

### Mantener sincronizado

Cuando se actualiza Status/% Avance/Terminado en la base inline del proyecto, **buscar y actualizar también** el sub-item correspondiente en T.TRABAJO general (match por nombre normalizado). Si el cambio nace en T.TRABAJO, replicarlo en el proyecto. Si no hay match claro, dejar observación con vínculo cruzado.

## PLAYBOOK validado — crear proyecto desde cero (mayo 2026)

Este es el flujo COMPLETO, paso por paso, que produce un proyecto Tingo-aligned sin trampas. Cada paso indica qué tool usar (easy-notion o REST) y qué evitar.

### Pre-flight (obligatorio)

1. **Determinar cuenta** — preguntar o inferir: `josefabrizioid` (Fabrizio / GEN+ / Tingo) vs `coordinador-aecode` (AECODE). Activar la skill de perfil correspondiente.
2. **Validar conexion** — `mcp__notion-easy__get_me`. Si responde otra cuenta, recargar MCP o usar REST fallback con el token del perfil correcto.
3. **PREGUNTAR PLANTILLA** — regla bloqueante. Pregunta sugerida: *"¿Uso la plantilla GEN+ (Tingo-based) para este proyecto?"*. No proceder sin respuesta explicita.
4. **Confirmar destino** — para GEN+ engineering/software: base `PROYECTOS` (`df0ec712-a340-4f5e-b5e8-e08b84712e08`). Si hay ambiguedad, preguntar.
5. **Definir Entregables** — adaptar al tipo de proyecto. Software: `Desarrollo / Documentación / Testing / Cierre`. Ingenieria: `Expediente Técnico / Memoria de Cálculo / Planos / ...`. Preguntar al usuario los entregables reales si no son obvios.

### Step 1 — Crear fila en PROYECTOS

Tool: `mcp__notion-easy__add_database_entry`

```json
{
  "database_id": "df0ec712-a340-4f5e-b5e8-e08b84712e08",
  "properties": {
    "Name": "<NOMBRE DEL PROYECTO>",
    "Empresa": "GEN+",
    "Fecha de Inicio": "YYYY-MM-DD",
    "Observación": "<resumen 1-2 frases — NO inventar Cliente ni datos no confirmados>"
  }
}
```

Capturar el `id` retornado → es el `project_page_id` para los siguientes pasos.

### Step 2 — Body de la pagina (markdown con sentinela)

Tool: `mcp__notion-easy__append_content` (parent_page_id = project_page_id)

Markdown template (adaptar contenido):

```markdown
### DESCRIPCIÓN

<un parrafo describiendo el proyecto>

### ACCESOS

::: columns
::: column
> [!TIP]
> 🔧 [<Tool principal>](url)
:::
::: column
> [!INFO]
> 📁 <Recurso 2>
:::
::: column
> [!INFO]
> 📊 <Recurso 3>
:::
::: column
> [!NOTE]
> 📖 <Documentacion>
:::
:::

### INFORMACIÓN

**CLIENTE:** <nombre real O "Por confirmar" — NUNCA inventar>

**TIPO:** <tipo del proyecto>

**ESTADO:** <% + estado actual>

**FECHA DE INICIO:** YYYY-MM-DD

+++ **STACK TÉCNICO**
- <bullets del stack>
+++

+++ **ARQUITECTURA**
<descripcion>
+++

+++ **COMANDOS / INTERFAZ**
<tabla o lista>
+++

+++ **INFRAESTRUCTURA**
<deployment info>
+++

---

### APRENDIZAJES Y CRITERIOS

Sección de conocimiento del proyecto — **distinta de ACTIVIDADES y REUNIONES**. Aquí viven ideas clave, criterios reutilizables y valor extraído. Cada criterio se documenta como callout independiente — la sección crece con el tiempo.

### MEMORIA OPERATIVA
```

⚠️ **El heading `### MEMORIA OPERATIVA` al final ES OBLIGATORIO.** Sirve de sentinela para que futuros `update_section` sobre APRENDIZAJES Y CRITERIOS no destruyan las bases inline que vienen debajo. Ver SKILL.md aprendizaje #9.

### Step 3 — Crear bases inline CON colores al crear

Tool: `mcp__notion-easy__create_database` (dos llamadas, parent_page_id = project_page_id, is_inline: true)

**ACTIVIDADES schema CON colores embebidos (path limpio — NO crear con strings, ver aprendizaje #4.b):**

```json
{
  "title": "ACTIVIDADES",
  "is_inline": true,
  "parent_page_id": "<project_page_id>",
  "schema": [
    {"name": "Name", "type": "title"},
    {"name": "Status", "type": "select", "options": [
      {"name": "POR HACER",   "color": "red"},
      {"name": "EN PROCESO",  "color": "yellow"},
      {"name": "COMPLETADO",  "color": "green"},
      {"name": "PENDIENTE",   "color": "blue"}
    ]},
    {"name": "Entregable", "type": "select", "options": [
      {"name": "<Entregable 1>", "color": "blue"},
      {"name": "<Entregable 2>", "color": "purple"},
      {"name": "<Entregable 3>", "color": "yellow"},
      {"name": "<Entregable 4>", "color": "green"}
    ]},
    {"name": "Encargado", "type": "multi_select", "options": [
      {"name": "Equipo GEN+", "color": "blue"},
      {"name": "Codex",       "color": "purple"},
      {"name": "Cliente",     "color": "orange"}
    ]},
    {"name": "Fecha Límite", "type": "date"},
    {"name": "Observación",  "type": "rich_text"},
    {"name": "% Avance",     "type": "number"}
  ]
}
```

**REUNIONES schema (sin select, no necesita colores):**

```json
{
  "title": "REUNIONES",
  "is_inline": true,
  "parent_page_id": "<project_page_id>",
  "schema": [
    {"name": "OBJETIVOS",     "type": "title"},
    {"name": "Date",          "type": "date"},
    {"name": "ACUERDOS",      "type": "rich_text"},
    {"name": "OBSERVACIONES", "type": "rich_text"}
  ]
}
```

Capturar los `id` retornados → `actividades_db_id` y `reuniones_db_id`.

### Step 4 — Cargar filas iniciales

Tool: `mcp__notion-easy__add_database_entry` (una llamada por fila, paralelizables)

Para ACTIVIDADES, para cada actividad:
- Completadas: `{"Status": "COMPLETADO", "% Avance": 100, "Date": "<fecha real>"}`
- Pendientes: `{"Status": "PENDIENTE", "% Avance": 0, "Fecha Límite": "<fecha commitment>"}` (NUNCA Status null ni % Avance null)

Para REUNIONES: una fila por reunion realizada con OBJETIVOS, Date, ACUERDOS, OBSERVACIONES.

### Step 5 — Obtener property IDs (via REST)

easy-notion `get_database` NO devuelve property IDs. Usar REST directo:

```powershell
$j = Get-Content "$env:USERPROFILE\.codex\credentials\notion\<perfil>_notion.json" -Raw | ConvertFrom-Json
$headers = @{ "Authorization" = "Bearer $($j.token)"; "Notion-Version" = "2026-03-11" }
$r = Invoke-RestMethod -Uri "https://api.notion.com/v1/databases/<actividades_db_id>" -Headers $headers
$dsId = $r.data_sources[0].id
$ds = Invoke-RestMethod -Uri "https://api.notion.com/v1/data_sources/$dsId" -Headers $headers
$ds.properties.PSObject.Properties | ForEach-Object { Write-Output ("{0}: id={1}" -f $_.Value.name, $_.Value.id) }
```

Capturar IDs: `status_id`, `entregable_id`. Pueden tener caracteres especiales (`%3A`, backticks, etc.) — usar URL-decoded en los configs de views.

### Step 6 — Crear las 3 vistas Tingo (agrupadas por Entregable)

Tool: `mcp__notion-easy__create_view` (3 llamadas, paralelizables)

**Vista Filtrada** (board, trabajo activo):
```json
{
  "database_id": "<actividades_db_id>",
  "name": "Vista Filtrada",
  "type": "board",
  "configuration": {
    "type": "board",
    "group_by": {"type": "select", "property_id": "<entregable_id>", "property_name": "Entregable", "sort": {"type": "manual"}, "hide_empty_groups": false}
  },
  "quick_filters": {
    "<status_id>": {"select": {"equals": ["EN PROCESO", "POR HACER", "PENDIENTE"]}}
  }
}
```

**Original** (board, vista completa):
```json
{
  "database_id": "<actividades_db_id>",
  "name": "Original",
  "type": "board",
  "configuration": {
    "type": "board",
    "group_by": {"type": "select", "property_id": "<entregable_id>", "property_name": "Entregable", "sort": {"type": "manual"}, "hide_empty_groups": false}
  }
}
```

**Status** (table, solo pendientes con subtasks):
```json
{
  "database_id": "<actividades_db_id>",
  "name": "Status",
  "type": "table",
  "configuration": {
    "type": "table",
    "group_by": {"type": "select", "property_id": "<entregable_id>", "property_name": "Entregable", "sort": {"type": "manual"}, "hide_empty_groups": true},
    "subtasks": {"filter_scope": "parents_and_subitems", "toggle_column_id": "title"}
  },
  "quick_filters": {
    "<status_id>": {"select": {"equals": "PENDIENTE"}}
  }
}
```

### Step 7 — Sincronizar con T.TRABAJO general

Tool: `mcp__notion-easy__add_database_entry` sobre `2dcd8cc4-cfc1-806c-bda6-f9c4862a9cfd`

**Padre operativo** (1 fila):
```json
{
  "Actividad": "<NOMBRE DEL PROYECTO>",
  "Empresa": "GEN+",
  "Macro / Observación": "<resumen + URL del proyecto formal en PROYECTOS>"
}
```

Capturar el `id` retornado → `padre_id`.

**Sub-items** (uno por cada actividad + reuniones):
```json
{
  "Actividad": "G | <descripcion>",
  "Empresa": "GEN+",
  "Date": "<fecha>",
  "Status": 100 (si completado) o 0 (si pendiente),
  "Parent item": "<padre_id>",
  "Observación": "<brief>"
}
```

Convencion validada: prefijo `G | ` para sub-items. Pendings con `Status: 0` + `Date` (NO null). Reuniones tambien van como sub-items con Status 100.

### Step 8 — (Opcional) Agregar criterios a APRENDIZAJES Y CRITERIOS

Para cada criterio nuevo:

**8a.** Crear el callout con solo el titulo via easy-notion:
```
mcp__notion-easy__update_section(heading="APRENDIZAJES Y CRITERIOS", markdown=...)
```
o `append_content` agregando un bloque `> [!IMPORTANT]\n> **N. Titulo**` antes del sentinela.

⚠️ Si usas `update_section`, **verificar primero que el sentinela `### MEMORIA OPERATIVA` exista** despues de APRENDIZAJES Y CRITERIOS. Sin sentinela, `update_section` borra las bases. Ver aprendizaje #9.

**8b.** Encontrar el block_id del callout via REST:
```powershell
$r = Invoke-RestMethod -Uri "https://api.notion.com/v1/blocks/<project_page_id>/children?page_size=100" -Headers $headers
$callout = $r.results | Where-Object { $_.type -eq 'callout' -and ($_.callout.rich_text | ForEach-Object { $_.plain_text } | Out-String) -match "<texto del titulo>" } | Select-Object -First 1
```

**8c.** Agregar children (bullets + promocion) via REST `PATCH /v1/blocks/{callout_id}/children`:
```json
{
  "children": [
    {"object": "block", "type": "bulleted_list_item", "bulleted_list_item": {"rich_text": [{"type": "text", "text": {"content": "Qué dice: "}, "annotations": {"bold": true}}, {"type": "text", "text": {"content": "..."}}]}},
    ... (4 bullets: Qué dice, Por qué importa, Cómo aplicarlo, Patrón validado aquí)
    {"object": "block", "type": "paragraph", "paragraph": {"rich_text": [{"type": "text", "text": {"content": "Promoción al kernel global: "}, "annotations": {"bold": true}}, ...]}}
  ]
}
```

### Step 9 — Reportar

Formato estandar:

```
Destino: <link del proyecto>
Ruta usada: easy-notion-mcp + REST API directa (perfil <alias>)
Cambios aplicados:
- <N> filas en PROYECTOS, ACTIVIDADES, REUNIONES, T.TRABAJO
- 3 vistas en ACTIVIDADES (por Entregable, colores reales)
- <M> criterios en APRENDIZAJES Y CRITERIOS
- Sentinela MEMORIA OPERATIVA insertada
Cambios omitidos (justificados):
- <DOCUMENTOS y/o CONTACTOS CLIENTE si no aplican>
- <Cliente "Por confirmar" si no se valido>
Limitaciones: <si las hubo>
Siguiente paso: <que falta o que sigue>
```

### Checklist final

- [ ] Fila en PROYECTOS creada con datos validados (sin invenciones)
- [ ] Body con DESCRIPCIÓN + ACCESOS (callouts en columnas) + INFORMACIÓN (toggles)
- [ ] Seccion APRENDIZAJES Y CRITERIOS creada (puede estar vacia)
- [ ] **Sentinela `### MEMORIA OPERATIVA` insertada** antes de las bases
- [ ] ACTIVIDADES inline con schema correcto + **colores pasados al crear** + filas cargadas
- [ ] REUNIONES inline con filas cargadas
- [ ] 3 vistas en ACTIVIDADES agrupadas por Entregable (con property_id correctos)
- [ ] Padre operativo + sub-items en T.TRABAJO sincronizados
- [ ] DOCUMENTOS y CONTACTOS CLIENTE solo si aplican
- [ ] Criterios iniciales agregados como callouts (titulo via easy-notion + children via REST)

---

## Flujo de creación validado (mayo 2026)

1. **Preguntar plantilla** — siempre. Sugerencia: "¿Uso la plantilla GEN+ (Tingo-based)?". Si el usuario dice no, crear solo lo mínimo. Si dice sí o no especifica, aplicar este protocolo.
2. **Confirmar BD raíz destino** — para GEN+ engineering/software, `PROYECTOS` (`df0ec712-...`). Si hay ambigüedad, preguntar.
3. **Crear fila en PROYECTOS** con `add_database_entry`. Properties mínimas: Name, Empresa, Fecha de Inicio, Observación (resumen 1-2 frases).
4. **`replace_content` o `append_content` del cuerpo** con la estructura body validada (H3 sections, ACCESOS columns, INFORMACIÓN con toggles, divisor).
5. **Crear ACTIVIDADES inline** con `create_database`, schema validado, `is_inline: true`, parent_page = página del proyecto. **Pasar opciones de select/multi_select en el schema** si easy-notion lo acepta; si no, dejarlas auto-populate al insertar filas.
6. **Crear REUNIONES inline** similar.
7. **(Opcional) DOCUMENTOS / CONTACTOS CLIENTE** — solo si hay material concreto. NO crear vacíos.
8. **Cargar filas iniciales** en ACTIVIDADES (las actividades completadas/pendientes conocidas) y REUNIONES (la reunión que motivó el proyecto, si aplica).
9. **Obtener property IDs** del nuevo ACTIVIDADES via Notion REST API.
10. **Crear las 3 vistas Tingo** en ACTIVIDADES con la config validada (ver sección "Vistas validadas").
11. **Crear padre operativo en T.TRABAJO** + **sub-items espejo** de las actividades (con `Parent item` relation, prefijo `G | `, Empresa, Date, Status numeric).
12. **Reportar** con el formato `Destino / Ruta usada / Cambios aplicados / Cambios omitidos / Limitaciones / Siguiente paso`.

## Limitaciones validadas de easy-notion-mcp

- `get_database` NO devuelve `property_id`. Para vistas: usar Notion REST API directa.
- `archive_page(database_id)` falla con 404 — la API trata DBs distinto. Para archivar DB: PATCH `/v1/databases/{id}` con `{"archived": true}` (puede fallar también si la DB fue auto-eliminada por replace_content).
- `replace_content` es **DOBLE DESTRUCTIVO**: borra todos los bloques del body **Y** elimina automáticamente las child_databases referenciadas en él (no quedan orphans). Si vas a hacer refactor del body de una página que ya tiene bases inline cargadas con filas, **resignate a recrear las bases y re-insertar las filas**. Es destructivo y requiere confirmación explícita del usuario.
- `create_view` con `configuration.group_by` exige `property_id` (no acepta solo `property_name`). Error típico: "Fix one: property_id should be defined". Workaround: obtener IDs via REST.
- `create_database` schema usa solo `name` + `type` en la firma documentada; **passing options inline funciona en la práctica** para select/multi_select/status (verificado con inmobiliario), pero no aparece en el JSON schema del tool. Si falla, dejar que las opciones auto-populen al insertar filas.
- Imágenes locales no se pueden subir; solo URL pública. Para placeholders de ACCESOS sin link aún, escribir "DRIVE — pendiente de link" como texto plano.
- Botones nativos de Notion son `unsupported` por API. Aproximación: callouts con link o texto enlazado en layout de columnas.

## Patrón de Entregable adaptado por tipo de proyecto

Las opciones de `Entregable` (select) se **adaptan al proyecto**, no se copian de Tingo.

| Tipo de proyecto                       | Entregables sugeridos                                              |
|----------------------------------------|--------------------------------------------------------------------|
| Ingeniería estructural / expediente    | Expediente Técnico, Memoria de Cálculo, Planos, Especificaciones Técnicas, Presupuesto, Cronograma, Modelo BIM |
| BIM observaciones (Cañete)             | CDE, PEB/TIP/LOD-LOI, Modelos BIM por especialidad, Modelo federado, Reporte de interferencias, Metrados BIM, Fichas C1/C2 |
| Agente IA / automatización (Inmobiliario) | Desarrollo del agente, Documentación, Testing y validación, Cierre |
| Marketing / contenido                  | Estrategia, Producción, Distribución, Métricas                     |
| Training / educación                   | Diseño curricular, Materiales, Sesiones, Evaluación, Certificación |

Magnus debe **inferir o preguntar** los entregables reales del proyecto antes de cargar actividades. No copiar entregables de Tingo si no aplican.
