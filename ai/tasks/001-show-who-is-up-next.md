# 001: Show who is up next

Status: ready

## Goal
While an agent is working, you can see which agent gets the work next and what that agent will hand over, without reading any instructions.

## Why now
VISION.md "Must have": "You can see what each agent is doing right now, and what it will do next." The page already shows what each agent is doing now, but nothing on it says what comes next. Score: V3 E1 R1 = 4 (the highest).

## Done when
- [ ] With the current `status.js` (Planner working), the top of the page shows a line like "Up next: Builder, who will give: Changed code plus a test that proves it works." The name and the "gives" text come from `team.js`.
- [ ] The Builder's card has an "Up next" label in place of "Waiting", and it looks different from both "Waiting" and "Working" (for example, its own dot color). The Builder's station on the relay track is marked the same way.
- [ ] Parked agents are skipped: if you temporarily set the Scout (`innovation`) to working in `status.js`, the Planner is "Up next", not a parked agent.
- [ ] If the last active agent on the relay (today that is the Tester, `qa`) is working, the top line says something like "Up next: the change is saved and the round ends." No card is marked "Up next".
- [ ] When nobody is working (empty `agents` in `status.js`), nothing on the page says "Up next".
- [ ] At phone width (375px) the "Up next" line and label wrap cleanly, with no sideways scrolling.
- [ ] Nothing that worked before is broken: the cards, relay track and "is working" line still show, and changing `status.js` still updates the page within a few seconds without a reload.

## Not in this task
- A per-agent "what I will do next" text written by the runs (it would need a new field in `status.js`, which nothing writes yet).
- Showing the "goes back to the Builder" loop when the Tester finds a problem.
- Any office look, badges, history, or a way to give agents work (open questions in VISION.md).
- Fixing the wrong footer note (`dashboard/status.js`, `npm run dashboard`); that is a separate backlog item.
- Any change to `agents.generated.js` or `team.js`.

## Files likely touched
- `index.html`: work out the next agent, show the "Up next" line under the header's "is working" line, add an "Up next" state to cards and relay stations.

## Notes for the Builder
- The relay order is `window.RELAY` in `team.js`: `innovation, planner, designer, developer, qa, code-reviewer`. The team lead (`orchestrator`) is not on the relay; if it is the one working, show no "Up next".
- "Parked" comes from `window.AGENTS[file].parked` in `agents.generated.js`. Today `innovation`, `designer`, `code-reviewer` and `orchestrator` are parked, so after the Planner the next active agent is the Builder (`developer`), and the Tester (`qa`) is the last active one.
- Rule: next = the first agent after the working one in `RELAY` that is not parked. If there is none, the round ends.
- The existing `state(file)` helper returns `parked` before checking status, and `renderNow()` already finds the working agent; reuse these. `STATE_WORDS` holds the pill words; the dot colors are set by `[data-state="..."] .dot` rules, with tokens in `:root` (add one token for "next", plus its dark-mode value if needed).
- `render()` runs again whenever `status.js` changes, so the new parts just need to be part of it.
- To test, edit `status.js` by hand and put it back to the original line afterwards. It is a data file the runs write to: do not leave changes in it.
