# Word MCP / DOCX - Potenciacion Vertical ESC-AI

Fecha: 2026-05-24

Objetivo: potenciar el vertical Word/DOCX para editar documentos locales sin romper estructura, formato, tablas, comentarios, referencias, tesis o propuestas. La prioridad es seguridad documental: leer antes de editar, crear copia, hacer cambios quirurgicos y validar semantica + formato.

## Estado Actual

El ecosistema tiene dos rutas MCP locales:

| Ruta | Config | Uso |
|---|---|---|
| `docx_editor_local` | Node + Word COM | Lectura simple y reemplazo de texto creando copia `.edited.docx` |
| `word_document_server` | Python + `python-docx`/FastMCP | Creacion, lectura, tablas, estilos, footnotes/endnotes, comentarios, proteccion, PDF y formato |

Skill principal:

- `docx-mcp-document-editor`

Skills compañeras:

- `apa-7-thesis-format` para APA, tesis, tablas, figuras, bibliografia y anexos.
- `excel-table-builder` para convertir Excel/Sheets en tablas Word/APA.
- `technical-quotation-builder` para logica comercial antes de insertar en Word.

## Capacidades Locales Observadas

### `docx_editor_local`

- `read_docx`: lectura plain text mediante Word COM.
- `replace_text_docx`: crea una copia editada y reemplaza ocurrencias por Word COM.

Ventaja: preserva Word mejor que parsear XML crudo en reemplazos simples.

Limite: no cubre tablas, comentarios, tracked changes ni QA estructural.

### `word_document_server`

Capacidades observadas:

- crear/copiar/mergear documentos;
- extraer texto, outline, XML e info del documento;
- insertar headings, parrafos, tablas, imagenes, saltos;
- insertar contenido cerca de texto o indices;
- search/replace;
- estilos personalizados;
- formato de texto;
- formato avanzado de tablas: shading, alternancia, headers, merges, alineacion, padding, ancho, autofit;
- footnotes/endnotes, conversion y validacion;
- comentarios: extraer todos, por autor o por parrafo;
- proteccion, unprotect, firmas/validacion;
- conversion a PDF.

Conclusion: la ruta local cubre gran parte de edicion Word operacional. La brecha principal no es "editar DOCX", sino **redlines/tracked changes nativos, comentarios anclados editables, auditoria estructural avanzada y comparacion de versiones**.

## Busqueda Externa De Potenciacion

| Candidato | Fuente | Aporte potencial | Decision |
|---|---|---|---|
| `SecurityRonin/docx-mcp` | https://github.com/SecurityRonin/docx-mcp | Track changes nativo, comentarios, footnotes, headers/footers, imagenes, proteccion, auditoria estructural | Auditar/adaptar criterios; posible integracion futura |
| `hongkongkiwi/docx-mcp` | https://github.com/hongkongkiwi/docx-mcp | MCP DOCX en Rust, manipulacion integral | Comparar arquitectura; no instalar directo |
| `GongRzhe/Office-Word-MCP-Server` | https://github.com/GongRzhe/Office-Word-MCP-Server | Base ya presente como `word-document-server` | Ya absorbido/local |
| `UseJunior/safe-docx` | https://github.com/UseJunior/safe-docx | Edicion segura con tracked changes/redlines, comments, compare y revision extraction | Auditar como alternativa si tracked changes es prioridad |
| Adeu | https://thedailyworkflow.com/mcp/server/adeu | Redlines/tracked changes nativos para agentes | Referencia comercial/SDK; no instalar sin auditoria |

## Potenciacion Recomendada

### 1. Safe Copy First Mode

Para todo DOCX importante:

1. confirmar ruta;
2. crear copia de trabajo;
3. leer info/outline/texto;
4. ubicar seccion o tabla;
5. editar;
6. validar;
7. reportar archivo final.

Nunca trabajar sobre el unico original si el documento es tesis, contrato, propuesta o informe entregable.

### 2. Word Structure Audit Mode

Antes de editar documentos largos:

- leer outline/headings;
- contar tablas, imagenes, comentarios y footnotes;
- detectar secciones fragiles: headers, footers, tablas con merges, campos TOC, bibliografia, anexos;
- listar riesgos de formato.

### 3. Table Surgery Mode

Para tablas:

- identificar tabla por indice y contexto textual;
- determinar tipo de fila: header, banda, item, nota, total;
- editar celdas/filas sin cambiar semantica;
- aplicar formato despues de contenido;
- validar conteo de filas y unidades.

### 4. APA Thesis Mode

Cuando sea tesis:

- activar `apa-7-thesis-format`;
- preservar niveles Word Heading para TOC;
- usar tabla APA: label, titulo, tabla, nota;
- validar numeracion, referencias cruzadas, bibliografia y anexos;
- revisar mojibake y campos rotos.

### 5. Comments And Review Mode

Cuando el usuario quiera revisar sin modificar:

- extraer comentarios existentes;
- filtrar por autor o parrafo;
- proponer comentarios nuevos en texto;
- solo insertar comentarios si la herramienta lo soporta con anclaje fiable.

### 6. Redline / Track Changes Future Mode

Para contratos, informes profesionales o revision por terceros, el ideal es editar con tracked changes nativos.

Ruta actual:

- no asumir tracked changes si la tool activa no lo soporta;
- si el usuario pide redlines, usar `docx_redline_mcp` solo si ya fue instalado y probado;
- mientras tanto, crear copia editada + changelog Markdown.

### 7. Redline Fallback Opcional

`SecurityRonin/docx-mcp` fue auditado como candidato fuerte para cubrir redlines/control de cambios real.

Decision:

- absorber sus criterios en la skill principal;
- no reemplazar `word_document_server`;
- no instalar con `curl | bash`;
- si se habilita, registrarlo separado como `docx_redline_mcp`;
- probar primero con DOCX descartable y abrir resultado en Word.

Motivo: aporta exactamente la brecha pendiente, pero trae dependencias pesadas y una superficie amplia. Conviene usarlo como herramienta especializada, no como ruta base para todo Word.

## No Hacer

- No usar broad find/replace en documentos fragiles sin revisar coincidencias.
- No modificar tablas sin confirmar indices y significado de filas.
- No reemplazar todo el cuerpo si basta una edicion quirurgica.
- No prometer editar texto que vive en imagen/drawing/header embebido sin inspeccion.
- No tocar proteccion/passwords sin permiso explicito.
- No instalar un MCP externo Word solo porque existe; primero auditar seguridad y solape.

## Decision

Word MCP queda como vertical fuerte pero no cerrado al 100%. La base actual es suficiente para Word operativo, tesis/APA, tablas y propuestas. La unica potenciacion externa claramente valiosa es tracked changes/redlines + auditoria estructural avanzada.

Siguiente accion recomendada si se quiere potenciar mas:

1. habilitar `docx_redline_mcp` en entorno aislado;
2. probar redline end-to-end con documento descartable;
3. sincronizar config local en Codex/Claude si pasa la prueba;
4. mantener `docx-mcp-document-editor` como dominio principal.
