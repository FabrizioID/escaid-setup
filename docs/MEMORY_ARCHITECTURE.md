# Memory Architecture - ESC-AI

Arquitectura operativa para que Magnus, Codex, Claude Code y otros agentes guarden y recuperen aprendizaje sin bifurcar memoria.

## Decision Canonica

La raiz oficial de escritura es:

`<workspace>/second-brain/inteligencia`

En esta maquina:

`C:\Users\USUARIO\Desktop\GEN+ TEMP\Machine Learning\second-brain\inteligencia`

`<workspace>/inteligencia` queda como raiz historica/legacy local. Se puede leer para recuperacion, pero no se debe usar como destino nuevo de escritura.

## Modelo Mental

El sistema funciona como un Obsidian operativo sin depender de Obsidian:

- Markdown como formato portable.
- Carpetas por proyecto como vaults logicos.
- `threads/_index.md` como indice rapido para no leer todo.
- Tags tematicos, tags de patron y tags de senal como conectores.
- `memory/*.md` como conocimiento consolidado del proyecto.
- `MASTER_IDEAS.md` como capa global cross-proyecto.

Obsidian puede usarse como UI opcional encima de `second-brain/`, pero no es requerido para que Magnus cruce variables.

## Estructura Por Proyecto

```text
second-brain/
  MASTER_IDEAS.md
  inteligencia/
  _registry.md
  <proyecto>/
    PROJECT.md
    threads/
      _index.md
      YYYY-MM-DD-slug.md
    memory/
      facts.md
      decisions.md
      tensions.md
      variables.md
      criteria.md
    signals/
      YYYY-MM-DD.md
    analysis/
      YYYY-MM-DD-session.md
```

## Reglas De Escritura

1. Todo hilo nuevo se crea en `second-brain/inteligencia/<proyecto>/threads/`.
2. Todo hilo debe registrarse en `second-brain/inteligencia/<proyecto>/threads/_index.md`.
3. Los aprendizajes durables se promueven desde threads hacia `memory/`.
4. Las conexiones cross-proyecto fuertes se promueven a `second-brain/MASTER_IDEAS.md`.
5. `<workspace>/inteligencia` no recibe escritura nueva salvo migraciones controladas.

## Reglas De Lectura De Magnus

1. Leer siempre `second-brain/MASTER_IDEAS.md`.
2. Si hay proyecto activo, leer primero `second-brain/inteligencia/<proyecto>/threads/_index.md`.
3. Cargar solo 2-4 threads relevantes por tags/patrones/senales.
4. Para scan global, leer indices de `second-brain/inteligencia/**/threads/_index.md`.
5. Leer `<workspace>/inteligencia/**/threads/_index.md` solo como legacy/fallback mientras termine la migracion.

## Estado De Migracion

El 2026-05-24 se consolido la memoria viva dentro del repo `second-brain`. Primero se copiaron a `inteligencia/` los archivos que solo existian en `second-brain/inteligencia`; despues se sincronizo la version canonica completa hacia `second-brain/inteligencia`.

Reportes locales:

- `second-brain/inteligencia/_migration/copied-from-second-brain-2026-05-24.txt`
- `second-brain/inteligencia/_migration/conflicts-second-brain-2026-05-24.json`
- `second-brain/inteligencia/_migration/resolution-2026-05-24.md`
- `second-brain/inteligencia/_migration/MASTER_IDEAS-userprofile-legacy-2026-05-24.md`

Los conflictos se resolvieron manteniendo como canonica la version sincronizada en `second-brain/inteligencia`, porque contenia informacion igual o mas reciente.
