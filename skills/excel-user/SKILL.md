---
name: excel-user
description: Operaciones completas sobre archivos Excel (.xlsx/.xlsm). Usar cuando el usuario quiera crear, leer, editar, formatear o analizar hojas de calculo locales. Combina MCP Excel, fallback local openpyxl/pandas y preferencias de formato del usuario. Para Google Sheets usar google-workspace-editor; para tablas Word/APA complementar con excel-table-builder.
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

Skill para operaciones Excel directas. Lee:

- `references/formatting-defaults.md`
- `references/mcp-capabilities.md`
- `references/excel-mcp-candidates.md`
- `references/excel-operational-patterns.md`

Regla de no solape: `excel-user` manda para crear, leer, editar, formatear o analizar archivos `.xlsx`/`.xlsm` locales. Si el origen o destino vive en Google Sheets/Drive, usar `google-workspace-editor`. Si los datos deben terminar como tabla en Word/tesis/APA, usar `excel-table-builder` despues de preparar o validar el workbook.

## Arranque Rapido

| Capa | Ruta | Funcion |
|---|---|---|
| Dominio | `excel-user` | Crear, leer, editar, formatear o analizar `.xlsx`/`.xlsm` |
| Apertura MCP | Excel MCP (`mcp__excel__*` o tools reales `excel_*`) | Operar libros y hojas sin inventar scripts |
| Fallback local | `openpyxl`, `pandas`, `xlsxwriter`, LibreOffice | Usar solo si el MCP no esta disponible |

1. Confirmar archivo/ruta o crear destino en el workspace actual.
2. Probar lectura no destructiva: workbook info, hojas o rango pequeno.
3. Si el MCP Excel no aparece, avisar una vez y usar fallback local si la tarea lo permite.
4. Antes de escribir, leer rango/hoja afectada.
5. Despues de escribir, volver a leer o validar el archivo.

Herramientas esperadas segun MCP:

- `@negokaz/excel-mcp-server`: `excel_describe_sheets`, `excel_read_sheet`, `excel_write_to_sheet`, `excel_create_table`, `excel_copy_sheet`, `excel_format_range`, `excel_screen_capture`.
- wrapper/alias local antiguo: `mcp__excel__get_workbook_info`, `mcp__excel__list_sheets`, `mcp__excel__read_sheet`, `mcp__excel__write_sheet`, `mcp__excel__format_cells`, `mcp__excel__apply_formula`.

Si hay dos nomenclaturas, usar la que este expuesta en la sesion. No cambiar de skill: ambas son la ruta Excel.

## Routing

Primer match gana:

1. Crear archivo Excel desde cero -> Modo CREATE.
2. Leer o extraer datos de un `.xlsx`/`.xlsm` existente -> Modo READ.
3. Modificar o agregar datos -> Modo EDIT.
4. Formatear, colorear o embellecer -> Modo FORMAT.
5. Analizar, sumar, promediar, cruzar o limpiar datos -> Modo ANALYZE.
6. Crear + llenar + formatear -> Pipeline COMPLETO.
7. Convertir Excel/Sheets a tabla Word/APA -> usar tambien `excel-table-builder`.

## Modo CREATE

Objetivo: crear un `.xlsx` nuevo con estructura lista.

Flujo:

1. Confirmar ruta de destino o usar directorio de trabajo actual.
2. Crear workbook.
3. Crear/renombrar hojas necesarias.
4. Llenar encabezados y datos con escritura por rango.
5. Insertar formulas auditables.
6. Aplicar formato por defecto.
7. Validar lectura final.

Reglas:

- Siempre aplicar formato de encabezado.
- Nunca hardcodear totales si pueden ser formulas.
- Si los datos vienen de capturas/tablas, transcribir fielmente sin redondear.
- Si el workbook sera reutilizable, crear `CONFIG` para parametros y `CHECKS` para controles.

## Modo READ

Objetivo: leer y presentar datos de un workbook existente.

Flujo:

1. Listar hojas y dimensiones.
2. Leer rango objetivo con paginacion si el archivo es grande.
3. Si se necesita, leer formulas con `showFormula` o alternativa.
4. Presentar resumen o tabla markdown solo si el tamano lo permite.
5. Senalar formulas, filas vacias, valores raros, encabezados duplicados o inconsistencias.

## Modo EDIT

Objetivo: modificar datos sin romper estructura.

Flujo:

1. Verificar que el archivo existe.
2. Crear copia si es archivo sensible o `.xlsm`.
3. Leer estado actual antes de editar.
4. Escribir en rango exacto.
5. Releer/validar el resultado.
6. Reportar rangos modificados.

Reglas:

- Si el archivo esta abierto en Excel, advertir porque puede bloquear o corromper escritura.
- Preservar formulas existentes; no reemplazar por valores sin permiso.
- Para `.xlsm`, no recrear desde cero salvo aceptacion explicita de perder macros.

## Modo FORMAT

Objetivo: aplicar formato visual profesional.

Flujo:

1. Leer estructura: encabezados, filas de datos, totales.
2. Aplicar formato segun `formatting-defaults.md`.
3. Crear tabla Excel si el MCP lo permite.
4. Ajustar numero/formato por unidad.
5. Validar visualmente con screenshot si esta disponible.

## Modo ANALYZE

Objetivo: calcular metricas y presentar resumen.

Protocolo:

1. Leer datos completos o muestra paginada.
2. Para mas de 500 filas, analizar con pandas/fallback local si conviene.
3. Para calculos simples, insertar formulas Excel.
4. Para cruces o migraciones, crear hojas `RAW`, `CLEAN`, `RESUMEN`, `CHECKS` cuando aporte trazabilidad.
5. Presentar resultado y dejarlo en workbook si el usuario lo pidio.

Tipos de analisis:

| Tipo | Herramienta preferida |
|---|---|
| Suma/subtotal | Formula `=SUM(...)` |
| Promedio ponderado | `=SUMPRODUCT(...)` |
| Tabla resumen | Hoja `RESUMEN` |
| Comparacion columnas | lectura + pandas o formulas |
| Totales por categoria | `=SUMIF(...)` / `=SUMIFS(...)` |
| Duplicados/nulos | hoja `CHECKS` o pandas |

## Pipeline Completo

```
[1] CREATE/OPEN
    -> Crear o abrir workbook
    -> Listar hojas y dimensiones

[2] FILL
    -> Escribir rangos completos
    -> Insertar formulas, no totales hardcodeados

[3] FORMAT
    -> Encabezados, numeros, bordes, tablas
    -> Congelar filas o capturar visual si disponible

[4] QA
    -> Releer rangos
    -> Validar conteos, totales, formulas y duplicados

[5] CONFIRM
    -> Reportar ruta, hojas, rangos, formulas y limitaciones
```

## Modos Potenciados

### Workbook Intake Mode

Para cualquier archivo existente:

1. confirmar ruta absoluta;
2. listar hojas y dimensiones;
3. detectar hojas ocultas, formulas, estilos y tablas si la herramienta lo permite;
4. leer solo el rango necesario con paginacion;
5. usar captura visual en Windows si la herramienta la expone.

### Bulk Write Mode

Para crear reportes o migrar datos:

- escribir rangos completos, no celda por celda;
- mantener datos, formulas y formato en pasos separados;
- crear hoja `RESUMEN` y hojas de detalle solo si aportan navegabilidad;
- nombrar tablas/rangos cuando el MCP lo permita.

### Formula Guard Mode

Para calculos:

- preferir formulas Excel sobre valores pegados;
- validar referencias cruzadas entre hojas;
- no sobrescribir formulas existentes sin leerlas antes;
- si el archivo es decision-critical, crear hoja `CHECKS`.

### Data QA Mode

Activar si hay limpieza, migracion, cruce o analisis:

- perfilar columnas: tipo, vacios, duplicados, min/max;
- detectar encabezados duplicados o celdas combinadas problematicas;
- preservar ceros iniciales en codigos, RUC/DNI, telefonos e IDs;
- separar datos crudos de datos transformados: `RAW`, `CLEAN`, `RESUMEN`.

### Excel To Word / APA Mode

Si el destino final es Word, tesis o APA:

1. usar `excel-user` para preparar/validar datos;
2. usar `excel-table-builder` para reducir, combinar o paginar la tabla;
3. usar `docx-mcp-document-editor` y `apa-7-thesis-format` para insertar en Word.

### Local Fallback Mode

Si no hay MCP activo:

- `openpyxl`: estructura, estilos, formulas, merged cells, xlsx/xlsm con cuidado;
- `pandas`: analisis tabular, limpieza, agrupaciones, CSV/XLSX;
- `xlsxwriter`: crear reportes nuevos con formato, no editar existentes;
- LibreOffice headless: conversion o validacion visual solo si hace falta.

No usar fallback para sobreescribir un archivo sensible sin crear copia previa.

## Reglas Globales

1. Nunca inventar datos. Si el dato no fue dado, dejar celda vacia o preguntar.
2. Formulas sobre valores hardcodeados.
3. Confirmar ruta antes de crear o sobreescribir un archivo.
4. Encabezados en espanol salvo que el usuario indique otro idioma.
5. Reportar limitaciones del MCP honestamente.
6. Incluir unidades en encabezados cuando los datos las tienen.
7. No solapar Google Sheets: si vive en Drive/Sheets, usar `google-workspace-editor`.
8. No romper macros: para `.xlsm`, preservar y crear copia antes de editar.
9. No confiar solo en escritura exitosa: reabrir, releer o validar antes de cerrar.
