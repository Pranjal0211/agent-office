# 008 v2: The look of Agent Office (design system)

> **In short:** Only the badge wall (B) now, exactly as you approved it in v1, light mode only. Helpers with nothing to do are labelled "Free" (never "Waiting"), and their explanation no longer uses the word "waiting" either, so it can't be confused with "Waiting for you".

## Directions

### B: The badge wall
Each helper is an employee ID badge on a lanyard with a rubber-stamp status; flip a badge for details. "Today's shift" shows the order of work, parked helpers sit in an Away tray, and the pinned memo turns bright orange when you're needed. Unchanged from v1 apart from the idle wording below.
- Strengths: friendly and personal; the clearest card face; stamps are easy to tell apart.
- Trade-offs: the shift line and the badges are two separate places to look; more scrolling on a phone. Light only.

## What changed since the last version
- "Approve B": only direction B is kept; A (office floor) and C (lobby screen) are dropped.
- "Light/dark: No, as shown": stays light only, exactly as in v1. No dark version added.
- "Idle label: Yes, say \"Free\"": the idle stamp says **Free** everywhere (badges, shift line, Team lead when no round runs, badge kit). Its explanation changed from "Not needed yet: waiting for work" to "Nothing to do right now; ready for the next job", so the word "waiting" is only ever used for "Waiting for you".
- Nothing else changed: colors, fonts, spacing, badges, stamps, shift line, Away tray, memo and the state switcher are the same as v1.

## Follows / changes the design system
There is no approved design system yet; this version is the proposal for it (B from v1). Same rules as v1: each helper keeps its own color from `team.js`, the live-status logic is copied unchanged from `index.html`, works at 375px and 1280px with no sideways scrolling, visible focus ring, animations stop with reduced motion.

## Open questions for the owner
- Do you approve B as shown in v2 as the design system?
- Still open from v1 (not answered yet): the **"stuck" message on the top line** (today a stuck helper only shows on its card), and the Team lead showing **"Running a round"** while a round is open. Both are in this version as in v1; approving v2 approves them too, so say if you'd rather not.
- The example states (other than "Right now") use made-up "doing" lines for demonstration only; they are not real history.
