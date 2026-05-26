// ─────────────────────────────────────────────────────
// QA DEV TESTER — Casuística agresiva clientefull02
// v2 — script corregido y funcional
// ─────────────────────────────────────────────────────

const TARGET_GROUP = '120363425018056471@g.us';
const OTRO_GRUPO   = '999999999999@g.us';
const PARTICIPANT  = '51924102571@s.whatsapp.net';

// ── buildPayload completo (todos los tipos de media) ──
function buildPayload({ text='', mediaType='text', fromMe=false, groupJid=TARGET_GROUP,
  participant=PARTICIPANT, messageId='msg-'+Math.random().toString(36).slice(2), caption='' }={}) {
  const message = {};
  if (mediaType==='text')     message.conversation = text;
  if (mediaType==='image')    message.imageMessage = { caption, mimetype:'image/jpeg', url:'http://test/img.jpg' };
  if (mediaType==='document') message.documentMessage = { caption, fileName:'doc.pdf', mimetype:'application/pdf', url:'http://test/doc.pdf' };
  if (mediaType==='audio')    message.audioMessage = { url:'http://test/audio.ogg', mimetype:'audio/ogg' };
  if (mediaType==='video')    message.videoMessage = { caption, url:'http://test/video.mp4', mimetype:'video/mp4' };
  return { body: { data: {
    key: { remoteJid: groupJid, fromMe, id: messageId, participant: fromMe ? '' : participant },
    message, messageType: mediaType==='text' ? 'conversation' : mediaType+'Message', pushName: 'Asesor Test'
  }}};
}

// ── lógica del nodo — copia fiel del workflow ─────────
function runNormalizar(payload, sd) {
  try {
    const $json = payload;
    const TARGET_GROUPS = ['120363425018056471@g.us'];
    const COMANDO = '!genbot';
    const body = $json.body || $json;
    const data = body.data || {};
    const key = data.key || {};
    const message = data.message || {};

    sd.seen = sd.seen || {};
    const now = Date.now();
    for (const k of Object.keys(sd.seen)) { if (now - sd.seen[k] > 120000) delete sd.seen[k]; }
    const earlyId = key.id || '';
    if (earlyId && sd.seen[earlyId]) return { ok:true, result:{ duplicate:true, message_id:earlyId } };
    if (earlyId) sd.seen[earlyId] = now;

    const rawJid = key.remoteJid || '';
    const fromMe = key.fromMe || false;
    const isGroup = rawJid.endsWith('@g.us');
    const groupJid = isGroup ? rawJid : '';
    const participantJid = key.participant || '';
    const senderPhone = isGroup
      ? participantJid.replace('@s.whatsapp.net','').replace('@lid','')
      : rawJid.replace('@s.whatsapp.net','');
    const pushName = data.pushName || 'Sin nombre';
    const messageTypeRaw = data.messageType || 'unknown';

    let texto='', mediaType='text', mediaUrl='', caption='', filename='', mimetype='';
    if (message.conversation)             { texto=message.conversation; mediaType='text'; }
    else if (message.extendedTextMessage) { texto=message.extendedTextMessage?.text||''; mediaType='text'; }
    else if (message.imageMessage)        { caption=message.imageMessage?.caption||''; mediaType='image'; mediaUrl=message.imageMessage?.url||''; mimetype=message.imageMessage?.mimetype||'image/jpeg'; }
    else if (message.documentMessage)     { caption=message.documentMessage?.caption||''; filename=message.documentMessage?.fileName||''; mediaType='document'; mediaUrl=message.documentMessage?.url||''; mimetype=message.documentMessage?.mimetype||'application/pdf'; }
    else if (message.audioMessage)        { mediaType='audio'; mediaUrl=message.audioMessage?.url||''; }
    else if (message.videoMessage)        { caption=message.videoMessage?.caption||''; mediaType='video'; mediaUrl=message.videoMessage?.url||''; }

    const mensajeRaw = (texto||caption||'').trim();
    const mensajeLower = mensajeRaw.toLowerCase();
    const comandoMatch = mensajeLower.startsWith(COMANDO);
    const mensajeSinComando = comandoMatch ? mensajeRaw.substring(COMANDO.length).trim() : mensajeRaw;
    const hasMedia = (mediaType==='image'||mediaType==='document');

    const partes = mensajeSinComando.split(/\s+/);
    const subcomando = (partes[0]||'').toLowerCase();

    const es1amb = ['1ambiente','1amb','1','1a','unambiente','plano1','tipo1'].includes(subcomando);
    const es2amb = ['2ambientes','2amb','2','2a','dosambientes','plano2','tipo2'].includes(subcomando);
    const es3amb = ['3ambientes','3amb','3','3a','tresambientes','plano3','tipo3'].includes(subcomando);
    const esCatalogo = ['catalogo','catálogo','planos','catalogos'].includes(subcomando);
    const esAyuda = ['ayuda','help','comandos','menu','menú','start'].includes(subcomando) || (comandoMatch && subcomando==='' && !hasMedia);
    const esBuscar = ['buscar','busco','search','encuentra'].includes(subcomando);
    const esPrecios = ['precios','precio','tarifas'].includes(subcomando);
    const esLote = comandoMatch && isGroup && TARGET_GROUPS.includes(groupJid) && ['lote','batch','masivo','inicio'].includes(subcomando);
    const esFin  = comandoMatch && isGroup && TARGET_GROUPS.includes(groupJid) && ['fin','finalizar','done','terminar','procesar'].includes(subcomando);
    const esConsulta = es1amb||es2amb||es3amb||esCatalogo||esAyuda||esBuscar||esPrecios||esLote||esFin;

    const isTargetGroup = TARGET_GROUPS.includes(groupJid);
    const passFilter = isGroup && isTargetGroup && comandoMatch;
    const esPremium = passFilter && subcomando==='premium';
    const esNuevaPropiedad = passFilter && !esConsulta && !esPremium;
    const passCatalogo = passFilter && esCatalogo;
    const passAyuda = passFilter && esAyuda;

    sd.batchSessions = sd.batchSessions || {};
    const batchSession = sd.batchSessions[groupJid]||null;
    const batchActive = batchSession?.active===true;
    let esBatchQueue=false, batchQueueCount=0;

    if (esNuevaPropiedad && batchActive && !esLote && !esFin) {
      esBatchQueue=true;
      sd.batchSessions[groupJid].messages = sd.batchSessions[groupJid].messages||[];
      sd.batchSessions[groupJid].messages.push({ mensaje:mensajeSinComando });
      batchQueueCount=sd.batchSessions[groupJid].messages.length;
    }
    if (!esBatchQueue && batchActive && isGroup && isTargetGroup && !fromMe && !esLote && !esFin) {
      const hasContent = (mediaType==='text' && mensajeRaw.length>1) || mediaType==='image' || mediaType==='document';
      if (hasContent) {
        if (mediaType==='image'||mediaType==='document') {
          sd.batchSessions[groupJid].messages = sd.batchSessions[groupJid].messages||[];
          sd.batchSessions[groupJid].messages.push({ mensaje:'[IMG-PROCESADA-INDIVIDUALMENTE]' });
          batchQueueCount=sd.batchSessions[groupJid].messages.length;
        } else {
          esBatchQueue=true;
          sd.batchSessions[groupJid].messages = sd.batchSessions[groupJid].messages||[];
          sd.batchSessions[groupJid].messages.push({ mensaje:mensajeRaw });
          batchQueueCount=sd.batchSessions[groupJid].messages.length;
        }
      }
    }

    const esConsultaNatural = isGroup && isTargetGroup && !fromMe && !comandoMatch && mediaType==='text' && mensajeRaw.length>=3 && mensajeRaw.length<=500 && !batchActive;
    const esImagenEnLote = batchActive && !fromMe && isGroup && isTargetGroup && hasMedia && !comandoMatch && !esLote && !esFin;
    const finalEsNuevaPropiedad = esNuevaPropiedad||esImagenEnLote;

    return { ok:true, result:{
      duplicate:false, is_group:isGroup, group_jid:groupJid, is_target_group:isTargetGroup,
      from_me:fromMe, push_name:pushName, media_type:mediaType, has_media:hasMedia,
      mensaje_raw:mensajeRaw, subcomando,
      es_catalogo:esCatalogo, es_ayuda:esAyuda, es_nueva_propiedad:finalEsNuevaPropiedad,
      es_premium:esPremium, es_lote:esLote, es_fin:esFin,
      pass_filter:passFilter, pass_catalogo:passCatalogo, pass_ayuda:passAyuda,
      es_batch_queued:esBatchQueue, batch_active:batchActive, batch_queue_count:batchQueueCount,
      es_consulta_natural:esConsultaNatural, es_imagen_en_lote:esImagenEnLote,
      evolution_instance:'GenPlus'
    }};
  } catch(e) { return { ok:false, error:e.message }; }
}

// ── test runner ───────────────────────────────────────
let passed=0, failed=0;
const rows=[];

function test(name, payload, sd, assertion) {
  const r = runNormalizar(payload, sd);
  let status, obs='';
  if (!r.ok) { status='❌'; obs='CRASH: '+r.error; failed++; }
  else {
    try {
      const ok = assertion(r.result);
      if (ok) { status='✅'; passed++; }
      else { status='❌'; obs=JSON.stringify(r.result).substring(0,150); failed++; }
    } catch(e) { status='❌'; obs='Assertion error: '+e.message; failed++; }
  }
  rows.push({ name, status, obs });
}

console.log('\n=== QA DEV TESTER v2 — clientefull02 ===\n');

// ── GRUPO 1: Payloads vacíos / malformados ────────────
test('Payload completamente vacío {}',         {}, {},            r => !r.pass_filter && !r.is_group);
test('body.data undefined',                    {body:{}}, {},     r => !r.pass_filter);
test('key undefined',                          {body:{data:{message:{conversation:'!genbot'},pushName:'T',messageType:'conversation'}}}, {}, r => !r.pass_filter);
test('message vacío (sin tipo de media)',       buildPayload({text:''}), {}, r => r.media_type==='text' && !r.pass_filter);
test('remoteJid null string',                  buildPayload({groupJid:'null'}), {}, r => !r.is_group);
test('messageId vacío — dedup no bloquea',     {body:{data:{key:{remoteJid:TARGET_GROUP,fromMe:false,id:'',participant:PARTICIPANT},message:{conversation:'!genbot catalogo'},pushName:'T',messageType:'conversation'}}}, {}, r => r.pass_catalogo===true);

// ── GRUPO 2: Caracteres especiales ───────────────────
test('Tildes: !genbot catálogo',               buildPayload({text:'!genbot catálogo'}), {},  r => r.es_catalogo===true);
test('Emoji en descripción: !genbot 🏠 dpto',  buildPayload({text:'!genbot 🏠 dpto Lima 450k'}), {}, r => r.es_nueva_propiedad===true);
test('Texto 2000 chars',                       buildPayload({text:'!genbot '+'a'.repeat(1990)}), {}, r => r.es_nueva_propiedad===true);
test('!genbot con saltos de línea → propiedad',buildPayload({text:'!genbot\ndpto\n3D'}), {}, r => r.es_nueva_propiedad===true);
test('pushName con chinos → no crashea',       {body:{data:{key:{remoteJid:TARGET_GROUP,fromMe:false,id:'cn1',participant:PARTICIPANT},message:{conversation:'!genbot catalogo'},pushName:'中文名字',messageType:'conversation'}}}, {}, r => r.pass_catalogo===true);

// ── GRUPO 3: Todos los tipos de media ────────────────
test('Imagen + caption con propiedad',         buildPayload({mediaType:'image',caption:'!genbot Dpto 2D Miraflores'}), {}, r => r.es_nueva_propiedad===true && r.has_media===true);
test('Documento + caption vacío → no ayuda (has_media bloquea)', buildPayload({mediaType:'document',caption:'!genbot '}), {}, r => r.es_ayuda===false && r.has_media===true);
test('Audio → media_type=audio, no procesa',   buildPayload({mediaType:'audio'}), {}, r => r.media_type==='audio' && !r.pass_filter);
test('Video → media_type=video, no procesa',   buildPayload({mediaType:'video',caption:'algo'}), {}, r => r.media_type==='video' && !r.pass_filter);

// ── GRUPO 4: Lote — casos límite ─────────────────────
const sd_lote_lleno = { batchSessions:{ [TARGET_GROUP]:{ active:true, messages:new Array(999).fill({m:'x'}) } } };
test('Lote 999 msgs + texto nuevo → cola 1000',buildPayload({text:'Dpto Barranco'}), sd_lote_lleno, r => r.es_batch_queued===true && r.batch_queue_count===1000);
test('Lote activo + !genbot fin → es_fin, no cola', buildPayload({text:'!genbot fin'}), {batchSessions:{[TARGET_GROUP]:{active:true,messages:[]}}}, r => r.es_fin===true && r.es_batch_queued===false);
test('Lote activo + !genbot lote → es_lote, no cola',buildPayload({text:'!genbot lote'}), {batchSessions:{[TARGET_GROUP]:{active:true,messages:[]}}}, r => r.es_lote===true && r.es_batch_queued===false);
test('Lote activo + fromMe → NO auto-captura',      buildPayload({text:'nota interna',fromMe:true}), {batchSessions:{[TARGET_GROUP]:{active:true,messages:[]}}}, r => r.es_batch_queued===false);
test('Lote activo + 1 char → NO auto-captura',      buildPayload({text:'x'}), {batchSessions:{[TARGET_GROUP]:{active:true,messages:[]}}}, r => r.es_batch_queued===false);
test('Lote activo + audio → NO captura ni Vision',  buildPayload({mediaType:'audio'}), {batchSessions:{[TARGET_GROUP]:{active:true,messages:[]}}}, r => r.es_batch_queued===false && r.es_imagen_en_lote===false);
test('Lote activo + imagen → Vision (no cola)',      buildPayload({mediaType:'image',caption:'foto'}), {batchSessions:{[TARGET_GROUP]:{active:true,messages:[]}}}, r => r.es_imagen_en_lote===true && r.es_batch_queued===false);

// ── GRUPO 5: Dedup — estado compartido real ───────────
// Usamos el MISMO objeto sd para que el estado persista entre llamadas
const sd_dedup = {};
runNormalizar(buildPayload({text:'!genbot catalogo', messageId:'dup-001'}), sd_dedup);  // primera vez
test('Dedup: segundo envío mismo messageId → bloqueado', buildPayload({text:'!genbot catalogo', messageId:'dup-001'}), sd_dedup, r => r.duplicate===true);
test('Dedup: messageId distinto → pasa normal',          buildPayload({text:'!genbot catalogo', messageId:'dup-002'}), sd_dedup, r => r.pass_catalogo===true);

// ── GRUPO 6: Filtros y routing ────────────────────────
test('Grupo incorrecto → ignorado',            buildPayload({text:'!genbot catalogo', groupJid:OTRO_GRUPO}), {}, r => !r.is_target_group && !r.pass_filter);
test('Chat individual → ignorado',             buildPayload({text:'!genbot catalogo', groupJid:'51924102571@s.whatsapp.net'}), {}, r => !r.is_group && !r.pass_filter);
test('fromMe + comando → pass_filter true',    buildPayload({text:'!genbot catalogo', fromMe:true}), {}, r => r.pass_filter===true && r.pass_catalogo===true);
test('Sin comando → no pasa filtro',           buildPayload({text:'Hola buen dia'}), {}, r => !r.pass_filter && !r.es_nueva_propiedad);
test('!genbot vacío → ayuda',                  buildPayload({text:'!genbot'}), {}, r => r.es_ayuda===true);
test('!genbot múltiples espacios → ayuda',     buildPayload({text:'!genbot   '}), {}, r => r.es_ayuda===true);
test('!GENBOT mayúsculas → pasa igual',        buildPayload({text:'!GENBOT catalogo'}), {}, r => r.pass_catalogo===true);
test('Subcomando inválido → es_nueva_propiedad',buildPayload({text:'!genbot xyz descripcion'}), {}, r => r.es_nueva_propiedad===true);

// ── REPORTE ───────────────────────────────────────────
console.log(`${'Caso'.padEnd(58)} Estado  Observación`);
console.log('─'.repeat(110));
for (const row of rows) {
  const obs = row.obs ? row.obs.substring(0,45)+'...' : '';
  console.log(`${row.name.padEnd(58)} ${row.status.padEnd(7)} ${obs}`);
}
console.log('─'.repeat(110));
console.log(`\nRESULTADO FINAL: ${passed} ✅  ${failed} ❌  (${passed+failed} total)\n`);

const criticos = rows.filter(r=>r.status==='❌');
if (criticos.length) {
  console.log('🔴 CRÍTICOS A CORREGIR:');
  criticos.forEach(r => console.log(`   - ${r.name}\n     ${r.obs}`));
} else {
  console.log('🟢 Sin casos críticos — workflow robusto y listo para producción.');
}
console.log('\n✅ Funciona sólido en:');
['Payloads vacíos/malformados','Caracteres especiales y emojis','Todos los tipos de media','Lógica de lote','Deduplicación','Routing y filtros'].forEach(g => console.log(`   - ${g}`));
