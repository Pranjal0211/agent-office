# 001: Show who is up next

Status: passed

> **In short:** While one helper is working, the page will also tell you who gets the work after it, both in the "who's working" line at the top and on that next helper's card.
> **Why:** "See what will happen next" is one of the three must-haves, and right now the page shows nothing about it.

## Goal
While an agent is working, you can see which agent will take over next and what it will receive.

## Why now
VISION.md "Must have": "You can see what each agent is doing right now, and what it will do next." The "right now" part exists; "next" is missing entirely. Score: V3 E1 R2 = 3.

## Done when
- [ ] With `status.js` set so the Planner is `working` (as it is now), the top status line reads like "Planner is working on Agents Office. Next up: Builder." (the next agent's nickname, not its file name).
- [ ] The next agent's card shows the label "Up next" in its status pill (instead of "Waiting"), and a short line saying what it will get, using that agent's existing "Gets" text from the team data (e.g. "Will get: The task and the design brief").
- [ ] Parked agents are skipped when picking who is next: with the Planner working, "next" is the Builder, not the parked Designer.
- [ ] If the working agent is the last non-parked agent in the relay (e.g. the Tester, since the Checker is parked), no agent is marked "Up next" and the top line shows only who is working (no "Next up:" text, no error in the console).
- [ ] With nobody working (all states removed from `status.js`), the page looks exactly as it does today: no "Up next" anywhere.
- [ ] At phone width (375px) the top line wraps cleanly with no sideways scrolling, and the "Up next" pill fits in the card header.
- [ ] Nothing that worked before is broken (live re-check every few seconds still updates the page; relay track, cards and details still render).

## Not in this task
- Showing "next" when nobody is working (e.g. "next round starts with the Planner").
- The "goes back to the Builder if the Tester finds a problem" loop.
- A per-agent "next step" text written by the run into `status.js` (a possible later upgrade).
- Changing the relay track's look, or the colors of other states.
- Fixing the details panels that close on status changes (separate backlog item).

## Files likely touched
- `index.html`: work out the next agent; use it in `renderNow()` and `renderCards()`; add an "Up next" state word and dot color.

## Notes for the Builder
- Order comes from `window.RELAY` in `team.js` (`innovation, planner, designer, developer, qa, code-reviewer`). The team lead (`orchestrator`) is not in the relay and should never be "next".
- "Parked" comes from `window.AGENTS[file].parked` (already used by `state()`). Today `innovation`, `designer`, `code-reviewer`, `orchestrator` are parked. Skipping parked agents is an inference (a parked agent can't take work), not stated by the owner; keep the skip logic in one small helper so it is easy to change.
- Use the first `working` agent that is in `RELAY`; the next agent is the first non-parked agent after it in `RELAY`.
- Nickname and "gets" text come from `window.TEAM` (`nickname`, `gets`). Don't edit `team.js`, `status.js` or `agents.generated.js`; to test other cases, temporarily change `status.js` and put it back afterwards.
- Existing pill markup: `<span class="pill"><span class="dot"></span>${STATE_WORDS[s]}</span>` driven by the card's `data-state`. A new `data-state="next"` plus a `STATE_WORDS.next = 'Up next'` and a dot color is the smallest change; keep the existing `--working` etc. colors unchanged.
- Escape any text you insert with the existing `esc()` helper.

## Builder notes

> **In short:** While a helper is working, the line at the top now also says who takes over next (for example "Next up: Builder."), and that helper's card shows a blue "Up next" label plus a line saying what it will get. Parked helpers are skipped, and when nobody is working the page looks exactly as before.

**Changed**
- `index.html`: added a `--next` blue color token (light and dark) and its dot color; added `'Up next'` to the state words.
- `index.html`: added one small helper, `canTakeWork()` (skips parked agents) plus `nextUp()` (first working agent in `RELAY`, then the first agent after it that can take work).
- `index.html`: `renderCards()` gives the next agent `data-state="next"` and shows "Will get: <its Gets text>" in the existing grey "doing" box; `renderNow()` adds " Next up: <nickname>." to the top line when there is a next agent.

**How to see it**
Note: `status.js` today has nobody working (`agents: {}`), not the Planner as the card says. To see each case, edit `status.js`, wait about 3 seconds (or refresh), then put it back to `window.STATUS = { run: null, agents: {} };`.
1. `window.STATUS = { run: { project: 'Agents Office' }, agents: { planner: { state: 'working' } } };` → top line: "Planner is working on Agents Office. Next up: Builder." Builder card pill: blue dot, "Up next"; grey box: "Will get: One task card from the Planner". The Designer stays "Parked".
2. Same but `qa` working → top line: "Tester is working on Agents Office." with no "Next up"; no card says "Up next".
3. Original `status.js` → page as before, no "Up next" anywhere.
4. Repeat case 1 at 375px wide: check the top line wraps and the pill fits in the Builder card header.

**Self-check**
- [x] Top line with Planner working: I ran the page script in Node against the real `team.js`/`agents.generated.js` with the case-1 status (in memory). Output: "Planner is working on Agents Office. Next up: Builder."
- [x] "Up next" pill and "Will get" line on the next card: the same run showed only the Builder card with `data-state="next"`, "Up next" and "Will get: One task card from the Planner".
- [x] Parked agents skipped: with the Planner working, next is the Builder, not the Designer (same run).
- [x] Last non-parked agent (Tester) working: no "Next up" text and no "Up next" card. The code has no error path (`byFile[null]` is simply undefined).
- [x] Nobody working: page output is byte-identical (same hash) to the original `index.html` for the current `status.js`.
- [ ] 375px layout: not checked. I couldn't open the page with its scripts in a browser here. The pill only grows from "Waiting" to "Up next" (`flex: none`, next to a `min-width: 0` name block), and the top line's text is a normal wrapping span, so it should fit. The Tester should check visually, including how the rounded "now" bubble looks on two lines.
- [x] Nothing broken: the re-check timer, relay track and details are untouched (diff shows only the lines listed above). `status.js` was never edited (diff against the copy confirms this). Live re-render in a real browser: not checked.

**Not done / unsure**
- The card said the Planner is working in `status.js` "as it is now", but `status.js` currently has nobody working. I left it as is.
- If the next agent is already "done" or "stuck" (for example on a re-run), it still shows "Up next" because it is about to get work again. It only keeps "Working" if it is also working.
- The top line still names the first working agent in team order (existing behaviour). "Next" is based on the first working agent in the relay order, as the card says. These only differ if the Team lead is also marked working.

## Tester notes

> **In short:** Passed. While a helper is working, the top line now says who is next (for example "Planner is working on Agents Office. Next up: Builder."), and the next helper's card shows a blue "Up next" label with what it will get. Nothing else on the page changed.

**Checks**
- [x] Planner working: top line reads "Planner is working on Agents Office. Next up: Builder." (`ai/shots/001/planner-working-1280.png`)
- [x] Builder card pill says "Up next" (blue dot) with "Will get: One task card from the Planner" (`ai/shots/001/planner-working-1280.png`)
- [x] Parked agents skipped: Designer stays "Parked", Builder is next (same screenshot)
- [x] Tester working (last non-parked): top line "Tester is working on Agents Office." with no "Next up"; "Up next" found 0 times; no console errors (`ai/shots/001/tester-working-1280.png`)
- [x] Nobody working (original status.js): no "Up next", "Next up" or "Will get" anywhere, no errors (`ai/shots/001/normal-1280.png`)
- [x] 375px: top line wraps onto two lines, no sideways scrolling (overflow 0), "Up next" pill fits in the Builder card header (`ai/shots/001/planner-working-375.png`)
- [x] Nothing broke: no console errors at either width in any case; relay track, cards and details render; dark mode with Builder working also fine (`ai/shots/001/builder-working-1280.png`). Live re-check timer code is untouched; I did not watch a live refresh.

**Scope:** OK. Only `index.html` and the task card changed; status.js was edited temporarily and restored (git shows no change).
**Nothing broke:** OK

**Noted for later**
- Nothing
