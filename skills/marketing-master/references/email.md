# Email

Use this reference for email strategy, campaign structure, and automated sequences.

## Goal

Move leads or customers toward one action through sequenced communication.

For final HTML, Gmail/client QA, Apps Script or Sheet-driven sending, hand off to `email-html-marketing`.

## Minimum Inputs

- Offer
- Audience
- Trigger
- Funnel stage
- Desired action
- List source
- Timing constraints
- Source of truth for status: Sheet, CRM, Notion, n8n staticData or email platform

## Sequence Logic

- Identify whether the sequence is:
  nurture,
  launch,
  onboarding,
  abandoned intent,
  webinar follow-up,
  reactivation,
  retention,
  upsell.
- Define one action goal for the sequence.
- Define entry/exit criteria so people do not receive irrelevant emails after they convert, reply or unsubscribe.
- Give each email a distinct job:
  context,
  proof,
  objection handling,
  urgency,
  reminder,
  next step.

## For Each Email

Specify:

- trigger
- send timing
- subject angle
- email goal
- message angle
- CTA
- success metric
- exit/update action: tag, status, owner, next sequence or stop condition

## Common Sequence Patterns

- Lead magnet nurture
- Booked call sequence
- Product launch
- Webinar reminder and replay
- Trial onboarding
- Customer activation
- Reactivation

## Guardrails

- Do not repeat the same argument in every email.
- Match urgency to a real deadline.
- Sequence copy should escalate intentionally, not randomly.
- Tie email timing to the sales cycle and channel context.
- Do not automate sends until fields, consent, status logic and suppression rules are clear.
