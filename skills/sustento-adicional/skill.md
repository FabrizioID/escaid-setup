---
name: sustento-adicional
description: Calcula el costo de una actividad adicional en proyectos de ingeniería/construcción. Recibe alcance (cantidad de ítems), tiempo por ítem, recursos (personal) y genera el sustento económico con precio en soles y dólares.
---

# Skill: Sustento de Adicional

## Propósito
Generar el sustento económico de una actividad adicional de obra o ingeniería, justificando el costo por horas-hombre trabajadas según alcance real de trabajo.

## Fórmula base

```
Tiempo (meses) = (N° ítems × días por ítem) / días laborables por mes
Precio S/       = Precio_mensual × Índice_empresa × Tiempo
Precio USD      = Precio_S/ / Tipo_de_cambio
```

## Datos requeridos del usuario

| Dato | Descripción | Ejemplo |
|------|-------------|---------|
| N° ítems | Cantidad de unidades a ejecutar | 31 alcantarillas |
| Tiempo/ítem | Días que toma ejecutar una unidad | 0.5 días (medio día) |
| Personal | Tipo de recurso humano | Modelador BIM |
| Precio mensual | Sueldo o tarifa mensual del recurso | S/ 1,500 |
| Índice empresa | Multiplicador de carga social/overhead | 1.5 (estándar) |
| Días laborables/mes | Días hábiles por mes | 20 días |
| Tipo de cambio | PEN/USD del día (buscar en web, redondear al mayor a 2 decimales) | S/ 3.39 |

## Protocolo de ejecución

1. **Solicitar datos faltantes** — si el usuario no da algún dato, preguntar antes de calcular
2. **Buscar tipo de cambio en web** — fuente: Investing.com o similar, redondear al mayor a 2 decimales
3. **Calcular** con la fórmula base
4. **Generar output** en Google Sheets usando el MCP google-workspace o script Python con credenciales existentes
5. **Mover el archivo** a la carpeta de Drive que indique el usuario

## Estructura del sheet de salida

Seguir la plantilla de escenarios con columnas:
- Personal | Tipo | Cantidad | Precio (S//mes) | Índice Empresa | N° Ítems | Días/Ítem | Tiempo (mes) | Precio (S/) | Precio ($)

Incluir sección de NOTAS con todos los criterios de cálculo explícitos:
- Número de ítems y justificación del tiempo por ítem
- Fórmula de extrapolación
- Fuente y fecha del tipo de cambio

## Ejemplo resuelto

**Caso:** Modelado de acero de refuerzo de 31 alcantarillas (BIM)

| Campo | Valor |
|-------|-------|
| N° alcantarillas | 31 |
| Días/alcantarilla | 0.5 |
| Total días | 15.5 |
| Tiempo (meses) | 15.5 / 20 = 0.78 |
| Precio mensual | S/ 1,500 |
| Índice empresa | 1.5 |
| **Precio S/** | 1,500 × 1.5 × 0.78 = **S/ 1,755.00** |
| TC (Investing.com) | 3.39 |
| **Precio USD** | 1,755 / 3.39 = **$ 517.70** |

## Notas de criterio

- El tiempo por ítem debe sustentarse técnicamente (ej: "medio día por alcantarilla según rendimiento BIM estándar")
- El índice 1.5 representa carga social + overhead típico en Perú — ajustar si el cliente tiene índice propio
- Siempre citar fuente y fecha del tipo de cambio en el documento
- Si hay múltiples tipos de personal, calcular una fila por recurso y sumar al final
