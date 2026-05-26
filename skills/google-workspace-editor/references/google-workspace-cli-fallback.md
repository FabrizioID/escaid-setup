# Google Workspace CLI Fallback

Referencia absorbida del CLI oficial `googleworkspace/cli`. No reemplaza el MCP local; sirve como fallback o fuente de recetas cuando el MCP no expone una operacion concreta.

## Decision

Ruta principal: Google Workspace MCP local.

Ruta secundaria: `gws` CLI oficial, solo si:

- el MCP no expone la operacion requerida;
- se necesita una operacion masiva/scriptable;
- se necesita inspeccionar schema de una API;
- el usuario aprueba instalar/autenticar CLI si no existe.

Estado local observado: `gws` no esta confirmado en PATH. No asumir disponibilidad.

## Reglas

- No instalar ni autenticar `gws` sin necesidad real.
- No imprimir tokens, client secrets ni config OAuth.
- Usar `--dry-run` cuando aplique antes de escrituras sensibles.
- Confirmar con el usuario antes de permisos, deletes, moves masivos o shares.
- Preferir salida JSON para procesamiento por agente.

## Comandos Base

```bash
gws auth login
gws auth doctor --check
gws <service> <resource> <method> --format json
gws schema <service>.<resource>.<method>
```

Servicios de interes:

- `gws drive`
- `gws docs`
- `gws sheets`

## Recetas Absorbidas

### Organizar Carpeta Drive

Uso: crear estructura de proyecto y mover archivos.

```bash
gws drive files create --json '{"name":"PROJECT","mimeType":"application/vnd.google-apps.folder"}'
gws drive files create --json '{"name":"01_inputs","mimeType":"application/vnd.google-apps.folder","parents":["PARENT_ID"]}'
gws drive files update --params '{"fileId":"FILE_ID","addParents":"FOLDER_ID","removeParents":"OLD_PARENT_ID"}'
```

Aplicar primero como plan si hay muchos archivos.

### Crear Doc Desde Template

Uso: propuestas, briefs, informes y documentos recurrentes.

```bash
gws drive files copy --params '{"fileId":"TEMPLATE_DOC_ID"}' --json '{"name":"Nuevo documento"}'
gws docs documents batchUpdate --params '{"documentId":"DOC_ID"}' --json '{"requests":[...]}'
```

En ESC-AI preferir el MCP `createFromTemplate` si esta disponible. Usar CLI solo como fallback.

### Backup Sheet Como CSV

Uso: respaldar un Sheet antes de cambios de schema o integraciones n8n.

```bash
gws drive files export --params '{"fileId":"SHEET_ID","mimeType":"text/csv"}' -o backup.csv
```

Si hay multiples tabs, preferir lectura por rangos/tabs y guardar snapshots separados.

### Reporte Desde Sheet

Uso: leer datos operativos y generar un Google Doc de reporte.

Flujo:

1. leer rango Sheets;
2. sintetizar contenido;
3. crear o copiar Doc template;
4. insertar contenido;
5. compartir solo si el usuario lo pide.

### Vigilar Cambios En Drive

Uso: futuro, si se requiere alerta automatica sobre archivos/carpetas.

Requiere setup de eventos/pubsub. No usar como camino rapido diario.

## Oportunidades ESC-AI

| Modo | Proposito |
|---|---|
| Drive folder auditor | Mapear carpetas, archivos, duplicados, permisos y entregables |
| Sheet schema auditor | Detectar cambios de columnas antes de romper n8n |
| Template factory | Crear Docs/Sheets desde templates con placeholders |
| Export pipeline | Exportar Docs/Sheets a PDF/DOCX/XLSX y archivar |
| Comments QA | Usar comentarios para revision sin tocar contenido |

## Cuando No Usar CLI

- Si el MCP ya puede hacer la operacion con menor friccion.
- Si el trabajo es una edicion quirurgica de Google Docs.
- Si requiere auth nueva y el usuario necesita velocidad inmediata.
- Si la accion puede exponerse a permisos o deletes masivos sin revision.
