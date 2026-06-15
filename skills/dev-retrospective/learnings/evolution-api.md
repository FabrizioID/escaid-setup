# Learnings: Evolution API (WhatsApp)

Errores, gotchas y patrones aprendidos en sesiones de desarrollo real.
Más reciente primero. Leer antes de trabajar en este dominio.

---

## 2026-06-08 — Webhook con MESSAGES_UPDATE/SEND_MESSAGE → mensajes sueltos y sesiones fantasma

**Dominio**: Evolution API / n8n
**Severidad**: 🔴 Crítico
**Contexto**: Agente inmobiliario; "a veces aparecen sesiones que nadie activó" y se registran propiedades vacías solas.

**Síntoma**:
Sesiones que se abren solas ("Sesión iniciada para EQUIPO BRALLAN" con un nombre de días atrás), propiedades fantasma registradas (`PROP-AAAAMMDD-HHMMSS` con timestamp viejo), mensajes sueltos del bot.

**Causa raíz**:
El webhook estaba suscrito a 3 eventos (`GET /webhook/find/{instance}`):
- `MESSAGES_UPSERT` ✅ (mensajes nuevos — el único necesario)
- `MESSAGES_UPDATE` ❌ re-entrega datos de un mensaje VIEJO cada vez que cambia de estado (entregado/leído/reacción/editado) → el orquestador lo reprocesa como nuevo → reabre sesiones y registra props viejas.
- `SEND_MESSAGE` ❌ re-entrega como webhook cada mensaje que el PROPIO bot envía (eco).
El dedup interno solo recordaba IDs 2 min → replays de horas/días después pasaban limpios.

**Fix aplicado**:
```bash
# Dejar SOLO MESSAGES_UPSERT
curl -X POST "http://HOST:8080/webhook/set/INSTANCE" \
  -H "apikey: KEY" -H "Content-Type: application/json" \
  -d '{"webhook":{"enabled":true,"url":"<n8n-webhook>","webhookByEvents":false,"webhookBase64":false,"events":["MESSAGES_UPSERT"]}}'
# Verificar con GET /webhook/find/INSTANCE
```
Defensa en n8n (Normalizar): descartar mensajes con `data.messageTimestamp` > N segundos (replay) + subir TTL del dedup (2min → 30min).

**Cómo detectarlo antes**:
Al montar el webhook, suscribir SOLO a `MESSAGES_UPSERT` salvo que se necesite explícitamente read-receipts. El agente nunca necesita escuchar `SEND_MESSAGE` (sus propios mensajes). Verificar siempre con `GET /webhook/find/{instance}`.

**Tags**: #evolution #webhook #messages-upsert #messages-update #send-message #replay #dedup #sesiones

---

## 2026-06-08 — Número compartido humano+agente: no se puede usar `fromMe`, discriminar con ZWSP

**Dominio**: Evolution API / n8n
**Severidad**: 🟡 Importante
**Contexto**: El asesor escribe desde el MISMO número conectado a Evolution y espera que ese número responda como bot.

**Síntoma**:
El bot confunde sus propios mensajes con los del humano (o viceversa). El mensaje de Ayuda se acumulaba como si fuera datos de la propiedad dentro de una sesión activa.

**Causa raíz**:
Con número compartido, TODO llega `fromMe:true` (humano y bot). `fromMe` no sirve para distinguir. El único discriminador es una marca invisible: **ZWSP (`String.fromCharCode(8203)`, U+200B)** al inicio de cada mensaje del bot — el humano nunca lo teclea. Si UN mensaje del bot no lleva el ZWSP (faltaba en "Enviar Ayuda"), se clasifica como humano.

**Fix aplicado**:
- TODO mensaje que emite el bot empieza con ZWSP, sin excepción (regla dura).
- En acumulación de sesión: ignorar mensajes con `mensajeRaw.charCodeAt(0) === 8203` (son del bot).
- Responder NO depende del webhook: el bot habla por HTTP saliente (`/message/sendText`), así que quitar `SEND_MESSAGE` no afecta enviar ni recibir.

**Cómo detectarlo antes**:
Si humano y bot comparten número → nunca filtrar por `fromMe` para decidir si procesar; usar marca de contenido (ZWSP) o tracking de IDs enviados. Auditar que CADA nodo de envío del bot lleve el ZWSP.

**Tags**: #evolution #numero-compartido #fromme #zwsp #u200b #sesiones #acumulacion

---
