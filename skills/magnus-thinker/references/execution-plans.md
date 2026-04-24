# Execution Plans Protocol

Use this reference when the user asks for an execution plan, operating plan, area plan, launch plan, event plan, checklist, Gantt, day-by-day plan, or "al milimetro" breakdown.

## Core Lesson

An execution plan is not a strategy summary. It must tell a real team what to do, when to do it, who owns it, what output proves completion, what dependencies can block it, and what happens during live operation.

When the user says a plan still feels general, assume the missing layer is operational granularity, not more concept.

## Required Shape

Build the deliverable in this order unless the user asks otherwise:

1. Mandate of the area
   - What this area owns.
   - What this area does not own.
   - Why the area is critical to the whole system.

2. Goals and minimum targets
   - Quantitative goals when possible.
   - Minimum acceptable target.
   - Recommended target.
   - Assumption behind the number.

3. Before / during / after frame
   - Before: setup, assets, dependencies, approvals, launch.
   - During: live operation, roles, escalation, checklists, moment-by-moment control.
   - After: reporting, follow-up, content reuse, learning loop.

4. Macro routes
   - 5-8 routes maximum.
   - Each route must have objective, gate, owner role, output, and risk.

5. Detailed action plan
   - For the next 2-3 weeks, go day by day when dates matter.
   - After the high-detail window, move to weekly gates.
   - Use activities that can be checked off, not abstract intentions.

6. Gantt or time map
   - Show parallel workstreams.
   - Make dependencies visible.
   - Highlight gates and critical dates.

7. Checklists by route
   - Use grouped checklists.
   - Keep each checkbox as a concrete action.
   - Include inputs, execution, validation, and handoff.

8. Inter-area dependencies and restrictions
   - What this area needs from other areas.
   - What this area gives to other areas.
   - Minimum notice needed.
   - Consequence if the input does not arrive.

9. Live-operation protocol
   - Objective of the area during the live event or launch.
   - Roles needed.
   - Moment-by-moment actions.
   - Decisions the area can take alone.
   - Decisions it must escalate.
   - Incidents and Plan B.

10. Metrics and review cadence
   - Daily metrics for intense periods.
   - Weekly metrics for longer periods.
   - Gate review questions.

## Area-Specific Rule

Never copy the same "during" plan across areas. Preserve each area's objective.

Examples:

- Marketing during an event: capture proof, publish, moderate, drive traffic, generate leads, support sponsors and post-event conversion.
- Academico during an event: protect session quality, control speakers/moderators/time, preserve learning, manage agenda changes, capture academic takeaways.
- Logistica during an event: move people, solve physical constraints, coordinate venue, reduce friction, protect safety and timing.
- Sponsors during an event: activate promised benefits, route traffic, capture leads, ensure sponsor satisfaction.

## Granularity Rules

- If the deadline is near, increase detail.
- If the team is small, make the plan reachable and automated where possible.
- If the work depends on other areas, include request dates and fallback options.
- If a number drives the plan, expose the assumption behind it.
- If the user asks for "al milimetro", include daily tasks, owner role, output, and gate.
- If the user asks for a visual deliverable, create both document source and HTML visualizer when useful.

## Magnus Questions For Execution Plans

Run these internally before producing the plan:

- What would make the plan fail even if everyone is busy?
- What hidden metric changes the target number?
- What must be true before the team can launch?
- What can be done tomorrow without waiting for perfect information?
- Which dependencies need explicit notice dates?
- Which activity creates the most leverage with the least team load?
- What must happen during the live moment so the public never sees the internal problem?
- What must be captured after execution so the project becomes smarter next time?

## Output Quality Bar

A plan is not ready if:

- It only lists routes without tasks.
- It has tasks but no dates.
- It has dates but no owner role.
- It has owner role but no output.
- It has strategy but no live-operation protocol.
- It ignores dependencies with other areas.
- It cannot be converted into a checklist or project board.

