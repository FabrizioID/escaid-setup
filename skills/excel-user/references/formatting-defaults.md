# Excel Formatting Defaults

Preferencias de formato del usuario para archivos Excel generados por `excel-user`.

## Paleta De Colores

| Elemento | Color | Hex |
|---|---|---|
| Encabezado fondo | Azul claro | `#BDD7EE` |
| Encabezado texto | Negro | `#000000` |
| Fila de total fondo | Gris claro | `#D9D9D9` |
| Fila de total texto | Negro negrita | `#000000` |
| Filas alternas opcionales | Blanco / gris muy claro | `#FFFFFF` / `#F2F2F2` |
| Borde de tabla | Gris medio | `#808080` |

## Tipografia

- Fuente por defecto: Calibri 11 pt.
- Encabezados: Calibri 11 pt, negrita.
- Totales: Calibri 11 pt, negrita.
- Datos: Calibri 11 pt, regular.

## Formato De Numeros

| Tipo de dato | Formato Excel |
|---|---|
| Kilogramos (kg) | `#,##0.00` |
| Toneladas (ton) | `#,##0.000` |
| Metros / m2 / m3 | `#,##0.00` |
| Porcentaje | `0.00%` |
| Moneda | `$#,##0.00` |
| Enteros / conteo | `#,##0` |
| Decimales generales | `#,##0.00` |
| Fecha | `dd/mm/yyyy` |
| Codigo / ID | `@` |

## Estructura Estandar

```text
Fila 1: encabezados - negrita, fondo azul claro, borde
Filas 2..N: datos - regular, bordes livianos
Fila N+1: total - negrita, fondo gris claro, borde superior
```

## Anchos De Columna Recomendados

| Tipo de columna | Ancho aprox. |
|---|---|
| Codigo / ID | 12 |
| Texto mediano | 25 |
| Texto largo | 35 |
| Numero | 15 |
| Fecha | 14 |
| Porcentaje | 10 |

## Convenciones De Hojas

- Hoja principal ejecutiva: `RESUMEN`.
- Datos crudos: `RAW`.
- Datos limpios: `CLEAN`.
- Validaciones: `CHECKS`.
- Parametros: `CONFIG`.
- Hojas de detalle: nombre corto del item, por ejemplo `DOVELA 07`.

## Comportamiento Por Defecto

- Encabezados en espanol.
- Separador decimal: punto.
- Separador de miles: coma.
- Congelar primera fila si el MCP lo permite.
- Columna A reservada para identificador/nombre cuando es tabla de entidades.
- No usar colores decorativos si el workbook se convertira a Word/APA.
