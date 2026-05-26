---
name: github-repo-ops
description: Operar repos GitHub de FabrizioID/AECODE con git y gh CLI: verificar autenticacion, cambiar cuenta activa, revisar remotes, status, commits, pushes, pulls, branches y permisos sin exponer tokens. Usar cuando el usuario pida pushear, clonar, revisar GitHub, configurar acceso a un repo, validar si algo esta subido, arreglar 403/auth, o trabajar con repos como FabrizioID/escaid-setup y FabrizioID/second-brain.
---

# GitHub Repo Ops

Skill operativa para GitHub. No guarda credenciales en el repo y nunca imprime tokens completos.

## Paquete operativo

| Capa | Ruta | Funcion |
|---|---|---|
| Dominio | `github-repo-ops` | Decidir flujo Git/GitHub seguro |
| Apertura/auth | `gh auth status`, `gh auth switch`, `gh auth login` | Validar cuenta activa y permisos |
| Ejecucion | `git` CLI | Status, commit, push, pull, remote, branch |
| Pill local | GitHub Credential Manager / keyring | Tokens locales fuera del repo |

## Arranque rapido

1. Identificar repo objetivo: URL, owner, branch y carpeta local.
2. Ejecutar `gh auth status` y confirmar cuenta activa sin mostrar tokens.
3. Si el repo es `FabrizioID/*`, activar `FabrizioID`:
   `gh auth switch --hostname github.com --user FabrizioID`
4. Revisar `git remote -v` y `git status -sb`.
5. Si hay commits locales `ahead`, hacer push a la branch correcta.
6. Si aparece `403`, no reintentar a ciegas: cambiar cuenta activa o pedir login/token con permisos `repo`.

## Reglas de seguridad

- No pegar ni repetir tokens, secretos o credenciales en la respuesta.
- No cambiar remotes sin confirmar que el owner/repo coincide con el objetivo.
- No usar `git reset --hard`, force push o borrado de ramas sin pedido explicito.
- Antes de commitear, revisar `git status --short` y evitar incluir secretos o archivos generados sensibles.
- Para repos privados, preferir `gh`/credential manager local antes que tokens en texto.

## Repos canonicos actuales

| Repo | Uso | Branch esperada |
|---|---|---|
| `FabrizioID/escaid-setup` | Skills, MCPs, SkillOps, setup portable | `main` |
| `FabrizioID/second-brain` | Memoria viva, `MASTER_IDEAS.md`, `inteligencia/` | `master` |

## Flujo de push seguro

```powershell
gh auth status
gh auth switch --hostname github.com --user FabrizioID
git -C "<repo-local>" status -sb
git -C "<repo-local>" push origin <branch>
```

Si el push falla con `Permission denied to <cuenta>`:

1. Verificar cuenta activa en `gh auth status`.
2. Cambiar a la cuenta correcta.
3. Confirmar que el token tiene scope `repo`.
4. Reintentar push una vez.

