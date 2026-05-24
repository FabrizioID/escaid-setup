# Presentaciones - Potenciacion Vertical ESC-AI

Fecha: 2026-05-24

## Objetivo

Ordenar el ecosistema de presentaciones para que cada agente elija rapido la ruta correcta sin pisar skills:

- narrativa y estructura;
- generacion visual full-image;
- HTML player de presentacion;
- PPTX editable/export;
- imagenes auxiliares.

## Ruta canonica ESC-AI

1. `presentation-orchestrator`: define arco narrativo, audiencia, mensaje, estructura y handoff por slide.
2. `disruptive-presentations`: convierte el handoff en slides full-image, con QA interno y HTML player.
3. `slides`: entra solo si el usuario pide `.pptx` editable, recreacion PowerPoint o export posterior.
4. `imagegen`: motor auxiliar de bitmap, no ruta de decision.

## Separacion de responsabilidades

| Necesidad | Ruta |
| --- | --- |
| Disenar storytelling, clase, pitch o sustentacion | `presentation-orchestrator` |
| Producir slides visuales finales | `disruptive-presentations` |
| Presentar/revisar deck generado como imagenes | HTML player de `disruptive-presentations` |
| Crear o editar PPTX editable | `slides` |
| Crear assets bitmap, fondos, ilustraciones o mockups | `imagegen` |
| Deck tecnico text-first Markdown/HTML | Marp/reveal.js solo si el usuario lo pide |

## Capa de arquitectura visual y diagramacion

Esta capa quedo absorbida como referencia operativa en:

`skills/disruptive-presentations/references/visual-architecture-diagramming.md`

Regla: antes de convertir un proceso, sistema, arquitectura o modelo conceptual en slide, clasificar la familia de diagrama y elegir el patron de estructura/plantilla correcto. Esta capa NO cambia el motor de salida: `disruptive-presentations` sigue generando la slide final con la herramienta de imagen. Mermaid, D2, Excalidraw/Miro, React Flow y PptxGenJS funcionan como referencias de gramatica visual salvo pedido explicito de otro artifact.

| Familia | Patron estructural para la slide |
| --- | --- |
| Arquitectura software/MCP/repos/APIs | Gramatica tipo D2/Mermaid: grupos, capas, recursos, edges |
| Proceso operativo / automatizacion | Gramatica tipo flowchart: pasos, gates, swimlanes, loops |
| Secuencia agente-herramienta/API | Gramatica tipo sequence: lifelines, mensajes, retornos |
| Estados y lifecycle | Gramatica tipo state: estados, transiciones, finales, excepciones |
| Sistema de sistemas / mapa ESC-AI | Gramatica tipo D2/Miro: hubs, bordes, loops, capas |
| Modelo conceptual / tesis | Schematic custom, no raw Mermaid |
| Funnel / journey | Schematic custom con progresion, tension y conversion |
| Diagrama interactivo editable | React Flow solo si el entregable es una app; para slide, node-map estatico |
| Sketch humano de ideacion | Estetica tipo Excalidraw/Miro si ayuda a explicar |
| PPTX editable | `slides`/PptxGenJS solo en fase de export/editabilidad |

## Handoff minimo por slide

Cada slide que sale de Orchestrator debe incluir:

- slide id;
- rol narrativo;
- tesis;
- mensaje a instalar;
- frase del presentador;
- cambio esperado en la audiencia;
- texto visible exacto;
- modo visual: `analogy scene`, `artifact schematic` o `hybrid`;
- evidencia nativa requerida;
- restricciones de marca;
- notas internas que no deben verse.

## Manifest de produccion

Cada corrida de `disruptive-presentations` debe dejar un manifest con:

- slide id;
- resumen del prompt final;
- path PNG aceptado;
- QA status: `accepted`, `regenerated`, `needs review`;
- evidencia/assets usados;
- observaciones.

Esto permite reabrir, auditar, exportar a PPTX y evitar confundir drafts antiguos con slides finales.

## Criterio sobre herramientas externas

PptxGenJS sigue siendo la ruta correcta para PPTX editable porque permite crear objetos PowerPoint nativos como texto, tablas, imagenes y charts programaticamente. Marp y reveal.js son utiles para decks Markdown/HTML y export rapido, pero no reemplazan el flujo full-image ni el PPTX nativo cuando la editabilidad fina importa.

Fuentes revisadas:

- PptxGenJS docs: `https://gitbrent.github.io/PptxGenJS/docs/introduction/`
- PptxGenJS charts/tables/images: `https://gitbrent.github.io/PptxGenJS/docs/api-charts.html`, `https://gitbrent.github.io/PptxGenJS/docs/api-tables.html`, `https://gitbrent.github.io/PptxGenJS/docs/api-images/`
- reveal.js docs: `https://revealjs.com/`
- Marp docs: `https://marp.app/`
- Mermaid docs: `https://mermaid.js.org/`
- D2 docs: `https://d2lang.com/`
- Excalidraw libraries: `https://libraries.excalidraw.com/`
- React Flow docs: `https://reactflow.dev/`

## Estado

Vertical listo para operar:

- Orchestrator queda como capa narrativa.
- Disruptive queda como capa de produccion visual.
- Slides queda como capa editable/export.
- Imagegen queda como motor auxiliar.
