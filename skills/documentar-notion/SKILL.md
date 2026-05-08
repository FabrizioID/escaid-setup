---
name: documentar-notion
description: Documenta informacion en Notion desde el contexto del agente usando easy-notion-mcp como ruta principal (38 herramientas: create_database, duplicate_page, add_database_entries, etc.) y Notion API como fallback. Usar cuando el usuario quiera crear proyectos desde plantillas, actualizar proyectos existentes conservando estructura, anadir contenido directo a paginas/bases/secciones o insertar imagenes/texto/tablas/tareas sin romper Notion.
---

# Documentar Notion

Skill para llevar informacion trabajada con el agente hacia Notion de forma conservadora, trazable y reutilizable.

## Principio madre

Por defecto, la skill puede **anadir, completar y extender**.

Por defecto, la skill **no puede borrar, reemplazar, reestructurar, alterar vistas, modificar cronogramas/boards ni mover paginas/bases** sin confirmacion explicita del usuario.

## Rutas de integracion

1. **easy-notion-mcp primero**: si el entorno tiene easy-notion-mcp disponible y autenticado, usarlo como ruta principal. Provee 38 herramientas incluyendo `create_database`, `duplicate_page`, `add_database_entries`, `query_database`, `update_database_entry`. Verificar con `mcp__notion-easy__get_me`.
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

```
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

1. Crear una base de datos inline dentro de la pagina destino con `mcp__notion-easy__create_database`.
2. Definir propiedades utiles antes de cargar filas: titulo, orden, descripcion, estado, relevancia, responsable, audiencia, fecha, tags o recomendacion.
3. Cargar filas con `mcp__notion-easy__add_database_entries` (batch preferido) o `mcp__notion-easy__add_database_entry`.
4. Crear o ajustar una vista principal limpia con `mcp__notion-easy__create_view`.
5. Evitar vistas duplicadas: si se crea la base y luego una vista vinculada, dejar solo una representacion visible salvo que el usuario pida varias vistas.

Usar tabla estatica solo cuando el contenido sea puramente expositivo y no necesite gestion posterior.

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
- Si se crean bases o vistas, verificar despues con fetch que no quedaron duplicadas visibles.

## Referencia tecnica

Para limites de easy-notion-mcp, contratos internos, templates, blocks, imagenes y diffs, leer:

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
- easy-notion-mcp | API fallback | Plan manual

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
