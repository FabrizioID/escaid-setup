---
name: revision-documental-trazable
description: Usar cuando el usuario necesite revisar documentos, TDR, PEB, bases, contratos, expedientes, informes o anexos "al pie de la letra", haciendo consultas y recibiendo respuestas con trazabilidad: documento, seccion, pagina si es posible, linea/bloque, cita corta, interpretacion e inferencias marcadas. Especialmente util para alinear alcance, entregables, formatos, LOD/LOI, responsabilidades y requisitos contractuales sin asumir informacion no evidenciada.
---

# Revision Documental Trazable

Skill para responder consultas documentales con evidencia verificable y sin inventar alcance.

## Regla madre

No responder una conclusion documental como hecho si no hay fuente identificada.

Cada respuesta debe distinguir:
- **Literal**: aparece en el documento.
- **Inferencia**: se deduce al cruzar fuentes, pero no aparece textual.
- **No encontrado**: se busco y no aparecio en los documentos revisados.
- **Pendiente de validacion**: falta revisar PDF/original, pagina exacta o anexo.

## Cuándo activarla

Activar cuando el usuario pida:
- revisar un TDR, PEB, contrato, expediente, informe, anexo o Drive;
- responder si un entregable/requisito "esta", "lo piden", "aplica" o "donde dice";
- comparar formatos, software, LOD/LOI, entregables BIM, responsabilidades o alcance;
- trabajar "al pie de la letra", "con fuente", "como Gemini", "con pagina" o "con referencia".

## Workflow

1. Identificar el universo documental.
   - Si ya existe carpeta/drive scan del proyecto, usar esos insumos primero.
   - Si el usuario menciona documentos nuevos, pedirlos o ubicar los archivos locales.
   - No mezclar Notion como fuente contractual salvo que el usuario pregunte por status/gestión.

2. Buscar literal primero.
   - Usar busquedas por terminos exactos y variantes razonables.
   - Buscar singular/plural, sinonimos tecnicos y nombres alternativos.
   - Ejemplo: "condiciones existentes", "instalaciones existentes", "infraestructuras existentes", "levantamiento", "as-built".

3. Abrir el contexto del match.
   - Leer lineas antes/despues o la pagina alrededor.
   - Evitar responder solo con el resultado del buscador.

4. Determinar nivel de referencia disponible.
   - Si se usa TXT extraido: dar documento + seccion + linea/bloque local.
   - Si se usa PDF/DOCX con paginas conservadas: dar documento + pagina + seccion.
   - Si no hay pagina exacta, decirlo claramente y ofrecer validacion contra PDF/original.

5. Responder con formato trazable.

## Formato de respuesta recomendado

```text
Respuesta corta:
Si / No / Parcial / No encontrado.

Fuente:
- Documento:
- Seccion:
- Pagina: [si disponible]
- Referencia local: [linea/bloque/archivo, si aplica]

Texto base:
"cita corta suficiente"

Interpretacion:
Que significa para el alcance/entregable.

Cuidado:
Que NO dice, que queda ambiguo o que requiere validacion.
```

Para respuestas largas, agrupar por documento:

```text
1. PLAN DE EJECUCION BIM
   - Hallazgo:
   - Fuente:
   - Texto base:
   - Lectura:

2. Informe / Anexo
   ...
```

## Reglas de evidencia

- No usar frases como "seguramente", "deberia", "lo normal es" para afirmar requisitos documentales.
- Si la respuesta depende de practica BIM o criterio profesional, marcarlo como criterio, no como requisito del documento.
- Si dos documentos se contradicen, mostrar ambos y no resolver la contradiccion sin criterio del usuario.
- Si un documento menciona software/formato en una tabla general, no asumir que aplica a todos los entregables; indicar el uso BIM o componente al que pertenece.
- Si una palabra no aparece exacta, reportar el nombre equivalente encontrado.
- Citas cortas: usar solo fragmentos necesarios, no pegar paginas completas.

## Niveles de revision

**Nivel rapido**
- Usar TXT/Markdown/CSV extraidos.
- Entregar documento, seccion y linea/bloque.
- Advertir si no hay pagina exacta.

**Nivel formal**
- Revisar PDF/DOCX original o version paginada.
- Entregar pagina exacta, seccion y cita corta.
- Usar cuando el usuario necesita sustento para cliente, informe o RFI.

## Busqueda sugerida

Usar `rg` para texto local:

```powershell
rg -n -i "termino1|termino2|termino3" "ruta\\del\\proyecto"
```

Cuando haya muchos archivos:
- acotar primero a la carpeta del proyecto;
- priorizar `drive_scan/docs`, `TDR`, `PEB`, `bases`, `informes`, `anexos`;
- ignorar `node_modules`, outputs genericos y documentos de otros proyectos.

## Cierre de respuesta

Cerrar con una lectura operacional breve:
- "Entonces, para el alcance..."
- "Lo que si esta pedido es..."
- "Lo que no aparece literal es..."
- "Para pagina exacta hay que validar contra el PDF/original."
