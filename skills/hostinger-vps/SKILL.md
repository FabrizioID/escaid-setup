---
name: hostinger-vps
description: Gestión de infraestructura VPS AECODE via Hostinger MCP + ejecución de comandos via SSH MCP. Activar cuando se necesite operar el servidor donde corre n8n, Evolution API, Docker Swarm o cualquier servicio del stack GEN+.
---

# Hostinger VPS — AECODE Infrastructure

Cubre dos capas distintas de acceso al servidor:

| Capa | MCP | Cuándo usar |
|---|---|---|
| Gestión de infraestructura | `mcp__hostinger__*` | Start/stop VPS, firewall, DNS, snapshots, backups |
| Ejecución de comandos | SSH MCP (pendiente instalar) | `docker service update`, logs, archivos, procesos |

Antes de cualquier operación: leer `pills/aecode-vps-credentials.md` para el inventario de servicios.

---

## Hostinger MCP — Operaciones disponibles

### VPS Lifecycle
- `mcp__hostinger__VPS_getVirtualMachinesV1` — listar VPS disponibles
- `mcp__hostinger__VPS_getVirtualMachineDetailsV1` — estado detallado de un VPS
- `mcp__hostinger__VPS_startVirtualMachineV1` — iniciar VPS
- `mcp__hostinger__VPS_stopVirtualMachineV1` — detener VPS
- `mcp__hostinger__VPS_restartVirtualMachineV1` — reiniciar VPS

### Backups y Snapshots
- `mcp__hostinger__VPS_createSnapshotV1` — crear snapshot antes de cambios destructivos
- `mcp__hostinger__VPS_restoreSnapshotV1` — restaurar snapshot
- `mcp__hostinger__VPS_getBackupsV1` — listar backups disponibles
- `mcp__hostinger__VPS_restoreBackupV1` — restaurar backup

### Firewall
- `mcp__hostinger__VPS_getFirewallListV1` / `getFirewallDetailsV1`
- `mcp__hostinger__VPS_createFirewallRuleV1` / `updateFirewallRuleV1` / `deleteFirewallRuleV1`
- `mcp__hostinger__VPS_activateFirewallV1` / `deactivateFirewallV1`

### DNS
- `mcp__hostinger__DNS_getDNSRecordsV1` / `updateDNSRecordsV1`
- `mcp__hostinger__DNS_validateDNSRecordsV1`

### Métricas
- `mcp__hostinger__VPS_getMetricsV1` — CPU, RAM, disco, red

---

## SSH MCP — Pendiente configurar

Para ejecutar comandos arbitrarios en el VPS (Docker, n8n env vars, logs, archivos):

**Instalación pendiente:** `mcp-ssh-manager` (bvisible/mcp-ssh-manager)

Requiere: host SSH del VPS, usuario (`root`), password o clave SSH.

Una vez instalado, agregar entrada en esta skill con los tools disponibles.

---

## Protocolo de operación segura

1. **Antes de cambios destructivos** → crear snapshot: `VPS_createSnapshotV1`
2. **Para cambios de configuración Docker/n8n** → SSH MCP cuando esté disponible
3. **Para reiniciar servicios que no responden** → `VPS_restartVirtualMachineV1` como último recurso
4. **Después de cambios en producción** → verificar con `n8n_health_check` y una ejecución real

---

## Stack del VPS AECODE

Ver `pills/aecode-vps-credentials.md` para IPs, puertos y credenciales.

Servicios principales:
- **n8n** — `https://1erautomatizacion-n8n.n7ixb7.easypanel.host` — orquestador principal
- **Evolution API** — `http://187.77.250.111:8080` — gateway WhatsApp
- **Docker Swarm** — stack `1erautomatizacion`
- **EasyPanel** — panel de gestión de containers
