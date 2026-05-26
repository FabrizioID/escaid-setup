# n8n v2 Operational Patterns For ESC-AI

Referencia absorbida desde auditoria externa. No reemplaza `n8n-workflow-builder`; solo refuerza su criterio.

## Principio

La ruta oficial ESC-AI para n8n sigue siendo:

1. Leer pill local de credenciales en silencio.
2. Intentar MCP n8n.
3. Si el MCP no cubre la operacion, usar REST API directa.
4. Validar antes de crear, actualizar o activar.
5. No escribir secretos dentro del workflow JSON.

## Workflows Como Codigo

Cuando un workflow sea importante o reutilizable, guardar una copia JSON versionada en el repo del proyecto o en una carpeta `workflows/`.

Estructura recomendada:

```text
workflows/
  main-orchestrator.json
  sub-fetch-data.json
  sub-process-data.json
  sub-output.json
```

Usar esta ruta para:

- revisar diffs antes de cambios grandes;
- regenerar workflows si se rompe la instancia;
- compartir patrones con Claude, Codex y Antigravity;
- mantener templates importables.

## Patron Orquestador

Usar un workflow padre para coordinar sub-workflows cuando el proceso tenga varias responsabilidades.

```text
Trigger
-> Sub-workflow: fetch/input
-> Wait/Human review si aplica
-> Sub-workflow: process/AI
-> Sub-workflow: output/write
```

Reglas:

- cada sub-workflow hace una cosa;
- el workflow padre decide orden, aprobaciones y errores;
- los sub-workflows devuelven datos normalizados;
- evitar duplicar credenciales en JSON exportado.

## Descomponer Mega-flujos

Un mega-flujo no se debe dividir solo porque se ve grande. Se divide cuando aparecen responsabilidades separables y testeables.

Candidatos buenos para sub-workflow:

- captura/normalizacion de entrada;
- enrichment externo por API;
- bloque IA con prompt propio;
- guardado en Sheets/Drive/CRM;
- notificacion por WhatsApp/email;
- manejo de errores reutilizable;
- transformacion compleja en Code Node.

Candidatos malos:

- dos nodos que solo existen para una condicion local;
- pasos que dependen de muchas variables temporales del padre;
- logic blocks que aun no se entienden;
- workflow critico sin backup ni ejecucion de prueba.

Proceso recomendado:

1. Documentar el flujo actual sin tocarlo.
2. Marcar bloques con sticky notes o documentacion Markdown.
3. Elegir un bloque de bajo riesgo.
4. Crear sub-workflow con input/output explicito.
5. Conectar desde el padre.
6. Probar equivalencia con los mismos datos.
7. Repetir.

## Documentacion De Workflow

Todo workflow importante debe poder explicarse en menos de una pagina:

| Campo | Contenido |
|---|---|
| Objetivo | Para que existe |
| Trigger | Como empieza |
| Entrada | Campos minimos esperados |
| Bloques | Fases principales |
| Salidas | Que escribe/responde/notifica |
| Credenciales | Nombres de credenciales n8n, sin secretos |
| Riesgos | Nodos fragiles, APIs, limites, datos obligatorios |
| Sub-workflows | Hijos llamados y contrato input/output |

Si el usuario pide orden visual, priorizar sticky notes y nombres de nodos claros antes de refactor estructural.

## Human In The Loop

Para aprobacion humana, preferir Wait/Form nodes cuando el flujo necesita pausar y reanudar.

Patron:

```text
Trigger -> Generar datos -> Wait/Form Review -> IF aprobado -> Accion final
```

Cuidado:

- no simular aprobacion con campos aun no existentes;
- dejar claro que dato espera el nodo IF;
- probar con una ejecucion manual antes de activar.

## Sub-workflows Importados

Al importar workflows JSON, revisar `Execute Workflow`/sub-workflow nodes. Si quedan "out of date" o pierden referencia:

1. leer el workflow actual;
2. identificar nodos afectados;
3. recrear o actualizar la referencia al workflow hijo;
4. validar;
5. probar desde el workflow padre.

## Normalizacion Y Merge

Cuando se mezclan fuentes distintas:

1. normalizar cada fuente inmediatamente despues de leerla;
2. emitir un schema comun;
3. hacer merge;
4. deduplicar;
5. puntuar/rankear si aplica.

Schema base sugerido:

```json
{
  "title": "string",
  "url": "string",
  "source": "string",
  "timestamp": "ISO date string",
  "summary": "string",
  "score": 0
}
```

## Prueba Segura

Antes de crear o modificar:

- probar APIs externas fuera del workflow cuando sea viable;
- validar nodos y expresiones;
- ejecutar con datos de muestra;
- reportar ID, nombre, estado y URL directa del workflow.
