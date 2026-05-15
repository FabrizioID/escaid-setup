---
name: google-docs-quotation-editor
description: Lógica de dominio para cotizaciones, propuestas y brochures corporativos en Google Docs. Construye la coherencia comercial, estructura el documento y delega la edición real a google-workspace-editor. Usar cuando el task es actualizar una propuesta comercial en Google Docs — cambios de texto, tablas de precios, branding — sin construir la lógica de cotización desde cero (para eso usar technical-quotation-builder primero).
---

# Google Docs Quotation Editor

Skill de dominio para cotizaciones y propuestas en Google Docs.

**No ejecuta ediciones directamente.** Usa `google-workspace-editor` para toda operación MCP sobre el documento.

## Cadena de uso

```
[lógica de negocio]         technical-quotation-builder   (si la cotización se construye desde cero)
[dominio cotización]    →   esta skill                    (coherencia comercial + plan de edición)
[edición MCP]          →   google-workspace-editor        (operaciones reales sobre el doc)
```

## Cuándo usar esta skill

- Actualizar una propuesta comercial existente en Google Docs
- Cambiar precios, alcance, cliente, fechas en un template de cotización
- Insertar o refinar tablas de precios con branding del template
- Hacer cambios quirúrgicos sin romper el layout visual

## Pre-Edit: Escaneo de Coherencia Comercial

Antes de editar, escanear el documento y reportar preguntas si algún item es ambiguo:

- nombre del proyecto, cliente, código de cotización y fecha de emisión
- si existe un piloto para este nuevo proyecto
- si aplica algún descuento, precio de paquete o caso de validación previo
- si el encabezado de la tabla económica representa precio total, tarifa unitaria o criterio de valorización
- consistencia entre la primera tabla económica y tablas posteriores de pago/valorización
- consistencia de unidades (TON, m2, m², GLB, mensual/diario/recurso)
- tarifas repetidas o contradictorias
- nombres heredados de proyectos, edificios, fases, bloques o términos del cliente anterior
- alcance que cobra el mismo trabajo dos veces
- términos, supuestos, exclusiones y vigencia que ya no aplican

Si el escaneo encuentra lógica comercial sin confirmar, preguntar antes de escribir.

## Reglas de dominio

- Preservar el template antes de optimizar el texto.
- Preferir cambios quirúrgicos sobre reemplazos amplios.
- No tratar contenido heredado del template como alcance confirmado.
- Preguntar antes de mantener supuestos comerciales no confirmados (pilotos, descuentos, nombres de cliente, tarifas, condiciones de pago).
- Antes de elegir colores, usar la primera tabla existente del documento como referencia visual.
- Si el usuario dice "mismo precio" o "alcance similar", verificar si los pilotos, descuentos y etiquetas heredadas aplican al nuevo proyecto.
- Actualizar siempre la fecha de emisión a la fecha actual o la solicitada por el usuario.

## Workflow

1. Escaneo de coherencia comercial → preguntar sobre ambigüedades.
2. Identificar área objetivo: encabezado, cuerpo, alcance, tabla de precios, tabla comparativa, bloque de contacto.
3. Leer la sección circundante antes de editar.
4. Confirmar supuestos comerciales no claros antes de escribir.
5. Pasar el plan de edición a `google-workspace-editor` para aplicar.
6. Releer la sección afectada después del edit.

## Reglas de tabla

- Reusar estructuras de tabla validadas del mismo documento.
- Reusar la paleta de colores de una tabla existente del documento.
- Confirmar si el texto vive en celda de tabla, párrafo o dibujo antes de editar.
- Identificar si el problema de color viene de: fill de celda, highlight de texto, shading de párrafo, o renderizado tardío de Docs.

## Output

- Distinguir siempre texto editable de dibujos o imágenes.
- Explicar cuando una limitación viene del tipo de objeto, no del contenido.
- Identificar qué patrón de tabla existente se está reutilizando.

## Referencias

- `references/editing-rules.md` → reglas de edición para documentos frágiles
- `references/mcp-capabilities.md` → capacidades del Google Workspace MCP
- `references/table-patterns.md` → patrones de tabla para cotizaciones
