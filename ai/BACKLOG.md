# Backlog

Ideas and tasks for Agents Office. The Planner keeps this ordered: top = most important.
Score: V = value, E = effort, R = risk; priority = V×2 − E − R (+2 for a bug the owner would notice).

In progress: `ai/tasks/001-show-who-is-next.md` (Show who is up next, V3 E1 R2 = 3)

- Open "What's missing" / "Read its instructions" panels snap shut whenever the live status changes during a run (V2 E1 R2 = 1, bug +2 = 3)
- The note at the bottom tells you to run `npm run dashboard` and points to `dashboard/status.js`, neither of which exists in this project (V1 E1 R1 = 0, bug +2 = 2)
- "Parked" helpers are greyed out with no plain explanation of what "parked" means (V2 E1 R1 = 2)
- Cards show technical details a beginner can't read at a glance (file names like `planner.md`, "Brain: Opus", raw instructions) (V2 E1 R2 = 1)
- The page is still titled "Agent Crew Board" / "Your AI build crew" and says "Seven helpers" even though four are parked, not "Agents Office" (V1 E1 R1 = 0)
- The relay track only highlights the helper that is working; finished or stuck helpers look the same as waiting ones (V1 E1 R1 = 0)
- If the live status can't be loaded, the page silently keeps showing old status with no warning (V1 E1 R1 = 0)
- Show what comes next when nobody is working (e.g. which helper starts the next round) (V2 E1 R2 = 1)
- Make it look like an office (floor plan with desks, or employee badges): blocked, waiting on the owner's open question in VISION.md (V2 E3 R3 = -2)
- Give an agent work from the page: blocked, waiting on the owner's open question in VISION.md
- Show past work for each agent (history): blocked, waiting on the owner's open question in VISION.md
