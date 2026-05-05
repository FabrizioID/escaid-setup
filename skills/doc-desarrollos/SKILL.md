---
name: doc-desarrollos
description: Sub-skill de documentador-experto. Genera las 3 documentaciones estándar de cualquier herramienta o sistema técnico construido: (1) guía de usuario, (2) documentación técnica de desarrollo, (3) documentación conceptual del dominio. Usar cuando se acabe de construir o exista una herramienta, app, API, automatización o sistema técnico que necesita ser documentado para el equipo.
---

# Doc Desarrollos

Sub-skill de documentador-experto para documentar herramientas y sistemas técnicos.

Genera 3 documentos HTML interactivos independientes para cualquier desarrollo.
Los criterios de UI vienen de documentador-experto — leer [../documentador-experto/references/ui-criteria.md](../documentador-experto/references/ui-criteria.md).

## Las 3 documentaciones

### Doc 1 — Guía de Usuario

Para el equipo que usa la herramienta. No técnica.

Estructura:
1. El problema que resuelve (qué pasa sin esta herramienta)
2. Qué es esta herramienta (propósito en 2 líneas)
3. Cómo ingresar los datos (campo por campo con descripción + ejemplo)
4. Entendiendo el output generado
5. Navegando los resultados
6. Funciones secundarias (botones, acciones adicionales)
7. Copiar y usar los resultados
8. Tips para mejores resultados

Incluir capturas reales de la herramienta con Playwright (ver ui-criteria.md protocolo de capturas).
Identificador visual: morado dominante.

### Doc 2 — Documentación Técnica

Para quien mantenga o escale el código. Incluye el por qué de cada decisión.

Estructura:
1. Stack y arquitectura — qué se usa + por qué se eligió cada pieza
2. El problema técnico que resuelve la arquitectura (seguridad, escalabilidad, etc.)
3. Estructura de archivos — árbol con descripción de cada archivo
4. Variables de entorno — qué son, cómo configurarlas, cómo rotarlas
5. Endpoints/APIs — diseño, parámetros, decisiones de diseño
6. El prompt / lógica central — dónde vive, qué contiene, cómo editarlo
7. Flujo de datos — diagrama paso a paso
8. Redespliegue — comandos exactos
9. Troubleshooting — tabla de errores comunes, causa y solución

Identificador visual: cyan dominante.

### Doc 3 — Documentación Conceptual del Dominio

El conocimiento especializado embebido en la herramienta. Se adapta al dominio del desarrollo.

Estructura base (adaptar según dominio):
1. El problema de fondo del dominio
2. Los conceptos clave (qué son, por qué importan)
3. Los tipos/categorías del dominio
4. Las fórmulas o patrones maestros
5. Los criterios de calidad
6. La arquitectura conceptual del sistema
7. Los frameworks o metodologías usados
8. Los filtros de calidad / anti-patrones
9. La anatomía completa del output

Para una herramienta de marketing → hooks, frameworks, psicología del espectador
Para una herramienta BIM → criterios de coordinación, normativas, capas funcionales
Para una herramienta de automatización → patrones de flujo, nodos, triggers, integraciones

NO mencionar herramientas internas de IA o sistemas de prompt como "Magnus" u otros nombres propios del setup. Usar términos genéricos: "criterios de calidad", "sistema de evaluación", "filtro de decisión".

Identificador visual: verde dominante.

## Protocolo de ejecución

### Paso 1 — Recopilar información

Antes de generar, identificar:
- Nombre de la herramienta
- Qué hace y para quién
- Stack técnico (frontend, backend, APIs)
- Endpoints principales
- Variables de entorno
- URL desplegada (para capturas Playwright)
- El dominio conceptual (marketing, BIM, automatización, etc.)

### Paso 2 — Capturas con Playwright

Si la herramienta tiene UI web:
1. Navegar a la URL con browser_navigate
2. Esperar carga: browser_wait_for time=2
3. Capturar: browser_take_screenshot filename="docs/screenshots/nombre.png"
4. Si hay generación de output, llenar el formulario y capturar el resultado
5. Capturar al menos: estado inicial, output generado, sección clave del resultado
6. Si la app tiene sidebar vacío/oscuro → aplicar crop CSS

### Paso 3 — Generar en orden

Generar en este orden:
1. Crear carpeta docs/ en el proyecto
2. Crear docs/guia-usuario.html
3. Crear docs/doc-tecnica.html
4. Crear docs/doc-dominio.html (o nombre específico del dominio)
5. Conectar las 3 con navegación cruzada en el header de cada una
6. Agregar botón "Docs" en el header de la app principal

### Paso 4 — Despliegue

Las docs son archivos estáticos — Vercel las sirve automáticamente junto con el proyecto.
Hacer git add + commit + vercel --prod --yes después de crear las 3 docs.

## Reglas

- Nunca llamar a las docs "Doc 1", "Doc 2", "Doc 3" en el texto visible — usar nombres descriptivos
- Nunca incluir información de sistemas de prompt o arquitecturas internas de IA en la Doc 3
- Nunca generar las 3 docs en un solo archivo — siempre separadas
- Siempre incluir capturas reales si la herramienta tiene UI
- La Doc 2 debe explicar el POR QUÉ de cada decisión, no solo el qué
- La Doc 3 debe adaptarse al dominio — no es una doc genérica de marketing
