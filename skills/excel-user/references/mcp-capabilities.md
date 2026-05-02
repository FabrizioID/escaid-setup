# Excel MCP — Capacidades y Uso

MCP: `@negokaz/excel-mcp-server` (instalado como `excel` en settings.json)
Prefijo de herramientas: `mcp__excel__`

---

## Herramientas disponibles

### Workbook
| Herramienta | Qué hace |
|---|---|
| `get_workbook_info` | Metadata del archivo: hojas, propiedades |
| `create_workbook` | Crea un .xlsx vacío en la ruta indicada |

### Hojas
| Herramienta | Qué hace |
|---|---|
| `list_sheets` | Lista todas las hojas del workbook |
| `add_sheet` | Agrega una hoja nueva |
| `delete_sheet` | Elimina una hoja |
| `get_sheet_info` | Info de una hoja: dimensiones, rango usado |

### Datos
| Herramienta | Qué hace |
|---|---|
| `read_sheet` | Lee datos de un rango (ej: `A1:E20`) |
| `write_sheet` | Escribe datos en un rango |
| `apply_formula` | Inserta una fórmula en una celda |

### Formato
| Herramienta | Qué hace |
|---|---|
| `format_cells` | Aplica formato a un rango (negrita, color, número) |

---

## Parámetros clave

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

### `format_cells`
```json
{
  "workbook_path": "C:\\ruta\\archivo.xlsx",
  "sheet_name": "Hoja1",
  "range": "A1:C1",
  "bold": true,
  "background_color": "BDD7EE",
  "font_color": "000000",
  "number_format": "#,##0.00"
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

### `create_workbook`
```json
{
  "workbook_path": "C:\\Users\\USUARIO\\Desktop\\dovelas.xlsx"
}
```

---

## Limitaciones conocidas

| Limitación | Alternativa |
|---|---|
| No puede crear gráficas | Indicar al usuario; crear manualmente en Excel |
| No puede aplicar formato condicional | Indicar al usuario |
| No puede hacer tablas dinámicas | Indicar al usuario |
| No puede abrir archivos ya abiertos en Excel | Pedir al usuario que cierre Excel primero |
| Ancho de columna automático no siempre disponible | Estimar por tipo de dato (ver formatting-defaults.md) |

---

## Flujo de diagnóstico cuando falla

1. ¿El archivo existe? → si no: `create_workbook` primero
2. ¿El archivo está abierto en Excel? → pedir cerrarlo
3. ¿La hoja existe? → `list_sheets` para verificar nombre exacto
4. ¿El rango es correcto? → `get_sheet_info` para ver dimensiones reales
5. ¿Error de permisos? → verificar ruta y permisos de escritura
