# Documentacion - Potenciacion Vertical ESC-AI

Fecha: 2026-05-24

## Objetivo

Ordenar el vertical de documentacion como capa de dominio: estas skills definen contenido, estructura, publico, profundidad y handoff. El HTML visual final lo construye `ui-architect`; Notion lo publica `documentar-notion`.

## Ruta Canonica

| Necesidad | Ruta |
| --- | --- |
| Documentar herramienta/sistema tecnico | `documentador-experto` -> `doc-desarrollos` |
| Documentar proceso, concepto, manual o playbook | `documentador-experto` -> `doc-general` |
| Convertir documentacion en HTML visual | `documentador-experto`/sub-skill -> `ui-architect` |
| Publicar o archivar en Notion | `documentador-experto`/sub-skill -> `documentar-notion` |
| HTML visual ESC-AI sin foco documental | `ui-architect` directo |

## Contrato

`documentador-experto` decide:

- tipo de documento;
- publico;
- objetivo;
- estructura;
- profundidad;
- secciones;
- contenido;
- tablas/checklists/diagramas;
- si necesita HTML visual, Notion o ambos.

`ui-architect` decide:

- layout;
- navegacion;
- interaccion;
- responsive;
- motion;
- polish visual;
- implementacion HTML/CSS/JS.

`documentar-notion` decide:

- pagina/base destino;
- bloques;
- propiedades;
- update/create/append.

## Handoff Minimo A UI

- titulo y proposito;
- publico objetivo;
- secciones;
- copy por seccion;
- tablas/checklists;
- assets/capturas;
- visual thesis;
- interacciones deseadas;
- restricciones.

## Estado

Vertical listo como dominio documental. Queda pendiente probar con una documentacion real de herramienta o proceso.
