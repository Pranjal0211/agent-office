// Review data for design/008-design-system/review.html (written by the Designer).
window.REVIEW = {
  task: '008',
  title: 'The look of Agent Office (design system)',
  version: 2,
  model: 'Opus (no approved design system yet)',
  inShort: 'Only the badge wall (B) now, exactly as in v1 and light mode only. Helpers with nothing to do are labelled "Free", so it is never confused with "Waiting for you".',
  question: 'Do you approve the badge wall (B, v2) as the look every future Agent Office screen is built on?',
  changes: [
    'Kept only B, the badge wall, as you chose; A (office floor) and C (lobby screen) are dropped',
    'Stays light only, as shown; no dark version added',
    'Helpers with nothing to do say "Free" everywhere, and their explanation now reads "Nothing to do right now; ready for the next job" (no more "waiting for work")',
    'Everything else is the same as v1',
  ],
  history: [
    { version: 1, feedback: 'Approve B. Light/dark: No, as shown. Idle label: Yes, say "Free" (Recommended)' },
  ],
  options: [
    { id: 'B', name: 'The badge wall', idea: 'Each helper is an employee ID badge on a lanyard with a rubber-stamp status; flip a badge for details. A "Today\'s shift" line shows the order of work, and parked helpers sit in an Away tray.', file: 'v2/option-b.html' },
  ],
};
