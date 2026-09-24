// Runs before every spec file.

// cypress-axe registers two commands used by cypress/e2e/accessibility.cy.js:
// cy.injectAxe() (loads axe-core into the page under test) and
// cy.checkA11y() (runs it and fails the test if violations are found).
import 'cypress-axe'
