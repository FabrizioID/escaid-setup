# Google Apps Script MailApp Sender

Use this reference when generating or updating `.gs` code for sending HTML marketing emails from Google Sheets with `MailApp`, installable triggers, and HTML placeholders. Align the `.gs` behavior with the campaign objective: manual/internal operations usually use a `STATUS` edit trigger, while CRM/Meta Ads lead intake often needs a new-row sensor.

## Phase Gate

Only enter this Apps Script phase after the email artifact is clear enough:

- HTML/design objective has been generated or validated.
- CTA(s), subject direction, and placeholders are known.
- Asset status is known: final public URLs, pending Drive upload, or draft-only placeholders.

If the user provides screenshots/images first, do not start by asking for Sheet/triggers. First produce the email HTML draft or email schema for validation. Ask Apps Script questions only after the user approves the email direction or explicitly requests automation.

## Delivery Modes

Choose one delivery mode from the user's request and available tools:

- `CODE_ONLY`: return complete `.gs` and HTML artifacts for copy/paste.
- `PROVISION_READY`: create or update the Google Sheet, Apps Script files, HTML files, image asset URLs, and installable trigger when Google Drive/Sheets/Apps Script tools and permissions are available.
- `HYBRID_SETUP`: create local artifacts and give exact setup steps when live provisioning tools are unavailable.

For `PROVISION_READY`, first look for installed Google Drive/Docs/Sheets/App Script capabilities. If missing, do not pretend the system was created; return `HYBRID_SETUP` artifacts and clearly name what still needs manual insertion.

## Behavior Rules

- Generate complete `.gs` code by default, not fragments.
- Ask only for missing required values. If nothing required is missing, return the final code immediately.
- Treat `STATUS` as required when the trigger mode is `STATUS_EDIT`.
- For lead intake from CRM, Meta Ads, forms, webhooks, or automation tools, consider `NEW_ROW_SENSOR`: detect rows that have appeared and are not yet processed, then mark a processing/sent column.
- Never assume the sheet tab name. Ask for it when missing.
- Prefer column letters for `EMAIL` and `STATUS` when the user provides them; they are more robust than headers.
- Use explicit placeholder mapping: `{{Campo}} -> header` or `{{Campo}} -> column letter`.
- Apply the same `applyTemplate()` function to dynamic subjects and HTML bodies.
- Align placeholders, Sheet columns, subject templates, and HTML files from one campaign schema. Do not let the HTML require fields that the Sheet cannot provide.
- If existing working code is provided, change only what is needed and preserve trigger logic, `LockService`, paste/drag support, and `MailApp`.
- Do not invent columns, headers, or placeholders.
- Choose trigger mode from the objective when possible:
  - `STATUS_EDIT`: user wants manual control, QA before sending, staged campaigns, copy/paste or drag-fill in a status column.
  - `NEW_ROW_SENSOR`: user wants automatic response to newly inserted leads/rows from CRM, Meta Ads Lead Ads, forms, Zapier/Make/n8n, or webhook ingestion.
- In `NEW_ROW_SENSOR`, never depend only on `onEdit(e)` if the integration inserts rows without user edits. Prefer a time-driven trigger that scans new/unprocessed rows, unless the user confirms their integration triggers sheet edits reliably.
- For live/provisioned systems, include a template/code version marker such as `TEMPLATE_VERSION` and write it to the row after send when an audit column is available.
- When the user reports that old content is still arriving, verify the live Apps Script source, template version written to the Sheet, installed triggers, deployment/account, and image file IDs before assuming Gmail is wrong.
- Carefully check syntax: commas, braces, property names, function endings, and string escaping.

## Sheet Schema Rules

When creating the Sheet from scratch, generate only the columns needed for operation and personalization:

- Required operational columns:
  - Email column.
  - Trigger/status columns according to trigger mode.
  - Event datetime column when using timed or sequence sending.
- Required dynamic fields:
  - One column per placeholder source, such as `Nombre`, `Empresa`, `Servicio`, `LinkEvento`, or `LinkCertificado`.
- Recommended audit columns when useful:
  - `SENT_AT`
  - `LAST_ERROR`
  - `SOURCE`
  - `LEAD_ID`
  - `TEMPLATE_VERSION`

When the Sheet is fed by CRM, Meta Ads, a form, webhook, or automation:

- Always ask for the existing column structure or a sample header row before generating final mappings.
- Preserve CRM-provided headers as the source of truth.
- Add only operational columns that the integration does not already provide, such as `EMAIL_STATUS`, sequence status columns, `SENT_AT`, or `LAST_ERROR`.
- Do not rename CRM/form columns unless the user explicitly asks.

When the Sheet is not connected to any external source:

- Create a clean schema from the objective, email field, placeholders, timing fields, and status fields.
- Prefer readable headers, not cryptic internal names.

## Required Inputs

Ask for these if missing:

- Exact sheet tab name.
- Email column.
- Whether to create a new Sheet/schema or adapt to an existing CRM/form/Meta Ads Sheet.
- If adapting to an existing source, ask for the header row or current columns.
- Dynamic fields required by the HTML/subject, such as name, company, service, link, date, advisor, etc.
- Trigger mode/objective:
  - `STATUS_EDIT`: requires `STATUS` column, dispatch value such as `ENVIAR`, and final sent value such as `ENVIADO`.
  - `NEW_ROW_SENSOR`: requires the column that proves the row is sendable, usually email, plus a processed/status/log column to prevent duplicates.
  - `SEQUENCE_SENSOR`: requires event datetime column, timezone, and one sequence item per HTML/objective/timing.
- Dynamic placeholders and their linked headers or column letters.
- Whether the subject is fixed or dynamic.
- HTML file name when it is not `PlantillaCorreo`.
- For multi-email sequences, ask for each email objective, relative timing, HTML file, subject template, and status column.
- Image assets that must be embedded. If images are local/private/base64/Canva/Drive links, normalize them to public email-usable URLs before final HTML.

## Objective-To-Trigger Guide

Use the email objective to pick or propose the trigger:

- Manual campaign approval: use `STATUS_EDIT`. The user writes `ENVIAR` in `STATUS`; script sends and marks `ENVIADO`.
- Certificate or event follow-up controlled by staff: use `STATUS_EDIT`.
- Meta Ads lead magnet response: use `NEW_ROW_SENSOR`. A time-driven trigger scans rows added by CRM/Meta/n8n and sends once when email exists.
- CRM lead assignment or welcome email: use `NEW_ROW_SENSOR`, with an idempotency column such as `EMAIL_STATUS`, `SENT_AT`, or `PROCESSED`.
- Mixed flow: use `STATUS_EDIT` for manual override and `NEW_ROW_SENSOR` for automatic first response, but avoid duplicate emails by checking the same processed column.
- Event reminder/follow-up sequence: use `SEQUENCE_SENSOR`. A time-driven trigger evaluates an event datetime and sends the correct HTML template for each relative moment, such as 1 day before, 1 hour before, or 1 day after.

## Preferred User Input Shape

For end-to-end setup:

```text
DELIVERY_MODE: PROVISION_READY
OBJECTIVE: enviar recordatorios y seguimiento de evento
DATA_SOURCE: nuevo sheet | CRM existente | Meta Ads | formulario | webhook/n8n
SHEET: Registrados
CREATE_SCHEMA: si
EMAIL: crear columna Email
TRIGGER_MODE: SEQUENCE_SENSOR
SEND_TIMING: programado por fecha_evento
DYNAMIC_FIELDS:
- Nombre
- Empresa
- LinkEvento
ASSETS:
- logo
- banner principal
HTML_FILES:
- PlantillaConfirmacion: envio instantaneo
- Recordatorio1Dia: 1 dia antes
- Recordatorio1Hora: 1 hora antes
- Seguimiento1Dia: 1 dia despues
SUBJECTS:
- PlantillaConfirmacion: Confirmamos tu registro, {{Nombre}}
- Recordatorio1Dia: Tu evento es manana
- Recordatorio1Hora: En 1 hora empezamos
- Seguimiento1Dia: Gracias por asistir
```

```text
SHEET: DATA speakers
EMAIL: G (header: Correos)
STATUS: I (header: STATUS)
SEND_VALUE: ENVIAR
SENT_VALUE: ENVIADO
SUBJECT: dinamico
SUBJECT_TEMPLATE: AECODE | Certificado de {{Ponente o Moderador}} | {{Nombre}}
PLACEHOLDERS:
{{Nombre}} -> NOMBRE
{{Ponente o Moderador}} -> CONDICION
{{Link del boton}} -> LINK DE CERTIFICADO
HTML_FILE: PlantillaCorreo
```

For lead sensor flows:

```text
OBJECTIVE: enviar correo automatico cuando entra lead de Meta Ads por CRM
TRIGGER_MODE: NEW_ROW_SENSOR
SHEET: Leads Meta
EMAIL: C (header: email)
PROCESSED_STATUS: H (header: EMAIL_STATUS)
SENT_VALUE: ENVIADO
ERROR_VALUE_PREFIX: ERROR:
SCAN: cada 5 minutos
SUBJECT: fijo
SUBJECT_TEMPLATE: Gracias por tu registro
PLACEHOLDERS:
{{Nombre}} -> full_name
{{Servicio}} -> service_interest
HTML_FILE: PlantillaCorreo
```

For event reminder/follow-up sequences:

```text
OBJECTIVE: secuencia de recordatorios y seguimiento para evento
TRIGGER_MODE: SEQUENCE_SENSOR
SHEET: Registrados
EMAIL: C (header: email)
EVENT_DATETIME: F (header: fecha_evento)
TIMEZONE: America/Lima
SEQUENCE_STATUS_PREFIX: EMAIL_
SEQUENCE:
- ID: reminder_1d_before
  WHEN: -1d
  HTML_FILE: Recordatorio1Dia
  SUBJECT_TEMPLATE: Recordatorio: tu evento es manana
  STATUS_COL: H (header: EMAIL_1D_BEFORE)
- ID: reminder_1h_before
  WHEN: -1h
  HTML_FILE: Recordatorio1Hora
  SUBJECT_TEMPLATE: En 1 hora empezamos
  STATUS_COL: I (header: EMAIL_1H_BEFORE)
- ID: followup_1d_after
  WHEN: +1d
  HTML_FILE: Seguimiento1Dia
  SUBJECT_TEMPLATE: Gracias por asistir
  STATUS_COL: J (header: EMAIL_1D_AFTER)
PLACEHOLDERS:
{{Nombre}} -> nombre
{{LinkEvento}} -> link_evento
```


## Generated Code Structure

Generate scripts with this structure:

- `const CONFIG = { ... }`
- `function autorizarMailApp()`
- `function setupTrigger()`
- `function setupTimeTrigger()`
- `function handleEdit(e)`
- `function scanNewRows()`
- `function scanSequenceEmails()`
- `function sendRowEmail(sheet, row, headers, statusColFromHandleEdit)`
- `function sendRowSequenceEmail(sheet, row, headers, sequenceItem)`
- `function shouldSendSequenceEmail(eventDate, sequenceItem, now)`
- `function parseRelativeOffset(offset)`
- `function getHeaders(sheet)`
- `function buildDataMap(rowValues, headers)`
- `function applyTemplate(template, dataMap)`
- `function markError(sheet, row, col, msg)`
- `function columnLetterToIndex(letter)`
- `function testSendRow2()` when useful

`CONFIG` can include:

- `SHEET_NAME`
- `HEADER_ROW`
- `COL_EMAIL`
- `COL_STATUS`
- `COL_PROCESSED`
- `EMAIL_COL_LETTER`
- `STATUS_COL_LETTER`
- `PROCESSED_COL_LETTER`
- `TRIGGER_MODE`
- `EVENT_DATETIME_COL_LETTER`
- `COL_EVENT_DATETIME`
- `TIMEZONE`
- `SEQUENCE`
- `STATUS_SEND`
- `STATUS_SENT`
- `PROCESSED_SENT`
- `ERROR_VALUE_PREFIX`
- `SCAN_MINUTES`
- `SENT_BG`
- `ERROR_BG`
- `TEMPLATE_VERSION`
- `TEMPLATE_VERSION_HEADER`
- `FROM_NAME`
- `REPLY_TO`
- `SUBJECT_TEMPLATE`
- `HTML_FILE`
- `PLACEHOLDER_MAP`
- `DEFAULTS`

## Expected Logic

`handleEdit(e)`:

- Validate the event object.
- Validate the edited sheet name.
- Detect whether the edited range touches `STATUS`.
- Support multiple rows from paste or drag-fill.
- Use `LockService`.
- Loop through affected rows.
- Call `sendRowEmail()` when `STATUS` matches `STATUS_SEND`.

`scanNewRows()` for `NEW_ROW_SENSOR`:

- Use `LockService`.
- Validate the sheet name.
- Read headers and all data rows.
- Resolve email and processed/status column by letter first.
- Skip rows with empty email.
- Skip rows already marked sent, processing, or error unless the user asks for retries.
- Send each eligible row through `sendRowEmail()`.
- Mark sent/error in the processed column to prevent duplicates.

`scanSequenceEmails()` for `SEQUENCE_SENSOR`:

- Use `LockService`.
- Validate the sheet name.
- Read headers and all data rows.
- Resolve email and event datetime columns by letter first.
- For each row, parse the event datetime.
- For each configured sequence item, resolve its own status column.
- Skip sequence items already marked sent, skipped, or error unless the user asks for retries.
- Check whether the current time is inside that sequence item's send window.
- Send using that sequence item's `HTML_FILE` and `SUBJECT_TEMPLATE`.
- Mark only that sequence item's status column as sent/error.

`sendRowEmail(...)`:

- Read the full row.
- Get destination email.
- Build `dataMap`.
- Process subject with `applyTemplate()`.
- Load HTML with `HtmlService.createHtmlOutputFromFile(CONFIG.HTML_FILE).getContent()`.
- Process HTML with `applyTemplate()`.
- Send with `MailApp.sendEmail()`.
- Update `STATUS` to `STATUS_SENT` and green background.
- On failure, write `ERROR: ...` and red background.
- In `NEW_ROW_SENSOR`, write status to `PROCESSED_COL_LETTER` or the configured processed/status column.

`sendRowSequenceEmail(...)`:

- Same as `sendRowEmail(...)`, but use the specific sequence item's `HTML_FILE`, `SUBJECT_TEMPLATE`, and `STATUS_COL_LETTER`.
- Keep all placeholders shared through `PLACEHOLDER_MAP`.
- Do not reuse a single status column for multiple sequence emails unless the user explicitly requests it.

## Base Template

Adapt this template to the user's configuration. Keep it complete unless modifying existing code.

```javascript
const CONFIG = {
  SHEET_NAME: 'NOMBRE_DE_LA_PESTANA',
  HEADER_ROW: 1,

  TRIGGER_MODE: 'STATUS_EDIT', // STATUS_EDIT, NEW_ROW_SENSOR, or SEQUENCE_SENSOR

  EMAIL_COL_LETTER: 'G',
  STATUS_COL_LETTER: 'I',
  PROCESSED_COL_LETTER: '',
  EVENT_DATETIME_COL_LETTER: '',
  COL_EMAIL: null,
  COL_STATUS: null,
  COL_PROCESSED: null,
  COL_EVENT_DATETIME: null,

  STATUS_SEND: 'ENVIAR',
  STATUS_SENT: 'ENVIADO',
  PROCESSED_SENT: 'ENVIADO',
  ERROR_VALUE_PREFIX: 'ERROR:',
  SCAN_MINUTES: 5,
  TIMEZONE: 'America/Lima',
  SENT_BG: '#d9ead3',
  ERROR_BG: '#f4cccc',

  FROM_NAME: 'Escadi',
  REPLY_TO: '',

  SUBJECT_TEMPLATE: 'Asunto fijo o con {{Placeholder}}',
  HTML_FILE: 'PlantillaCorreo',

  PLACEHOLDER_MAP: {
    '{{Nombre}}': 'NOMBRE'
  },

  SEQUENCE: [
    /*
    {
      ID: 'reminder_1d_before',
      WHEN: '-1d',
      WINDOW_MINUTES: 60,
      HTML_FILE: 'Recordatorio1Dia',
      SUBJECT_TEMPLATE: 'Recordatorio: tu evento es manana',
      STATUS_COL_LETTER: 'H',
      SENT_VALUE: 'ENVIADO'
    }
    */
  ],

  DEFAULTS: {
    '{{Nombre}}': ''
  }
};

function autorizarMailApp() {
  MailApp.getRemainingDailyQuota();
}

function setupTrigger() {
  const spreadsheet = SpreadsheetApp.getActive();
  const triggers = ScriptApp.getProjectTriggers();

  triggers.forEach(function(trigger) {
    if (trigger.getHandlerFunction() === 'handleEdit') {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  ScriptApp.newTrigger('handleEdit')
    .forSpreadsheet(spreadsheet)
    .onEdit()
    .create();
}

function setupTimeTrigger() {
  const triggers = ScriptApp.getProjectTriggers();
  const handlerFunction = CONFIG.TRIGGER_MODE === 'SEQUENCE_SENSOR'
    ? 'scanSequenceEmails'
    : 'scanNewRows';

  triggers.forEach(function(trigger) {
    if (trigger.getHandlerFunction() === handlerFunction) {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  ScriptApp.newTrigger(handlerFunction)
    .timeBased()
    .everyMinutes(CONFIG.SCAN_MINUTES)
    .create();
}

function handleEdit(e) {
  if (!e || !e.range) return;

  const lock = LockService.getScriptLock();
  if (!lock.tryLock(30000)) return;

  try {
    const sheet = e.range.getSheet();
    if (sheet.getName() !== CONFIG.SHEET_NAME) return;

    const headers = getHeaders(sheet);
    const statusCol = CONFIG.STATUS_COL_LETTER
      ? columnLetterToIndex(CONFIG.STATUS_COL_LETTER)
      : (CONFIG.COL_STATUS || headers.indexOf('STATUS') + 1);

    if (!statusCol) throw new Error('No se pudo resolver la columna STATUS.');

    const editedStartCol = e.range.getColumn();
    const editedEndCol = editedStartCol + e.range.getNumColumns() - 1;
    const touchesStatus = editedStartCol <= statusCol && editedEndCol >= statusCol;
    if (!touchesStatus) return;

    const startRow = e.range.getRow();
    const numRows = e.range.getNumRows();

    for (let i = 0; i < numRows; i++) {
      const row = startRow + i;
      if (row <= CONFIG.HEADER_ROW) continue;

      const statusValue = String(sheet.getRange(row, statusCol).getValue()).trim();
      if (statusValue === CONFIG.STATUS_SEND) {
        sendRowEmail(sheet, row, headers, statusCol);
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    lock.releaseLock();
  }
}

function scanNewRows() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(30000)) return;

  try {
    const sheet = SpreadsheetApp.getActive().getSheetByName(CONFIG.SHEET_NAME);
    if (!sheet) throw new Error('No existe la pestana: ' + CONFIG.SHEET_NAME);

    const headers = getHeaders(sheet);
    const emailCol = CONFIG.EMAIL_COL_LETTER
      ? columnLetterToIndex(CONFIG.EMAIL_COL_LETTER)
      : CONFIG.COL_EMAIL;
    const processedCol = CONFIG.PROCESSED_COL_LETTER
      ? columnLetterToIndex(CONFIG.PROCESSED_COL_LETTER)
      : (CONFIG.COL_PROCESSED || CONFIG.COL_STATUS || (CONFIG.STATUS_COL_LETTER ? columnLetterToIndex(CONFIG.STATUS_COL_LETTER) : null));

    if (!emailCol) throw new Error('No se pudo resolver la columna de correo.');
    if (!processedCol) throw new Error('No se pudo resolver la columna de procesado/status.');

    const lastRow = sheet.getLastRow();
    if (lastRow <= CONFIG.HEADER_ROW) return;

    for (let row = CONFIG.HEADER_ROW + 1; row <= lastRow; row++) {
      const email = String(sheet.getRange(row, emailCol).getValue() || '').trim();
      const processed = String(sheet.getRange(row, processedCol).getValue() || '').trim();

      if (!email) continue;
      if (processed === CONFIG.PROCESSED_SENT || processed.indexOf(CONFIG.ERROR_VALUE_PREFIX) === 0) continue;

      sendRowEmail(sheet, row, headers, processedCol);
    }
  } catch (err) {
    console.error(err);
  } finally {
    lock.releaseLock();
  }
}

function scanSequenceEmails() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(30000)) return;

  try {
    const sheet = SpreadsheetApp.getActive().getSheetByName(CONFIG.SHEET_NAME);
    if (!sheet) throw new Error('No existe la pestana: ' + CONFIG.SHEET_NAME);

    const headers = getHeaders(sheet);
    const emailCol = CONFIG.EMAIL_COL_LETTER
      ? columnLetterToIndex(CONFIG.EMAIL_COL_LETTER)
      : CONFIG.COL_EMAIL;
    const eventCol = CONFIG.EVENT_DATETIME_COL_LETTER
      ? columnLetterToIndex(CONFIG.EVENT_DATETIME_COL_LETTER)
      : CONFIG.COL_EVENT_DATETIME;

    if (!emailCol) throw new Error('No se pudo resolver la columna de correo.');
    if (!eventCol) throw new Error('No se pudo resolver la columna de fecha/hora del evento.');

    const lastRow = sheet.getLastRow();
    if (lastRow <= CONFIG.HEADER_ROW) return;

    const now = new Date();

    for (let row = CONFIG.HEADER_ROW + 1; row <= lastRow; row++) {
      const email = String(sheet.getRange(row, emailCol).getValue() || '').trim();
      const eventDate = sheet.getRange(row, eventCol).getValue();

      if (!email || !eventDate) continue;

      CONFIG.SEQUENCE.forEach(function(sequenceItem) {
        const statusCol = sequenceItem.STATUS_COL_LETTER
          ? columnLetterToIndex(sequenceItem.STATUS_COL_LETTER)
          : sequenceItem.STATUS_COL;

        if (!statusCol) throw new Error('Falta STATUS_COL para secuencia: ' + sequenceItem.ID);

        const status = String(sheet.getRange(row, statusCol).getValue() || '').trim();
        const sentValue = sequenceItem.SENT_VALUE || CONFIG.PROCESSED_SENT;

        if (status === sentValue || status.indexOf(CONFIG.ERROR_VALUE_PREFIX) === 0) return;
        if (!shouldSendSequenceEmail(eventDate, sequenceItem, now)) return;

        sendRowSequenceEmail(sheet, row, headers, sequenceItem);
      });
    }
  } catch (err) {
    console.error(err);
  } finally {
    lock.releaseLock();
  }
}

function sendRowEmail(sheet, row, headers, statusColFromHandleEdit) {
  const statusCol = statusColFromHandleEdit || (CONFIG.STATUS_COL_LETTER
    ? columnLetterToIndex(CONFIG.STATUS_COL_LETTER)
    : (CONFIG.COL_STATUS || CONFIG.COL_PROCESSED));

  try {
    const lastCol = sheet.getLastColumn();
    const rowValues = sheet.getRange(row, 1, 1, lastCol).getValues()[0];
    const dataMap = buildDataMap(rowValues, headers);

    const emailCol = CONFIG.EMAIL_COL_LETTER
      ? columnLetterToIndex(CONFIG.EMAIL_COL_LETTER)
      : CONFIG.COL_EMAIL;

    if (!emailCol) throw new Error('No se pudo resolver la columna de correo.');

    const recipient = String(rowValues[emailCol - 1] || '').trim();
    if (!recipient) throw new Error('Correo destino vacio.');

    const subject = applyTemplate(CONFIG.SUBJECT_TEMPLATE, dataMap);
    const htmlTemplate = HtmlService.createHtmlOutputFromFile(CONFIG.HTML_FILE).getContent();
    const htmlBody = applyTemplate(htmlTemplate, dataMap);

    const options = {
      htmlBody: htmlBody,
      name: CONFIG.FROM_NAME
    };

    if (CONFIG.REPLY_TO) {
      options.replyTo = CONFIG.REPLY_TO;
    }

    MailApp.sendEmail(recipient, subject, '', options);

    sheet.getRange(row, statusCol)
      .setValue(CONFIG.TRIGGER_MODE === 'NEW_ROW_SENSOR' ? CONFIG.PROCESSED_SENT : CONFIG.STATUS_SENT)
      .setBackground(CONFIG.SENT_BG);
  } catch (err) {
    markError(sheet, row, statusCol, err.message || String(err));
  }
}

function sendRowSequenceEmail(sheet, row, headers, sequenceItem) {
  const statusCol = sequenceItem.STATUS_COL_LETTER
    ? columnLetterToIndex(sequenceItem.STATUS_COL_LETTER)
    : sequenceItem.STATUS_COL;

  try {
    const lastCol = sheet.getLastColumn();
    const rowValues = sheet.getRange(row, 1, 1, lastCol).getValues()[0];
    const dataMap = buildDataMap(rowValues, headers);

    const emailCol = CONFIG.EMAIL_COL_LETTER
      ? columnLetterToIndex(CONFIG.EMAIL_COL_LETTER)
      : CONFIG.COL_EMAIL;

    if (!emailCol) throw new Error('No se pudo resolver la columna de correo.');

    const recipient = String(rowValues[emailCol - 1] || '').trim();
    if (!recipient) throw new Error('Correo destino vacio.');

    const subject = applyTemplate(sequenceItem.SUBJECT_TEMPLATE, dataMap);
    const htmlTemplate = HtmlService.createHtmlOutputFromFile(sequenceItem.HTML_FILE).getContent();
    const htmlBody = applyTemplate(htmlTemplate, dataMap);

    const options = {
      htmlBody: htmlBody,
      name: CONFIG.FROM_NAME
    };

    if (CONFIG.REPLY_TO) {
      options.replyTo = CONFIG.REPLY_TO;
    }

    MailApp.sendEmail(recipient, subject, '', options);

    sheet.getRange(row, statusCol)
      .setValue(sequenceItem.SENT_VALUE || CONFIG.PROCESSED_SENT)
      .setBackground(CONFIG.SENT_BG);
  } catch (err) {
    markError(sheet, row, statusCol, err.message || String(err));
  }
}

function shouldSendSequenceEmail(eventDate, sequenceItem, now) {
  const offsetMs = parseRelativeOffset(sequenceItem.WHEN);
  const windowMinutes = sequenceItem.WINDOW_MINUTES || CONFIG.SCAN_MINUTES || 5;
  const targetTime = new Date(eventDate).getTime() + offsetMs;
  const currentTime = now.getTime();
  const windowMs = windowMinutes * 60 * 1000;

  return currentTime >= targetTime && currentTime < targetTime + windowMs;
}

function parseRelativeOffset(offset) {
  const match = String(offset || '').trim().match(/^([+-])(\d+)(m|h|d)$/i);
  if (!match) throw new Error('Offset invalido: ' + offset);

  const sign = match[1] === '-' ? -1 : 1;
  const amount = Number(match[2]);
  const unit = match[3].toLowerCase();
  const multipliers = {
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000
  };

  return sign * amount * multipliers[unit];
}

function getHeaders(sheet) {
  return sheet
    .getRange(CONFIG.HEADER_ROW, 1, 1, sheet.getLastColumn())
    .getValues()[0]
    .map(function(header) {
      return String(header || '').trim();
    });
}

function buildDataMap(rowValues, headers) {
  const dataMap = {};

  headers.forEach(function(header, index) {
    if (header) {
      dataMap[header] = rowValues[index];
    }
  });

  Object.keys(CONFIG.PLACEHOLDER_MAP).forEach(function(placeholder) {
    const source = CONFIG.PLACEHOLDER_MAP[placeholder];
    let value = '';

    if (/^[A-Z]+$/i.test(source)) {
      value = rowValues[columnLetterToIndex(source) - 1];
    } else {
      const headerIndex = headers.indexOf(source);
      value = headerIndex >= 0 ? rowValues[headerIndex] : '';
    }

    dataMap[placeholder] = value;
  });

  Object.keys(CONFIG.DEFAULTS || {}).forEach(function(placeholder) {
    if (dataMap[placeholder] === '' || dataMap[placeholder] === null || typeof dataMap[placeholder] === 'undefined') {
      dataMap[placeholder] = CONFIG.DEFAULTS[placeholder];
    }
  });

  return dataMap;
}

function applyTemplate(template, dataMap) {
  let output = String(template || '');

  Object.keys(dataMap).forEach(function(key) {
    const placeholder = key.indexOf('{{') === 0 ? key : '{{' + key + '}}';
    const value = dataMap[key] === null || typeof dataMap[key] === 'undefined'
      ? ''
      : String(dataMap[key]);

    output = output.split(placeholder).join(value);
  });

  return output;
}

function markError(sheet, row, col, msg) {
  sheet.getRange(row, col)
    .setValue(CONFIG.ERROR_VALUE_PREFIX + ' ' + msg)
    .setBackground(CONFIG.ERROR_BG);
}

function columnLetterToIndex(letter) {
  const cleanLetter = String(letter || '').trim().toUpperCase();
  let index = 0;

  for (let i = 0; i < cleanLetter.length; i++) {
    index = index * 26 + cleanLetter.charCodeAt(i) - 64;
  }

  return index;
}

function testSendRow2() {
  const sheet = SpreadsheetApp.getActive().getSheetByName(CONFIG.SHEET_NAME);
  const headers = getHeaders(sheet);
  const statusCol = CONFIG.STATUS_COL_LETTER
    ? columnLetterToIndex(CONFIG.STATUS_COL_LETTER)
    : CONFIG.COL_STATUS;

  sendRowEmail(sheet, 2, headers, statusCol);
}
```

## Response Format

When enough information is available, respond with:

1. Brief configuration summary.
2. Complete `.gs` code block.
3. HTML placeholders to use when applicable.
4. Minimal final steps:
   - Save.
   - Run `autorizarMailApp()` once.
   - For `STATUS_EDIT`, run `setupTrigger()` once and write the send value in `STATUS`.
   - For `NEW_ROW_SENSOR`, run `setupTimeTrigger()` once and confirm new leads land with email populated.
   - For `SEQUENCE_SENSOR`, run `setupTimeTrigger()` once and confirm the event datetime plus each sequence status column is configured.

For `PROVISION_READY`, respond with:

1. Created/updated Sheet name and URL when available.
2. Created/updated Apps Script files:
   - `Code.gs`
   - one `.html` file per template
3. Installed trigger:
   - `handleEdit` for `STATUS_EDIT`
   - `scanNewRows` for `NEW_ROW_SENSOR`
   - `scanSequenceEmails` for `SEQUENCE_SENSOR`
4. Asset manifest with final public image URLs.
5. Final schema:
   - operational columns
   - dynamic data columns
   - status/log columns
6. Any manual action still required, only if tools or permissions prevented full provisioning.

## Diagnostics

If it does not work, debug in this order:

1. Exact sheet tab name.
2. `handleEdit` trigger installed.
3. Trigger event source: spreadsheet; event type: on edit.
4. Real edit in the `STATUS` column.
5. `STATUS` and `EMAIL` columns are correctly mapped.
6. HTML file exists.
7. `MailApp` permissions authorized.
8. Manual test with `testSendRow2()`.
9. If old email content arrives, compare the row's `TEMPLATE_VERSION` with the expected code/template version and reinstall triggers from the current script.

For `NEW_ROW_SENSOR`, debug in this order:

1. Exact sheet tab name.
2. Time-driven trigger `scanNewRows` installed.
3. New rows are actually landing in the expected sheet.
4. Email column is populated.
5. Processed/status column is empty before sending and marked after sending.
6. HTML file exists.
7. `MailApp` permissions authorized.
8. Manual test with `scanNewRows()` or `testSendRow2()`.
9. If old email content arrives, compare `TEMPLATE_VERSION`, trigger ownership, and the deployed HTML file contents.

For `SEQUENCE_SENSOR`, debug in this order:

1. Exact sheet tab name.
2. Time-driven trigger `scanSequenceEmails` installed.
3. Event datetime column contains real date/time values, not ambiguous text.
4. Spreadsheet timezone and `CONFIG.TIMEZONE` match the campaign expectation.
5. Each sequence item has a unique status column.
6. Each HTML file exists.
7. Current time is inside the configured `WHEN` plus `WINDOW_MINUTES` window.
8. Manual test with `scanSequenceEmails()` and a near-term event datetime.

## Provisioning, Auth, And Web App Setup

For `PROVISION_READY`, auth and account alignment are part of the deliverable.

- Never write real client secrets, refresh tokens, access tokens, setup keys, or private OAuth material into generated docs, skill files, Git commits, or final responses. Use placeholders only.
- Confirm the active Google account is the intended Sheet/App Script owner or has editor access to all assets.
- OAuth clients can be tied to a Cloud project while an Apps Script file may use its own default Google-managed project. If `scripts.run` returns a Cloud project or 403 mismatch, use a browser-authorized setup path instead of forcing the API path.
- A temporary web app endpoint can safely run trigger setup when protected by a one-time setup key:
  - upload current `Code.gs` and HTML files
  - deploy web app as the intended account
  - visit the setup URL in the intended browser/profile
  - expect a plain response such as `setupTriggers ok`
  - delete, disable, or rotate the setup key after setup
- Browser profile matters. If auth opens the wrong account, launch or ask the user to use the exact intended profile.

For test sends:

- Create a unique synthetic row ID, not a reused row.
- Use the user's test recipient.
- Leave processed/status blank for sensor flows or write the configured send value for manual flows.
- Verify row status, timestamp, last error, and `TEMPLATE_VERSION`.
- Then inspect the received email for current logo/image URLs and Gmail artifacts such as hidden `...`.
