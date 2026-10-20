# 003: Keep open panels open while the crew works

Status: passed
Needs design: no
Big change: no

> **In short:** When you open "What's missing" or "Read its instructions" on a helper's card, it will stay open while you read, even when the live status changes in the middle of a round.
> **Why:** Right now these panels slam shut every time a helper starts or finishes something, which feels broken and makes them almost impossible to read during a run.

## Goal
A panel you opened on a card stays open (and one you closed stays closed) when the page refreshes its live status.

## Why now
VISION.md "Must have": "Understandable at a glance by a beginner" and "see what each agent is doing right now". The page is meant to be watched during a live round, and that is exactly when the panels snap shut. It is something wrong the owner would notice, not something missing. Score: V2 E1 R2 = 1, bug +2 = 3.

## Done when
- [ ] Open the "What's missing" panel on one card and "Read its instructions" on another. Change the live status (for example, a different helper becomes `working`, or a helper's `doing` text changes) and wait for the page's re-check (about 3 seconds): both panels are still open, and the cards' pills, grey "doing" box and the top line show the new status.
- [ ] Panels that were closed stay closed after the same status change (nothing opens by itself).
- [ ] If you close a panel you had opened, then the status changes again, it stays closed.
- [ ] While a panel is open, the status change does not make the page jump to a different scroll position (checked at 1280px and at phone width, 375px).
- [ ] Nothing that worked before is broken: the "Up next" pill and top line still update, parked helpers still show "Parked", the relay track still highlights the working helper, no console errors, no sideways scrolling at 375px.

## Not in this task
- Changing what the panels say, or how they look.
- Remembering open panels after a full page reload (only across live status updates).
- Keeping keyboard focus on a panel's heading across updates (nice, but leave it unless it comes for free).
- Fixing the old note at the bottom of the page that mentions `npm run dashboard` (separate backlog item).
- Rewriting the page to update only the changed bits instead of redrawing the cards.

## Files likely touched
- `index.html`: in the script, remember which `<details>` panels are open before `renderCards()` replaces the grid, and re-open them afterwards.

## Notes for the Builder
- Cause: the `setInterval` at the bottom reloads `status.js` every 3 s and, when it changed, calls `render()`, which rebuilds the whole grid with `innerHTML`. Every `<details>` comes back closed. The comment above it ("Open <details> stay open because only status bits change...") is wrong; correct it.
- A simple, low-risk fix: give each card a stable key (e.g. `data-file="${t.file}"` on the `<article>`) and each panel a key (e.g. `data-panel="missing"` / `data-panel="instructions"`). In `renderCards()`, before setting `innerHTML`, collect the keys of currently open panels; after, set `open` on the matching ones. Keep the rest of the render the same.
- Re-opening the panels right after the redraw should keep the page height the same, which is what keeps the scroll from jumping. Check this with a long panel ("Read its instructions") open.
- `status.js` is written live by the crew and is git-ignored. To test, use a copy of the page in a scratch folder (as in task 002) or put `status.js` back exactly as you found it. Don't rely on what it says right now.
- Don't edit `team.js` or `agents.generated.js`. Which helpers are parked comes from `agents.generated.js` (today: Scout and Checker).

## Builder notes

> **In short:** Panels you open on a helper's card ("What's missing", "Read its instructions") now stay open while the page picks up live status changes, and panels you closed stay closed. The page no longer jumps while you read.

**Changed**
- `index.html`: each card now carries its helper's name (`data-file`) and each panel a name (`data-panel="missing"` / `"instructions"`); `renderCards()` notes which panels are open before redrawing the grid and re-opens exactly those afterwards. Corrected the wrong comment above the 3-second re-check.

**How to see it**
Use a copy of the page (the live `status.js` is the crew's). Run `node serve.mjs` in the copy, open the page, open "What's missing" on Planner and "Read its instructions" on Builder, scroll so the instructions are on screen. Change the copy's `status.js` (e.g. Planner `done`, Builder `working`, Builder `doing: "Building 009"`) and wait about 3 s: both panels are still open, the page has not moved, and the pills, grey "doing" boxes, top line and relay track show the new status. Close Planner's panel, change `status.js` again: it stays closed.

**Self-check**
- [x] Opened panels stay open, status updates show: scripted headless-browser run on a scratch copy at 1280px and 375px. After a status change, `planner/missing` and `builder/instructions` were still open, pills/doing/top line/track all showed the new status.
- [x] Closed panels stay closed: only those 2 of 14 panels were open after each update.
- [x] Closed-after-opening stays closed: closed Planner's panel, changed status again, it stayed closed (Builder's stayed open).
- [x] No scroll jump: with the long Builder instructions panel open, its on-screen position stayed exactly the same (220px from the top) across an update at both 1280px and 375px. At 375px the page's scroll number shifted by 24px on one update because the top line got shorter; the browser compensated so nothing moved on screen.
- [x] Nothing broken: "Up next" shown on the right helper (Designer after Planner, Tester after Builder), Scout and Checker still "Parked", relay track highlights the working helper, no console errors, `overflowPx` 0 at 375px (`tools/check-page.mjs`, screenshots `builder-tester-working-*.png` in `.agent-shots/003/`).

**Not done / unsure**
- Keyboard focus on a panel's heading is not kept across updates (listed under "Not in this task").
- The live `status.js` was not touched; all testing used a scratch copy.

## Tester notes

> **In short:** Passed. Panels you open on a card now stay open when the live status changes, panels you closed stay closed, and the page does not jump.

**Checks**
- [x] Open panels stay open and new status shows: opened Planner "What's missing" and Builder "Read its instructions", changed status (Builder working, "Building 009"); after ~3.8s both were still open at 1280px and 375px, and the new text, pills and states showed (`.agent-shots/003/panels-after-update-1280.png`, `-375.png`)
- [x] Closed panels stay closed: only the 2 opened panels were open after the change (checked via script at both widths)
- [x] Closed after opening stays closed: closed Planner's panel, changed status again, it stayed closed and Builder's stayed open (`panels-after-update2-*.png`)
- [x] No scroll jump: with only the "doing" text changing, the open instructions sat at the same on-screen position and scroll value at 1280px and 375px. (When a status change adds a new grey "doing" box above, content moves down by that box's height, which is expected and not a redraw jump.)
- [x] Nothing broke: "Up next" moved to the right helper (Tester after Builder), parked helpers still parked, working helper shown, no console errors, overflow 0px at 375px

**Scope:** OK (only `index.html`, the card and BACKLOG.md changed)
**Design match:** no design step
**Nothing broke:** OK

**Noted for later**
- Nothing

_Screenshots are local only (`.agent-shots/003/`) and are deleted automatically after a while; these notes are the lasting record._
