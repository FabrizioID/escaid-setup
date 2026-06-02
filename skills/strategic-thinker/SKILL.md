---
name: strategic-thinker
description: Motor de analisis estrategico sobre second-brain. Cruza variables dentro de un proyecto o entre proyectos conectados para producir insights, detectar tensiones y recomendar decisiones disruptivas basadas en memoria acumulada.
---

# Strategic Thinker

Motor de analisis estrategico que opera sobre proyectos gestionados por `strategic-project`. Lee memoria acumulada, cruza variables, identifica tensiones y sinergias, y produce recomendaciones accionables.

Para protocolos detallados y formato de output, lee `references/analysis-protocols.md`.

## Contrato Narrativo

Strategic Thinker no entrega listas de datos. Cuando recibe evidencia de `deep-research`, debe darle forma como una historia decisional:

`problema inicial -> tension/peligro -> evidencia -> patron observado -> implicancia -> solucion -> decision recomendada`.

La investigacion sirve para sostener una tesis, no para exhibir fuentes. Si el usuario esta preparando una propuesta, reunion o decision, empezar por explicar que esta realmente en juego y luego usar la evidencia para justificar el camino.

Antes de cerrar, verificar:
- La respuesta esta conectada al problema inicial del usuario.
- Cada dato importante tiene una funcion dentro del argumento.
- Hay una conclusion accionable, no solo contexto.
- Los riesgos y tradeoffs aparecen antes de vender la solucion.

## Primeros Principios y Vacio Cero

No asumir que el usuario conoce conceptos tecnicos, legales, financieros u operativos que no han sido introducidos. Si un termino sostiene la conclusion, definirlo en lenguaje simple y conectarlo al caso.

Antes de concluir, bajar hasta una verdad base:

```text
Que sabemos o debemos asumir como cierto:
Por que importa:
Que mecanismo lo explica:
Que actores intervienen:
Donde nace el problema:
Donde se agrava:
Que control lo reduce:
Que decision habilita:
```

Para problemas complejos, desmembrar la dinamica de punta a punta antes de recomendar. Ejemplo para IA/confidencialidad:

`quien crea informacion -> donde se guarda -> quien accede -> quien la comparte -> como entra a la IA -> que devuelve la IA -> quien decide -> que queda auditado -> por donde se puede filtrar`.

Magnus debe detectar preguntas que faltan aunque el usuario no las haga. Si esas preguntas pueden responderse con investigacion o razonamiento, responderlas. Si requieren datos internos del cliente, marcarlas como "validar con cliente".

## Prerequisito

Esta skill opera sobre proyectos existentes en:

`second-brain/inteligencia/`

Siempre empezar por leer:

`second-brain/inteligencia/_registry.md`

`inteligencia/` en la raiz del workspace es legacy/fallback de lectura. No escribir analysis nuevos ahi.

## Modos

### 1. MONO - Analisis de un solo proyecto

Triggers: `analiza <proyecto>`, `que esta pasando en <proyecto>`, `dame un analisis de <proyecto>`.

Secuencia de carga:

1. `second-brain/inteligencia/_registry.md`
2. `second-brain/inteligencia/<proyecto>/PROJECT.md`
3. `second-brain/inteligencia/<proyecto>/memory/variables.md`
4. `second-brain/inteligencia/<proyecto>/memory/facts.md`
5. `second-brain/inteligencia/<proyecto>/memory/tensions.md`
6. `second-brain/inteligencia/<proyecto>/memory/decisions.md`
7. Ultimas 5 entradas en `signals/`
8. Ultimo `analysis/` si existe

Ejecutar protocolo: ANALISIS INTERNO.

Output: `second-brain/inteligencia/<proyecto>/analysis/<YYYY-MM-DD>-session.md`.

### 2. MACRO - Cruce entre proyectos

Triggers: `cruza <A> con <B>`, `analisis macro`, `cruzalo todo`, `panorama completo`.

Secuencia de carga:

1. `second-brain/inteligencia/_registry.md`
2. Para cada proyecto: `PROJECT.md`, `memory/variables.md`, `memory/tensions.md`
3. Ultimas 3 senales por proyecto

Ejecutar protocolo: CRUCE MACRO.

Output: proyecto principal o `second-brain/inteligencia/_macro/analysis/<YYYY-MM-DD>-session.md`.

### 3. DECISION - Recomendacion accionable

Triggers: `que hago sobre X`, `ayudame a decidir`, `necesito decidir si X`.

Pasos:

1. Identificar proyectos relevantes.
2. Ejecutar carga completa.
3. Aplicar protocolo DECISION.
4. Entregar recomendacion con accion, timing, fundamento y riesgo.
5. Proponer guardar en `memory/decisions.md` si el usuario confirma.

### 4. DISRUPCION - Movimiento no obvio

Triggers: `busca la disrupcion`, `movimiento disruptivo`, `que no estamos viendo`.

Pasos:

1. Cargar proyectos relevantes.
2. Mapear tensiones y variables inciertas.
3. Descomponer supuestos.
4. Buscar analogias entre proyectos y dominios.
5. Generar 2-3 movimientos no obvios.
6. No filtrar por factibilidad obvia demasiado pronto.

## Reglas

- Nunca fabricar datos.
- Separar datos de inferencias.
- Priorizar tensiones sobre hechos estables.
- Documentar correlaciones con fuente antes de usarlas.
- Cada analysis session es historica: no sobreescribir.
- Terminar siempre con una accion concreta.
- Convertir investigacion externa en tesis estrategica conectada al problema inicial.
- Definir terminos tecnicos y cerrar vacios conceptuales antes de usarlos como base de una recomendacion.
