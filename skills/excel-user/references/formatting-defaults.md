# Excel Formatting Defaults

Preferencias de formato del usuario para archivos Excel generados por la skill excel-user.

---

## Paleta de colores

| Elemento | Color | Hex |
|---|---|---|
| Encabezado fondo | Azul claro | `#BDD7EE` |
| Encabezado texto | Negro | `#000000` |
| Fila de total fondo | Gris claro | `#D9D9D9` |
| Fila de total texto | Negro negrita | `#000000` |
| Filas alternas (opcional) | Blanco / Gris muy claro | `#FFFFFF` / `#F2F2F2` |
| Borde de tabla | Gris medio | `#808080` |

---

## Tipografía

- **Fuente por defecto**: Calibri 11pt
- **Encabezados**: Calibri 11pt, **negrita**
- **Totales**: Calibri 11pt, **negrita**
- **Datos**: Calibri 11pt, regular

---

## Formato de números

| Tipo de dato | Formato Excel |
|---|---|
| Kilogramos (kg) | `#,##0.00` (ej: 7,933.74) |
| Toneladas (ton) | `#,##0.000` (ej: 7.934) |
| Metros / m² / m³ | `#,##0.00` |
| Porcentaje | `0.00%` |
| Pesos / moneda | `$#,##0.00` |
| Enteros (conteo) | `#,##0` |
| Decimales generales | `#,##0.00` |

---

## Estructura de tabla estándar

```
Fila 1:   [ENCABEZADOS] — negrita, fondo azul claro, borde
Filas 2–N: [DATOS] — regular, bordes laterales
Fila N+1: [TOTAL] — negrita, fondo gris claro, borde superior doble
```

---

## Anchos de columna recomendados

| Tipo de columna | Ancho aprox. |
|---|---|
| Texto corto (código, ID) | 12 |
| Texto mediano (nombre, descripción) | 25 |
| Número (kg, ton, cantidad) | 15 |
| Fecha | 14 |
| Porcentaje | 10 |

---

## Hojas múltiples — convención de nombres

Cuando un workbook tiene varias hojas:
- Hoja principal: `RESUMEN` (en mayúsculas)
- Hojas de detalle: nombre del ítem (ej: `DOVELA 07`, `DOVELA 08`)
- Hoja de parámetros: `CONFIG`

---

## Comportamiento por defecto

- **Idioma de encabezados**: español
- **Separador decimal**: punto (`.`) — estándar internacional
- **Separador de miles**: coma (`,`)
- **Fecha**: DD/MM/YYYY
- **Primera fila siempre fija** (freeze top row) si el MCP lo permite
- **Columna A** reservada para identificador/nombre cuando es tabla de entidades
