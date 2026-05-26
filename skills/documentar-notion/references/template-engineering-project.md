# Template: Proyecto de Ingenieria

Perfil de plantilla derivado del proyecto PUENTE-TINGO (mayo 2026). Usar como referencia para crear nuevos proyectos GEN+ de ingenieria estructural, obra civil, expediente tecnico o consultoria con bases de datos operativas en Notion.

Pagina modelo:

- `PUENTE TINGO`: `https://www.notion.so/PUENTE-TINGO-1d5d8cc4cfc180908d55c4da6d801474`

## Estructura general de la pagina de proyecto

```
[Pagina del proyecto] — creada dentro de una base raiz de proyectos
  ├── DESCRIPCIÓN    (seccion textual)
  ├── ACCESOS        (botones/links cortos a Miro, Drive, Sheets, logs)
  ├── INFORMACIÓN    (datos del proyecto)
  ├── Toggles operativos segun proyecto
  ├── ACTIVIDADES    (base de datos inline — actividades y entregables)
  ├── REUNIONES      (base de datos inline — minutas y acuerdos)
  ├── DOCUMENTOS     (base de datos inline — planos, informes, archivos)
  └── CONTACTOS CLIENTE (base de datos inline — stakeholders)
```

Los titulos de seccion superiores pueden ser H3. Las bases operativas deben ser bases inline reales y visibles directamente en la pagina, no linked views dependientes de una fuente archivada.

## IDs de referencia (PUENTE-TINGO)

- Pagina del proyecto: `1d5d8cc4-cfc1-8090-8d55-c4da6d801474`
- Base raiz (parent DB): `9c3311ac-1535-43eb-bcbc-a6d5e3637a6b`
- ACTIVIDADES DB: `1dcd8cc4-cfc1-80e4-a666-e11f8d36a286`
- REUNIONES DB: `1dcd8cc4-cfc1-80e1-b17d-ccd249f70c33`
- DOCUMENTOS DB: `8c081802-c72b-4132-82cd-9608e3d129c3`
- CONTACTOS CLIENTE DB: `2cb01817-ce2f-4f28-aecb-ff2e8d0df0c1`

## Schemas de propiedades

### ACTIVIDADES

| Propiedad   | Tipo          | Valores / Notas                                      |
|-------------|---------------|------------------------------------------------------|
| Name        | title         | Nombre de la actividad                               |
| Status      | select        | POR HACER, EN PROCESO, COMPLETADO, PENDIENTE         |
| Entregable  | select        | Agrupa actividades por entregable real del proyecto  |
| Encargado   | multi_select  | Todos, Javier, Fabrizio, Israel, Ivana u otros       |
| Fecha Límite| date          |                                                      |
| Observación | rich_text     | Descripcion, observacion o criterio de cierre        |
| % Avance    | number        | Formato percent                                      |

Vistas observadas en PUENTE-TINGO:

- `Vista Filtrada`: board.
- `Status`: table.
- `Original`: board.

Regla aplicada en proyectos BIM/observaciones: boards agrupados por `Status`; vista tabla `Status` agrupada por `Entregable`.

### REUNIONES

| Propiedad   | Tipo          | Valores / Notas                                      |
|-------------|---------------|------------------------------------------------------|
| OBJETIVOS   | title         | Nombre/objetivo de la reunion                        |
| Date        | date          |                                                      |
| ACUERDOS    | rich_text     | Acuerdos y pendientes                                |
| OBSERVACIONES| rich_text    | Observaciones detalladas                             |

Vista observada: `Untitled` table.

### DOCUMENTOS

| Propiedad   | Tipo          | Valores / Notas                                      |
|-------------|---------------|------------------------------------------------------|
| Nombre      | title         | Nombre del documento                                 |
| Tipo        | select        | Plano, Memoria de Cálculo, Estudio, Especificaciones Técnicas, Contrato, Presupuesto, Otro |
| Fecha       | date          | Fecha de emision o entrega                           |
| Versión     | rich_text     | ej: v1.0, Rev A                                      |
| Estado      | select        | Borrador, En Revisión, Aprobado, Entregado           |
| Link        | url           | URL a Drive, SharePoint u otro repositorio           |

Vista observada: `Default view` table.

### CONTACTOS CLIENTE

| Propiedad   | Tipo          | Valores / Notas                                      |
|-------------|---------------|------------------------------------------------------|
| Nombre      | title         |                                                      |
| Institución | rich_text     |                                                      |
| Tipo        | select        | Contraparte Técnica, Supervisor, Administrador de Contrato, Funcionario |
| Cargo       | rich_text     |                                                      |
| Email       | email         |                                                      |
| Teléfono    | phone_number  |                                                      |

Vista observada: `Default view` table.

## Patron de clasificacion de actividades por Entregable

Aplicado en PUENTE-TINGO (mayo 2026), como ejemplo historico:

- **Ensayos Tirantes**: actividades relacionadas con ensayos de tirantes de puente (traccion, instrumentacion, medicion in situ)
- **Ensayos Vigas Metalicas**: actividades de ensayos de vigas metalicas (vigas principales, diafragmas, soldaduras)
- **Modelo BIM**: actividades de modelado digital (levantamiento, modelado geometrico, parametrizacion, coordinacion, entregables digitales)

Al crear un proyecto nuevo, el agente debe inferir o preguntar cuales son los entregables reales del proyecto antes de cargar actividades, para poder clasificarlas correctamente. No copiar entregables de PUENTE-TINGO si no corresponden.

Ejemplo BIM/observaciones (Carretera Cañete):

- CDE / Entorno comun de datos
- PEB / TIP / LOD-LOI
- Modelos BIM por especialidad
- Modelo federado / compatibilizacion
- Reporte de interferencias
- Metrados BIM trazables
- Planos desde modelo
- Fichas descriptivas C1/C2
- Simulacion constructiva 4D / video
- Compatibilizacion socioambiental
- Matriz de levantamiento BIM
- Log de consultas BIM
- Gestion documental / accesos

## Flujo de creacion de proyecto nuevo desde esta plantilla

1. Preguntar al usuario: nombre del proyecto, base raiz destino, entregables principales.
2. Crear pagina del proyecto en la base raiz con `mcp__notion-easy__create_page`.
3. Crear las 4 bases de datos inline reales en orden:
   - ACTIVIDADES (con propiedades de la tabla anterior, incluyendo campo Entregable)
   - REUNIONES
   - DOCUMENTOS
   - CONTACTOS CLIENTE
4. Crear/ajustar vistas equivalentes a PUENTE-TINGO.
5. Verificar que no hayan quedado linked views dependientes de fuentes ocultas.
6. Si el usuario tiene actividades iniciales, cargarlas clasificadas por Entregable real del proyecto.
7. Reportar estructura creada y link de la pagina.

## Limitaciones conocidas

- No se puede ocultar el titulo (name) de una base de datos inline via API.
- No se pueden subir imagenes locales (solo URL publica externa).
- Botones nativos o bloques especiales pueden aparecer como `unsupported`; usar columnas/callouts enlazados si no se puede crear el boton exacto por API.
- `duplicate_page` no garantiza replicar bases internas con sus propiedades y vistas completas; preferir creacion manual con el patron anterior.
- Crear una linked database view no equivale a crear una base inline real. Si el usuario pide inline, usar base fuente propia con `is_inline: true`.
