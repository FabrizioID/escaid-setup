# Auditoria Externa - UI Ecosystem

Fecha: 2026-05-24

Fuentes:

- https://www.shadcn.io/
- https://ui.aceternity.com/
- https://nexus-ui.dev/docs
- https://docs.livekit.io/reference/components/shadcn
- https://playwright.dev/docs/best-practices
- https://playwright.dev/docs/next/test-snapshots

## Veredicto

Decision: **Absorber criterios, no instalar nada por defecto**.

Confianza: Alta.

Riesgo: Bajo si se usan como referencias; medio si se copian componentes sin revisar dependencias.

## Valor

- shadcn/ui y shadcn.io sirven como base de primitives/patrones para apps React/Tailwind.
- Magic UI, Aceternity y Motion Primitives aportan motion y componentes visuales para cherry-pick.
- Nexus UI, Vercel AI Elements y LiveKit Agents UI son utiles solo para interfaces AI/agenticas o voz.
- Playwright es la ruta de validacion visual y responsive.

## Riesgos

- Sobrecargar HTML autocontenido con frameworks innecesarios.
- Volver generica la UI por copiar kits completos.
- Dependencias de animacion redundantes.
- Efectos que compiten con legibilidad.
- Falta de screenshot/QA real antes de entregar.

## Solape

Skills propias relacionadas:

- `ui-architect`
- `frontend-skill`
- `documentador-experto`
- `visual-html-craft`
- `premium-interactive-docs`

Decision: `ui-architect` y `frontend-skill` quedan como rutas principales segun tipo de entregable. Las otras dos son legacy/deprecated.

## Decision Final

Absorbido en:

- `skills/ui-architect/SKILL.md`
- `skills/ui-architect/references/ui-ecosystem-candidates.md`
- `skills/ui-architect/references/ui-validation-protocol.md`
- `docs/tool-verticals/ui-potenciacion.md`
