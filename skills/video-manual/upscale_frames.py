"""
upscale_frames.py — Upscale frames de video a 4K con LANCZOS + UnsharpMask
Uso: python3 upscale_frames.py [directorio] [patron]
     python3 upscale_frames.py                     → hd_*.jpg en directorio actual
     python3 upscale_frames.py ./mi_proyecto        → hd_*.jpg en mi_proyecto/
     python3 upscale_frames.py ./mi_proyecto *.jpg  → todos los jpg

Por qué LANCZOS y no AI generativa (Gemini, DALL-E, etc.):
- Modelos generativos RECREAN la imagen → distorsionan texto e interfaces
- LANCZOS es interpolación matemática → cero distorsión, pixel-perfect
- Para screenshots de UI, formularios, código: LANCZOS siempre gana
"""

from PIL import Image, ImageFilter, ImageEnhance
from pathlib import Path
import sys, re

work_dir = Path(sys.argv[1]) if len(sys.argv) > 1 else Path('.')
pattern  = sys.argv[2] if len(sys.argv) > 2 else 'hd_*.jpg'
out_dir  = work_dir / 'upscaled'
out_dir.mkdir(exist_ok=True)

frames = sorted(work_dir.glob(pattern))
if not frames:
    print(f"No se encontraron archivos con patron '{pattern}' en {work_dir}")
    sys.exit(1)

print(f"Upscaling {len(frames)} frames: 1920x1080 -> 3840x2160 (4K)")
print(f"  Input:  {work_dir}/")
print(f"  Output: {out_dir}/")
print()

for i, frame in enumerate(frames, 1):
    img = Image.open(frame)
    w, h = img.size

    # Upscale 2x con LANCZOS — mejor algoritmo para texto/UI/screenshots
    img_up = img.resize((w * 2, h * 2), Image.LANCZOS)

    # UnsharpMask: afila bordes sin inventar contenido
    # radius=2 → radio de detección de bordes
    # percent=150 → intensidad del afilado (100=neutro, 200=máximo)
    # threshold=3 → ignorar diferencias menores a 3 niveles (evita ruido)
    img_sharp = img_up.filter(ImageFilter.UnsharpMask(radius=2, percent=150, threshold=3))

    # Leve boost de contraste para mejor legibilidad de texto
    img_final = ImageEnhance.Contrast(img_sharp).enhance(1.1)

    out = out_dir / (frame.stem + '.png')
    img_final.save(out, 'PNG')

    size_in  = frame.stat().st_size // 1024
    size_out = out.stat().st_size // 1024
    print(f"[{i}/{len(frames)}] {frame.name}  {w}x{h} -> {w*2}x{h*2}  {size_in}KB -> {size_out}KB")

print()
print(f"Completado: {len(frames)} imagenes en {out_dir}/")

# Parchear HTML si existe en el directorio
html_files = list(work_dir.glob('manual_*.html'))
if html_files:
    html = html_files[0]
    content = html.read_text(encoding='utf-8')
    patched = re.sub(r'src="(hd_[^"]+)\.jpg"', r'src="upscaled/\1.png"', content)
    # Tambien parchear si apuntaba a enhanced/
    patched = re.sub(r'src="enhanced/(hd_[^"]+)\.png"', r'src="upscaled/\1.png"', patched)
    if patched != content:
        html.write_text(patched, encoding='utf-8')
        print(f"HTML actualizado: {html.name} -> apunta a upscaled/")
