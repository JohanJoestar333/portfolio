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
    tag: 'QA in real life · Jira · Confluence',
    description:
      'Ever wondered what QA looks like day to day? PixelCart is a demo store with the whole process built around it: stories and bugs in Jira, test cases in Confluence, and every change checked before it ships. I hid 3 bugs in it on purpose, then found them and logged them the way I would at work.',
    stats: [
      { value: '127', label: 'test cases in Confluence' },
      { value: '5', label: 'Jira epics' },
      { value: '3', label: 'bugs hidden on purpose' },
    ],
    workflow: {
      title: 'How a change moves through the project',
      steps: [
        { tool: 'Jira', title: 'Story', text: 'Written with acceptance criteria and a test priority.' },
        { tool: 'Confluence', title: 'Test cases', text: 'Written before any code, one page per module.' },
        { tool: 'GitHub', title: 'Build', text: 'A pull request, with the preview link posted on the Jira ticket.' },
        { tool: 'Jira', title: 'Test and report', text: 'Every failure becomes a bug with steps and a screenshot.' },
        { tool: 'GitHub', title: 'Release', text: 'Regression on staging, then production. Story marked Done.' },
      ],
    },
    flow: {
      title: 'My Jira board',
      caption: 'Every story moves through these 8 statuses.',
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
    links: [
      { label: 'Try the live demo', href: 'https://qa-project-automation.vercel.app' },
      { label: 'See the full project', href: 'https://github.com/JohanJoestar333/qa-project' },
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
