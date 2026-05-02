---
name: excel-user
description: Operaciones completas sobre archivos Excel (.xlsx). Úsalo cuando el usuario quiera crear, leer, editar, formatear o analizar hojas de cálculo. Combina el MCP de Excel con comportamiento de formato predefinido y preferencias del usuario. Aplica también cuando el usuario pida tablas de datos, resúmenes numéricos, cuadros de dovelas, métricas de proyecto o cualquier output tabular que deba vivir en un .xlsx.
tools:
  - Read
  - Write
  - Bash
  - PowerShell
  - mcp__excel__read_sheet
  - mcp__excel__write_sheet
  - mcp__excel__list_sheets
  - mcp__excel__create_workbook
  - mcp__excel__add_sheet
  - mcp__excel__delete_sheet
  - mcp__excel__get_sheet_info
  - mcp__excel__format_cells
  - mcp__excel__apply_formula
  - mcp__excel__get_workbook_info
---

# Excel User

Skill para operaciones Excel directas via MCP. Lee preferencias de formato en [references/formatting-defaults.md](references/formatting-defaults.md) y capacidades del MCP en [references/mcp-capabilities.md](references/mcp-capabilities.md).

---

## ROUTING — primer match gana

1. Usuario pide **crear** un archivo Excel desde cero → Modo CREATE
2. Usuario pide **leer o extraer** datos de un .xlsx existente → Modo READ
3. Usuario pide **modificar o agregar** datos a un .xlsx → Modo EDIT
4. Usuario pide **formatear, colorear o embellecer** una hoja → Modo FORMAT
5. Usuario pide **analizar, sumar, promediar o cruzar** datos → Modo ANALYZE
6. Usuario pide **todo** (crear + llenar + formatear) → Pipeline COMPLETO

---

## MODO CREATE

**Objetivo**: crear un .xlsx nuevo con estructura lista.

### Flujo
1. Confirmar ruta de destino con el usuario (o usar directorio de trabajo actual)
2. `create_workbook` → nuevo archivo vacío
3. Renombrar hoja por defecto si aplica (`delete_sheet` + `add_sheet`)
4. Llenar encabezados y datos con `write_sheet`
5. Aplicar formato por defecto → ver [references/formatting-defaults.md](references/formatting-defaults.md)
6. Confirmar al usuario ruta del archivo creado

### Reglas
- Siempre aplicar formato de encabezado (negrita + fondo azul claro) por defecto
- Nunca hardcodear totales — usar fórmulas Excel (`=SUM(...)`)
- Si los datos vienen de la conversación (capturas, tablas), transcribirlos fielmente sin redondear

---

## MODO READ

**Objetivo**: leer y presentar datos de un .xlsx existente en conversación.

### Flujo
1. `get_workbook_info` → listar hojas disponibles
2. `list_sheets` → confirmar hoja objetivo
3. `read_sheet` → leer rango de datos
4. Presentar en tabla markdown en la conversación
5. Señalar si hay fórmulas, filas vacías o inconsistencias

---

## MODO EDIT

**Objetivo**: modificar datos en un .xlsx existente sin romper estructura.

### Flujo
1. `get_workbook_info` → verificar hoja objetivo
2. `read_sheet` → leer estado actual antes de editar
3. Aplicar cambios con `write_sheet` (rango exacto)
4. Verificar resultado con `read_sheet` posterior
5. Reportar qué celdas fueron modificadas

### Regla de seguridad
- Si la ruta no existe → no inventar. Preguntar al usuario.
- Si el archivo está abierto en Excel → avisarlo antes de escribir (puede corromper)
- Preservar fórmulas existentes — no reemplazar con valores hardcodeados

---

## MODO FORMAT

**Objetivo**: aplicar formato visual a una hoja.

### Flujo
1. `read_sheet` → identificar estructura (encabezados, filas de datos, filas de total)
2. Aplicar formato según [references/formatting-defaults.md](references/formatting-defaults.md):
   - Encabezados: negrita + fondo
   - Filas de total: negrita + borde superior
   - Números: separador de miles, decimales según tipo
3. `format_cells` por rangos (encabezados primero, luego datos, luego totales)
4. Confirmar al usuario qué rangos fueron formateados

---

## MODO ANALYZE

**Objetivo**: calcular métricas y presentar resúmenes.

### Protocolo
1. Leer datos completos con `read_sheet`
2. Calcular en Python/Bash si la hoja es grande (>500 filas)
3. Para cálculos simples (suma, promedio, conteo): insertar fórmulas Excel directamente con `apply_formula`
4. Presentar resultado primero en conversación, luego ofrecer insertarlo en la hoja

### Tipos de análisis soportados
| Tipo | Herramienta preferida |
|---|---|
| Suma total / subtotales | `apply_formula` con `=SUM(...)` |
| Promedio ponderado | `apply_formula` con `=SUMPRODUCT(...)` |
| Tabla resumen | `write_sheet` en hoja nueva |
| Comparación entre columnas | `read_sheet` + cálculo Python |
| Totales por categoría | `apply_formula` con `=SUMIF(...)` |

---

## PIPELINE COMPLETO

Cuando el usuario pide crear + llenar + formatear en un solo paso:

```
[1] CREATE
    → Crear workbook en ruta objetivo
    → Crear hojas necesarias

[2] FILL
    → Transcribir datos fielmente desde conversación
    → Insertar fórmulas para totales y subtotales

[3] FORMAT
    → Aplicar formato por defecto (ver formatting-defaults.md)
    → Ajustar anchos de columna si el MCP lo permite

[4] CONFIRM
    → Reportar: ruta, hojas creadas, filas escritas, fórmulas insertadas
    → Mencionar si algo requiere ajuste manual en Excel
```

---

## REGLAS GLOBALES

1. **Nunca inventar datos**. Si el dato no fue dado → celda vacía o preguntar.
2. **Fórmulas sobre valores hardcodeados**. Los totales deben ser auditables.
3. **Confirmar ruta** antes de crear o sobreescribir un archivo.
4. **Idioma de encabezados**: español salvo que el usuario indique otro.
5. **Reportar limitaciones** del MCP honestamente — si algo no se puede (ej: gráficas) decirlo y ofrecer alternativa (Python script).
6. **Unidades**: incluir unidades en encabezados (kg, ton, m², etc.) cuando los datos las tienen.
