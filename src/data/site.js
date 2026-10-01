// Central place for facts reused across sections (Hero, About, Contact,
// Footer). Change something here and it updates everywhere it's used.

export const site = {
  name: 'Thomas',
  role: 'Software QA Analyst',
  location: 'Texas, USA',
  experienceStart: '2022',
  focus: 'Quality + Automation + AI',
  status: 'Currently building — QA Portfolio + Automation Lab',

  linkedin: 'https://www.linkedin.com/in/thomas-pessoa-tech/',
  email: 'tomecosabs@gmail.com',

  // Lives in public/, so it's served at this exact path. Swap the PDF
  // (same filename) whenever your resume changes — Hero and Contact both
  // read this value.
  resumePath: '/Thomas-Pessoa-Resume.pdf',

  // One-liner under the name in the Hero.
  heroLede:
    'Software QA Analyst focused on manual and exploratory testing, regression, UI and API testing — growing into Cypress automation and AI-assisted testing.',
}

// ---------------------------------------------------------------------------
// About section copy. Each string is one paragraph, rendered in order — add,
// remove, or reword freely. The first paragraph is shown in the brightest
// text color, the rest are slightly softer.
// ---------------------------------------------------------------------------
export const about = [
  "I'm a Software QA Analyst who likes finding the problem before the user does. Since 2022 I've worked across the full software development lifecycle: turning requirements into test cases, validating acceptance criteria, hunting for edge cases, and documenting defects so developers can reproduce and fix them fast.",
  'Day to day that means manual and exploratory testing, regression passes before releases, API checks in Postman, and Cypress automation for the flows that should never break. I sit comfortably between QA and development — I build my own websites with React and JavaScript, so I can read the code, understand how things fit together, and talk to developers in their language.',
  "I'm also genuinely curious about AI. I enjoy using it to build websites, draft and sharpen test cases, and speed up automation — always with human judgment on top, because AI can write the test but someone still has to decide what \"correct\" means.",
]

// ---------------------------------------------------------------------------
// The "What I'm into" cards under the About text. To add one, copy an object
// and fill in both fields; the grid adjusts on its own. Keep descriptions to
// about one sentence so the cards stay even.
// ---------------------------------------------------------------------------
export const interests = [
  {
    title: 'AI-assisted QA',
    description:
      'Using AI to brainstorm scenarios, cut repetitive work, and sharpen test cases — with a human deciding what "correct" means.',
  },
  {
    title: 'Building websites',
    description:
      'React, Vite, and JavaScript. This portfolio is one of them, and it doubles as my testing playground.',
  },
  {
    title: 'Test case design',
    description:
      'Turning vague requirements into clear, reproducible cases: happy paths, edge cases, and the negative paths nobody planned for.',
  },
  {
    title: 'Test automation',
    description:
      'Cypress suites for the flows that must never break, with automated accessibility checks and CI to keep them honest.',
  },
]
