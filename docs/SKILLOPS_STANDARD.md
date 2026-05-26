# SkillOps Standard - ESC-AI

Este documento define como debe operar una skill del ecosistema ESC-AI para maximizar velocidad diaria, portabilidad entre agentes y continuidad de memoria.

## Objetivo

Las skills existen para liberar tiempo operativo y aumentar criterio estrategico. Una skill no debe hacer que el usuario pierda tiempo habilitando herramientas; debe arrancar rapido, saber que MCP o credencial necesita, y degradar con una ruta alternativa clara cuando algo falle.

## Arquitectura En 3 Capas

Cada capacidad importante debe separarse en tres capas:

| Capa | Funcion | Que contiene | Que no contiene |
|---|---|---|---|
| Skill de dominio | Saber hacer el trabajo | criterios, workflow, formatos, decisiones, QA | secretos, tokens, rutas fragiles como unica opcion |
| Skill/MCP de apertura | Habilitar herramienta rapido | nombres de MCP, comandos, rutas esperadas, pruebas de conexion, fallback | logica profunda del dominio |
| Pill local | Valores operativos locales | tokens, API keys, IDs de cuenta, URLs reales, nombres de credenciales | instrucciones largas, secretos en repo |

Regla: la skill de dominio puede decir "usa el pill local X", pero no debe imprimir su contenido. El pill local puede existir en la maquina del usuario, fuera del repo o ignorado por git.

## Contrato De Arranque Rapido

Toda skill operativa debe tener un bloque "Arranque rapido" con:

1. Trigger: cuando usarla.
2. Primera accion: que leer o verificar.
3. MCP/tool esperado: nombre exacto o aliases.
4. Pill local esperado: ruta absoluta y ruta portable.
5. Prueba rapida: accion no destructiva para confirmar conexion.
6. Ruta fallback: que hacer si MCP no esta disponible.
7. Tiempo objetivo: idealmente menos de 30 segundos para diagnostico basico.

## Rutas Portables

Toda ruta debe escribirse en dos formas:

| Tipo | Ejemplo |
|---|---|
| Absoluta Windows | `C:\Users\USUARIO\.codex\skills\n8n-workflow-builder\pills\n8n-credentials.md` |
| Portable | `%USERPROFILE%\.codex\skills\n8n-workflow-builder\pills\n8n-credentials.md` |

Si aplica para Claude Code, Antigravity u otro cliente, tambien indicar el archivo de configuracion esperado:

| Cliente | Config probable |
|---|---|
| Codex | `%USERPROFILE%\.codex\config.toml` |
| Claude Code | `.mcp.json`, `.claude/settings.json`, `~/.claude.json` |
| Antigravity | su panel/config de MCP local; usar los mismos comandos y env vars del MCP |

## Formato Minimo De Skill Operativa

Cada `SKILL.md` de una skill operativa deberia incluir:

```markdown
## Arranque rapido

- Dominio: <que resuelve>
- MCP esperado: <mcp__... o nombre servidor>
- Pill local: <ruta>
- Prueba segura: <tool o comando no destructivo>
- Fallback: <ruta alternativa>

## Operacion

1. Validar conexion.
2. Leer contexto o artefacto actual.
3. Ejecutar cambio minimo viable.
4. Verificar resultado.
5. Reportar estado, limitaciones y siguiente accion.

## Seguridad

- No imprimir secretos.
- No escribir tokens en repo.
- No modificar/destruir sin confirmacion si la accion es sensible.
```

## Estado De Salud

Cada skill debe clasificarse asi:

| Estado | Significado |
|---|---|
| Verde | Skill instalada, MCP/tool activo o fallback probado, prueba rapida OK |
| Amarillo | Skill instalada, pero falta auth, MCP parcial, version desfasada o fallback manual |
| Rojo | Skill faltante, referencia rota, MCP no disponible o no hay ruta clara |
| Gris | Skill de criterio/dominio sin herramienta externa; no requiere MCP |

## Regla De Velocidad

Si una skill tarda mas de 30-60 segundos en habilitarse, el agente debe:

1. Decir el bloqueo exacto.
2. Usar fallback si existe.
3. Registrar la mejora necesaria en el mapa operativo.
4. No entrar en bucles largos de diagnostico salvo que el usuario pida reparar la integracion.

## Relacion Con Magnus

Magnus no debe ver las skills como inventario pasivo. Debe usarlas como herramientas:

- Si el problema es operativo, delega a la skill correspondiente.
- Si falta una herramienta, busca ruta viable: MCP, API, web, libreria, app externa o instalacion.
- Si el entregable depende de memoria, primero hace second brain pull.
- Si aparece un aprendizaje reusable, lo documenta en threads/proyecto.

## Regla De Memoria

Las skills de memoria usan esta jerarquia:

1. `second-brain/MASTER_IDEAS.md` para cruces globales.
2. `second-brain/inteligencia/<proyecto>/threads/_index.md` para proyecto activo.
3. `second-brain/inteligencia/**/threads/_index.md` para cruces cross-proyecto.
4. `<workspace>/inteligencia/**/threads/_index.md` solo como legacy/fallback de migracion.

Cuando haya duplicados, el agente debe avisar si la decision depende de saber cual raiz es canonica.
