# Agent Office: vision

> Written by the human. Agents read this; they never edit it.

## The idea
Agent Office is a virtual office where AI agents work as your employees, powered by Claude Code.
Imagine having your own company, except your employees are AI agents.

## Who it's for
The owner: someone new to AI agents who wants to see, at a glance and in plain words,
who their agents are, what each one does, and what they are doing right now.

## Must have
- Every agent is visible, with what it does in easy words
- You can see what each agent is doing right now, and what it will do next
- Understandable at a glance by a beginner

## Where it starts
Today it is a simple "crew board" page (`index.html`): agent cards, a relay track showing the
order work is passed along, and live status read from `status.js`.
Agent data comes from the `agent-crew` repo (`agents.generated.js`, `team.js`); don't edit
`agents.generated.js` by hand.

## Rules
- Plain HTML, CSS and JavaScript. No build step. Runs with `node serve.mjs`.
- Nothing personal is invented; no tracking, no secrets.

## Open questions (the owner hasn't decided yet)
- How "office-like" should it look: a literal office floor plan with desks, or cards styled as employee badges?
- Should you be able to give an agent work from the page, or only watch?
- Should it show history (past work each agent did), or only the present?
