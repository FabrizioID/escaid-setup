# Memory Lifecycle

Protocolo para que Second Brain no se vuelva un vertedero de notas. Todo empieza como thread, solo lo durable sube a memoria.

## Niveles

| Nivel | Ruta | Uso |
|---|---|---|
| Thread | `second-brain/inteligencia/<proyecto>/threads/<fecha>-<slug>.md` | Detalle de una sesion |
| Index | `second-brain/inteligencia/<proyecto>/threads/_index.md` | Resumen rapido para context pull |
| Project memory | `second-brain/inteligencia/<proyecto>/memory/*.md` | Hechos, decisiones, tensiones, variables y criterios durables |
| Signals | `second-brain/inteligencia/<proyecto>/signals/*.md` | Datos observados separados de interpretacion |
| Analysis | `second-brain/inteligencia/<proyecto>/analysis/*.md` | Sintesis estrategica historica |
| Master Ideas | `second-brain/MASTER_IDEAS.md` | Variables, activos y necesidades cross-proyecto |

## Regla De Promocion

Promover desde thread a `memory/` solo si cumple al menos una:

- Cambia una decision futura.
- Es un hecho confirmado y estable.
- Es una tension recurrente o de alto impacto.
- Es un criterio que Magnus debe aplicar de nuevo.
- Es una variable que debe rastrearse.
- Reaparece en mas de una sesion.

Promover a `MASTER_IDEAS.md` solo si:

- Afecta o habilita otro proyecto.
- Revela un activo reutilizable.
- Revela una necesidad activa que otro proyecto puede cubrir.
- Cambia una lectura macro del ecosistema.

Promover al KERNEL universal (`magnus-thinker/references/general-criteria-kernel.md`, seccion "Criterios absorbidos del usuario") solo si:

- Es un CRITERIO de como juzgar (no un fact de un caso), Y
- Pasa la prueba 2-dominios: cambia una decision en 2+ proyectos de dominios distintos, Y
- Ningun criterio madre del kernel ya lo subsume.
- Al subir al kernel se MUEVE (se quita del `criteria.md` del proyecto), no se copia.

## No Promover

- Detalles de ejecucion de bajo valor.
- Borradores descartados.
- Preferencias momentaneas.
- Comentarios emocionales sin consecuencia operativa.
- Datos personales sensibles.
- Secretos, tokens, credenciales o rutas con secretos.

## Cierre De Hilo

Al cerrar un hilo:

1. Completar thread.
2. Actualizar `_index.md`.
3. Listar candidatos a promocion.
4. Promover directamente solo si es seguro y confirmado.
5. **Checkpoint MASTER_IDEAS (siempre):** evaluar el filtro cross-proyecto; si pasa, actualizar `MASTER_IDEAS.md` (seccion del proyecto + fecha en la tabla; crear seccion/fila si no existe). La fecha se toca solo si algo subio.
6. **Checkpoint kernel:** si un criterio del hilo pasa la prueba 2-dominios, proponer promoverlo al kernel universal (mover, no copiar).
7. Si hay duda, proponer al usuario: `Esto podria subir a memoria del proyecto / MASTER_IDEAS / kernel: ...`.

## Context Pull

Magnus lee primero `MASTER_IDEAS.md` y luego `_index.md`. Por eso:

- `_index.md` debe tener tags utiles, no genericos.
- Cada thread cerrado debe tener al menos un tag de patron y uno de senal.
- El resumen corto debe explicar por que importa, no solo que se hablo.
