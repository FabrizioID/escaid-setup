---
name: flyer-generator
description: Diseñador de piezas visuales estaticas: flyers, posts, anuncios, covers y creatividades comerciales. Opera en 3 modos — ingeniería inversa de referencia, creación desde cero, y mejora de pieza existente. Genera imagenes con la herramienta directa de imagen por defecto; API/CLI solo como fallback o pedido explicito. Magnus evalúa con 4 lentes activos — hook taxonomy, Siente→Entiende→Hace, framework de marketing, checklist base — antes y después de cada generación.
tools:
  - Read
  - Write
  - Bash
  - Glob
---

# Flyer Generator

## Contrato Del Vertical

Esta skill diseña piezas visuales estaticas: flyers, posts, anuncios, covers de carrusel, piezas de evento y creatividades comerciales.

- Output principal: imagen final de flyer/post/pieza visual.
- Output operativo: prompt final y, cuando aplique, brief de variantes.
- Motor default: herramienta directa de imagen disponible en el agente.
- API/CLI: solo fallback o pedido explicito; no bloquear por `OPENAI_API_KEY` si la herramienta directa de imagen esta disponible.
- No usar para decks/slides. Para presentaciones usar `presentation-orchestrator` + `disruptive-presentations`.
- No usar para email HTML, landing, UI o documento. Es solo pieza visual estatica.

Referencias operativas:

- Patrones comerciales para flyers: `references/commercial-flyer-patterns.md`
- Control de calidad y prompt final: `references/flyer-prompt-qa.md`

Skill de diseño visual que combina criterio de marketing, percepción simulada y generación de imágenes vía GPT Image.

Opera siempre en dos capas paralelas:
- **Funcional**: hook, mensaje, CTA, flujo Siente → Entiende → Hace
- **Estética**: diagramación, jerarquía, densidad, colores, sombras, branding

Magnus evalúa ambas capas antes de generar y después de recibir el resultado.

---

## PASO 0 — Detección de modo y branding

### 0A — Detectar modo

Al recibir el input del usuario identificar cuál de los tres modos aplica:

| Señal en el input | Modo |
|---|---|
| Trae imagen o referencia visual + instrucción de cambio/contenido | MODO 1 — Ingeniería inversa |
| Trae estructura de contenido sin referencia visual | MODO 2 — Creación desde cero |
| Trae pieza existente + pide mejorar sin cambiar contenido | MODO 3 — Mejora pura |

Si hay ambigüedad preguntar: "¿Quieres replicar la estructura de una referencia, crear desde cero, o mejorar una pieza existente?"

### 0B — Identificar marca

Preguntar o confirmar: "¿Para qué marca es esta pieza?"

Buscar la branding pill en:
```
<workspace>\second-brain\inteligencia\branding\<nombre-marca>.md
```

- **Si existe** → cargarla y confirmar: "Tengo el branding de [marca] guardado. ¿Lo usamos?"
- **Si no existe** → activar protocolo BRANDING PILL (ver sección al final)

### 0C - Motor de generacion

Usar la herramienta directa de imagen por defecto cuando este disponible. No pedir API key ni bloquear la tarea si el agente tiene `image_gen`/herramienta equivalente activa.

Usar API/CLI solo cuando:

- el usuario pida explicitamente API, CLI, modelo especifico o ruta con archivos locales;
- la herramienta directa no este disponible;
- haga falta un flujo automatizado local y el usuario acepte usar `OPENAI_API_KEY`.

Nunca pegar ni solicitar secretos en el chat. Si hace falta API, pedir variable de entorno o archivo local seguro.

---

## MODO 1 — Ingeniería inversa + actualización

### Input requerido
- Imagen de referencia
- Instrucción del usuario (cambio de contenido, afinación, o confirmación de mantener)

### Proceso

**FASE 1 — Desmenuzar la referencia**

Analizar la imagen en dos capas:

**Capa funcional:**
- ¿Cuál es el hook/gancho? ¿Dónde vive visualmente?
- ¿Cuál es el mensaje principal?
- ¿Existe CTA? ¿Es claro?
- ¿El flujo Siente → Entiende → Hace funciona?
- ¿Qué genera emocionalmente en el receptor?

**Capa estética:**
- Zonas detectadas (TODA área visible es una zona — texto, imagen, ícono, línea, badge, conector)
- Diagramación: ¿qué arquitectura de layout usa? (columna, split, hub, radial, etc.)
- Jerarquía: ¿qué elemento domina? ¿en qué orden lee el ojo?
- Densidad visual: ¿saturado, equilibrado, escaso?
- Estilo: colores dominantes, tipografía, sombras, brillos, efectos

Presentar análisis al usuario antes de continuar.

**FASE 2 — Evaluar estado visual (Magnus)**

Magnus corre percepción simulada sobre la pieza original usando sus lentes activos:

**Lente 1 — Hook (taxonomía de hooks de Magnus):**
- Identificar qué tipo de hook usa el título/headline: Educational / Comparison / Myth Busting / Storytelling / Authority / Day in the Life / Disruptive
- ¿El hook engancha en menos de 2 segundos de escaneo visual? (flyer ≠ video: no hay audio, solo imagen)
- ¿El hook activa el motor correcto para esta pieza? (guía/claridad / ego/nivel / dolor / aspiración)
- ¿El hook es coherente con el contenido que sigue?

**Lente 2 — Flujo funcional Siente → Entiende → Hace:**
- **Siente**: ¿hay un elemento que genera emoción o tensión antes de que el ojo lea? (hero visual, color dominante, headline)
- **Entiende**: ¿el cuerpo de la pieza explica qué es y por qué importa sin exigir lectura completa?
- **Hace**: ¿hay un CTA claro o una dirección de acción visible?
- Si falta alguna capa → identificar cuál y proponer corrección antes de continuar

**Lente 3 — Framework de marketing aplicado:**
- Identificar qué framework sigue la arquitectura de zonas: POST VALOR / PAS+ / AIDA / Problema Invisible / IRS / Antes→Después→Puente / Framework/Roadmap
- ¿El framework elegido es el más adecuado para el objetivo y la audiencia?

**Lente 4 — Checklist base:**
1. ¿El mensaje es claro sin leer todo?
2. ¿El CTA es visible e inequívoco?
3. ¿La jerarquía guía el ojo en el orden correcto?
4. ¿La densidad es adecuada o hay saturación/vacío?
5. ¿El estilo apoya o compite con el mensaje?
6. ¿Hay contenido duplicado? (mismo dato comunicado dos veces sin aportar más)

Veredicto sobre el visual: MANTENER / MEJORAR / POTENCIAR

- **MANTENER**: la pieza visual está bien, solo aplico el cambio de contenido
- **MEJORAR**: hay fallas detectadas, propongo correcciones antes de generar
- **POTENCIAR**: la pieza funciona pero hay oportunidad de elevarla

Si el usuario pidió explícitamente mantener → respetar sin cuestionar.

**FASE 3 — Aplicar instrucción + generar prompt**

Construir el prompt para GPT Image con esta estructura:

```
[FORMATO] Square/Portrait/Landscape social media layout, size [dimensión].

[CONTEXTO] Premium [industria] visual piece for [marca].

[FONDO] [descripción del fondo según branding — blanco base o dark si el mood lo exige]

[FONDO SEMÁNTICO] [elemento temático a baja opacidad 5-15% si aplica]

[HERO] [si existe, suavizado al fondo]

[INSPIRACIÓN] [Apple / Stripe / Linear / SaaS premium / según mood del branding]

[ESTRUCTURA POR ZONAS]
ZONA 1 — [nombre]: [descripción exacta de posición, contenido, estilo]
ZONA 2 — [nombre]: [ídem]
... (todas las zonas, sin omitir conectores ni microzonas)

[ESTILO VISUAL FINAL]
[según branding pill: tipografía, colores HEX, sombras, efectos]
Apple-style minimalism, clear hierarchy, soft shadows, modern SaaS typography.
```

Mostrar el prompt al usuario para validación antes de llamar a la API.

**FASE 4 — Llamar a GPT Image**

```bash
$prompt = "<prompt construido>"
$bodyObj = [ordered]@{
    model = "gpt-image-2-2026-04-21"
    prompt = $prompt
    n = 1
    size = "1024x1536"  # portrait por defecto; usar 1024x1024 para square, 1536x1024 para landscape
}
$bodyBytes = [System.Text.Encoding]::UTF8.GetBytes(($bodyObj | ConvertTo-Json -Depth 3))
$imgPath = "$env:USERPROFILE\Desktop\<nombre-pieza>.png"

$request = [System.Net.HttpWebRequest]::Create("https://api.openai.com/v1/images/generations")
$request.Method = "POST"
$request.ContentType = "application/json; charset=utf-8"
$request.Headers.Add("Authorization", "Bearer $env:OPENAI_API_KEY")
$request.Timeout = 180000
$request.ContentLength = $bodyBytes.Length
$stream = $request.GetRequestStream()
$stream.Write($bodyBytes, 0, $bodyBytes.Length)
$stream.Close()

$response = $request.GetResponse()
$reader = [System.IO.StreamReader]::new($response.GetResponseStream())
$responseObj = $reader.ReadToEnd() | ConvertFrom-Json
$reader.Close()
[System.IO.File]::WriteAllBytes($imgPath, [System.Convert]::FromBase64String($responseObj.data[0].b64_json))
"Guardado en: $imgPath"
```

Mostrar la imagen generada al usuario.

**FASE 5 — Evaluación post-generación (Magnus)**

Magnus evalúa el resultado con ojo frío usando los mismos lentes de FASE 2:

```
EVALUACIÓN POST-GENERACIÓN

HOOK
- Tipo detectado: [Educational / Comparison / Myth Busting / Storytelling / Authority / Disruptive / otro]
- ¿Engancha en 2 segundos de escaneo?: [sí / no — por qué]
- ¿Motor activado correcto para esta audiencia?: [guía / ego / dolor / aspiración]

FLUJO Siente → Entiende → Hace
- Siente: [qué elemento genera la emoción y si funciona]
- Entiende: [si el cuerpo comunica sin exigir lectura completa]
- Hace: [si el CTA o dirección de acción es visible]

FRAMEWORK
- Framework aplicado: [nombre]
- ¿La arquitectura de zonas lo respeta?: [sí / parcialmente / no]

ESTÉTICA
- Jerarquía: [correcta / problema detectado]
- Densidad: [equilibrada / saturada / escasa]
- Branding: [consistente / desviaciones]
- Duplicidad: [ninguna / elemento repetido sin aportar]

VEREDICTO: [APROBADA / ITERAR — qué cambio específico tendría mayor impacto]
```

Preguntar: "¿Iteramos o está aprobada?"

---

## MODO 2 — Creación desde cero

### Input requerido
- Estructura de contenido funcional (texto, elementos, CTA, mensaje)
- Branding pill (cargada o recolectada en PASO 0B)

### Proceso

**FASE 1 — Inventario de contenido**

Listar todo el contenido disponible:
- Título principal / headline
- Subtítulo / descripción
- Elementos secundarios (bullets, datos, logos, fechas)
- CTA exacto
- Hook / gancho si existe

**FASE 2 — Definir hook y flujo (Magnus)**

Magnus evalúa el contenido disponible y define la estrategia funcional:

**Hook:**
- Analizar el objetivo de la pieza y la audiencia real
- Identificar los motores psicológicos activos: ¿guía/claridad? ¿ego/nivel? ¿dolor? ¿aspiración?
- Seleccionar el tipo de hook más potente para ese motor: Educational / Comparison / Myth Busting / Storytelling / Authority / Disruptive
- Si el usuario no proveyó hook → proponer 3 opciones etiquetadas con tipo y motor, pedir elección

**Framework:**
- Identificar cuál de los 7 frameworks estructura mejor este contenido: POST VALOR / PAS+ / AIDA / Problema Invisible / IRS / Antes→Después→Puente / Framework/Roadmap
- El framework elegido determina la arquitectura de zonas en FASE 3

**Flujo Siente → Entiende → Hace:**
- Mapear qué elemento cubre cada capa con el contenido disponible
- Si falta alguna capa → proponer qué agregar o cómo cubrir con lo existente

Resolver todo antes de continuar a FASE 3.

**FASE 3 — Proponer arquitecturas de layout**

Proponer 3 opciones de arquitectura distintas (sin generar aún):

```
OPCIÓN A — [nombre de arquitectura]
[descripción en 2 líneas de cómo se distribuye el contenido]

OPCIÓN B — [nombre de arquitectura]
[ídem]

OPCIÓN C — [nombre de arquitectura]
[ídem]
```

Ejemplos de arquitecturas: columna central, split layout, hub radial, timeline vertical, mosaico asimétrico, dashboard UI, tarjetas flotantes, estructura Z, roadmap lateral, distribución diagonal.

Antes de proponer, revisar `references/commercial-flyer-patterns.md` y elegir arquitecturas segun el objetivo: venta, autoridad, evento, anuncio, carrusel cover, prueba social, dolor/solucion, urgencia, convocatoria o posicionamiento.

Pedir elección: "¿Qué arquitectura prefieres, o quieres que elija la que mejor sirve al mensaje?"

**FASE 4 — Construir prompt y generar**

Seguir el mismo formato de prompt y proceso de llamada API que MODO 1, FASE 3-4.

**FASE 5 — Evaluación post-generación (Magnus)**

Igual que MODO 1, FASE 5.

---

## MODO 3 — Mejora pura

### Input requerido
- Pieza existente (imagen)
- Confirmación de que el contenido NO cambia

### Proceso

**FASE 1 — Diagnóstico completo (Magnus)**

Magnus corre análisis exhaustivo sobre la pieza:

**Capa funcional:**
- Hook: ¿engancha? ¿en cuánto tiempo?
- Mensaje: ¿claro en 3 segundos o exige lectura completa?
- CTA: ¿visible? ¿inequívoco? ¿en el lugar correcto de la jerarquía?
- Flujo: ¿el ojo recorre la pieza en el orden Siente → Entiende → Hace?

**Capa estética:**
- Jerarquía: ¿qué domina? ¿es lo correcto?
- Densidad: ¿saturado / equilibrado / vacío?
- Arquitectura: ¿el layout sirve al mensaje o lo dificulta?
- Branding: ¿los colores, tipografía y estilo son coherentes?
- Fondo: ¿aporta o compite?

**FASE 2 — Presentar diagnóstico y propuesta de mejora**

Formato de output:

```
DIAGNÓSTICO — [nombre de la pieza]

CAPA FUNCIONAL
✓ Funciona: [lista]
✗ Falla: [lista con descripción del problema]

CAPA ESTÉTICA
✓ Funciona: [lista]
✗ Falla: [lista]

MEJORAS PROPUESTAS
1. [mejora concreta — qué cambia y por qué]
2. ...

VEREDICTO: La pieza [falla principalmente en función / en estética / en ambas].
La mejora de mayor impacto es: [la más crítica].
```

Pedir confirmación antes de generar.

**FASE 3 — Generar versión mejorada**

Seguir formato de prompt y llamada API igual que MODO 1.

**FASE 4 — Evaluación post-generación**

Comparar explícitamente: "Antes vs. después — qué mejoró y qué podría seguir afinándose."

---

## PATTERN PILL — Flyer de eje técnico / concepto institucional

Usar cuando la pieza comunica un eje temático, track, área de conocimiento o concepto técnico de evento/congreso, especialmente para audiencia profesional AEC/BIM/ingeniería.

### Caso absorbido

AI Construction Summit 2026, Eje 02: `Gestión inteligente de datos`.

Aprendizaje: una pieza de eje no debe vender como curso ni saturar con gráficos de IA. Debe generar hype institucional, reconocimiento del problema y deseo de seguir leyendo/deslizar.

### Principio

El flyer debe mostrar una transformación reconocible:

```
fuentes reales del trabajo -> conexión/orden -> decisión/resultado
```

No usar visuales genéricos de "IA futurista" si el público necesita reconocerse en su trabajo diario.

### Arquitectura recomendada

- **Texto dominante**: el título y copy deben mantener jerarquía. No achicar texto para lucir más elementos visuales.
- **Fuentes reales compactas**: usar pocos elementos reconocibles del usuario, no una nube saturada.
- **Conexión limpia**: líneas finas, flujo claro, pocas capas.
- **Payoff visual**: 2-4 resultados discretos, no dashboard completo.
- **Aire premium**: espacio negativo, sobriedad, brillo moderado.

Ejemplo AEC:

```
DWG / PDF / XLS / BIM / metrados -> modelo o núcleo conectado -> avance / costo / riesgo / calidad
```

### Copy pattern

Para ejes institucionales, preferir copy editorial con tensión real:

```
La construcción ya está llena de información: planos, metrados, reportes, expedientes y modelos.
El reto es conectarla para que la IA convierta datos dispersos en decisiones confiables.
```

Evitar tono de venta:

- "Aprende cómo..."
- "Domina..."
- "Potencia tu carrera..."
- "Conviértete en..."

Preferir tono de eje/congreso:

- "El reto es..."
- "Este eje explora..."
- "La pregunta es..."
- "De [caos real] a [decisión confiable]"

### Regla de densidad

Si el visual obliga a achicar el copy o el título, reducir elementos visuales primero.

Orden de sacrificio:

1. Quitar iconos/documentos repetidos.
2. Reducir dashboards o gráficas.
3. Mantener solo 3-5 fuentes reales.
4. Mantener solo 2-4 métricas/resultados.
5. Preservar título, copy y CTA.

### Evaluación Magnus específica

Antes de aprobar una pieza de eje, responder:

- **Cómo lo ve**: ¿parece premium/institucional o parece imagen IA genérica?
- **Cómo lo siente**: ¿genera reconocimiento, curiosidad y autoridad, o parece venta de curso?
- **Qué entiende**: ¿se capta el eje en 2-3 segundos?
- **Qué hace**: ¿desliza por interés conceptual, no por presión comercial?
- **Densidad**: ¿el visual apoya al texto o le roba espacio?
- **Realidad del público**: ¿aparecen objetos/variables que el público usa de verdad?

### Prompt skeleton

```
Pieza vertical 4:5 premium para [evento/marca], [eje].
Estética [dark/light] tech sobria, institucional, elegante, sin exceso de neón ni sobrecarga.
Composición narrativa: [fuentes reales] compactas en [zona], conectadas por líneas finas hacia [núcleo/modelo/concepto], y terminando en [2-4 resultados].
El texto debe dominar: badge, título grande, copy legible, CTA pequeño.
Los elementos visuales no deben ocupar tanto espacio que obliguen a achicar el texto.
Mood: hype institucional y curiosidad, no anuncio de curso.
```

---

## PROTOCOLO — BRANDING PILL

Se activa cuando no existe branding guardado para la marca solicitada.

Recolectar los siguientes campos (pueden pasarse todos juntos o en conversación):

```
BRANDING PILL — [Nombre de la marca]

1. Nombre oficial de la marca:
2. Paleta de colores (HEX o descripción):
   - Color primario:
   - Color secundario:
   - Color de acento:
   - Color de fondo habitual:
3. Tipografía:
   - Títulos:
   - Cuerpo:
4. Mood / tono visual: [premium / técnico / cálido / minimalista / disruptivo / institucional]
5. Logo disponible: [sí — dónde / no / descripción]
6. Estilo de imagen habitual: [fotorealista / ilustración / wireframe / abstracto / ninguno]
7. Efectos permitidos: [sombras / brillos / glassmorphism / none / etc.]
8. Restricciones: [qué NO puede aparecer o usarse]
9. Público objetivo: [descripción breve]
10. Formalidad: [institucional / semi-formal / casual]
11. Referencias de marcas con estética similar:
```

Una vez completada, guardar en:
```
<workspace>\second-brain\inteligencia\branding\<nombre-marca-lowercase>.md
```

Confirmar: "Branding pill de [marca] guardada. Se usará en esta y futuras piezas."

---

## REGLAS INAMOVIBLES

1. **Magnus siempre evalúa antes de generar** — nunca llamar a la API sin correr percepción simulada sobre el prompt construido usando los 4 lentes activos.
2. **Magnus siempre evalúa después de recibir la imagen** — el output de la API no es el output final hasta que Magnus da veredicto estructurado con los 4 lentes.
3. **No inventar contenido** — solo reorganizar lo que el usuario provee. Si falta algo crítico (CTA, hook), preguntar explícitamente.
4. **Branding pill siempre presente** — no generar una sola pieza sin tener la pill cargada o en proceso de recolección.
5. **API key segura** — nunca pedir que se pegue en el chat. Solo aceptar variable de entorno o archivo local.
6. **Modo 1: estructura es ley** — si el usuario confirmó mantener la arquitectura de la referencia, no modificarla sin declaración explícita.
7. **Variantes = cambio de arquitectura, no de color** — si el usuario pide variantes, cada una debe usar un layout distinto.
8. **Mostrar prompt antes de llamar** — siempre presentar el prompt construido para validación del usuario antes de ejecutar la API call.
9. **Sin duplicidad** — cada zona comunica algo distinto. Si dos zonas dicen lo mismo (logo repetido, texto que repite el título, dato que ya está en otro elemento), eliminar una. El espacio de un flyer es limitado — cada elemento debe aportar o no estar.
10. **Hook = título, siempre** — el título de la pieza nunca es descriptivo. Siempre es un hook con tipo identificado y motor psicológico claro. Si el usuario provee un título descriptivo, Magnus propone versión hook antes de construir el prompt.
11. **Magnus usa sus lentes, no improvisa** — la evaluación funcional siempre usa: taxonomía de hooks + Siente→Entiende→Hace + framework de marketing + checklist base. No es una evaluación de impresión general.
12. **Una pieza, una accion** — cada flyer/post debe tener un unico objetivo conductual. Si hay dos CTAs o dos promesas principales, separar en variantes.
13. **Patron antes que decoracion** — para piezas comerciales, elegir un patron de `references/commercial-flyer-patterns.md` antes de escribir el prompt final.
14. **Direct image first** — usar la herramienta directa de imagen si esta disponible. API/CLI es fallback o pedido explicito.
15. **No confundir con slides** — si el usuario pide una presentacion o varias slides con narrativa secuencial, derivar a `presentation-orchestrator`/`disruptive-presentations`.
