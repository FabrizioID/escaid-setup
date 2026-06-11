# MD-Substrate Pipeline — cómo Magnus razona sin perder criterio

Spec del pipeline de razonamiento por archivo. Operacionaliza la regla anti-proxy de `process-criteria.md`: *la cura siempre es conectar al original completo, no a su resumen.*

## Principio
**El contexto es el cursor, no la memoria de trabajo.** La memoria de trabajo es un archivo MD. **Lo que no está en el archivo, no existe** — vive en una ventana que se trunca y en retornos de subagente que se resumen. Perder criterio = el patrón del proxy en forma mecánica.

## Cuándo aplica (calibración por Cognitive Router)
- **L1** (criterio compacto: dato, recall, copy corto, ajuste menor) → **SIN pipeline.** Responder directo. Forzar MD aquí es overhead.
- **L2 / L3** (scan multiángulo, cadena F1-F13, instrumento, propuesta, cliente-facing, alto impacto, varias alternativas) → **pipeline OBLIGATORIO.**
- **Gate duro:** no se presenta un producto L2/L3 sin un Análisis MD con su DoD cerrado. Si el usuario da dirección a mitad, el gate NO se apaga (las capas gated se caen primero en modo reactivo — ver process-criteria).

## Etapa 1 — Análisis MD (materia prima, una corrida)
Ruta: `second-brain/inteligencia/<proyecto>/analysis/<fecha>-<tema>.md`. **Schema fijo, en TRES CAPAS de orden (las capas 1 y 2 van ANTES de los ángulos — sin ellas los ángulos son arbitrarios):**

**Encabezado:**
1. **Objetivo** — el job real, no el literal.
2. **Receptor** — quién entiende / aprueba / adopta / compra / ejecuta.
3. **Criterios activos** — del **kernel completo relevante** (SKILL + pills + references) + `criteria.md` del proyecto. NO un proxy/shortlist.

**▸ CAPA 1 — ENFOQUE (el para-qué = la causa que GENERA los ángulos).** No el objetivo como frase suelta, sino **qué se espera conseguir** — el propósito. Esa causa es la que **revela qué ángulos importan**: cada ángulo nace de una necesidad del enfoque ("que la gente lo use" → ángulo psicológico; "que no se escape plata" → ángulo comercial). Los ángulos NO se eligen de una lista genérica; se **derivan** del enfoque. Si un ángulo no tiene causa en el enfoque, sobra.

**▸ CAPA 2 — CRUCE MULTIHILO + OPORTUNIDADES (antes de los ángulos).** Leer **MASTER_IDEAS + `_registry.md`** (Nivel 0A, ya obligatorio) y cruzar el proyecto con el ecosistema. Producir un **MAPA cross-proyecto VISIBLE** (no bullets sueltos): el proyecto al centro, conectado a los otros proyectos/fases (ej. AECODE-F3, Summit, clientes B2B) con el tipo de flujo en cada arista. Marcar si el proyecto **no está en MASTER_IDEAS** (gap → acción). Las oportunidades del cruce suelen subir de prioridad las del análisis aislado (un moonshot solitario puede tener flywheel + 2da puerta en otro proyecto). **Este mapa NO queda como apéndice: entra a la cadena en F7 (contextual) y F13 (resonancia).**

**▸ CAPA 3 — CORRER LA CADENA MAGNUS (F1-F13) — explícita, no implícita.** La cadena se **llama por su nombre y se corre**: una tabla `Fase F1-F13 → hallazgo decisivo sobre el problema → ángulo/variable que produce`. El multihilo de la Capa 2 **entra en F7 (correlación contextual)**; el patrón replicable sale en **F13 (resonancia)**. **Los ángulos NO son una lista que se elige — son el OUTPUT de la cadena, organizado por lente.** Saltar directo a "ángulos" sin correr la cadena = el error a evitar. Luego, el árbol:
4. **Ángulos** — cada uno **trazado a la(s) fase(s) que lo generó** y a su causa en la Capa 1; con razón de descarte de los no elegidos.
5. **Frentes** por ángulo (enumerados, visibles).
6. **Preguntas de disrupción con filo por frente** — **batería** (2-3+), F-moves variados (inversión, contrafactual, pre-mortem, reubicación, JTBD, asimetría, escala, incentivo, sistémico). De aquí NACEN las variables. Una sola pregunta por frente = batería pobre.
7. **Variables descubiertas** — tabla: var · qué afirma · acción/estado.
8. **Vacíos** — cada vacío con **ACCIÓN** (investigar / ver-Playwright / dato-MCP / skill / **supuesto explícito**).
9. **Supuestos explícitos**.
10. **Handoff** — la lista de variables que el producto DEBE consumir/destilar.

**▸ CADENA FINAL — CONVERGENTE (con TODAS las variables consolidadas).** La Capa 3 fue la cadena **inicial** (divergente: abrió el problema y parió las variables). Antes de cerrar el análisis se corre una **cadena final convergente** sobre el set completo: **F8 asimétrico** (perfil pérdida/ganancia/convexidad/opcionalidad/reversibilidad de las jugadas → apuesta principal) → **F9 convergente** (ganadora + Munger invert "qué la haría fallar" → condiciones + moonshot preservado con su trigger) → **Coda** (actor clave/punto de quiebre humano + 2-4 preguntas que quebraron el problema + patrón cognitivo + "para internalizar"). Sin cadena final, el análisis tiene variables pero NO decisión: se queda en divergencia. Regla: un análisis L3 corre las DOS cadenas — inicial (abre) y final (cierra).

**DoD binario del Análisis:** capas 1 y 2 presentes · cada ángulo trazado a su causa · cada frente con batería de preguntas · **cadena final corrida (F8→F9→Coda con ganadora + moonshot)** · ningún slot vacío · cada vacío con acción · cada variable con estado · handoff escrito. Si algo falla → no se pasa a producto.

## Patrón canónico de orquestación: CRUCE-FIRST → DEPTH-AFTER

La forma óptima para tareas L3 que tienen **a la vez** valor-en-cruce y valor-en-profundidad-por-unidad (la mayoría de las grandes):

1. **El orquestador (main loop) corre el análisis COMPLETO primero** — enfoque → multihilo → cadena inicial F1-F13 → cadena final F8/F9/Coda. Aquí viven los cruces; quedan **capturados en el substrate MD**.
2. **Recién entonces fan-out a profundizar cada unidad** (fase, módulo, capa). Ya NO hay riesgo de perder cruce **porque el cruce ya ocurrió** — los subagentes profundizan DENTRO del marco ya establecido.
3. **El orquestador ensambla y audita coherencia cruzada.**

**Por qué funciona:** invierte el problema. "Fan-out y luego recuperar el cruce" pierde (el cruce a resolución de retorno). "Cruce primero y luego fan-out" no pierde nada — lo valioso ya está en el archivo antes de la fragmentación, y los subagentes solo añaden la profundidad por unidad donde el main loop se diluiría haciéndolas en serie. **El orden es el truco.**

## Etapa 2 — Fan-out de subagentes (criterio de activación)

**La pregunta-pivote: ¿el valor está DENTRO de cada unidad o en el CRUCE entre unidades?**
- **Valor DENTRO de cada unidad → fan-out.** Cada unidad es rica y autónoma; un subagente por unidad da más profundidad que hacerlas en serie (en serie, las últimas se diluyen por presión de contexto). Ej: desglose técnico profundo de cada fase de un plan, auditoría de N archivos, N ramas de deep-research.
- **Valor en el CRUCE → main loop (NO fan-out).** La coherencia cruzada ES el entregable: un spine que migra entre fases, un hilo que cruza todas las unidades, gates encadenados, una síntesis que conecta todo. Fragmentar pierde justo eso. También main loop cuando es **consolidación** de algo que ya existe (no generación profunda nueva).

**Fan-out cuando se cumplen 2+:** (1) volumen/profundidad que en serie diluye; (2) independencia entre unidades (cruce bajo o capturable en contrato compartido); (3) paralelizable y el wall-clock importa; (4) el output cabe en structured-output sin que el resumen mate el valor; (5) herramienta distinta por unidad (deep-research / Playwright / code).

**Distinción clave:** "un subagente = una unidad que cabe sin resumir" es un **constraint de tamaño** (no la hagas tan grande que el subagente deba resumir), NO el trigger. El trigger es la pregunta-pivote.

**Por qué el trigger ES la pregunta-pivote — el fan-out SACRIFICA cruce (no es gratis):** un insight de cruce nace cuando UNA mente sostiene varias unidades a la vez. Al fragmentar, ningún subagente ve más que su rebanada, y su **profundidad cruda no vuelve — solo su retorno destilado**. Entonces el cruce post-fan-out ocurre a **"resolución de retorno"**, más superficial que a "resolución cruda". Hay dos niveles de cruce: (a) **entre hallazgos ya enunciados** → SÍ se recupera leyendo los retornos; (b) **el que exige profundidad cruda de dos unidades a la vez** → se PIERDE. Por eso: si el valor está en el cruce, fan-out lo destruiría → main loop. Ej. real: "el método es un activo revendible de GEN+" y "el moonshot tiene tracción cross-proyecto" son observaciones de TODO el proyecto que ningún subagente por-fase habría visto.

**Mitigar la pérdida de cruce cuando igual hay que fan-out:** (1) contexto compartido (spine/hilos) para que cada subagente flaguee conexiones al marco común; (2) pedir a cada subagente que devuelva **cross-candidates** ("señala lo que conecte con otras unidades"); (3) un **pase de síntesis dedicado** sobre todos los retornos cuyo único trabajo es cazar cruce (la cadena final F7/F9 lo hace, pero sobre retornos). **Patrón óptimo:** fan-out para profundidad → main-loop para síntesis de cruce; el techo aceptado es que ese cruce trabaja sobre retornos, no sobre profundidad cruda.

**Mecánica del fan-out (cuando se activa):**
- A cada subagente se le pasa: su unidad + el **contexto compartido que da coherencia** (el spine, el hilo transversal, la lógica de gates) + el schema de retorno.
- **Unidad:** un subagente = una unidad que cabe **sin resumir**.
- **Contrato (decisión 2026-06-09):** el subagente **DEVUELVE structured-output con schema fijo** (frentes · preguntas con filo · variables · vacíos con acción). **NUNCA prosa-resumen.**
- El orquestador **APPENDEA verbatim** cada retorno a su sección del Análisis MD. Serializado → **sin colisión de escritura**.
- El orquestador **NO trata el retorno como verdad final**: lee el MD ensamblado y AUDITA dos cosas: **(a) cobertura** (¿todas las unidades con sus campos? ¿toda variable con acción? ¿alguna huérfana?) y **(b) coherencia CRUZADA** — la pieza que los subagentes, aislados, no podían ver: ¿el spine/hilo transversal es consistente entre unidades? ¿algún gate se contradice? ¿encadena? Recuperar la coherencia cruzada es el trabajo principal del orquestador post-fan-out; sin él, ganas profundidad por unidad y pierdes el cruce.
- **Anti-pérdida:** si un subagente resumió en vez de estructurar, su unidad era demasiado grande → **re-partir** en sub-unidades. El resumen es el enemigo.

## Etapa 3 — Producto MD (entregable, generado DESDE el archivo)
- **Antes de producir: RE-LEER** `criteria.md` + el Análisis MD (paso **literal**, no de memoria). Saltarlo = el MD se vuelve otro proxy.
- El producto se construye **destilando las variables del handoff**, no desde el chat.
- **TRAZA:** cada sección del producto cita qué variable(s) consume. **Toda variable del handoff no consumida se MARCA** (loss visible) o se justifica el descarte. La pérdida silenciosa es el patrón del proxy.
- **Self-QA adversarial** item-por-item contra el kernel completo (process-criteria) + **pase de receptor** + **pase de secuencia/narrativa**, antes de mostrar.

## Etapa 4 — LOOP DE CONVERGENCIA con auditor dedicado (anti-proxy · obligatorio en L3)

**Por qué:** el self-QA del orquestador es **corruptible por el proxy** — la misma mente bajo presión de contexto audita contra una versión comprimida del kernel (fallo #1 de process-criteria; el reto AECODE tomó ~20 iteraciones manuales del usuario por esto). La cura NO es un paso único de auditoría — es un **LOOP de convergencia con un juez independiente**, ANTES de mostrar al usuario.

**El loop (lo corre el orquestador, autónomo, antes de mostrar):**
```
genera draft → AUDITOR (subagente fresco) critica → ¿pasa?
   NO → orquestador arregla los findings → re-audita ↺
   SÍ (o se agota presupuesto) → mostrar al usuario + reporte del auditor
```
El usuario entra **al final**, a decidir **gusto y dirección**, NO a cazar errores de criterio (esos los cazó y arregló el loop).

**Por qué este loop SÍ converge (y antes no):** necesita 3 piezas que el self-QA solo no tenía — (1) un **juez independiente** (el auditor, ventana fresca, kernel de disco) NO contaminado por el generador; (2) un **target fijo** (el MD-substrate, no la memoria que se difumina); (3) **criterios estables siempre presentes** (los hooks los re-anclan). Generador ≠ juez + blanco quieto + vara estable = convergencia. Faltando cualquiera, el loop gira o se para en "bien para mí".

**Job del subagente auditor** (arranca fresco, carga el kernel DESDE LA FUENTE: criteria.md + 35 reglas del SKILL + pills + process-criteria — no puede heredar el proxy). Audita **alineación a TRES cosas + kernel + recorrido**:
1. **¿Alineado al ENTREGABLE?** ¿es lo que se pidió que fuera (un plan de acción, no un análisis; un doc legible, no jerga)?
2. **¿Alineado al CÓMO / formato?** ¿la estructura es la acordada (por hitos/entregables, loop-engineered, etc.)?
3. **¿Alineado al ENFOQUE / para-qué?** ¿sirve a la causa por la que existe, o se desvió a algo genérico?
4. **El artefacto vs kernel** — criterio por criterio, adversarial → `{criterio → pasa/falla/parcial → evidencia}`.
5. **El recorrido** — ¿los lentes se aplicaron en cada decisión o solo nominalmente al final?
6. **RE-CORRE ángulos/disrupción SOBRE el producto** — el auditor no solo verifica cumplimiento: vuelve a barrer ángulos y preguntas de disrupción sobre el entregable ya hecho, para cazar **ángulos o vacíos NUEVOS** que el producto destapó. **Si emergen → RECURSIÓN: vuelve a Etapa 1 (análisis), refina las variables, re-produce, re-audita.** El producto re-alimenta el análisis.
- **Devuelve structured-output** con findings priorizados (bloqueantes vs altos/medios) + **veredicto: ¿listo o hay bloqueante?**.

**Condición de parada = CERTEZA, no agotamiento:** el loop para cuando una vuelta del auditor **no abre nada que cambie la decisión** (certeza de 1º y 2º orden: "está estructurado para descubrir a tiempo lo que falta"), o se agota el tope (default **3 vueltas** / presupuesto). NO parar solo porque "ya hice 3 cosas" — parar porque el sistema ya no produce hallazgos que muevan la aguja. Si se para por tope sin certeza, **mostrar IGUAL con los bloqueantes/vacíos abiertos marcados** (nunca en silencio fingiendo que pasó).

**Límites honestos:** el loop converge a la **vara del auditor** (tan bueno como el kernel — por eso el kernel crece); el **gusto y la dirección siguen del usuario** (el auditor verifica cumplimiento, no si es la jugada correcta); **cuesta tokens** (varias vueltas) → se justifica en L2/L3, no en ajustes menores.

Para L1 basta el self-QA. El loop con auditor dedicado es obligatorio en L2/L3 (cliente-facing, instrumento, propuesta, plan, alto impacto).

## Señales de falla (auto-chequeo)
- El producto salió del chat, no del archivo → **re-hidratación saltada**.
- Un subagente devolvió prosa-resumen → **pérdida garantizada** (la unidad era muy grande).
- Una variable del análisis desapareció sin marca en el producto → **loss silenciosa**.
- Se corrió el pipeline en una tarea L1 → **overhead innecesario** (mala calibración del router).
- El "análisis" es una shortlist de criterios en vez del kernel relevante → **recreaste el proxy**.

## La asimetría que lo justifica
Costo de escribir + releer el MD: bajo, una vez por tarea L2/L3. Costo de perder un criterio cliente-facing: las ~20 iteraciones del reto IA AECODE documentadas. **Barbell:** pipeline donde el error es caro (L2/L3), cero overhead donde es barato (L1). No es burocracia — es el seguro contra el patrón que ya costó sesiones.

---
*Origen: sesión 2026-06-09 (co-diseño con el usuario, tras ESPARQ-mapa). Análisis fuente: `_magnus/analysis/2026-06-09-pipeline-md-substrate-subagentes.md`.*
