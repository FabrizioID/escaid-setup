# Flyer Prompt And QA

Use this reference before generating and after receiving a flyer image.

## Prompt Minimum

Every final prompt must define:

- format and aspect ratio;
- brand and audience;
- flyer pattern;
- commercial mechanism;
- exact visible text;
- CTA;
- layout zones;
- hierarchy;
- visual hook;
- style and brand constraints;
- negative constraints.

## Prompt Skeleton

```text
Create a [format/aspect ratio] premium static visual piece for [brand/audience].

Goal: [single action or perception change].
Flyer pattern: [pattern from commercial-flyer-patterns.md].
Commercial mechanism: [mechanism].

Visible text:
- Hook: "[exact hook]"
- Support: "[exact support copy]"
- CTA: "[exact CTA]"

Layout:
- Zone 1: [position, size, role]
- Zone 2: [position, size, role]
- Zone 3: [position, size, role]

Visual hook:
[object/scene/contrast/proof element that captures attention before reading].

Brand/style:
[palette, mood, typography cues, logo placement if provided].

Avoid:
mini-document layout, crowded icon grid, hidden CTA, duplicate text, fake charts, generic AI glow, illegible small text.
```

## Pre-Generation QA

Approve the prompt only if:

- the hook can be understood in 2 seconds;
- the piece has one CTA or one clear next action;
- the pattern matches the objective;
- the layout has a clear scan order;
- support copy is short enough for the format;
- brand constraints are present;
- no factual assets are invented.

## Post-Generation QA

Check:

- Hook visibility: is the main hook dominant?
- Emotion: does the first impression match the intended mechanism?
- Understanding: can the viewer explain the offer or idea quickly?
- CTA: is the next action visible and unambiguous?
- Layout: is the scan path obvious?
- Density: is it too crowded or too empty?
- Brand: does it feel consistent?
- Text: is generated text readable and correct?
- Duplicity: does any visual/text repeat without adding value?

Verdict:

- `APROBADA`
- `ITERAR`
- `REGENERAR`

Regenerate immediately if text is wrong, unreadable, the CTA disappears, the visual contradicts the offer, or the piece looks like a generic template.
