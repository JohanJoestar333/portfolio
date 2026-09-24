const ALL_BUG_IDS = ['counter', 'toggle', 'cart', 'promo', 'delete']

// Shared helper: clicks a card's "Report this bug" button, then submits
// the report form that appears. `.within(scope)` restricts the cy.contains
// search to inside that one form, so it doesn't accidentally match the
// "Submit report" button on some other card.
function reportBug(id) {
  cy.get(`[data-testid="bug-report-btn-${id}"]`).click()
  cy.get(`[data-testid="bug-report-form-${id}"]`).within(() => {
    cy.contains('button', 'Submit report').click()
  })
}

describe('Bug Hunter', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-testid="qa-tab-bugs"]').click()
  })

  it('starts at 0 / 5 bugs found', () => {
    cy.get('[data-testid="bug-hunter-count"]').should('contain', '0 / 5')
  })

  it('reproduces the counter skipping a number', () => {
    cy.get('[data-testid="bug-counter-btn"]').click() // 0 -> 1
    cy.get('[data-testid="bug-counter-btn"]').click() // 1 -> 2
    cy.get('[data-testid="bug-counter-btn"]').click() // 2 -> 4, skips 3
    cy.get('[data-testid="bug-counter-btn"]').should('contain', 'Count: 4')
  })

  it("reproduces the success message that doesn't reset", () => {
    cy.get('[data-testid="bug-toggle-input"]').check()
    cy.contains('Terms accepted.').should('be.visible')
    cy.get('[data-testid="bug-toggle-input"]').uncheck()
    cy.contains('Terms accepted.').should('be.visible')
  })

  it('reproduces the double-triggered add-to-cart button', () => {
    // Two clicks fired back to back land well within the 300ms window.
    cy.get('[data-testid="bug-cart-btn"]').click().click()
    cy.contains('Items: 3').should('be.visible')
  })

  it('reproduces the promo code accepting invalid input', () => {
    cy.get('[data-testid="bug-promo-input"]').type('abc')
    cy.get('[data-testid="bug-promo-btn"]').click()
    cy.contains('Valid code!').should('be.visible')
  })

  it('shows a misleading error message on delete', () => {
    cy.get('[data-testid="bug-delete-btn"]').click()
    cy.contains('Network error. Please try again.').should('be.visible')
  })

  it('lets a visitor report a bug and updates the count', () => {
    reportBug('counter')
    cy.get('[data-testid="bug-hunter-count"]').should('contain', '1 / 5')
    cy.contains('BUG FOUND').should('be.visible')
  })

  it('shows the completion message once all 5 are reported', () => {
    ALL_BUG_IDS.forEach(reportBug)
    cy.contains('You broke it.').should('be.visible')
    cy.contains("That's exactly what I wanted you to do.").should('be.visible')
  })

  it('resets with Play again', () => {
    ALL_BUG_IDS.forEach(reportBug)
    cy.contains('button', 'Play again').click()
    cy.get('[data-testid="bug-hunter-count"]').should('contain', '0 / 5')
  })
})
