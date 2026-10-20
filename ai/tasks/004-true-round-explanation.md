# 004: Make the page's explanations match how the crew really works

Status: passed
Needs design: no
Big change: no

> **In short:** The sentences that explain how a round works, and where the live status comes from, will say what actually happens today: only the Tester can send work back, the Builder gets at most two more tries, and if it still fails the crew stops and asks you. The old setup note that points to a file and command that don't exist here goes away.
> **Why:** These are the lines a beginner reads to understand the crew, and right now they describe a helper that never runs (the Checker) and files that aren't there. Wrong explanations are worse than missing ones.

## Goal
Every sentence on the page that explains how a round works or where the page's information comes from is true for the crew as it is today.

## Why now
VISION.md "Must have": "Understandable at a glance by a beginner". The page teaches the owner how the crew works; today it names the parked Checker as a step, gets the retry rule wrong, and points to `dashboard/status.js` and `npm run dashboard` as if they were in this folder. Merges two backlog bugs that touch the same few lines of text. Score: V2 E1 R1 = 2, bug +2 = 4.

## Done when
- [ ] Under "How one round works", the line about problems says (in plain words) that if the **Tester** finds a problem the work goes back to the **Builder**, at most 2 more tries; if it then passes the change is saved and the next task starts; if it still fails the crew stops and tells you. The word "Checker" does not appear in that line.
- [ ] The Checker is named in that line only when it is not parked: with `agents.generated.js` as it is today (Checker parked), it is absent. (To check the other case, temporarily set `code-reviewer`'s `parked` to `false` in a scratch copy of the page; the line then names both the Tester and the Checker. Don't change the real `agents.generated.js`.)
- [ ] The note at the bottom of the page no longer mentions `dashboard/status.js`. It says live status comes from `status.js` in this folder, which the crew updates at each handover, and that the page re-checks it every few seconds. If it mentions `npm run dashboard`, it says this is run in the `agent-crew` folder to refresh the helpers' details.
- [ ] If a helper has no instructions loaded, its "Read its instructions" panel no longer says "Run npm run dashboard to load this." as if that works here; it says the same thing as the bottom note (run `npm run dashboard` in the `agent-crew` folder). Check it in a scratch copy by blanking one helper's `instructions`.
- [ ] The text looks like the surrounding text (same size, color and style as today) and wraps cleanly at phone width (375px) with no sideways scrolling.
- [ ] Nothing that worked before is broken: cards, pills, "Up next", relay track, panels staying open across status updates, and the 3-second re-check all still work; no console errors.

## Not in this task
- Renaming the page to "Agent Office" or changing the header's "Seven helpers" sentence (separate backlog item).
- Explaining what "parked" means, or changing how parked helpers look (needs design).
- Removing parked helpers (Scout, Checker) from the relay track.
- Explaining the Designer's "waits for your approval" pause in the loop line. Leave the Designer out of that line.
- Changing `team.js`, `agents.generated.js` or `status.js`.

## Files likely touched
- `index.html`: the `.loop` paragraph (built from data instead of fixed text), the `.note` paragraph, and the instructions fallback text in `renderCards()`.

## Notes for the Builder
- Facts, from `agent-crew/.claude/skills/round/SKILL.md`: when the Tester fails a task, the Team lead runs the Builder again with the Tester's notes, then the Tester again, **at most 2 extra tries**. Still failing, the card is marked `failed`, the run stops, and the owner is told what keeps failing. When it passes, the Tester commits (saves) the work. Nothing in the round runs the Checker today.
- Parked state comes from `window.AGENTS[file].parked` (`agents.generated.js`). Today Scout (`innovation`) and Checker (`code-reviewer`) are parked; reuse the existing `canTakeWork()` helper instead of hard-coding names. Use nicknames from `window.TEAM` (`byFile[...]`), escaped with `esc()`.
- The loop line only needs drawing once (parked state doesn't change while the page is open), e.g. inside `renderRelay()` or at start-up. Give the `<p class="loop">` an id if you fill it from script; keep the `<b>` around helper names so it looks the same.
- `status.js` is written live by `agent-crew/tools/status.mjs` and is git-ignored. Don't rely on what it says right now; test variations in a scratch copy of the page.
- `npm run dashboard` is a script in `agent-crew/package.json`; it regenerates this folder's `agents.generated.js`. It does not exist in this project.

## Builder notes

> **In short:** Under "How one round works", the line now says what really happens: if the Tester finds a problem the work goes back to the Builder for at most 2 more tries, then it is saved and the next task starts, or the crew stops and tells you. The Checker only shows up in that line when it isn't parked. The note at the bottom and the empty "Read its instructions" panel now point to `status.js` in this folder and to running `npm run dashboard` in the `agent-crew` folder.

**Changed**
- `index.html`: the `.loop` paragraph got `id="loop"` and is now filled once at start-up by a new `renderLoop()`, which names the Tester, adds the Checker only if `canTakeWork('code-reviewer')`, and uses `byFile` nicknames with `esc()` inside `<b>`.
- `index.html`: rewrote the bottom `.note` (status.js in this folder, updated at each handover, re-checked every few seconds; `npm run dashboard` is run in the `agent-crew` folder).
- `index.html`: the instructions fallback text now reads "Not loaded. Run npm run dashboard in the agent-crew folder to load this."

**How to see it**
- Open the page as is: the loop line reads "If the **Tester** finds a problem, the work goes back to the **Builder**, at most 2 more tries. If it then passes, the change is saved and the next task starts; if it still fails, the crew stops and tells you." No "Checker" in it.
- In a scratch copy of the page, set `code-reviewer`'s `parked` to `false` in `agents.generated.js`: the line starts "If the **Tester** or **Checker** finds a problem...".
- In the scratch copy, blank one helper's `instructions` (I used `planner`) and open its "Read its instructions" panel: it shows the new fallback text.
- Screenshots: `.agent-shots/004/builder-real-*.png` (real data), `builder-scratch-*.png` (Checker unparked, Builder working), `builder-scratch-panel-375.png` (the fallback panel).

**Self-check**
- [x] Loop line says Tester -> Builder, at most 2 more tries, passes -> saved and next task, still fails -> crew stops and tells you; no "Checker": check-page `--find` at 1280 and 375 ("Tester finds a problem" 1, "Checker finds" 0), plus screenshot.
- [x] Checker named only when not parked: scratch copy in `/tmp/ao-004` with `code-reviewer.parked=false` showed "Tester or Checker finds a problem" (found 1). Real `agents.generated.js` untouched.
- [x] Bottom note: no `dashboard/status.js` (found 0); new wording visible ("in the agent-crew folder" found 1).
- [x] Empty-instructions panel: scratch copy with planner's instructions blanked; opened the panel with Playwright, text is "Not loaded. Run npm run dashboard in the agent-crew folder to load this."
- [x] Looks like the surrounding text, wraps at 375px: same `.loop`/`.note` classes and `<b>`/`<code>` markup; overflowPx 0 at both widths; checked screenshots.
- [x] Nothing broken: no console errors at either width; "Up next" pill and "Next up" line still show with a working agent; after changing the scratch `status.js` the page updated within the 3-second re-check ("Tester is working on demo. Next up: Checker.") and the open instructions panel stayed open; `new Function` syntax check of the script passed.

**Not done / unsure**
- The Tester is always named in the loop line (the card says it is the one who sends work back); only the Checker depends on parked state.
- The live `status.js` and `agents.generated.js` were never edited; all variations were tested in `/tmp/ao-004`.

## Tester notes

> **In short:** Passed. The "How one round works" line now says the Tester sends work back to the Builder (at most 2 more tries, then saved or the crew stops and tells you), and the bottom note and empty-instructions panel point to the right places.

**Checks**
- [x] Loop line wording, no "Checker": found "Tester finds a problem" 1, line reads as specified (`.agent-shots/004/tester-real-1280.png`, `tester-real-375.png`)
- [x] Checker only when not parked: scratch copy with `code-reviewer` unparked shows "Tester or Checker finds a problem" (`/tmp` copy, `tester-unparked-*.png`); real data omits it
- [x] Bottom note: no `dashboard/status.js` (0 found); says `status.js` in this folder, updated at each handover, re-checked every few seconds, `npm run dashboard` in the `agent-crew` folder
- [x] Empty instructions panel (planner blanked in scratch copy): "Not loaded. Run npm run dashboard in the agent-crew folder to load this."
- [x] Text matches surroundings and wraps at 375px: overflowPx 0 at both widths, checked screenshots
- [x] Nothing broke: no console errors; after a scratch status change the page updated within 3s and an open panel stayed open; cards, pills, track fine

**Scope:** OK (only `index.html`, the card and BACKLOG.md changed; status.js and agents.generated.js untouched)
**Design match:** no design step
**Nothing broke:** OK

**Noted for later**
- Nothing

_Screenshots are local only (`.agent-shots/004/`) and are deleted automatically after a while; these notes are the lasting record._
