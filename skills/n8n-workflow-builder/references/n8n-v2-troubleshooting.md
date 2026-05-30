# n8n v2 Troubleshooting Notes

Notas compactas para resolver fallos frecuentes sin abrir una segunda skill.

## Servidores de Proceso Externos — Persistencia en Contenedor Alpine

Cuando el workflow llama a un servidor local (`localhost:PUERTO`) instalado dentro del contenedor n8n (Puppeteer, scripts Node, servicios custom):

- El contenedor n8n VPS usa **Alpine Linux** — usar `sh`, no `bash`
- Procesos lanzados con `node -e "..." &` desde la terminal de EasyPanel **mueren cuando la sesión se cierra**
- Para hacerlos persistentes: usar un proceso manager (`pm2`, `supervisord`) o script de inicio en el contenedor
- PID guardado en `/tmp/archivo.pid` no garantiza que el proceso siga vivo tras reinicio del contenedor
- Si el servidor externo cae → `finished: false` en las ejecuciones, no un error de nodo

Síntoma: workflow con 5+ errores consecutivos `finished: false` en ventana de 4 segundos justo después de haber reiniciado la terminal.

Fix inmediato: abrir terminal EasyPanel (modo **Sh**, no Bash), relanzar el servidor, confirmar que `cat /tmp/pid` devuelve un número y `echo "SERVER_OK"`.

## runOnceForAllItems vs runOnceForEachItem — disponibilidad de $helpers

En versiones antiguas de n8n VPS:

| Modo | `$helpers.getBinaryDataBuffer` | `$helpers.httpRequest` |
|---|---|---|
| `runOnceForAllItems` | ❌ no disponible | ❌ no disponible |
| `runOnceForEachItem` | ✅ disponible | ✅ disponible |

Si el Code Node necesita leer binarios o hacer HTTP con helpers, debe usar `runOnceForEachItem`. El modo `runOnceForAllItems` solo tiene acceso a `$items()`, `$node`, y globals básicos.

## Compatibilidad hacia atrás en sub-workflows

Cuando se agrega un comando nuevo que termina llamando a un sub-workflow existente (`sw-registrar`, `sw-premium`, etc.), verificar qué campos espera ese sub-workflow en `$('Trigger').item.json`.

Si los campos tienen nombres distintos o faltan, el sub-workflow falla silenciosamente (sin error visible en el orquestador).

Checklist al agregar comando nuevo:
- [ ] Listar todos los campos que usa el sub-workflow destino
- [ ] Confirmar que el nuevo comando los propaga con los mismos nombres
- [ ] Si el comando cierra una sesión acumulada, reconstruir los campos desde `sessionData` antes de llamar al sub-workflow

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
