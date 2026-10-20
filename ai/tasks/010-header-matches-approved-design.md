# 010: Make the page's header and title match the approved design

Status: passed
Needs design: no
Big change: no

> **In short:** The top of the page and the browser tab will use the same name and words as the badge-wall design you approved, instead of the old "crew board" wording that still says "Seven helpers".
> **Why:** You asked for it, and the page's name at the top is the first thing anyone reads.

## Goal
The page's header (small label, big title, intro sentence) and the browser tab title read exactly as in the owner's approved prototype.

## Why now
The owner asked for this directly. VISION.md calls the product "Agent Office" and asks that it be understandable at a glance; today the header still reads like the old crew board and says "Seven helpers" although two are parked. The look itself was already approved in 008 (`design/008-design-system/decision.md`: "Approved: v2, option B"), so no new design is needed. Score: V2 E1 R1 = 2, bug +2 = 4.

## Done when
- [ ] The small label above the title, the big title and the intro sentence under it read exactly as in `design/008-design-system/v2/option-b.html` (its `<header class="top">`), word for word
- [ ] The browser tab title is the page name from the prototype's `<title>`, without the prototype's direction label ("B: The badge wall"), which names the design option, not the page
- [ ] The old wording ("Agent Crew Board", "Your AI build crew", "Seven helpers…") no longer appears anywhere on the page or in the tab
- [ ] At 375px and 1280px the header looks like the prototype's header (same fonts, sizes, layout; the memo still sits beside or under the title as before), with no sideways scrolling
- [ ] The memo (top line) still updates live from `status.js`, including turning orange when a helper is waiting for you
- [ ] Nothing that worked before is broken

## Not in this task
- The prototype's state switcher (the row of example states under its header) and "The badge kit" section: they exist only to demo the design, not for the real page
- Any other wording on the page (section hints, footer, badge text)
- The top line saying "waiting" twice, and the other backlog items
- Changing colors, fonts or spacing beyond what the header needs to match the prototype

## Files likely touched
- `index.html`: the `<title>` and the text inside `<header class="top">`

## Notes for the Builder
- The approved prototype decides the wording; copy it from `design/008-design-system/v2/option-b.html` (lines ~6 and ~219–226). Don't write your own.
- The header markup and CSS (`.top`, `.kicker`, `h1`, `.lede`, `.memo`) are already the same as the prototype's; the difference is the text. One small CSS difference: `.top` has `margin-bottom: var(--s6)` on the page and `var(--s5)` in the prototype, because the prototype's switcher sits right under its header. Keep the page's value unless the gap visibly differs from the prototype's header-to-content gap.
- `status.js` is written live by the crew and git-ignored; test with a copy, never edit it. `team.js` and `agents.generated.js` are data files; don't touch them.

## Builder notes

> **In short:** The top of the page now reads "Staff board · agent-office", then the big title "Agent Office", then "Every AI employee has a badge. The stamp tells you what they are doing; flip a badge to see the details.", exactly as in the approved design, and the browser tab now says "Agent Office".

**Changed**
- `index.html`: tab title, small label, big title and intro sentence changed to the approved prototype's wording (4 lines of text, no CSS changes).

**How to see it**
Open `index.html` (or the dashboard). Look at the top-left text and the browser tab. To see the orange memo, use a copy of the page whose `status.js` has a helper with `"state": "waiting"`: the top-right memo turns orange with "For you · Please answer".

**Self-check**
- [x] Label, title and intro match `option-b.html` word for word: copied from the prototype's `<header class="top">`; browser check finds "Staff board" and "Every AI employee has a badge" once each.
- [x] Tab title is "Agent Office" (no "B: The badge wall"): browser check reports title "Agent Office" at both widths.
- [x] Old wording gone: browser check finds "Crew Board", "build crew", "Seven helpers" 0 times; grep finds them nowhere in index.html.
- [x] Header looks like the prototype at 1280px and 375px, no sideways scroll: compared screenshots `.agent-shots/010/builder-waiting-*.png` with `proto-*.png`; overflowPx 0 at both widths. Kept `.top` margin at `--s6`: the gap to "Today's shift" looks right since the prototype's extra space comes from its demo switcher.
- [x] Memo still updates live and turns orange when waiting: tested on a copy in /tmp with the Builder set to "waiting"; memo showed "For you · Please answer" in orange. Live `status.js` was not touched.
- [x] Nothing broken: no console errors at either width, live page renders as before apart from the header text.

**Not done / unsure**
- Nothing.

## Tester notes

> **In short:** Passed. The top of the page and the browser tab now read exactly like the badge-wall design you approved ("Staff board · agent-office", "Agent Office", "Every AI employee has a badge..."), and the old crew-board wording is gone.

**Checks**
- [x] Label, title and intro match the prototype word for word: side by side with the prototype at 1280px and 375px, identical text, fonts, sizes, layout (`.agent-shots/010/built-1280.png`, `design-approved-1280.png`, `built-375.png`, `design-approved-375.png`)
- [x] Tab title is "Agent Office" without "B: The badge wall": browser reported "Agent Office" at both widths
- [x] Old wording gone: "Crew Board", "build crew", "Seven helpers", "badge wall" found 0 times at both widths
- [x] Header looks like the prototype at 375px and 1280px, no sideways scrolling: overflowPx 0 at both widths; memo sits at the top right (desktop) and under the title (phone) as in the prototype
- [x] Memo updates live and turns orange when waiting: on a /tmp copy with a helper set to "waiting" the memo showed "For you · Please answer" in orange-red (`/tmp/ao-copy/.agent-shots/010/x-1280.png`); live status.js untouched
- [x] Nothing broke: no console errors at either width, rest of the page identical to before

**Scope:** OK (only `index.html` changed, plus the card and the Planner's `ai/BACKLOG.md`; nothing from "Not in this task" done)
**Design match:** OK (approved: v2 option B; note `decision.mjs check` for 010 reports no design step, so the comparison was done against the 008 prototype as the Team lead asked; prototype-only switcher and badge kit left out as allowed)
**Nothing broke:** OK

**Noted for later**
- Nothing

_Screenshots are local only (`.agent-shots/010/`) and are deleted automatically after a while; these notes are the lasting record._
