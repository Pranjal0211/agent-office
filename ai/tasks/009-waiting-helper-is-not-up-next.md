# 009: Don't call a helper "Up next" while it is waiting for you

Status: built
Needs design: no
Big change: no

> **In short:** When the Designer is waiting for your decision and another helper is working, the Designer's card will keep saying "Waiting for you" instead of "Up next". The page will name the helper that really gets the work next (for example the Builder) as "Up next", both on its card and in the line at the top.
> **Why:** Right now the page tells you two wrong things at once: the Designer seems about to start work when it's actually waiting on you, and the helper that really goes next isn't named.

## Goal
A helper that is waiting for the owner during an open round is never shown as "Up next"; the next helper that can actually take work is shown instead.

## Why now
VISION.md "Must have": "You can see what each agent is doing right now, and what it will do next" and "Understandable at a glance by a beginner". Fact from agent-crew (`.claude/skills/round/SKILL.md`, section 2c): while any card is `awaiting approval`, the Team lead runs the Planner in "non-visual only" mode, so the Planner's card never goes to the Designer; the Designer's next work only comes from the owner's answer. Today `nextUp()` just takes the helper after the working one in the relay, so with the Planner working and the Designer waiting for the owner, the Designer's card pill switches from "Waiting for you" to "Up next" and the top line says "Next up: Designer". This is the first useful slice of the backlog item "Up next names the Designer while the Planner works". It needs no new live data and is logic only, so it survives the 008 redesign. Score: V2 E1 R1 = 2, bug +2 = 4.

## Done when
- [ ] In a scratch copy of the page whose `status.js` has an open run (`startedAt`, no `finishedAt`) with `planner: { state: "working", doing: "Picking the next task" }` and `designer: { state: "waiting", doing: "Waiting for your decision on 008" }`: the Designer card's pill says "Waiting for you" and its grey box says "Waiting for your decision on 008". The Builder card's pill says "Up next". The top line reads "Planner is working on <project>. Next up: Builder."
- [ ] Same open run, but with no `designer` entry at all: the Designer card says "Up next" and the top line says "Next up: Designer." (unchanged from today; a helper with no entry is not skipped).
- [ ] Same as the first case but the run has a `finishedAt` and a helper is still marked working: the Designer is no longer "waiting for you" (as after 007), so it is shown as "Up next" as today. Only a helper that is waiting for you in an open round is skipped.
- [ ] Several skips in a row work: open run with `planner` working and both `designer` and `builder` set to `waiting`: both keep "Waiting for you", the Tester card says "Up next", and the top line says "Next up: Tester." Parked helpers are still skipped as before: with only `tester` working, no card says "Up next" (the Checker is parked) and the top line has no "Next up" part. No console errors.
- [ ] At 375px and 1280px the first case has no sideways scrolling and no console errors.
- [ ] Nothing that worked before is broken: no-run, working, between-helpers, waiting-for-you (nobody working), finished-run and parked cases look as before. An open panel stays open when `status.js` changes.

## Not in this task
- Knowing in general whether the current task needs design (the rest of the "Up next names the Designer" backlog item). That needs new live status from agent-crew.
- Mentioning in the top line that the Designer is waiting for you while another helper works (separate backlog item).
- Any new look for the relay track or the pills (008 decides that).
- Editing `status.js`, `agents.generated.js` or `team.js`.

## Files likely touched
- `index.html`: `nextUp()` also skips helpers for which `waitingForYou(file)` is true, the same way it skips parked ones (e.g. extend the filter used after the working helper). `renderCards()` and `renderNow()` already use `nextUp()`, so the card pill and the top line follow.

## Notes for the Builder
- Existing helpers: `canTakeWork(file)` (not parked), `waitingForYou(file)` (explicit `waiting` entry and the round isn't over), `nextUp()`. Reuse them; don't duplicate the checks.
- `state()` returns `'waiting'` for helpers with no entry too. Only an explicit `waiting` entry (`askedWaiting`) in an open round should be skipped, which is exactly what `waitingForYou()` already checks.
- Known limit, leave as is: agent-crew never marks the Designer done after recording your answer, so in a rare case (you approved at the start of a round and the Planner then picks a new design task) the page would name the Builder instead of the Designer. That case was already wrong in a different way; it's covered by the backlog items that need agent-crew changes.
- `status.js` is written live by the crew and is git-ignored. Don't edit it and don't rely on what it says now. Test every case in a scratch copy with your own `status.js`.
- Keep escaping as it is (`esc()` / `textContent`).

## Builder notes

> **In short:** When the Designer is waiting for your decision while another helper works, its card now keeps saying "Waiting for you", and the helper that really gets the work next (for example the Builder) is shown as "Up next" on its card and in the top line.

**Changed**
- `index.html`: `nextUp()` now also skips helpers for which `waitingForYou()` is true (explicit `waiting` entry in an unfinished round), alongside the existing parked skip. Comment updated. Card pill and top line follow because they already use `nextUp()`.

**How to see it**
Make a scratch copy of `index.html`, `team.js`, `agents.generated.js` with your own `status.js` (never the live one):
- Open run + `planner` working + `designer` waiting "Waiting for your decision on 008" → Designer pill "Waiting for you" with that grey box, Builder pill "Up next", top line "Planner is working on agent-office. Next up: Builder."
- Same without a `designer` entry → Designer "Up next", "Next up: Designer."
- Same as first but run has `finishedAt` → Designer "Up next", "Next up: Designer."
- Open run, `planner` working, `designer` and `builder` waiting → both "Waiting for you", Tester "Up next", "Next up: Tester."
- Only `tester` working → no "Up next" anywhere, no "Next up" part.

**Self-check**
- [x] Case 1 (Designer waiting, Planner working): checked with Playwright reading every card pill, grey box and the top line; desktop screenshot looked at.
- [x] Case 2 (no designer entry): Designer "Up next", "Next up: Designer."
- [x] Case 3 (finished run): Designer "Up next", "Next up: Designer."
- [x] Several skips + parked: Tester "Up next" / "Next up: Tester."; with only tester working no "Up next" and no "Next up". No console errors.
- [x] 375px and 1280px for case 1: `check-page.mjs` reports overflowPx 0 and no errors at both widths.
- [x] Nothing broken: no-run, between-helpers (open run, planner done), waiting-for-you with nobody working, finished run with stale waiting, parked cases all render the same top line and pills as before. Opened a panel, rewrote the scratch `status.js`, waited for the 3 s refresh: the top line updated and the panel stayed open. Inline script parses.

**Not done / unsure**
- Nothing. Known limit from the card (Designer approved early, then a new design task) left as is.
