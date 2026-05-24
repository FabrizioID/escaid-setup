# Excel - Potenciacion Vertical ESC-AI

Fecha: 2026-05-24

Objetivo: convertir Excel en una ruta operativa rapida para crear, leer, editar, formatear y analizar `.xlsx` sin pisar Google Sheets ni Word/APA. La prioridad es velocidad con trazabilidad: formulas auditables, lectura antes de escritura, rangos masivos y QA minimo.

## Estado Actual

Skill principal:

- `excel-user`

Skill companera:

- `excel-table-builder` para llevar Excel/Sheets a tablas Word/APA.

Rutas relacionadas:

| Ruta | Uso |
|---|---|
| `excel-user` | Workbook local `.xlsx`/`.xlsm` |
| `google-workspace-editor` | Google Sheets/Drive |
| `excel-table-builder` | Preparar tabla para Word/tesis/APA |
| `docx-mcp-document-editor` | Insertar/editar tablas en Word |

## Candidato Principal

`negokaz/excel-mcp-server`: https://github.com/negokaz/excel-mcp-server

Ventajas observadas:

- lectura/escritura de valores;
- escritura de formulas;
- formatos;
- crear tablas;
- copiar hojas;
- soporte xlsx/xlsm/xltx/xltm;
- captura visual en Windows;
- config con `EXCEL_MCP_PAGING_CELLS_LIMIT`.

Decision: mantener como ruta principal y actualizar la skill para reconocer los tools reales `excel_*`.

## Candidato Fallback

`mort-lab/excel-mcp`: https://github.com/mort-lab/excel-mcp

Ventajas observadas:

- Python puro con `openpyxl`;
- no requiere Microsoft Excel;
- Pydantic validation;
- herramientas para workbook, sheet, cell, range, formulas y formato.

Decision: no reemplazar la ruta actual. Usar como referencia/fallback opcional si se necesita una ruta Python local sin Excel.

## Brechas Cerradas

- Nomenclatura real de herramientas `excel_*` documentada.
- Fallback local con `openpyxl`, `pandas`, `xlsxwriter` y LibreOffice definido.
- Modo `Formula Guard` para no hardcodear resultados.
- Modo `Data QA` para migraciones y analisis.
- Separacion clara con Google Sheets y Word/APA.
- Ruta `.xlsm` con cuidado de macros.

## Decision Operativa

Excel queda como vertical funcional, con esta prioridad:

1. MCP Excel activo para operaciones directas.
2. Fallback local si no hay MCP y el archivo es simple.
3. Google Workspace si el origen/destino vive en Sheets.
4. Word/APA solo mediante `excel-table-builder`.

No instalar nuevos MCP salvo que falle la ruta principal o aparezca una necesidad concreta: pivots, charts, comentarios, macros o automatizacion live avanzada.
