# Backlog

Ideas and tasks for Agents Office. The Planner keeps this ordered: top = most important.
Score: V = value, E = effort, R = risk, priority = V×2 − E − R.

In progress: `ai/tasks/001-show-who-is-up-next.md` (V3 E1 R1 = 4)

## To do
- The relay track doesn't show how far the round has got: finished stations look the same as ones still waiting (V2 E1 R1 = 2)
- "Parked" is unexplained; a beginner can't tell what it means or why those cards are greyed out (V2 E1 R1 = 2)
- The card of the agent that is working doesn't stand out from the others; only a small dot changes (V2 E1 R1 = 2)
- An open "What's missing" or "Read its instructions" section snaps shut every time the live status changes (V2 E1 R2 = 1)
- You can't tell if the live status is old, for example if a run crashed and an agent shows "Working" for hours (needs a time in `status.js`, which runs don't write yet) (V2 E2 R1 = 1)
- The footer tells you to run `npm run dashboard` and look in `dashboard/status.js`, which don't exist in this project; the header still says "ai-agents · crew board" (V1 E1 R1 = 0)

## Waiting on the owner (open questions in VISION.md)
- Make it look like an office: floor plan with desks, or employee badges (V2 E3 R3, blocked)
- Give an agent work from the page, or only watch (blocked)
- Show past work each agent did (history) (blocked)
