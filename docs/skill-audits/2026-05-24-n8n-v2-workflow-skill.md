# Auditoria De Skill Externa - n8n v2 Workflow Skill

Fuente: https://github.com/splinesreticulating/n8n-v2-workflow-skill
Skill: `n8n-v2`
Fecha: 2026-05-24

## Veredicto

Decision: Absorber criterio
Confianza: Alta
Riesgo: Bajo/Medio

## Valor

- Que aporta: biblioteca documental de patrones n8n v2, Wait nodes, sub-workflows, expresiones, ejemplos JSON y troubleshooting.
- Que problema resuelve: reduce tiempo de diseno cuando el agente debe generar workflows importables o diagnosticar errores frecuentes de n8n.
- Que skill ESC-AI potencia: `n8n-workflow-builder`.

## Riesgos

- Seguridad: no se detectaron scripts de instalacion ni ejecucion automatica. El repo es principalmente Markdown, JSON y snippets JS.
- Credenciales: documenta APIs externas y ejemplos con headers, pero no trae secretos reales. Debe mantenerse la regla ESC-AI: credenciales solo en pill local o dentro de la instancia n8n.
- Dependencias: no hay `package.json` ni dependencias ejecutables.
- Mantenimiento: algunas recomendaciones de modelos AI y capacidades MCP pueden quedar desfasadas. Debe usarse como referencia, no como autoridad final.

## Solape

- Skill propia relacionada: `n8n-workflow-builder`.
- Diferencial real: buen paquete de patrones para Wait nodes, Execute Sub-Workflow, import/export JSON, version control y troubleshooting.
- Riesgo de confusion: alto si se instala directo, porque su `SKILL.md` afirma limitaciones MCP que no siempre aplican al MCP actual del usuario. ESC-AI ya tiene MCP con gestion mas amplia y REST fallback.

## Recomendacion Operativa

- Instalar directo: No.
- Adaptar como referencia: Si, copiando criterio conceptual y no rutas/credenciales.
- Cambios propuestos a skills propias: agregar reference pack en `skills/n8n-workflow-builder/references/` con patrones v2, Wait nodes, sub-workflows y limites MCP.
- Prueba segura: abrir la skill propia `n8n-workflow-builder`, leer pill local en silencio, ejecutar health check MCP o listar workflows sin modificar nada.

## Decision Final

No instalar `n8n-v2` como skill separada. Absorber sus mejores patrones dentro de `n8n-workflow-builder` para evitar duplicidad y mantener una sola ruta n8n oficial en ESC-AI.
