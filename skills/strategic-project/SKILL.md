---
name: strategic-project
description: Crear, alimentar y mantener proyectos de inteligencia estrategica persistentes dentro de second-brain. Usar cuando el usuario quiera init proyecto, anadir senal, actualizar variables, revisar estado, listar proyectos, conectar proyectos o preparar memoria para Magnus.
---

# Strategic Project

Gestiona proyectos de inteligencia estrategica persistentes. Cada proyecto acumula senales de la realidad, mantiene variables rastreadas y puede conectarse con otros proyectos para analisis macro.

## Raiz Canonica

La raiz oficial de escritura es:

`second-brain/inteligencia/`

`inteligencia/` en la raiz del workspace queda como legacy/fallback de lectura o migracion. No crear proyectos, senales, threads ni analysis nuevos ahi.

Para el esquema completo de archivos y campos, lee `references/project-schema.md`.

## Modos

### 1. INIT - Crear proyecto nuevo

Triggers: `init proyecto <nombre>`, `crea proyecto <nombre>`, `nuevo proyecto <nombre>`.

Pasos:

1. Verificar que `second-brain/inteligencia/` existe; crear si no.
2. Crear `second-brain/inteligencia/<slug>/`.
3. Crear `PROJECT.md` con proposito, dominio y variables iniciales.
4. Crear subcarpetas: `signals/`, `memory/`, `analysis/`, `threads/`.
5. Crear `memory/facts.md`, `memory/variables.md`, `memory/tensions.md`, `memory/decisions.md`, `memory/criteria.md`.
6. Crear `threads/_index.md` con columnas: Slug, Fecha, Tipo, Tags tematicos, Tags patron, Tags senal, Resumen corto.
7. Actualizar `second-brain/inteligencia/_registry.md`.
8. Confirmar al usuario con resumen.

Regla: no crear proyecto sin proposito y al menos una variable. Si falta, preguntar antes de escribir.

### 2. SENAL - Anadir informacion de la realidad

Triggers: `anade senal a <proyecto>`, `tengo nueva info sobre <proyecto>`, `actualiza <proyecto> con esto`.

Pasos:

1. Leer `second-brain/inteligencia/<proyecto>/PROJECT.md`.
2. Crear o abrir `second-brain/inteligencia/<proyecto>/signals/<YYYY-MM-DD>.md`.
3. Escribir fuente, variables afectadas, dato observado e interpretacion por separado.
4. Si cambia una variable, proponer actualizar `memory/variables.md`.
5. Si genera hecho estable, proponer actualizar `memory/facts.md`.

Nunca borrar ni sobreescribir senales existentes.

### 3. VARIABLES - Actualizar estado

Triggers: `actualiza variables de <proyecto>`, `revisa las variables de <proyecto>`.

Pasos:

1. Leer `memory/variables.md` y las ultimas 3 senales.
2. Comparar estado actual vs propuesto.
3. Mostrar tabla al usuario.
4. Actualizar solo con confirmacion.

### 4. ESTADO - Revisar situacion

Triggers: `estado de <proyecto>`, `dame resumen de <proyecto>`, `que tenemos en <proyecto>`.

Pasos:

1. Leer `PROJECT.md`, `memory/variables.md`, `facts.md`, `tensions.md`, `decisions.md`.
2. Contar senales y fecha de la mas reciente.
3. Reportar proposito, variables, hechos, tensiones, decisiones y ultima senal.

### 5. LISTAR - Ver todos los proyectos

Triggers: `lista proyectos`, `que proyectos tengo`, `muestra el registry`.

Leer `second-brain/inteligencia/_registry.md` y mostrar tabla: nombre, dominio, variables, senales, conexiones y ultima senal.

### 6. CONECTAR - Vincular proyectos

Triggers: `conecta <A> con <B>`, `vincula <proyecto-a> y <proyecto-b>`.

Pasos:

1. Leer `PROJECT.md` de ambos.
2. Anadir cada proyecto a `connections:` del otro.
3. Actualizar `_registry.md`.
4. Preguntar si hay variables compartidas o afectacion cruzada y documentarla como `inferencia-cruzada`.

### 7. THREADS - Ver o buscar hilos

Triggers: `threads de <proyecto>`, `hilos de <proyecto>`, `busca threads con <tag>`.

Pasos:

1. Leer `second-brain/inteligencia/<proyecto>/threads/_index.md`.
2. Filtrar por tag o tema si aplica.
3. Mostrar slug, fecha, tags y resumen.
4. Leer thread completo solo si el usuario lo pide.

## Reglas

- Escribir en `memory/` solo hechos confirmados o validados por el usuario.
- Separar dato observado de interpretacion en senales.
- Nunca almacenar credenciales, tokens ni secretos.
- Usar fechas ISO `YYYY-MM-DD`.
- El slug de un proyecto es inmutable.
- Si una instruccion antigua menciona `inteligencia/`, normalizar a `second-brain/inteligencia/` salvo lectura legacy o migracion.
