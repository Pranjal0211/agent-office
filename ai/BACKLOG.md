# Backlog

Ideas and tasks for Agents Office. The Planner keeps this ordered: top = most important.
Score: V = value, E = effort, R = risk; priority = V×2 − E − R (+2 for a bug the owner would notice).
No approved design system yet: the first item marked (design) that gets picked becomes "Create the design system".

Done: `ai/tasks/001-show-who-is-next.md` (passed), `ai/tasks/002-no-repeated-gets-line.md` (passed), `ai/tasks/003-panels-stay-open.md` (passed), `ai/tasks/004-true-round-explanation.md` (passed), `ai/tasks/005-explain-parked.md` (passed)
In progress: `ai/tasks/006-show-when-crew-waits-for-you.md` (Say so at the top when the crew is waiting for you, V2 E1 R2 = 1, bug +2 = 3)

- Show what comes next when nobody is working (e.g. "type /round: the Planner picks the next task first, unless a design is waiting for you") (V2 E1 R2 = 1)
- Cards show technical details a beginner can't read at a glance (file names like `planner.md`, "Brain: Opus", raw instructions) (V2 E1 R2 = 1) (design)
- "Up next" names the Designer while the Planner works, even for tasks that need no design, so the Builder actually goes next; the page has no way to know if the current task needs design, so this needs a new piece of live status first (V2 E3 R2 = -1, bug +2 = 1)
- The page is still titled "Agent Crew Board" / "Your AI build crew" and says "Seven helpers" although two are parked, not "Agents Office" (V1 E1 R1 = 0)
- Parked helpers look only faded; a clearer look for them (or keeping them off the relay track), including their explanation text being a bit faint on the greyed-out cards (noted by the Tester in 005) (V1 E1 R1 = 0) (design)
- The relay track only highlights the helper that is working; finished, stuck or waiting-for-you helpers look the same as idle ones (V1 E1 R1 = 0) (design)
- If the live status can't be loaded, the page silently keeps showing old status with no warning (V1 E1 R1 = 0)
- If a round crashes, a helper can stay "working" forever with no hint that the status is old (V1 E2 R1 = -1)
- Make it look like an office (floor plan with desks, or employee badges) (V2 E3 R3 = -2) (design): the look question in VISION.md goes to the Designer as directions; not blocked
- Give an agent work from the page: blocked, waiting on the owner's open question in VISION.md (behaviour, not look)
- Show past work for each agent (history): blocked, waiting on the owner's open question in VISION.md (behaviour, not look)
- After a round finishes, a helper whose last status was "waiting" still shows the "Waiting for you" pill although the top line says the round finished (found by Tester in 006)
- The waiting-for-you top line repeats the word "waiting" ("Designer is waiting for you on agent-office: Waiting for your decision on 006.") (found by Tester in 006)
