# Second Brain / Memoria - Potenciacion Vertical ESC-AI

Fecha: 2026-05-24

## Objetivo

Consolidar Second Brain como memoria canonica para Magnus, Codex, Claude Code y Antigravity: un sistema de almacenamiento en Markdown que preserve threads, decisiones, criterios, variables, tensiones y aprendizajes reutilizables.

La meta no es solo guardar conversaciones. La meta es que Magnus pueda recuperar contexto, cruzar variables entre proyectos y detectar senales que podrian perderse en sesiones aisladas.

## Raiz canonica

Ruta oficial de escritura:

`<workspace>/second-brain/inteligencia/`

Ruta legacy:

`<workspace>/inteligencia/`

La ruta legacy solo se usa como fallback de lectura o migracion. Ninguna skill debe crear proyectos, threads, senales ni analysis nuevos ahi.

## Skills del vertical

| Skill | Rol operativo | Estado |
| --- | --- | --- |
| `project-thread-assistant` | Abre, documenta, cierra y consulta threads por proyecto. | Canonica en `second-brain/inteligencia/`. |
| `interaction-memory` | Captura aprendizajes utiles de una sesion y decide que se promueve a memoria. | Complementaria; no crea memoria estrategica paralela si existe proyecto activo. |
| `strategic-project` | Crea y mantiene proyectos, variables, senales y memoria estable. | Normalizada a Second Brain. |
| `strategic-thinker` | Cruza proyectos, variables y tensiones para producir analysis. | Normalizada a Second Brain. |
| `magnus-thinker` | Ejecuta context pull y razonamiento activo sobre la memoria. | Con contrato explicito de Second Brain. |

## Flujo canonico

1. Identificar proyecto activo.
2. Abrir o reutilizar thread en `second-brain/inteligencia/<proyecto>/threads/`.
3. Usar `interaction-memory` para filtrar que vale la pena guardar y que seria ruido.
4. Documentar hitos relevantes durante la sesion.
5. Cerrar thread con resumen, decisiones, preguntas abiertas, tags y enlaces.
6. Promover solo aprendizajes estables a `memory/`.
7. Promover ideas transversales a `MASTER_IDEAS.md` cuando afecten mas de un proyecto.
8. Antes de razonar, Magnus lee `MASTER_IDEAS.md`, el indice del proyecto y maximo 2-4 threads relevantes.

## Criterio de promocion

Un dato queda en el thread si solo explica la conversacion.

Un dato sube a `memory/` si cambia como debe operar el proyecto, una decision, una variable o un criterio reutilizable.

Un dato sube a `MASTER_IDEAS.md` si es transversal, reaplicable y no depende de un solo proyecto.

`interaction-memory` opera como filtro de promocion: extrae hechos, decisiones, criterios, variables, tensiones, pendientes y artefactos; luego decide si quedan en thread, suben a `memory/` o se proponen para `MASTER_IDEAS.md`.

## Que no hacer

- No escribir memoria nueva en `inteligencia/` legacy.
- No guardar ruido conversacional como memoria estable.
- No copiar secretos, tokens ni credenciales en threads.
- No leer todos los threads por defecto; usar indice y tags.
- No promover ideas locales a `MASTER_IDEAS.md` sin valor transversal.

## Obsidian

Obsidian puede ser una UI opcional para navegar los Markdown, pero no es el motor de conexion. La conexion operativa la hacen:

- tags,
- indices,
- memoria estable,
- analysis,
- context pull de Magnus.

Por eso el sistema puede funcionar en GitHub y ser consumido por Codex, Claude Code y Antigravity sin depender de Obsidian.

## Resultado

Second Brain queda listo como fuente canonica de inteligencia acumulada. Las skills fuertes de memoria ya apuntan a la misma raiz y comparten contrato de ciclo de vida.
