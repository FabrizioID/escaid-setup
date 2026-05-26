# Auditoria Externa - Excel MCP Candidates

Fecha: 2026-05-24

Fuentes:

- https://github.com/negokaz/excel-mcp-server
- https://github.com/mort-lab/excel-mcp

## Veredicto

Decision: **Adaptar criterios y mantener ruta actual**.

Confianza: Media-alta.

Riesgo: Medio si se instala sin fijar version o usando servicios remotos; bajo-medio si se usa local y con archivos de prueba.

## Valor

`negokaz/excel-mcp-server` potencia directamente `excel-user`: es el candidato que ya encaja con la arquitectura local y aporta herramientas reales para leer, escribir, formatear, crear tablas, copiar hojas y capturar pantalla en Windows.

`mort-lab/excel-mcp` aporta una alternativa Python/openpyxl sin Microsoft Excel. Es util como fallback conceptual o instalacion futura si la ruta principal no esta disponible.

## Riesgos

- `negokaz` usa `npx --yes`; para estabilidad conviene fijar version en config si se instala.
- `negokaz` puede usar OLE/live Excel en Windows; hay riesgo de archivo bloqueado si esta abierto.
- `mort-lab` recomienda Smithery remoto; para archivos privados, usar solo local.
- `mort-lab` incluye docs genericas con `curl` para instalar uv; no usar como instalador automatico.
- Ninguno debe recibir credenciales ni subir archivos privados.

## Solape

Skill propia relacionada: `excel-user`.

Diferencial real:

- `negokaz`: tools actuales y Windows screenshot/live editing.
- `mort-lab`: Python puro, validacion Pydantic, sin Excel instalado.

Riesgo de confusion: alto si se instalan ambos bajo el mismo nombre `excel`. Si se habilita fallback, registrarlo con nombre separado como `excel_openpyxl_mcp`.

## Recomendacion Operativa

- No instalar nada nuevo ahora.
- Actualizar `excel-user` para entender tools reales `excel_*`.
- Documentar fallback `openpyxl/pandas`.
- Si se prueba `mort-lab`, hacerlo como `excel_openpyxl_mcp` y con libro descartable.

## Decision Final

Absorbido en:

- `skills/excel-user/SKILL.md`
- `skills/excel-user/references/mcp-capabilities.md`
- `skills/excel-user/references/excel-mcp-candidates.md`
- `skills/excel-user/references/excel-operational-patterns.md`
- `docs/tool-verticals/excel-potenciacion.md`
