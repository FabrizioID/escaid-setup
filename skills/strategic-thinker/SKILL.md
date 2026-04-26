---
name: strategic-thinker
description: Motor de análisis estratégico. Cruza variables dentro de un proyecto o entre proyectos conectados para producir insights, detectar tensiones y recomendar decisiones disruptivas. Usar cuando el usuario quiera analizar un proyecto, cruzar proyectos, buscar la disrupción, o tomar una decisión estratégica basada en la inteligencia acumulada.
---

# Strategic Thinker

Motor de análisis estratégico que opera sobre proyectos gestionados por la skill `strategic-project`. Lee memoria acumulada, cruza variables, identifica tensiones y sinergias, y produce recomendaciones accionables.

Para los protocolos de análisis detallados y el formato de output, lee [references/analysis-protocols.md](references/analysis-protocols.md).

## Prerequisito

Esta skill opera sobre proyectos existentes en `inteligencia/`. Si el usuario no tiene proyectos aún, invocar `strategic-project` primero.

Siempre empezar por leer `inteligencia/_registry.md` para entender el ecosistema completo antes de cargar proyectos individuales.

## Modos de operación

### 1. MONO — Análisis de un solo proyecto

**Triggers:** `analiza <proyecto>`, `qué está pasando en <proyecto>`, `dame un análisis de <proyecto>`

**Secuencia de carga:**
1. `inteligencia/_registry.md`
2. `inteligencia/<proyecto>/PROJECT.md`
3. `inteligencia/<proyecto>/memory/variables.md`
4. `inteligencia/<proyecto>/memory/facts.md`
5. `inteligencia/<proyecto>/memory/tensions.md`
6. `inteligencia/<proyecto>/memory/decisions.md`
7. Últimas 5 entradas en `signals/` (ordenadas por fecha, más reciente primero)
8. Último `analysis/` session si existe

**Ejecutar protocolo:** ANÁLISIS INTERNO (ver analysis-protocols.md)

**Output:** Escribir session en `inteligencia/<proyecto>/analysis/<fecha>-session.md`

---

### 2. MACRO — Cruce entre múltiples proyectos

**Triggers:** `cruza <A> con <B>`, `análisis macro`, `crúzalo todo`, `dame el panorama completo`

**Secuencia de carga:**
1. `inteligencia/_registry.md` — identificar todos los proyectos a cruzar
2. Para cada proyecto: PROJECT.md + memory/variables.md + memory/tensions.md
3. Señales recientes (últimas 3 por proyecto)

**Ejecutar protocolo:** CRUCE MACRO (ver analysis-protocols.md)

**Output:** Escribir session en el proyecto principal (o crear `inteligencia/_macro/analysis/<fecha>-session.md` si el cruce es de toda la red)

---

### 3. DECISIÓN — Recomendación accionable

**Triggers:** `qué hago sobre X`, `ayúdame a decidir sobre X`, `necesito decidir si X`

**Pasos:**
1. Identificar qué proyecto(s) son relevantes para la decisión.
2. Ejecutar carga completa de esos proyectos.
3. Aplicar protocolo DECISIÓN (ver analysis-protocols.md).
4. Output: recomendación con acción, timing, justificación y riesgo principal.
5. Proponer añadir la decisión a `memory/decisions.md` del proyecto si el usuario confirma.

---

### 4. DISRUPCIÓN — Buscar el movimiento no obvio

**Triggers:** `busca la disrupción en <proyecto o tema>`, `cuál sería el movimiento disruptivo`, `qué no estamos viendo`

**Pasos:**
1. Cargar proyecto(s) relevante(s).
2. Mapear tensiones activas y variables con tendencia incierta.
3. Aplicar razonamiento de primeros principios: descomponer los supuestos sobre los que opera el sistema.
4. Buscar analogías en otros dominios (cruzar con otros proyectos si los hay).
5. Generar 2-3 movimientos no obvios con su lógica disruptiva.
6. No filtrar por "factibilidad obvia" — el objetivo es expandir el espacio de posibilidades.

**Output:** Incluir una sección `## Movimientos disruptivos` en el analysis session.

---

## Reglas del motor

- Nunca fabricar datos. Si una variable no tiene señales recientes, declararlo explícitamente como "sin actualización reciente".
- Separar siempre: lo que dicen los datos vs lo que infiere el análisis.
- Priorizar tensiones sobre hechos estables — las tensiones son donde está la energía estratégica.
- Cuando dos variables de proyectos distintos se correlacionan, documentar la correlación con su fuente antes de usarla en el análisis.
- Cada session de análisis es un documento histórico. No sobreescribir análisis previos.
- El output siempre termina con una acción concreta, no con una observación.
