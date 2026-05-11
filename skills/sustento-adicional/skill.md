---
name: sustento-adicional
description: Calcula el costo de una actividad adicional en proyectos de ingenieria o construccion. Recibe alcance, tiempo, recursos y genera un sustento economico legible en Google Sheets con precio en soles y dolares.
---

# Skill: Sustento de Adicional

## Proposito

Generar el sustento economico de una actividad adicional de obra o ingenieria, justificando el costo por tiempo de trabajo y alcance real del proyecto.

## Formula base

```text
Tiempo (meses) = Tiempo ajustado del proyecto / dias laborables por mes
Precio S/      = Costo mensual del equipo x Tiempo (meses) x Indice empresa
Precio USD     = Precio S/ / Tipo de cambio
```

## Datos requeridos

| Dato | Descripcion | Ejemplo |
| --- | --- | --- |
| Alcance actual | Cantidades, longitudes, estructuras, insumos | 61 alcantarillas, 1.28 km de canal |
| Proyecto referencial | Alcance y tiempo de un proyecto comparable, si existe | Proyecto anterior de 2 semanas |
| Personal | Recursos humanos involucrados | Coordinador BIM, Modeladores BIM |
| Costo mensual | Sueldo o tarifa mensual por recurso | S/ 2,500 |
| Dedicacion | Parcial o full time por recurso | 0.5, 1.0 |
| Indice empresa | Multiplicador de carga social y overhead | 1.5 |
| Dias laborables por mes | Dias habiles por mes | 20 |
| Tipo de cambio | PEN/USD del dia | 3.39 |

## Protocolo de ejecucion

1. Identificar datos faltantes.
2. Si hay proyecto referencial, extrapolar primero el tiempo y no el precio.
3. Buscar el tipo de cambio en una fuente publica confiable si el usuario no lo da.
4. Calcular el costo del equipo con el tiempo ajustado.
5. Generar el sustento en Google Sheets.
6. Mover el archivo a la carpeta de Drive indicada por el usuario.

## Regla de extrapolacion recomendada

Cuando exista un proyecto previo comparable, usar este orden:

1. Resumir el alcance del proyecto actual.
2. Compararlo con el proyecto referencial anterior.
3. Construir un factor de ajuste por alcance considerando:
   - cantidad de estructuras
   - componentes lineales
   - complejidad BIM
   - coordinacion e interoperabilidad
   - longitud del corredor, si sirve para equilibrar el resultado
4. Aplicar ese factor al tiempo real o referencial del proyecto anterior.
5. Recién despues calcular el costo del equipo real.

No extrapolar primero el precio comercial del proyecto anterior salvo que el usuario lo pida explicitamente.

## Estructura recomendada del Sheet

Usar este orden cuando haya proyecto comparativo:

1. Alcance del proyecto actual
2. Comparativo con proyecto anterior
3. Ajuste de tiempo
4. Tabla de personal y costo
5. Lectura final o notas

## Contenido por bloque

### 1. Alcance del proyecto actual

- Tabla corta de dos columnas: `Campo | Valor`
- Incluir cantidades clave, longitudes, estructuras y principales insumos

### 2. Comparativo con proyecto anterior

- Tabla o bloque comparando:
  - cantidad
  - longitud
  - estructuras
  - componentes lineales
  - complejidad BIM
- Redactar este comparativo como sustento tecnico, no como justificacion explicita del precio

### 3. Ajuste de tiempo

Mostrar claramente:

- tiempo base del proyecto referencial
- factor de ajuste por alcance
- tiempo ajustado del proyecto actual

### 4. Tabla de personal y costo

Formato recomendado:

`Personal | Cantidad | Costo x mes | Dedicacion | Costo mensual imputado | Tiempo ajustado | Costo del proyecto`

Filas tipicas:

- Coordinador BIM
- Modelador BIM
- Total

### 5. Lectura final o notas

Incluir:

- supuestos de rendimiento
- formula usada
- fuente y fecha del tipo de cambio
- observaciones sobre dedicacion parcial o full time
- criterio de redondeo de dias y monto final

## Reglas de formato visual

- Nombrar la hoja `Sustento` si solo hay una
- Ajustar automaticamente el ancho de columnas
- Resaltar encabezados con fondo suave
- Resaltar subtotal y total con fondo distinto
- Evitar celdas vacias ambiguas entre secciones
- Si el usuario lo pide, quitar la vista congelada para priorizar continuidad visual
- Si el usuario lo pide, usar una tabla horizontal de personal y costo en vez de una lista vertical cruda

## Criterios conservadores y redondeo

- Si el usuario pide un enfoque conservador, mantener el monto final cerca del resultado tecnico
- Si se redondea el precio comercial, preferir multiplos de `5` sin alejarse innecesariamente del calculo
- Si el tiempo ajustado arroja decimales, preferir dias enteros
- Si el usuario lo pide por operacion semanal, redondear a semanas completas

## Ejemplo de criterio

Si un proyecto referencial duro `10 dias habiles` y el alcance actual resulta `1.31` veces mas complejo, primero se calcula:

```text
Tiempo ajustado = 10 x 1.31 = 13.1 dias
```

Luego se puede redondear segun criterio del usuario, por ejemplo a `14 dias habiles`, y recien despues calcular el costo del equipo.
