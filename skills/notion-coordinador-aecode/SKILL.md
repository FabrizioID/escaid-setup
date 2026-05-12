---
name: notion-coordinador-aecode
description: Perfil local para conectar Notion usando la cuenta coordinador de AECODE. Usar junto con documentar-notion cuando el usuario pida trabajar en la Notion del coordinador o aecode.
---

# Notion Coordinador AECODE

Perfil local de cuenta para Notion. No contiene secretos.

## Credencial local

- Alias: `coordinador-aecode`
- Archivo esperado: `~/.codex/credentials/notion/aecode_coordinador_notion.json`
- Archivo de referencia actual: `~/.codex/credentials/notion/aecode_coordinador_notion_mcp_reference.json`
- Campo de token esperado: `token`

## Estado

El archivo de referencia existente no contiene token. Antes de escribir en Notion con esta cuenta, debe existir `aecode_coordinador_notion.json` con token local valido.

## Protocolo

1. Activar tambien `documentar-notion`.
2. Confirmar que existe la credencial operativa `aecode_coordinador_notion.json`.
3. Verificar identidad con `GET /v1/users/me` antes de escribir.
4. Reportar solo alias, workspace y nombre del bot; nunca imprimir el token.
5. Si el MCP activo responde con otra cuenta, usar API fallback con esta credencial o recargar el MCP.

## Arranque rapido

Usar este perfil cuando el usuario mencione `coordinador`, `AECODE`, `coordinador@aecode.ai` o trabajos explicitamente ubicados en el Notion del coordinador.

Antes de escribir:

1. Confirmar que existe `~/.codex/credentials/notion/aecode_coordinador_notion.json`.
2. Validar `/v1/users/me`.
3. Si solo existe `aecode_coordinador_notion_mcp_reference.json`, no intentar escribir; reportar que falta la credencial operativa.

Si el MCP activo esta autenticado en otra cuenta, usar API fallback con este perfil solo si la credencial operativa existe. Si no existe, pedir al usuario habilitar/guardar la credencial.

## Uso esperado

Usar este perfil para crear/actualizar proyectos, actividades, bases inline y listas maestras en el workspace de Notion asociado a `coordinador@aecode.ai`.
