# Backlog

Ideas and tasks for Agent Office. The Planner keeps this ordered: top = most important.
Score: V = value, E = effort, R = risk; priority = V×2 − E − R (+2 for a bug the owner would notice).
The design system is approved (008, v2 option B: the badge wall, light only). Items marked (design) get a small design that follows it.

Done: `ai/tasks/001-show-who-is-next.md` (passed), `ai/tasks/002-no-repeated-gets-line.md` (passed), `ai/tasks/003-panels-stay-open.md` (passed), `ai/tasks/004-true-round-explanation.md` (passed), `ai/tasks/005-explain-parked.md` (passed), `ai/tasks/006-show-when-crew-waits-for-you.md` (passed), `ai/tasks/007-no-stale-waiting-after-round.md` (passed), `ai/tasks/008-design-system.md` (passed, approved v2 option B), `ai/tasks/009-waiting-helper-is-not-up-next.md` (passed)
In progress: `ai/tasks/010-header-matches-approved-design.md` (The header and tab still use the old "crew board" wording and say "Seven helpers"; match the approved design, V2 E1 R1 = 2, bug +2 = 4)

- While another helper is working, the top line doesn't say that the Designer is waiting for you; you only see it on the Designer's card (V2 E1 R1 = 2)
- Show what comes next when nobody is working (e.g. "type /round: the Planner picks the next task first, unless a design is waiting for you") (V2 E1 R2 = 1)
- "Up next" names the Designer while the Planner works, even for tasks that need no design, so the Builder actually goes next. 009 fixed the case where the Designer is waiting for you; the general case needs a new piece of live status first (V2 E3 R2 = -1, bug +2 = 1)
- During a round that is still running, the Designer keeps saying "Waiting for you" after you've answered, until the round ends. The round steps in agent-crew never mark the Designer done after recording your reply, so this needs an agent-crew change first (V2 E1 R1 = 2, bug +2 = 4, but not doable from this project)
- The waiting-for-you top line repeats the word "waiting" ("Designer is waiting for you on agent-office: Waiting for your decision on 008.") (found by Tester in 006) (V1 E1 R1 = 0)
- If the live status can't be loaded, the page silently keeps showing old status with no warning (V1 E1 R1 = 0)
- The Team lead badge shows its status twice: the "Running a round" stamp and a "Working on: Passing work along the shift" line (found by Tester in 008; both are in the approved design) (V1 E1 R1 = 0) (design)
- If a round crashes, a helper can stay "working" forever with no hint that the status is old (V1 E2 R1 = -1)
- Give an agent work from the page: waiting on the owner (`ai/QUESTIONS.md` question 1; behaviour, not look)
- Show past work for each agent (history): waiting on the owner (`ai/QUESTIONS.md` question 2; behaviour, not look)

Removed (resolved by the approved badge-wall design, now on the page): cards showing technical details (badges show plain words, "Thinks with", details behind a flip); parked helpers only faded (now in the Away tray); the relay track only highlighting the working helper (each shift tag now shows its own stamp); no dark mode (the owner chose light only: "Light/dark: No, as shown").
