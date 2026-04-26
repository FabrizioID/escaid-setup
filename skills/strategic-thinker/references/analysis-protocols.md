# Analysis Protocols — Strategic Thinker

## PROTOCOLO: ANÁLISIS INTERNO (mono-proyecto)

```
PASO 1 — INVENTARIO
  - Lista todas las variables con su estado actual y tendencia
  - Cuenta señales totales y señales del último mes
  - Identifica variables sin actualización en >30 días → marcar como "stale"

PASO 2 — MAPEO DE CORRELACIONES
  - Para cada par de variables: ¿cómo se afectan mutuamente?
  - Construir mentalmente una tabla de cross-impact:
      [Variable A] → afecta → [Variable B] porque...
  - Identificar variables líderes (anticipan cambios) vs variables rezagadas (confirman cambios)

PASO 3 — LECTURA DE TENSIONES
  - Leer memory/tensions.md
  - Para cada tensión activa: ¿las señales recientes la intensifican o la alivian?
  - Identificar tensiones nuevas no documentadas aún

PASO 4 — SÍNTESIS
  - Extraer 3-5 insights ordenados por potencial estratégico (mayor impacto primero)
  - Cada insight: qué está pasando + por qué importa ahora

PASO 5 — RECOMENDACIÓN
  - 1-3 acciones concretas, con:
      Acción: verbo + objeto + plazo
      Por qué ahora: urgencia o ventana de oportunidad
      Riesgo principal: qué podría salir mal
```

---

## PROTOCOLO: CRUCE MACRO (multi-proyecto)

```
PASO 1 — MAPA DEL ECOSISTEMA
  - Leer _registry.md
  - Construir lista de todos los proyectos, sus dominios y conexiones declaradas
  - Identificar proyectos aislados (sin conexiones) — son candidatos a vínculos no vistos

PASO 2 — INVENTARIO MULTI-PROYECTO
  - Para cada proyecto: lista sus variables + tendencias
  - Unificar en una sola tabla de variables del ecosistema

PASO 3 — CROSS-IMPACT ENTRE PROYECTOS
  - Para cada par de proyectos conectados:
      ¿Qué variable del proyecto A afecta a qué variable del proyecto B?
      ¿La afectación es directa, indirecta o especulativa?
  - Documentar cada correlación inter-proyecto con su tipo

PASO 4 — DETECCIÓN DE SINERGIAS Y CONFLICTOS
  - Sinergia: cuando una tendencia en A amplifica o habilita una tendencia positiva en B
  - Conflicto: cuando una variable de A limita o amenaza una variable de B
  - Señalar el grado de certeza de cada uno: confirmado / probable / hipótesis

PASO 5 — SÍNTESIS MACRO
  - 3-5 insights del sistema completo (no de proyectos individuales)
  - Cada insight captura una dinámica que solo es visible al cruzar proyectos

PASO 6 — DECISIÓN MACRO
  - La recomendación principal del análisis macro
  - Debe ser accionable a nivel del ecosistema, no de un solo proyecto
```

---

## PROTOCOLO: DECISIÓN

```
PASO 1 — ENCUADRE
  - Reformular la decisión como una pregunta binaria o de opciones discretas
  - Identificar cuáles variables de la memoria son relevantes para esta decisión

PASO 2 — EVIDENCIA
  - ¿Qué dicen los hechos estables a favor y en contra de cada opción?
  - ¿Qué dicen las señales recientes?
  - ¿Hay tensiones activas que cambien si se toma cada opción?

PASO 3 — CONSECUENCIAS
  - Para cada opción: qué variables se mueven y en qué dirección
  - Identificar efectos de segundo orden (consecuencias de las consecuencias)

PASO 4 — RECOMENDACIÓN
  Estructura fija:
    Opción recomendada: <opción>
    Confianza: alta | media | baja
    Fundamento: <2-3 razones basadas en la memoria del proyecto>
    Condición de invalidación: <qué tendría que ser verdad para que esta recomendación sea incorrecta>
    Próximo trigger: <cuándo o qué evento debe llevar a revisar esta decisión>
```

---

## Formato de output: Analysis Session

```markdown
# Análisis Estratégico — <YYYY-MM-DD>

## Proyectos analizados
- [lista de proyectos con sus slugs]

## Modo
mono-proyecto | cruce-macro | decisión | disrupción

## Inventario de variables

| Variable | Proyecto | Tipo | Estado | Tendencia | Última señal |
|---|---|---|---|---|---|
| <nombre> | <slug> | <tipo> | <valor> | ↑ ↓ → ? | <fecha> |

## Variables stale (sin actualización >30 días)
- <variable> — <proyecto> — última señal: <fecha>

## Correlaciones clave

- [C1] <Variable A> (proyecto-a) → afecta → <Variable B> (proyecto-b): <explicación>

## Tensiones identificadas

- [T1] <descripción> — intensidad: alta | media | baja — _(tendencia: creciendo | estable | decayendo)_

## Sinergias detectadas

- [S1] <descripción> — proyectos: [a, b]

## Insights estratégicos

1. **<título corto>:** <desarrollo del insight — qué está pasando y por qué importa ahora>
2. ...

## Movimientos disruptivos (si aplica)

1. **<nombre del movimiento>:** <lógica disruptiva — qué supuesto rompe + qué habilita>

## Decisión recomendada

**Acción:** <verbo + objeto + plazo>
**Por qué ahora:** <urgencia o ventana>
**Riesgo principal:** <qué puede salir mal>
**Condición de invalidación:** <cuándo esta recomendación deja de ser válida>
**Próximo trigger:** <evento o fecha que dispara revisión>
```

---

## Escala de certeza

Usar siempre al describir correlaciones o insights:

| Nivel | Significado | Marcador |
|---|---|---|
| Confirmado | Respaldado por múltiples señales + facts | ✓ |
| Probable | Respaldado por 1-2 señales o inferencia directa | ~ |
| Hipótesis | Especulación razonada sin señales directas | ? |

---

## Reglas de oro del análisis

1. **Datos primero, interpretación después.** Nunca mezclar en la misma oración.
2. **Las tensiones son la energía del sistema.** Priorizarlas sobre los hechos estables.
3. **Un análisis sin acción no sirve.** Siempre terminar con una decisión recomendada.
4. **Las variables stale son una señal.** Si algo no se ha actualizado en mucho tiempo, es datos o es irrelevante — clarificarlo.
5. **El cruce macro revela lo que el mono-análisis no puede ver.** Siempre buscar dinámicas emergentes del sistema completo.
