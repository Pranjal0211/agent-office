# 008 v1: The look of Agent Office (design system)

> **In short:** Three different ways Agent Office could look: a real office floor with desks (A), a wall of employee badges (B), or a dark lobby screen with a train-style line (C). Each one is clickable, uses your real seven helpers, has a "Try a state" switcher at the top (right now, working + up next, waiting for you, stuck, round finished, nobody working), and ends with a kit showing its colors, fonts, spacing and parts.

## Directions

### A: The office floor
A top-down floor plan of a small office. The six relay helpers sit at desks in work order along a path on the floor; the Team lead has a corner office; you have "Your desk" whose phone rings when someone needs you. Click a desk to open that helper's "personnel file".
- Strengths: the most literally "your company"; the path *is* the relay track, so order and status live in one picture; parked helpers are easy to grasp (empty desk, "Away" sign, path goes past).
- Trade-offs: the most custom drawing to build and keep tidy; on a phone the floor becomes a vertical corridor, so it feels less like a floor plan there. Light only.
- Fonts: Fraunces (names, signs), Atkinson Hyperlegible (reading text, made for easy reading), DM Mono (room labels).

### B: The badge wall
Each helper is an employee ID badge on a lanyard, with a rubber-stamp status ("WORKING", "NEEDS YOU", "DONE"…). Flip a badge to see the back (gets, hands over, allowed to, experience, still learning). "Today's shift" clips mini tags on a line in work order; parked helpers lie in an "Away tray" below. The top line is a pinned memo that turns bright orange when you're needed.
- Strengths: friendly and personal; each helper feels like a person with an ID; the card face is the clearest of the three; stamps are very easy to tell apart.
- Trade-offs: the relay track and the badges are two separate places to look; badges take more scrolling on a phone. Light only.
- Fonts: Archivo Expanded (names, headings), Archivo (reading text), IBM Plex Mono (stamps).

### C: The lobby screen
A dark display like the screen in an office lobby: a wide announcement bar on top ("Now", "Your turn", "Stopped"), the work shown as a train line with numbered stops ("Work is here", "Next stop", "Line stopped", "Not stopping" for parked), and a staff board you open row by row.
- Strengths: fastest to scan; best when you glance at it while a round runs; the most compact on a phone; the line makes progress (green = work has passed) very clear.
- Trade-offs: least "office-like" and less warm; dark only (it would need a light version if you want one).
- Fonts: Big Shoulders Display (names, signs), Public Sans (reading text), Martian Mono (signals).

## How each answers the card's 7 questions
| | A: Office floor | B: Badge wall | C: Lobby screen |
|---|---|---|---|
| 1. How office-like | Literal floor plan with desks and rooms | Employee badges on lanyards | Lobby display / transit line |
| 2. Card face | Desk + name + status + one-line job + what they're doing; the rest in a "personnel file" on click | Badge front: name, stamp, one-line job, what they're doing; back: gets/gives, allowed to, experience, thinks with, still learning | Board row: name, one-line job, status, now; details open in the row |
| 3. Status | Icon + word + color on a chip, *and* the desk changes (lamp on, check, warning sign, empty chair…) | Rubber stamps: icon + word + ink color; the two urgent ones are filled | Signals: icon + word + color; the two urgent ones are filled |
| 4. Relay track | The floor path: solid where work has passed, dashed ahead, dotted past empty desks; every desk shows its state | Shift tags on a line, each with its stamp; "Has the work" on the working one | Train line: green where work has passed, "Work is here", "Next stop", "Line stopped", "Not stopping" |
| 5. Parked | Stay in place: empty desk, "Away · parked" sign, path goes past | Leave the wall: lie in the "Away tray"; empty clips on the shift line | Shown as "Not stopping" stops; listed under "Not in service" on the board |
| 6. Waiting for you | Front-desk note turns orange + your desk's phone rings | Memo turns bright orange, gently nudges; badge gets a "NEEDS YOU" stamp | Announcement bar turns yellow: "YOUR TURN" with a ringing bell |
| 7. Header | "Agent Office · Floor 1" plaque | Big "AGENT OFFICE" staff-board wordmark | "Agent Office · Lobby screen" with a clock |

Everywhere: file names (`planner.md`) and raw instructions are moved behind a click and labelled "job description"; "Brain: Opus (strongest)" becomes "Thinks with: Opus, the most careful thinker"; "Depth" becomes "Experience: Usable (2 of 4)"; tool chips become "Allowed to".

## Follows / changes the design system
There is no approved design system yet; this task creates it. All three keep each helper's own color from `team.js`, keep the same live-status logic as `index.html` (copied unchanged into each prototype), work at 375px and 1280px with no sideways scrolling, show a visible focus ring, and stop animations when reduced motion is on.

## Open questions for the owner
- Which direction (A, B or C), or a mix (for example "A's floor with B's stamps")?
- The idle state is shown as **"Free"** instead of today's "Waiting", so it can't be confused with "Waiting for you". OK?
- All three add a **"stuck" message to the top line** (today a stuck helper only shows on its card, and the top line says "the Team lead is between helpers"). This changes the top line's meaning slightly, so it needs your yes.
- The Team lead shows **"Running a round"** while a round is open (worked out from data the page already has). OK?
- A and B are light only and C is dark only; today's page follows your computer's light/dark setting. Should the chosen look have both?
- The example states (other than "Right now") use made-up "doing" lines for demonstration only; they are not real history.
