# Excel MCP Candidates

Referencia de potenciacion externa para el vertical Excel. No instalar candidatos nuevos sin auditoria.

## Decision

La ruta principal sigue siendo `@negokaz/excel-mcp-server`, porque ya coincide con la arquitectura local y aporta lectura/escritura/formato, tablas, copiado de hojas y captura visual en Windows.

`mort-lab/excel-mcp` queda como fallback candidato si se necesita una ruta Python pura con `openpyxl` y Pydantic, sin depender de Microsoft Excel.

## Candidatos

| Repo/herramienta | Aporte | Decision |
|---|---|---|
| `negokaz/excel-mcp-server` | MCP Go/NPM para xlsx/xlsm/xltx/xltm, formulas, formato, tablas, copy sheet, screenshot Windows | Principal / absorber nomenclatura real |
| `mort-lab/excel-mcp` | Python + openpyxl, 20 tools, validacion Pydantic, sin Microsoft Excel | Fallback opcional, no reemplazar |
| `bassem-elsodany/mcp_excel_server` | Python/openpyxl con screenshots Windows | Auditar solo si faltan features |
| `kousunh/Excel-mcp-server` | xlwings/live workbook | Referencia para live automation, riesgo por dependencia Excel |

## Riesgos Detectados

### `negokaz/excel-mcp-server`

- Usa `npx --yes`; conviene fijar version si se busca reproducibilidad.
- README trae badges/imagenes externas, no runtime.
- En Windows puede usar OLE/live Excel y screenshot; cerrar archivos abiertos si hay riesgo de lock.
- Herramientas reales usan nombres `excel_*`, diferentes a algunos aliases antiguos `mcp__excel__*`.

### `mort-lab/excel-mcp`

- README recomienda Smithery remoto; para documentos privados preferir local `uvx`.
- Incluye docs genericas Claude con comandos como `curl` para instalar uv; no usar como instalador directo.
- No soporta macros/VBA; cuidado con `.xlsm`.
- Roadmap promete charts/pivots, pero no estan listos.

## Regla Operativa

1. Usar `@negokaz/excel-mcp-server` si esta activo.
2. Si los tools aparecen como `excel_*`, mapearlos desde `mcp-capabilities.md`.
3. Si no hay MCP y el archivo es `.xlsx` simple, usar fallback `openpyxl`/`pandas`.
4. Si es `.xlsm`, preservar macros y crear copia antes de editar.
5. Si se necesita Google Sheets, cambiar a `google-workspace-editor`.
6. Si la salida final es Word/APA, activar `excel-table-builder`.
