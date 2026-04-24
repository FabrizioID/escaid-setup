# Memory Layout — Project Thread Assistant

Los threads viven dentro del proyecto de inteligencia estratégica correspondiente. No existe una carpeta `assistant/` separada — todo está integrado en `inteligencia/`.

## Estructura completa

```text
inteligencia/
├── _registry.md
└── <proyecto-slug>/
    ├── PROJECT.md
    ├── signals/
    ├── memory/
    │   ├── facts.md
    │   ├── variables.md
    │   ├── tensions.md
    │   ├── decisions.md
    │   └── criteria.md          ← criterios absorbidos por Magnus
    ├── threads/
    │   ├── _index.md            ← índice de tags — punto de entrada del context pull
    │   └── <YYYY-MM-DD>-<slug>.md  ← un archivo por hilo
    └── analysis/
        └── <YYYY-MM-DD>-magnus.md
```

---

## Archivos clave

### threads/_index.md
Tabla de todos los threads del proyecto. Magnus lee **solo este archivo** para decidir qué threads cargar completos durante el context pull. Mantenerlo actualizado es crítico.

### threads/<YYYY-MM-DD>-<slug>.md
Un archivo por hilo. Nodo independiente de memoria. Puede crearse desde cualquier interfaz — Codex CLI, Claude desktop, cualquier chat — siempre que escriba al mismo filesystem. El formato es el THREAD MEMORY BLOCK definido en [thread-schema.md](thread-schema.md).

### memory/criteria.md
Criterios de razonamiento que Magnus absorbió del usuario. Magnus los aplica automáticamente como lentes en F6, F8 y F9 sin que el usuario los repita.

---

## Compatibilidad entre interfaces

Dado que todo es filesystem local, cualquier cliente que tenga acceso al mismo directorio puede:
- Leer threads existentes
- Crear nuevos threads
- Actualizar `_index.md`
- Alimentar `criteria.md`

Codex CLI, Claude desktop y cualquier otra interfaz comparten el mismo pool de threads sin configuración adicional. El único requisito es que apunten al mismo `inteligencia/` raíz.

---

## Orden de lectura al inicio de sesión

1. `inteligencia/<proyecto>/PROJECT.md`
2. `inteligencia/<proyecto>/memory/variables.md`
3. `inteligencia/<proyecto>/memory/tensions.md`
4. `inteligencia/<proyecto>/memory/criteria.md`
5. `inteligencia/<proyecto>/threads/_index.md` → context pull
6. Threads seleccionados por tags (máximo 4)
