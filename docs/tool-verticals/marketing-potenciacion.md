# Marketing - Potenciacion Vertical ESC-AI

Fecha: 2026-05-24

## Objetivo

Convertir `marketing-master` en orquestador de crecimiento, no solo en generador de planes. La skill debe decidir estrategia, funnel, lifecycle, data capture, automatizacion, research externo y handoff a skills productoras.

## Rutas Canonicas

| Necesidad | Ruta |
| --- | --- |
| Estrategia integral de crecimiento | `marketing-master` -> `growth-operating-system` |
| Funnel/campana/lead flow | `marketing-master` -> `funnel` -> opcional `n8n-workflow-builder` |
| Grilla de contenido | `marketing-master` -> `content` -> opcional `flyer-generator`/`video-script-generator` |
| Meta Ads estrategia/reporting | `marketing-master` -> `meta-ads` -> opcional `meta-ads-n8n-workflow` |
| Email/nurture/lanzamiento | `marketing-master` -> `email` -> opcional `email-html-marketing` |
| SEO/topical authority | `marketing-master` -> `seo` |
| Buscar alternativas/referencias | `marketing-master` -> `research-and-external-alternatives` |
| Archivar plan/campana | `marketing-master` -> `documentar-notion` |

## Criterios Absorbidos

- Separar demand creation, demand capture, conversion, retention y reactivation.
- Definir lifecycle/CRM cuando hay leads, WhatsApp, email o ventas.
- No optimizar solo volumen: distinguir lead barato de lead calificado.
- Antes de inventar una mecanica, buscar docs oficiales, ejemplos publicos, templates, Reddit/GitHub/casos cuando aplique.
- Para automatizacion, preferir loops pequenos y sub-workflows antes que flujos monoliticos.
- Mantener marketing como dominio; produccion visual, email HTML, n8n, Notion y Google se delegan a sus skills.

## Fuentes Externas Revisadas

- Meta Business: Awareness objective (`https://www.facebook.com/business/ads/ad-objectives/awareness`), Traffic objective (`https://www.facebook.com/business/ads/ad-objectives/traffic`) y Sales objective (`https://www.facebook.com/business/ads/ad-objectives/sales`).
- Google Search Central: SEO Starter Guide (`https://developers.google.com/search/docs/fundamentals/seo-starter-guide`) y helpful people-first content (`https://developers.google.com/search/docs/fundamentals/creating-helpful-content`).
- Google Ads Help: Performance Max asset groups (`https://support.google.com/google-ads/answer/14528220`) y build an asset group (`https://support.google.com/google-ads/answer/14104727`).
- HubSpot: lifecycle stages (`https://knowledge.hubspot.com/records/use-lifecycle-stages`) y flywheel (`https://www.hubspot.com/flywheel`).
- Reddit/operadores: senales sobre problemas frecuentes de lifecycle, stage governance y calidad de leads.

## Estado

Vertical marketing potenciado como sistema de crecimiento. Pendiente: probarlo con una campana real y documentar un ejemplo end-to-end.
