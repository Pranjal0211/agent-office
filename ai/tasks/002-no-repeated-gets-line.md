# 002: Stop repeating what the next helper gets

Status: passed
Needs design: no
Big change: no

> **In short:** The card of the helper who is up next will say what it gets only once, instead of showing the same words twice, one above the other.
> **Why:** You spotted this repeat yourself when reviewing task 001. It looks like a mistake, and a repeated line is the kind of thing that makes a beginner wonder what they missed.

## Goal
On the "Up next" card, what the helper will receive is shown once, not twice.

## Why now
VISION.md "Must have": "Understandable at a glance by a beginner". The owner found this after task 001 passed (the Tester missed it), so it is a visible bug. Score: V2 E1 R1 = 2, bug +2 = 4.

## Done when
- [ ] With `status.js` set so the Planner is `working` (with no `doing` text for the Builder), the Builder card shows the "Up next" pill and its "Gets" line ("One task card from the Planner") exactly once on the card; the words "Will get:" appear nowhere on the page.
- [ ] On that Builder card there is no empty grey box left behind where the "Will get" line used to be.
- [ ] The top line still reads "Planner is working on agent-office. Next up: Builder." (project name as written in `status.js`), and the Designer still shows "Parked".
- [ ] If `status.js` gives the up-next helper its own `doing` text (for example `builder: { doing: 'Getting ready' }` while the Planner is working), that text still shows in the grey box on its card.
- [ ] Working, waiting, done, stuck and parked cards look exactly as before (only the "Up next" card changes), at 1280px and at phone width (375px), with no sideways scrolling.
- [ ] Nothing that worked before is broken (live re-check still updates the page; no console errors; relay track, cards and details still render).

## Not in this task
- Fixing the "What's missing" / "Read its instructions" panels that close when the live status changes (separate backlog item).
- Adding new wording to the "Up next" card (for example "Takes over after the Planner"). Keep it to removing the repeat.
- Changing the "Up next" pill, its blue color, or how "next" is worked out.
- Removing or rewording the "Gets" / "Gives" lines on any card.

## Files likely touched
- `index.html`: in `renderCards()`, stop filling the grey `.doing` box with `Will get: ${t.gets}` for the next agent.

## Notes for the Builder
- The repeat comes from this line in `renderCards()`:
  `<p class="doing">${esc(doing(t.file) || (s === 'next' ? `Will get: ${t.gets}` : ''))}</p>`
  The "Gets" row in the `.flow` list right below it already shows `t.gets`. Showing only `doing(t.file)` is enough; the existing `.doing:empty { display: none; }` rule hides the box when it is empty, so make sure the `<p>` really is empty (no whitespace) in that case.
- Why keep the "Gets" row and drop the "Will get" box: every card keeps the same layout, and no new wording is invented. The "Up next" pill already tells the owner this helper is next.
- `status.js` is written live by the crew and is git-ignored. To test, edit it temporarily and put it back as you found it. Don't edit `team.js` or `agents.generated.js`.
- Escape any text you insert with the existing `esc()` helper.

## Builder notes

> **In short:** The "Up next" helper's card now says what it gets only once (in its "Gets" line), and the grey box that used to repeat it is gone. If that helper has its own status text, the grey box still shows that.

**Changed**
- `index.html`: in `renderCards()`, the grey `.doing` box now shows only the helper's own `doing` text; the "Will get: …" fallback for the up-next helper is removed. When there is no text the `<p>` is truly empty, so `.doing:empty` hides it.

**How to see it**
Heads-up: the Designer is **no longer parked** in `agents.generated.js`, so with only the Planner working the up-next helper is now the **Designer**, not the Builder. That means the card's "Designer still shows Parked" and "Next up: Builder" with only the Planner working can't both be true with today's data (this change doesn't affect them). To see the Builder as up next:
1. In `status.js`, set the Designer to `working` (no `doing` for the Builder) → top line reads "Designer is working on agent-office. Next up: Builder."; the Builder card shows "Up next", its "Gets" line ("One task card from the Planner") once, and no grey box.
2. Add `builder: { doing: 'Getting ready' }` → "Getting ready" appears in the grey box on the Builder card.
3. With only the Planner working → the Designer card shows "Up next", its "Gets" line once, no grey box.

I tested all three on copies of the page in a scratch folder, so the live `status.js` was never touched. Screenshots are in `.agent-shots/002/` (`builder-next-*`, `builder-next-doing-*`, `builder-next-designer-working-*`).

**Self-check**
- [x] Up-next card shows its "Gets" line once, "Will get:" nowhere: `--find "Will get:"` = 0 and "One task card from the Planner" = 1 at 1280px and 375px with the Builder up next (Designer working). Also checked with the Designer up next (Planner working).
- [x] No empty grey box: confirmed in the screenshots (Builder up-next card at 375px, Designer up-next card at 1280px).
- [~] Top line / Designer Parked: with the Designer working, the top line reads "…Next up: Builder." With only the Planner working it reads "Planner is working on agent-office. Next up: Designer.", because the Designer is no longer parked in the data (see above). This change doesn't affect it.
- [x] Up-next helper's own `doing` text still shows: "Getting ready" found once at both widths.
- [x] Other states unchanged: the code path for working, waiting, done, stuck and parked cards is untouched (their `doing` text was never using the fallback). Screenshots show Working, Done ("Picked 002"), Stuck ("Stuck on 001"), Waiting and Parked cards as before. `overflowPx` = 0 at 1280px and 375px.
- [x] Nothing broken: no console or page errors at either width; relay track, cards and details render. The live re-check code is untouched, but I didn't watch it update during a run.

**Not done / unsure**
- The card assumes the Designer is parked. In the current `agents.generated.js` it isn't, so with the Planner working the Designer, not the Builder, is up next. Nothing in this task changes that, so I didn't touch it. The Planner may want to update the card's wording.

## Tester notes

> **In short:** Passed. The "Up next" card now shows what it gets only once, with no leftover grey box; its own status text still shows if it has some. Other cards are unchanged.

**Checks**
- [x] Up-next card shows "Gets" once, "Will get:" nowhere: Designer working, Builder up next: "One task card from the Planner" = 1, "Up next" = 1, "Will get:" = 0 at 1280 and 375 (`.agent-shots/002/A-1280.png`, `A-375.png`). Also Planner working (Designer up next): "Will get:" = 0.
- [x] No empty grey box on the up-next card: none visible in `A-375.png` / `B-1280.png` (Builder card goes straight from description to Gets).
- [x] Top line: reads "Designer is working on agent-office. Next up: Builder." Caveat: the literal wording (Planner working, Designer "Parked") can't be reproduced because the Designer is no longer parked in `agents.generated.js`; the code for this line is untouched, and the Parked state still shows on Scout and Checker.
- [x] Own `doing` text: `builder: { doing: 'Getting ready' }` shows "Getting ready" in the grey box on the Builder card, once, at both widths (`B-1280.png`).
- [x] Other states unchanged: working, done, stuck, waiting, parked cards render as before (their code path is untouched); overflowPx = 0 at 1280 and 375.
- [x] Nothing broke: no console/page errors at either width in any scenario or with the live status; relay track, cards and details render. I did not watch a live re-check update.

**Scope:** OK (only `index.html` changed, one line, plus the card and BACKLOG.md).
**Design match:** no design step
**Nothing broke:** OK

**Noted for later**
- The task card's "Done when" assumed the Designer is parked; it isn't any more (the Planner may want to reword future cards).

_Screenshots are local only (`.agent-shots/002/`) and are deleted automatically after a while; these notes are the lasting record._
