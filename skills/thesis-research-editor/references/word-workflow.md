# Word MCP — Guía de integración para edición de tesis

## Herramientas disponibles y cuándo usarlas

### Lectura y diagnóstico
| Herramienta | Usar cuando |
|---|---|
| `get_document_outline` | Mapear la estructura completa del .docx al inicio |
| `get_document_text` | Extraer todo el texto para análisis (puede ser muy grande) |
| `find_text_in_document` | Localizar un texto específico y su posición |
| `get_document_xml` | Acceder al XML raw cuando el texto está fragmentado en tablas |

### Edición de texto
| Herramienta | Usar cuando |
|---|---|
| `search_and_replace` | Reemplazar texto continuo (NO fragmentado en XML) |
| `insert_line_or_paragraph_near_text` | Insertar párrafo antes/después de texto existente |
| `replace_paragraph_block_below_header` | Reemplazar bloque completo bajo un encabezado |
| `add_paragraph` | Añadir párrafo al final del documento |
| `add_heading` | Añadir nuevo encabezado |

### Edición de tablas
| Herramienta | Usar cuando |
|---|---|
| `add_table` | Crear una tabla nueva desde cero |
| `format_table` | Aplicar estilo general a tabla |
| `highlight_table_header` | Dar color/negrita a fila de encabezado |
| `set_table_cell_alignment` | Alinear celdas (left/center/right) |
| `format_table_cell_text` | Formatear texto dentro de celda |
| `set_table_column_width` | Ajustar ancho de columna |

### Formato de texto
| Herramienta | Usar cuando |
|---|---|
| `format_text` | Aplicar negrita, cursiva, tamaño, color a texto |

---

## Problema conocido: texto fragmentado en XML

**Síntoma**: `search_and_replace` reporta "No occurrences found" para texto que sí existe visualmente.

**Causa**: Word fragmenta el texto en múltiples `<w:t>` tags dentro del XML por cambios de formato, corrección ortográfica o historial de revisiones.

**Solución**: manipulación directa del ZIP con Python:

```python
import zipfile, os

src = 'ruta/al/archivo.docx'
tmp = src + '.tmp'

with zipfile.ZipFile(src, 'r') as zin:
    xml = zin.read('word/document.xml').decode('utf-8')

# Hacer reemplazos directos en el XML
xml = xml.replace('texto_en_ingles', 'texto_en_español')

with zipfile.ZipFile(src, 'r') as zin:
    with zipfile.ZipFile(tmp, 'w', zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            if item.filename == 'word/document.xml':
                zout.writestr(item, xml.encode('utf-8'))
            else:
                zout.writestr(item, zin.read(item.filename))

os.replace(tmp, src)
```

**Cuándo usar**: traducción de parámetros de software (Aspen HYSYS, MATLAB, etc.) donde los nombres técnicos están partidos entre múltiples runs de XML.

---

## Flujo recomendado para edición mayor

```
1. get_document_outline          ← entender estructura
2. find_text_in_document         ← localizar punto de edición
3. copy_document (backup)        ← seguridad
4. [editar sobre la copia]
5. Reportar cambios al usuario
```

## Flujo para traducción de tablas

```
1. get_document_xml              ← obtener XML completo
2. Extraer texto de celdas via Python (w:t tags)
3. Identificar términos en inglés
4. Aplicar reemplazos via Python directo en ZIP
5. Verificar resultado con get_document_text
```

---

## Limitaciones conocidas

- **Archivo abierto en Word**: genera "Permission denied". Solución: cerrar Word o trabajar sobre copia.
- **Texto en encabezados/pies de página**: no accesible directamente con las herramientas actuales.
- **Imágenes y figuras**: el MCP no puede modificar imágenes embebidas ni insertar imágenes en posición específica (`add_picture` solo agrega al final del documento).
- **Ecuaciones**: las ecuaciones en formato OMML no son editables como texto.
- **Tablas muy grandes**: `get_document_xml` puede superar el límite de tokens; usar el archivo de resultado guardado.
- **TOC / Índice automático**: no editable por MCP. Actualizar en Word con Ctrl+A → F9.
- **search_and_replace en Headings (Heading 2, Heading 3)**: no aplica cambios aunque `find_text_in_document` sí los encuentre. Usar técnica insert+delete.

---

## Técnica insert+delete — reemplazar párrafo sin cascade

Para modificar un heading o cualquier párrafo donde search_and_replace falla:

```
insert_line_or_paragraph_near_text(
  target_paragraph_index = N,
  position = "after",
  line_text = "nuevo texto",
  line_style = "Heading 3"   # o el estilo que corresponda
)
→ nuevo párrafo queda en índice N+1

delete_paragraph(paragraph_index = N)
→ elimina original; nuevo sube a N

Resultado neto: índices externos no cambian.
```

**Importante**: usar `target_paragraph_index` (número entero), NO `target_text` cuando el texto contiene tildes (á, é, í, ó, ú, ñ) o caracteres especiales (₂, °, —). Los caracteres especiales en `target_text` producen párrafos insertados vacíos.

---

## Operaciones en batch masivo (APA compliance)

Para aplicar formato APA a múltiples figuras/tablas en un solo turno:

1. `find_text_in_document("Figura 1")` → devuelve todos los "Figura N" de una vez
2. Leer títulos en paralelo con múltiples `get_paragraph_text_from_document` (label+1 para cada figura)
3. Calcular `end_pos` de cada título (contar chars unicode: ñ=1, á=1, ₂=1)
4. Enviar todos los `format_text` en paralelo (hasta 20 llamadas simultáneas)

```
Figura N label: end_pos = 8 si N≤9, 9 si N≥10
Nota.:          end_pos = 5 (siempre)
Título:         end_pos = len(texto) — contar manualmente
```

---

## get_paragraph_text_from_document — uso crítico

Siempre leer el párrafo con este tool ANTES de formatearlo o borrarlo. Los índices cambian con cada insert/delete en la sesión.

```python
# Ejemplo de respuesta:
{
  "index": 696,
  "text": "Figura 22",
  "style": "Normal",
  "is_heading": false
}
```

Los párrafos de imagen devuelven `"text": ""` (vacío) — no borrar estos párrafos vacíos si están entre un título y una Nota.

---

## Renombrado masivo de secciones (reestructuración)

Al renombrar secciones (ej. 3.4.1→3.4.1.1, 3.4.5→3.4.2):

1. Usar `search_and_replace` con texto muy específico para párrafos Normal (incluir parte del título para evitar conflictos)
2. Para headings: usar insert+delete
3. Proceder de **número de sección mayor a menor** para evitar que un replace afecte a secciones que aún hay que renombrar
4. Verificar con `find_text_in_document` que no queden ocurrencias del número viejo
