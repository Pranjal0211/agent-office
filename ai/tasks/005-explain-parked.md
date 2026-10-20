# 005: Say in plain words what "parked" means

Status: passed
Needs design: no
Big change: no

> **In short:** Helpers that are switched off for now (today: Scout and Checker) will say so in plain words. Their card gets a short line explaining that they are parked, that rounds skip them, and that they can be brought back later; the "How one round works" section says the baton skips greyed-out helpers.
> **Why:** Today a beginner sees two greyed-out helpers marked "Parked" and two greyed-out stops on the relay track with no explanation, so the page looks broken or confusing.

## Goal
A beginner can tell, without outside help, what a greyed-out "Parked" helper is and why work skips it.

## Why now
VISION.md "Must have": "Every agent is visible, with what it does in easy words" and "Understandable at a glance by a beginner". "Parked" is jargon, and the relay hint ("passed along left to right") is untrue for parked stops. This is the top remaining item that needs no new look: it uses the existing text styles only. Score: V2 E1 R1 = 2.

## Done when
- [ ] On each parked helper's card (with `agents.generated.js` as it is today: Scout and Checker), a plain sentence is visible near the top of the card, in the same box style as the "what it's doing" line, saying the helper is parked: switched off for now, rounds skip it, and it can be brought back later. The word "parked" (or "Parked") appears in it.
- [ ] Cards of helpers that are not parked do not show that sentence.
- [ ] Under "How one round works", the hint (or a line right below it) says that greyed-out helpers are parked and the work skips them, naming the parked helpers by nickname. It is built from the data: in a scratch copy of the page with `innovation`'s `parked` set to `false`, only the Checker is named; with both unparked, the line is not shown at all. (Don't change the real `agents.generated.js`.)
- [ ] The new text is readable on the greyed-out cards (it uses the existing text styles; the parked look itself is unchanged) and wraps cleanly at phone width (375px) with no sideways scrolling.
- [ ] Nothing that worked before is broken: pills, "Up next", relay track, loop line, panels staying open across status updates, and the 3-second re-check all still work; no console errors.

## Not in this task
- Changing how parked helpers look (the grey/faded style), or hiding/removing them from the relay track or the grid. That needs design.
- Renaming the page to "Agent Office" or fixing the "Seven helpers" sentence (separate backlog item).
- Any button or way to un-park a helper from the page.
- Changing `team.js`, `agents.generated.js` or `status.js`.

## Files likely touched
- `index.html`: `renderCards()` (parked sentence on parked cards), the relay hint / a line under it filled from data (e.g. in `renderLoop()` or a small new function run once at start-up).

## Notes for the Builder
- Parked state comes from `window.AGENTS[file].parked` (`agents.generated.js`, generated from the `agent-crew` repo: agents in `.claude/agents-parked/` are parked). Reuse `canTakeWork()` / `state()`; don't hard-code names. Nicknames come from `byFile[...]`, escaped with `esc()`.
- Facts you may state: parked helpers are not used in rounds right now, `nextUp()` skips them, and the `agent-crew` README says they are "Brought back later". Don't promise when.
- The card's `.doing` box hides itself when empty (`.doing:empty`). Live status for a parked helper is normally empty; if both exist, show the parked sentence (a parked helper isn't working). A separate `<p class="doing">` for the parked line is fine too.
- Parked cards use `opacity: .5` via `[data-state="parked"]`. Leave that rule alone; just confirm the sentence is still legible in a screenshot at both widths, light and dark. If it clearly isn't, note it under "Not done / unsure" rather than restyling.
- Parked state doesn't change while the page is open, so the relay-hint line only needs drawing once.
- `status.js` is written live by the crew and is git-ignored. Don't rely on what it says right now; test variations in a scratch copy of the page.

## Builder notes

> **In short:** The Scout's and Checker's cards now carry a short grey box saying "Parked: switched off for now, so rounds skip this helper. It can be brought back later." The "How one round works" text now ends with "Greyed-out helpers are parked (switched off for now), so the work skips them: Scout and Checker."

**Changed**
- `index.html`: parked cards show a fixed parked sentence in their existing `.doing` box (instead of live status); new `renderParked()`, run once at start-up, appends a line naming the parked helpers (from `canTakeWork()` and `byFile` nicknames) to the relay hint via a new `<span id="parked-note">`.

**How to see it**
- Open the page as is: Scout and Checker cards each show the parked sentence; the other five cards don't. The hint under "How one round works" names "Scout and Checker".
- In a scratch copy, set `innovation`'s `parked` to `false` in `agents.generated.js`: the hint names only "Checker" and only the Checker card has the sentence. Set both to `false`: no extra hint line and no parked sentence anywhere.

**Self-check**
- [x] Parked sentence on Scout and Checker cards, same box style as the "what it's doing" line, includes "Parked": `check-page.mjs` `--find` count 2 at 1280 and 375; screenshots `builder-base-*.png`.
- [x] Not shown on non-parked cards: probe script read every card's box text (only parked cards had it); with a non-parked Checker set to working, its own live text showed instead.
- [x] Hint built from data: scratch copies in `/tmp` gave "...: Scout and Checker." (as is), "...: Checker." (`innovation` unparked), and the plain original hint (both unparked). Real `agents.generated.js` and `team.js` unchanged (same checksums before/after).
- [x] Readable and wraps at 375px, no sideways scroll: `overflowPx` 0 at both widths in all three variants; looked at light screenshots at 1280/375 and a dark-mode screenshot at 375 (`builder-dark-375.png`), text legible on the faded cards. Parked style untouched.
- [x] Nothing broken: no console errors in any variant; pills, relay track, loop line correct; with the Planner set working, the Designer showed "Up next" and the top line read "Next up: Designer"; a status change picked up by the 3-second re-check redrew the page and an open "What's missing" panel stayed open. All tested on `/tmp` copies with fake `status.js`; the live `status.js` was not touched.

**Not done / unsure**
- Nothing.

## Tester notes

> **In short:** Passed. Scout and Checker now say in plain words that they are parked (switched off, skipped by rounds, can return later), and the "How one round works" text names them; the other cards are unchanged.

**Checks**
- [x] Parked sentence on each parked card, same box as the "doing" line, contains "Parked": 2 matches at 1280 and 375, on Scout and Checker (`.agent-shots/005/live-1280.png`, `live-375.png`)
- [x] Not shown on non-parked cards: only the two parked cards carry it (`live-1280.png`)
- [x] Hint built from data: as is "Scout and Checker"; one helper unparked in a /tmp copy names only the other one (`/tmp/t005b`); both unparked: no line and no sentence, counts 0 (`/tmp/t005c`)
- [x] Readable and wraps at 375px, no sideways scroll: overflowPx 0 at both widths, light and dark; text is a bit faint on the faded cards but legible (`live-375.png`, `live-dark-375.png`)
- [x] Nothing broke: no console errors, pills, "Up next" (seen in the variant), relay track, loop line all fine

**Scope:** OK (index.html, ai/BACKLOG.md, the card; agents.generated.js, team.js, status.js untouched)
**Design match:** no design step
**Nothing broke:** OK

**Noted for later**
- Nothing

_Screenshots are local only (`.agent-shots/005/`) and are deleted automatically after a while; these notes are the lasting record._
