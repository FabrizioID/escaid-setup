# Presentation Content Pill

Activar cuando Magnus construye el **contenido** y la **secuencia** de slides (deck, clase, ponencia, pitch, sustentacion). Es el lente de criterio que juzga lo que la cadena F1-F13 produce para slides: que dice cada slide, por que, en que orden.

**Limite:** esta pill decide CONTENIDO (mensaje, foco, valor, emocion, secuencia narrativa). La EJECUCION VISUAL (layout, densidad, variacion de diagramacion, analogia visual, dosificacion de disrupcion, saturacion) la decide `disruptive-presentations`. La forma de proceso/handoff la lleva `presentation-orchestrator`.

**No duplicar — referenciar:**
- Psicologia de mensaje, motores, hooks, frameworks -> `marketing-pill`.
- Si el termino vende/asusta/confunde al receptor -> `terminology-perception-pill` + kernel #22 (lenguaje cliente vs interno).
- Datos/evidencia/afirmaciones -> Research Gate del kernel (verificar antes de afirmar; nunca inventar cifras).

## 1. Modo comunicacional (decidir PRIMERO)

Clasificar el deck por intencion; cambia los pesos de dato / evidencia / analogia / disrupcion / texto. No es gusto visual — es el receptor.

| Modo | Objetivo | Datos | Evidencia | Analogia | Disrupcion |
|---|---|---|---|---|---|
| Clase / formacion | ensenar y fijar | medio-alto | ejemplos/ejercicios | alto | medio-alto |
| Keynote / vision | inspirar, cambiar perspectiva | medio | tendencias/senales | medio-alto | medio |
| Comercial / venta | convencer, activar decision | alto | muy alto (fuentes, demos, casos) | muy bajo | bajo |
| Tecnico / implementacion | alinear ejecucion | alto | alto (arquitectura, riesgos) | bajo | bajo-medio |
| Mixto | combinar | variable — declarar pesos por bloque |

Regla: ajustar la comunicacion al publico real, no al gusto del agente. Un gerente, un estudiante, un comite tecnico y una audiencia de keynote no leen ni deciden igual.

## 2. Criterios de contenido (la vara por slide)

**C1 — Un foco por slide.** ¿El mensaje se resume en UNA frase de <10 palabras? Si no -> son dos slides. (Clase/taller puede densificar porque el presentador explica; ponencia y comercial NO — la audiencia lee todo a la vez.)

**C2 — Carga de valor.** Cada slide aporta al menos una: `dato | tendencia | insight | evidencia | caso real | comparacion | objecion resuelta | marco de decision | beneficio | CTA`. Sin carga de valor -> mejorar, fusionar, volver separador o eliminar. Orchestrator no ordena bullets; cada slide construye sustancia.

**C3 — Nada es aleatorio.** Cada dato/cifra/evidencia entra solo si responde las TRES: (1) ¿que emocion genera? (urgencia/sorpresa/alivio/ambicion) (2) ¿que postura instala? ("esto ya paso", "estas en riesgo", "hay oportunidad") (3) ¿hacia donde empuja — que slide sigue? Si no hay las tres claras, el dato no va ahi. Un stat correcto en la slide equivocada no construye nada.

**C4 — Tono por fase (comercial).** Una venta tiene dos fases con tonos distintos:
- *Fase 1, diagnostico/conciencia:* sintesis interpretativa, tono consultor. La audiencia saca su propia conclusion; no se fuerza. **Test:** ¿la frase de cierre podria aparecer en un reporte McKinsey/Gartner? Si suena a eslogan o pitch -> reescribir. (✓ "El sector se mueve hacia la IA, pero la mayoria sigue en etapas tempranas." ✗ "El mercado ya decidio. ¿Donde estas tu?")
- *Fase 2, solucion/cierre:* directo, CTA natural, posicionamiento.

**C5 — Marca/CTA por momento.** El logo del header ya hace el trabajo de marca; no repetir nombre/CTA en el cuerpo salvo cierre.
- Apertura/intermedia -> sin CTA (el dato/logo habla solo).
- Cierre/penultima -> CTA explicito permitido.
- Audiencia tecnica: el dato con fuente ES el argumento; CTA prematuro genera rechazo. Fuente siempre visible junto al dato.

**C6 — Continuidad narrativa + Story Spine.** Antes de la secuencia, construir el spine: `Antes (lo que cree la audiencia) -> Problema -> Giro -> Demostracion -> Resultado -> Frase madre (la unica idea a recordar)`. Cada slide responde: ¿por que existe aqui? ¿que sabe/siente la audiencia antes y despues? ¿que pregunta deja abierta para la siguiente? Si una slide no mueve la historia -> fusionar, eliminar o volver apoyo.

**C7 — Foto-worthy.** ¿Un asistente sacaria el celular para fotografiar esta slide? Si no, el mensaje no impacta. Pide: un elemento dominante que se entienda en 2s, una frase que valga la pena guardar, espacio en blanco generoso. (Es test de impacto del mensaje; la composicion que lo logra la ejecuta disruptive.)

**C8 — Evidencia externa lleva lectura.** Cuando una slide muestra una senal externa (lanzamiento de modelo, anuncio de Big Tech, regulacion, hito de mercado, dato de un tercero), verificar la fuente y SIEMPRE acompanarla de interpretacion estrategica: por que importa para ESTA audiencia y que implica. No toda slide debe verse "de marca propia" — algunas deben parecer evidencia externa, pero nunca sin la lectura que la conecta al receptor.

## Regla

El criterio decide QUE dice cada slide y POR QUE; disruptive ejecuta COMO se ve. Una slide bonita que no instala un mensaje ni mueve la historia, falla. Una slide sin carga de valor no existe.
