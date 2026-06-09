# ============================================================
# Claude Setup - Script de instalacion para Windows
# Ejecutar con: powershell -ExecutionPolicy Bypass -File setup.ps1
# ============================================================

$ErrorActionPreference = "Stop"
$SETUP_DIR = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host ""
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host "  Claude Code Environment Setup" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

# --- 1. Verificar dependencias ---
Write-Host "[1/7] Verificando dependencias..." -ForegroundColor Yellow

$deps = @("node", "python", "npx", "gh", "claude")
foreach ($dep in $deps) {
    if (-not (Get-Command $dep -ErrorAction SilentlyContinue)) {
        Write-Host "  FALTA: $dep - instalalo antes de continuar" -ForegroundColor Red
        exit 1
    }
    Write-Host "  OK: $dep" -ForegroundColor Green
}

# --- 2. Clonar submodulos ---
Write-Host ""
Write-Host "[2/7] Inicializando submodulos (MCPs)..." -ForegroundColor Yellow
Set-Location $SETUP_DIR
git submodule sync --recursive
git submodule update --init --recursive
Write-Host "  OK: submodulos clonados" -ForegroundColor Green

# --- 3. Instalar dependencias de cada MCP local ---
Write-Host ""
Write-Host "[3/7] Instalando dependencias de MCPs..." -ForegroundColor Yellow

# google-workspace-mcp (Node)
Write-Host "  >> google-workspace-mcp"
Set-Location "$SETUP_DIR\mcps\google-workspace-mcp"
npm install --silent
npm run build --silent
Write-Host "  OK: google-workspace-mcp compilado" -ForegroundColor Green

# docx-editor-local (Node)
Write-Host "  >> docx-editor-local"
Set-Location "$SETUP_DIR\mcps\docx-editor-local"
npm install --silent
Write-Host "  OK: docx-editor-local instalado" -ForegroundColor Green

# word-document (Python)
Write-Host "  >> word-document-mcp"
python -m pip install python-docx mcp -q
Write-Host "  OK: word-document dependencias instaladas" -ForegroundColor Green

# --- 4. Copiar settings.json a ~/.claude/ ---
Write-Host ""
Write-Host "[4/7] Copiando settings.json a ~/.claude/ ..." -ForegroundColor Yellow
$claudeDir = "$env:USERPROFILE\.claude"
if (-not (Test-Path $claudeDir)) { New-Item -ItemType Directory -Path $claudeDir | Out-Null }

$docxDriveDir = "$env:USERPROFILE\.codex\mcp\docx_drive"
if (-not (Test-Path $docxDriveDir)) { New-Item -ItemType Directory -Path $docxDriveDir -Force | Out-Null }
$docxDriveCredentialsPath = "$docxDriveDir\.gdrive-server-credentials.json"
$docxDriveOauthPath = "$docxDriveDir\gcp-oauth.keys.json"

$settingsContent = Get-Content "$SETUP_DIR\settings.json" -Raw
$settingsContent = $settingsContent.Replace("SETUP_DIR", $SETUP_DIR.Replace("\", "\\"))
$settingsContent = $settingsContent.Replace("DOCX_DRIVE_CREDENTIALS_PATH_PLACEHOLDER", $docxDriveCredentialsPath.Replace("\", "\\"))
$settingsContent = $settingsContent.Replace("DOCX_DRIVE_OAUTH_PATH_PLACEHOLDER", $docxDriveOauthPath.Replace("\", "\\"))
$settingsContent | Set-Content "$claudeDir\settings.json" -Encoding UTF8
Write-Host "  OK: settings.json copiado (paths actualizados)" -ForegroundColor Green

# --- 4b. Instalar Magnus checkpoint (enforcement) en Claude Code Y Codex ---
Write-Host ""
Write-Host "[4b/7] Instalando Magnus checkpoint (enforcement Claude + Codex)..." -ForegroundColor Yellow
$codexDir = "$env:USERPROFILE\.codex"
if (-not (Test-Path $codexDir)) { New-Item -ItemType Directory -Path $codexDir -Force | Out-Null }
Copy-Item -Force "$SETUP_DIR\magnus-checkpoint.txt" "$claudeDir\magnus-checkpoint.txt"
Copy-Item -Force "$SETUP_DIR\magnus-checkpoint.txt" "$codexDir\magnus-checkpoint.txt"
Write-Host "  OK: magnus-checkpoint.txt copiado a .claude y .codex" -ForegroundColor Green

# Magnus en Codex via AGENTS.md (instrucciones permanentes). NO usa hook de comando:
# en Windows Home el sandbox de Codex puede fallar al ejecutar comandos por prompt y
# bloquear la sesion ("Couldn't set up non-admin sandbox"). AGENTS.md no ejecuta nada,
# no depende del sandbox y no puede romper Codex. Idempotente via marcador.
$codexAgents = "$codexDir\AGENTS.md"
$magnusAgents = Get-Content "$SETUP_DIR\magnus-agents.md" -Raw
if (Test-Path $codexAgents) {
    $existingAgents = Get-Content $codexAgents -Raw
    if ($existingAgents -notmatch "MAGNUS-ENFORCEMENT-START") {
        Add-Content -Path $codexAgents -Value "`r`n$magnusAgents"
        Write-Host "  OK: Magnus agregado a Codex AGENTS.md" -ForegroundColor Green
    } else {
        Write-Host "  OK: Magnus ya presente en Codex AGENTS.md" -ForegroundColor Green
    }
} else {
    Set-Content -Path $codexAgents -Value $magnusAgents -Encoding UTF8
    Write-Host "  OK: Codex AGENTS.md creado con Magnus" -ForegroundColor Green
}

# --- 5. Instalar skills custom (Claude Code Y Codex - paridad) ---
Write-Host ""
Write-Host "[5/7] Copiando skills custom a ~/.claude/skills y ~/.codex/skills ..." -ForegroundColor Yellow
Write-Host "  Incluye skills de memoria, hilos persistentes y especialidad por dominio" -ForegroundColor DarkYellow
$skillTargets = @("$claudeDir\skills", "$env:USERPROFILE\.codex\skills")
foreach ($skillsDir in $skillTargets) {
    if (-not (Test-Path $skillsDir)) { New-Item -ItemType Directory -Path $skillsDir -Force | Out-Null }
}

$skillDirs = Get-ChildItem "$SETUP_DIR\skills" -Directory
foreach ($skillDir in $skillDirs) {
    foreach ($skillsDir in $skillTargets) {
        $targetDir = Join-Path $skillsDir $skillDir.Name
        if (Test-Path $targetDir) { Remove-Item -Recurse -Force $targetDir }
        Copy-Item -Recurse -Force $skillDir.FullName $targetDir
    }
    Write-Host "  OK: $($skillDir.Name) instalado (Claude + Codex)" -ForegroundColor Green
}

# --- 6. Registrar MCPs locales/npx en Claude Code ---
Write-Host ""
Write-Host "[6/7] Registrando MCPs en Claude Code..." -ForegroundColor Yellow

$googleWorkspaceMcpPath = "$SETUP_DIR\mcps\google-workspace-mcp\dist\index.js"
$wordMcpPath = "$SETUP_DIR\mcps\word-document\word_mcp_server.py"
$docxEditorPath = "$SETUP_DIR\mcps\docx-editor-local\server.js"

claude mcp add google-workspace -- node $googleWorkspaceMcpPath
claude mcp add word-document -- python $wordMcpPath
claude mcp add docx-editor-local -- node $docxEditorPath
claude mcp add playwright -- npx "@playwright/mcp@latest"
claude mcp add n8n -- npx -y n8n-mcp

Write-Host "  OK: MCPs locales/npx registrados" -ForegroundColor Green
Write-Host "  NOTA: docx-drive, canva y miro quedan provisionados via settings.json" -ForegroundColor DarkYellow
Write-Host "  NOTA: n8n requiere N8N_BASE_URL y N8N_API_KEY en tu entorno" -ForegroundColor DarkYellow

# --- 7. Auth manual requerida ---
Write-Host ""
Write-Host "[7/7] Pasos manuales requeridos:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  GOOGLE OAUTH (google-workspace-mcp):" -ForegroundColor Cyan
Write-Host "    cd $SETUP_DIR\mcps\google-workspace-mcp"
Write-Host "    node .\dist\index.js auth"
Write-Host "    (se abrira el browser para autenticarte con Google)"
Write-Host ""
Write-Host "  DOCX-DRIVE (server-gdrive):" -ForegroundColor Cyan
Write-Host "    Coloca estos archivos en:"
Write-Host "    $docxDriveCredentialsPath"
Write-Host "    $docxDriveOauthPath"
Write-Host ""
Write-Host "  CANVA OAUTH:" -ForegroundColor Cyan
Write-Host "    Abre Claude Code y escribe:"
Write-Host "    'usa el mcp de canva para listar mis disenos'"
Write-Host "    (triggerea el browser login de Canva automaticamente)"
Write-Host ""
Write-Host "  MIRO OAUTH:" -ForegroundColor Cyan
Write-Host "    Abre Claude Code y usa una tool de Miro por primera vez"
Write-Host "    (se iniciara el flujo de autenticacion en browser si hace falta)"
Write-Host ""
Write-Host "  N8N API KEY:" -ForegroundColor Cyan
Write-Host "    Agrega en tu entorno o en .env:"
Write-Host "    N8N_BASE_URL=https://tu-instancia.app.n8n.cloud"
Write-Host "    N8N_API_KEY=tu_api_key"
Write-Host ""
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host "  Setup completado. Reinicia Claude Code." -ForegroundColor Green
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""
