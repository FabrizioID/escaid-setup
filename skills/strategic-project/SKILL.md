---
name: strategic-project
description: Crear, alimentar y mantener proyectos de inteligencia estratégica persistentes que acumulan señales de la realidad en el tiempo. Usar cuando el usuario quiera init proyecto, añadir señal, actualizar variables, revisar estado, listar proyectos, o conectar proyectos entre sí.
---

# Strategic Project

Gestiona proyectos de inteligencia estratégica persistentes. Cada proyecto acumula señales de la realidad, mantiene variables rastreadas, y puede conectarse con otros proyectos para análisis macro.

## Directorio raíz

El directorio base de todos los proyectos es `inteligencia/` dentro del workspace activo del usuario. Si no existe, créalo antes de continuar.

Para el esquema completo de archivos y campos, lee [references/project-schema.md](references/project-schema.md).

## Modos de operación

Detecta el modo por lo que dice el usuario:

### 1. INIT — Crear proyecto nuevo

**Triggers:** `init proyecto <nombre>`, `crea proyecto <nombre>`, `nuevo proyecto <nombre>`

**Pasos:**
1. Verificar que `inteligencia/` existe, crear si no.
2. Crear la carpeta `inteligencia/<slug>/` (slug: kebab-case del nombre).
3. Crear `PROJECT.md` con el schema completo — preguntar al usuario: propósito en una oración, dominio, y al menos 2 variables iniciales a rastrear.
4. Crear subcarpetas vacías: `signals/`, `memory/`, `analysis/`, `threads/`.
5. Crear archivos vacíos en `memory/`: `facts.md`, `variables.md`, `tensions.md`, `decisions.md`.
6. Crear `threads/_index.md` con la cabecera vacía del índice (tabla con columnas: Slug, Fecha, Tags temáticos, Tags patrón, Tags señal, Resumen corto).
7. Añadir o actualizar `inteligencia/_registry.md` con la entrada del nuevo proyecto.
8. Confirmar al usuario con un resumen del proyecto creado.

**Regla:** No crear el proyecto sin tener al menos propósito y 1 variable. Si el usuario no los provee, preguntar antes de escribir.

---

### 2. SEÑAL — Añadir nueva información de la realidad

**Triggers:** `añade señal a <proyecto>`, `tengo nueva info sobre <proyecto>`, `actualiza <proyecto> con esto`

**Pasos:**
1. Leer `inteligencia/<proyecto>/PROJECT.md` para conocer las variables rastreadas.
2. Crear o abrir `inteligencia/<proyecto>/signals/<fecha-ISO>.md`.
3. Escribir la señal con el formato definido en project-schema.md: fecha, fuente, dato observado, interpretación (separados explícitamente).
4. Si la señal cambia el estado de alguna variable, preguntar al usuario si desea actualizar `memory/variables.md`.
5. Si la señal genera un nuevo hecho estable, proponer añadirlo a `memory/facts.md`.

**Regla crítica:** Nunca borrar ni sobreescribir señales existentes. Siempre append. El historial es sagrado.

**Regla de volumen:** Si el usuario trae múltiples datos en una sesión, documentarlos todos en el mismo archivo de señal del día, separados por sección.

---

### 3. VARIABLES — Actualizar estado de variables

**Triggers:** `actualiza variables de <proyecto>`, `revisa las variables de <proyecto>`

**Pasos:**
1. Leer `memory/variables.md` + las últimas 3 entradas en `signals/`.
2. Identificar qué variables han cambiado de estado según las señales recientes.
3. Presentar al usuario la tabla de variables con estado actual vs propuesto.
4. Actualizar `memory/variables.md` solo con confirmación del usuario.

---

### 4. ESTADO — Revisar situación del proyecto

**Triggers:** `estado de <proyecto>`, `dame un resumen de <proyecto>`, `qué tenemos en <proyecto>`

**Pasos:**
1. Leer en orden: `PROJECT.md`, `memory/variables.md`, `memory/facts.md`, `memory/tensions.md`, `memory/decisions.md`.
2. Contar señales totales en `signals/` y fecha de la más reciente.
3. Reportar: propósito, variables activas con estado, hechos clave, tensiones activas, decisiones tomadas, última señal.
4. No leer análisis previos a menos que el usuario lo pida.

---

### 5. LISTAR — Ver todos los proyectos

**Triggers:** `lista proyectos`, `qué proyectos tengo`, `muestra el registry`

**Pasos:**
1. Leer `inteligencia/_registry.md`.
2. Mostrar tabla: nombre, dominio, N variables, N señales, conexiones, fecha última señal.

---

### 6. CONECTAR — Vincular proyectos entre sí

**Triggers:** `conecta <A> con <B>`, `vincula <proyecto-a> y <proyecto-b>`

**Pasos:**
1. Leer `PROJECT.md` de ambos proyectos.
2. Añadir cada proyecto a la lista `connections:` del otro.
3. Actualizar `_registry.md` para reflejar la conexión bidireccional.
4. Preguntar al usuario si hay variables compartidas o que se afecten entre proyectos, y documentarlo en `memory/variables.md` de ambos con la fuente `inferencia-cruzada`.

---

### 7. THREADS — Ver o buscar hilos del proyecto

**Triggers:** `threads de <proyecto>`, `hilos de <proyecto>`, `busca threads con <tag>`, `qué hilos hay sobre <tema>`

**Pasos:**
1. Leer `inteligencia/<proyecto>/threads/_index.md`.
2. Si el usuario pide un tag específico, filtrar las filas que lo contengan.
3. Mostrar tabla filtrada con slug, fecha, tags y resumen corto.
4. Si el usuario quiere leer un thread completo, leer `threads/<slug>.md`.

---

## Reglas generales

- Escribir en `memory/` solo hechos confirmados o explícitamente validados por el usuario.
- Siempre separar dato observado de interpretación en las señales.
- Nunca almacenar credenciales, tokens, ni datos sensibles.
- Usar fechas ISO (YYYY-MM-DD) en todos los archivos.
- El slug de un proyecto es inmutable una vez creado.
