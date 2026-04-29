---
name: disruptive-presentations
description: Motor de generacion de slides disruptivas de alta calidad visual. Modo activo: FULL IMAGE con ChatGPT, para generar slides completas como imagen final con interpretacion semantica, decision de analogia, alternativas de diagramacion, prompt final y debug completo. Modo legacy disponible: HTML + Imagen 4 + Canva export. Usar cuando el usuario quiera crear o mejorar slides individuales, una presentacion completa, una clase visual, o depurar el razonamiento visual de una slide.
---

# Disruptive Presentations

Full legacy prompt templates and HTML shell -> [references/full-reference.md](references/full-reference.md)

---

## DEFAULT MODE: FULL IMAGE WITH CHATGPT

Use this mode unless the user explicitly asks for HTML, editable layout, Imagen 4, Canva export, or legacy mode.

Current goal: generate each slide as one finished 16:9 image. Do not build HTML in this phase. Do not manually place coordinates. The slide image must carry the concept through visual thesis, composition, metaphor, typography, spacing, and text integration.

Core rule:

`The image is not decoration. The image is part of the argument.`

Disruption rule:

`Disruption is not an extra visual effect. It must be implicit in the analogy and/or in the diagramming structure. If no analogy is selected, the layout itself must carry the disruption.`

Template rule:

`A template is a brand frame, not a creative cage. Use it to align background, logo, header, spacing, and colors; keep the disruptive visual idea alive inside the space the template defines.`

---

## INPUT CONTRACT

Accept direct user input or structured input from `presentation-orchestrator`.

Minimum fields:

```yaml
objective: what the slide must communicate
base_text: title, subtitle, concepts, numbers, or short copy
context: class, deck, audience situation, or topic
audience: learner, executive, client, technical team, sponsor, etc.
tone: technical | inspirational | reflective | energetic | executive | premium
brand:
  fonts: Inter, Ruberoid, Plus Jakarta Sans, or similar clean geometric sans
  colors: optional brand colors or accent guidance
  avoid: loud colors, clutter, generic tech decoration
template:
  provided: true/false
  must_preserve: logo, header, sidebars, lines, margins, background, footer
  free_area: where the disruptive scene can live
debug: true
```

If a field is missing, infer conservatively from context. Ask only when the missing information changes the visual decision materially, such as brand, audience, required text, or factual accuracy.

---

## TEMPLATE-AWARE DISRUPTION

Before generating, decide whether the slide has a template or not.

### No Template

Use full visual freedom. The analogy can become the whole world of the slide.

Examples:

- galaxy concept -> full-screen cosmic/orbital scene
- lighthouse concept -> full-bleed fog and light beam
- ocean depth concept -> entire slide becomes underwater hierarchy
- decision observatory -> whole slide becomes the room/scene

Rules:

- Let the metaphor dominate the background, depth, lighting, and reading path.
- Integrate the title and key text into the scene.
- Use cinematic or editorial composition when it clarifies the message.
- Preserve elegance and readability; do not turn freedom into clutter.

### Template Provided

Use the template as a brand frame. Preserve fixed brand elements and inject disruption into the free area.

What to preserve:

- logo placement
- header or footer system
- sidebars, lines, margins, and white space
- brand colors, fonts, and overall corporate mood

What to avoid:

- treating the template as a reason to downgrade into cards, grids, or safe corporate layout by default
- flattening a strong analogy into generic icons
- making the visual idea merely decorative

How to adapt:

- Identify the free content area first.
- Make the analogy inhabit that area as a contained scene, object, map, orbit, diagram, or visual system.
- Use phrasing such as: `Use the template as the exact visual foundation and brand frame, but do not let it flatten the concept.`
- If the no-template version would be full-screen, convert it into a contained version:
  - full-screen galaxy -> contained orbital system inside the white content area
  - full-bleed lighthouse -> contained beam crossing the content area
  - full ocean scene -> contained depth window or vertical cutaway
  - full cinematic room -> contained architectural panel or perspective viewport
- The template should align the disruption, not contain it into mediocrity.

Decision rule:

`No template = maximum scene freedom. Template = maximum concept intensity inside brand constraints.`

---

## FULL IMAGE PIPELINE

### 1. Semantic Interpretation

Before selecting an image or layout, classify the slide:

| Content type | Use when | Primary visual strategy |
|---|---|---|
| conceptual | abstract idea, principle, mental model | metaphor, spatial analogy, iconic scene |
| sequential | process, pipeline, before/after over time | path, flow, stages, depth progression |
| comparative | two or more elements in tension | split world, contrast field, balance, mirror |
| enumerative | components, attributes, categories | radial, constellation, 3D cluster, non-flat grid |
| metric | numbers, rankings, evidence | giant metrics, editorial data, restrained visual field |
| systemic | many relationships or forces | network, orbit, map, architecture, control room |
| narrative | opening, closing, persuasion, emotional turn | cinematic thesis image, editorial hero, symbolic scene |

Also define:

- textual prompt nucleus: the exact concept, phrase, tension, or relation that must not be lost
- communication thesis: what the viewer must understand or feel
- original-theme anchors: 3 to 5 words or ideas that any analogy must stay close to
- disruption opportunity: what conventional slide pattern must be broken and why
- template mode: no template / template provided
- template constraints: what must stay fixed and what area can host the disruptive scene
- depth: low, medium, high
- emotional intent: clarity, urgency, awe, trust, tension, ambition, relief
- text load: minimal, moderate, risky

Write the thesis as:

`This slide is really communicating "[message]" through "[visual mechanism]".`

If this sentence is weak, do not generate yet.

---

### 2. Analogy Gate

Decide whether to use visual analogy.

The analogy generator starts from the textual prompt nucleus. Generate analogies by similarity, not by spectacle. The winning analogy is the one most semantically and structurally attached to the original theme while still creating a disruptive visual reading.

Use analogy when:

- the concept is abstract, deep, or difficult to feel through text
- the audience needs intuition before detail
- the metaphor makes the idea more concrete, memorable, or emotionally legible
- the content is conceptual, narrative, systemic, or a high-level transition

Avoid analogy when:

- the slide requires factual precision or software specificity
- the content is already visually concrete
- the metaphor would add ambiguity
- the deck needs an executive data slide, not poetic interpretation

If analogy is useful, generate at least 3 options:

```text
Analogia A: [name]
- Visual: what the image would show
- Similarity to original prompt: high/medium/low
- Structural match: what relation it preserves (depth, sequence, tension, hierarchy, system, etc.)
- Disruption move: what makes the slide non-obvious without breaking meaning
- Why it communicates: semantic fit
- Risk: possible confusion, cliche, or overdrama

Analogia B: ...
Analogia C: ...
Selected: [name] because it has the strongest similarity to the original prompt and the cleanest disruptive visual path.
Moonshot preserved: [bolder option worth testing later]
```

If no analogy is selected, state:

`No analogy selected because [reason]. Disruption moves to diagramming. Visual strategy: [diagram/editorial/data/system].`

Selection priority:

1. semantic similarity to the textual prompt
2. structural similarity to the concept relation
3. clarity for the audience
4. ability to become a clean diagram/layout
5. disruptive potential
6. aesthetic potential

Do not choose the most spectacular analogy if it drifts away from the original topic.

---

### 3. Layout Exploration

Generate at least 2 layout alternatives before choosing.

The layout must be derived from the selected analogy. If there is no analogy, the layout must become the disruptive mechanism by itself.

If a template is provided, create two mental versions before selecting:

1. no-template ideal: the strongest possible version of the analogy with full freedom
2. template adaptation: the same disruptive idea contained inside the template's free area

Choose the template adaptation only after preserving the core visual force of the no-template ideal.

Examples:

- depth concept -> layered descent, vertical depth zones, nested thresholds
- sequence -> path, stations, tunnel, timeline in perspective, process arena
- comparison -> split world, mirror tension, forked path, before/after field
- enumeration -> roulette, radial orbit, circular modules, constellation, non-flat grid
- system -> nodes, control map, orbital dependencies, architecture stack
- hierarchy -> levels, strata, tower, stack, nested frames
- metric -> giant number field, editorial data monument, scale contrast

Useful layout families:

- full-bleed cinematic metaphor with quiet text zone
- ocean/depth hierarchy
- radial or orbital system
- perspective 3D progression
- asymmetric editorial composition
- split-world comparison
- giant metric field
- constellation map
- architectural stack
- cinematic object plus callouts
- pure typography with symbolic background

Avoid:

- flat bullet list
- generic left-title/right-image by habit
- four equal cards unless the content genuinely needs parity
- decorative particles, abstract orbs, circuit boards, or geometric clutter with no semantic role
- more visual elements than the message can support

Score each layout quickly:

| Criterion | Question |
|---|---|
| clarity | Is the idea understood within 3 seconds? |
| semantic fit | Does the composition embody the message? |
| elegance | Is there enough negative space and restraint? |
| disruption | Does it escape a conventional slide pattern? |
| disruption source | Does disruption come from analogy, diagramming, or both? |
| template fit | If there is a template, does the disruptive idea live inside it without being weakened? |
| text safety | Can text be readable without crowding? |
| risk | What could fail in image generation? |

Select one winner and one backup.

---

### 4. Prompt Assembly

Build the final image prompt in this order:

1. Format: finished 16:9 premium presentation slide, single image
2. Communication goal
3. Visual thesis
4. Similarity logic: why the chosen analogy or diagram is close to the original prompt
5. Disruption source: analogy, diagramming, or both
6. Template mode:
   - no template: let the scene/metaphor dominate the whole slide
   - template provided: preserve fixed template elements and place the disruptive visual system inside the free area
7. Base scene or metaphor
8. Main composition and reading path
9. Text to include, max 4 text elements
10. Text integration: where it lives and why that zone is calm
11. Visual style: Apple-like, elegant, minimal, editorial, high-end
12. Typography: clean geometric sans similar to Inter / Plus Jakarta Sans / Ruberoid
13. Brand color guidance using color names, not hex codes
14. Constraints: no clutter, no generated text artifacts, no watermarks, no stock-photo feel, no random UI, no unreadable text
15. Language lock: all visible text must be in the requested language

Prompt target: usually 120-220 words. Be specific enough to control composition, but not so overloaded that the image model collapses into clutter.

Text rule:

- Prefer 1 title + 1 subtitle + up to 2 short labels.
- If the base text has more than 4 items, compress before prompting or ask whether to split into multiple slides.
- Never rely on the image model to render dense paragraphs, tables, small labels, or long lists.

---

### 5. Generate Image

Use ChatGPT image generation when available. Generate one finished 16:9 slide image.

If generation is not available in the current environment, output the full debug block plus the final prompt ready to paste into the image generator. Do not silently switch to HTML.

Regeneration loop:

1. If text is wrong, garbled, misspelled, or cluttered: regenerate with stricter text constraints.
2. If metaphor is beautiful but unclear: change analogy or simplify scene.
3. If layout is conventional: change layout family, not just style words.
4. After 3 failed attempts: switch analogy or use the backup layout.

---

### 6. Debug Output

Always return the reasoning when `debug: true` or when the user is testing the skill.

```text
=== DEBUG SLIDE [N] ===

INPUT SUMMARY
- Objective:
- Base text:
- Context:
- Audience:
- Brand/style:

INTERPRETATION
- Content type:
- Textual prompt nucleus:
- Original-theme anchors:
- Conceptual depth:
- Disruption opportunity:
- Template mode:
- Template constraints / free area:
- Emotional intent:
- Text load:
- Communication thesis:

ANALOGY DECISION
- Use analogy: yes/no
- Why:
- Options considered:
  A. [name] / similarity: / structural match: / disruption move: / risk:
  B. [name] / similarity: / structural match: / disruption move: / risk:
  C. [name] / similarity: / structural match: / disruption move: / risk:
- Selected:
- Moonshot preserved:

LAYOUT DECISION
- Disruption source: analogy / diagramming / both
- No-template ideal:
- Template adaptation:
- Options considered:
  1. [layout] / derived from: / text integration: / disruption move:
  2. [layout] / derived from: / text integration: / disruption move:
- Selected:
- Backup:

FINAL IMAGE PROMPT
[complete prompt]

QA RESULT
- Concept visible without text:
- Text legible:
- Max 4 text elements:
- No artifacts:
- Elegant/non-saturated:
- Image adds meaning:

OUTPUT
- Image generated or prompt ready:
```

For normal production requests, summarize the debug briefly unless the user asks for full trace.

---

## FULL IMAGE STYLE RULES

- Use Apple-like restraint: confident negative space, precise hierarchy, premium materials, quiet color.
- Keep the slide emotionally clear: calm, sharp, intentional.
- Use visual analogies only when they clarify the message.
- Let the composition do cognitive work: depth, contrast, scale, alignment, direction, proximity, and light should communicate relationships.
- Prefer real-world, cinematic, editorial, or high-end 3D scenes over generic "AI tech" decoration.
- Integrate text into the scene naturally, but keep it readable and sparse.
- Use brand accents as signals, not as flood fill.
- When a slide is for executives or non-technical audiences, translate technology into outcomes: speed, control, productivity, risk, cost, opportunity, decision quality.

Hard rejects:

- flat bullet-list slide
- crowded infographic
- neon chaos
- generic particles/orbs/circuit backgrounds
- tiny unreadable labels
- random fake UI
- generated text artifacts in important areas
- stock-photo background with unrelated text slapped on top
- metaphor that is prettier than it is meaningful

---

## FULL IMAGE QA CHECKLIST

Fail and revise if any critical item fails:

1. The image communicates the concept before reading the text.
2. The selected analogy or visual strategy fits the message.
3. The analogy, if used, is the closest useful similarity to the original prompt, not just a pretty metaphor.
4. If no analogy is used, the diagramming itself creates the disruption.
5. If a template is used, the template aligns the disruption without weakening it.
6. If no template is used, the visual world fully supports the analogy.
7. Text is readable, short, and correct.
8. There are no generated text artifacts, watermarks, fake logos, or malformed UI.
9. The slide feels like one coherent idea.
10. The layout is not a conventional bullet slide.
11. The visual is elegant and not saturated.
12. The image adds meaning rather than decoration.

After QA, state the next action:

- accept
- regenerate with prompt revision
- switch analogy
- switch layout
- split into multiple slides
- use legacy HTML mode for layout precision

---

## LEGACY MODE: HTML + IMAGEN 4

Use only when the user explicitly asks for HTML, editable exported deck, Canva handoff, tighter layout control, or when full-image generation repeatedly fails due to text or diagram precision.

## LEGACY PIPELINE (10 steps)

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
