---
name: disruptive-presentations
description: End-to-end pipeline to create disruptive standalone HTML presentations using Imagen 4 + optional Canva export. Use when asked to create any presentation, deck, or slideshow.
---

# Disruptive Presentations

Full prompt templates and HTML shell → [references/full-reference.md](references/full-reference.md)

---

## PIPELINE (8 steps)

1. **Plan** — topic, brand color, slide count (default 11), assign one disruption technique per slide (no repeats)
2. **HTML shell** — create with `go(0)`, `scale()`, keyboard nav, brand CSS variable `--g`
3. **Prompts** — one per slide, unique technique, max 4 text items, end with language lock
4. **Generate** — sequential (no threading) via Imagen 4 API, sleep 30s on 429 rate limit
5. **QA** — extract .txt → .png, review all slides against checklist
6. **Fix** — refine prompt + regenerate any failures. After 3 fails → switch technique
7. **Embed** — regex replace `src` per slide into HTML using base64
8. **Canva export** — Canva MCP: create design → upload PNGs → Magic Layers → editable

---

## BRANDING COLORS (by topic)
| Topic | Accent color |
|-------|-------------|
| ML / Data Science | bright apple green |
| Computer Vision | golden yellow |
| AI Agents | electric violet |
| Business / Finance | electric blue or hot magenta |
| Health / Medical | clean teal |
| BIM / Engineering | electric blue |

Dark background + one accent + white text. Always.

---

## DISRUPTION SEQUENCE — 3 questions before each slide
1. What **type** of content? (title / definition / hierarchy / process / taxonomy / deep-dive / applications / metrics / ecosystem / closing)
2. What **metaphor** makes the concept clearer — not just prettier?
3. Does this **contrast** structurally with the previous slide?

### Anti-repetition rules
- Never same layout twice in a row
- Alternate dark-heavy / lighter every 2-3 slides
- After complex diagram → simpler layout next
- 3 consecutive dark slides → make next one light
- Title ≠ closing (must look nothing alike)

### 11-slide variety grid
| Slide | Purpose | Technique |
|-------|---------|-----------|
| S1 | Title | Movie Poster Hero |
| S2 | Definition | Full Bleed Photo Metaphor or Mixed Containment |
| S3 | Core concept | Circular Loop or Concentric Circles |
| S4 | Architecture | Isometric 3D Stack or Factory Pipeline |
| S5 | Components | Hexagonal Grid or Constellation Map |
| S6 | Deep dive | Hacker Terminal or 3D Object + Annotations |
| S7 | Knowledge/memory | Surreal Library or Staggered Portrait Cards |
| S8 | Applications | Asymmetric Magazine Collage |
| S9 | Metrics/rankings | Giant Metrics + Separators or F1 Leaderboard |
| S10 | Ecosystem/future | Aerial City Network |
| S11 | Close | Pure Typography |

---

## 20 DISRUPTION TECHNIQUES (quick reference)
01. **Movie Poster Hero** — massive 3D glowing subject, text asymmetric lower-left, vertical text right edge
02. **Full Bleed Photo Metaphor** — real photo as bg, 3 content zones matching photo depth/light
03. **Circular Loop Diagram** — glowing nodes on circle, clockwise arrows, subject at center
04. **Isometric 3D Stack** — floating translucent layers at 30°, glowing edges, circuit texture bg
05. **Hexagonal Grid** — 4 hexagons 2×2 staggered, gradient fills, icon watermarks
06. **Hacker Terminal** — dark workstation photo bg, rounded terminal panel, THOUGHT/ACTION/OBSERVATION lines
07. **Constellation Map** — space bg, glowing star nodes, thin connecting lines, floating label cards
08. **Surreal Library** — infinite library photo, holographic floating cards at different angles/depths
09. **Asymmetric Magazine Collage** — 1 large (55%w×65%h) + 2 small bottom-left + 1 tall right (NOT 4 equal)
10. **F1 Leaderboard** — race/stadium photo bg, dark ranked panel with medal icons per row
11. **Aerial City Network** — night city aerial photo, brand-color nodes + connection lines + label cards
12. **Pure Typography** — ghost symbol bg (∞ Σ ©), massive 2-line heading (white + accent), formula, pills
13. **Ocean Depth Hierarchy** — underwater photo, 3 horizontal depth zones = 3 hierarchy levels
14. **Prism Spectrum** — light-through-prism photo, 3 zones = 3 processing levels
15. **Factory/Studio Pipeline** — industrial or studio photo, 5 floating station cards, center card glows
16. **3D Object + Callout Annotations** — dramatic 3D sculptural object, 4 labels connected by dotted lines
17. **Mixed Containment** — tension: rounded white cards + text directly on bg + photo bleeding from edge
18. **Staggered Portrait Cards** — tall vertical photo cards at different heights, tinted bg per card
19. **Giant Metrics + Separator Lines** — 3 rows: massive number + thin line + small description
20. **Dot Grid Texture** — hexagonal dot pattern at ~8% opacity as depth layer under any technique

Full prompt templates → [references/full-reference.md](references/full-reference.md)

---

## VISUAL METAPHOR PRINCIPLE
**The image must BE the communication. Ask: "Could someone understand the topic from the image alone?"**

✅ Ocean = AI/ML/DL hierarchy | Factory = pipeline | ECG = model health | F1 = benchmark race | Night city = multi-agent network | Prism = data layers | Library = knowledge domain | Terminal = code execution

❌ Generic particles, abstract orbs, circuit boards for any AI topic, floating geometric shapes

---

## REAL SOFTWARE BACKGROUND CRITERION

When a slide is about a **specific tool or software** (Revit, VS Code, Figma, etc.):
- Use a real screenshot of that software as background — it visually answers "why this tool?"
- The **3D model or content must be the protagonist**, not side panels or documentation UI
- **Never use a screenshot from a webpage/tutorial/guide** — looks like a manual, not real usage
- Search the web first to understand what the interface actually looks like
- If no clean native screenshot is available → **generate with Imagen 4** (equally valid)

When the topic is a **concept** (Machine Learning, Computer Vision, AI, etc.):
- No need for real software background — there's no single fixed tool
- Use a generated metaphor image — that is the right choice

**Background image quality checks:**
1. Does the 3D model/content dominate the frame?
2. Does it look like the app in use, or a web page?
3. Is browser chrome, tutorial annotations, or web layout visible? → reject

---

## IMAGEN 4 KEY LIMITS
| Problem | Fix |
|---------|-----|
| 5+ text items → duplicates/hallucination | Max 4 items per slide |
| Hex codes (#30d158) → renders as text | Use color names only |
| English bleeding in | Last line: "ALL text in Spanish, NO ENGLISH words" |
| Short prompt → random composition | Write 100-150 word prompts |
| Fan segment numbers duplicate | Focus on card side, deprioritize fan numbering |
| Rate limit 429 | Sleep 30s, retry sequentially (no threading) |
| WinError 10065 in threads | Use sequential generation only, no background threads |
| 3D looks cartoonish | Add "photorealistic render quality, dramatic lighting" |

---

## PROMPT ELEMENT ORDER
1. Base scene (dark/light, setting)
2. Primary visual (3D object / photo / diagram)
3. Layout proportions (e.g. "left 40% / right 60%")
4. Text content (max 4 items, radically different vocabulary)
5. Brand color (color name, not hex)
6. Quality directive ("photorealistic render quality, dramatic lighting")
7. **Language lock — LAST LINE** ("ALL text in Spanish, NO ENGLISH words")

---

## QA CHECKLIST
1. Text correct? No garbled words, no asterisks
2. Numbers sequential? No duplicates (01,02,02)
3. Layout matches prompt? Asymmetry is actually asymmetric
4. Brand color present where specified?
5. Visual metaphor supports the message?
6. No English where Spanish expected?
7. Is this the strongest possible version?

**Threshold:** Fail on 1-6 → regenerate. Fail 7 → judgment call. 3 fails same slide → switch technique.

---

## CANVA MCP EXPORT
```bash
claude mcp add canva --url https://mcp.canva.com/mcp
```
Authenticate via OAuth. Then:
1. Run QA extraction → get PNG files
2. Canva MCP → create 1280×720 design → upload each PNG as a page
3. In Canva editor: select image → Edit Image → **Magic Layers** → converts flat PNG to editable elements
4. Text becomes live text boxes, shapes become movable objects

---

## CORE PYTHON PATTERNS

### Imagen 4 API call (sequential, no threading)
```python
import urllib.request, json, time

API_KEY = "YOUR_API_KEY"
URL = "https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict"

def generate_image(prompt, name, out_dir):
    path = f"{out_dir}/{name}.txt"
    payload = {"instances":[{"prompt":prompt}],
               "parameters":{"sampleCount":1,"aspectRatio":"16:9","safetyFilterLevel":"block_few"}}
    req = urllib.request.Request(f"{URL}?key={API_KEY}",
        data=json.dumps(payload).encode(), headers={"Content-Type":"application/json"}, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=180) as r:
            b64 = json.loads(r.read())["predictions"][0]["bytesBase64Encoded"]
        with open(path,"w") as f: f.write(b64)
        print(f"OK {name}: {len(b64)} chars")
    except Exception as e:
        if "429" in str(e):
            print("Rate limit — waiting 30s")
            time.sleep(30)
            generate_image(prompt, name, out_dir)
        else: print(f"ERROR {name}: {e}")

# Call sequentially — never in threads (WinError 10065)
for name, prompt in slides:
    generate_image(prompt, name, OUT_DIR)
```

### Embed all slides into HTML
```python
import re, os

def embed_all(html_path, slides_dir, slide_ids):
    with open(html_path, 'r', encoding='utf-8') as f:
        html = f.read()
    for sid in slide_ids:
        txt = os.path.join(slides_dir, f'{sid}.txt')
        if not os.path.exists(txt): continue
        with open(txt, 'r') as f: b64 = f.read().strip()
        new_src = f'data:image/png;base64,{b64}'
        pattern = rf'(<div class="slide" id="{sid}"><img src=")[^"]*(")'
        html = re.sub(pattern, rf'\g<1>{new_src}\2', html)
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html)
```

### QA extraction
```python
import base64, os
def extract_previews(html_path, out_dir, slide_ids):
    os.makedirs(out_dir, exist_ok=True)
    with open(html_path,"r",encoding="utf-8") as f: html = f.read()
    for sid in slide_ids:
        start = html.find(f'<div class="slide" id="{sid}">')
        b64s = html.find('base64,', start) + 7
        b64e = html.find('"', b64s)
        with open(f"{out_dir}/{sid}.png","wb") as f:
            f.write(base64.b64decode(html[b64s:b64e]))
        print(f"  {sid}: OK")
```

---

## COMPLETED DECKS (reference)
| File | Topic | Color | Notes |
|------|-------|-------|-------|
| ml_presentation.html | Machine Learning | green | Factory S5 needed v8 for all-Spanish |
| cv_presentation.html | Computer Vision | yellow | S6 fan needed 2 attempts |
| agents_presentation.html | AI Agents | violet | Hex grid, constellation, collage all first-try |
| nonicatab_presentation.html | NonicaTab (Revit add-in) | electric blue | PIL composite for S4 with real Revit bg |

**Best first-try techniques:** movie poster, terminal, isometric stack, aerial city, asymmetric collage
**Needs retries:** fan/pie diagrams with numbered segments (always 1-2 attempts)
