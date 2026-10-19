// Plain-English description of each agent, shown on the dashboard.
// `file` matches .claude/agents/<file>.md; tools and model are read from there by scripts/build-dashboard.mjs.
// depth: 1 = draft, 2 = usable, 3 = solid, 4 = expert. `missing` is what keeps it from the next level.
window.TEAM = [
  {
    file: 'orchestrator',
    nickname: 'Team lead',
    color: '#4338ca',
    oneLine: 'Runs a round from start to finish and decides who works next.',
    gets: 'Your goal and the project folder',
    gives: 'One finished, tested, committed improvement',
    depth: 1,
    missing: [
      'Only knows one hard-coded project; can\'t be pointed at any folder yet',
      'No budget or time limit per round',
      'Doesn\'t write live status for this dashboard yet',
    ],
  },
  {
    file: 'innovation',
    nickname: 'Scout',
    color: '#0e7490',
    oneLine: 'Looks around for fresh ideas worth building.',
    gets: 'Your vision and what already exists',
    gives: '3 new ideas added to the to-do list',
    depth: 1,
    missing: [
      'No rules for judging if an idea is good or doable',
      'Doesn\'t remember ideas you already rejected',
    ],
  },
  {
    file: 'planner',
    nickname: 'Planner',
    color: '#7c3aed',
    oneLine: 'Picks the single most useful next task and writes down what "done" means.',
    gets: 'Your vision, the to-do list, past tasks, the project files',
    gives: 'One task card with a "done when" checklist',
    depth: 2,
    missing: [
      'Not tested yet: we run it on Agents Office next',
      'Scoring rules are a first guess; we tune them after seeing real results',
    ],
  },
  {
    file: 'designer',
    nickname: 'Designer',
    color: '#be185d',
    oneLine: 'Decides how it should look and feel before anything is built.',
    gets: 'The task and screenshots of the current site',
    gives: 'A short, exact design brief (fonts, colors, spacing)',
    depth: 1,
    missing: [
      'No design system or taste references of its own',
      'Can\'t check the built result against its own brief',
    ],
  },
  {
    file: 'developer',
    nickname: 'Builder',
    color: '#b45309',
    oneLine: 'Writes the code and the tests for the task.',
    gets: 'The task and the design brief',
    gives: 'Changed code plus a test that proves it works',
    depth: 1,
    missing: [
      'Assumes plain HTML only; doesn\'t adapt to React, three.js projects, etc.',
      'No step to read and understand an unfamiliar codebase first',
    ],
  },
  {
    file: 'qa',
    nickname: 'Tester',
    color: '#15803d',
    oneLine: 'Opens the real site, clicks around, takes screenshots, measures speed.',
    gets: 'The finished change and its checklist',
    gives: 'Pass or fail, with what broke and how to repeat it',
    depth: 1,
    missing: [
      'Test setup was tied to one site and has been removed',
      'No checks for links, forms or 3D scenes yet',
    ],
  },
  {
    file: 'code-reviewer',
    nickname: 'Checker',
    color: '#334155',
    oneLine: 'Reads the code changes like a senior engineer before they are saved.',
    gets: 'The list of code changes',
    gives: 'Approve, or a numbered list of fixes',
    depth: 2,
    missing: [
      'Same checklist for every kind of project',
      'Doesn\'t track repeat mistakes to teach the Builder',
    ],
  },
];

// Order work is handed along in one round. The team lead coordinates all of them.
window.RELAY = ['innovation', 'planner', 'designer', 'developer', 'qa', 'code-reviewer'];
