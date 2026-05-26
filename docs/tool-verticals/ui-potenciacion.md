# UI - Potenciacion Vertical ESC-AI

Fecha: 2026-05-24

Objetivo: ordenar el vertical UI para que los agentes elijan rapido entre artefacto HTML visual, app frontend real y documentacion interactiva, sin que `visual-html-craft`, `frontend-skill`, `ui-architect` y `documentador-experto` se pisen.

## Estado Actual

| Ruta | Uso |
|---|---|
| `ui-architect` | HTML visual autocontenido donde el HTML es el producto |
| `frontend-skill` | App/repo frontend real con framework, rutas, estado y componentes |
| `documentador-experto` | Documentacion visual interactiva de sistemas/procesos/desarrollos |
| `visual-html-craft` | Legacy: redirige a `ui-architect` |
| `premium-interactive-docs` | Deprecated: redirige a `documentador-experto` |

## Hallazgo

`frontend-skill` existia en local, pero no estaba versionada dentro de `escaid-setup`. Se agrego al repo para que Claude, Codex y Antigravity tengan el mismo criterio.

## Candidatos / Patrones Revisados

| Fuente | Aporte | Decision |
|---|---|---|
| shadcn/ui / shadcn.io | Primitives y patrones React/Tailwind | Base para apps React si el repo lo usa |
| Magic UI | Animaciones y secciones visuales | Cherry-pick |
| Aceternity UI | Componentes premium motion-heavy | Cherry-pick, simplificar |
| Motion Primitives | Microinteracciones sobrias | Usar en apps reales |
| Nexus UI | AI/chat/multimodal UI | Solo AI apps |
| Vercel AI Elements | AI SDK/chat | Solo si el proyecto usa AI SDK |
| LiveKit Agents UI | Voice/agent realtime UI | Solo LiveKit |
| Playwright | QA visual/responsive/consola | Obligatorio para cierre sensible |

## Brechas Cerradas

- `frontend-skill` versionada en repo.
- `ui-architect` ahora referencia candidatos UI modernos.
- Protocolo de validacion UI formalizado.
- Separacion clara entre UI, frontend app y documentacion.
- Legacy skills quedan como alias, no rutas principales.

## Decision Operativa

1. Para HTML visual: `ui-architect`.
2. Para app/repo frontend: `frontend-skill`.
3. Para documentacion: `documentador-experto`.
4. Para legacy `visual-html-craft`: redirigir mentalmente a `ui-architect`.
5. Para legacy `premium-interactive-docs`: redirigir a `documentador-experto`.

## No Hacer

- No instalar librerias UI sin revisar stack del repo.
- No hacer dashboards de cards por defecto.
- No usar heroes/landing cuando el usuario pidio una herramienta.
- No cerrar UI sin screenshot si hay responsive, canvas, 3D o motion.
- No usar componentes AI/chat para interfaces que no son AI/chat.
