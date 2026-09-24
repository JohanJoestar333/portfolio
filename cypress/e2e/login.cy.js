// These tests click the preset scenario buttons in LoginLab.jsx (each one
// auto-fills the email/password fields and submits), then check both the
// inline field error and the newest entry in the results log —
// `[data-testid="login-log"] li').first()` is the most-recently-added
// entry, since LoginLab prepends new entries to the top of the list.
describe('Login Lab', () => {
  beforeEach(() => {
    cy.visit('/')
    // Login Lab is the QA Lab's default tab, but we click it explicitly
    // anyway so this test doesn't silently break if that default changes.
    cy.get('[data-testid="qa-tab-login"]').click()
  })

  it('shows a validation error for empty email and does not log in', () => {
    cy.get('[data-testid="login-scenario-empty-email"]').click()
    cy.get('[data-testid="login-email-error"]').should('contain', 'Email is required.')
    cy.get('[data-testid="login-log"] li').first().should('contain', 'PASS')
  })

  it('shows a validation error for empty password', () => {
    cy.get('[data-testid="login-scenario-empty-password"]').click()
    cy.get('[data-testid="login-password-error"]').should('contain', 'Password is required.')
    cy.get('[data-testid="login-log"] li').first().should('contain', 'PASS')
  })

  it('rejects a malformed email address', () => {
    cy.get('[data-testid="login-scenario-invalid-format"]').click()
    cy.get('[data-testid="login-email-error"]').should('contain', 'Enter a valid email address.')
    cy.get('[data-testid="login-log"] li').first().should('contain', 'PASS')
  })

  // BUG (documented in QA_NOTES.md): a whitespace-only email is accepted.
  it('demonstrates the whitespace-only-email bug', () => {
    cy.get('[data-testid="login-scenario-whitespace-email"]').click()
    cy.get('[data-testid="login-email-error"]').should('not.exist')
    cy.get('[data-testid="login-log"] li').first().should('contain', 'BUG FOUND')
  })

  // BUG (documented in QA_NOTES.md): no minimum password length.
  it('demonstrates the one-character-password bug', () => {
    cy.get('[data-testid="login-scenario-short-password"]').click()
    cy.get('[data-testid="login-password-error"]').should('not.exist')
    cy.get('[data-testid="login-log"] li').first().should('contain', 'BUG FOUND')
  })

  it('trims whitespace around otherwise-valid credentials and logs in', () => {
    cy.get('[data-testid="login-scenario-padded-credentials"]').click()
    cy.get('[data-testid="login-banner"]').should('contain', 'Login succeeded.')
    cy.get('[data-testid="login-log"] li').first().should('contain', 'PASS')
  })

  it('rejects incorrect credentials with the right message', () => {
    cy.get('[data-testid="login-scenario-incorrect-credentials"]').click()
    cy.get('[data-testid="login-banner"]').should('contain', 'Invalid email or password.')
    cy.get('[data-testid="login-log"] li').first().should('contain', 'PASS')
  })

  it('logs in successfully with valid credentials', () => {
    cy.get('[data-testid="login-scenario-valid-credentials"]').click()
    cy.get('[data-testid="login-banner"]').should('contain', 'Login succeeded.')
    cy.get('[data-testid="login-log"] li').first().should('contain', 'PASS')
  })

  // BUG (documented in QA_NOTES.md): the button doesn't disable while a
  // request is pending, so two rapid clicks both go through. The actual
  // check takes ~550ms to resolve (see LoginLab's runDoubleClick) — no
  // explicit wait is needed here because .should() retries automatically
  // until the assertion passes or times out.
  it('demonstrates the missing submit-debounce bug on double-click', () => {
    cy.get('[data-testid="login-scenario-double-click"]').click()
    cy.get('[data-testid="login-log"] li').first().should('contain', 'BUG FOUND')
  })

  // Unlike every test above (which clicks a preset button), this one
  // types directly into the real inputs with cy.type() — proving the bug
  // is in the app's actual validation logic, not just in how the preset
  // buttons happen to call it.
  it('runs manually typed input through the same validation path as the presets', () => {
    cy.get('[data-testid="login-email"]').type('   ')
    cy.get('[data-testid="login-password"]').type('Testing123')
    cy.get('[data-testid="login-submit"]').click()
    cy.get('[data-testid="login-log"] li').first().should('contain', 'BUG FOUND')
  })
})
