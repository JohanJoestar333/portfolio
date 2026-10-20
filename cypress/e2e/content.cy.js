// Content checks for the sections driven by data files (certificates,
// writing, About). They loop over whatever is actually rendered, so a new
// certificate or post you add later is covered automatically — no test
// edits needed. They catch the mistakes that are easy to make when editing
// data by hand: a missing link, a broken image path, a typo'd URL.
describe('Content sections', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('renders every certificate as a working link', () => {
    cy.get('[data-testid^="certificate-"]').should('have.length.greaterThan', 0)
    cy.get('[data-testid^="certificate-"]').each(($card) => {
      cy.wrap($card)
        .should('have.attr', 'href')
        // An https verification page, or a certificate PDF hosted in
        // public/certificates/ for courses with no online verification.
        .and('match', /^(https:\/\/|\/certificates\/)/)
      cy.wrap($card).should('have.attr', 'target', '_blank')
      cy.wrap($card).find('.certificates__title').should('not.be.empty')
      cy.wrap($card).find('.certificates__org').should('not.be.empty')
    })
  })

  it('loads every certificate image (no broken image paths)', () => {
    cy.get('[data-testid^="certificate-"] img').each(($img) => {
      // Images are lazy-loaded, so bring each one into view first.
      cy.wrap($img).scrollIntoView()
      cy.wrap($img).should(($el) => {
        expect($el[0].naturalWidth, 'image natural width').to.be.greaterThan(0)
      })
    })
  })

  it('renders every project with a title and working links', () => {
    cy.get('[data-testid^="project-"]:not([data-testid="project-link"])').should('have.length.greaterThan', 0)
    cy.get('[data-testid="project-link"]').each(($link) => {
      cy.wrap($link).should('have.attr', 'href').and('match', /^(https:\/\/|\/projects\/)/)
    })
    // Downloadable files must actually be served (not a 404 or the app shell).
    cy.get('[data-testid="project-link"][download]').each(($link) => {
      cy.request($link.attr('href')).its('status').should('eq', 200)
    })
  })

  it('renders every writing post with a title and an external link', () => {
    cy.get('[data-testid^="writing-post-"]').should('have.length.greaterThan', 0)
    cy.get('[data-testid^="writing-post-"]').each(($post) => {
      cy.wrap($post)
        .should('have.attr', 'href')
        // An https verification page, or a certificate PDF hosted in
        // public/certificates/ for courses with no online verification.
        .and('match', /^(https:\/\/|\/certificates\/)/)
      cy.wrap($post).should('have.attr', 'target', '_blank')
      cy.wrap($post).find('h3').should('not.be.empty')
    })
  })

  it('shows the About interests and the numbers strip', () => {
    cy.get('[data-testid="about-interest"]').should('have.length.greaterThan', 0)
    cy.get('[data-testid="about-stats"] li').should('have.length', 3)
  })

  it('offers the resume download in the hero', () => {
    cy.get('[data-testid="hero-resume"]')
      .should('have.attr', 'href')
      .and('match', /\.pdf$/)
  })

  it('shows the automation test count', () => {
    cy.get('[data-testid="automation-count"]').should('contain', 'tests')
  })
})
