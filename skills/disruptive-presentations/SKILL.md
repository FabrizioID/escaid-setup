---
name: disruptive-presentations
description: End-to-end pipeline to create disruptive standalone HTML presentations using Imagen 4 plus optional Canva export. Use when asked to create any presentation, deck, or slideshow.
---

# Disruptive Presentations

Full prompt templates and HTML shell -> [references/full-reference.md](references/full-reference.md)

---

## PIPELINE (10 steps)

1. **Plan** - topic, brand color, slide count (default 11), assign one disruption technique per slide (no repeats)
2. **Disruption thesis** - define the one visual idea the slide must communicate before choosing layout
3. **Layout map** - decide headline zone, image zone, quiet zones, and reading path before prompting images
4. **HTML shell** - create with `go(0)`, `scale()`, keyboard nav, brand CSS variable `--g`
5. **Prompts** - one per slide, unique technique, max 4 text items, end with language lock
6. **Generate** - sequential only, sleep 30s on 429 rate limit
7. **Coordinate fit** - place HTML text only after reading the image as a grid and identifying safe, high-contrast zones
8. **QA** - extract previews and review all slides against checklist
9. **Fix** - refine prompt, re-place content, or regenerate any failures. After 3 image fails switch technique
10. **Canva export** - Canva MCP: create design -> upload PNGs -> Magic Layers -> editable

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

Dark background plus one accent plus white text by default.

Exception: if the strongest deck direction is clearly light, keep the whole system consistently light instead of forcing dark slides back in.

---

## DISRUPTION SEQUENCE - 3 questions before each slide
1. What **type** of content is this? (title / definition / hierarchy / process / taxonomy / deep-dive / applications / metrics / ecosystem / closing)
2. What **metaphor** makes the concept clearer, not just prettier?
3. Does this **contrast** structurally with the previous slide?

### Anti-repetition rules
- Never use the same layout twice in a row
- Alternate dark-heavy and lighter slides every 2-3 slides
- After a complex diagram, make the next slide simpler
- After 3 dark slides, make the next one light
- Title and closing must look nothing alike
- Do not repeat `title left / visual right` by habit

### 11-slide variety grid
| Slide | Purpose | Technique |
|-------|---------|-----------|
| S1 | Title | Movie Poster Hero |
| S2 | Definition | Full Bleed Photo Metaphor or Mixed Containment |
| S3 | Core concept | Circular Loop or Concentric Circles |
| S4 | Architecture | Isometric 3D Stack or Factory Pipeline |
| S5 | Components | Hexagonal Grid or Constellation Map |
| S6 | Deep dive | Hacker Terminal or 3D Object plus Annotations |
| S7 | Knowledge/memory | Surreal Library or Staggered Portrait Cards |
| S8 | Applications | Asymmetric Magazine Collage |
| S9 | Metrics/rankings | Giant Metrics plus Separator Lines or F1 Leaderboard |
| S10 | Ecosystem/future | Aerial City Network |
| S11 | Close | Pure Typography |

---

## 20 DISRUPTION TECHNIQUES (quick reference)
01. **Movie Poster Hero** - massive 3D glowing subject, text asymmetric lower-left, vertical text right edge
02. **Full Bleed Photo Metaphor** - real photo as background, 3 content zones matching photo depth and light
03. **Circular Loop Diagram** - glowing nodes on circle, clockwise arrows, subject at center
04. **Isometric 3D Stack** - floating translucent layers at 30 degrees, glowing edges, circuit texture background
05. **Hexagonal Grid** - 4 hexagons in staggered 2 by 2 arrangement, gradient fills, icon watermarks
06. **Hacker Terminal** - dark workstation photo background, rounded terminal panel, THOUGHT / ACTION / OBSERVATION lines
07. **Constellation Map** - space background, glowing star nodes, thin connecting lines, floating label cards
08. **Surreal Library** - infinite library photo, holographic floating cards at different angles and depths
09. **Asymmetric Magazine Collage** - 1 large, 2 small bottom-left, 1 tall right, never 4 equal blocks
10. **F1 Leaderboard** - race or stadium photo background, dark ranked panel with medal icons per row
11. **Aerial City Network** - night city aerial photo, brand-color nodes plus connection lines plus label cards
12. **Pure Typography** - ghost symbol background, massive 2-line heading, formula, pills
13. **Ocean Depth Hierarchy** - underwater photo, 3 horizontal depth zones as 3 hierarchy levels
14. **Prism Spectrum** - light-through-prism photo, 3 zones as 3 processing levels
15. **Factory or Studio Pipeline** - industrial or studio photo, 5 floating station cards, center card glows
16. **3D Object plus Callout Annotations** - dramatic 3D sculptural object, 4 labels connected by dotted lines
17. **Mixed Containment** - tension between rounded white cards, direct-on-background text, and photo bleed
18. **Staggered Portrait Cards** - tall vertical photo cards at different heights, tinted background per card
19. **Giant Metrics plus Separator Lines** - 3 rows: massive number plus thin line plus small description
20. **Dot Grid Texture** - hexagonal dot pattern at low opacity as depth layer under any technique

---

## DISRUPTION THESIS RULE
Before any prompt, write one sentence in this form:

`This slide is really communicating X through Y.`

Examples:
- `This slide is really communicating "AI transforms chaos into clarity" through a left-to-right translation scene.`
- `This slide is really communicating "same model, different outcome" through one source splitting into unequal results.`
- `This slide is really communicating "AI estimates, it does not know" through many possible options with one highlighted as most likely.`

If the final slide does not make that sentence feel inevitable, it is not ready.

---

## VISUAL METAPHOR PRINCIPLE
**The image must be the communication. Ask: "Could someone understand the topic from the image alone?"**

Good:
- Ocean = hierarchy
- Factory = pipeline
- ECG = model health
- F1 = benchmark race
- Night city = multi-agent network
- Prism = data layers
- Library = knowledge domain
- Translation scene = chaos to clarity
- Choice field = many options, one most likely

Bad:
- generic particles
- abstract orbs for everything
- random circuit boards
- floating geometric shapes with no semantic role

---

## IMAGE-FIRST, HTML-SECOND COMPOSITION
- First decide the visual story
- Then generate the image
- Then place HTML text

Rules:
- Do not drop text on top of an image just because there is room
- Use the image as a scene, not as wallpaper
- If the image already carries the concept, reduce HTML to the minimum needed
- If the image is weak, do not decorate it with more labels; regenerate or switch technique
- Support panels are for contrast and spacing, not for compensating a weak concept

---

## COORDINATE MAPPING RULES
Treat every image as a grid before placing HTML.

1. Find the real focal point
2. Find the high-contrast quiet zones
3. Find where visual mass is already heavy
4. Align labels to image geometry, not to instinct alone

Rules:
- Text should live in calm zones, not over noisy detail
- If a concept has a semantic center in the image, align the related text block to that axis
- If multiple layers start touching, spacing wins over decoration
- Remove one container before shrinking text
- If two consecutive slides feel like the same wireframe with different copy, redesign one of them

---

## GENERATED IMAGE HYGIENE
Imagen often produces text garbage. Treat that as a normal failure mode.

Rules:
- Never trust generated text inside images
- If text, letters, numbers, or UI noise appear in key areas, fail QA
- Best fix order:
  1. Regenerate with stronger "no text" constraints
  2. Reframe or crop if artifacts sit outside key zones
  3. Mask or wash contaminated areas only if the slide still reads cleanly
- Do not let visible garbage survive just because the composition is otherwise good

---

## REAL SOFTWARE BACKGROUND CRITERION

When a slide is about a specific tool or software:
- Use a real screenshot or a generated clean equivalent
- The actual working content must dominate the frame
- Never use a webpage, tutorial, or documentation screenshot as the main visual

When the slide is about a concept:
- Use a generated metaphor image instead of pretending there is one canonical software interface

Background checks:
1. Does the actual content dominate?
2. Does it look like the app in use, not a webpage?
3. Is browser chrome or tutorial clutter visible? Reject if yes.

---

## IMAGEN 4 KEY LIMITS
| Problem | Fix |
|---------|-----|
| 5 plus text items causes hallucination | Max 4 items per slide |
| Hex codes render as text | Use color names only |
| English bleeding in | End prompt with a language lock |
| Short prompt causes random composition | Write 100 to 150 word prompts |
| Rate limit 429 | Sleep 30 seconds and retry sequentially |
| WinError 10065 in threads | Use sequential generation only |
| 3D looks cartoonish | Add photorealistic render quality |
| Imagen inserts text in assets | Strengthen no-text constraints and expect QA failure |

---

## PROMPT ELEMENT ORDER
1. Base scene
2. Primary visual
3. Layout proportions and safe zones
4. Text content or intended HTML support zones
5. Brand color
6. Quality directive
7. Language lock as the last line

When prompting support backgrounds for typography:
- explicitly reserve the center or headline zone
- explicitly forbid words, letters, numbers, labels, and readable UI text

---

## QA CHECKLIST
1. Text correct? No garbled words, no asterisks
2. Numbers sequential? No duplicates
3. Layout matches prompt? Asymmetry is actually asymmetric
4. Brand color present where specified?
5. Visual metaphor supports the message?
6. No English where Spanish is expected?
7. Is this the strongest possible version?
8. Are generated-image text artifacts hidden or removed?
9. Are HTML text blocks placed in clean, high-contrast zones?
10. Are there collisions, cramped bands, or stacked containers fighting each other?
11. Does the slide feel like one idea, not a layout plus random additions?

Threshold:
- Fail on 1 to 6 or 8 to 10 -> fix or regenerate
- Fail on 7 or 11 -> judgment call
- 3 fails on the same slide -> switch technique

---

## CANVA MCP EXPORT
1. Run QA extraction and get PNG files
2. Canva MCP -> create 1280 by 720 design -> upload each PNG as a page
3. In Canva editor use Magic Layers for editable conversion

---

## CORE PYTHON PATTERNS

### Imagen 4 API call (sequential, no threading)
```python
import urllib.request, json, time

API_KEY = "YOUR_API_KEY"
URL = "https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict"

def generate_image(prompt, name, out_dir):
    path = f"{out_dir}/{name}.txt"
    payload = {
        "instances": [{"prompt": prompt}],
        "parameters": {
            "sampleCount": 1,
            "aspectRatio": "16:9",
            "safetyFilterLevel": "block_few",
        },
    }
    req = urllib.request.Request(
        f"{URL}?key={API_KEY}",
        data=json.dumps(payload).encode(),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=180) as r:
            b64 = json.loads(r.read())["predictions"][0]["bytesBase64Encoded"]
        with open(path, "w") as f:
            f.write(b64)
    except Exception as e:
        if "429" in str(e):
            time.sleep(30)
            generate_image(prompt, name, out_dir)
        else:
            print(f"ERROR {name}: {e}")
```

### Embed all slides into HTML
```python
import os
import re

def embed_all(html_path, slides_dir, slide_ids):
    with open(html_path, "r", encoding="utf-8") as f:
        html = f.read()
    for sid in slide_ids:
        txt = os.path.join(slides_dir, f"{sid}.txt")
        if not os.path.exists(txt):
            continue
        with open(txt, "r") as f:
            b64 = f.read().strip()
        new_src = f"data:image/png;base64,{b64}"
        pattern = rf'(<div class="slide" id="{sid}"><img src=")[^"]*(")'
        html = re.sub(pattern, rf"\g<1>{new_src}\2", html)
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html)
```

---

## COMPLETED DECKS (reference)
| File | Topic | Color | Notes |
|------|-------|-------|-------|
| ml_presentation.html | Machine Learning | green | Factory-style logic |
| cv_presentation.html | Computer Vision | yellow | Visual pipeline and comparison slides |
| agents_presentation.html | AI Agents | violet | Strong variety in maps, collage, and typography |
| nonicatab_presentation.html | Revit add-in | electric blue | Software-specific composition with real usage feel |

Best first-try techniques:
- movie poster
- terminal
- isometric stack
- aerial city
- asymmetric collage
- pure typography

High-risk techniques:
- numbered charts
- any image that relies on generated text being correct
- any slide where labels are placed before reading the image as a grid
