# n8n v2 Troubleshooting Notes

Notas compactas para resolver fallos frecuentes sin abrir una segunda skill.

## MCP Parcial O No Disponible

Ruta de decision:

1. Probar health check/listado MCP.
2. Si MCP falla, usar REST API directa con pill local.
3. Si la operacion solo es posible en UI, generar instrucciones concretas y archivo JSON importable.
4. Registrar la limitacion en el reporte final.

No asumir que todos los MCP n8n tienen las mismas capacidades. Validar herramientas disponibles en la sesion actual.

## Credenciales En n8n

Las credenciales viven en la instancia n8n.

Reglas:

- nunca pegar API keys dentro del workflow JSON;
- referenciar credenciales por `id` y `name` cuando existan;
- si no se conoce el ID, dejar placeholder claro y pedir asignacion en UI;
- no imprimir contenido del pill local.

## Execute Workflow / Sub-workflow

Sintomas:

- nodo importado con error;
- workflow hijo no aparece;
- ejecucion padre no pasa datos correctamente.

Acciones:

1. leer workflow padre e hijo;
2. confirmar trigger del hijo;
3. confirmar input/output esperado;
4. recrear o corregir el nodo `Execute Workflow`;
5. ejecutar desde el padre con datos de prueba.

## Wait Node No Reanuda

Revisar:

- modo de reanudacion correcto;
- formulario o webhook esperado;
- campos que luego evalua el IF;
- expiracion/timeout;
- si el flujo esta activo cuando corresponde.

## Expresiones

Checklist rapido:

- usar `={{ ... }}` en campos dinamicos;
- confirmar nombres exactos de nodos referenciados;
- preferir fallback explicito en campos opcionales;
- probar expresiones con datos reales de una ejecucion previa.

Ejemplos:

```javascript
{{ $json.field }}
{{ $('Node Name').first().json.field }}
{{ $json.url || 'sin-url' }}
```

## Import/Export Seguro

Antes de reimportar:

- guardar copia del JSON original;
- validar que no incluya secretos;
- revisar credenciales faltantes;
- probar en inactivo antes de activar.
