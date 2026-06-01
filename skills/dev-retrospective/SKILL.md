---
name: dev-retrospective
description: Sistema de aprendizaje continuo por sesión de desarrollo. Lee learnings acumulados al inicio de trabajo en un dominio. Documenta bugs nuevos, fixes y patrones al cierre de una sesión. Evita repetir los mismos errores en futuros desarrollos.
---

# Skill: Dev Retrospective

Sistema que convierte cada sesión de desarrollo en conocimiento reutilizable. Opera en dos momentos: **antes de trabajar** (leer lo aprendido) y **después de resolver** (documentar lo nuevo).

---

## CUÁNDO ACTIVAR

Invocar esta skill cuando:
- El usuario pide "documentar lo aprendido en esta sesión"
- El usuario dice "guarda esto para que no lo olvides"
- Al cerrar un dev session con bugs resueltos no triviales
- Al inicio de trabajo en un dominio si el usuario pide contexto previo

No invocar para: cambios de código simples, ajustes de texto, correcciones obvias.

---

## MODO A — Cargar Learnings (inicio de sesión)

Antes de trabajar en un dominio, leer el learning file correspondiente:

```
learnings/n8n.md          → workflows n8n, binarios, task runner
learnings/evolution-api.md → WhatsApp/Evolution, media, mensajes
learnings/openai-api.md    → gpt-image-2, embeddings, multipart
learnings/google-apis.md   → Drive, Sheets, auth flows
learnings/docker-vps.md    → contenedores, env vars, crashes
learnings/general.md       → patrones cross-dominio
```

Si el learning file existe → leerlo en silencio antes de tocar cualquier nodo o código.
Si no existe → continuar sin él (se creará al cierre).

---

## MODO B — Documentar Nuevo Learning (cierre de sesión)

### Cuándo registrar un learning

Registrar cuando se resuelve cualquiera de:
- **Bug silencioso**: el código parece correcto pero falla en runtime
- **Comportamiento no documentado**: algo que la doc oficial no menciona
- **Error que tomó >15 min resolver**: tiempo = señal de que no era obvio
- **Gotcha de plataforma**: límite, scope, modo de fallo específico de la tool
- **Fix que cambió el enfoque completo**: si la solución fue conceptualmente diferente al intento inicial

No registrar: typos, errores de sintaxis obvios, bugs con mensaje de error claro.

### Protocolo de documentación

1. **Abrir el learning file** del dominio relevante (`learnings/<dominio>.md`)
2. Si no existe, crearlo con el header estándar
3. **Agregar entrada** al inicio del archivo (más reciente primero) con el formato estándar
4. **Actualizar el índice** `learnings/INDEX.md`

### Formato de entrada estándar

```markdown
## [FECHA] — [Título corto del bug/gotcha]

**Dominio**: n8n / Evolution API / OpenAI / Docker / etc.
**Severidad**: 🔴 Crítico | 🟡 Importante | 🟢 Menor
**Contexto**: qué se estaba construyendo cuando apareció

**Síntoma**:
Lo que se observa en producción/logs (no la causa, el efecto visible).

**Causa raíz**:
Por qué ocurre. Incluir el mecanismo interno si se conoce.

**Fix aplicado**:
```código o config exacta que resolvió el problema```

**Cómo detectarlo antes**:
Qué verificar en el próximo desarrollo similar para no llegar al mismo punto.

**Tags**: #binarios #n8n #httpRequest #gpt-image-2 (para búsqueda futura)
```

### Header estándar para archivo nuevo

```markdown
# Learnings: [Dominio]

Errores, gotchas y patrones aprendidos en sesiones de desarrollo real.
Más reciente primero. Leer antes de trabajar en este dominio.

---
```

---

## MODO C — Búsqueda en Learnings

Si el usuario pregunta "¿ya tuvimos este error antes?" o "¿cómo resolvimos X?":

1. Leer los learning files relevantes al dominio
2. Buscar por tags o palabras clave
3. Citar la entrada exacta con fecha y fix

---

## Reglas

- Nunca suavizar los bugs: documentar exactamente qué falló y por qué
- El "fix aplicado" debe ser el código/config exacto, no una descripción
- "Cómo detectarlo antes" es la parte más valiosa — es lo que ahorra tiempo futuro
- Si el mismo bug aparece dos veces, actualizar la entrada existente con "Re-ocurrencia: [fecha]"
- Los learning files son de lectura frecuente — mantenerlos concisos

---

## Integración con pills existentes

Si un learning es suficientemente importante como para convertirse en pill de una skill:
1. Crear entrada en el learning file (siempre)
2. Evaluar si debe ir también al pill de la skill relevante (ej: `n8n-binary-gotchas.md`)
3. Si va al pill → agregar referencia en el learning: "Ver también: pills/n8n-binary-gotchas.md"
