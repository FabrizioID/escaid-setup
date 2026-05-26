# Excel Operational Patterns

Patrones para producir libros rapidos, auditables y reutilizables.

## Estructura Recomendada

| Hoja | Uso |
|---|---|
| `RAW` | Datos importados sin tocar |
| `CLEAN` | Datos normalizados, tipos corregidos, columnas finales |
| `RESUMEN` | KPIs, tablas de decision y salida ejecutiva |
| `CHECKS` | Controles de calidad y conciliacion |
| `CONFIG` | Parametros editables, tasas, fechas, supuestos |

No crear todas las hojas siempre. Usarlas cuando el libro requiera trazabilidad o varias iteraciones.

## QA De Datos

Checklist minimo:

- conteo de filas fuente vs destino;
- encabezados duplicados;
- columnas vacias;
- IDs duplicados;
- formulas rotas o reemplazadas por valores;
- valores negativos inesperados;
- fecha/texto mezclados;
- totales fuente vs resumen;
- codigos con ceros iniciales preservados como texto.

## Formulas

Preferir formulas auditables:

| Necesidad | Formula |
|---|---|
| Total | `=SUM(A2:A100)` |
| Conteo no vacio | `=COUNTA(A2:A100)` |
| Conteo condicionado | `=COUNTIF(A2:A100,"Activo")` |
| Suma condicionada | `=SUMIF(A2:A100,"Activo",B2:B100)` |
| Promedio ponderado | `=SUMPRODUCT(B2:B100,C2:C100)/SUM(C2:C100)` |
| Buscar valor | `=XLOOKUP(E2,A:A,B:B,"")` |
| Control igualdad | `=IF(B2=C2,"OK","REVISAR")` |

Si el usuario entrega una formula exacta, respetarla.

## Formato Profesional

- Encabezados con fondo, negrita y filtros/tabla si el MCP lo soporta.
- Congelar primera fila si la herramienta lo permite.
- Alinear numeros a la derecha y texto a la izquierda.
- Usar formatos numericos por unidad; no convertir numeros a texto salvo codigos/IDs.
- Evitar colores decorativos que dificulten copiar a Word.

## Rendimiento

- Para mas de 500 filas, escribir rangos completos.
- Para mas de 5,000 filas, evitar imprimir toda la tabla en chat; entregar perfil y muestras.
- Para mas de 50,000 filas, analizar con pandas y escribir resumen.
- Leer por paginas si el MCP aplica limite de celdas.

## Entrega

Al cerrar una tarea Excel, reportar:

- ruta del archivo;
- hojas creadas/modificadas;
- rangos escritos;
- formulas insertadas;
- validaciones ejecutadas;
- limitaciones o acciones manuales pendientes.
