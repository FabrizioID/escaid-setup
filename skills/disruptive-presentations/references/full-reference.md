# Disruptive Presentations — Full Reference

## HTML SHELL TEMPLATE

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<title>Presentation</title>
<style>
:root{ --g: #30d158; } /* change per topic */
*{margin:0;padding:0;box-sizing:border-box;}
html,body{width:100%;height:100%;background:#000;display:flex;align-items:center;justify-content:center;overflow:hidden;}
#stage{position:relative;width:1280px;height:720px;overflow:hidden;background:#000;}
.slide{position:absolute;inset:0;opacity:0;transition:opacity .45s ease;pointer-events:none;}
.slide.on{opacity:1;pointer-events:auto;}
#nav{position:fixed;bottom:18px;left:50%;transform:translateX(-50%);display:flex;gap:7px;z-index:100;}
.dot{width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,.3);cursor:pointer;transition:background .2s,transform .2s;}
.dot.on{background:var(--g);transform:scale(1.3);}
.arr{position:fixed;top:50%;transform:translateY(-50%);background:rgba(0,0,0,.45);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.15);color:var(--g);font-size:1.1rem;width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:100;transition:background .2s;user-select:none;}
.arr:hover{background:rgba(255,255,255,.08);}
#prev{left:14px;}#next{right:14px;}
</style>
</head>
<body>
<div id="prev" class="arr">&#8592;</div>
<div id="next" class="arr">&#8594;</div>
<div id="stage">
  <div class="slide" id="s1"></div>
  <div class="slide" id="s2"></div>
  <div class="slide" id="s3"></div>
  <div class="slide" id="s4"></div>
  <div class="slide" id="s5"></div>
  <div class="slide" id="s6"></div>
  <div class="slide" id="s7"></div>
  <div class="slide" id="s8"></div>
  <div class="slide" id="s9"></div>
  <div class="slide" id="s10"></div>
  <div class="slide" id="s11"></div>
</div><!-- /stage -->
<div id="nav"></div>
<script>
var slides=document.querySelectorAll('.slide');
var nav=document.getElementById('nav');
var cur=0;
slides.forEach(function(s,i){var d=document.createElement('div');d.className='dot';d.onclick=function(){go(i);};nav.appendChild(d);});
function go(n){slides[cur].classList.remove('on');nav.children[cur].classList.remove('on');cur=(n+slides.length)%slides.length;slides[cur].classList.add('on');nav.children[cur].classList.add('on');}
document.getElementById('prev').onclick=function(){go(cur-1);};
document.getElementById('next').onclick=function(){go(cur+1);};
document.addEventListener('keydown',function(e){if(e.key==='ArrowRight'||e.key===' ')go(cur+1);if(e.key==='ArrowLeft')go(cur-1);});
function scale(){var sc=Math.min(window.innerWidth/1280,window.innerHeight/720);document.getElementById('stage').style.transform='scale('+sc+')';}
window.addEventListener('resize',scale);scale();
go(0);
</script>
</body>
</html>
```

---

## TECHNIQUE PROMPT TEMPLATES

### 01. MOVIE POSTER HERO
```
Dramatic sci-fi movie poster style presentation slide, 16:9 widescreen.
Full bleed background: deep space black with [BRAND COLOR] nebula clouds, cinematic volumetric lighting.
Center: a massive glowing [SUBJECT — robotic face / eye / brain / crystal] made of [BRAND COLOR] light and circuit traces, emerging from darkness, facing forward.
Text layout DIAGONAL and ASYMMETRIC — NOT a standard left-right split:
Lower left corner: small monospace caption "// [TOPIC] · 2026". Below: ultra bold white heading "[LINE 1]" then "[LINE 2 IN BRAND COLOR]". Below: small gray description. Three small dark pill badges: "[STAT 1]" "[STAT 2]" "[STAT 3]".
Upper right edge: very subtle faint white text "[THEME WORDS]" rotated 90 degrees vertically.
Thin bright [BRAND COLOR] horizontal line at very bottom. Cinematic, dramatic.
ALL text in Spanish, NO ENGLISH words.
```

### 02. FULL BLEED PHOTO METAPHOR
```
Cinematic layered presentation slide, 16:9 widescreen.
Background: a dramatic photograph of [OCEAN UNDERWATER / PRISM LIGHT / FACTORY FLOOR / FOREST DEPTH]. The photo naturally creates three distinct depth zones from top to bottom.
Top zone (bright area): bold white text "[LEVEL 1 NAME]" with [ICON]. Small description "[TEXT]". Small [BRAND COLOR] chips: "[TAG1]" "[TAG2]" "[TAG3]".
Middle zone (mid area): bold white text "[LEVEL 2 NAME]" with [ICON]. Description "[TEXT]". Chips: "[TAG1]" "[TAG2]" "[TAG3]".
Bottom zone (dark area): bold bright [BRAND COLOR] text "[LEVEL 3 NAME]" with [ICON]. Description "[TEXT]". Chips: "[TAG1]" "[TAG2]" "[TAG3]".
Small [BRAND COLOR] pill badge top-left "[LABEL]". Breadcrumb bottom-left "[L1] > [L2] > [L3]".
ALL text in Spanish, NO ENGLISH words.
```

### 03. CIRCULAR LOOP DIAGRAM
```
Cinematic presentation slide, 16:9 widescreen, dark atmospheric background with soft circular [BRAND COLOR] glow at center.
CENTER: A large luminous closed circular loop made of light. Three glowing [BRAND COLOR] nodes at top, right, and bottom-left positions. Top node: bold white "[ACTION 1]" with [ICON]. Right node: bold white "[ACTION 2]" with [ICON]. Bottom-left node: bold white "[ACTION 3]" with [ICON]. Thin glowing [BRAND COLOR] arrows along the circle clockwise. Inside circle center: bold white large "[SUBJECT]" with small pulsing dot.
LEFT side outside circle: italic white quote "[QUOTE TEXT]". Small gray "[AUTHOR — YEAR]". Small [BRAND COLOR] pill badge "[LABEL]".
RIGHT side: three dark rounded cards with [BRAND COLOR] left border: "[CARD 1 TEXT]" / "[CARD 2 TEXT]" / "[CARD 3 TEXT]".
ALL text in Spanish, NO ENGLISH words.
```

### 04. ISOMETRIC 3D STACK
```
Dramatic isometric 3D diagram presentation slide, 16:9 widescreen.
Background: very dark charcoal with subtle [BRAND COLOR] circuit board texture faintly visible.
CENTER: Large isometric 3D illustration of [SYSTEM] shown as 4 stacked floating layers, each a translucent dark rectangle with glowing [BRAND COLOR] edges:
Top layer glowing bright [BRAND COLOR]: labeled "[LAYER 1]" — [ICON]
Second layer glowing medium: labeled "[LAYER 2]" — [ICON]
Third layer glowing lighter: labeled "[LAYER 3]" — [ICON]
Bottom layer glowing faint: labeled "[LAYER 4]" — [ICON]
Thin dotted vertical lines connecting layers. Small arrows showing data flowing up and down.
LEFT side: bold white heading "[TITLE]". Small white paragraph "[DESCRIPTION]". Four small [BRAND COLOR] bullets matching each layer.
ALL text in Spanish, NO ENGLISH words.
```

### 05. HEXAGONAL GRID
```
Modern hexagonal grid presentation slide, 16:9 widescreen.
Background: very dark near-black with subtle diagonal texture of faint lines.
TOP: thin header bar, small [BRAND COLOR] badge "[LABEL]", bold dark heading "[TITLE]".
MAIN AREA: honeycomb of 4 large hexagons in 2×2 staggered arrangement.
Top-left hex: [BRAND COLOR] gradient fill, bold white "[TYPE 1]", small white "[DESCRIPTION 1]", chip "[TAG]"
Top-right hex: dark charcoal with [BRAND COLOR] border glow, bold white "[TYPE 2]", small white "[DESCRIPTION 2]", chip "[TAG]"
Bottom-left hex: medium dark with [BRAND COLOR] edge, bold white "[TYPE 3]", small white "[DESCRIPTION 3]", chip "[TAG]"
Bottom-right hex: deep [BRAND COLOR] fill, bold white "[TYPE 4]", small white "[DESCRIPTION 4]", chip "[TAG]"
Each hex has a large faint icon watermark inside. Premium geometric design.
ALL text in Spanish, NO ENGLISH words.
```

### 06. HACKER TERMINAL
```
Dramatic cinematic presentation slide, 16:9 widescreen.
Background: a real photograph of multiple large monitors in a dark room showing code and data streams, moody atmospheric developer workstation, high-end dramatic lighting, [BRAND COLOR] tinted glow.
CENTER: large dark translucent terminal panel with rounded corners and [BRAND COLOR] glow border. Inside showing [PROCESS] as sequential terminal lines:
Line 1 in [BRAND COLOR]: "[STEP 1 LABEL]: [TEXT]"
Line 2 in white: "[STEP 2 LABEL]: [TEXT]"
Line 3 in gray: "[STEP 3 LABEL]: [TEXT]"
Line 4 in [BRAND COLOR]: "[STEP 4 LABEL]: [TEXT]"
Line 5 in bright white: "[STEP 5 LABEL]: [TEXT]"
Blinking cursor at end. Top of panel: small [BRAND COLOR] badge "[PROCESS NAME]" and small monospace "[STATUS]".
Bottom left: small white badge "[LABEL]" tiny text "[DESCRIPTION]".
ALL text in Spanish, NO ENGLISH words.
```

### 07. CONSTELLATION MAP
```
Abstract constellation map presentation slide, 16:9 widescreen.
Background: deep space black with faint milky way texture of tiny white dots.
MAIN VISUAL: constellation diagram — 5 bright [BRAND COLOR] glowing star nodes at varied positions, connected by thin [BRAND COLOR] lines. Each star different size. Small relationship labels on connecting lines: "[REL 1]" "[REL 2]" "[REL 3]".
Each star node has a dark rounded label card:
Largest node center-right: "[ITEM 1] — [DESCRIPTION 1]"
Upper left: "[ITEM 2] — [DESCRIPTION 2]"
Lower left: "[ITEM 3] — [DESCRIPTION 3]"
Upper right: "[ITEM 4] — [DESCRIPTION 4]"
Bottom right small: "[ITEM 5] — [DESCRIPTION 5]"
Small [BRAND COLOR] pill badge top-left "[LABEL]". Bold white heading top-right "[TITLE]".
ALL text in Spanish, NO ENGLISH words.
```

### 08. SURREAL LIBRARY
```
Surreal editorial presentation slide, 16:9 widescreen.
Background: a dramatic photorealistic surreal image of an infinite library — endless bookshelves, deep perspective tunnel, lit by warm [BRAND COLOR] atmospheric light, fog near floor.
LEFT holographic panel (dark translucent, [BRAND COLOR] border): bold white "[TITLE]". Small text "[DESCRIPTION]".
THREE floating holographic cards at DIFFERENT heights and slight different angles (not aligned):
Top card tilted slightly: "[MEMORY TYPE 1] — [DESCRIPTION]"
Middle card straight, larger: "[MEMORY TYPE 2] — [DESCRIPTION]"
Bottom card tilted other direction: "[MEMORY TYPE 3] — [DESCRIPTION]"
Each card has [BRAND COLOR] glowing left edge. Cards float in the library space at different depths.
ALL text in Spanish, NO ENGLISH words.
```

### 09. ASYMMETRIC MAGAZINE COLLAGE
```
Asymmetric editorial magazine collage presentation slide, 16:9 widescreen.
Layout is NOT four equal quadrants. Exact layout:
— Large photo: top-left area, occupies 55% width × 65% height
— Small photo left: bottom-left, 27% width × 35% height
— Small photo right of it: bottom, 27% width × 35% height
— Tall vertical photo: full right side, 45% width × 100% height
Large photo: real dramatic [SCENE 1 PHOTO], [BRAND COLOR] tinted. Bold white overlay "[APP 1]". Small gray "[DESCRIPTION 1]".
Small photo left: real [SCENE 2 PHOTO]. Text "[APP 2]" tiny "[DESC 2]".
Small photo right: real [SCENE 3 PHOTO]. Text "[APP 3]" tiny "[DESC 3]".
Right tall photo: real dramatic [SCENE 4 PHOTO], [BRAND COLOR] tinted. Bold white "[APP 4]". Small "[DESCRIPTION 4]".
Small dark center badge where photos meet: bold white "[ACRONYM]" on [BRAND COLOR] background.
ALL text in Spanish, NO ENGLISH words.
```

### 10. F1 LEADERBOARD
```
High-energy competitive leaderboard presentation slide, 16:9 widescreen.
Background: dramatic wide angle photograph of [FORMULA ONE RACE START / STADIUM LIGHTS / SPORTS ARENA], photorealistic, smoke and atmosphere.
CENTER-RIGHT: large dark translucent panel with [BRAND COLOR] glow border — styled as a race leaderboard:
Header: bold [BRAND COLOR] text "[BENCHMARK NAME]" small monospace "[METRICS LIST]"
Row 1 gold medal: "01 [LEADER]" bold white, small gray "[SCORE 1]"
Row 2 silver: "02 [SECOND]" bold white, small gray "[SCORE 2]"
Row 3 bronze: "03 [THIRD]" bold white, small gray "[SCORE 3]"
Row 4: "04 [FOURTH]" bold white, small gray "[NOTE]"
Row 5 faded: "05 [FIFTH]" bold white, small gray "[NOTE]"
Footer: small [BRAND COLOR] text "[FOOTNOTE]"
ALL text in Spanish, NO ENGLISH words.
```

### 11. AERIAL CITY NETWORK
```
Dramatic aerial night city presentation slide, 16:9 widescreen.
Background: stunning aerial night photograph of [TOKYO/NYC/DUBAI] — thousands of lights, glowing highways, skyscrapers, bird's eye view.
OVERLAID: multiple [BRAND COLOR] pulsing dot nodes at different city positions. Thin [BRAND COLOR] connection lines between nodes, some straight some curved, forming a network topology. Lines pulse with light.
Key nodes with dark label cards:
Central large node: "[NODE 1] — [FUNCTION 1]"
Cluster of 3 smaller nodes: "[NODE 2]" "[NODE 3]" "[NODE 4]"
Isolated far corner node: "[NODE 5] — [FUNCTION 5]"
TOP LEFT dark panel overlay: small [BRAND COLOR] badge "[LABEL]", bold white "[TITLE LINE 1]" then "[TITLE LINE 2 IN BRAND COLOR]". Small text "[DESCRIPTION]".
ALL text in Spanish, NO ENGLISH words.
```

### 12. PURE TYPOGRAPHY
```
Minimalist typographic closing presentation slide, 16:9 widescreen.
Background: pure deep space black with very faint [GHOST SYMBOL: ∞ / Σ / © / eye] rendered in thin elegant white lines, partially transparent, serving as ghost background art.
CENTERED text layout over the background:
Small [BRAND COLOR] monospace caption top-center "-> [TOPIC]".
Massive ultra-bold white heading two lines: "[LINE 1 IN WHITE]" then "[LINE 2 IN BRAND COLOR]". Below smaller: "[LINE 3 IN GRAY]".
Thin short [BRAND COLOR] line below as separator.
Small monospace formula: "[FORMULA 1]  ·  [FORMULA 2]".
Three minimal pill badges: small dots + "[CONCEPT 1]" "[CONCEPT 2]" "[CONCEPT 3]".
Thin bright [BRAND COLOR] line at very bottom spanning full width.
NO decorative elements — only type, the ghost symbol, and the lines.
ALL text in Spanish, NO ENGLISH words.
```

### 19. GIANT METRICS + SEPARATOR LINES
```
Clean metrics presentation slide, 16:9 widescreen, dark near-black background.
LEFT 60%: Three horizontal rows separated by thin gray lines:
Row 1: massive bold [BRAND COLOR] number "[METRIC 1]", small gray label "[LABEL 1]", small white description "[DESC 1]"
Row 2: massive bold white number "[METRIC 2]", small gray label "[LABEL 2]", small white description "[DESC 2]"
Row 3: massive bold white number "[METRIC 3]", small gray label "[LABEL 3]", small white description "[DESC 3]"
RIGHT 40%: a dramatic 3D [SCULPTURAL OBJECT — coil / wave / crystal / sphere] in [BRAND COLOR] tones, rendered photorealistic, providing visual balance.
TOP LEFT: bold white "[TITLE]" small [BRAND COLOR] badge "[LABEL]".
ALL text in Spanish, NO ENGLISH words.
```

---

## ANNOTATED PROMPT EXAMPLE

```
Prompt: "Ciclo de Aprendizaje del Modelo" — Technique: CIRCULAR LOOP

Dark charcoal background, almost black.
← [BASE SCENE FIRST: sets stage, prevents Imagen filling with noise]

A perfect circle of four glowing 3D spheres, evenly spaced at 12, 3, 6, and 9 o'clock positions.
← [EXACT GEOMETRY: clock positions = unambiguous, prevents default layout]

Each sphere glows with bright apple green light, pulsing rim effect.
← [COLOR AS NAME, not hex. "pulsing" = cinematic detail = better render]

Curved arrows connect the spheres clockwise, following the circle path.
← [FLOW DIRECTION explicit: clockwise prevents left-to-right default]

Sphere labels (4 items — within safe limit):
  Top: "DATOS" | Right: "ENTRENA" | Bottom: "EVALUA" | Left: "DESPLIEGA"
← [MAX 4 ITEMS. Short labels only.]

At the center: small glowing neural network icon, apple green, minimal.
← [FILLS EMPTY CENTER, adds meaning — the model is the subject of the cycle]

Slide title "CICLO DE APRENDIZAJE" bold white sans-serif, top-left corner.
← [EXPLICIT POSITION: prevents centering or floating]

Photorealistic render quality, dramatic lighting.
← [QUALITY DIRECTIVE before language lock]

ALL text in Spanish, NO ENGLISH words.
← [LANGUAGE LOCK: always last line, highest weight]
```
