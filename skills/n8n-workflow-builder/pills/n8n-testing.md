---
name: n8n-testing
type: pill
local-only: false
---

# n8n Workflow Testing & Debugging

**Coordinación con qa-dev-tester:**
- Pre-deploy (auditoría de código, binarios, helpers) → `qa-dev-tester` Momento 1
- Casuística funcional post-deploy → `qa-dev-tester` Momento 2
- Stress testing / concurrencia / carga → `qa-dev-tester` Momento 3
- **Este pill cubre:** debugging de producción rota (Modo A) y runner local de routing (Modo B)

Hay dos momentos distintos: **algo se rompió** y **quiero probar antes de subir**. El protocolo es diferente en cada caso.

---

## MODO A — Algo se rompió en producción

### Paso 1 — Leer la firma de las últimas ejecuciones (READ-ONLY, sin tocar nada)

```bash
GET https://VPS/api/v1/executions?workflowId=ID&limit=10&includeData=false
```

> Si el MCP devuelve 0 resultados para ese workflowId → el MCP apunta a la instancia equivocada. Usar REST API directa contra el VPS correcto.

### Paso 2 — Clasificar el tipo de falla

| Firma | Diagnóstico | Qué hacer |
|---|---|---|
| `finished: false` + 1-5 seg + runData vacío | **Falla de infra** — el workflow murió antes de correr cualquier nodo | NO tocar código. Verificar dependencias externas |
| `finished: true` + `status: error` | **Falla de lógica** — un nodo específico falló | Leer qué nodo con `includeData=true` |
| Burst 10+ ejecuciones en < 1 min | **Loop o flood** — sesión abierta sin cerrar, o mensajes duplicados | Revisar staticData de sesiones |
| 0 ejecuciones | **Instancia equivocada** | Cambiar a REST API directa |

**Regla clave:** `finished: false` con runData vacío = causa SIEMPRE externa al código (servidor caído, connection refused, sub-workflow inactivo). Cambiar código no lo arregla.

### Paso 3 — Para falla de infra: verificar dependencias antes de tocar nada

- ¿El servidor externo responde? → `curl http://host:puerto`
- ¿La credencial sigue válida? → probar endpoint simple con la misma key
- ¿El sub-workflow llamado está activo? → listar workflows, verificar `active: true`
- ¿El proceso background sigue vivo? → `cat /tmp/pid.pid` en terminal del contenedor

Solo cuando la dependencia está confirmada funcionando → pasar al siguiente paso.

### Paso 4 — Para falla de lógica: reproducir localmente

```bash
# Obtener el payload exacto que falló
GET https://VPS/api/v1/executions/ID?includeData=true
```

Extraer del nodo `Normalizar + Detectar Comando` el JSON de salida → ese es el input real que llegó al nodo fallido. Reproducirlo localmente antes de tocar el código en producción.

### Paso 5 — Fix + verificación

1. Aplicar el fix en el nodo específico (no globalmente)
2. Re-descargar el workflow fresco antes de hacer PUT (evitar sobrescribir fixes anteriores)
3. Hacer PUT
4. Leer el nodo después del PUT para confirmar que el cambio quedó
5. Disparar una ejecución real mínima y verificar que `finished: true` y `status: success`

### Paso 6 — Solo entonces: pedir test manual al humano

El test manual es la forma más costosa de verificación. Solo se pide cuando:
- La dependencia externa está confirmada activa
- El fix está aplicado y verificado en el nodo
- Se hizo al menos una ejecución automática que pasó

**No pedir al humano que pruebe algo que a priori va a fallar.**

---

## MODO B — Antes de hacer deploy (workflow nuevo o cambio de lógica)

### Nivel 1 — Simular el nodo de routing localmente (sin APIs reales)

Extraer el `jsCode` del nodo `Normalizar + Detectar Comando` y correrlo con payloads simulados:

```bash
node test-normalizar.js <ruta-al-codigo.js>
```

El runner auto-detecta: TARGET_GROUPS, prefijos de comando, subcomandos, tipos de sesión, timeout. Genera casos solos. Si se agrega un comando nuevo al código, aparece automáticamente en los casos.

**Casos mínimos a cubrir:**

| Comportamiento | Qué verifica |
|---|---|
| Comando principal + grupo correcto | Routing al sub-workflow |
| Cada subcomando en el código | Cada branch del router |
| `fromMe: true` | El owner puede usar el bot |
| Grupo incorrecto | `is_target_group: false` → ignorado |
| Duplicado (mismo messageId × 2) | Dedup funciona |
| Comando en mayúsculas | Case insensitive |
| Chat individual | `is_group: false` → ignorado |
| Sesión activa + audio/video | `es_xxx_acumulado: false` — NO acumula |
| Sesión activa + texto/imagen/location | `es_xxx_acumulado: true` — SÍ acumula |
| Timeout de sesión expirado | No acumula, `prop_active: false` |

**Payload de prueba (Evolution MESSAGES_UPSERT):**
```javascript
function buildPayload({ text, mediaType, fromMe, groupJid, participant, messageId }) {
  const message = {};
  if (mediaType === 'text') message.conversation = text;
  else if (mediaType === 'image') message.imageMessage = { caption: '', mimetype: 'image/jpeg', url: '...' };
  return {
    data: {
      key: { remoteJid: groupJid, fromMe, id: messageId, participant },
      message,
      messageType: mediaType === 'text' ? 'conversation' : mediaType + 'Message',
      pushName: 'Asesor Test'
    }
  };
}
```

### Nivel 2 — Sub-workflows: testear aislados antes del orquestador

Cada sub-workflow (`sw-registrar`, `sw-premium`, `sw-lote`) se testea con datos reales enviados directo al trigger — sin pasar por el orquestador. Esto permite confirmar que el sub-workflow funciona correctamente antes de activar el flujo completo.

**Checklist pre-deploy:**
- [ ] `validate_workflow` sin errores
- [ ] Nivel 1 (local): todos los casos del runner pasan
- [ ] Sub-workflows activos antes de activar el orquestador
- [ ] Caso de grupo incorrecto: no responde
- [ ] Caso de duplicado: responde solo una vez
- [ ] Al menos una ejecución real completa verificada con `finished: true`
- [ ] **Code node nuevo con `this.helpers.*`**: probar en aislado con test manual en n8n UI antes de conectar al flujo. Nunca asumir que un helper existe — verificar con `Object.keys(this.helpers || {})`. El nodo debe nacer con try/catch visible.

---

## Compatibilidad al agregar comandos nuevos

Cuando el comando nuevo termina llamando a un sub-workflow existente (`sw-registrar`, `sw-premium`, etc.):

1. Leer el sub-workflow destino y listar todos los campos que lee de `$('Trigger').item.json`
2. Confirmar que el nuevo comando propaga esos campos con los mismos nombres
3. Si el comando cierra una sesión acumulada → reconstruir los campos desde `sessionData` antes de llamar al sub-workflow

**No asumir compatibilidad. Verificar campo por campo.**

---

## Nodo Diagnóstico — Agregar Antes de Cualquier Nodo Problemático

Cuando un nodo httpRequest, Code node o API falla con datos inesperados, insertar este Code node **justo antes** del nodo problemático para ver exactamente qué llega:

```javascript
// DIAGNOSTIC — remover antes de producción
const item = $input.first();
const bkeys = Object.keys(item.binary || {});
return [{
  json: {
    json_keys: Object.keys(item.json || {}),
    json_sample: Object.fromEntries(Object.entries(item.json||{}).slice(0,5).map(([k,v])=>[k,String(v).slice(0,80)])),
    binary_keys: bkeys,
    binary_info: Object.fromEntries(bkeys.map(k => [k, {
      mimeType: item.binary[k]?.mimeType,
      dataPrefix: String(item.binary[k]?.data||'').slice(0,30),
      fileName: item.binary[k]?.fileName
    }]))
  },
  binary: item.binary || {}
}];
```

**Casos de uso**:
- httpRequest con `formBinaryData` falla → ver si los binarios tienen `data_start=filesystem-v2` o base64
- GPT Edits recibe "Missing required parameter: image" → ver si `canvas`/`data`/`data2`... están presentes
- Split/Merge produce items vacíos → ver qué keys tiene cada item

**Resultado**: aparece en el execution output del nodo diagnóstico — abrir en n8n UI para ver.

---

## Bugs conocidos y sus fixes

### `Cannot derive from empty media key` (Evolution API)
**Causa:** WhatsApp bundlea `senderKeyDistributionMessage` junto al `imageMessage` en el primer mensaje de un nuevo remitente.

**Fix en `Descargar Media de Evolution` → jsonBody:**
```javascript
={{ JSON.stringify({
  message: {
    key: $json.raw_key,
    message: $json.raw_message.imageMessage ? { imageMessage: $json.raw_message.imageMessage }
           : $json.raw_message.documentMessage ? { documentMessage: $json.raw_message.documentMessage }
           : $json.raw_message.videoMessage ? { videoMessage: $json.raw_message.videoMessage }
           : $json.raw_message
  },
  convertToMp4: false
}) }}
```

### PUT rechazado: `settings must NOT have additional properties`
**Fix:** Limpiar `settings` a solo campos permitidos:
```javascript
const cleanSettings = { executionOrder: wf.settings.executionOrder };
// Agregar solo si existen: saveManualExecutions, callerPolicy, errorWorkflow, timezone
```

### PUT rechazado: `active is read-only`
**Fix:** Nunca incluir `active` en el payload del PUT.

---

## Arquitectura modular recomendada

```
Main Orchestrator (15 nodos)
  ├── Normalizar + Detectar Comando  (staticData: dedup + sessions)
  ├── Router Comandos (Switch)
  └── executeWorkflow → sub-workflows independientes:
       ├── sw-registrar  (registro individual)
       ├── sw-premium    (one page premium)
       ├── sw-catalogo   (catálogo PDF)
       └── sw-lote       (batch processing)
```

**Ventajas para debug:** errores contenidos por sub-workflow, cada uno testeable en aislado, orquestador solo hace routing.

**Regla:** referencias a `$('Normalizar + Detectar Comando').item.json` dentro de sub-workflows → cambiar a `$('Trigger').item.json`.
