# UI Ecosystem Candidates

Referencia de potenciacion para `ui-architect` y `frontend-skill`. No instalar librerias solo por moda; usarlas como patrones o dependencias si el repo las justifica.

## Decision

`ui-architect` sigue siendo la ruta canonica para HTML visual autocontenido. `frontend-skill` es la ruta para apps reales con framework/repo.

## Librerias / fuentes utiles

| Fuente | Uso recomendado | Decision |
|---|---|---|
| shadcn/ui / shadcn.io | Primitives, patrones, temas, componentes React/Tailwind | Base si el repo usa React/Tailwind |
| Magic UI | Animaciones y secciones motion-heavy | Cherry-pick, no copiar todo |
| Aceternity UI | Componentes visuales premium con motion | Cherry-pick y simplificar |
| Motion Primitives | Microinteracciones sobrias | Buena fuente para motion de producto |
| Nexus UI | Interfaces AI/chat/multimodal sobre Tailwind/Radix | Usar solo para AI apps |
| Vercel AI Elements | Componentes AI SDK/chat | Usar solo si el proyecto usa AI SDK |
| LiveKit Agents UI | Voice/agent realtime UI | Usar solo para apps con LiveKit |
| Playwright | QA visual, screenshots, consola, responsive | Obligatorio para cierre de UI sensible |

## Reglas de adopcion

- Si es HTML autocontenido, preferir implementacion propia y CDN minimo.
- Si es app React, respetar stack del repo antes de traer librerias.
- Si se usa shadcn, copiar componentes al repo y mantenerlos editables.
- Si se usa Magic/Aceternity, extraer solo el patron necesario.
- No mezclar muchas librerias de animacion en apps reales; elegir Motion/Framer o GSAP segun stack.
- No usar efectos visuales si empeoran legibilidad, performance o mobile.

## Riesgos

- Muchos kits shadcn hacen que todas las apps se vean iguales.
- Componentes copy-paste pueden traer dependencias innecesarias.
- Fondos animados pueden tapar el contenido.
- Librerias AI/chat no sirven para dashboards normales.
- Los ejemplos bonitos no reemplazan pruebas responsive reales.

## Fuentes revisadas

- https://www.shadcn.io/
- https://ui.aceternity.com/
- https://nexus-ui.dev/docs
- https://docs.livekit.io/reference/components/shadcn
- https://playwright.dev/docs/best-practices
- https://playwright.dev/docs/next/test-snapshots
