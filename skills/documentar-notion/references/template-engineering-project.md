# Template: Proyecto de Ingenieria

Perfil de plantilla derivado del proyecto PUENTE-TINGO (mayo 2026). Usar como referencia para crear nuevos proyectos de ingenieria estructural, obra civil o consultoría con bases de datos operativas en Notion.

## Estructura general de la pagina de proyecto

```
[Pagina del proyecto] — creada dentro de una base raiz de proyectos
  ├── PROCESO        (base de datos inline — actividades y entregables)
  ├── REUNIONES      (base de datos inline — minutas y acuerdos)
  ├── EQUIPO         (base de datos inline — miembros y roles)
  ├── DOCUMENTOS     (base de datos inline — planos, informes, archivos)
  └── CONTACTOS CLIENTE (base de datos inline — stakeholders)
```

Los titulos de seccion se muestran directamente como el titulo (name) de cada base de datos inline. No agregar H2/H3 headings redundantes encima de las bases; generan duplicidad visual que no se puede ocultar via API.

## IDs de referencia (PUENTE-TINGO)

- Pagina del proyecto: `1d5d8cc4-cfc1-8090-8d55-c4da6d801474`
- Base raiz (parent DB): `9c3311ac-1535-43eb-bcbc-a6d5e3637a6b`
- PROCESO DB: `1dcd8cc4-cfc1-80e4-a666-e11f8d36a286`
- REUNIONES DB: `1dcd8cc4-cfc1-80e1-b17d-ccd249f70c33`
- EQUIPO DB: `2c1361d0-94e8-4f28-a603-f58b9c1741ca`
- DOCUMENTOS DB: `8c081802-c72b-4132-82cd-9608e3d129c3`
- CONTACTOS CLIENTE DB: `2cb01817-ce2f-4f28-aecb-ff2e8d0df0c1`

## Schemas de propiedades

### PROCESO (actividades del proyecto)

| Propiedad   | Tipo          | Valores / Notas                                      |
|-------------|---------------|------------------------------------------------------|
| Actividad   | title         | Nombre de la actividad                               |
| Status      | select        | PENDIENTE, EN CURSO, COMPLETADO, BLOQUEADO           |
| Entregable  | select        | Agrupa actividades por entregable (ej: Modelo BIM, Ensayos Vigas Metalicas, Ensayos Tirantes) |
| % Avance    | number        | 0–100. Format: percent                               |
| Responsable | people        | Miembro del equipo asignado                          |
| Fecha Inicio| date          |                                                      |
| Fecha Fin   | date          |                                                      |
| Notas       | rich_text     |                                                      |

Vista recomendada: tabla agrupada por `Entregable`, filtrable por `Status`.

### REUNIONES

| Propiedad   | Tipo          | Valores / Notas                                      |
|-------------|---------------|------------------------------------------------------|
| Reunion     | title         | Nombre/descripcion de la reunion                     |
| Fecha       | date          |                                                      |
| Tipo        | select        | Kickoff, Revision, Coordinacion, Cierre              |
| Participantes| people       |                                                      |
| Acuerdos    | rich_text     |                                                      |
| Pendientes  | rich_text     |                                                      |
| Proxima reunion| date       |                                                      |

### EQUIPO

| Propiedad   | Tipo          | Valores / Notas                                      |
|-------------|---------------|------------------------------------------------------|
| Nombre      | title         |                                                      |
| Rol         | select        | Director, Coordinador, Especialista, Apoyo           |
| Empresa     | rich_text     |                                                      |
| Email       | email         |                                                      |
| Telefono    | phone_number  |                                                      |
| Activo      | checkbox      |                                                      |

### DOCUMENTOS

| Propiedad   | Tipo          | Valores / Notas                                      |
|-------------|---------------|------------------------------------------------------|
| Documento   | title         | Nombre del documento                                 |
| Tipo        | select        | Plano, Informe, Especificacion, Acta, Contrato, Otro |
| Estado      | select        | Borrador, Revision, Aprobado, Entregado              |
| Version     | rich_text     | ej: v1.0, Rev A                                      |
| Fecha       | date          | Fecha de emision o entrega                           |
| Responsable | people        |                                                      |
| Link        | url           | URL a Drive, SharePoint u otro repositorio           |

### CONTACTOS CLIENTE

| Propiedad   | Tipo          | Valores / Notas                                      |
|-------------|---------------|------------------------------------------------------|
| Nombre      | title         |                                                      |
| Cargo       | rich_text     |                                                      |
| Empresa     | rich_text     |                                                      |
| Email       | email         |                                                      |
| Telefono    | phone_number  |                                                      |
| Area        | select        | Tecnica, Administrativa, Comercial, Directiva        |

## Patron de clasificacion de actividades por Entregable

Aplicado en PUENTE-TINGO (mayo 2026):

- **Ensayos Tirantes**: actividades relacionadas con ensayos de tirantes de puente (traccion, instrumentacion, medicion in situ)
- **Ensayos Vigas Metalicas**: actividades de ensayos de vigas metalicas (vigas principales, diafragmas, soldaduras)
- **Modelo BIM**: actividades de modelado digital (levantamiento, modelado geometrico, parametrizacion, coordinacion, entregables digitales)

Al crear un proyecto nuevo, el agente debe preguntar cuales son los entregables del proyecto antes de cargar actividades, para poder clasificarlas correctamente.

## Flujo de creacion de proyecto nuevo desde esta plantilla

1. Preguntar al usuario: nombre del proyecto, base raiz destino, entregables principales.
2. Crear pagina del proyecto en la base raiz con `mcp__notion-easy__create_page`.
3. Crear las 5 bases de datos inline en orden con `mcp__notion-easy__create_database`:
   - PROCESO (con propiedades de la tabla anterior, incluyendo campo Entregable)
   - REUNIONES
   - EQUIPO
   - DOCUMENTOS
   - CONTACTOS CLIENTE
4. Verificar que no hayan quedado titulos duplicados (H3 + titulo de base). Si hay H3 redundante, archivarlo con `mcp__notion-easy__update_block` pasando `archived: true` con el block_id del H3.
5. Si el usuario tiene actividades iniciales, cargarlas con `mcp__notion-easy__add_database_entries` clasificadas por Entregable.
6. Reportar estructura creada y link de la pagina.

## Limitaciones conocidas

- No se puede ocultar el titulo (name) de una base de datos inline via API.
- No se pueden subir imagenes locales (solo URL publica externa).
- Vistas avanzadas (Kanban agrupado, Timeline, Calendar) requieren configuracion manual posterior en Notion UI.
- `duplicate_page` no garantiza replicar bases internas con sus propiedades y vistas completas; preferir creacion manual con el patron anterior.
