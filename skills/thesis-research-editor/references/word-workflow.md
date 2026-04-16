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
- **Imágenes y figuras**: el MCP no puede modificar imágenes embebidas.
- **Ecuaciones**: las ecuaciones en formato OMML no son editables como texto.
- **Tablas muy grandes**: `get_document_xml` puede superar el límite de tokens; usar el archivo de resultado guardado.
