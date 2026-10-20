// Plain-English description of each agent, shown on the dashboard.
// `file` matches .claude/agents/<file>.md; tools and model are read from there by scripts/build-dashboard.mjs.
// depth: 1 = draft, 2 = usable, 3 = solid, 4 = expert. `missing` is what keeps it from the next level.
window.TEAM = [
  {
    file: 'team-lead',
    nickname: 'Team lead',
    color: '#4338ca',
    oneLine: 'Runs the crew task after task when you type /round, and stops when it needs you.',
    gets: 'Your /round command and the project',
    gives: 'Finished, tested, saved tasks, plus designs waiting for your decision',
    depth: 2,
    missing: [
      'Not run yet: first real run is on Agent Office',
      'Only runs while this app is open; no scheduled runs yet',
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
      'Marks which tasks need your design approval; the "design system first" rule hasn\'t run for real yet',
    ],
  },
  {
    file: 'designer',
    nickname: 'Designer',
    color: '#be185d',
    oneLine: 'Shows you clickable designs before anything is built, and waits for your yes.',
    gets: 'A visual task, plus your feedback on earlier versions',
    gives: '1 to 3 clickable designs on a review page for you to approve',
    depth: 2,
    missing: [
      'Not tested yet: first job is the design system for Agent Office',
      'Needs the Team lead to show you its work and record your answer (coming next)',
    ],
  },
  {
    file: 'builder',
    nickname: 'Builder',
    color: '#b45309',
    oneLine: 'Writes the code for one task, checks it, and leaves notes on what changed.',
    gets: 'One task card from the Planner',
    gives: 'Changed code plus notes on how to see it',
    depth: 2,
    missing: [
      'Waits for your design approval and checks its work in a browser; not yet run on a real designed task',
    ],
  },
  {
    file: 'tester',
    nickname: 'Tester',
    color: '#15803d',
    oneLine: 'Opens the real page, checks every item on the task, and saves the work if it passes.',
    gets: 'The built task and its checklist',
    gives: 'Passed (work saved) or failed (sent back with exact fixes)',
    depth: 2,
    missing: [
      'Now checks the build matches your approved design; not yet used on a real designed task',
      'Only checks how pages look and react to data; can\'t click through flows yet',
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
window.RELAY = ['innovation', 'planner', 'designer', 'builder', 'tester', 'code-reviewer'];
