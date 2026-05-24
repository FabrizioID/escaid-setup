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

### 3. Mapa de herramientas preferido

Con MCP remoto/oficial disponible:
- Buscar paginas/bases: `mcp__notion__.notion_search`.
- Leer pagina/base/data source: `mcp__notion__.notion_fetch`.
- Crear pagina o fila: `mcp__notion__.notion_create_pages`.
- Actualizar contenido/propiedades: `mcp__notion__.notion_update_page`.
- Crear/actualizar vistas: `mcp__notion__.notion_create_view`, `mcp__notion__.notion_update_view`.
- Consultar vista: `mcp__notion__.notion_query_database_view`.

Con easy-notion-mcp:
- Verificar conexion con `mcp__notion-easy__get_me`.
- Usar sus herramientas para crear/leer/actualizar paginas, bases, vistas, comentarios y usuarios cuando esten disponibles.
- Preferir escritura markdown para contenido largo y `dry_run` antes de cambios destructivos si la herramienta lo permite.
- No usar `replace_content`, `update_section`, `archive_page`, `delete_view`, `delete_database_entry` ni `move_page` sin confirmacion o preflight.

Con MCP local oficial `@notionhq/notion-mcp-server`:
- Esperar herramientas API-first con nombres tipo `search`, `retrieve-a-page`, `retrieve-a-database`, `retrieve-a-data-source`, `create-a-page`, `create-a-data-source`, `query-data-source`, `update-a-page` o equivalentes descubiertos por el cliente.
- Usar `data_source_id` cuando el servidor local use Notion API nueva.

Con API fallback:
- Identidad: `GET /v1/users/me`.
- Buscar: `POST /v1/search`.
- Leer pagina: `GET /v1/pages/{page_id}` y `GET /v1/blocks/{page_id}/children`.
- Leer database/schema: `GET /v1/databases/{database_id}`.
- API moderna: usar `Notion-Version: 2026-03-11` para `data_sources`, `views` y configuracion de vistas.
- Crear fila/pagina: `POST /v1/pages`.
- Crear base inline clasica: `POST /v1/databases` con `parent.page_id` e `is_inline: true` cuando aplique.
- Actualizar: `PATCH /v1/pages/{page_id}` o append de bloques con `PATCH /v1/blocks/{block_id}/children`.

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
6. Preguntar explicitamente si el proyecto usara plantilla, salvo que el usuario ya lo haya indicado con claridad.
   - Pregunta sugerida: `Quieres usar una plantilla para este proyecto?`
   - Si el usuario dice que si y no especifica cual, para GEN+ ingenieria sugerir `PUENTE TINGO` como plantilla de referencia disponible.
   - Si el usuario dice que no, crear solo la estructura minima necesaria segun el proyecto y no replicar bases/vistas de plantilla.
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
  - Vistas: `Vista Filtrada` board, `Status` table, `Original` board.
  - En los proyectos BIM/observaciones, ajustar agrupaciones segun instruccion del usuario; ejemplo validado: boards por `Status`, tabla `Status` agrupada por `Entregable`.
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

### Actualizar proyecto

Trigger ejemplo: `activa skill documentar notion: actualizar proyecto`

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

Despues de documentar, entregar al usuario un mensaje de grupo de WhatsApp con este molde:

```text
*REUNION [Nombre del proyecto] - [DD/MM/AAAA]*

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

Regla de titulo: siempre `*REUNION [Proyecto] - [DD/MM/AAAA]*`, con la palabra REUNION al inicio. Para Tingo usar `*REUNION PUENTE-TINGO - [DD/MM/AAAA]*`.

Reglas del formato WA:
- Texto plano, sin markdown de codigo, sin tablas.
- Negrita solo con asteriscos simples (*texto*).
- Cada punto es una linea con bullet `•`.
- Tono directo, sin saludos ni firmas.
- Maximo 20 lineas en total; si hay mas contenido, agrupar puntos similares.
- Separar `Observaciones` de `Acuerdos / Pendientes`.
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
