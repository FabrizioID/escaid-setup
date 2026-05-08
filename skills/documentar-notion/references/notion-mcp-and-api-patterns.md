# Notion MCP and API Patterns

## Regla de seleccion

Usar **easy-notion-mcp** como ruta principal cuando este disponible y autenticado. Tiene 38 herramientas con capacidades superiores al MCP oficial.

Usar Notion API directa solo como fallback, para batch/control fino o cuando el MCP no cubra una operacion necesaria.

Si ninguna ruta esta disponible, generar un plan manual.

## Herramientas externas

### easy-notion-mcp (ruta principal)

- Paquete: `easy-notion-mcp` (npm global)
- Instalacion: `npm install -g easy-notion-mcp`
- Activacion en Claude Code: `claude mcp add notion-easy --env NOTION_TOKEN=<token> -- easy-notion-mcp`
- Variable requerida: `NOTION_TOKEN` (NO `NOTION_API_KEY`)
- Herramienta de verificacion: `mcp__notion-easy__get_me`

**38 herramientas disponibles:**

Lectura:
- `get_me` — verificar conexion y usuario
- `list_pages` — listar paginas accesibles
- `list_databases` — listar bases de datos
- `read_page` — leer pagina completa
- `read_block` — leer bloque especifico
- `read_section` — leer seccion
- `read_toggle` — leer toggle block
- `search` — buscar en workspace
- `get_database` — obtener schema de una base
- `query_database` — consultar filas con filtros
- `list_users` — listar usuarios
- `list_views` — listar vistas de una base
- `get_view` — obtener vista especifica
- `list_comments` — listar comentarios de una pagina
- `get_comments_by_author` — comentarios por autor

Escritura:
- `create_page` — crear pagina nueva
- `create_database` — crear base de datos inline o independiente
- `add_database_entry` — agregar una fila
- `add_database_entries` — agregar multiples filas (batch)
- `update_page` — actualizar propiedades de pagina
- `update_database_entry` — actualizar fila en base de datos
- `delete_database_entry` — eliminar fila
- `append_content` — agregar contenido al final de una pagina
- `update_block` — actualizar un bloque existente
- `update_section` — actualizar seccion
- `update_toggle` — actualizar toggle
- `replace_content` — reemplazar contenido
- `find_replace` — buscar y reemplazar texto
- `add_comment` — agregar comentario
- `duplicate_page` — duplicar pagina existente
- `archive_page` — archivar pagina
- `restore_page` — restaurar pagina archivada
- `move_page` — mover pagina
- `share_page` — compartir pagina

Vistas:
- `create_view` — crear nueva vista de base de datos
- `update_view` — modificar vista existente
- `delete_view` — eliminar vista
- `update_data_source` — actualizar data source de una vista

### Notion API oficial (fallback)
- API oficial de Notion: pages, blocks, databases/data sources, properties, file uploads.

La skill debe hablar al usuario con nombres humanos: pagina, proyecto, base raiz, plantilla. Internamente puede mapear a page, block, database, data source o template.

## Capacidades y limites relevantes

### Templates

Preferir template nativo de Notion/data source cuando exista. Si el usuario da una pagina modelo en lugar de template nativo, usar replica manual parcial.

No asumir que vistas, layouts, automatizaciones, formulas avanzadas o bases internas se pueden clonar con fidelidad total por API/MCP.

`duplicate_page` puede copiar la estructura superficial de una pagina pero no garantiza clonar bases de datos internas con sus vistas y propiedades completas. Verificar resultado con `read_page` post-duplicacion.

### Blocks

Operaciones seguras:
- leer bloques;
- anadir children;
- crear bloques soportados;
- registrar bloques unsupported.

Reglas:
- Batchear append si hay muchos bloques.
- No forzar nesting profundo en una sola llamada.
- Si aparece `unsupported`, registrar limitacion.

### Databases / data sources

Leer schema antes de escribir. No cambiar schema por defecto.

Completar propiedades vacias puede ser seguro si el valor es claro. Reemplazar propiedades existentes requiere confirmacion.

Para matrices editables, planes, ejes, listas de decision, agendas, tareas, sponsors, speakers o cualquier informacion que sera filtrada/ordenada, preferir crear una base de datos inline y cargar filas. No convertir ese tipo de contenido en una tabla estatica salvo que el usuario pida un documento cerrado.

Patron recomendado con easy-notion-mcp:
1. Crear la base con `mcp__notion-easy__create_database` bajo la pagina destino.
2. Definir un title claro y propiedades gestionables: `Orden`, `Descripcion`, `Estado`, `Relevancia`, `Audiencia`, `Responsable`, `Fecha`, `Tags`, segun el caso.
3. Cargar filas con `mcp__notion-easy__add_database_entries` (batch preferido) o `mcp__notion-easy__add_database_entry`.
4. Ajustar la vista principal con `mcp__notion-easy__create_view` o `mcp__notion-easy__update_view`.
5. Hacer `mcp__notion-easy__read_page` final para detectar si quedaron dos representaciones visibles de la misma data.

Si se crea una base y ademas una vista vinculada, puede aparecer duplicada. Dejar una sola representacion visible salvo que el usuario pida vistas separadas.

Limitacion conocida: Los titulos de bases de datos inline no se pueden ocultar via API/MCP. Si el H3 heading encima y el titulo de la base generan duplicidad visual, la solucion es archivar el H3 con `mcp__notion-easy__update_block` pasando `archived: true`.

### Vistas, boards y cronogramas

Proteger por defecto. No modificar vistas, boards, timeline, calendars, grouping o sorting sin instruccion explicita.

Si el usuario pide cambiar vista visual y MCP/API no lo soporta, reportar accion manual.

### Imagenes y archivos

Rutas posibles:
1. URL publica: image external (funciona via API y MCP).
2. Archivo local/generado: NO soportado. No se puede subir imagenes locales ni pegar desde clipboard via API.
3. Sin ruta valida: placeholder/caption + referencia.

Nunca decir que una imagen fue insertada si solo se agrego un link o placeholder.

## Contratos internos

### ContextPackage

```json
{
  "source": "conversation | file | image | generated_artifact | mixed",
  "title": "string",
  "summary": "string",
  "sections": [],
  "tables": [],
  "tasks": [],
  "decisions": [],
  "images": [],
  "links": [],
  "raw_notes": [],
  "confidence": "high | medium | low"
}
```

### NotionTarget

```json
{
  "target_type": "page | database | data_source | block | section",
  "target_id": "string",
  "target_name": "string",
  "parent_id": "string",
  "path_hint": "string",
  "ambiguous_matches": [],
  "write_permission": true
}
```

Si hay `ambiguous_matches`, no escribir hasta que el usuario seleccione.

### TemplateProfile

```json
{
  "template_type": "notion_template | model_page | unknown",
  "template_id": "string",
  "properties_schema": {},
  "block_outline": [],
  "internal_databases": [],
  "views_detected": [],
  "unsupported_blocks": [],
  "replication_mode": "native_template | manual_partial | not_supported"
}
```

### ExistingContentMap

```json
{
  "page_id": "string",
  "properties": {},
  "sections": [],
  "block_hashes": [],
  "database_rows": [],
  "images": [],
  "last_edited_time": "datetime"
}
```

### ChangePlan

```json
{
  "safe_changes": [],
  "needs_confirmation": [],
  "blocked_changes": [],
  "warnings": [],
  "notion_limitations": []
}
```

### WriteResult

```json
{
  "created": [],
  "updated": [],
  "skipped": [],
  "requires_manual_action": [],
  "errors": [],
  "notion_url": "string"
}
```

## Clasificacion de cambios

Seguro:
- `create_page` si destino y plantilla estan confirmados;
- `create_database` si el parent esta confirmado y el contenido necesita gestion;
- `append_content` / `append_block`;
- `add_database_entry` / `add_database_entries`;
- `fill_empty_property`;
- `append_image` (solo URL publica);
- `extend_section`.

Confirmacion:
- `replace_content` / `replace_block`;
- `update_database_entry` si sobreescribe valor existente no vacio;
- `modify_schema`;
- `move_page`;
- `reorder_blocks`;
- `change_date_or_status`;
- `replace_image`;
- `delete_view` (solo vistas duplicadas).

Bloqueado por defecto:
- `delete_block`;
- `archive_page` / `delete_database_entry` masivo sin lista confirmada;
- `modify_view` de vistas operativas;
- `break_template`.

## Diff conservador

Heuristicas utiles:
- comparar titulos normalizados;
- comparar hashes textuales simples;
- buscar headings similares;
- revisar propiedades vacias antes de escribir;
- detectar filas con mismo nombre/fecha/estado;
- detectar bases o vistas duplicadas sobre el mismo data source;
- marcar conflictos si hay dos versiones no equivalentes.

Si no hay confianza suficiente, pedir confirmacion.

## Confirmacion recomendada

```
Cambios seguros que puedo aplicar:
- ...

Cambios que requieren confirmacion:
- ...

No ejecutare eliminaciones salvo que lo indiques literalmente.
```

## Resultado esperado

Siempre reportar:
- destino usado;
- ruta usada: easy-notion-mcp, API fallback o plan manual;
- cambios aplicados;
- cambios omitidos;
- cambios pendientes;
- limitaciones;
- link de Notion si existe.
