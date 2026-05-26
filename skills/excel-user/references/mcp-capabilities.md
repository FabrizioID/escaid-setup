# Excel MCP - Capacidades y Uso

MCP principal: `@negokaz/excel-mcp-server` instalado como `excel` en settings/config local.

Puede aparecer con dos nomenclaturas:

- herramientas reales del MCP: `excel_describe_sheets`, `excel_read_sheet`, `excel_write_to_sheet`, `excel_create_table`, `excel_copy_sheet`, `excel_format_range`, `excel_screen_capture`;
- aliases/wrappers antiguos: `mcp__excel__read_sheet`, `mcp__excel__write_sheet`, `mcp__excel__list_sheets`, etc.

Usar la nomenclatura que este expuesta en la sesion.

## Herramientas Reales `@negokaz/excel-mcp-server`

| Herramienta | Que hace |
|---|---|
| `excel_describe_sheets` | Lista informacion de hojas del archivo |
| `excel_read_sheet` | Lee valores con paginacion; puede mostrar formulas y estilos |
| `excel_write_to_sheet` | Escribe valores o formulas en un rango |
| `excel_create_table` | Convierte un rango en tabla Excel |
| `excel_copy_sheet` | Copia una hoja existente |
| `excel_format_range` | Aplica estilos por matriz de celdas |
| `excel_screen_capture` | Captura visual de una hoja en Windows |

## Alias Local Antiguo

| Herramienta | Que hace |
|---|---|
| `get_workbook_info` | Metadata del archivo: hojas, propiedades |
| `create_workbook` | Crea un `.xlsx` vacio en la ruta indicada |
| `list_sheets` | Lista todas las hojas del workbook |
| `add_sheet` | Agrega una hoja nueva |
| `delete_sheet` | Elimina una hoja |
| `get_sheet_info` | Info de una hoja: dimensiones, rango usado |
| `read_sheet` | Lee datos de un rango |
| `write_sheet` | Escribe datos en un rango |
| `apply_formula` | Inserta una formula en una celda |
| `format_cells` | Aplica formato a un rango |

## Parametros `negokaz`

### `excel_read_sheet`

```json
{
  "fileAbsolutePath": "C:\\ruta\\archivo.xlsx",
  "sheetName": "Hoja1",
  "range": "A1:E30",
  "showFormula": false,
  "showStyle": false
}
```

### `excel_write_to_sheet`

```json
{
  "fileAbsolutePath": "C:\\ruta\\archivo.xlsx",
  "sheetName": "Hoja1",
  "newSheet": false,
  "range": "A1",
  "values": [
    ["Dovela", "Peso (kg)", "Peso (ton)"],
    ["DOVELA 07", 7975.85, "=B2/1000"]
  ]
}
```

### `excel_format_range`

```json
{
  "fileAbsolutePath": "C:\\ruta\\archivo.xlsx",
  "sheetName": "Hoja1",
  "range": "A1:C1",
  "styles": [
    [
      {"font":{"bold":true,"color":"000000"},"fill":{"color":"BDD7EE"}},
      {"font":{"bold":true,"color":"000000"},"fill":{"color":"BDD7EE"}},
      {"font":{"bold":true,"color":"000000"},"fill":{"color":"BDD7EE"}}
    ]
  ]
}
```

### `excel_create_table`

```json
{
  "fileAbsolutePath": "C:\\ruta\\archivo.xlsx",
  "sheetName": "RESUMEN",
  "range": "A1:E20",
  "tableName": "TablaResumen"
}
```

## Parametros Alias Local

### `read_sheet`

```json
{
  "workbook_path": "C:\\ruta\\archivo.xlsx",
  "sheet_name": "Hoja1",
  "range": "A1:E30"
}
```

### `write_sheet`

```json
{
  "workbook_path": "C:\\ruta\\archivo.xlsx",
  "sheet_name": "Hoja1",
  "range": "A1",
  "data": [
    ["Dovela", "Peso (kg)", "Peso (ton)"],
    ["DOVELA 07", 7975.85, 7.976]
  ]
}
```

### `apply_formula`

```json
{
  "workbook_path": "C:\\ruta\\archivo.xlsx",
  "sheet_name": "Hoja1",
  "cell": "C18",
  "formula": "=SUM(C2:C17)"
}
```

## Limitaciones Conocidas

| Limitacion | Alternativa |
|---|---|
| Graficas no siempre disponibles | Crear manualmente o usar `xlsxwriter`/Excel |
| Tablas dinamicas no garantizadas | Generar hoja resumen con formulas o pandas |
| Formato condicional depende del MCP | Usar openpyxl fallback si es necesario |
| Archivo abierto puede bloquear escritura | Pedir cerrar Excel o trabajar copia |
| `.xlsm` puede perder macros si se recrea | Preservar archivo original y editar copia |
| Lectura grande puede paginar | Usar `EXCEL_MCP_PAGING_CELLS_LIMIT` o pandas |

## Diagnostico Cuando Falla

1. Existe el archivo?
2. Esta abierto en Excel?
3. Existe la hoja con ese nombre exacto?
4. El rango esta bien escrito?
5. El archivo es `.xlsx` real y no HTML/CSV renombrado?
6. Hay permisos de escritura?
7. Hay formulas/estilos que requieren preservar macros?
