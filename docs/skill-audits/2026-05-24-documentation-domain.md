# Auditoria - Documentation Domain

Fecha: 2026-05-24

## Alcance

- `documentador-experto`
- `doc-desarrollos`
- `doc-general`
- relacion con `ui-architect`
- relacion con `documentar-notion`

## Hallazgos

1. Las skills de documentacion estaban demasiado orientadas a generar HTML directamente.
2. `ui-architect` ya cubre mejor la construccion HTML visual.
3. `documentar-notion` es una skill distinta: publica o archiva contenido, no decide la arquitectura documental compleja.
4. Faltaba un contrato claro de handoff.

## Cambios

- Se agrego contrato de dominio a `documentador-experto`.
- Se agrego contrato de dominio a `doc-desarrollos`.
- Se agrego contrato de dominio a `doc-general`.
- Se creo `references/documentation-domain-contract.md`.
- Se creo `docs/tool-verticals/documentacion-potenciacion.md`.

## Decision

Las skills documentales quedan como dominio/contenido. Para HTML visual se llama a `ui-architect`; para Notion se llama a `documentar-notion`.
