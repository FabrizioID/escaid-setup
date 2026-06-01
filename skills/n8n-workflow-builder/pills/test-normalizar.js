#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// QA RUNNER GENÉRICO — nodos Code de n8n
//
// Uso:  node test-normalizar.js <ruta-al-codigo.js>
//
// No hardcodea lógica de negocio. Lee el archivo fuente, lo escanea para
// detectar grupos, comandos y sesiones, y genera los casos de prueba
// dinámicamente. Siempre testea el código que está realmente desplegado.
// ─────────────────────────────────────────────────────────────────────────────

const fs = require('fs');
const path = require('path');

// ── 1. CARGAR CÓDIGO FUENTE ──────────────────────────────────────────────────

const sourceFile = process.argv[2];
if (!sourceFile) {
  console.error('Uso: node test-normalizar.js <ruta-al-codigo.js>');
  process.exit(1);
}
const sourceCode = fs.readFileSync(path.resolve(sourceFile), 'utf8');
console.log(`\n=== QA RUNNER — ${path.basename(sourceFile)} ===\n`);

// ── 2. EJECUTOR (mockea globals de n8n) ─────────────────────────────────────

function runCode(inputJson, sd) {
  const fn = new Function('$json', '$getWorkflowStaticData', sourceCode);
  return fn(inputJson, () => sd);
}

function safeRun(inputJson, sd) {
  try {
    const result = runCode(inputJson, sd);
    return { ok: true, result: Array.isArray(result) ? result[0]?.json : result };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

// ── 3. SCANNER — detecta configuración desde el código ─────────────────────

function scanCode(code) {
  const info = {
    targetGroups: [],
    cmdPrefixes: [],     // ej: ['!new ', '!genbot']
    newSubcmds: [],      // ej: ['prop', 'lote']
    genbotSubcmds: [],   // ej: ['premium', 'catalogo', 'ayuda']
    hasSessionProp: false,
    hasSessionLote: false,
    sessionTimeout: null,
  };

  // TARGET_GROUPS
  const tgMatch = code.match(/TARGET_GROUPS\s*=\s*\[([^\]]+)\]/);
  if (tgMatch) {
    const hits = tgMatch[1].match(/'([^']+)'/g) || [];
    info.targetGroups = hits.map(g => g.replace(/'/g, ''));
  }

  // Prefijos de comando (startsWith)
  const swMatches = [...code.matchAll(/startsWith\('([^']+)'\)/g)];
  swMatches.forEach(m => { if (!info.cmdPrefixes.includes(m[1])) info.cmdPrefixes.push(m[1]); });

  // Subcomandos !new
  if (/tipo\s*===\s*'prop'/.test(code))  info.newSubcmds.push('prop');
  if (/tipo\s*===\s*'lote'/.test(code))  info.newSubcmds.push('lote');

  // Subcomandos !genbot (arrays de aliases y comparaciones directas)
  const arrayMatches = [...code.matchAll(/\[([^\]]{5,})\]\.includes\(subcomando\)/g)];
  arrayMatches.forEach(m => {
    const items = m[1].match(/'([a-záéíóú]+)'/g) || [];
    items.forEach(i => {
      const v = i.replace(/'/g, '');
      if (!info.genbotSubcmds.includes(v)) info.genbotSubcmds.push(v);
    });
  });
  const eqMatches = [...code.matchAll(/subcomando\s*===\s*'([a-z]+)'/g)];
  eqMatches.forEach(m => { if (!info.genbotSubcmds.includes(m[1])) info.genbotSubcmds.push(m[1]); });

  // Sesiones
  info.hasSessionProp  = code.includes('propSessions');
  info.hasSessionLote  = code.includes('loteSessions');

  // Timeout de sesión
  const toMatch = code.match(/SESSION_TIMEOUT\s*=\s*(\d+\s*\*\s*\d+\s*\*\s*\d+|\d+)/);
  if (toMatch) info.sessionTimeout = eval(toMatch[1]); // solo eval de expresión numérica simple

  return info;
}

const INFO = scanCode(sourceCode);
const GROUP  = INFO.targetGroups[0] || '120363000000000000@g.us';
const OTHER  = '999999999999@g.us';
const SENDER = '51924102571@s.whatsapp.net';

console.log('Detectado:');
console.log('  target groups:', INFO.targetGroups);
console.log('  cmd prefixes :', INFO.cmdPrefixes);
console.log('  !new subcmds :', INFO.newSubcmds);
console.log('  !genbot subs :', INFO.genbotSubcmds);
console.log('  prop session :', INFO.hasSessionProp);
console.log('  lote session :', INFO.hasSessionLote);
console.log('  timeout (ms) :', INFO.sessionTimeout);
console.log();

// ── 4. HELPERS DE PAYLOAD ────────────────────────────────────────────────────

let _seq = 0;
function uid() { return 'msg-' + (++_seq); }

function buildPayload({ text = '', mediaType = 'text', fromMe = false, groupJid = GROUP,
  participant = SENDER, messageId, caption = '', lat, lng, mapsLink } = {}) {
  const mid = messageId || uid();
  const msg = {};
  if (mediaType === 'text' && !mapsLink) msg.conversation = text;
  else if (mapsLink) msg.conversation = mapsLink;
  else if (mediaType === 'image')    msg.imageMessage    = { caption, mimetype: 'image/jpeg', url: 'http://test/img.jpg' };
  else if (mediaType === 'document') msg.documentMessage = { caption, fileName: 'doc.pdf', mimetype: 'application/pdf', url: 'http://test/doc.pdf' };
  else if (mediaType === 'audio')    msg.audioMessage    = { url: 'http://test/audio.ogg', mimetype: 'audio/ogg' };
  else if (mediaType === 'video')    msg.videoMessage    = { caption, url: 'http://test/video.mp4', mimetype: 'video/mp4' };
  else if (mediaType === 'location') msg.locationMessage = { degreesLatitude: lat || -12.0, degreesLongitude: lng || -77.0, name: 'Test', address: 'Calle Test' };
  return { body: { data: {
    key: { remoteJid: groupJid, fromMe, id: mid, participant: fromMe ? '' : participant },
    message: msg,
    messageType: mediaType === 'text' || mapsLink ? 'conversation' : mediaType + 'Message',
    pushName: 'Asesor Test'
  }}};
}

// Construye el comando !new detectado (primer prefijo que empieza con '!new')
const NEW_PREFIX  = INFO.cmdPrefixes.find(p => p.startsWith('!new')) || '!new ';
const GENBOT_CMD  = INFO.cmdPrefixes.find(p => p.startsWith('!genbot')) || '!genbot';

// ── 5. TEST RUNNER ───────────────────────────────────────────────────────────

let passed = 0, failed = 0;
const rows = [];

function test(name, payload, sd, assertion) {
  const r = safeRun(payload, sd);
  let status, obs = '';
  if (!r.ok) {
    status = '❌'; obs = 'CRASH: ' + r.error; failed++;
  } else {
    try {
      const ok = assertion(r.result);
      if (ok) { status = '✅'; passed++; }
      else { status = '❌'; obs = JSON.stringify(r.result).substring(0, 120); failed++; }
    } catch (e) { status = '❌'; obs = 'Assert error: ' + e.message; failed++; }
  }
  rows.push({ name, status, obs });
}

// ── 6. CASOS UNIVERSALES ─────────────────────────────────────────────────────

test('Payload vacío {} → no crash',
  {}, {}, r => r !== undefined);

test('body.data undefined → no crash',
  { body: {} }, {}, r => r !== undefined);

test('Grupo incorrecto → ignorado',
  buildPayload({ text: GENBOT_CMD, groupJid: OTHER }), {},
  r => !r.is_target_group && !r.pass_filter);

test('Chat individual (no grupo) → ignorado',
  buildPayload({ text: GENBOT_CMD, groupJid: SENDER }), {},
  r => !r.is_group && !r.pass_filter);

test('fromMe + comando → pass_filter true',
  buildPayload({ text: GENBOT_CMD, fromMe: true }), {},
  r => r.pass_filter === true);

test('Sin comando → pasa pero no activa routing',
  buildPayload({ text: 'Hola buenas' }), {},
  r => !r.comando_match);

test('Texto 2000 chars → no crash',
  buildPayload({ text: GENBOT_CMD + ' ' + 'a'.repeat(1990) }), {},
  r => r !== undefined && !r.duplicate);

test('Tildes y emojis en texto → no crash',
  buildPayload({ text: GENBOT_CMD + ' 🏠 café descripción ñoño' }), {},
  r => r !== undefined);

test('pushName con caracteres unicode → no crash',
  { body: { data: {
    key: { remoteJid: GROUP, fromMe: false, id: uid(), participant: SENDER },
    message: { conversation: GENBOT_CMD },
    messageType: 'conversation', pushName: '中文名字 ñ émoji 🎉'
  }}}, {}, r => r !== undefined);

// ── 7. DEDUPLICACIÓN ─────────────────────────────────────────────────────────

{
  const sd_dedup = {};
  const fixedId = 'dedup-001-' + Date.now();
  safeRun(buildPayload({ text: GENBOT_CMD, messageId: fixedId }), sd_dedup);
  test('Dedup: mismo messageId × 2 → bloqueado',
    buildPayload({ text: GENBOT_CMD, messageId: fixedId }), sd_dedup,
    r => r.duplicate === true);
  test('Dedup: messageId distinto → pasa',
    buildPayload({ text: GENBOT_CMD, messageId: 'dedup-002' }), sd_dedup,
    r => r.duplicate !== true);
}

// ── 8. TIPOS DE MEDIA ────────────────────────────────────────────────────────

test('Imagen sin comando → media_type image',
  buildPayload({ mediaType: 'image', caption: 'foto' }), {},
  r => r.media_type === 'image');

test('Audio → no routing de comando',
  buildPayload({ mediaType: 'audio' }), {},
  r => !r.comando_match);

test('Video → no routing de comando',
  buildPayload({ mediaType: 'video', caption: 'clip' }), {},
  r => !r.comando_match);

test('Location message → is_location true',
  buildPayload({ mediaType: 'location' }), {},
  r => r.is_location === true);

test('Google Maps link → is_location true',
  buildPayload({ mapsLink: 'https://maps.app.goo.gl/abc123' }), {},
  r => r.is_location === true);

// ── 9. COMANDOS !new (generados desde scanner) ───────────────────────────────

if (NEW_PREFIX && INFO.newSubcmds.includes('prop')) {
  test(`"${NEW_PREFIX}prop [inmob]" → es_new_prop_open`,
    buildPayload({ text: NEW_PREFIX + 'prop Inmobiliaria ABC' }), {},
    r => r.es_new_prop_open === true && r.inmobiliaria === 'Inmobiliaria ABC');

  test(`"${NEW_PREFIX}prop" sin nombre → es_new_prop_open (inmob vacío)`,
    buildPayload({ text: NEW_PREFIX + 'prop' }), {},
    r => r.es_new_prop_open === true);

  test(`"${NEW_PREFIX}prop fin" sin sesión activa → es_new_prop_fin false`,
    buildPayload({ text: NEW_PREFIX + 'prop fin' }), {},
    r => r.es_new_prop_fin === false);

  // Sesión completa: abrir → acumular → cerrar
  {
    const sd_prop = {};
    safeRun(buildPayload({ text: NEW_PREFIX + 'prop Mi Inmobiliaria' }), sd_prop);
    safeRun(buildPayload({ text: 'Casa 3 recamaras garage' }), sd_prop);
    safeRun(buildPayload({ mediaType: 'image', caption: 'foto principal' }), sd_prop);
    safeRun(buildPayload({ mediaType: 'location' }), sd_prop);

    test(`Sesión prop: texto acumulado → es_prop_acumulado`,
      buildPayload({ text: 'detalle adicional' }), sd_prop,
      r => r.es_prop_acumulado === true);

    const r_fin = safeRun(buildPayload({ text: NEW_PREFIX + 'prop fin' }), sd_prop);
    test(`Sesión prop: fin → es_new_prop_fin + prop_session no null`,
      buildPayload({ text: NEW_PREFIX + 'prop fin' }), (() => {
        // sd fresco con sesión ya abierta
        const fresh = {};
        safeRun(buildPayload({ text: NEW_PREFIX + 'prop Mi Inmob' }), fresh);
        safeRun(buildPayload({ text: 'descripcion propiedad' }), fresh);
        return fresh;
      })(),
      r => r.es_new_prop_fin === true && r.prop_session !== null);
  }

  if (INFO.sessionTimeout) {
    test(`Sesión prop: timeout → no acumula`,
      buildPayload({ text: 'texto tardío' }), (() => {
        const sd_exp = {};
        safeRun(buildPayload({ text: NEW_PREFIX + 'prop Expirada' }), sd_exp);
        // Simular expiración
        sd_exp.propSessions = sd_exp.propSessions || {};
        if (sd_exp.propSessions[GROUP]) {
          sd_exp.propSessions[GROUP].lastActivity = Date.now() - (INFO.sessionTimeout + 1000);
        }
        return sd_exp;
      })(),
      r => r.es_prop_acumulado === false && r.prop_active === false);
  }
}

if (NEW_PREFIX && INFO.newSubcmds.includes('lote')) {
  test(`"${NEW_PREFIX}lote [inmob]" → es_new_lote_open`,
    buildPayload({ text: NEW_PREFIX + 'lote Constructora XYZ' }), {},
    r => r.es_new_lote_open === true && r.inmobiliaria === 'Constructora XYZ');

  test(`Inmobiliaria con espacios, comas, tildes`,
    buildPayload({ text: NEW_PREFIX + 'lote Inmob Súper Élite, S.A.' }), {},
    r => r.es_new_lote_open === true && r.inmobiliaria === 'Inmob Súper Élite, S.A.');

  test(`"${NEW_PREFIX}lote fin" sin sesión activa → es_new_lote_fin false`,
    buildPayload({ text: NEW_PREFIX + 'lote fin' }), {},
    r => r.es_new_lote_fin === false);

  // Lote: auto-detección de límite entre propiedades (location + nuevo texto = nueva prop)
  {
    const sd_lote = {};
    safeRun(buildPayload({ text: NEW_PREFIX + 'lote Test Inmob' }), sd_lote);
    safeRun(buildPayload({ text: 'propiedad 1 descripcion' }), sd_lote);
    safeRun(buildPayload({ mediaType: 'image' }), sd_lote);
    safeRun(buildPayload({ mediaType: 'location' }), sd_lote); // cierra prop 1

    test('Lote: texto tras location → detecta límite (nueva propiedad)',
      buildPayload({ text: 'propiedad 2 descripcion' }), sd_lote,
      r => {
        const ls = sd_lote.loteSessions && sd_lote.loteSessions[GROUP];
        return ls && ls.properties.length >= 1; // prop 1 fue archivada
      });

    test('Lote: fin con propiedades acumuladas → lote_session no null',
      buildPayload({ text: NEW_PREFIX + 'lote fin' }), sd_lote,
      r => r.es_new_lote_fin === true && r.lote_session !== null && r.lote_session.properties.length >= 1);
  }

  test('Lote activo + fromMe → NO acumula',
    buildPayload({ text: 'nota interna', fromMe: true }), (() => {
      const sd_fm = {};
      safeRun(buildPayload({ text: NEW_PREFIX + 'lote Prueba' }), sd_fm);
      return sd_fm;
    })(),
    r => r.es_lote_acumulado === false);

  test('Lote activo + audio → NO acumula',
    buildPayload({ mediaType: 'audio' }), (() => {
      const sd_au = {};
      safeRun(buildPayload({ text: NEW_PREFIX + 'lote Prueba' }), sd_au);
      return sd_au;
    })(),
    r => r.es_lote_acumulado === false);
}

// ── 10. COMANDOS !genbot (generados desde scanner) ───────────────────────────

const GENBOT_SUBSETS = {
  catalogo: r => r.es_catalogo === true,
  catálogo: r => r.es_catalogo === true,
  ayuda:    r => r.es_ayuda    === true,
  premium:  r => r.es_premium  === true,
};

// Agrupamos para evitar tests duplicados
const testedSubs = new Set();
for (const sub of INFO.genbotSubcmds) {
  if (testedSubs.has(sub)) continue;
  testedSubs.add(sub);
  const assertFn = GENBOT_SUBSETS[sub];
  if (assertFn) {
    test(`"${GENBOT_CMD} ${sub}" → routing correcto`,
      buildPayload({ text: GENBOT_CMD + ' ' + sub }), {}, assertFn);
  } else {
    // Subcomando detectado pero sin assert específico — solo verifica pass_filter
    test(`"${GENBOT_CMD} ${sub}" → pass_filter true`,
      buildPayload({ text: GENBOT_CMD + ' ' + sub }), {},
      r => r.pass_filter === true);
  }
}

test(`"${GENBOT_CMD}" solo (sin subcomando) → es_ayuda`,
  buildPayload({ text: GENBOT_CMD }), {},
  r => r.es_ayuda === true);

test(`"${GENBOT_CMD}" en mayúsculas → mismo routing`,
  buildPayload({ text: GENBOT_CMD.toUpperCase() }), {},
  r => r.es_ayuda === true);

// ── 11. REPORTE ──────────────────────────────────────────────────────────────

const COL = 60;
console.log(`${'Caso'.padEnd(COL)} Estado  Observación`);
console.log('─'.repeat(115));
for (const row of rows) {
  const obs = row.obs ? row.obs.substring(0, 50) : '';
  console.log(`${row.name.padEnd(COL)} ${row.status.padEnd(7)} ${obs}`);
}
console.log('─'.repeat(115));
console.log(`\nRESULTADO: ${passed} ✅  ${failed} ❌  (${passed + failed} total)\n`);

const criticos = rows.filter(r => r.status === '❌');
if (criticos.length) {
  console.log('🔴 FALLOS:');
  criticos.forEach(r => console.log(`   - ${r.name}\n     ${r.obs}`));
} else {
  console.log('🟢 Sin fallos — código robusto.');
}
console.log();
