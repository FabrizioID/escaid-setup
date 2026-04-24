# Thread Schema — Project Thread Assistant

## threads/_index.md

Punto de entrada del context pull. Magnus lee solo este archivo para decidir qué threads cargar.

```markdown
# Thread Index — <nombre proyecto>

| Slug | Fecha | Tipo | Tags temáticos | Tags patrón | Tags señal | Resumen corto |
|---|---|---|---|---|---|---|
| 2026-04-10-pricing-decision | 2026-04-10 | decision | pricing, ventas | decision_sin_validacion | riesgo, contradiccion | Equipo bajó precio sin validar con clientes clave |
| 2026-04-15-cliente-tension | 2026-04-15 | problema | cliente, operaciones | bloqueo_por_desalineacion | bloqueo | Cliente A frenó avance por falta de aprobación interna |
```

---

## threads/<YYYY-MM-DD>-<slug-hilo>.md — THREAD MEMORY BLOCK

```markdown
---
slug: <YYYY-MM-DD>-<slug-hilo>
proyecto: <nombre proyecto>
fecha: <YYYY-MM-DD>
tipo: decision | analisis | problema | oportunidad | sintesis | estrategia
---

## Objetivo del hilo
<Qué se quería resolver, decidir, entender o proponer en esta sesión>

## Resumen ejecutivo
- <síntesis corta — máximo 3 bullets>

## Estado del proyecto en este momento
- <lectura rápida de cómo va el proyecto al momento del hilo>

## Avances detectados
- <progreso real observado durante la sesión>

## Problemas o bloqueos
- <frenos, trabas, tensiones que aparecieron>

## Decisiones tomadas
- <lo que se decidió, explícita o implícitamente>

## Soluciones o propuestas
- <caminos de acción que surgieron>

## Patrones detectados
- <repeticiones, comportamientos, riesgos u oportunidades observadas>

## Oportunidades detectadas
- <oportunidades concretas identificadas>

## Aprendizajes reutilizables
- <conocimiento que sirve para futuras sesiones o proyectos>

## Preguntas abiertas
- <lo que sigue sin resolverse o requiere profundización>

## Próximos pasos
- <acciones derivadas del hilo>

## Tags temáticos
- pricing | ventas | operaciones | producto | marketing | cliente | tesis | automatizacion | ...

## Tags de patrón
- decision_sin_validacion | bloqueo_por_desalineacion | oportunidad_no_aprovechada
- sobrecarga_operativa | falta_de_dueno | avance_sin_cierre | repeticion_de_error | dependencia_excesiva

## Tags de señal
- riesgo | oportunidad | contradiccion | aprendizaje | insight | hipotesis | decision | bloqueo

## Relaciones internas del hilo
- Problema A → generó decisión B
- Bloqueo C → afecta avance D
- Oportunidad E → depende de recurso F

## Señales exportables a otros proyectos
- <qué partes de este hilo podrían enriquecer razonamientos en otros proyectos>
```

---

## Tipos de thread

| Tipo | Cuándo usarlo |
|---|---|
| `decision` | La sesión giró en torno a una decisión tomada o pendiente |
| `analisis` | Se analizó una situación sin llegar a decisión |
| `problema` | Apareció un bloqueo, tensión o fallo a resolver |
| `oportunidad` | Se identificó una ventana de acción concreta |
| `sintesis` | Se consolidaron múltiples sesiones o inputs en un resumen |
| `estrategia` | Se trazó dirección o plan de mayor alcance |

---

## Tags de patrón — referencia completa

| Tag | Significado |
|---|---|
| `decision_sin_validacion` | Se decidió sin checar con quienes ejecutan o son afectados |
| `bloqueo_por_desalineacion` | El freno viene de personas o áreas que no están en la misma página |
| `oportunidad_no_aprovechada` | Ventana detectada que no se tomó |
| `sobrecarga_operativa` | El equipo o proyecto tiene más carga de la que puede manejar |
| `falta_de_dueno` | Nadie tiene ownership claro de algo importante |
| `avance_sin_cierre` | Se avanzó pero no se cerró ni documentó el resultado |
| `repeticion_de_error` | Mismo error que ya ocurrió antes |
| `dependencia_excesiva` | El proyecto depende demasiado de una persona, recurso o externo |

---

## Regla de calidad de tags

Un thread no sale solo con tags temáticos. Siempre debe incluir al menos un tag de patrón y uno de señal. Eso es lo que permite que el context pull sea útil.

---

