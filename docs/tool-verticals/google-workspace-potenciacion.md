# Google Workspace - Potenciacion Vertical ESC-AI

Fecha: 2026-05-24

Objetivo: potenciar Google Workspace como vertical operativo completo para Docs, Sheets y Drive. La prioridad es que cualquier agente pueda abrir acceso rapido, leer antes de editar, modificar sin romper estructura, y usar Drive/Sheets/Docs como infraestructura diaria de documentacion, seguimiento y automatizacion.

## Estado Actual

El ecosistema ya tiene una arquitectura correcta:

| Capa | Skill | Funcion |
|---|---|---|
| Apertura MCP | `google-workspace-credentials` | Ubicar MCP, validar perfil/token, configurar Codex/Claude/otros agentes |
| Editor transversal | `google-workspace-editor` | Operar Google Docs, Sheets y Drive |
| Google Docs sensible | `google-docs-mcp-document-editor` | Editar documentos vivos preservando estructura, tablas, comentarios y formato |
| Propuestas/cotizaciones | `google-docs-quotation-editor` | Aplicar logica comercial en Google Docs visualmente fragiles |

MCP local encontrado:

- Config Codex: `google_docs_cloud`
- Entrypoint esperado: `mcps/google-workspace-mcp/dist/index.js`
- Perfil local usado: `GOOGLE_MCP_PROFILE=fabrizio`
- Token profile esperado: `~/.config/scd-mcp-docs/fabrizio/token.json`
- Paquete MCP local: `scd-mcp-docs` version `1.6.0`

No imprimir ni versionar tokens, client secrets ni contenidos de config con secretos.

## Capacidades Oficiales Relevantes

| Capacidad | Uso para ESC-AI | Fuente |
|---|---|---|
| Google Docs `documents.batchUpdate` | Insercion, reemplazo, estilos, tablas, imagenes y cambios estructurales por requests atomicos | https://developers.google.com/docs/api/reference/rest/v1/documents/batchUpdate |
| Google Docs requests | `insertText`, `replaceAllText`, `updateTextStyle`, named ranges, bullets, tablas y mas | https://developers.google.com/docs/api/reference/rest/v1/documents/request |
| Docs insert/delete/move text | Ediciones quirurgicas por indices; requiere leer antes de mover o borrar | https://developers.google.com/workspace/docs/api/how-tos/move-text |
| Sheets values API | Lectura/escritura de valores por rangos A1 | https://developers.google.com/workspace/sheets/api/guides/values |
| Sheets `spreadsheets.batchUpdate` | Formato, dimensiones, validaciones, tablas, formato condicional y propiedades | https://developers.google.com/workspace/sheets/api/guides/batchupdate |
| Sheets conditional formatting | Reglas de formato condicional para dashboards y alertas visuales | https://developers.google.com/workspace/sheets/api/samples/conditional-formatting |
| Drive files/folders | Organizacion de archivos, carpetas, ownership, busqueda y metadatos | https://developers.google.com/drive/api/guides/about-files |
| Drive folders | Crear y poblar carpetas para proyectos, entregables y assets | https://developers.google.com/workspace/drive/api/guides/folder |
| Drive export/download | Exportar Docs/Sheets/Slides a PDF, Office u otros formatos | https://developers.google.com/workspace/drive/api/guides/manage-downloads |

## Capacidades MCP Locales Observadas

El MCP `google-workspace-mcp` ya incluye herramientas para:

- Docs: leer documento, insertar texto, modificar texto, find/replace, borrar rangos, insertar tablas, insertar tablas con datos, fusionar celdas, color de celda, estilos, imagenes, saltos de pagina, tabs y comentarios.
- Sheets: leer/escribir rangos, batch write, append rows, crear spreadsheets, crear/renombrar/borrar tabs, formato, validaciones dropdown, formato condicional, tablas, charts, freeze rows/cols, auto-resize, copiar formato, group rows.
- Drive: buscar archivos, listar carpetas, crear carpetas, crear documentos, crear desde template, copiar, mover, renombrar, eliminar, descargar/exportar, obtener metadata.

Conclusion: no hace falta otra skill paralela de Google Workspace. La mejora debe enfocarse en rutas operativas y QA por tipo de trabajo.

## Potenciacion Recomendada

### 1. Access Fast-Open Mode

Usar `google-workspace-credentials` cuando un agente no ve herramientas Google.

Checklist:

1. revisar tools activas;
2. revisar config del cliente actual;
3. ubicar `escaid-setup`;
4. confirmar `dist/index.js`;
5. confirmar token profile sin imprimir contenido;
6. confirmar `GOOGLE_MCP_PROFILE` si el token esta en carpeta perfilada;
7. reiniciar cliente si la config fue corregida.

### 2. Google Docs Safe Editing Mode

Para documentos vivos:

- leer estructura antes de editar;
- identificar si el texto es editable, tabla, imagen, drawing, header/footer o elemento embebido;
- editar por rangos pequenos;
- verificar despues de cada cambio estructural;
- evitar reemplazos amplios en documentos importados o visualmente fragiles;
- usar comentarios cuando conviene revisar sin tocar contenido.

### 3. Google Sheets Operational Mode

Para Sheets operativos:

- separar valores de formato;
- usar `values` para datos y `batchUpdate` para estructura/formato;
- crear tabs por dominio o etapa;
- usar validaciones/dropdowns para estado;
- freeze headers, auto-resize y formato condicional para lectura rapida;
- documentar columnas, fuente y fecha de actualizacion;
- cuando el Sheet alimenta n8n, mantener schema estable.

### 4. Google Drive Project Folder Mode

Para proyectos:

- crear carpeta raiz por proyecto;
- subcarpetas sugeridas: `01_brief`, `02_inputs`, `03_outputs`, `04_assets`, `05_exports`, `99_archive`;
- crear documentos desde templates cuando haya propuesta, informe o entrega recurrente;
- copiar/mover/renombrar con metadata clara;
- exportar PDF/DOCX/XLSX cuando sea entregable externo.

### 5. Template Production Mode

Para velocidad diaria:

- mantener templates base en Drive;
- crear desde template;
- reemplazar placeholders;
- preservar branding;
- verificar campos heredados antes de entregar.

Casos:

- cotizaciones;
- reportes;
- briefs;
- actas;
- documentos de tesis;
- tableros Sheets.

### 6. Comment Review Mode

Cuando el usuario no quiere modificar directo:

- agregar comentario sobre el rango/elemento;
- responder hilos;
- resolver comentarios cuando se ejecuta la correccion;
- usar comentarios como QA asincronico.

## Huecos O Riesgos

| Riesgo | Impacto | Mitigacion |
|---|---|---|
| Tools no expuestas tras configurar MCP | El agente cree que no hay acceso | Usar `google-workspace-credentials` y reiniciar cliente |
| Token perfilado sin `GOOGLE_MCP_PROFILE` | MCP busca token equivocado | Documentar perfil en config |
| Docs importados o con drawings | Texto visible puede no ser editable | Detectar objeto antes de editar |
| Sheets usados por n8n | Cambiar columnas rompe automatizaciones | Mantener schema y hacer backup/preview |
| Reemplazo amplio en Docs fragiles | Rompe layout | Cambios quirurgicos y QA por seccion |
| Secretos en config local | Riesgo de exposicion | Nunca imprimir config completa ni tokens |

## Decision

Google Workspace queda como vertical completo en baseline. No buscar otra skill externa salvo que aporte una capacidad no cubierta por el MCP actual, por ejemplo:

- versionado/documentacion automatica de carpetas Drive;
- generador de templates corporativos;
- sincronizador Docs/Sheets/Notion;
- auditor de schemas Sheets usados por n8n.

## Busqueda Externa De Potenciacion

Busqueda realizada para detectar herramientas/repos que aporten algo mas alla del MCP local actual.

| Candidato | Fuente | Aporte potencial | Decision |
|---|---|---|---|
| Google Workspace CLI oficial | https://github.com/googleworkspace/cli | CLI oficial `gws`, muchas skills por API y recetas para Gmail, Drive, Docs, Calendar y Sheets | Adaptar criterios / auditar skills especificas |
| `gogcli` | https://github.com/openclaw/gogcli | CLI scriptable para Workspace amplio, salida JSON/plain, multiples cuentas, service accounts y allow/deny runtime | Adaptar para operaciones masivas/CI si el MCP queda corto |
| `ngs/google-mcp-server` | https://github.com/ngs/google-mcp-server | MCP Go multi-account para Calendar, Drive, Gmail, Sheets, Docs y Slides, con refresh y backoff | Comparar arquitectura; no reemplazar el MCP actual |
| `a-bonus/google-docs-mcp` | https://github.com/a-bonus/google-docs-mcp | MCP Docs/Sheets/Drive/Gmail/Calendar con despliegue remoto posible | Auditar solo como fallback/remoto, no instalar directo |
| MCPs solo Sheets | Ej. `xing5/mcp-google-sheets` | Foco en Sheets cuando el problema sea spreadsheet automation | Ignorar por ahora; nuestro MCP ya cubre Sheets bastante bien |

### Hallazgo Principal

El mayor potencial externo es el **Google Workspace CLI oficial**, no porque reemplace al MCP, sino porque trae:

- skills oficiales por API;
- recetas operativas;
- una interfaz CLI unica para Workspace;
- posible fallback cuando MCP no expone una operacion especifica;
- material para mejorar nuestras skills de dominio.

### Criterio De Adopcion

No instalar todo el CLI ni todas sus skills de golpe. Secuencia recomendada:

1. auditar `googleworkspace/cli` como fuente oficial;
2. revisar solo skills especificas: Drive, Docs, Sheets y shared;
3. comparar contra `google-workspace-editor`;
4. absorber recetas utiles;
5. si aporta velocidad real, crear un submodo `Google Workspace CLI fallback`;
6. mantener el MCP local como ruta principal.

### Oportunidades Reales

| Oportunidad | Por que importa |
|---|---|
| Drive folder auditor | Documentar estructura de carpetas, permisos, duplicados y entregables |
| Sheet schema auditor para n8n | Evitar que cambios de columnas rompan automatizaciones |
| Template factory | Crear Docs/Sheets desde templates con placeholders y QA heredado |
| Export pipeline | Exportar Docs/Sheets a PDF/DOCX/XLSX y archivar en Drive |
| Multi-account routing | Separar cuenta Fabrizio, AECODE y clientes sin confundir tokens |
| Comments QA workflow | Revisar documentos con comentarios antes de editar contenido vivo |

## Siguiente Prueba Real

Probar con un caso concreto:

1. abrir un Google Doc o Sheet real;
2. leer estructura;
3. generar un mini mapa del documento/hoja;
4. hacer una edicion quirurgica de bajo riesgo;
5. releer y validar;
6. documentar cualquier limitacion encontrada.
