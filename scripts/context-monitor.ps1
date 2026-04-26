# Monitors current session size and signals Claude to ask user about /compact or /clear
$projectsDir = "$env:USERPROFILE\.claude\projects"
$recent = Get-ChildItem $projectsDir -Recurse -Filter '*.jsonl' -ErrorAction SilentlyContinue |
    Sort-Object LastWriteTime -Descending |
    Select-Object -First 1

if ($recent -and $recent.Length -gt 1500000) {
    $mb = [math]::Round($recent.Length / 1MB, 1)
    Write-Output "[CONTEXT_MONITOR] Sesion ~${mb}MB. ANTES DE CONTINUAR: pregunta al usuario si quiere /compact (resume el contexto, mantiene el estado) o /clear (resetea completamente). Espera su respuesta antes de proceder."
}
