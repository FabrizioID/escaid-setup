# n8n - Potenciacion Vertical ESC-AI

Fecha: 2026-05-24

Objetivo: potenciar n8n como herramienta operativa central antes de saltar a otras skills. La prioridad no es sumar cosas al azar, sino convertir n8n en un sistema rapido, documentado, modular y mantenible.

## Criterio De Trabajo

Para cada herramienta del ecosistema, trabajar por vertical:

1. entender la herramienta actual;
2. detectar dolor operativo real;
3. buscar capacidades oficiales y repos externos utiles;
4. decidir adoptar, adaptar o ignorar;
5. reforzar la skill propia;
6. probar una ruta segura;
7. documentar lo aprendido.

En n8n el dolor principal detectado es que los workflows pueden crecer como mega-flujos: muchos nodos, poca separacion, poca anotacion y alto riesgo de romper produccion.

## Capacidades Oficiales Relevantes

| Capacidad | Uso para ESC-AI | Fuente |
|---|---|---|
| Sticky Notes | Documentar bloques dentro del canvas, agrupar nodos visualmente y explicar decisiones | https://docs.n8n.io/workflows/components/sticky-notes/ |
| Sub-workflows | Dividir mega-flujos en partes reutilizables y testeables | https://docs.n8n.io/flow-logic/subworkflows/ |
| Sub-workflow conversion | Extraer nodos existentes a sub-workflow desde un flujo grande | https://docs.n8n.io/workflows/subworkflow-conversion/ |
| Workflow history | Ver/restaurar versiones anteriores y descargar JSON de versiones | https://docs.n8n.io/workflows/history/ |
| Tags | Clasificar workflows por dominio, estado, cliente o criticidad | https://docs.n8n.io/workflows/tags/ |
| Public REST API | Listar, inspeccionar y operar workflows de forma programatica | https://docs.n8n.io/api/ |
| n8n CLI beta | Experimentar con listado, inspeccion, creacion desde JSON y ejecuciones | https://docs.n8n.io/api/n8n-cli/ |

## Potenciacion Recomendada

### 1. Workflow Documentation Mode

Antes de modificar un workflow grande:

- leer workflow completo;
- agrupar nodos por responsabilidad;
- generar mapa Markdown;
- proponer sticky notes;
- identificar credenciales usadas por nombre, sin secretos;
- marcar riesgos.

Entregable minimo:

```text
Objetivo:
Trigger:
Entrada esperada:
Bloques:
Nodos criticos:
Credenciales:
Salidas:
Riesgos:
Sub-workflows candidatos:
```

### 2. Visual Cleanup Mode

Cuando el flujo esta desordenado pero funciona:

- no cambiar logica todavia;
- ordenar por carriles/bloques;
- renombrar nodos con prefijos claros;
- agregar sticky notes por bloque;
- usar tags para estado y dominio.

Prefijos sugeridos:

```text
IN - entrada
NORM - normalizacion
DEC - decision
AI - razonamiento/generacion
WRITE - escritura
OUT - salida
ERR - errores
SUB - llamada a sub-workflow
```

### 3. Modularization Mode

Extraer sub-workflows por etapas, no de golpe.

Candidato bueno:

- bloque reutilizable;
- bloque de mas de 5-8 nodos;
- bloque con API/credencial propia;
- bloque que puede recibir input claro y devolver output claro;
- bloque que se puede probar aislado.

Secuencia:

1. backup/export JSON;
2. documentacion del bloque;
3. crear sub-workflow;
4. definir input en `Execute Sub-workflow Trigger`;
5. conectar desde padre;
6. ejecutar prueba con datos equivalentes;
7. solo despues limpiar el bloque anterior.

### 4. Versioning / Backups

Para workflows importantes:

- exportar JSON antes de cambios grandes;
- guardar snapshots en carpeta `workflows/` del proyecto si aplica;
- nombrar versiones importantes cuando el plan de n8n lo permita;
- usar workflow history como red de seguridad, no como unica fuente de versionado.

### 5. SkillOps n8n

La skill oficial sigue siendo `n8n-workflow-builder`.

Refuerzos ya agregados:

- modo documentacion y modularizacion de mega-flujos;
- reference pack n8n v2;
- criterio de sub-workflows;
- regla de no imprimir credenciales;
- REST fallback si MCP no alcanza.

## No Hacer

- No instalar otra skill n8n paralela si solo duplica `n8n-workflow-builder`.
- No partir un mega-flujo critico sin backup/export.
- No mover webhook maestro de Evolution API si el flujo depende de un unico webhook por instancia.
- No meter API keys dentro del JSON.
- No convertir todo en sub-workflows si el problema real es solo desorden visual.

## Siguiente Prueba Real

Elegir un workflow grande y ejecutar esta secuencia:

1. lectura completa;
2. reporte de bloques;
3. propuesta de sticky notes;
4. candidatos de sub-workflow;
5. elegir un bloque de bajo riesgo;
6. crear/validar sub-workflow solo si el usuario aprueba.

Workflow candidato actual: `Aecodito Centro de Operaciones v3.0` debe tratarse como critico y nunca modificarse con PUT completo.
