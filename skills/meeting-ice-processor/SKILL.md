---
name: meeting-ice-processor
description: Process raw meeting transcripts, call notes, audio transcriptions, or messy meeting summaries into a traceable ICE-style executive record. Use when the user wants a meeting title, date, macro summary, key ideas or insights, decisions, agreements, pending actions, responsible owners, open loops, loose points without delegation, follow-up questions, or an execution plan from a conversation transcript.
---

# Meeting ICE Processor

## Purpose

Convert messy meeting input into a useful record for memory and execution. Preserve both strategic thinking and operational traceability: what was discussed, what mattered, what was agreed, what remains pending, who owns each item, and what must be clarified next.

ICE means:

- **I - Ideas and Insights:** relevant ideas, criteria, opportunities, concerns, hypotheses, strategic pivots.
- **C - Commitments and Closures:** decisions, agreements, commitments, validations, rejected options.
- **E - Execution:** tasks, owners, dates, dependencies, risks, next steps, open loops.

## Workflow

1. **Identify context**
   - Extract or infer meeting date, participants, organizations, project, and meeting type.
   - If the transcript has no title, create one that captures the real topic, not a generic label.
   - If the date is missing, mark it as "No indicada" unless the user provided surrounding context.

2. **Read for meaning before structure**
   - Separate filler, repetition, greetings, and unfinished phrases from actual content.
   - Preserve important informal ideas even if they were not formal agreements.
   - Treat "tenemos que", "hay que", "quedamos", "yo veo", "podria", "revisar", "mandame", "lo valido", and similar phrases as possible action or decision signals.

3. **Extract the macro layer**
   - Summarize what the meeting was really about in 1-3 tight paragraphs.
   - Name the main themes and why they mattered.
   - Capture shifts in direction, criteria, risks, opportunities, or priorities.

4. **Build the ICE breakdown**
   - Ideas and insights: include strategic observations, proposed approaches, valuable context, and important questions.
   - Commitments and closures: distinguish confirmed decisions from tentative agreements.
   - Execution: convert agreed work into traceable action items.
   - If the meeting covers multiple fronts, first split the content by macrosection/project/workstream, then run ICE inside each one.

5. **Detect responsibility quality**
   - Assign responsible owners only when the transcript supports it.
   - If a task has no owner, mark owner as "Sin responsable definido".
   - If an owner is implied but uncertain, use "Probable: [name]" and add a clarification note.
   - If an item is discussed but not actionable yet, place it under loose points, not tasks.

6. **Create the follow-up layer**
   - List unresolved questions, missing inputs, decisions pending validation, and risks.
   - End with a short next-meeting agenda based on unresolved items.

## Output Rules

- Write in the user's language unless they ask otherwise.
- Be concise but complete; avoid transcript-style chronology.
- Do not invent dates, participants, deadlines, or owners.
- Prefer "No indicado" or "Sin definir" over guessing.
- Keep decisions separate from tasks.
- Include confidence markers when extraction is uncertain.
- When a meeting contains sensitive or messy statements, clean wording without changing intent.

## Recommended Output

Use the detailed format in [references/output-template.md](references/output-template.md) when the user asks for a complete meeting record, plan trazable, acta, resumen ejecutivo, acuerdos, or pending actions.

## Notion And WhatsApp Handoff

When the user asks to document the meeting in Notion, upload it to a project, create a meeting note, produce a WhatsApp message, or prepare a meeting update for a group chat, use this skill first to process the transcript, then continue with `documentar-notion`.

Do not duplicate Notion-specific behavior here. This skill's job is to produce a clean handoff payload that `documentar-notion` can register in `REUNIONES`, sync with `ACTIVIDADES` when applicable, and convert into the validated WhatsApp format.

Important distinction:

- **Notion payload:** preserve the real substance of the meeting. Keep the simple fields `Objetivo`, `Observaciones`, and `Acuerdos / Pendientes`, but fill them with enough detail to remain faithful to the conversation. Do not compress away strategic reasoning, product definitions, important debates, or unresolved tensions.
- **WhatsApp draft:** compress for readability. This can be shorter, grouped, and capped to the validated WhatsApp format.

For Notion, prefer fewer fields with richer content over many fields with shallow content. `Observaciones` should include macro themes, context, reasoning, product/strategy definitions, and important debates. `Acuerdos / Pendientes` should include both firm commitments and unresolved actions that need ownership.

When the meeting touches several initiatives, add a **Macrosecciones / frentes** layer before or inside ICE. Do not merge unrelated fronts into one flat list. Typical macrosections may be:

- Ecosistema / estrategia general
- AECODE Fase 2
- AECODE Fase 3 / plataforma
- GEN+ / consultoria / agentes
- TessIA / investigacion
- Summit / SAMI / eventos
- Marketing / webinars / adquisicion
- Certificaciones / ISOs / respaldo institucional
- n8n / agentes / automatizaciones
- Producto especifico, cliente o proyecto externo

For each macrosection, capture:

- **Que se converso**
- **Ideas / decisiones clave**
- **Acuerdos / pendientes**
- **Responsables**
- **Puntos sueltos**
- **Riesgos / ambiguedades**
- **Preguntas de seguimiento**
- **Plan trazable del frente**

When macrosections exist, do not place all agreements, loose points, risks, and follow-up questions only in global sections. Keep a global synthesis if useful, but the primary organization must be by front/project so ownership remains clear.

Front-count rule:

- **1 front:** use the normal full meeting structure once. Do not force a macrosection wrapper unless it improves clarity.
- **2-3 fronts:** make each front a mini-record with the full structure. This is the common case.
- **4+ fronts:** keep the same front-first structure, but add a short global synthesis and watch context length. If the output is getting long, stop after a coherent batch, tell the user what is covered, and ask to continue before processing the next batch.

For WhatsApp/Notion handoff, preserve the same front-first logic:

```text
*REUNIONES ([DD/MM/AAAA]) - [Titulo o frente]*
*Objetivo:*
...
*Observaciones:*
...
*Acuerdos / Pendientes:*
...
```

When the user asks specifically for a WhatsApp/WSP message after a meeting has been processed or documented, output the compact WhatsApp draft in this exact block structure. Do not use free-form headings such as `Resumen`, `Punto principal`, `Criterios`, `Acuerdos`, or `Pendientes por definir` outside the validated structure.
The first line must always be `*REUNIONES ([DD/MM/AAAA]) - [Titulo o frente]*`; do not replace it with `FRENTE:`. If the date is missing, use `Sin fecha`.

Do not invert the structure into one global `Observaciones` section subdivided by fronts and one global `Acuerdos` section subdivided by fronts, unless the user explicitly asks for that view. The default is **front -> sections**, not **section -> fronts**.

For each macrosection, preserve the traditional meeting structure as a mini-record. Do not replace ICE with prose. Use this order:

1. **Ficha del frente**
2. **Resumen del frente**
3. **Temas clave**
4. **ICE**
   - `I - Ideas e insights`
   - `C - Compromisos y cierres`
   - `E - Ejecucion pendiente`
5. **Acuerdos / pendientes trazables**
6. **Puntos sueltos**
7. **Riesgos / ambiguedades**
8. **Preguntas de seguimiento**
9. **Plan trazable**

Use tables when the content is operational or comparable:

- `Temas clave`
- `Acuerdos / pendientes trazables`
- `Puntos sueltos`
- `Riesgos / ambiguedades`
- `Plan trazable`

Use bullets when the content is interpretive:

- `Resumen del frente`
- `Ideas e insights`
- short contextual notes

Add this section at the end of the response when a handoff is likely:

```markdown
## Payload Para Documentar Notion

**Proyecto sugerido:** [proyecto o "No indicado"]
**Titulo de reunion:** [titulo]
**Fecha:** [fecha o "No indicada"]
**Objetivo:** [objetivo principal]

**Observaciones:**
- [observacion macro 1]
- [observacion macro 2]
- [observacion macro 3]

**Acuerdos / Pendientes:**
- [acuerdo o pendiente con responsable si existe]
- [acuerdo o pendiente con responsable si existe]

**Actividades trazables:**
- [actividad] | Responsable: [responsable o Sin responsable definido] | Fecha: [fecha o Sin fecha definida] | Estado: [estado]

**Puntos por aclarar:**
- [pregunta o punto suelto]

**Instruccion sugerida:** usar `documentar-notion` para registrar esta reunion y generar mensaje WhatsApp.
```

If the user only asks for a WhatsApp note and not for Notion writing, still provide the handoff payload plus a compact WhatsApp draft. If the user asks to actually write into Notion, process first, then invoke `documentar-notion` with the payload instead of asking the user to restate the meeting.

For quick requests, return only:

1. Title and meeting context
2. Macro summary
3. ICE breakdown
4. Agreements and pending actions table
5. Loose points and next questions

## Action Item Fields

Every execution item should include:

- **ID:** short stable code, e.g. `A1`, `A2`.
- **Activity:** clear verb-led task.
- **Responsible:** person or role; use "Sin responsable definido" when missing.
- **Deadline:** date, relative urgency, or "Sin fecha definida".
- **Status:** pending, in progress, blocked, done, tentative, or awaiting validation.
- **Dependency:** what must happen first, if any.
- **Evidence:** brief phrase or paraphrased source from the transcript that supports the item.

## Quality Pass

Before finalizing:

- Check that each task has an owner status, even if owner is missing.
- Check that all agreements are either confirmed or marked tentative.
- Check that strategic ideas are not lost just because they are not tasks.
- Check that open loops are visible and not hidden inside the summary.
- If the transcript is too thin to support a strong conclusion, say so directly.
