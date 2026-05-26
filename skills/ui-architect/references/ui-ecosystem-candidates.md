# UI Ecosystem Candidates

Referencia de potenciacion para `ui-architect` y `frontend-skill`. No instalar librerias solo por moda; usarlas como patrones o dependencias si el repo las justifica.

## Decision

`ui-architect` sigue siendo la ruta canonica para HTML visual autocontenido. `frontend-skill` es la ruta para apps reales con framework/repo.

Actualizacion 2026-05-26: la busqueda externa confirma que el mercado se esta concentrando en componentes "copy-paste owned" sobre shadcn/Radix para apps React, y en librerias motion-heavy como Aceternity/Magic para landings. Para HTML autocontenido, esto no reemplaza a `ui-architect`: se absorben patrones de composicion, motion y QA visual, pero se evita instalar dependencias si el artefacto puede resolverse con CSS/JS directo.

## Librerias / fuentes utiles

| Fuente | Uso recomendado | Decision |
|---|---|---|
| shadcn/ui / shadcn.io | Primitives, patrones, temas, componentes React/Tailwind | Base si el repo usa React/Tailwind |
| Magic UI | Animaciones y secciones motion-heavy | Cherry-pick, no copiar todo |
| Aceternity UI | Componentes visuales premium con motion | Cherry-pick y simplificar |
| React Bits | Backgrounds, text effects, animaciones y componentes creativos | Usar como inspiracion o copiar un componente aislado si React encaja |
| Animate UI | Componentes Motion sobre shadcn registry | Bueno para motion sobria en apps React |
| 21st.dev | Directorio/registry de componentes shadcn para design engineers | Buscar patrones, no meter al azar |
| Motion Primitives | Microinteracciones sobrias | Buena fuente para motion de producto |
| Nexus UI | Interfaces AI/chat/multimodal sobre Tailwind/Radix | Usar solo para AI apps |
| Vercel AI Elements | Componentes AI SDK/chat | Usar solo si el proyecto usa AI SDK |
| LiveKit Agents UI | Voice/agent realtime UI | Usar solo para apps con LiveKit |
| Mobbin | Referencias UI/UX de apps, web apps y websites; MCP/API disponible | Usar para research de patrones si hay acceso |
| Page Flows | Grabaciones y anotaciones de flujos reales | Usar para onboarding, conversion, checkout y workflows |
| Godly / Awwwards / Landingfolio / Refero | Inspiracion visual y landing/product direction | Extraer mood/composicion, no copiar |
| Playwright | QA visual, screenshots, consola, responsive | Obligatorio para cierre de UI sensible |

## Criterios absorbidos del mercado

- Preferir ownership del codigo: componentes copiables y editables ganan frente a black boxes cuando el diseño debe ser propio.
- Motion-heavy solo cuando sostiene jerarquia o narrativa; las librerias bonitas tienden a producir sameness si se copian sin direccion de arte.
- Para AI/chat/agent UI, usar librerias especializadas solo si el producto realmente tiene streaming, tools, reasoning, voz o multimodalidad.
- Para rescatar HTML visual existente, no buscar otro kit primero; auditar direccion de arte, analogia, paleta y screenshot.

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
- React Bits/Magic/Aceternity pueden convertir la UI en demo reel si no hay una direccion de arte previa.
- Inspiracion visual sin flujo real produce paginas bonitas pero poco usables.

## Fuentes revisadas

- https://www.shadcn.io/
- https://ui.aceternity.com/
- https://nexus-ui.dev/docs
- https://docs.livekit.io/reference/components/shadcn
- https://playwright.dev/docs/best-practices
- https://playwright.dev/docs/next/test-snapshots
