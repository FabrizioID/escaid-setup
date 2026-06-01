---
name: ssh-vps
description: Ejecución directa de comandos en el VPS AECODE via SSH MCP. Activar cuando se necesite correr comandos en el servidor — docker, logs, archivos, env vars, procesos. Complementa hostinger-vps (que solo gestiona lifecycle/DNS/firewall).
---

# SSH VPS — Ejecución Directa en AECODE

Acceso SSH al VPS donde corre el stack GEN+: n8n, Evolution API, Docker Swarm, EasyPanel.

## MCP: mcp-ssh-manager

Package: `bvisible/mcp-ssh-manager` — 37 herramientas para SSH, Docker, archivos, backups, health monitoring.

Configurado en: `settings.json` → mcpServers → `ssh-vps`

Credenciales: ver `pills/ssh-credentials.md` (local only, no commitear)

---

## Casos de uso principales

### n8n — env vars y configuración
```bash
# Cambiar modo de binarios (fix filesystem-v2)
docker service update --env-add N8N_DEFAULT_BINARY_DATA_MODE=memory 1erautomatizacion_n8n

# Limitar concurrencia (fix task runner crash)
docker service update --env-add N8N_CONCURRENCY_PRODUCTION_LIMIT=5 1erautomatizacion_n8n

# Ver logs en tiempo real
docker service logs 1erautomatizacion_n8n --follow --tail 50
```

### Docker — estado del stack
```bash
docker service ls                          # ver todos los servicios
docker service ps 1erautomatizacion_n8n    # estado del servicio n8n
docker stack services 1erautomatizacion    # stack completo
```

### SQLite — limpiar ejecuciones stuck
```bash
sqlite3 /var/lib/docker/volumes/1erautomatizacion_n8n_data/_data/database.sqlite \
  "UPDATE execution_entity SET status='crashed', stoppedAt=datetime('now') WHERE status='new';"
```

### Diagnóstico rápido
```bash
cat /proc/meminfo | grep MemAvailable   # RAM disponible
df -h /                                 # disco
docker stats --no-stream                # CPU/RAM por container
```

---

## Protocolo de operación

1. Leer `pills/ssh-credentials.md` para host/user/pass
2. Para cambios que afectan producción → crear snapshot primero via `hostinger-vps` skill
3. Ejecutar comando
4. Verificar resultado (logs, health check, ejecución de prueba)
5. Documentar el cambio en el thread del proyecto si es relevante

---

## Complemento con hostinger-vps

| Tarea | Skill |
|---|---|
| Reiniciar VPS completo | `hostinger-vps` → VPS_restartVirtualMachineV1 |
| Snapshot antes de cambio destructivo | `hostinger-vps` → VPS_createSnapshotV1 |
| Cambiar env var Docker | `ssh-vps` → docker service update |
| Ver logs de n8n | `ssh-vps` → docker service logs |
| Limpiar ejecuciones stuck | `ssh-vps` → sqlite3 |
| Firewall / DNS | `hostinger-vps` |
