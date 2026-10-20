# 006: Say so at the top when the crew is waiting for you

Status: passed
Needs design: no
Big change: no

> **In short:** When the crew pauses to wait for your decision (for example, the Designer waiting for you to approve a design), the line at the top of the page will say who is waiting and what for, instead of "Nobody is working right now. No rounds run yet." The waiting helper's card will say "Waiting for you" instead of a plain "Waiting". And while a round is still going but between helpers, the top line will no longer claim no rounds have run.
> **Why:** Today, at exactly the moment the crew needs you, the page says nothing is happening, which is wrong and easy to miss.

## Goal
While a round is in progress, the top line on the page always matches what the crew is really doing, including when a helper is waiting for the owner.

## Why now
VISION.md "Must have": "You can see what each agent is doing right now" and "Understandable at a glance by a beginner". The Team lead (agent-crew `.claude/skills/round/SKILL.md`, "Presenting a design") runs `node tools/status.mjs set designer waiting "Waiting for your decision on NNN"` while the run is still open (no `finishedAt`). The page's `renderNow()` only looks for `working` helpers, so it shows "Nobody is working right now. No rounds run yet." Both halves are false. This is a bug the owner would notice. Score: V2 E1 R2 = 1, bug +2 = 3.

## Done when
- [ ] In a scratch copy of the page whose `status.js` has a run with `startedAt` and no `finishedAt`, and `designer` set to `{ state: "waiting", doing: "Waiting for your decision on 006" }` (nobody `working`): the top line names the Designer by nickname, says it is waiting for you, and includes the text "Waiting for your decision on 006". It does not say "Nobody is working" or "No rounds run yet".
- [ ] In that same scratch copy, the Designer's card pill reads "Waiting for you" (same pill and dot style as now; no new colours), and its grey box still shows "Waiting for your decision on 006". Helpers with no status entry still show the plain "Waiting" pill.
- [ ] In a scratch copy with a run that has `startedAt`, no `finishedAt`, and every agent `done` (or no agents at all): the top line says a round is in progress on that project (for example "A round is running on agent-office. The Team lead is between helpers."), not "No rounds run yet".
- [ ] Unchanged cases: with no `run` at all, the top line still says "Nobody is working right now. No rounds run yet."; with `finishedAt` set, it still says "Nobody is working. Last round finished …"; with a helper `working`, it still says "<Nickname> is working on <project>. Next up: …". If one helper is `working` and another `waiting`, the working line wins.
- [ ] The top line wraps cleanly at phone width (375px) with no sideways scrolling, in the waiting case above.
- [ ] Nothing that worked before is broken: pills, "Up next", relay track, loop line, parked sentences and the parked note, panels staying open across status updates, and the 3-second re-check (switching the scratch `status.js` from waiting to working updates the top line without a reload); no console errors.

## Not in this task
- A new colour, animation or other look for the waiting state (on the pill, the card or the relay track). That needs design.
- Showing who goes first when no round is running ("Type /round to start…"): separate backlog item.
- Detecting a crashed run where a helper stays "working" forever.
- Changing `status.js`, `team.js`, `agents.generated.js`, or the agent-crew `tools/status.mjs`.

## Files likely touched
- `index.html`: `renderNow()` (waiting and in-progress cases), `renderCards()` / `STATE_WORDS` (pill label for an explicitly waiting helper).

## Notes for the Builder
- Live status shape: `window.STATUS = { run: { project, startedAt, finishedAt? }, agents: { <file>: { state, doing, at } } }`. States written by `tools/status.mjs`: `working`, `done`, `failed`, `waiting`. `start` clears all agents; `finish` adds `finishedAt` and turns any `working` into `done`.
- `state(file)` already returns `'waiting'` for helpers with no status entry, so "waiting for you" must be decided from an explicit entry: `window.STATUS?.agents?.[file]?.state === 'waiting'`. Treat it as "waiting for you" only when that entry exists; the round skill uses this state only when it is asking the owner. Don't invent other reasons.
- Parked helpers stay "Parked" whatever their status says (keep `state()` as it is).
- If several helpers are explicitly waiting, naming the first one in `TEAM` order is fine.
- Keep the escaping rules: set text with `textContent` (as `renderNow()` does now) or `esc()`.
- `status.js` is written live by the crew and is git-ignored. Don't rely on what it says right now and don't edit it; test every case in a scratch copy of the page (e.g. in `/tmp`) with your own fake `status.js`.

## Builder notes

> **In short:** When a helper is waiting for your decision, the line at the top now says so, for example "Designer is waiting for you on agent-office: Waiting for your decision on 006.", and that helper's card says "Waiting for you". Between helpers in a running round, the top line now reads "A round is running on agent-office. The Team lead is between helpers." instead of "No rounds run yet".

**Changed**
- `index.html`: new `waitingForYou(file)` helper (true only for an explicit `waiting` entry on a non-parked helper); card pill shows "Waiting for you" for those helpers; `renderNow()` gains two cases for an open run (no `finishedAt`): a helper waiting for you, then "between helpers". Working still wins; no-run and finished lines are unchanged. Text still set with `textContent`; no new CSS or colours.

**How to see it**
Copy `index.html`, `team.js`, `agents.generated.js` into a scratch folder and write your own `status.js` there:
- `{"run":{"project":"agent-office","startedAt":"…"},"agents":{"designer":{"state":"waiting","doing":"Waiting for your decision on 006"}}}` → top line "Designer is waiting for you on agent-office: Waiting for your decision on 006."; Designer pill "Waiting for you", grey box unchanged; other helpers "Waiting".
- Same run with only `done` agents, or `agents: {}` → "A round is running on agent-office. The Team lead is between helpers."
- No `run` → "Nobody is working right now. No rounds run yet."; `finishedAt` set → "Nobody is working. Last round finished …"; a `working` helper plus a `waiting` one → "Builder is working on agent-office. Next up: Tester."

**Self-check**
- [x] Waiting case top line: check-page `--find` in a /tmp copy: "Waiting for your decision on 006" found, "Nobody is working" and "No rounds run yet" 0; screenshot `.agent-shots/006/builder-waiting-*.png`.
- [x] Designer pill "Waiting for you", grey box text kept, helpers without entries "Waiting": seen in screenshots (same pill/dot, `data-state` stays `waiting`).
- [x] Open run with all `done` / no agents: "between helpers" found, "No rounds run yet" 0 (`builder-between-*`, `builder-empty-*`).
- [x] Unchanged cases: no run, finished, working, working+waiting all checked (`builder-norun-*`, `builder-finished-*`, `builder-both-*`); working line wins.
- [x] 375px: top line wraps onto two lines, `overflowPx` 0 at both widths in every case.
- [x] Nothing broken: no console errors in any case; Playwright test on a scratch copy switched `status.js` from waiting to working with a panel open: top line updated without reload to "Builder is working on agent-office. Next up: Tester.", Tester showed "Up next", the open panel stayed open. Relay track, loop line, parked note seen unchanged in screenshots.

**Not done / unsure**
- After a round has finished, a helper whose last entry is still `waiting` keeps the "Waiting for you" pill (the top line shows "Last round finished"). The card only asked for the pill to follow the explicit entry, and the decision is usually still pending then, so I left it; flagging in case the owner prefers plain "Waiting" there.
- The waiting line repeats the word "waiting" ("…is waiting for you…: Waiting for your decision on 006.") because the card asks for both the phrase and the exact status text.

## Tester notes

> **In short:** Passed. When the Designer is waiting for your decision, the top line now reads "Designer is waiting for you on agent-office: Waiting for your decision on 006." and its card says "Waiting for you". Between helpers it says "A round is running on agent-office. The Team lead is between helpers."

**Checks**
- [x] Waiting case top line names Designer, says waiting for you, includes the status text; no "Nobody is working"/"No rounds run yet" (0 matches): seen at both widths (`.agent-shots/006/tester-waiting-1280.png`, `-375.png`)
- [x] Designer pill "Waiting for you" (same pill style), grey box still "Waiting for your decision on 006"; other helpers plain "Waiting" (`tester-waiting-1280.png`)
- [x] Open run with only done agents, and with no agents: "A round is running on agent-office. The Team lead is between helpers."; "No rounds run yet" 0 (`tester-between-1280.png`, `tester-empty-*.png`)
- [x] Unchanged: no run gives the old line, finishedAt gives "Last round finished", working gives "Builder is working on agent-office. Next up: ..."; working plus waiting: working line wins (`tester-norun-*`, `tester-finished-*`, `tester-both-*`)
- [x] 375px: line wraps cleanly, overflowPx 0 at both widths in every case (`tester-waiting-375.png`)
- [x] Nothing broke: no console errors in any case; a live test switching the scratch status.js from waiting to working updated the top line after about 3s without reload, an open panel stayed open, Tester got "Up next"; pills, relay track, loop line and parked notes look as before

**Scope:** OK. Only `index.html` changed for this task (card and BACKLOG.md aside). `agents.generated.js` also shows as modified but it is a regenerated file from agent-crew agent edits, not part of this task; left uncommitted. status.js was not touched.
**Design match:** no design step
**Nothing broke:** OK

**Noted for later**
- Two small issues added to the backlog (finished-round pill, repeated "waiting" wording)

_Screenshots are local only (`.agent-shots/006/`) and are deleted automatically after a while; these notes are the lasting record._
