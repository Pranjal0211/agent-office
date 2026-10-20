# Backlog

Ideas and tasks for Agents Office. The Planner keeps this ordered: top = most important.
Score: V = value, E = effort, R = risk; priority = V×2 − E − R (+2 for a bug the owner would notice).
No approved design system yet: the first item marked (design) that gets picked becomes "Create the design system".

Done: `ai/tasks/001-show-who-is-next.md` (passed), `ai/tasks/002-no-repeated-gets-line.md` (passed), `ai/tasks/003-panels-stay-open.md` (passed), `ai/tasks/004-true-round-explanation.md` (passed), `ai/tasks/005-explain-parked.md` (passed), `ai/tasks/006-show-when-crew-waits-for-you.md` (passed)
In progress: `ai/tasks/007-no-stale-waiting-after-round.md` (Stop saying "Waiting for you" after the round has ended, V2 E1 R1 = 2, bug +2 = 4)

- Show what comes next when nobody is working (e.g. "type /round: the Planner picks the next task first, unless a design is waiting for you") (V2 E1 R2 = 1)
- Cards show technical details a beginner can't read at a glance (file names like `planner.md`, "Brain: Opus", raw instructions) (V2 E1 R2 = 1) (design)
- "Up next" names the Designer while the Planner works, even for tasks that need no design, so the Builder actually goes next. The page has no way to know if the current task needs design, so this needs a new piece of live status first (V2 E3 R2 = -1, bug +2 = 1)
- During a round that is still running, the Designer keeps saying "Waiting for you" after you've answered, until the round ends. The round steps in agent-crew never mark the Designer done after recording your reply, so this needs an agent-crew change first (V2 E1 R1 = 2, bug +2 = 4, but not doable from this project)
- The waiting-for-you top line repeats the word "waiting" ("Designer is waiting for you on agent-office: Waiting for your decision on 006.") (found by Tester in 006) (V1 E1 R1 = 0)
- The page is still titled "Agent Crew Board" / "Your AI build crew" and says "Seven helpers" although two are parked, not "Agents Office" (V1 E1 R1 = 0)
- Parked helpers look only faded. They need a clearer look (or to be left off the relay track), and their explanation text is a bit faint on the greyed-out cards (noted by the Tester in 005) (V1 E1 R1 = 0) (design)
- The relay track only highlights the helper that is working; finished, stuck or waiting-for-you helpers look the same as idle ones (V1 E1 R1 = 0) (design)
- If the live status can't be loaded, the page silently keeps showing old status with no warning (V1 E1 R1 = 0)
- If a round crashes, a helper can stay "working" forever with no hint that the status is old (V1 E2 R1 = -1)
- Make it look like an office (floor plan with desks, or employee badges) (V2 E3 R3 = -2) (design): the look question in VISION.md goes to the Designer as directions; not blocked
- Give an agent work from the page: blocked, waiting on the owner's open question in VISION.md (behaviour, not look)
- Show past work for each agent (history): blocked, waiting on the owner's open question in VISION.md (behaviour, not look)
