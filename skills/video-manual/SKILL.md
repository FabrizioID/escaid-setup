---
name: video-manual
description: Genera un manual HTML con capturas 4K a partir de un video (Loom, YouTube u otro) y su transcripción. Usa Playwright para navegar al video, extrae frames clave vía canvas API en 1920x1080, los upscalea a 3840x2160 con Pillow LANCZOS + UnsharpMask (cero distorsión de texto), y produce un HTML con imágenes + contexto del contenido valioso (omitiendo relleno y errores). Activar cuando el usuario pase un link de video + transcripción y pida un manual, guía, resumen visual, o documento de referencia.
tools:
  - mcp__playwright__browser_navigate
  - mcp__playwright__browser_evaluate
  - mcp__playwright__browser_wait_for
  - mcp__playwright__browser_resize
  - mcp__playwright__browser_take_screenshot
  - Bash
  - Write
  - Edit
---

# Video Manual Skill

Convierte un video grabado + transcripción en un manual HTML visual con capturas 4K de los momentos clave.

## Cuándo usar esta skill

- Usuario pasa un URL de Loom/YouTube/Vimeo + transcripción
- Pide: "manual", "guía", "resumen visual", "documento de referencia", "capturas del video"
- Quiere separar el contenido de valor del relleno/errores del video

---

## Protocolo

### FASE 1 — Analizar la transcripción

Antes de abrir el browser, leer la transcripción completa e identificar:

1. **Momentos de VALOR** — pasos que sí funcionan, conceptos explicados, soluciones encontradas
2. **Relleno a omitir** — intentos fallidos repetidos, charla irrelevante, errores sin resolución
3. **Timestamps clave** — lista de `[segundos, nombre_corto]` para cada momento de valor

Regla de selección:
- Máximo 12 capturas por video
- Priorizar: conceptos nuevos, pasos de configuración, errores con solución, resultados exitosos
- Omitir: intentos fallidos idénticos, conversación sin contenido técnico

### FASE 2 — Setup del browser

```
1. browser_navigate → URL del video
2. browser_resize → width: 1920, height: 1080
3. browser_evaluate → verificar que el video carga:
   const v = document.querySelector('video');
   return v ? v.duration + 's / ' + v.videoWidth + 'x' + v.videoHeight : 'no video';
4. browser_evaluate → play + pause para activar el video:
   const v = document.querySelector('video'); v.play(); v.pause();
```

### FASE 3 — Capturar todos los frames de una vez

Usar UN SOLO evaluate que:
1. Itera los timestamps
2. Hace seek en cada uno (con 800ms de espera entre seeks)
3. Usa canvas API para capturar el frame nativo del video (sin UI de la plataforma)
4. Guarda en localStorage

```javascript
// Plantilla de evaluate batch
() => {
  const timestamps = [/* segundos */];
  const names = [/* nombres cortos sin espacios */];
  const v = document.querySelector('video');

  function capture(i) {
    return new Promise(resolve => {
      if (i >= timestamps.length) { resolve(); return; }
      v.currentTime = timestamps[i];
      setTimeout(() => {
        const c = document.createElement('canvas');
        c.width = 1920; c.height = 1080;
        c.getContext('2d').drawImage(v, 0, 0, 1920, 1080);
        localStorage.setItem('frame_' + names[i], c.toDataURL('image/jpeg', 0.95).split(',')[1]);
        capture(i + 1).then(resolve);
      }, 800);
    });
  }
  return capture(0).then(() => 'done: ' + names.length + ' frames');
}
```

### FASE 4 — Guardar frames a disco

Para cada nombre capturado:

```
browser_evaluate → localStorage.getItem('frame_<nombre>')
→ resultado se guarda en tool-result file
→ Bash python3 save_frame.py <nombre>.jpg
```

**Script save_frame.py** (crear en el directorio de salida si no existe):

```python
import json, base64, sys, os, glob, re

tool_dir = r'C:/Users/USUARIO/.claude/projects/<project-id>/tool-results'

files = glob.glob(os.path.join(tool_dir, 'mcp-playwright-browser_evaluate-*.txt'))
latest = max(files, key=os.path.getmtime)

with open(latest) as f:
    data = json.load(f)
raw = data[0]['text']

# Extraer base64 (puede venir con prefijo "### Result\n\"...")
if raw.startswith('### Result'):
    m = re.search(r'"([A-Za-z0-9+/]{100,})', raw)
    b64 = m.group(1).rstrip('"') if m else raw.split('"')[1]
else:
    b64 = raw
b64 += '=' * (-len(b64) % 4)

out_path = os.path.join(sys.argv[2], sys.argv[1])
with open(out_path, 'wb') as f:
    f.write(base64.b64decode(b64, validate=False))
print(f'Saved {sys.argv[1]}')
```

Verificar que todas son JPEGs válidos:
```python
# header[:2] == b'\xff\xd8'
```

### FASE 5 — Upscale a 4K (LANCZOS + UnsharpMask)

Después de tener los JPEGs 1920×1080, upscalear a **3840×2160** con Pillow.

**Por qué este método y no Gemini:**
- Gemini es un **generador** — recrea la imagen y alucina/distorsiona texto e interfaces
- LANCZOS es interpolación matemática — cada pixel es derivado exacto de los originales
- Para screenshots de UI y texto, LANCZOS da **cero distorsión garantizada**

**Script: `upscale_frames.py`**

```python
from PIL import Image, ImageFilter, ImageEnhance
from pathlib import Path
import sys

work_dir = Path(sys.argv[1]) if len(sys.argv) > 1 else Path('.')
pattern  = sys.argv[2] if len(sys.argv) > 2 else 'hd_*.jpg'
out_dir  = work_dir / 'upscaled'
out_dir.mkdir(exist_ok=True)

frames = sorted(work_dir.glob(pattern))
print(f'Upscaling {len(frames)} frames to 4K...')

for frame in frames:
    img = Image.open(frame)
    w, h = img.size

    # Upscale 2x con LANCZOS (mejor algoritmo para texto/UI)
    img_up = img.resize((w * 2, h * 2), Image.LANCZOS)

    # UnsharpMask: afila bordes sin inventar contenido
    # radius=2, percent=150, threshold=3 — óptimo para screenshots
    img_sharp = img_up.filter(ImageFilter.UnsharpMask(radius=2, percent=150, threshold=3))

    # Leve boost de contraste para legibilidad
    img_final = ImageEnhance.Contrast(img_sharp).enhance(1.1)

    out = out_dir / (frame.stem + '.png')
    img_final.save(out, 'PNG')
    print(f'  {frame.name} {w}x{h} -> {w*2}x{h*2} | {out.stat().st_size//1024}KB')

print(f'Done -> {out_dir}')
```

**Instalación:**
```bash
pip install pillow
```

**Ejecución:**
```bash
python3 upscale_frames.py <directorio_proyecto>
# Genera: upscaled/hd_*.png a 3840x2160
```

**Actualizar el HTML para apuntar a upscaled/:**
```python
import re
with open('manual_<tema>.html', encoding='utf-8') as f: c = f.read()
patched = re.sub(r'src="(hd_[^"]+)\.jpg"', r'src="upscaled/\1.png"', c)
with open('manual_<tema>.html', 'w', encoding='utf-8') as f: f.write(patched)
```

---

### FASE 6 — Generar el HTML manual

Estructura del HTML:

```
header           → título del video, autor, fecha, badge
.skipped banner  → nota breve sobre qué se omitió
sección por sección:
  h2 con número  → tema de la sección
  .step cards    → cada paso con:
    .timestamp   → MM:SS
    <p>          → descripción del contenido
    .tip/.warn   → insight clave si aplica
    <img>        → referencia al upscaled/*.png
resumen final    → lista numerada del proceso completo
footer           → créditos
```

**Reglas de escritura del HTML:**
- Describir QUÉ se ve en la captura, no solo el timestamp
- Los `.tip` destacan reglas no obvias que se descubrieron en el video
- Los `.warn` destacan errores conocidos con su causa
- El resumen final debe poder usarse como checklist independiente

**CSS base:**
```css
body { font-family: 'Segoe UI', sans-serif; background: #f5f7fa; }
header { background: linear-gradient(135deg, #25d366, #128c7e); color: white; padding: 40px 48px; }
.step { background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.07); padding: 24px 28px; margin-bottom: 24px; }
.timestamp { font-size: 0.75rem; font-weight: 600; color: #128c7e; background: #e8f8f5; padding: 3px 10px; border-radius: 20px; display: inline-block; }
.tip { background: #e8f8f5; border-left: 4px solid #25d366; border-radius: 6px; padding: 12px 16px; }
.warn { background: #ffeaea; border-left: 4px solid #e74c3c; border-radius: 6px; padding: 12px 16px; }
img { width: 100%; border-radius: 8px; border: 1px solid #e0e0e0; margin-top: 14px; }
```

Adaptar colores del header según el tema:
- WhatsApp/GHL → verde (`#25d366`, `#128c7e`)
- Facebook/Meta → azul (`#1877f2`, `#0d5bb5`)
- General → púrpura (`#6c5ce7`, `#4a3ab5`)
- Marketing → naranja (`#fd7c3f`, `#e05a1a`)

---

## Archivos de salida

```
proyecto/
├── hd_*.jpg          → frames originales 1920x1080 (fuente)
├── upscaled/
│   └── hd_*.png      → frames 4K 3840x2160 (usados en el HTML)
└── manual_<tema>.html
```

---

## Notas técnicas

**Canvas API y CORS:**
La canvas API captura el frame del video directamente, bypassing el UI de Loom/cualquier plataforma. Da el frame nativo sin overlays. Si el video usa DRM el canvas devuelve negro — usar screenshots de Playwright como fallback.

**Seek timing:**
800ms entre seeks funciona para Loom. Para videos pesados o conexión lenta, aumentar a 1200ms.

**localStorage limits:**
~5-10MB por dominio. Para 12 frames 1920×1080 @ 95% JPEG ≈ 3MB total. Si hay más frames, capturar en batches de 6.

**Por qué NO usar Gemini para upscale de screenshots:**
Gemini (gemini-2.5-flash-image, gemini-2.0-flash-exp) es un modelo generativo. Al "mejorar" una imagen, la regenera — lo que produce caracteres inventados, elementos de UI alterados y texto ilegible. Solo es útil para imágenes de personas/paisajes donde la precisión exacta no importa. Para UI, código, texto, formularios: **siempre LANCZOS**.

**Tabla comparativa de métodos:**
| Método | Texto/UI | Velocidad | Requiere |
|--------|----------|-----------|---------|
| Pillow LANCZOS + Unsharp | Perfecto | Segundos | `pip install pillow` |
| Gemini generativo | Distorsionado | ~7s/frame + API | Billing activado |
| Real-ESRGAN (screenshot model) | Excelente | Minutos | torch + GPU |

---

## Ejemplo de uso

```
Usuario: "aquí está el loom de cómo configurar Zapier con n8n: [URL]
y la transcripción: [texto]
hazme un manual"

→ Fase 1: analizar transcripción → timestamps clave (max 12)
→ Fase 2: abrir browser 1920x1080, verificar video
→ Fase 3: capturar todos los frames en batch vía canvas
→ Fase 4: guardar JPEGs 1920x1080
→ Fase 5: upscale a PNG 3840x2160 con LANCZOS
→ Fase 6: generar manual_zapier_n8n.html apuntando a upscaled/
```
