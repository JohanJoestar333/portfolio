describe('Language switch', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('is English by default', () => {
    cy.get('html').should('have.attr', 'lang', 'en')
    cy.contains('Explore QA Lab').should('be.visible')
    cy.get('[data-testid="hero-resume"]').should('have.attr', 'href', '/Thomas-Pessoa-Resume.pdf')
  })

  it('switches the whole page to Portuguese and back with one button', () => {
    cy.get('[data-testid="lang-toggle"]').click()
    cy.get('html').should('have.attr', 'lang', 'pt-BR')
    cy.contains('Explorar o QA Lab').should('be.visible')
    cy.contains('Analista de Garantia de Qualidade de Software').should('exist')
    cy.get('[data-testid="hero-resume"]').should('have.attr', 'href', '/Thomas-Pessoa-Resume-PT.pdf')
    cy.get('[data-testid="hero-linkedin"]').should('have.attr', 'href').and('include', 'locale=pt-BR')

    cy.get('[data-testid="lang-toggle"]').click()
    cy.get('html').should('have.attr', 'lang', 'en')
    cy.contains('Explore QA Lab').should('be.visible')
  })

  it('remembers the choice after a reload', () => {
    cy.get('[data-testid="lang-toggle"]').click()
    cy.reload()
    cy.get('html').should('have.attr', 'lang', 'pt-BR')
    cy.contains('Explorar o QA Lab').should('be.visible')
  })

  it('translates the QA Lab results too', () => {
    cy.get('[data-testid="lang-toggle"]').click()
    cy.get('[data-testid="login-scenario-empty-email"]').should('contain', 'E-mail vazio').click()
    cy.get('[data-testid="login-log"] li').first().should('contain', 'PASSOU')
  })
})
