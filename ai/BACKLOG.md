# Backlog

Ideas and tasks for Agents Office. The Planner keeps this ordered: top = most important.
Score: V = value, E = effort, R = risk; priority = V×2 − E − R (+2 for a bug the owner would notice).

Done: `ai/tasks/001-show-who-is-next.md` (passed), `ai/tasks/002-no-repeated-gets-line.md` (passed)
In progress: `ai/tasks/003-panels-stay-open.md` (Keep open panels open while the crew works, V2 E1 R2 = 1, bug +2 = 3)

- The note at the bottom tells you to run `npm run dashboard` and points to `dashboard/status.js`, neither of which exists in this project; the empty "Read its instructions" panel says the same (V1 E1 R1 = 0, bug +2 = 2)
- The "How one round works" line says the Checker can send work back to the Builder, but the Checker is parked and never runs (V1 E1 R1 = 0, bug +2 = 2)
- "Parked" helpers are greyed out with no plain explanation of what "parked" means (V2 E1 R1 = 2) (design)
- Cards show technical details a beginner can't read at a glance (file names like `planner.md`, "Brain: Opus", raw instructions) (V2 E1 R2 = 1) (design)
- Show what comes next when nobody is working (e.g. which helper starts the next round) (V2 E1 R2 = 1)
- "Up next" always names the helper after the working one, even when that helper won't run this round (e.g. the Designer for a task that needs no design) (V2 E2 R2 = 0)
- The page is still titled "Agent Crew Board" / "Your AI build crew" and says "Seven helpers" although two are parked, not "Agents Office" (V1 E1 R1 = 0)
- The relay track only highlights the helper that is working; finished or stuck helpers look the same as waiting ones (V1 E1 R1 = 0) (design)
- If the live status can't be loaded, the page silently keeps showing old status with no warning (V1 E1 R1 = 0)
- Make it look like an office (floor plan with desks, or employee badges): blocked, waiting on the owner's open question in VISION.md (V2 E3 R3 = -2) (design)
- Give an agent work from the page: blocked, waiting on the owner's open question in VISION.md
- Show past work for each agent (history): blocked, waiting on the owner's open question in VISION.md
