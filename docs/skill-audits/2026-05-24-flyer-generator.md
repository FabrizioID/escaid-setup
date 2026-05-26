# Auditoria - Flyer Generator

Fecha: 2026-05-24

## Hallazgos

1. La skill ya tenia modos claros: referencia, desde cero y mejora.
2. Tenia buena evaluacion con Magnus, pero faltaba biblioteca de patrones comerciales.
3. Estaba demasiado amarrada a `OPENAI_API_KEY` como requisito, aunque el ecosistema actual puede usar herramienta directa de imagen.
4. Faltaba separar explicitamente flyers de slides, emails, landings y UI.

## Cambios aplicados

- Se agrego contrato del vertical en `flyer-generator`.
- Se normalizo motor default: herramienta directa de imagen primero, API/CLI solo fallback o pedido explicito.
- Se agrego `references/commercial-flyer-patterns.md`.
- Se agrego `references/flyer-prompt-qa.md`.
- Se agrego vertical doc `docs/tool-verticals/flyers-potenciacion.md`.
- Se actualizo `docs/SKILLOPS_MAP.md`.

## Decision operativa

`flyer-generator` queda como skill principal para piezas comerciales estaticas. Para decks y slides, usar el vertical de presentaciones.
