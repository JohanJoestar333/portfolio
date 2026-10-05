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
