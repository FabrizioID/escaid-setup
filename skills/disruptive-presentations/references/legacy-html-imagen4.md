# Legacy Mode — HTML + Imagen 4 + Canva

Ruta LEGACY. Usar SOLO si el usuario pide explicitamente: HTML editable, deck exportado, handoff a Canva, control de layout fino, o cuando el flujo prompt-MD falla repetidamente por precision de texto/diagrama. NO es el flujo por defecto (el default es el MD de prompts; ver `SKILL.md`). El HTML shell template esta en `full-reference.md`.

## Pipeline legacy (10 pasos)
1. Plan — topic, brand color, slide count (default 11), una tecnica de disrupcion por slide (sin repetir).
2. Disruption thesis — la idea visual que la slide comunica antes de elegir layout.
3. Layout map — zona de titular, zona de imagen, zonas tranquilas, reading path.
4. HTML shell — `go(0)`, `scale()`, nav por teclado, variable de marca `--g` (ver full-reference).
5. Prompts — uno por slide, tecnica unica, max 4 items de texto, language lock al final.
6. Generate — secuencial; sleep 30s en rate limit 429.
7. Coordinate fit — colocar texto HTML solo tras leer la imagen como grid e identificar zonas seguras.
8. QA — extraer previews y revisar contra checklist.
9. Fix — refinar prompt, recolocar o regenerar; tras 3 fallos cambiar tecnica.
10. Canva export — Canva MCP: crear design -> subir PNGs -> Magic Layers -> editable.

## Branding colors (por tema, legacy)
ML/Data: apple green · Computer Vision: golden yellow · AI Agents: electric violet · Business/Finance: electric blue o magenta · Health: clean teal · BIM/Engineering: electric blue. Fondo dark + un acento + texto blanco por defecto; si la direccion del deck es claramente light, mantener todo light.

## Imagen 4 — limites clave
| Problema | Fix |
|---|---|
| 5+ items de texto -> alucinacion | Max 4 items por slide |
| Hex codes salen como texto | Usar nombres de color |
| Ingles colandose | Language lock al final |
| Prompt corto -> composicion random | 100-150 palabras |
| Rate limit 429 | Sleep 30s, secuencial |
| WinError 10065 en threads | Generacion secuencial |
| 3D cartoonish | Photorealistic render quality |

## Python — Imagen 4 (secuencial, sin threading)
```python
import urllib.request, json, time
API_KEY = "YOUR_API_KEY"
URL = "https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict"

def generate_image(prompt, name, out_dir):
    path = f"{out_dir}/{name}.txt"
    payload = {"instances":[{"prompt":prompt}],"parameters":{"sampleCount":1,"aspectRatio":"16:9","safetyFilterLevel":"block_few"}}
    req = urllib.request.Request(f"{URL}?key={API_KEY}", data=json.dumps(payload).encode(),
        headers={"Content-Type":"application/json"}, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=180) as r:
            b64 = json.loads(r.read())["predictions"][0]["bytesBase64Encoded"]
        with open(path,"w") as f: f.write(b64)
    except Exception as e:
        if "429" in str(e): time.sleep(30); generate_image(prompt,name,out_dir)
        else: print(f"ERROR {name}: {e}")
```

## Python — embeber slides en HTML
```python
import os, re
def embed_all(html_path, slides_dir, slide_ids):
    with open(html_path,"r",encoding="utf-8") as f: html=f.read()
    for sid in slide_ids:
        txt=os.path.join(slides_dir,f"{sid}.txt")
        if not os.path.exists(txt): continue
        with open(txt,"r") as f: b64=f.read().strip()
        new_src=f"data:image/png;base64,{b64}"
        pattern=rf'(<div class="slide" id="{sid}"><img src=")[^"]*(")'
        html=re.sub(pattern, rf"\g<1>{new_src}\2", html)
    with open(html_path,"w",encoding="utf-8") as f: f.write(html)
```

## Canva MCP export
1. QA extraction -> PNGs. 2. Canva MCP: crear design 1280x720, subir cada PNG como pagina. 3. Magic Layers para conversion editable.

## HTML player (opcional, legacy)
Si el usuario quiere un player para ver los PNGs generados: HTML 16:9, una slide a la vez, nav por teclado (Arrow/Space/Home/End/F), contador, flechas. Shell template en `full-reference.md`. NO es el output por defecto de disruptive — el default es el MD de prompts.
