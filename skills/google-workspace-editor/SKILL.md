---
name: google-workspace-editor
description: Editor base para Google Workspace vía MCP. Cubre Google Docs, Sheets y Drive. Usar cuando una skill de dominio necesita leer o modificar un documento Google Docs, leer o escribir en un Google Sheet, o gestionar archivos en Drive. Si el task también requiere lógica de negocio (cotizaciones, tesis, etc.), usar primero la skill de dominio correspondiente y luego esta para aplicar el resultado.
---

# Google Workspace Editor

Skill de edición base para Google Docs, Sheets y Drive a través del Google Workspace MCP.

Esta es una skill transversal de edición, no de dominio. No construye lógica de cotización, investigación académica, ni estrategia de contenido. Para eso, usar la skill de dominio primero.

**Dependencia de acceso**: requiere el Google Workspace MCP activo. Si no está disponible o no está autenticado, activar `google-workspace-credentials` antes de continuar.

## Routing por tipo de documento

| Tipo de archivo | Skill a usar |
|---|---|
| Google Docs | Esta skill |
| Google Sheets | Esta skill |
| Google Drive (mover, copiar, buscar) | Esta skill |
| Word .docx local | `docx-mcp-document-editor` |

## Skills de dominio que delegan aquí

- `google-docs-quotation-editor` → cotizaciones y propuestas en Google Docs
- `technical-quotation-builder` → construye la lógica, luego esta skill aplica en Docs
- Cualquier skill que necesite escribir en un Google Doc o leer un Sheet

---

## Quick Start

1. Confirmar el URL o `documentId` / `spreadsheetId`.
2. Leer la estructura actual antes de editar.
3. Identificar si el contenido objetivo es texto editable, celda de tabla, imagen, dibujo, encabezado/pie de página, u objeto embebido.
4. Aplicar el cambio más pequeño posible.
5. Releer la sección afectada y verificar semántica y visual.

---

## Google Docs — Operaciones disponibles

- Leer documento (texto, JSON, markdown)
- Insertar, reemplazar o eliminar texto por rango
- Reemplazar rango con markdown
- Aplicar estilos de texto y párrafo
- Insertar tablas o tablas con datos
- Fusionar celdas de tabla
- Color de fondo de celda
- Insertar saltos de página e imágenes
- Comentarios: listar, agregar, responder, resolver
- Buscar y reemplazar texto

## Google Sheets — Operaciones disponibles

- Leer rangos (A1 notation)
- Escribir rangos
- Agregar filas
- Formatear celdas
- Crear/eliminar hojas
- Gráficos, validaciones, formato condicional
- Autoajuste de columnas, freeze rows/cols

## Drive — Operaciones disponibles

- Listar archivos y carpetas
- Buscar por nombre, tipo, fecha
- Crear carpetas
- Mover, copiar, renombrar, eliminar archivos
- Obtener info de archivo o carpeta

---

## Reglas de edición

- Preservar el template existente antes de mejorar el contenido.
- Preferir cambios quirúrgicos sobre reemplazos amplios.
- Tratar documentos importados o convertidos como frágiles.
- No asumir que el texto visible es texto editable del documento.
- Reusar patrones de tabla existentes cuando ya funcionan visualmente.
- No cambiar estructura de tabla hasta confirmar índices, filas y celdas.
- Mantener cambios de formato acotados: solo párrafos, filas, celdas o rangos afectados.
- Usar negrita con moderación: solo títulos de sección, encabezados de tabla, etiquetas clave. No bold en celdas completas salvo que el template ya lo haga.
- No exponer secrets, tokens, client IDs ni client secrets en el documento o respuesta.

## QA Checklist

- ¿La sección editada mantiene la jerarquía visual del documento?
- ¿Encabezados, bullets, filas de tabla y bloques de contacto siguen alineados?
- ¿Quedó texto antiguo que contradice el contenido nuevo?
- ¿Las filas de tabla siguen representando la unidad correcta de significado?
- ¿El formato se aplicó solo al rango objetivo?
- ¿La negrita quedó limitada a títulos, encabezados o palabras clave?
- ¿Gráficos, dibujos o encabezados embebidos permanecieron intactos salvo que fueran el objetivo?

## Referencias

- `references/editing-rules.md` → reglas para documentos frágiles
- `references/mcp-capabilities.md` → capacidades del Google Workspace MCP
- `references/table-editing.md` → edición, reconstrucción, fusión y estilos de tabla
