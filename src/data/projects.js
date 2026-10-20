// The Projects section: a short intro plus one card per project.

export const projectsIntro = {
  title: 'Projects',
  description:
    'Hands-on QA work beyond this site: the artifacts I build to plan, run, and report on testing.',
}

// ---------------------------------------------------------------------------
// HOW TO ADD A PROJECT
// Copy the block below to the END of the `projects` array and fill it in.
// Keep the comma after the closing brace:
//
//   {
//     title: 'Project name',
//     tag: 'Manual testing',                 // optional — small label above the title
//     description: 'One or two sentences on what it is and why it exists.',
//     highlights: ['What it includes', 'Another point'], // optional bullets
//     workflow: {                            // optional — numbered "how I worked" steps
//       title: 'How I worked on it',
//       steps: [{ title: 'Step name', text: 'One short line.' }],
//     },
//     stats: [{ value: '127', label: 'test cases' }],   // optional — big numbers row
//     flow: { title: 'Status flow', items: ['To Do', 'Done'] }, // optional — arrow chain
//     findings: {                            // optional — short list of bugs found
//       title: 'Bugs I found',
//       items: [{ label: 'TC-001', text: 'What went wrong.' }],
//     },
//     stack: ['Excel', 'Trello'],            // optional — small tags
//     links: [                               // optional — buttons on the card
//       { label: 'Download workbook', href: '/projects/your-file.xlsx', download: true },
//       { label: 'View on GitHub', href: 'https://…' },
//     ],
//   },
//
// Files for download live in public/projects/. To remove a project, delete
// its object. Order here is the display order.
// ---------------------------------------------------------------------------
export const projects = [
  {
    title: 'PixelCart',
    tag: 'QA workflow · Jira · Confluence · Manual testing',
    description:
      'A small clothing store I built so I could run QA the way it works on a real team. The store is only the system under test. The project is everything around it: Jira stories, test cases written before coding, pull requests, bug reports, and releases through staging to production.',
    stats: [
      { value: '127', label: 'manual test cases (93 positive, 34 negative)' },
      { value: '8', label: 'modules covered' },
      { value: '5', label: 'Jira epics' },
      { value: '3', label: 'real bugs found' },
    ],
    highlights: [
      'Test cases written in Confluence before any code, by module, in Given / When / Then format with severity and exact expected results',
      'A Jira Scrum board with two-week sprints, [DEV] / [TEST] / [DOCS] subtasks, and test priority labels, with acceptance criteria on every story',
      'A 22-step end-to-end regression scenario (TC-REG-001), run on staging before release',
      'Every failure becomes a Jira bug with the test case ID, steps, expected and actual results, and a screenshot',
      'A GitHub Action that posts each Vercel preview link on its Jira story, so testing starts from the ticket',
    ],
    workflow: {
      title: 'A change, from story to production',
      steps: [
        { title: 'Story in Jira', text: 'Acceptance criteria, priority, story points, and a test priority label.' },
        { title: 'Test cases first', text: 'Written or updated in Confluence before coding starts.' },
        { title: 'Branch and PR', text: 'A feature branch off staging, with the Jira key in the PR title.' },
        { title: 'Preview built', text: 'The preview link lands on the story, which moves to Ready To Test.' },
        { title: 'Test the preview', text: 'I run the cases. Anything that fails becomes a bug.' },
        { title: 'Staging regression', text: 'Merged to staging, then the full regression runs.' },
        { title: 'Production', text: 'Staging merges to main and the story is marked Done.' },
      ],
    },
    flow: {
      title: 'Jira status flow',
      items: [
        'To Do',
        'In Development',
        'Code Review',
        'Ready To Test',
        'Ready for Staging',
        'Test in Staging',
        'Ready for production',
        'Done',
      ],
    },
    findings: {
      title: 'Bugs I found along the way',
      items: [
        { label: 'TC-CHK-010', text: 'Stock is stored per browser tab, so two tabs can both buy the last units.' },
        { label: 'Price format', text: 'A price of $1,999.50 shows as $1999.50, with no thousands separator.' },
        { label: 'Dark mode', text: 'The black color swatch is almost invisible on the dark background.' },
      ],
    },
    stack: ['Jira', 'Confluence', 'Test case design', 'Regression testing', 'Bug reporting', 'GitHub', 'Vercel'],
    links: [
      { label: 'Try the live demo', href: 'https://qa-project-automation.vercel.app' },
      { label: 'Read the full README', href: 'https://github.com/JohanJoestar333/qa-project' },
    ],
  },
  {
    title: 'QA Test Case Workbook',
    tag: 'Manual testing · Excel',
    description:
      'A reusable Excel template to document test cases and bugs, built for job interviews and personal projects. Write a test, run it, record the result, and the dashboard keeps score. No macros, nothing to install.',
    highlights: [
      '46 sample manual test cases written against a public demo store (search, account creation, cart, ordering, cross-browser)',
      'Dropdowns for module, test type, priority, status, and severity, so entries stay consistent',
      'Dashboard with totals, pass rate, progress, and results by module',
      'Given / When / Then scenario for each case, plus an Instructions sheet to get started',
    ],
    stack: ['Excel', 'Test case design', 'Bug reporting'],
    links: [
      {
        label: 'Download workbook',
        href: '/projects/QA-Test-Case-Workbook.xlsx',
        download: true,
      },
    ],
  },
]
