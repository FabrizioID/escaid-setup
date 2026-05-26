# ESC-AI SkillOps

Este repo usa **SkillOps** como mapa operativo de skills, MCPs, perfiles locales y memoria.

Antes de tocar skills o memoria, leer:

1. `docs/SKILLOPS_MAP.md`
2. `docs/SKILLOPS_STANDARD.md`
3. `docs/SKILLOPS_HEALTHCHECK.md`
4. `docs/MEMORY_ARCHITECTURE.md`

Reglas clave:

- Activar skills por `Skill ID`, pero decidir rapido por `Nombre operativo`.
- No escribir credenciales en el repo; las pills locales viven fuera del setup.
- Escribir memoria nueva siempre en `<workspace>/second-brain/inteligencia`.
- Tratar `<workspace>/inteligencia` como legacy/fallback de lectura.
- Para hilos de proyecto usar `second-brain/inteligencia/<proyecto>/threads/_index.md` como puerta de entrada.
- Para cruce global usar `<workspace>/second-brain/MASTER_IDEAS.md`.
