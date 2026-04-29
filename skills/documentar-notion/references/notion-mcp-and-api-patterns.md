# Notion MCP and API Patterns

## Regla de seleccion

Usar Notion MCP oficial como ruta principal cuando este disponible y autenticado.

Usar Notion API directa solo como fallback, para batch/control fino o cuando el MCP no cubra una operacion necesaria.

Si ninguna ruta esta disponible, generar un plan manual.

## Herramientas externas

- Notion MCP oficial remoto: `https://mcp.notion.com/mcp`
- API oficial de Notion: pages, blocks, databases/data sources, properties, file uploads.

La skill debe hablar al usuario con nombres humanos: pagina, proyecto, base raiz, plantilla. Internamente puede mapear a page, block, database, data source o template.

## Capacidades y limites relevantes

### Templates

Preferir template nativo de Notion/data source cuando exista. Si el usuario da una pagina modelo en lugar de template nativo, usar replica manual parcial.

No asumir que vistas, layouts, automatizaciones, formulas avanzadas o bases internas se pueden clonar con fidelidad total por API/MCP.

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

Leer schema antes de escribir.

No cambiar schema por defecto.

Completar propiedades vacias puede ser seguro si el valor es claro. Reemplazar propiedades existentes requiere confirmacion.

Para matrices editables, planes, ejes, listas de decision, agendas, tareas, sponsors, speakers o cualquier informacion que sera filtrada/ordenada, preferir crear una base de datos inline y cargar filas. No convertir ese tipo de contenido en una tabla estatica salvo que el usuario pida un documento cerrado.

Patron recomendado:
1. Crear la base con `notion_create_database` bajo la pagina destino.
2. Definir un title claro y propiedades gestionables: `Orden`, `Descripcion`, `Estado`, `Relevancia`, `Audiencia`, `Responsable`, `Fecha`, `Tags`, segun el caso.
3. Cargar filas con `notion_create_pages` sobre el data source creado.
4. Ajustar la vista principal con `notion_update_view` para ordenar y mostrar columnas clave.
5. Hacer `fetch` final de la pagina destino para detectar si quedaron dos representaciones visibles de la misma data.

Si se crea una base y ademas una vista vinculada, puede aparecer duplicada. Dejar una sola representacion visible salvo que el usuario pida vistas separadas.

### Vistas, boards y cronogramas

Proteger por defecto. No modificar vistas, boards, timeline, calendars, grouping o sorting sin instruccion explicita.

Si el usuario pide cambiar vista visual y MCP/API no lo soporta, reportar accion manual o proponer Playwright/UI automation solo con confirmacion.

### Imagenes y archivos

Rutas posibles:
1. URL publica -> image external.
2. Archivo local/generado -> upload si MCP/API lo permite.
3. Sin ruta valida -> placeholder/caption + referencia.

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
- `create_inline_database` si el parent esta confirmado y el contenido necesita gestion;
- `append_block`;
- `add_database_row`;
- `fill_empty_property`;
- `append_image`;
- `extend_section`.

Confirmacion:
- `replace_block`;
- `replace_property`;
- `modify_schema`;
- `move_page`;
- `reorder_blocks`;
- `change_date_or_status`;
- `replace_image`.
- `delete_duplicate_linked_view`;

Bloqueado por defecto:
- `delete_block`;
- `delete_page`;
- `delete_database`;
- `modify_view`;
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

```markdown
Cambios seguros que puedo aplicar:
- ...

Cambios que requieren confirmacion:
- ...

No ejecutare eliminaciones salvo que lo indiques literalmente.
```

## Resultado esperado

Siempre reportar:
- destino usado;
- ruta usada: MCP, API fallback o plan manual;
- cambios aplicados;
- cambios omitidos;
- cambios pendientes;
- limitaciones;
- link de Notion si existe.
