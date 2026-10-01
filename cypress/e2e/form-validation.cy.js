// The form's actual limit (see MESSAGE_MAX_LENGTH in FormLab.jsx) is 500
// characters, and there's no enforcement of it — that's the bug being
// tested below. 501 is just "one over the line".
const MESSAGE_OVER_LIMIT_LENGTH = 501

// Each test here fills in the real <input>/<textarea> elements with
// cy.type(), submits, then checks either an inline error message or one
// row of the "Test results" checklist (via [data-testid="form-checklist"]).
describe('Form Validation Lab', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-testid="qa-tab-form"]').click()
  })

  it('flags every required field on an empty submission', () => {
    cy.get('[data-testid="form-submit"]').click()
    // name, email, phone, message — age is optional
    cy.get('.form-lab__error').should('have.length', 4)
    cy.get('[data-testid="form-checklist"]').contains('li', 'Required fields').should('have.class', 'is-pass')
    cy.get('[data-testid="form-checklist"]').contains('li', 'Empty submission').should('have.class', 'is-pass')
  })

  it('rejects a malformed email', () => {
    cy.get('[data-testid="form-name"]').type('Jane Doe')
    cy.get('[data-testid="form-email"]').type('not-an-email')
    cy.get('[data-testid="form-phone"]').type('123456789')
    cy.get('[data-testid="form-message"]').type('Hello there')
    cy.get('[data-testid="form-submit"]').click()
    cy.contains('Enter a valid email address.').should('be.visible')
    cy.get('[data-testid="form-checklist"]').contains('li', 'Email validation').should('have.class', 'is-pass')
  })

  it('rejects an out-of-range age', () => {
    cy.get('[data-testid="form-name"]').type('Jane Doe')
    cy.get('[data-testid="form-email"]').type('jane@example.com')
    cy.get('[data-testid="form-phone"]').type('123456789')
    cy.get('[data-testid="form-age"]').type('200')
    cy.get('[data-testid="form-message"]').type('Hello there')
    cy.get('[data-testid="form-submit"]').click()
    cy.contains('Enter a number between 0 and 120.').should('be.visible')
  })

  // BUG (documented in QA_NOTES.md): the message field's required check
  // uses the raw length, so whitespace-only input is accepted.
  it('demonstrates the whitespace-only-message bug', () => {
    cy.get('[data-testid="form-name"]').type('Jane Doe')
    cy.get('[data-testid="form-email"]').type('jane@example.com')
    cy.get('[data-testid="form-phone"]').type('123456789')
    cy.get('[data-testid="form-message"]').type('   ')
    cy.get('[data-testid="form-submit"]').click()
    cy.get('[data-testid="form-checklist"]').contains('li', 'Whitespace handling').should('have.class', 'is-fail')
  })

  // BUG (documented in QA_NOTES.md): no maximum length enforced.
  it('demonstrates the missing max-length enforcement', () => {
    const longMessage = 'a'.repeat(MESSAGE_OVER_LIMIT_LENGTH)
    cy.get('[data-testid="form-name"]').type('Jane Doe')
    cy.get('[data-testid="form-email"]').type('jane@example.com')
    cy.get('[data-testid="form-phone"]').type('123456789')
    // { delay: 0 } skips Cypress's small per-keystroke delay — without it,
    // typing 501 characters one at a time would make this test noticeably
    // slower for no real benefit.
    cy.get('[data-testid="form-message"]').type(longMessage, { delay: 0 })
    cy.get('[data-testid="form-submit"]').click()
    cy.get('[data-testid="form-checklist"]').contains('li', 'Maximum length').should('have.class', 'is-fail')
  })

  it('does not let letters be typed into the phone field', () => {
    cy.get('[data-testid="form-phone"]').type('abc123-def456')
    cy.get('[data-testid="form-phone"]').should('have.value', '123-456')
  })

  it('only grades checks the submission actually exercised', () => {
    cy.get('[data-testid="form-name"]').type('Jane Doe')
    cy.get('[data-testid="form-email"]').type('jane@example.com')
    cy.get('[data-testid="form-phone"]').type('123456789')
    cy.get('[data-testid="form-message"]').type('Hello there')
    cy.get('[data-testid="form-submit"]').click()
    cy.get('[data-testid="form-checklist"]').contains('li', 'Email validation').should('have.class', 'is-pass')
    cy.get('[data-testid="form-checklist"]').contains('li', 'Maximum length').should('have.class', 'is-untested')
    cy.get('[data-testid="form-checklist"]').contains('li', 'Whitespace handling').should('have.class', 'is-untested')
  })

  it('tracks how many times the form has been submitted this session', () => {
    cy.get('[data-testid="form-submit"]').click()
    cy.get('[data-testid="form-submit"]').click()
    cy.contains('Submissions this session: 2').should('be.visible')
  })
})
