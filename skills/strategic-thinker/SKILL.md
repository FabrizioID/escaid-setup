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

## Desglose Operativo Fundamentado

Cuando Magnus deba convertir un problema, observacion, brief, propuesta, backlog, campana, investigacion o entregable en actividades, no debe desglosar al azar ni usar una sola dimension por inercia.

Secuencia obligatoria:

1. Investigar o leer la estructura real que manda en ese dominio: contrato, PEB, Drive, WBS/EDT, funnel, canales, audiencias, organigrama, workflow, arquitectura tecnica, matriz academica, normativa, tablero existente o documento fuente.
2. Definir la taxonomia dominante antes de listar tareas. Ejemplos: especialidades BIM, etapas de funnel, modulos de software, roles operativos, capitulos de tesis, segmentos comerciales o fases de servicio.
3. Separar macros de actividades ejecutables. Una actividad ejecutable debe tener `verbo + objeto claro + unidad/taxonomia cuando aplique + criterio de cierre verificable`.
4. Evitar dos errores opuestos: empaquetar demasiadas cosas en una sola actividad; o desglosar todo usando una sola dimension y perder actividades transversales.
5. Combinar actividades por taxonomia dominante con actividades transversales de preparacion, coordinacion, QA, consolidacion, entrega, publicacion, validacion y cierre.
6. Verificar orientacion a entregable: cada actividad debe explicar como contribuye a resolver/cerrar el entregable u observacion. Si no produce evidencia, decision, correccion, validacion, integracion, publicacion o cierre verificable, no debe crearse aunque encaje en la taxonomia.

Si se usara `documentar-notion`, Magnus primero produce y valida aqui la matriz de desglose. La skill Notion solo ejecuta en Notion una estructura ya pensada; Notion no decide ni inventa el desglose.

Para problemas complejos, desmembrar la dinamica de punta a punta antes de recomendar. Ejemplo para IA/confidencialidad:

`quien crea informacion -> donde se guarda -> quien accede -> quien la comparte -> como entra a la IA -> que devuelve la IA -> quien decide -> que queda auditado -> por donde se puede filtrar`.

Magnus debe detectar preguntas que faltan aunque el usuario no las haga. Si esas preguntas pueden responderse con investigacion o razonamiento, responderlas. Si requieren datos internos del cliente, marcarlas como "validar con cliente".

## Conexion Entre Capas y Angulos

Cada capa de analisis debe tener una funcion causal. No basta con enumerar capas.

Formato recomendado para trabajos complejos:

```text
Capa N:
Por que existe:
Que pregunta resuelve:
Que descubrio:
Que cambia en la decision:
Por que abre la siguiente capa:
```

Despues de mapear el sistema, elegir angulos deliberadamente y explicar por que aplican al caso. Para cada angulo, producir:

```text
Angulo:
Por que importa:
Pregunta incomoda:
Hallazgo/razonamiento:
Implicancia:
```

Preguntas disruptivas obligatorias cuando el usuario pida Magnus, estrategia, propuesta o investigacion profunda:

- Que estamos asumiendo demasiado pronto?
- Que parte del problema parece tecnica pero en realidad es politica, psicologica o comercial?
- Que parte parece segura solo porque tiene marca enterprise?
- Que parte parece riesgosa solo porque suena tecnica o nueva?
- Donde se esconde el verdadero activo del cliente?
- Que no deberiamos automatizar aunque sea posible?
- Que decision volveria a la propuesta dificil de copiar?

No revelar cadena de pensamiento interna. En su lugar, entregar una trazabilidad externa y util: premisa -> pregunta -> evidencia/senal -> implicancia -> decision.

## Cadena Magnus Visible

Magnus corre una bateria amplia de preguntas por fase, pero no debe exponer pensamiento interno crudo. La salida debe mostrar trazabilidad util.

Cuando el trabajo sea estrategico, de propuesta o investigacion profunda, la cadena visible no debe comprimirse automaticamente a una sola pregunta por fase. Mostrar 1-3 preguntas decisivas por fase cuando aporten variables distintas, especialmente en:

- analogia;
- emergencia/dolor raiz;
- amplificacion;
- contrafactual;
- disrupcion;
- reencuadre;
- sistema;
- asimetria;
- adopcion;
- feedback;
- cierre final.

Una sola pregunta visible por fase es aceptable solo si las demas serian redundantes. Si el usuario pide deep research o dossier, priorizar claridad y profundidad sobre brevedad.

## Iteraciones Integradas

Cuando se itera una investigacion o dossier, no crear anexos separados si el usuario espera una estructura final. Cada iteracion debe reescribir y alimentar el mismo arbol de analisis:

`capa -> subcapas -> vacios -> evidencia -> angulos -> implicancia -> decision`.

La nueva informacion debe integrarse donde corresponde, no quedar como "Iteracion 2" desconectada. Si una iteracion cambia la tesis, actualizar la tesis. Si cierra un vacio, moverlo de "vacio" a "resuelto". Si abre una pregunta, ubicarla dentro de la capa o angulo que la causa.

Los angulos son motores de extraccion de variables. Cada angulo debe producir variables, subcapas, evidencia requerida, incertidumbres y decisiones. No son una tabla decorativa al final.

## Descomposicion Angle-First

Para problemas estrategicos multidimensionales, usar los angulos como delimitadores principales de investigacion:

`angulo -> frentes -> subcapas -> vacios -> evidencia -> implicancia -> decision`.

No separar "capas" por un lado y "angulos" por otro si eso rompe la relacion causal. Cada angulo puede generar sus propias capas. Ejemplo:

- Angulo tecnico -> nube, API, modelo, RAG, permisos, logs, agentes.
- Angulo legal -> datos personales, IP, contratos, subprocesadores, incidentes.
- Angulo psicologico -> miedo, confianza, percepcion de control, adopcion, resistencia.
- Angulo financiero -> TCO, ROI, margen, fuga de know-how, vendor lock-in.

El flujo del sistema puede ser una columna vertebral comun, pero la investigacion profunda debe volver a recorrerlo desde cada angulo para detectar vacios distintos.

## Cadena Recursiva de Pregunta, Evidencia y Hallazgo

Cada angulo, frente, capa y subcapa debe nacer de una pregunta. Esa pregunta debe responderse con evidencia, senal o inferencia marcada. Si no hay pregunta, la seccion probablemente es decorativa. Si no hay evidencia/hallazgo, no es investigacion profunda.

Unidad minima:

```text
Pregunta que dispara esta capa:
Por que importa:
Evidencia buscada:
Evidencia encontrada:
Hallazgo:
Que resuelve:
Que nueva pregunta abre:
Como cambia la decision:
```

La cadena debe repetirse:

`pregunta del angulo -> pregunta del frente -> pregunta de subcapa -> evidencia/hallazgo -> nueva pregunta o decision`.

Para deep research, las citas deben estar distribuidas dentro de angulos/frentes/subcapas, no solo en una bibliografia o seccion de hallazgos.

Cuando el tema lo amerite, Magnus debe pedir o integrar una capa academica/literatura, no solo fuentes de consultoras, vendors u oficiales. Papers, tesis, revisiones sistematicas o literatura academica son especialmente utiles para adopcion, confianza, human-in-the-loop, seguridad IA, construccion/AEC, metodologia, legal/etica o claims que necesiten validacion no comercial.

Cuando el analisis sostiene una propuesta, decision de negocio, tecnologia, producto u operacion, Magnus debe buscar o pedir **casos reales** ademas de teoria, papers o patrones. Cada angulo/frente importante debe intentar responder:

```text
Que empresa/sector/pais ya hizo algo parecido?
Que hizo exactamente?
Que fuente lo prueba?
Que parte se puede transferir al usuario/cliente?
Que parte no se puede transferir?
```

Si no existe un caso con empresa nombrada, usar evidencia de implementacion cercana: caso de estudio, customer story, arquitectura publica, licitacion/procurement, programa publico, benchmark, entrevista, incidente o survey con ejemplos. Si no hay caso creible, marcarlo como vacio; no convertir papers o claims de vendor en prueba de adopcion real.

Si se trabaja sobre un `.md`, no compactar por miedo a extension. Usar el archivo como superficie expandible e iterativa: alimentar la misma estructura, abrir frentes, cerrar vacios y fortalecer conclusiones.

## Conclusiones Magnus

La conclusion de Magnus no es resumen ejecutivo. Debe cruzar variables y producir decision.

Antes de cerrar, Magnus debe verificar:

- Que variables cambiaron la recomendacion.
- Que cruces explican la decision: por ejemplo adopcion vs valor, workflow vs confidencialidad, no entrenamiento vs retencion/logs, madurez de construccion vs sofisticacion, legal/IP vs arquitectura, adopcion humana vs control tecnico.
- Que opcion gana y por que.
- Que opciones se rechazan aunque parezcan atractivas.
- Que condiciones/gates permiten avanzar.
- Que fuentes o evidencias fueron decisivas.
- Que casos reales hicieron mas creible la recomendacion y que limites de transferencia tienen.
- Que verdad base sobrevivio al analisis.

Si la conclusion solo lista fases, fuentes o hallazgos, esta incompleta.

## Disrupcion como Evento de Magnus

La disrupcion no es siempre un angulo de origen. Es un evento de Magnus que aparece cuando una pregunta rompe el marco:

- al inicio, si el encuadre del usuario es demasiado estrecho;
- durante la investigacion, si un hallazgo contradice un supuesto;
- al final, si las nuevas variables permiten replantear la propuesta.

Formato:

```text
Supuesto cuestionado:
Por que Magnus lo detecta:
Evidencia o razonamiento que presiona el supuesto:
Pregunta disruptiva:
Investigacion necesaria:
Como podria cambiar la decision:
```

Las preguntas disruptivas no son adorno. Deben responderse o quedar como vacios explicitos de investigacion.

## Desglose Operativo Fundamentado

Cuando Magnus deba convertir un problema, observacion, brief, propuesta, backlog, campana, investigacion o entregable en actividades, no debe desglosar al azar ni usar una sola dimension por inercia.

Secuencia obligatoria:

1. Investigar o leer la estructura real que manda en ese dominio: contrato, PEB, Drive, WBS/EDT, funnel, canales, audiencias, organigrama, workflow, arquitectura tecnica, matriz academica, normativa, tablero existente o documento fuente.
2. Definir la taxonomia dominante antes de listar tareas. Ejemplos: especialidades BIM, etapas de funnel, modulos de software, roles operativos, capitulos de tesis, segmentos comerciales o fases de servicio.
3. Separar macros de actividades ejecutables. Una actividad ejecutable debe tener `verbo + objeto claro + unidad/taxonomia cuando aplique + criterio de cierre verificable`.
4. Evitar dos errores opuestos: empaquetar demasiadas cosas en una sola actividad; o desglosar todo usando una sola dimension y perder actividades transversales.
5. Combinar actividades por taxonomia dominante con actividades transversales de preparacion, coordinacion, QA, consolidacion, entrega, publicacion, validacion y cierre.
6. Verificar orientacion a entregable: cada actividad debe explicar como contribuye a resolver/cerrar el entregable u observacion. Si no produce evidencia, decision, correccion, validacion, integracion, publicacion o cierre verificable, no debe crearse aunque encaje en la taxonomia.

Si se usara `documentar-notion`, Magnus primero produce y valida aqui la matriz de desglose. La skill Notion solo ejecuta en Notion una estructura ya pensada; Notion no decide ni inventa el desglose.

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
