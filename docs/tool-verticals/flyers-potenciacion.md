# Flyers / Piezas Comerciales Visuales - Potenciacion Vertical ESC-AI

Fecha: 2026-05-24

## Objetivo

Potenciar `flyer-generator` como skill especializada en piezas visuales estaticas: flyers, posts, anuncios, covers de carrusel, piezas de evento y creatividades comerciales.

No reemplaza presentaciones. No genera decks. Su salida principal es una imagen final y un prompt trazable.

## Ruta canonica

1. Detectar modo: referencia, desde cero o mejora.
2. Confirmar marca/branding.
3. Elegir patron comercial.
4. Definir hook, mecanismo, CTA y scan order.
5. Construir prompt final.
6. Generar imagen con herramienta directa de imagen por defecto.
7. Ejecutar QA post-generacion.

## Separacion con otros verticales

| Necesidad | Skill |
| --- | --- |
| Flyer/post/pieza estatica comercial | `flyer-generator` |
| Presentacion o deck | `presentation-orchestrator` + `disruptive-presentations` |
| Slide individual de una presentacion | `disruptive-presentations` |
| Email HTML | `email-html-marketing` |
| Landing/UI/app | `frontend-skill` o `ui-architect` segun caso |
| Imagen auxiliar sin estrategia comercial | `imagegen` |

## Mejoras aplicadas

- `image_gen`/herramienta directa queda como motor default.
- API/CLI queda solo como fallback o pedido explicito.
- Se agrego biblioteca de patrones comerciales:
  `skills/flyer-generator/references/commercial-flyer-patterns.md`
- Se agrego QA de prompt y post-generacion:
  `skills/flyer-generator/references/flyer-prompt-qa.md`
- Se alineo con el criterio de una pieza = una accion.

## Patrones disponibles

- Big Hook Poster
- Pain Mirror
- Before / After
- Offer Stack
- Proof Badge
- Event Hero
- Product Spotlight
- Countdown / Urgency
- Social Proof Wall
- Roadmap Mini
- Myth Busting
- Comparison Card
- Premium Minimal
- Data Punch
- Community Call
- Founder/Expert Authority
- Framework Teaser
- Carousel Cover

## Estado

Listo para uso operativo por Codex y Claude. La prueba recomendada es generar una pieza simple con:

- marca;
- audiencia;
- objetivo;
- texto visible;
- CTA;
- formato.
