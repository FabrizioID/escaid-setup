# Evolution API — Referencia para n8n

## Endpoints principales

Base URL: `{{$env.EVOLUTION_BASE_URL}}` (ej: `https://evolution.midominio.com`)
Auth header: `apikey: {{$env.EVOLUTION_API_KEY}}`

### Enviar mensaje de texto al grupo
```
POST /message/sendText/{instanceName}
{
  "number": "GRUPO_ID@g.us",
  "text": "Mensaje del bot"
}
```

### Enviar mensaje con mención
```
POST /message/sendText/{instanceName}
{
  "number": "GRUPO_ID@g.us",
  "text": "@5491199999999 mensaje",
  "mentionsEveryOne": false,
  "mentioned": ["5491199999999@s.whatsapp.net"]
}
```

### Configurar webhook
```
POST /webhook/set/{instanceName}
{
  "url": "https://tu-n8n.com/webhook/evolution/whatsapp",
  "webhook_by_events": true,
  "webhook_base64": false,
  "events": ["MESSAGES_UPSERT"]
}
```

## Payload del webhook (MESSAGES_UPSERT)

```json
{
  "event": "messages.upsert",
  "instance": "nombre-instancia",
  "data": {
    "key": {
      "remoteJid": "GRUPO_ID@g.us",
      "fromMe": false,
      "id": "MESSAGE_ID",
      "participant": "5491199999999@s.whatsapp.net"
    },
    "message": {
      "conversation": "Texto del mensaje",
      "imageMessage": { "url": "...", "mimetype": "image/jpeg", "caption": "..." },
      "videoMessage": { "url": "...", "mimetype": "video/mp4" },
      "documentMessage": { "url": "...", "fileName": "archivo.pdf" }
    },
    "messageType": "conversation",
    "pushName": "Nombre del contacto",
    "instanceId": "ID_INSTANCIA"
  }
}
```

## Campos clave para el agente /ref

| Campo | Path en payload | Descripción |
|---|---|---|
| Texto del mensaje | `data.message.conversation` | Mensaje de texto plano |
| Grupo ID | `data.key.remoteJid` | Termina en `@g.us` si es grupo |
| Usuario que envía | `data.key.participant` | Número + `@s.whatsapp.net` |
| Nombre del contacto | `data.pushName` | Nombre guardado en WA |
| URL de imagen | `data.message.imageMessage.url` | URL firmada (expira) |
| URL de video | `data.message.videoMessage.url` | URL firmada (expira) |
| Es mensaje de grupo | `data.key.remoteJid.endsWith('@g.us')` | Boolean útil para filtrar |

## Detección del comando /ref en Code Node

```javascript
const message = $json.data.message.conversation || '';
const isGroup = $json.data.key.remoteJid.endsWith('@g.us');
const isCommand = message.trim().toLowerCase().startsWith('/ref');

return [{ json: { isCommand, isGroup, message, ...($json.data) } }];
```

## Notas importantes

- Las URLs de media (`imageMessage.url`, `videoMessage.url`) son firmadas y expiran en ~5 minutos. Descargar inmediatamente si se va a subir a Drive.
- `participant` solo existe en mensajes de grupo. En mensajes privados, el remitente es `remoteJid`.
- `fromMe: true` significa que el mensaje lo envió el propio bot/número conectado — filtrar para no procesar los mensajes propios.
- La instancia debe tener `MESSAGES_UPSERT` habilitado en el webhook para recibir mensajes.
