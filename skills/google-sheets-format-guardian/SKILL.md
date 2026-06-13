---
name: google-sheets-format-guardian
description: Use when formatting Google Sheets via the Google Workspace MCP — styling headers, color-coding columns, freezing rows, setting column widths, alignment, number formats, or making a new tab match an existing one's look. Pair with google-workspace-editor for read/write of values. Especially useful for agenda/control sheets, dashboards, or any sheet where a clean, consistent, on-brand layout matters.
---

# Google Sheets Format Guardian

Skill de FORMATO para Google Sheets vía Google Workspace MCP. No escribe lógica de negocio ni valores — eso lo hace `google-workspace-editor`. Esta skill se ocupa solo de que la hoja se vea limpia, consistente y on-brand.

Análoga a `google-docs-format-guardian` (que es para Docs). Para .xlsx local usar `excel-user`.

**Dependencia:** requiere el Google Workspace MCP activo y autenticado. Si no, activar `google-workspace-credentials`.

---

## Regla de oro: REPLICAR con `copyFormatting`, no reconstruir a mano
Si ya existe una hoja bien formateada (otra pestaña del mismo libro), **NO la imites celda por celda con `formatCells`** — eso nunca queda igual (formatCells no hace bordes, ni tipografía, ni wrap, ni alineación vertical). En su lugar:

**`copyFormatting` copia el formato EXACTO (bordes, fuente, colores, número-formato, wrap, alineación) de un rango modelo a tu rango destino.** Es la herramienta correcta para "que se vea tal cual".

Flujo de match exacto (validado en agenda Summit):
1. Identifica una hoja modelo con el formato deseado (ej. `Agenda congreso | Sábado`).
2. Escribe primero los VALORES en la hoja nueva (header + filas).
3. `copyFormatting` cabecera: source `Modelo!A1:O1` → dest `Nueva!A1:O1`.
4. `copyFormatting` cuerpo: source `Modelo!A2:O10` (filas con la grilla) → dest `Nueva!A2:O10` (mismas dimensiones).
5. `freezeRowsAndColumns frozenRows:1` + `setColumnWidths` (copyFormatting NO copia anchos de columna ni freeze — esos van aparte).
6. `readCellFormat` de verificación: confirmar que aparezcan `borders`, `fontFamily`, `wrapStrategy`, `verticalAlignment`.

Si NO hay hoja modelo, recién ahí construye con `formatCells` (asumiendo sus límites, ver abajo).

---

## Capacidades disponibles (tools MCP)
| Tool | Hace |
|---|---|
| `readCellFormat` | Lee el formato real de un rango (bold, colores, fuente, alineación, bordes, numberFormat). Úsalo SIEMPRE antes de replicar. |
| `formatCells` | Aplica a un rango: **bold, italic, fontSize, foregroundColor, backgroundColor, horizontalAlignment, numberFormat**. Rango puede ser `1:1` (fila), `A:A` (columna) o `A1:D1`. |
| `freezeRowsAndColumns` | Congela filas/columnas (header: `frozenRows: 1`). |
| `setColumnWidths` | Ancho en px por columna o rango (`A`, `B:D`). |
| `autoResizeColumns` | Auto-ajusta al contenido (ojo: columnas con texto largo quedan enormes — preferir anchos manuales). |
| `addConditionalFormatting` | Formato condicional por regla. |
| `formatCells` numberFormat | Fechas (`DATE` `dd/mm/yyyy`), horas (`TIME` `h:mm AM/PM`), número, texto. |

## ⚠️ Límites de `formatCells` → por eso se prefiere `copyFormatting`
`formatCells` solo soporta: bold, italic, fontSize, foregroundColor, backgroundColor, horizontalAlignment, numberFormat. **NO** soporta **fontFamily**, **bordes**, **verticalAlignment** ni **wrapStrategy**.

→ Por eso `formatCells` NUNCA logra un match exacto si el modelo tiene bordes/tipografía/wrap. Para eso usar **`copyFormatting`** (sí trae todo eso). `formatCells` queda para retoques puntuales cuando NO hay hoja modelo, o para cambiar un solo atributo (ej. pintar una celda de estado).

**No existe** una tool de bordes standalone en el MCP — los bordes solo se logran vía `copyFormatting` desde un rango que ya los tenga.

---

## Receta: estilo de la casa AECODE (agenda Summit)
Cabecera con grupos de color por bloque de columnas, todo **bold, fontSize 9, horizontalAlignment CENTER**:
| Columnas | Background | Texto |
|---|---|---|
| Datos base (Fecha, Bloque, Horas, Duración, Actividad, Formato) | `#0F766E` (teal) | `#FFFFFF` |
| Ponentes sugeridos | `#C9DAF8` (celeste) | `#000000` |
| Confirmados / País / Empresa | `#4472C4` (azul) | `#FFFFFF` |
| Status / Encargados / Descripción / Título | `#8E7CC3` (morado) | `#FFFFFF` |

Cuerpo: `fontSize 9`, `CENTER` (Descripción/Título a `LEFT`), `frozenRows: 1`.
Anchos sugeridos (px): Fecha 85, Bloque 160, Horas 80/80, Duración 75, Actividad 210, Formato 115, Ponentes 210, Confirmados 130, País 70, Empresa 140, Status 140, Encargados 100, Descripción 300, Título 150.

---

## Workflow estándar
1. Confirmar `spreadsheetId` y nombre exacto de la(s) hoja(s). Nombres con espacios/`|`/`()` → entre comillas simples en A1 (`'Hoja X'!A1:O1`).
2. `readCellFormat` de la hoja modelo (si existe).
3. Aplicar formato por grupos con `formatCells` (varias llamadas, una por grupo de color/rango — se pueden lanzar en paralelo si apuntan a rangos distintos).
4. `freezeRowsAndColumns` para el header.
5. `setColumnWidths` (preferir manual sobre autoResize para columnas de texto largo).
6. `readCellFormat` de verificación.

## QA Checklist
- [ ] Cabecera con el/los color(es) correctos por grupo de columnas, bold, tamaño y alineación.
- [ ] Fila 1 congelada.
- [ ] Anchos legibles (Descripción no aplastada, columnas cortas no enormes).
- [ ] Cuerpo con tamaño/alineación consistentes con el modelo.
- [ ] Si el modelo tenía bordes/fontFamily/wrap → avisar que NO se replican vía MCP (límite de la tool).
- [ ] No se tocaron hojas/valores que no eran el objetivo (Sheet Schema Guard: no romper automatizaciones que leen esas columnas).

## Notas de seguridad
- No alterar nombres de columnas ni estructura que alimente n8n/Apps Script/dashboards sin avisar.
- Formato es no destructivo, pero `setColumnWidths width:0` oculta columnas — no usar salvo intención explícita.
