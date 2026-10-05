// Everything the Automation section shows. The spec list and the test
// counts are read straight from /cypress/e2e at build time, so they can
// never drift out of date: add a new .cy.js file and it appears here on its
// own. The only thing to maintain by hand is the optional one-line
// description for each file, below.

export const automationIntro = {
  title: 'Automation',
  tagline: 'Some tests are better when they run themselves.',
  body: "I'm growing my automation skills with Cypress, and this portfolio doubles as the project I practice on. Its flows, validation rules, and accessibility are covered by an automated suite that runs in GitHub Actions on every push. I also use AI to speed up the boring parts, like drafting scenarios and boilerplate, then review and refine everything myself.",
}

// Optional: a short description per spec file, keyed by file name. A spec
// without an entry still shows up, just with a generic description.
const descriptions = {
  'homepage.cy.js': 'Page loads, navigation links resolve, hero content renders.',
  'login.cy.js': 'Login Lab scenarios, including the documented validation bugs.',
  'form-validation.cy.js': 'Required fields, email format, phone input, and the live test results.',
  'accessibility.cy.js': 'Automated axe-core checks across the page, QA Lab tabs, and the mobile menu.',
  'content.cy.js': 'Certificates, writing, and About content render correctly, and new entries are covered automatically.',
}

// Vite reads the spec files as raw text (never runs them in the browser).
const specSources = import.meta.glob('/cypress/e2e/*.cy.js', {
  query: '?raw',
  import: 'default',
  eager: true,
})

export const suite = Object.entries(specSources)
  .map(([path, source]) => {
    const file = path.split('/').pop()
    return {
      file,
      tests: (source.match(/^\s*it\(/gm) || []).length,
      description: descriptions[file] ?? 'Cypress spec.',
    }
  })
  .sort((a, b) => a.file.localeCompare(b.file))

export const testCount = suite.reduce((total, spec) => total + spec.tests, 0)
export const specCount = suite.length
