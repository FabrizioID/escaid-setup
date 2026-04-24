# Coda Magnus — Protocolo de Debrief Meta-Cognitivo

## Propósito

La Coda Magnus es el mecanismo de entrenamiento mental del sistema. Después de cada decisión tomada con Magnus Thinker, se ejecuta un debrief que mapea qué preguntas quebraron el problema, qué fases fueron más generativas, y qué patrón cognitivo produjo la solución. Con el tiempo, el usuario internaliza los movimientos mentales sin necesidad de guía externa.

**Se ejecuta siempre. Es la última acción de cada sesión.**

---

## Protocolo de construcción

### Paso 1 — Identificar las preguntas decisivas

Revisar el recorrido de la sesión y seleccionar las 2-4 preguntas que más movieron el pensamiento:
- ¿Cuál pregunta reveló algo que el usuario no veía?
- ¿Cuál generó la alternativa ganadora o eliminó una mala alternativa?
- ¿Cuál cambió el encuadre del problema?
- ¿Cuál identificó la variable realmente crítica?

Anotar la fase de origen y el efecto que tuvo.

### Paso 2 — Identificar las fases más generativas

Para este problema en particular, ¿cuáles fases aportaron más?

Fases de alta generación en este problema:
- Señalar la fase, qué generó, y por qué fue clave en ESTE contexto
- No es una lista genérica — es específica a esta sesión

### Paso 3 — Nombrar el patrón cognitivo

¿Qué tipo de movimiento mental produjo la solución?

Patrones comunes (no excluyentes):
- `Inversión de supuesto` — se asumía X, al invertirlo apareció la solución
- `Sustracción deliberada` — al eliminar un elemento "imprescindible" se liberó la solución
- `First Principles` — descomponer hasta la física/lógica básica y reconstruir
- `Reubicación del problema` — el problema no estaba donde parecía
- `Combinación inesperada` — unir dos elementos que nunca se combinaban
- `Asimetría temporal` — la ventana de oportunidad era más estrecha o más larga de lo visible
- `Convexidad` — elegir la opción que mejora con el caos
- `Leverage point` — encontrar el punto de intervención mínimo con efecto sistémico
- `JTBD reframe` — el trabajo real a hacer era diferente al trabajo declarado
- `Pre-Mortem reversal` — imaginar el fracaso reveló la variable crítica oculta

### Paso 4 — Formular el "para internalizar"

Una pregunta o movimiento concreto que el usuario puede guardar en su mente como heurística reutilizable. Debe ser:
- Específica, no genérica
- Formulable en una oración
- Aplicable a problemas de la misma forma en el futuro

### Paso 5 — Documentar el moonshot

El moonshot elegido en F9 no muere aquí. Se documenta con:
- Descripción de la idea
- Por qué no se ejecuta ahora (qué condición falta)
- Cuándo reevaluar (trigger o condición de activación)

---

## Formato de output

```markdown
# Coda Magnus — <YYYY-MM-DD>

## Preguntas que quebraron el problema
1. [F_] "<pregunta exacta tal como se formuló>" → <qué reveló o generó, en una oración>
2. [F_] "<pregunta>" → <efecto>
3. [F_] "<pregunta>" → <efecto> *(opcional)*

## Fases más generativas en esta sesión
| Fase | Qué generó | Por qué fue decisiva aquí |
|---|---|---|
| F_ <nombre> | <contribución concreta> | <razón contextual> |
| F_ <nombre> | <contribución concreta> | <razón contextual> |

## Patrón cognitivo de esta solución
**Tipo:** <etiqueta del patrón o combinación>
**Descripción:** <cómo funcionó el movimiento mental en este caso concreto>

## Para internalizar
- **Pregunta más productiva:** "<pregunta>"
- **Movimiento clave:** <qué hizo el salto cognitivo — en una oración concreta>
- **Próxima vez que veas un problema con esta forma:** <recomendación de dónde empezar>

## Moonshot vivo
**Idea:** <descripción>
**Por qué no se ejecuta ahora:** <condición que falta>
**Cuándo reevaluar:** <trigger o condición de activación>
```

---

## Reglas del debrief

- La Coda es específica a esta sesión, no genérica. Nada de "pensar lateral es útil" sin anclar al caso.
- Las preguntas deben citarse tal como se formularon, no parafraseadas.
- El patrón cognitivo es una etiqueta que el usuario puede reconocer la próxima vez.
- El moonshot se preserva con su razón — no "no es viable ahora" sino por qué exactamente.
- En MODO ENTRENAMIENTO: después del formato estándar, añadir una sección explicando el "por qué" del patrón cognitivo con más detalle.

---

## En MODO ENTRENAMIENTO — sección adicional

```markdown
## Por qué funcionó este patrón (modo entrenamiento)

<Explicación de 2-4 oraciones sobre la mecánica cognitiva detrás del patrón.
Por ejemplo: "La inversión de supuesto funciona porque el cerebro tiende a optimizar
dentro de los límites que asume como fijos. Al declarar explícitamente un supuesto y
preguntarse si es falso, se abre un espacio de soluciones que normalmente no existe.
En este caso, el supuesto era que [X], y al invertirlo apareció [Y].">

## Cómo reconocer este tipo de problema en el futuro

<Descripción de las señales que indican que este patrón es el adecuado.
Por ejemplo: "Cuando el problema parece tener solo una configuración posible,
o cuando todos los actores del sistema dan un elemento por sentado, es señal
de que hay un supuesto no cuestionado esperando ser invertido.">
```
