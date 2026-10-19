# 001: Show who is up next

Status: ready

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
