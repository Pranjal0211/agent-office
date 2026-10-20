# 007: Stop saying "Waiting for you" after the round has ended

Status: passed
Needs design: no
Big change: no

> **In short:** Once a round has finished, no helper's card will still say "Waiting for you" or "Waiting for your decision on 006". By then you have already answered, so the page stops asking. While a round is still running, nothing changes.
> **Why:** Today, after you've made your decision and the round has ended, the Designer's card still says it is waiting for you. That's wrong, and it makes you think something still needs you.

## Goal
After a round has finished, no helper's card claims it is still waiting for the owner.

## Why now
VISION.md "Must have": "You can see what each agent is doing right now" and "Understandable at a glance by a beginner". The Tester found this in 006. Facts from agent-crew: the Team lead sets `designer waiting "Waiting for your decision on NNN"` while it asks the owner (`.claude/skills/round/SKILL.md`, "Presenting a design"). It only runs `status.mjs finish` after every design on the list has been shown and the reply recorded (section 3, "When to stop"). `finish` does not clear `waiting` entries (`tools/status.mjs`). So in a finished run, a `waiting` entry is always out of date: the owner has already answered. Today the top line already ignores it ("Nobody is working. Last round finished …"), but the card pill still says "Waiting for you" and the grey box still says "Waiting for your decision on 006". Score: V2 E1 R1 = 2, bug +2 = 4.

## Done when
- [ ] In a scratch copy of the page whose `status.js` has a run with `startedAt` **and** `finishedAt`, and `designer` set to `{ state: "waiting", doing: "Waiting for your decision on 006" }`: the Designer card's pill says "Waiting" (not "Waiting for you"). The text "Waiting for your decision on 006" appears nowhere on the page. The Designer card has no empty grey box. The top line still reads "Nobody is working. Last round finished …".
- [ ] Same finished run, with `tester` set to `{ state: "failed", doing: "Two checks still fail" }`: the Tester card still shows "Stuck" and the text "Two checks still fail". Only stale waiting text is hidden; other helpers' text stays.
- [ ] The same `designer` waiting entry in a run with **no** `finishedAt` looks exactly as it does after 006: the pill says "Waiting for you", the grey box says "Waiting for your decision on 006", and the top line says "Designer is waiting for you on agent-office: …".
- [ ] At 375px and 1280px the finished-run case has no sideways scrolling and no console errors.
- [ ] Nothing that worked before is broken: no-run, working, between-helpers and parked cases look as before. An open panel stays open when `status.js` changes.

## Not in this task
- Making the Designer's card stop saying "Waiting for you" during a round that is still running, after you've answered. The page can't tell that from the status file. It needs a change in agent-crew's round steps (see Notes).
- The repeated word "waiting" in the top line (separate backlog item).
- Any new look, colour or pill for "finished" states.
- Editing `status.js`, `agents.generated.js` or `team.js`.

## Files likely touched
- `index.html`: `waitingForYou()` also requires the run to be open (no `finishedAt`). In `renderCards()`, a helper whose explicit entry is `waiting` in a finished run gets no grey-box text, so `.doing:empty` hides the box.

## Notes for the Builder
- Status shape: `window.STATUS = { run: { project, startedAt, finishedAt? }, agents: { <file>: { state, doing, at } } }`. `renderNow()` already computes "run is open" as `run?.startedAt && !run.finishedAt`. Reuse one small helper for this rather than repeating the check.
- `state()` returns `'waiting'` for helpers with no entry, too. Hide grey-box text only for an explicit `waiting` entry in a finished run. Parked helpers keep `PARKED_LINE`.
- Keep `.doing` truly empty (no whitespace) when hiding the text, or `.doing:empty` won't hide the box.
- `status.js` is written live by the crew and is git-ignored. Don't edit it and don't rely on what it says now. Test every case in a scratch copy (e.g. under `/tmp`) with your own `status.js`.
- Keep escaping as it is (`esc()` / `textContent`).

## Builder notes

> **In short:** Once a round has finished, a helper that was left on "waiting" now just shows a plain "Waiting" label with no grey box, so the page no longer asks you for a decision you already gave. While a round is still running, nothing changes.

**Changed**
- `index.html`: added a small `roundOver()` helper (the run has a `finishedAt`). `waitingForYou()` now also needs the round not to be over. A card whose own entry is `waiting` in a finished round gets an empty grey box, so `.doing:empty` hides it. `renderNow()` reuses `roundOver()` for its "run is open" check (same result as before).

**How to see it**
In a scratch copy of the page, set `status.js` to a run with `startedAt` and `finishedAt`, with `designer: { state: "waiting", doing: "Waiting for your decision on 006" }` and `tester: { state: "failed", doing: "Two checks still fail" }`. The Designer card says "Waiting" with no grey box, the Tester card says "Stuck" with "Two checks still fail", and the top line says "Nobody is working. Last round finished …". Remove `finishedAt`: the Designer card goes back to "Waiting for you" with the grey box, and the top line says "Designer is waiting for you on agent-office: …".

**Self-check**
- [x] Finished run, designer waiting: checked with a headless-browser script on a scratch copy. Pill says "Waiting", `.doing` innerHTML is `""` and hidden, "Waiting for your decision on 006" is found 0 times, top line is "Nobody is working. Last round finished …".
- [x] Finished run, tester failed: pill "Stuck", text "Two checks still fail" shown.
- [x] Open run (no `finishedAt`): pill "Waiting for you", box "Waiting for your decision on 006", top line "Designer is waiting for you on agent-office: Waiting for your decision on 006."
- [x] 375px and 1280px: `check-page.mjs` (`builder-finished-*` in `.agent-shots/007/`) shows `overflowPx: 0` and no errors at both widths. Screenshots looked at. (`--find "Waiting for you"` counts 1 because it is case-insensitive and matches the Team lead's static "designs waiting for your decision" text. That text is not a pill.)
- [x] Nothing else broken: the no-run, working ("Planner is working… Next up: Designer", Designer "Up next"), between-helpers and parked cases render as expected with no errors. When I opened the Designer's "What's missing" panel and then changed the scratch `status.js` from an open to a finished run, the panel stayed open after the next poll and the pill switched to "Waiting".

**Not done / unsure**
- If a `waiting` entry exists but there is no run at all (`run: null`), the pill still says "Waiting for you", as before. Only a finished run (`finishedAt`) hides it, so the no-run case stays unchanged.
- The live `status.js` was not touched. All tests used copies in a scratch folder.

## Tester notes

> **In short:** Passed. Once a round has finished, the Designer's card says a plain "Waiting" with no grey box, and "Waiting for your decision on 006" is gone. While a round is running, it looks exactly as before.

**Checks**
- [x] Finished run, designer waiting: pill "Waiting", "Waiting for your decision on 006" found 0 times, no grey box on the Designer card, top line "Nobody is working. Last round finished 10/20/2026, 7:00:00 AM." (`.agent-shots/007/tf-finished-1280.png`, `tf-finished-375.png`)
- [x] Finished run, tester failed: Tester pill "Stuck" and "Two checks still fail" still shown (`tf-finished-1280.png`)
- [x] Open run (no `finishedAt`): Designer pill "Waiting for you", grey box "Waiting for your decision on 006", top line "Designer is waiting for you on agent-office: Waiting for your decision on 006." (`tf-open-1280.png`)
- [x] 375px and 1280px, finished case: overflowPx 0, no console errors (`tf-finished-375.png`)
- [x] Nothing broke: no-run ("Nobody is working"), working ("Planner is working", "Up next", its text), between-helpers and parked cases render with no errors and no sideways scroll. A "What's missing" panel opened on the Designer card stayed open after status.js changed from an open to a finished run and the page re-polled (pills updated, no errors).

**Scope:** OK (only `index.html`, the card and `ai/BACKLOG.md` changed; nothing from "Not in this task" done)
**Design match:** no design step
**Nothing broke:** OK (checked in a scratch copy under /tmp; the live status.js was never touched)

**Noted for later**
- Nothing new (the Planner already logged the related items).

_Screenshots are local only (`.agent-shots/007/`) and are deleted automatically after a while; these notes are the lasting record._
