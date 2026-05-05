---
name: doc-general
description: Sub-skill de documentador-experto. Genera documentación interactiva HTML premium para cualquier cosa que no sea un desarrollo técnico: proyectos, procesos, manuales operativos, guías de equipo, conceptos, playbooks, ideas, sistemas organizativos. La estructura se adapta según el tipo de contenido. Usar cuando el usuario quiera documentar algo que no encaja en las 3 docs de desarrollo.
---

# Doc General

Sub-skill de documentador-experto para documentar cualquier contenido que no sea un desarrollo técnico.

Los criterios de UI vienen de documentador-experto — leer [../documentador-experto/references/ui-criteria.md](../documentador-experto/references/ui-criteria.md).

## Tipos de documentación soportados

Elegir el tipo más cercano antes de estructurar:

| Tipo | Cuándo usar |
|---|---|
| `system-guide` | Arquitectura, operaciones, sistemas técnicos/negocio |
| `agent-manual` | Asistentes, bots, automatizaciones, agentes operativos |
| `workflow-guide` | Explicación de un proceso de principio a fin |
| `playbook` | Procedimientos operativos, instrucciones de equipo, ejecución repetible |
| `showcase-doc` | Presentación de un producto, proceso o sistema a una audiencia |
| `concept-doc` | Documentación de un concepto, metodología o marco de trabajo |

## Estructura base adaptable

Cada tipo tiene un orden natural. Adaptar según el contenido real:

### system-guide / workflow-guide
1. Hero — qué es y para quién
2. Visión general del sistema/flujo
3. Capas o etapas principales
4. Lógica de decisiones clave
5. Outputs y cómo se consumen
6. Riesgos, mantenimiento y siguiente capa

### playbook / agent-manual
1. Hero — propósito y alcance
2. Cuándo activar / cuándo no activar
3. Roles y responsabilidades
4. Pasos del proceso (detallado)
5. Decisiones frecuentes
6. Errores comunes y cómo resolverlos
7. Referencias y recursos

### showcase-doc
1. Hero — la propuesta de valor en una pantalla
2. El problema que resuelve
3. Cómo funciona (flujo visual)
4. Resultados o casos
5. CTA o siguiente paso

### concept-doc
1. El concepto en una frase
2. Por qué importa (el problema que resuelve)
3. Los componentes o dimensiones
4. Cómo se aplica
5. Anti-patrones o errores frecuentes
6. Referencias o ejemplos

## Protocolo de ejecución

### Paso 1 — Clasificar y planificar

Antes de construir:
1. Identificar el tipo de documento
2. Definir la visual thesis (mood + material + energía en una frase)
3. Definir el plan de contenido (secciones + qué va en cada una)
4. Decidir si el output es solo HTML o si necesita exportación

### Paso 2 — Visual thesis

Escribir antes de construir:

```
Mood: [dark / editorial / futurista / cálido / etc.]
Material: [glass / chrome / paper / etc.]
Energía: [calm / dynamic / ambient / urgent]
```

Ejemplo: "Manual operativo oscuro con superficies glass y movimiento ambiente sutil"

### Paso 3 — Construir

Orden de construcción:
1. Hero (primera pantalla como poster)
2. Secciones principales con AOS
3. Fondo animado calibrado
4. Navegación si hay múltiples páginas

### Paso 4 — Validar antes de entregar

Checklist:
- [ ] La primera pantalla funciona como poster independiente
- [ ] Cada sección tiene un solo trabajo
- [ ] El motion no compite con la legibilidad
- [ ] El fondo no tapa el contenido central
- [ ] Los títulos se leen en scroll rápido
- [ ] El documento tiene sentido sin las animaciones

## Reglas

- Nunca empezar con markdown plano cuando se pide documentación premium
- Nunca agregar motion que reduzca claridad
- Siempre elegir el tipo de doc antes de estructurar
- Si el contenido es un desarrollo técnico → usar doc-desarrollos en su lugar
- La documentación sirve al contenido — nunca al revés
