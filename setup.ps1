# ============================================================
# Claude Setup — Script de instalacion para Windows
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
Write-Host "[1/6] Verificando dependencias..." -ForegroundColor Yellow

$deps = @("node", "python", "npx", "gh", "claude")
foreach ($dep in $deps) {
    if (-not (Get-Command $dep -ErrorAction SilentlyContinue)) {
        Write-Host "  FALTA: $dep — instalalo antes de continuar" -ForegroundColor Red
        exit 1
    }
    Write-Host "  OK: $dep" -ForegroundColor Green
}

# --- 2. Clonar submodulos ---
Write-Host ""
Write-Host "[2/6] Inicializando submodulos (MCPs)..." -ForegroundColor Yellow
Set-Location $SETUP_DIR
git submodule update --init --recursive
Write-Host "  OK: submodulos clonados" -ForegroundColor Green

# --- 3. Instalar dependencias de cada MCP ---
Write-Host ""
Write-Host "[3/6] Instalando dependencias de MCPs..." -ForegroundColor Yellow

# google-docs-mcp (Node)
Write-Host "  >> google-docs-mcp"
Set-Location "$SETUP_DIR\mcps\google-docs-mcp"
npm install --silent
npm run build --silent
Write-Host "  OK: google-docs-mcp compilado" -ForegroundColor Green

# word-document (Python)
Write-Host "  >> word-document-mcp"
python -m pip install python-docx mcp -q
Write-Host "  OK: word-document dependencias instaladas" -ForegroundColor Green

# --- 4. Copiar settings.json a ~/.claude/ ---
Write-Host ""
Write-Host "[4/6] Copiando settings.json a ~/.claude/ ..." -ForegroundColor Yellow
$claudeDir = "$env:USERPROFILE\.claude"
if (-not (Test-Path $claudeDir)) { New-Item -ItemType Directory -Path $claudeDir | Out-Null }

$settingsContent = Get-Content "$SETUP_DIR\settings.json" -Raw
$settingsContent = $settingsContent.Replace("SETUP_DIR", $SETUP_DIR.Replace("\", "\\"))
$settingsContent | Set-Content "$claudeDir\settings.json" -Encoding UTF8
Write-Host "  OK: settings.json copiado (paths actualizados)" -ForegroundColor Green

# --- 5. Registrar MCPs en Claude Code (proyecto local) ---
Write-Host ""
Write-Host "[5/6] Registrando MCPs en Claude Code..." -ForegroundColor Yellow

$googleDocsMcpPath = "$SETUP_DIR\mcps\google-docs-mcp\dist\index.js"
$wordMcpPath       = "$SETUP_DIR\mcps\word-document\word_mcp_server.py"

claude mcp add google-docs  -- node $googleDocsMcpPath
claude mcp add word-document -- python $wordMcpPath
claude mcp add playwright   -- npx "@playwright/mcp@latest"
claude mcp add n8n          -- npx -y n8n-mcp

Write-Host "  OK: MCPs registrados" -ForegroundColor Green
Write-Host "  NOTA: n8n requiere N8N_BASE_URL y N8N_API_KEY en tu entorno" -ForegroundColor DarkYellow

# --- 6. Auth manual requerida ---
Write-Host ""
Write-Host "[6/6] Pasos manuales requeridos:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  GOOGLE OAUTH:" -ForegroundColor Cyan
Write-Host "    cd $SETUP_DIR\mcps\google-docs-mcp"
Write-Host "    node .\dist\index.js auth"
Write-Host "    (se abrira el browser para autenticarte con Google)"
Write-Host ""
Write-Host "  CANVA OAUTH:" -ForegroundColor Cyan
Write-Host "    Abre Claude Code y escribe:"
Write-Host "    'usa el mcp de canva para listar mis disenos'"
Write-Host "    (triggerea el browser login de Canva automaticamente)"
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
