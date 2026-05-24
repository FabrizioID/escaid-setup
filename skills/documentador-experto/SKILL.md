---
name: documentador-experto
description: Skill macro de dominio documental. Usar cuando se necesite documentar cualquier sistema, herramienta, desarrollo, proceso o concepto definiendo contenido, estructura, publico, profundidad y handoff. Orquesta dos sub-skills según el contexto: doc-desarrollos (para herramientas y sistemas técnicos construidos) y doc-general (para cualquier otro tipo de documentación). Si se requiere HTML visual/interactivo/premium, prepara el brief y deriva la construcción final a ui-architect.
---

# Documentador Experto

## Contrato De Dominio

Esta skill es la capa de dominio documental: decide que documentar, para que publico, con que estructura, profundidad, jerarquia y ruta de salida.

No es la capa visual final. Si la salida debe ser HTML visual, interactiva, premium o presentation-ready, `documentador-experto` prepara el brief documental y activa `ui-architect`, que construye el HTML.

Si la salida debe guardarse en Notion, `documentador-experto` prepara el contenido estructurado y activa `documentar-notion`.

Rutas:

- Desarrollo tecnico: `documentador-experto` -> `doc-desarrollos` -> opcional `ui-architect` -> opcional `documentar-notion`.
- Concepto/proceso/manual/playbook: `documentador-experto` -> `doc-general` -> opcional `ui-architect` -> opcional `documentar-notion`.

Para el contrato completo de handoff, leer [references/documentation-domain-contract.md](references/documentation-domain-contract.md).

Skill macro que provee criterios de documentacion, estructura, jerarquia, atmosfera y handoff para cualquier artefacto documental.

Regla de no solape: esta skill documenta. No reemplaza `ui-architect` para construir una UI/producto HTML premium ni `frontend-skill` para implementar una app/repo frontend. Si el usuario pide "documentar", manda `documentador-experto`; si pide "construir UI", mandar a `ui-architect` o `frontend-skill` segun el caso.

No genera documentación directamente. Orquesta y provee criterios a las sub-skills:

- **doc-desarrollos**: documentación de herramientas y sistemas construidos (guía de usuario, doc técnica, doc conceptual/dominio)
- **doc-general**: documentación de cualquier cosa (proyectos, procesos, ideas, manuales, guías de equipo)

## Cuándo activar cada sub-skill

Activar **doc-desarrollos** cuando:
- Se acaba de construir o existe una herramienta, app, API, automatización o sistema técnico
- Se necesiten las 3 documentaciones estándar de un desarrollo: guía de usuario + técnica + conceptual
- El usuario diga "documenta este desarrollo", "crea la doc de esta herramienta" o similar

Activar **doc-general** cuando:
- Se necesite documentar un proceso, proyecto, manual operativo, guía de equipo o concepto
- No hay un desarrollo técnico específico como sujeto
- La estructura no encaja en las 3 docs de desarrollo

## Criterios de UI — heredados por todas las docs

Leer [references/documentation-domain-contract.md](references/documentation-domain-contract.md) antes de definir la ruta de salida. Si se requiere HTML visual, usar [references/ui-criteria.md](references/ui-criteria.md) solo como criterios de handoff para `ui-architect`.

Principio base: **UI suficientemente buena, no extravagante.**
La documentación no compite con el contenido — lo sirve.

### Sistema de color por tipo de doc

Cada tipo de doc tiene identidad visual propia dentro del mismo design system:

| Doc | Color dominante | Conexiones canvas |
|---|---|---|
| Guía de usuario | Morado (#7c3aed) + cyan | rgba(124,58,237) |
| Doc técnica | Cyan (#22d3ee) | rgba(34,211,238) |
| Doc conceptual/dominio | Verde (#34d399) + cyan | rgba(52,211,153) |
| Doc general | Morado + cyan (default) | rgba(124,58,237) |

### Reglas de fondo animado

El fondo de logos/red social animado (Canvas 2D) es un elemento de diseño, no decoración.

Reglas críticas:
- Nunca cubrir con secciones opacas sólidas — usar backdrop-filter blur mínimo 16px
- Nodos en zona central (x entre 18% y 82% del ancho): opacidad al 45% máximo
- Nodos en márgenes: opacidad al 100%
- NODE_SIZE: 32px, NODE_COUNT: 18, SPEED: 0.3

### Stack técnico de las docs

- HTML + CSS + Vanilla JS (sin frameworks, sin build step)
- AOS (Animate On Scroll) para scroll reveals — CDN unpkg
- Canvas 2D para fondo animado con logos de redes sociales (Path2D + Simple Icons paths)
- Backdrop-filter blur 20px en secciones de contenido
- Hosting: Vercel o GitHub Pages (estático)

## Non-negotiable

- Nunca empezar con markdown plano cuando se pide documentación premium
- Nunca dejar que el motion compita con la legibilidad
- Nunca generar extravagancia visual — suficientemente bueno > excesivo
- Siempre separar la documentación en archivos independientes por tipo
- Siempre conectar las docs entre sí con navegación en el header
- Las capturas reales (Playwright) suman más que ilustraciones genéricas
