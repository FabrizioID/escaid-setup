# Convergence Loop — Modelo operativo de Magnus (punta a punta)

Cómo opera Magnus en TODA tarea no trivial. Es la destilación del gate (magnus-checkpoint.txt, PASO 0–4) + el loop recursivo análisis↔producto + fan-out/fan-in. Léelo cuando diseñes el flujo de una tarea o entrenes el método.

## La secuencia (en orden, siempre)

### 0. ENFOQUE (para-qué) — ANTES de los ángulos
Define **específico** QUÉ se busca y POR QUÉ: *un plan que resuelve [problema], responde [duda], agiliza [proceso], conecta [con qué]*. NO vago ("hacer un plan"). El para-qué es la **semilla**: GENERA los ángulos, define el FORMATO del entregable, y se **PASA EXPLÍCITO a cada subagente**. Sin para-qué, todo flota. Para-qué vago → ángulos genéricos; específico → ángulos afilados. *(Prueba: mismo problema, distinto para-qué → distintos ángulos.)*

### 1. ANÁLISIS — exploración de variables (DIVERGIR)
Abre y USA la BD de criterios **del disco** (kernel universal + criteria.md del proyecto + pills). Barre **ÁNGULOS** (solo los que cambian la decisión) → **FRENTES** (ramas) → **PREGUNTAS DE DISRUPCIÓN** (cadena F1–F13: analogía, JTBD, pre-mortem, asimetría…). De las preguntas **NACEN las variables y los vacíos**.
- **Fan-out:** para cubrir amplio, lanza **subagentes en paralelo**, cada uno UN ángulo/frente, **ciegos entre sí**, todos con el **para-qué inyectado**. Cada uno corre la cadena en su frente → devuelve variables/vacíos. *(La cadena F1–F13 es el MÉTODO con el que exploran, no un paso aparte.)*
- Cada vacío → ACCIÓN (investigar / probar / dato-MCP / skill) o **supuesto explícito**. No asumir en silencio.

### 1b. CONVERGER — cadena sobre TODO el conjunto (FAN-IN)
El **orquestador** (no los subagentes) junta los outputs y corre la **parte convergente** de la cadena sobre el set completo: **cruzar variables, asimetría (F8), convergencia (F9), completitud**. Aquí destila la decisión. El análisis ALIMENTA al producto; no es apéndice.

### 2. PRODUCTO — desde las variables
El entregable se construye **DESDE las variables ya cruzadas**, en su formato óptimo (plan = hitos/entregables; análisis = variables; doc legible = términos explicados). **MD-first**: nace como `.md` antes del chat.

### 3–4. LOOP DE CONVERGENCIA + RECURSIÓN hasta certeza (el usuario NO es el QA)
Antes de mostrar: subagente **AUDITOR fresco** (no contaminado) ABRE la BD del disco y hace **(a)** crítica de alineación a entregable/formato/enfoque + criterios + recorrido del receptor, y **(b) RE-CORRE ángulos/disrupción SOBRE el producto** para cazar ángulos/vacíos **NUEVOS**. Si emergen → **vuelve a PASO 1 (recursión)** → refina → re-audita. Para en **CERTEZA** (1º y 2º orden: "está estructurado para descubrir lo que falta a tiempo"), **no en agotamiento**; tope 3 vueltas/presupuesto. Recién ahí muestra + reporte del auditor. El usuario decide **GUSTO y DIRECCIÓN**, no caza errores de criterio.

## Las 4 capas (quién hace qué)
| Capa | Qué es | Su trabajo en el loop |
|---|---|---|
| **HOOK** (`magnus-checkpoint.txt`) | gate corto, siempre-on, cada turno | fuerza el proceso 0→4 y dispara las otras capas. No contiene los criterios; **apunta** a la BD con su ruta |
| **SKILL** (`magnus-thinker`) | el motor | decide profundidad (criterio rápido / scan multiángulo / cadena F1–F13), carga BD + pills + threads, orquesta fan-out y auditor |
| **BD** (`general-criteria-kernel.md` + criteria.md + pills) | catálogo vivo de criterios | se **LEE DEL DISCO** (no de memoria) para que un criterio nuevo se aplique al instante. **Una sola fuente canónica** (runtime); el repo sincroniza hacia ahí |
| **SUBAGENTES** | jueces y exploradores independientes | **fan-out** (exploración paralela por ángulo) + **auditor** (juez independiente que lee la BD del disco y re-abre ángulos). El **fan-in** (converger/producto) es del orquestador |

## Reglas, objetivo y condición de salida (lo que gobierna el loop)
Un loop de convergencia se gobierna por DOS cosas — reglas + objetivo (confirmado por la literatura: el loop necesita criterios definidos y un exit condition real).

- **REGLAS (contra qué mide el auditor):** (1) la BD de criterios del disco — `general-criteria-kernel.md` + `criteria.md` del proyecto + pills; (2) las **3 alineaciones** — al ENTREGABLE, al CÓMO/formato, al ENFOQUE/para-qué; (3) el **recorrido del receptor** (¿se entiende, fluye, tiene impacto?).
- **OBJETIVO (la condición de salida):** **certeza contra el para-qué** — el auditor pasa Y una vuelta más no abre ángulos/vacíos que cambien la decisión. NO es "agotar N vueltas"; es la certeza (1º y 2º orden).
- **CONDICIÓN DE SALIDA CONCRETA (declararla en PASO 0, no dejarla abstracta):** el objetivo del loop debe escribirse como **criterios de aprobación checkables AL INICIO** — *"este loop pasa cuando ✓ A, ✓ B, ✓ C"* (la checklist exacta que el auditor usará para ESTA tarea). Un exit condition concreto evita que "certeza" sea juicio subjetivo. (Es lo que la literatura llama un goal bien especificado, como "que pasen todos los tests".)

## Las 4 mitigaciones obligatorias (las 4 causas de fallo de loops, ya cubiertas)
Todo loop falla por 4 causas; este modelo las cubre por diseño:
1. **Sin parada dura** → tope de **3 vueltas / presupuesto** (maxIterations).
2. **Objetivo subespecificado** → PASO 0 enfoque + condición de salida concreta.
3. **Context overflow en sesión larga** → el **MD-substrate** (memoria de trabajo en archivo).
4. **Sin control de costo** → presupuesto de tokens del loop.

## Por qué converge solo
**Juez independiente** (auditor) + **target fijo** (MD-substrate) + **criterios al día** (disco) + **recursión** (el producto re-alimenta el análisis) → converge sin depender de que el usuario cace errores.

## Respaldo (no es invento — es un patrón documentado)
Este modelo = **Evaluator-Optimizer** (Anthropic, *Building Effective Agents*: generador + evaluador con criterios, itera hasta PASS) + **Reflexion** (reflexionar sobre lo que falló y reintentar = nuestra recursión auditor→análisis), dentro del marco de **"loop engineering"** (2026). NO existe un plugin único que lo dé hecho y conectado a esta BD: es una arquitectura ensamblada de HOOK (criterios presentes) + SKILL (motor) + BD (reglas del disco) + SUBAGENTES (juez+exploradores). El Workflow tool del entorno es el motor de loop determinista cuando se quiere rigor de código.

## En una línea
**Enfoque específico + condición de salida concreta → divergir (subagentes con la cadena) → converger cruzando todo → producto desde variables → loop auditor+recursión hasta certeza (no agotamiento).**
