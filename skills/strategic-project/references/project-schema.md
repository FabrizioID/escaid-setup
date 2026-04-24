# Project Schema — Strategic Project

## Estructura de directorios

```
inteligencia/
├── _registry.md
└── <proyecto-slug>/
    ├── PROJECT.md
    ├── signals/
    │   ├── 2026-04-19.md
    │   └── 2026-04-25.md
    ├── memory/
    │   ├── facts.md
    │   ├── variables.md
    │   ├── tensions.md
    │   └── decisions.md
    ├── threads/
    │   ├── _index.md
    │   └── <YYYY-MM-DD>-<slug-hilo>.md
    └── analysis/
        └── 2026-04-19-session.md
```

---

## PROJECT.md

```markdown
---
name: <nombre legible>
slug: <kebab-case>
created: <YYYY-MM-DD>
purpose: <una oración: qué se busca entender o lograr con este proyecto>
domain: negocio | mercado | personal | operativo | otro
connections: []
---

## Variables rastreadas

| Variable | Tipo | Fuente | Estado actual | Última actualización |
|---|---|---|---|---|
| <nombre> | cuantitativo \| cualitativo \| binario | observación \| dato externo \| inferencia \| inferencia-cruzada | <valor o descripción> | <YYYY-MM-DD> |

## Propósito extendido

<Descripción opcional más detallada del alcance del proyecto>
```

---

## _registry.md

```markdown
# Registry de Proyectos de Inteligencia

| Proyecto | Slug | Dominio | Variables | Señales | Conexiones | Última señal |
|---|---|---|---|---|---|---|
| <nombre> | <slug> | <dominio> | N | N | [slug-b, slug-c] | <YYYY-MM-DD> |
```

---

## signals/<YYYY-MM-DD>.md

```markdown
# Señales — <YYYY-MM-DD>

## Señal 1

**Fuente:** <origen: observación propia / noticia / dato externo / conversación>
**Variables afectadas:** <lista de variables del PROJECT.md que impacta>

**Dato observado:**
<Qué pasó o qué se observó — solo hechos, sin interpretación>

**Interpretación:**
<Qué significa esto en el contexto del proyecto — puede incluir hipótesis>

---

## Señal 2 (si hay más de una en el día)

...
```

---

## memory/variables.md

```markdown
# Variables — <nombre proyecto>

| Variable | Tipo | Fuente | Estado actual | Tendencia | Última actualización |
|---|---|---|---|---|---|
| <nombre> | cuantitativo | observación | <valor> | ↑ subiendo \| ↓ bajando \| → estable \| ? incierto | <YYYY-MM-DD> |
```

---

## memory/facts.md

```markdown
# Hechos Estables — <nombre proyecto>

Hechos confirmados que no cambian con cada señal. Se actualizan solo cuando hay evidencia sólida de cambio.

- **[F1]** <hecho> _(confirmado: YYYY-MM-DD)_
- **[F2]** <hecho> _(confirmado: YYYY-MM-DD)_
```

---

## memory/tensions.md

```markdown
# Tensiones y Oportunidades — <nombre proyecto>

## Tensiones activas

- **[T1]** <descripción de la tensión> — impacto: alto | medio | bajo — _(identificada: YYYY-MM-DD)_

## Oportunidades detectadas

- **[O1]** <descripción> — ventana: <plazo estimado> — _(identificada: YYYY-MM-DD)_

## Resueltas

- **[T0]** <descripción> — _(resuelta: YYYY-MM-DD, cómo: ...)_
```

---

## memory/decisions.md

```markdown
# Decisiones Estratégicas — <nombre proyecto>

- **[D1]** <decisión tomada> — _(fecha: YYYY-MM-DD, basada en: [T1, S2])_
- **[D2]** <decisión tomada> — _(fecha: YYYY-MM-DD)_
```

---

## threads/_index.md

Índice de todos los threads del proyecto. Es el punto de entrada del context pull. Se actualiza cada vez que se abre o cierra un thread.

```markdown
# Thread Index — <nombre proyecto>

| Slug | Fecha | Tags temáticos | Tags patrón | Tags señal | Resumen corto |
|---|---|---|---|---|---|
| 2026-04-10-pricing-decision | 2026-04-10 | pricing, ventas | decision_sin_validacion | riesgo, contradiccion | Equipo decidió bajar precio sin validar con clientes clave |
| 2026-04-15-cliente-tension | 2026-04-15 | cliente, operaciones | bloqueo_por_desalineacion | bloqueo | Cliente A frenó avance por falta de aprobación interna |
```

---

## threads/<YYYY-MM-DD>-<slug-hilo>.md

Cada thread es un nodo independiente de memoria. Puede venir de cualquier chat o sesión externa. Se documenta con el THREAD MEMORY BLOCK completo.

```markdown
---
slug: <YYYY-MM-DD>-<slug-hilo>
proyecto: <nombre proyecto>
fecha: <YYYY-MM-DD>
tipo: decision | analisis | problema | oportunidad | sintesis | estrategia
---

## Objetivo del hilo
<Qué se quería resolver, decidir, entender o proponer>

## Resumen ejecutivo
- <síntesis corta del contenido central>

## Estado del proyecto en este momento
- <lectura rápida de cómo va el proyecto>

## Avances detectados
- <progreso real observado>

## Problemas o bloqueos
- <frenos, trabas, tensiones>

## Decisiones tomadas
- <lo que se decidió, explícita o implícitamente>

## Soluciones o propuestas
- <caminos de acción que surgieron>

## Patrones detectados
- <repeticiones, comportamientos, riesgos, oportunidades observadas>

## Oportunidades detectadas
- <oportunidades concretas identificadas>

## Aprendizajes reutilizables
- <conocimiento reusable que deja el hilo>

## Preguntas abiertas
- <lo que sigue sin resolverse>

## Próximos pasos
- <acciones derivadas>

## Tags temáticos
- <pricing | ventas | operaciones | producto | marketing | cliente | ...>

## Tags de patrón
- <decision_sin_validacion | bloqueo_por_desalineacion | oportunidad_no_aprovechada | sobrecarga_operativa | falta_de_dueno | avance_sin_cierre | repeticion_de_error | dependencia_excesiva | ...>

## Tags de señal
- <riesgo | oportunidad | contradiccion | aprendizaje | insight | hipotesis | decision | bloqueo>

## Relaciones internas del hilo
- <Problema A → generó decisión B>
- <Bloqueo C → afecta avance D>

## Señales exportables a otros proyectos
- <qué partes de este hilo podrían servir para razonamientos en otros proyectos>
```

---

## analysis/<YYYY-MM-DD>-session.md

Ver formato completo en [strategic-thinker/references/analysis-protocols.md].

---

## Tipos de variables

| Tipo | Cuándo usarlo | Ejemplos |
|---|---|---|
| `cuantitativo` | Variable con valor numérico medible | precio, volumen, tasa, % |
| `cualitativo` | Variable descriptiva sin escala numérica | percepción, posicionamiento, cultura |
| `binario` | Variable de dos estados | sí/no, activo/inactivo, aprobado/rechazado |

## Fuentes de variables

| Fuente | Significado |
|---|---|
| `observación` | El usuario lo vio o experimentó directamente |
| `dato externo` | Proviene de una fuente externa (artículo, reporte, estadística) |
| `inferencia` | Deducido a partir de otras variables del mismo proyecto |
| `inferencia-cruzada` | Inferido desde variables de otro proyecto conectado |
