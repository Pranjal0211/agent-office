# 008: Create the design system (the office's look)

Status: passed
Needs design: yes
Big change: yes

> **In short:** The Designer will show you 2 or 3 clickable looks for Agent Office, for example a real office floor plan with desks, or a wall of employee badges. Each look comes with its own colors, fonts and building blocks, shown on the real crew page. You pick one (or ask for changes), and only then does the Builder put it on the page. It's a starting point, not a cage: later tasks can still adjust it.
> **Why:** You asked for it, and the page still looks like a "crew board", not an office. Several fixes on the list are about how things look (cards full of technical words, parked helpers that only look faded, a track that only shows who is working). They should all follow one agreed look instead of being patched one by one.

## Goal
The owner has an approved look for Agent Office (colors, fonts, spacing and core parts), and the main page uses it.

## Why now
The owner asked for this round to start the design system. It also follows the Planner's "design system first" rule: there is no `design/*-design-system/decision.md` with an `Approved:` line, and the top-scored visual gap ("Cards show technical details a beginner can't read at a glance", V2 E1 R2 = 1, tied for first with a non-visual item and noticed more) needs design. VISION.md: "Understandable at a glance by a beginner" and "Agent Office is a virtual office where AI agents work as your employees". Score for this foundation: V2 E3 R2 = -1, picked by owner request and by the design-system-first rule.

## Look questions the directions must answer
Every direction should take a clear position on each of these, so the owner can compare:
1. **How office-like?** (VISION.md open question) A literal office floor plan with desks, cards styled as employee badges, or something else that reads as "your company" (e.g. an org chart or a control room). At least two directions must differ here; this is the main choice.
2. **What a card shows at a glance** (backlog): today each card shows the file name (`planner.md`), "Brain: Opus (strongest)", tool chips, a depth meter, and raw instructions in a panel. Which of these stay on the face of the card, which move behind a click, and how are they worded for a beginner?
3. **Status at a glance** (backlog): how "Working", "Up next", "Waiting for you", "Done", "Stuck", "Waiting" (idle) and "Parked" look, so they are easy to tell apart without reading. Not by color alone.
4. **The relay track** (backlog): today only the working helper is highlighted; finished, stuck and waiting-for-you helpers look the same as idle ones. How does the order of work look in this style, and how does each state show on it?
5. **Parked helpers** (backlog): today they are just faded, with faint text. Do they get their own clear look, sit apart (e.g. "away from the office"), or leave the track?
6. **"Waiting for you"** : how the page asks the owner for something so it can't be missed (today: the top line).
7. **The page's name and header** (backlog): the page still says "Agent Crew Board" / "Your AI build crew". Each direction may show a header that fits its idea of "Agent Office". (The final wording isn't decided here.)

## Done when
- [ ] The Designer's review page shows 2 or 3 directions that are clearly different ideas (not color swaps). At least one is office-like (floor plan / desks) and at least one is badge-like, and each answers the 7 look questions above.
- [ ] Each direction has a short specimen section (colors, fonts, spacing, agent card, every status label, the relay track, buttons/links) **and** the same style applied to the main crew page with the real helpers from `team.js`, with a way to switch between the working, up-next, waiting-for-you, stuck, done, idle and parked states.
- [ ] The owner approves one direction (`design/008-design-system/decision.md` has an `Approved:` line). Nothing is built before that.
- [ ] After approval, `index.html` uses the approved colors, fonts, spacing and card/status/track look. Every helper is still shown with what it does in plain words, and the live status (working, next up, waiting for you, stuck, done, parked) still shows correctly, with the top line unchanged in meaning.
- [ ] At 375px and 1280px: no sideways scrolling, readable contrast (WCAG AA), visible keyboard focus, motion respects reduced-motion, no console errors.
- [ ] Nothing that worked before is broken: status still refreshes every few seconds without a reload, open panels stay open when status changes, a finished round never shows "Waiting for you", parked helpers are still explained.

## Not in this task
- Giving an agent work from the page, or any buttons that start work (open behaviour question, see `ai/QUESTIONS.md`).
- Showing history of past work (open behaviour question, see `ai/QUESTIONS.md`).
- New live data the page doesn't have today (e.g. whether the current task needs design, a "status is old" warning).
- Final wording of the page title and header text; the Builder keeps today's words unless the approved design changes only their look.
- Editing `team.js`, `agents.generated.js` or `status.js`.
- A second page or a separate style guide page in the app. The specimen lives in the Designer's prototypes.

## Files likely touched
- `design/008-design-system/` (Designer): prototypes, notes, review page; `decision.md` is written by the Team lead from the owner's answer.
- `index.html` (Builder, after approval): new CSS tokens and styles, card and relay markup as the approved design needs.

## Notes for the Builder
- Data you can use: `window.TEAM` (`team.js`: file, nickname, color, oneLine, gets, gives, depth, missing), `window.RELAY` (order of work), `window.AGENTS` (`agents.generated.js`: tools, model, instructions, parked), `window.STATUS` (`status.js`: `{ run: { project, startedAt, finishedAt? }, agents: { <file>: { state, doing, at } } }`). Each helper already has its own color in `team.js`; the design may use or restyle it.
- Keep the existing logic in `index.html` (`state()`, `nextUp()`, `waitingForYou()`, `roundOver()`, the open-panel restore in `renderCards()`, the 3-second `status.js` poll). Change markup and CSS around it; don't rewrite it.
- Current tokens live in `:root` at the top of `index.html` (with a dark-mode block). Replace them with the approved ones; keep dark mode if the approved design has it.
- Rules from VISION.md: plain HTML, CSS and JavaScript, no build step, runs with `node serve.mjs`. Fonts may come from Google Fonts as today.
- `status.js` is written live and git-ignored. Test states in a scratch copy with your own `status.js`, never by editing the live one.
- Keep escaping as it is (`esc()` / `textContent`).

## Notes for the Designer
- This is the first design-system task: `Big change: yes`, so make 2 or 3 directions. Use the real helpers, words and colors from `team.js` and the current page; don't invent agents, numbers or history.
- Show all 7 helpers, including the 2 that are parked today (Scout and Checker, per `agents.generated.js`), and the Team lead's role of coordinating the round.

## Design
- Review page: `design/008-design-system/review.html`
- v1: 3 directions, made with Opus (no approved design system yet, big change), waiting for the owner
- 2026-10-20: owner asked for changes on v1
- v2: 1 direction (B, the badge wall), made with Opus (no approved design system yet), waiting for the owner
- 2026-10-20: owner approved option B on v2 → `design/008-design-system/v2/option-b.html` is the source of truth

## Builder notes

> **In short:** The crew page now uses the approved badge-wall look: a pinned memo at the top (bright orange when a helper needs you, pink when one is stuck), "Today's shift" with tags clipped to a line, each active helper as an ID badge on a lanyard with a rubber-stamp status that you can flip for details, and Scout and Checker lying in an "Away tray". Live updates work as before.

**Changed**
- `index.html`: replaced the tokens and fonts with the approved ones (Archivo + IBM Plex Mono, wall/badge/stamp colors, 4-64px spacing; light only as approved, so the old dark-mode block is gone); rebuilt the relay track as the shift line, the cards as flip badges, parked helpers as the Away tray, the top line as the memo, and the instructions panel as a "Job description" dialog. Kept `state()`, `nextUp()`, `waitingForYou()`, `roundOver()`, `askedWaiting()`, `canTakeWork()`, `esc()` and the 3-second `status.js` poll unchanged.

**How to see it**
Copy the project to a scratch folder and put your own `status.js` there (never the live one), then open it with `node tools/check-page.mjs --dir <copy> --project <agent-office> --task 008`:
- Builder working, planner/designer done, no tester entry: memo "Builder is working on agent-office. Next up: Tester.", Builder tag has a ring + "Has the work", Tester stamp "Up next".
- Designer `waiting` with a doing line, round open: memo turns orange "For you · please answer", Designer badge stamp "Needs you" with an orange ring.
- Builder `failed`, nobody working: memo "Memo · problem / Builder is stuck on ...", Builder stamp "Stuck" with a red ring.
- Add `finishedAt` to `run` and leave a `waiting` entry: memo "Nobody is working. Last round finished ...", the leftover helper shows "Free", never "Waiting for you".
- Click "Flip badge", then change `status.js`: within 3 s the page updates and the badge stays flipped. An open "Job description" also stays open.

**Self-check**
- [x] Design approved before building: `decision.mjs check` returned approved v2 option B.
- [x] Uses approved colors, fonts, spacing, badge/stamp/shift look: screenshots `.agent-shots/008/builder-*-1280.png` / `-375.png` compared side by side with `design-v2-b-1280.png` / `-375.png`; same layout, colors and wording apart from the header (see below). Every helper still shows its plain-words line on the badge front, with gets/hands over on the back.
- [x] Live states show correctly: checked working, up next, waiting for you, stuck, done, free, parked and finished-round with fake `status.js` files in `/tmp/ao008` (found counts and screenshots `builder-{live,next,you,stuck,fin,idle}-*.png`).
- [x] 375px and 1280px: `overflowPx` 0 and no console errors in all 6 states; text/background pairs checked at 4.78:1 or better (WCAG AA); keyboard focus shows a 3px blue outline (checked with Tab in Playwright); the memo nudge and badge flip run only without reduced motion (`prefers-reduced-motion` media queries, as in the design).
- [x] Nothing broke: a Playwright run on the copy swapped `status.js` while the page was open. The memo updated within 3 s without a reload, a flipped badge stayed flipped, an open job description stayed open, and the finished round showed no "Waiting for you". Parked helpers are explained in the shift hint and the Away tray.

**Not done / unsure**
- Header wording: the card says to keep today's title and header words, so the page still says "Agent Crew Board" / "agent-crew · crew board" / "Your AI build crew" and today's intro sentence, in the approved style. The prototype shows "Agent Office" / "Staff board · agent-office" and a badge-specific intro. Changing them is a one-line follow-up if the owner wants the prototype's words.
- Left out because they are prototype-only: the "Try a state" switcher and "The badge kit" specimen section (the card puts the specimen in the Designer's prototypes, not in the app). The footer keeps today's note (including `npm run dashboard`) instead of the prototype's "the real page re-checks..." line.
- Kept two existing behaviours where the prototype's copied logic differed: (1) `nextUp()` still skips a helper who is waiting for you (task 009); (2) "Up next" still wins over an earlier "Done" from the same round, as on the old cards. The prototype showed the Tester as "Done" in that case.
- The memo has an approved new "stuck" message (shown only when nobody is working, nobody is waiting for you and a helper failed). Before, that case read "A round is running... between helpers."
- The Away tray hides itself if no helper is parked (the prototype always has two). The badge's "Read its instructions" panel is now the prototype's "Job description" dialog.

## Tester notes

> **In short:** Passed. The crew page now looks like the badge wall you approved: pinned memo, "Today's shift" tags, ID badges with rubber stamps, and an Away tray for Scout and Checker. All live states show correctly and nothing broke.

**Checks**
- [x] 2 or 3 directions shown by the Designer (office-like and badge-like): v1 had 3 directions, v2 kept the badge wall after your changes; `decision.md` records the approval (see the Design section)
- [x] Specimen and real-page states in the prototype: the "badge kit" section and the state switcher exist in `design/008-design-system/v2/option-b.html` (`.agent-shots/008/proto-*-1280.png`)
- [x] Owner approved one direction: `decision.mjs check` returned approved v2 option B
- [x] Built page uses the approved colors, fonts, spacing, badge, stamp, shift and memo look; every helper shows its plain-words line; all 6 prototype states (live, working+next, waiting for you, stuck, finished, idle) tested with the prototype's own status data, and stamps/memo wording match (`.agent-shots/008/built-*-1280.png`, `-375.png`)
- [x] 375px and 1280px: sideways overflow 0 in all 12 runs, no console errors, text contrast 4.7:1 or better (sampled), 3px blue keyboard focus on buttons, no animations with reduced motion
- [x] Nothing broke: swapping `status.js` while the page was open updated the memo within 4 s, a flipped badge and an open job description both stayed as they were, a finished round with a leftover "waiting" entry shows "Free" and no "Waiting for you", parked helpers are explained in the shift hint and the Away tray

**Scope:** OK (only `index.html` and this card changed; `status.js`, `team.js`, `agents.generated.js` untouched)
**Design match:** OK (approved: v2 option B). Differences are only the header words (kept as today's, as the card requires) and the prototype-only "Try a state" switcher and badge kit, which the card says stay out of the page.
**Nothing broke:** OK

**Noted for later**
- The Team lead badge shows its status twice, as a stamp ("Running a round") and again as "Working on: Passing work along the shift"
- Dark mode was dropped (the approved design is light only): owners using a dark system theme now get the light page

_Screenshots are local only (`.agent-shots/008/`) and are deleted automatically after a while; these notes are the lasting record._
