---
name: project-thread-assistant
description: Sistema de documentación de hilos y context pull para proyectos de inteligencia estratégica. Usar cuando Magnus deba abrir un hilo, documentar en vivo, cerrar una sesión, o ejecutar un context pull antes de razonar. Los threads viven en inteligencia/<proyecto>/threads/ y son nodos independientes de memoria cruzable por tags.
---

# Project Thread Assistant

Gestiona los threads de memoria de proyectos estratégicos. Cada thread es un nodo independiente que puede venir de cualquier chat o sesión. Magnus los cruza por similitud de tags antes de responder.

Los threads viven en `inteligencia/<proyecto>/threads/`. Para el formato completo de cada archivo, leer [references/thread-schema.md](references/thread-schema.md).

---

## Modos de operación

### MODO 1 — ABRIR HILO

**Cuándo:** Al inicio de una sesión cuando hay un proyecto activo, o cuando el usuario lo pide explícitamente.

**Triggers:** `abre hilo en <proyecto>`, `nuevo hilo sobre <tema>`, inicio de sesión con proyecto identificado.

**Pasos:**
1. Leer `inteligencia/<proyecto>/threads/_index.md` para conocer el historial.
2. Crear `inteligencia/<proyecto>/threads/<YYYY-MM-DD>-<slug-tema>.md` con el frontmatter y secciones vacías.
3. Registrar el hilo en `_index.md` con slug, fecha y tipo (las demás columnas se completan al cierre).
4. Tratar ese archivo como el hilo activo de la sesión.

---

### MODO 2 — CONTEXT PULL

**Cuándo:** Antes de cada respuesta de Magnus cuando hay un proyecto activo. Es automático, no requiere que el usuario lo pida.

**Propósito:** Recuperar threads previos relevantes para enriquecer el razonamiento antes de responder.

**Pasos:**
1. Identificar en el mensaje actual: tema principal, tipo de necesidad, patrones implicados.
2. Leer `inteligencia/<proyecto>/threads/_index.md`.
3. Filtrar filas por coincidencia de tags (temáticos + patrón + señal). Priorizar:
   - Tags temáticos coincidentes con el input actual
   - Tags de patrón similares (ej. si el input tiene tensión de decisión → buscar `decision_sin_validacion`)
   - Tags de señal con `riesgo` u `oportunidad` sobre el mismo tema
4. Seleccionar máximo 4 threads: priorizar los más recientes y los de mayor intensidad de aprendizaje.
5. Leer solo esos threads seleccionados.
6. Construir internamente el CONTEXT PULL BLOCK:

```
CONTEXT PULL BLOCK

Proyecto: <nombre>
Tema del input: <tema>
Patrón detectado: <patrón>
Señal detectada: <señal>

Threads relevantes encontrados:
- <slug>: <resumen corto> [tags: ...]
- <slug>: <resumen corto> [tags: ...]

Aprendizajes útiles:
- <aprendizaje 1>

Riesgos históricos relevantes:
- <riesgo 1>

Oportunidades similares detectadas:
- <oportunidad 1>

Contradicciones o tensiones encontradas:
- <contradicción 1>
```

7. Pasar este bloque como contexto adicional al razonamiento antes de producir la respuesta.

**Regla:** Si `_index.md` está vacío o no hay coincidencias de tags, proceder sin context pull. No forzar contexto irrelevante.

---

### MODO 3 — DOCUMENTAR EN VIVO

**Cuándo:** Durante la sesión, cuando Magnus detecta un momento relevante sin que el usuario lo pida.

**Triggers internos (Magnus los detecta):**
- Se tomó una decisión explícita o implícita
- Apareció un bloqueo o tensión nueva
- Se identificó una oportunidad concreta
- El usuario confirmó o rechazó algo importante
- Surgió un aprendizaje reutilizable

**Pasos:**
1. Identificar a qué sección del hilo activo pertenece el momento (Decisiones, Bloqueos, Oportunidades, Aprendizajes, etc.).
2. Actualizar esa sección del archivo del hilo activo con una línea compacta.
3. No interrumpir la conversación para anunciarlo — hacerlo en silencio, salvo que el usuario lo pida explícitamente.

**Regla:** Una línea por momento relevante, no párrafos.

---

### MODO 4 — CERRAR HILO

**Cuándo:** El usuario lo pide explícitamente al final de la sesión.

**Triggers:** `cierra el hilo`, `documenta este chat`, `guarda la sesión`

**Pasos:**
1. Leer el hilo activo para ver qué ya fue documentado en vivo.
2. Completar todas las secciones faltantes del THREAD MEMORY BLOCK:
   - Resumen ejecutivo
   - Estado del proyecto en este momento
   - Patrones detectados
   - Tags temáticos, de patrón y de señal
   - Relaciones internas del hilo
   - Señales exportables a otros proyectos
3. Actualizar la fila del hilo en `_index.md` con los tags y resumen corto finales.
4. Si hay aprendizajes, oportunidades o decisiones que aplican a todo el proyecto (no solo al hilo), proponer promoverlos a `memory/facts.md`, `memory/tensions.md` o `memory/decisions.md`.
5. Confirmar al usuario el cierre con un resumen de 3-5 puntos de lo documentado.

---

### MODO 5 — INGESTAR THREAD EXTERNO

**Cuándo:** El usuario trae un documento, resumen o chat de otra sesión para incorporarlo al proyecto.

**Triggers:** `ingesta esto al proyecto <nombre>`, `añade este hilo`, `documenta esta sesión externa`

**Pasos:**
1. Leer el contenido externo.
2. Extraer todos los campos del THREAD MEMORY BLOCK.
3. Crear `inteligencia/<proyecto>/threads/<YYYY-MM-DD>-<slug-derivado>.md` con el contenido extraído.
4. Actualizar `_index.md`.
5. Confirmar con slug y tags asignados.

---

## Reglas generales

- Los threads cerrados son inmutables — nunca sobreescribir, solo append si se reabre.
- El hilo activo de la sesión sí se edita en vivo hasta el cierre.
- `_index.md` es el único archivo que Magnus lee durante el context pull antes de decidir qué threads cargar completos. Mantenerlo preciso es crítico.
- No almacenar datos personales de terceros sin su consentimiento explícito.
- Slugs en kebab-case, fechas en ISO (YYYY-MM-DD).
- Un thread se asigna al proyecto dominante del hilo, aunque la sesión haya tocado varios proyectos.
