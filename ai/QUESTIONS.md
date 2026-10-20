# Questions for the owner

The Planner asks here when VISION.md leaves a choice open that isn't about looks (looks go to the Designer as directions).
Write your answer under each question. Nothing below blocks the current task.

## 1. Should you be able to give an agent work from the page, or only watch? (asked 2026-10-20)
From VISION.md's open questions. It decides whether the page gets buttons or a form, and how it would talk to the crew.
- **A. Only watch** (for now). The page stays a window into the crew; you start work with `/round` as today.
- **B. Start a round from the page**: one button that does what `/round` does.
- **C. Give a specific agent a specific job** from its card (a text box per agent).

**Recommendation: A for now.** The page is plain HTML with no server that can run Claude Code, so B or C need new, riskier plumbing. Watching well is what the Must haves ask for. B can come later as one small step.

Answer:

## 2. Should the page show history (past work each agent did), or only the present? (asked 2026-10-20)
From VISION.md's open questions.
- **A. Only the present** (as today).
- **B. A short "last few tasks" list**, read from the finished task cards in `ai/tasks/` and `ai/LOG.md`.
- **C. A full history per agent**, with every round it took part in.

**Recommendation: B.** The log of finished tasks already exists, so a short list is cheap and helps a beginner see what the crew has actually done. C needs new data the crew doesn't record yet.

Answer:
