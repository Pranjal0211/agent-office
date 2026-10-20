# 008: Create the design system (the office's look)

Status: changes requested
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
