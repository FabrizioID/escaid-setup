# Learnings — Google APIs (Drive, Sheets, Apps Script, auth)

## 2026-06-10 — 🟢 PATRÓN: Recolector de formularios estático → Apps Script → Sheet + Drive (sin backend)
**Contexto:** formulario HTML estático (hosteado en Vercel/GitHub Pages) que debe guardar respuestas + archivos **sin servidor propio**. Caso real: briefs de ESPARQ.

**Patrón:** `form` → `fetch` POST a un **Web App de Apps Script** (`doPost`) enlazado al Sheet → `appendRow` + guarda archivos base64 en una **carpeta de Drive** (subcarpeta por envío) con su link en la fila.

**Gotchas clave (los que cuestan tiempo):**
- **CORS:** desde un sitio estático, POST a Apps Script con `Content-Type: application/json` dispara *preflight* que Apps Script NO maneja → falla. **Fix:** `Content-Type: text/plain;charset=utf-8` + `mode:'no-cors'`. El body llega igual; la respuesta queda **opaca** (no se puede leer `ok`), así que mostrar éxito optimista y **verificar server-side**.
- **El deploy del Web App es manual (navegador):** ningún MCP/tool lo despliega. El MCP de Google solo hace Sheets/Drive, NO Apps Script. El deploy (Implementar → App web → *Ejecutar como: Yo* · *Acceso: Cualquiera*) lo hace un humano logueado con la **cuenta dueña del Sheet** → da una URL `/exec`.
- **Cuenta:** el Apps Script *enlazado* corre como dueño del Sheet → acceso nativo y confidencial. Por eso conviene Apps Script sobre n8n si n8n tiene credenciales de otra cuenta.
- **`curl` POST falla con 411/redirect** (Apps Script redirige a googleusercontent y curl re-postea sin Content-Length). **El navegador lo maneja bien** → testear con Playwright, no con curl.
- **GET de prueba:** un `doGet()` que devuelve "activo" sirve para confirmar que el endpoint está vivo antes de cablear el form.

**Datos estructurados → celda legible:** matriz/ranking se serializan a **texto multilínea en UNA celda** (ej. `Rol: acceso1, acceso2`), flexible ante columnas/roles que el usuario edite o agregue. El HTML arma `values[]` **en orden de columnas**; el `.gs` solo hace `[timestamp, ...values, fileLinks]` (genérico para múltiples formularios/pestañas vía `body.brief`).

**Archivos:** browser → `FileReader.readAsDataURL` → base64; `.gs` → `Utilities.base64Decode` → `newBlob` → `folder.createFile` → `setSharing(ANYONE_WITH_LINK, VIEW)` → link a la celda.

**Verificación (no confiar en el overlay "enviado"):** test E2E real con **Playwright** (llenar + Enviar en el link público) + **leer el Sheet por MCP** para confirmar que la fila + archivos llegan a la columna correcta.

**Reutilizable en:** cualquier brief/encuesta/intake sin servidor. (.gs base: `outputs/apps-script-recolector.gs` del proyecto ESPARQ.)

---

## 2026-06-10 — 🟢 Plan B de deploy estático cuando GitHub Pages falla
**Contexto:** GitHub tuvo un **major outage de API** (verificado en githubstatus.com) → el build de Pages quedó colgado ~30 min, sirviendo la versión vieja.

**Disciplina:** ante un deploy que no publica, **distinguir nuestra-culpa vs externo CON evidencia** antes de tocar código:
1. Comparar `raw.githubusercontent.com/.../main/archivo` (repo, ya tiene el código nuevo) vs el live (Pages aún viejo) → si difieren, no es el código.
2. Revisar **githubstatus.com** (`/api/v2/components.json` y `/incidents/unresolved.json`).
3. Si es incidente de GitHub → no perder tiempo esperando: **Plan B = Vercel** (skill `vercel-teamdev`).

**Vercel CLI (no interactivo) exige scope explícito:** `vercel deploy "<carpeta>" --prod --yes --scope <team> --token=$VTOKEN`. Da URL limpia `*.vercel.app` en ~1 min. (Token local en `~/.codex/credentials/vercel/...`, nunca en repo.)

**Test humano inmediato sin esperar al host:** servir local con `python -m http.server --bind 0.0.0.0` — el envío al Apps Script funciona igual desde cualquier origen (incl. `localhost`).

**`.nojekyll`** fuerza a GitHub Pages a servir estático directo (salta Jekyll), útil si el build se cuelga por el motor.
