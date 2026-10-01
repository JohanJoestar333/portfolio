// Automated accessibility checks using axe-core, via the cypress-axe
// plugin registered in cypress/support/e2e.js. This doesn't replace real
// manual and assistive-technology testing — axe only catches
// mechanically-detectable issues (missing labels, insufficient color
// contrast, missing alt text, invalid ARIA usage, and similar) — but it's
// a fast, automated first pass that runs on every commit once CI is set
// up (see .github/workflows).
//
// cy.checkA11y() fails the test and prints a list of violations
// (including the specific selector and a link to the axe rule that
// caught it) if anything is found.
describe('Accessibility', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.injectAxe() // Loads the axe-core library into the page under test.
  })

  it('has no detectable accessibility violations on page load', () => {
    cy.checkA11y()
  })

  it('has no detectable accessibility violations in the Login Lab', () => {
    cy.get('[data-testid="qa-tab-login"]').click()
    cy.checkA11y('[data-testid="qa-tabpanel"]')
  })

  it('has no detectable accessibility violations in the Form Validation Lab', () => {
    cy.get('[data-testid="qa-tab-form"]').click()
    cy.checkA11y('[data-testid="qa-tabpanel"]')
  })

  it('has no detectable accessibility violations with the mobile menu open', () => {
    cy.viewport(375, 800)
    cy.get('[data-testid="nav-toggle"]').click()
    cy.checkA11y()
  })
})
