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

1. **Notion MCP primero**: si el entorno tiene Notion MCP oficial o easy-notion-mcp disponible y autenticado, usarlo como ruta principal.
2. **Notion API fallback**: si MCP no esta disponible o se requiere batch/control fino, usar API directa con `NOTION_API_KEY`.
3. **Plan manual**: si no hay permisos o integracion, generar un plan Markdown/JSON para copiar a Notion.

Antes de proponer codigo propio, verificar si el MCP/herramienta nativa resuelve el flujo.

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

### Versiones API utiles

- Usar Notion API `2022-06-28` para operaciones estables de paginas, bloques, bases y filas.
- Usar Notion API `2026-03-11` cuando se necesiten `views`, `data_sources` o configuracion fina de vistas.
- No mezclar endpoints sin validar: algunos parametros de bloques aceptados en `2022-06-28` pueden fallar en versiones nuevas.

## Activadores

### Crear proyecto

Trigger ejemplo: `activa skill documentar notion: crear proyecto`

Flujo:
1. Pedir nombre del proyecto.
2. Pedir base raiz/data source destino.
3. Pedir o identificar plantilla a replicar.
4. Validar permisos, destino y plantilla.
5. Leer la plantilla.
6. Crear pagina/proyecto en la base raiz.
7. Replicar estructura posible o aplicar template nativo si existe.
8. Insertar informacion util del contexto del agente.
9. Reportar creado, insertado, omitido y limitaciones.

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
- Bases visibles al final como inline reales:
  - `ACTIVIDADES`
  - `REUNIONES`
  - `DOCUMENTOS`
  - `CONTACTOS CLIENTE`
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

Importante: `PUENTE TINGO` es plantilla de estructura, no fuente de contenido. No copiar sus entregables, responsables, ubicacion ni categorias si no corresponden al proyecto nuevo.

### Actualizar proyecto

Trigger ejemplo: `activa skill documentar notion: actualizar proyecto`

Flujo:
1. Pedir proyecto/pagina destino.
2. Buscar coincidencias; si hay ambiguedad, pedir seleccion.
3. Leer estructura y contenido existente.
4. Comparar con informacion nueva disponible en el agente.
5. Clasificar cambios: nuevo, duplicado, campo vacio, extension, conflicto, reemplazo, destructivo.
6. Ejecutar solo cambios seguros.
7. Pedir confirmacion para reemplazos, eliminaciones o cambios estructurales.
8. Reportar resultado.

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

Este activador tiene dos pasos obligatorios antes de escribir en Notion:

**Paso 1 — Resumen WhatsApp (previo al upload)**

Antes de tocar Notion, generar un resumen en formato mensaje de grupo de WhatsApp con este molde:

```text
📋 *REUNION [Nombre del proyecto] — [DD/MM/AAAA]*

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

✅ [cierre si aplica, ej: "Todo lo demas aprobado y validado."]
```

Regla de titulo: siempre `*REUNION [Proyecto] — [DD/MM/AAAA]*`, con la palabra REUNION al inicio.

Reglas del formato WA:
- Texto plano, sin markdown de codigo, sin tablas.
- Negrita solo con asteriscos simples (*texto*).
- Cada punto es una linea con bullet •.
- Tono directo, sin saludos ni firmas.
- Maximo 20 lineas en total; si hay mas contenido, agrupar puntos similares.

Mostrar el mensaje al usuario y esperar confirmacion o edicion antes de continuar.

**Paso 2 — Upload a Notion REUNIONES**

Con el contenido aprobado, crear entrada en la base REUNIONES del proyecto usando:
- OBJETIVOS: titulo/objetivo de la reunion
- Date: fecha de la reunion (ISO)
- OBSERVACIONES: lista de observaciones detalladas
- ACUERDOS: lista de acuerdos y pendientes

Si el usuario edito el mensaje WA antes de confirmar, usar la version editada como fuente de verdad para el upload.

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
