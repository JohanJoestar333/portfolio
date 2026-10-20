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
    title: 'QA Cart',
    tag: 'Manual testing · Playwright practice · Jira',
    description:
      'A small online store I built to be tested like a real product. I ran the project the way a company would: every change started as a Jira ticket, got its own branch and pull request, and was checked on a preview before it reached production.',
    highlights: [
      'Full shopping flow to test: login, catalog, cart, checkout, and order confirmation',
      'Clear rules to design tests against: login validation, access control for signed-out visitors, stock limits, and price math (10% tax, $0 shipping)',
      'Predictable test data and a one-click reset, plus a data-testid on every element worth asserting',
      'Separate staging and production environments, with every change verified on its Vercel preview first',
    ],
    workflow: {
      title: 'How I worked on it',
      steps: [
        { title: 'Jira ticket', text: 'Each change starts as a ticket.' },
        { title: 'Feature branch', text: 'One branch per ticket.' },
        { title: 'Pull request', text: 'Opened into staging, with a preview to check.' },
        { title: 'Test on preview', text: 'I verify the change before it merges.' },
        { title: 'Staging', text: 'Verified again on the staging deployment.' },
        { title: 'Production', text: 'A final pull request publishes to main.' },
      ],
    },
    stack: ['Jira', 'React', 'TypeScript', 'Vite', 'GitHub', 'Vercel'],
    links: [
      { label: 'Try the live demo', href: 'https://qa-project-automation.vercel.app' },
      { label: 'View on GitHub', href: 'https://github.com/JohanJoestar333/qa-project' },
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
