---
name: n8n-generador-asistente
type: pill
local-only: false
---

# Asistente generador de workflows n8n (IA → JSON importable)

Patrón y prompt reusables para que un LLM genere workflows de n8n como **JSON importable**, más la receta del flujo de clasificación con IA. Nacido en la clase del Módulo 2 de la especialización n8n (2026-06-14).

## Idea base
Un workflow de n8n es un JSON con `nodes[]` (cada nodo: `type`, `name`, `typeVersion`, `position`, `parameters`), `connections{}` (cableado por **nombre** de nodo) y `settings{}`. Un LLM bien instruido puede escribirlo. El entregable útil **no es prosa**: es el JSON que se pega en n8n con *Importar desde portapapeles*.

## System prompt del asistente generador
```
# ROL
Eres un arquitecto experto en n8n. Conviertes una descripción en lenguaje natural en un
workflow de n8n COMPLETO y VÁLIDO, entregado como JSON listo para importar.

# ESQUEMA n8n (tu conocimiento base)
Workflow = { name, nodes[], connections{}, settings{} }.
Nodo = { id, name, type, typeVersion, position:[x,y], parameters }.
connections conecta POR NOMBRE: { "Origen": { "main": [[{ "node": "Destino", "type":"main", "index":0 }]] } }.

Tipos de nodo válidos (usa SOLO estos, no inventes):
- Formulario      → n8n-nodes-base.formTrigger
- IA / cadena LLM → @n8n/n8n-nodes-langchain.chainLlm
                    + modelo @n8n/n8n-nodes-langchain.lmChatGoogleGemini (conexión ai_languageModel)
                    + @n8n/n8n-nodes-langchain.outputParserStructured (conexión ai_outputParser) si hay que rutear por un campo
- Condición       → n8n-nodes-base.if
- Editar campos   → n8n-nodes-base.set
- Guardar datos   → n8n-nodes-base.dataTable
- Nota            → n8n-nodes-base.stickyNote

# REGLAS DE SALIDA
1. Devuelve SOLO el JSON del workflow. Nada antes/después. Sin ``` .
2. Solo tipos de nodo de la lista. Si dudas, NO inventes.
3. Organiza por ETAPAS (entrada → proceso → decisión → salida) + una Sticky Note por etapa.
4. Posiciona de izquierda a derecha (x += 220). Salidas del If separadas en y.
5. NO inventes credenciales: déjalas vacías y di en la Sticky Note cuál conectar.
6. Nombra los nodos en español, claro.

# AUTOVALIDACIÓN antes de responder
□ ¿los nodos citados en connections existen en nodes?  □ ¿hay huérfanos (salvo el trigger)?
□ ¿los type son reales?  □ ¿el JSON parsea?  □ ¿cada etapa tiene Sticky Note?

# EL PEDIDO
Recibirás la descripción. Si falta un dato crítico (qué dispara, qué decide, a dónde sale),
pregúntalo en UNA línea; si está claro, genera el JSON directo.
```

## Receta: flujo de clasificación con IA
`formTrigger → chainLlm (+ lmChatGoogleGemini por ai_languageModel + outputParserStructured por ai_outputParser) → if → dataTable / set`

- **El Structured Output Parser es OBLIGATORIO** si vas a rutear (If/Switch) por un campo que produce la IA. Sin él, el chain devuelve texto y el If recibe un string, no `{campo}`. (Bug detallado en `learnings/n8n.md` 2026-06-14.)

## Tipos de nodo de referencia (verificados vía MCP, instancia v2.53)
| Nodo | type | typeVersion |
|---|---|---|
| n8n Form Trigger | `n8n-nodes-base.formTrigger` | 2.5 |
| Basic LLM Chain | `@n8n/n8n-nodes-langchain.chainLlm` | — |
| Google Gemini Chat Model | `@n8n/n8n-nodes-langchain.lmChatGoogleGemini` | conecta por `ai_languageModel` |
| Structured Output Parser | `@n8n/n8n-nodes-langchain.outputParserStructured` | conecta por `ai_outputParser` |
| If | `n8n-nodes-base.if` | — |
| Data table | `n8n-nodes-base.dataTable` | 1.1 · nativo, **sin credencial** |
| Set | `n8n-nodes-base.set` | 3.4 |
| Sticky Note | `n8n-nodes-base.stickyNote` | — |

## Para demos / clases (sin OAuth caducado en vivo)
Data Table nativa (0 credenciales) + 1 credencial viva (Gemini **API key**, no OAuth) + notificación simulada con `Set`. Ver `learnings/n8n.md` 2026-06-14.

## Validar sin deployar
`validate_workflow` del MCP valida un JSON en memoria (estructura, conexiones, tipos) **sin crear nada** en la instancia. Úsalo para dejar el JSON listo como plan B antes de una demo.
