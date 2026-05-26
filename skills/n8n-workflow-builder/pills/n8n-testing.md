---
name: n8n-testing
type: pill
local-only: false
---

# n8n Workflow Testing & Debugging

## Principio base

Todo workflow se testea **antes de activar en producción**, simulando los payloads reales sin conectar el servicio externo (WhatsApp, Slack, etc.).

---

## Nivel 1 — Simular lógica local (Node.js)

Cuando el workflow tiene un nodo `Code` central de routing (como `Normalizar + Detectar Comando`), extraer su `jsCode` y correrlo localmente con payloads simulados.

```bash
node test_normalizar.js
```

**Reglas del script de test:**
- Cada caso crea su **propio objeto `sd` (staticData) fresh** — nunca compartir estado entre tests
- Mockear `$getWorkflowStaticData` con un objeto plano
- Cubrir siempre estos casos mínimos:

| Caso | Qué verifica |
|---|---|
| Comando principal (`!genbot [prop]`) | Routing correcto al sub-workflow |
| Comando premium / catálogo / lote / fin | Cada branch del Switch |
| `fromMe: true` | El dueño del número puede usar el bot |
| Mensaje sin comando | Debe filtrarse (no llegar al router) |
| Grupo incorrecto | `is_target_group: false` → ignorado |
| Duplicado (mismo messageId × 2) | Dedup funciona |
| Comando vacío (`!genbot` solo) | Edge case — definir comportamiento |
| Mayúsculas (`!GENBOT`) | Case insensitive |
| Chat individual (no grupo) | `is_group: false` → ignorado |
| Con lote activo: texto sin comando | Auto-captura a cola |
| Con lote activo: imagen sin comando | Pasa a Vision (no a cola) |
| Con lote activo: `!genbot [prop]` | Va a cola, no a registrar |

**Estructura del payload Evolution (MESSAGES_UPSERT):**
```javascript
function buildPayload({ text, mediaType, fromMe, groupJid, participant, messageId, caption }) {
  const message = {};
  if (mediaType === 'text') message.conversation = text;
  else if (mediaType === 'image') message.imageMessage = { caption, mimetype: 'image/jpeg', url: '...' };
  else if (mediaType === 'document') message.documentMessage = { caption, fileName: 'doc.pdf', ... };
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

---

## Nivel 2 — Inspeccionar ejecuciones reales en VPS

Para bugs en nodos que requieren APIs reales (Drive, Sheets, Gemini, Evolution):

```powershell
# Buscar ejecuciones con error
GET /api/v1/executions?workflowId=ID&status=error&limit=20

# Inspeccionar una ejecución con detalle completo
GET /api/v1/executions/ID?includeData=true
```

Del resultado, extraer:
```powershell
$rd = $r.data.resultData
$rd.lastNodeExecuted          # último nodo ejecutado
foreach ($nodeName in $rd.runData.PSObject.Properties.Name) {
    $runs = $rd.runData.$nodeName
    foreach ($run in $runs) {
        if ($run.error) { Write-Output "ERROR in [$nodeName]: $($run.error.message)" }
    }
}
```

---

## Bugs conocidos y sus fixes

### `Cannot derive from empty media key` (Evolution API)
**Causa:** WhatsApp bundlea `senderKeyDistributionMessage` junto al `imageMessage` en el primer mensaje de un nuevo remitente. El payload completo confunde a Evolution.

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
**Causa:** n8n rechaza campos extras en `settings` al hacer PUT.

**Fix:** Limpiar `settings` a solo campos permitidos:
```powershell
$cleanSettings = @{ executionOrder = $wf.settings.executionOrder }
# Solo agregar si existen: saveManualExecutions, callerPolicy, errorWorkflow, timezone
```

### PUT rechazado: `active is read-only`
**Fix:** Nunca incluir `active` en el payload del PUT.

---

## Flujo de debug paso a paso

1. **Error en producción** → inspeccionar con `includeData=true`
2. **Identificar nodo fallido** → leer su `jsCode` o `jsonBody`
3. **Reproducir localmente** → construir payload que replique el error
4. **Fix** → aplicar en el nodo específico
5. **Re-descargar workflow fresco** antes de hacer PUT (evitar sobrescribir fixes anteriores)
6. **Verificar** → leer el nodo del workflow después del PUT para confirmar el cambio

---

## Arquitectura modular recomendada (sub-workflows)

Para workflows grandes (+50 nodos), modularizar en sub-workflows facilita el debug:

```
Main Orchestrator (15 nodos)
  ├── Normalizar + Detectar Comando (staticData: dedup + batchSessions)
  ├── Switch de routing (un output por comando)
  └── executeWorkflow → sub-workflows independientes:
       ├── sw-registrar  (registro individual)
       ├── sw-premium    (one page premium)
       ├── sw-catalogo   (catálogo PDF)
       └── sw-lote       (batch processing)
```

**Ventajas para debug:**
- Cada sub-workflow se puede testear aislado
- Los errores están contenidos — un fallo en registrar no afecta catalogo
- El main orchestrator tiene solo lógica de routing (fácil de leer y corregir)
- Sub-workflows usan `$('Trigger').item.json` — sin referencias cruzadas

**Regla:** Toda referencia a `$('Normalizar + Detectar Comando').item.json` dentro de un sub-workflow debe adaptarse a `$('Trigger').item.json` al construirlo.
