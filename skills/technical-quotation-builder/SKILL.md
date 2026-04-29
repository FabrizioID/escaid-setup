---
name: technical-quotation-builder
description: Build and refine technical quotations and commercial proposals with clear scope hierarchy, pricing units, proposal rows, communication sequence, support logic, and professional wording. Use for engineering, BIM, construction, software, consulting, or technical service quotes before inserting them into a document.
---

# Technical Quotation Builder

Use this skill to design the quotation logic before document editing.

This skill defines what the proposal should say, how it should be structured, and how the economic table should communicate value. If a live Google Doc or Docx must be edited, use `docx-mcp-document-editor` after the quotation logic is clear.

## Core Principle

Build the commercial logic first. Format later.

A quotation can fail even with correct prices if it confuses:

- proposal
- alternative
- deliverable
- activity or acapite
- item or partida
- pilot or validation case
- optional/additional scope

Never enter document editing until these levels are clear.

## Quotation Workflow

### 1. Define The Business Structure

Identify:

- client and project
- purpose of the quotation
- main offer
- alternatives, if any
- deliverables
- activities/acapites inside each deliverable
- additional items or pilot work
- exclusions and assumptions

Ask: "What is the row actually selling?"

Examples:

- If a row sells a complete service package, it is a proposal or deliverable.
- If a row describes a task inside that package, it is an activity/acapite.
- If a row is prior validation work or a limited sample, it is a pilot or additional partida.

### 2. Design The Communication Sequence

For formal quotations, use this default order unless the template says otherwise:

1. cover/reference/opening paragraph
2. economic table or executive commercial summary
3. technical-economic proposal heading
4. project scope
5. activities or work plan
6. deliverables
7. added value
8. payment/valuation structure
9. terms, assumptions, exclusions, validity
10. experience or supporting references

Preserve existing branding and table order if the document already has a validated commercial format.

### 3. Build The Economic Table

For each row, define:

- `CONCEPTO`: clear service description and scope boundaries
- `UND`: the valuation unit
- `TOTAL` or pricing field: fixed price, rate, or formula
- support logic: why this unit matches the scope

Use valuation units consistently:

- `TON` for rebar detailing/despiece when pricing follows processed steel tonnage
- `m2` for area-based estimating by ratios
- `GLB` for pilots, closed packages, or one-time fixed scope
- monthly/daily/resource formulas only in support sheets, unless the client-facing table needs them

Do not invent prices. If missing, state the valuation logic and required input.

### 4. Prevent Scope Mixing

Before finalizing text, verify:

- An activity is not written as an independent proposal unless the user requested alternatives.
- A deliverable with two acapites remains one deliverable, not two large offers.
- A pilot stays separate if it is a validation case or prior limited scope.
- The same work is not charged twice under different labels.
- Estimation by ratios is not embedded as the first bullet under detailed despiece if it is already its own acapite.

### 5. Pricing Support

Use support logic appropriate to the service:

- resource-based support: coordinator, detailer, monthly cost, days per month, productivity, multiplier/index
- market support: external benchmark rates, when current or user requests web validation
- production support: tonnage, m2, number of items, expected time, QA/review effort
- commercial support: pilot discount, package pricing, risk allowance, revision scope

Separate internal support from client-facing wording. The client-facing table should be simple unless the user asks for detailed backup.

### 6. Technical Wording

Use professional technical language:

- clear but not simplistic
- specific to the process and tools
- aligned with engineering/BIM vocabulary
- consistent across rows

For structural/BIM quotations, useful terms include:

- Tekla Structures
- structural information review
- rebar detailing/despiece
- quantity consolidation
- ratios such as kg/m2
- Excel deliverables
- traceability by element, package, or building
- integration to detailing software when applicable

Avoid generic marketing filler, duplicated bullets, and unsupported promises.

## QA Checklist

Before handing off to document editing or final response:

- Is the table hierarchy correct?
- Are proposal, deliverable, activity, pilot, and additional item separated?
- Does each row have the right unit?
- Does the pricing field avoid invented totals?
- Do bullets stay inside their proper scope?
- Does the opening paragraph match the final table?
- Does the payment section match the economic table?
- Are exclusions and assumptions consistent with the proposed scope?

## References

- Read `references/quotation-qa.md` for a stricter review checklist.
- Read `references/structural-bim-pricing.md` for structural/BIM pricing patterns.
