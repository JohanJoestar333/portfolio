// A Cypress "spec" file. `describe()` groups related tests together;
// each `it()` inside it is one individual test. Cypress runs every
// .cy.js file under cypress/e2e/ automatically — no need to import them
// anywhere.
describe('Homepage', () => {
  // beforeEach runs before every single `it()` below, so each test starts
  // from a clean, freshly-loaded page rather than sharing state with the
  // previous test.
  beforeEach(() => {
    cy.visit('/') // Loads baseUrl + '/' — i.e. http://localhost:5173/ (see cypress.config.js).
  })

  it('loads and shows the hero content', () => {
    // cy.contains(text) finds an element containing that text anywhere on
    // the page. .should('be.visible') is an assertion — Cypress will
    // retry it automatically for a few seconds if the element isn't
    // there yet, so you rarely need manual waits.
    cy.contains('Thomas').should('be.visible')
    cy.contains('Software QA Analyst').should('be.visible')
    cy.contains('Explore QA Lab').should('be.visible')
  })

  it('renders the draggable 3D hero block with all six faces', () => {
    cy.get('[data-testid="hero-cube"]').should('be.visible')
    cy.get('[data-testid="hero-cube"] .herocube__face').should('have.length', 6)
    cy.get('[data-testid="hero-cube"] .herocube__label').should('have.length', 6)
    cy.get('[data-testid="hero-cube"]').should('contain.text', 'Regression').and('contain.text', 'Test case writing')
  })

  it('has a working primary navigation', () => {
    // cy.get(selector) works like document.querySelector — here it's
    // using the data-testid attributes we added throughout the app
    // specifically so tests have stable hooks that don't break if we
    // later change CSS classes or wording.
    cy.get('[data-testid="nav-logo"]').should('be.visible')
    // cy.contains(selector, text) narrows the search to elements matching
    // the selector ('nav a') that also contain the given text.
    // Desktop width: the nav only shows as a row above 980px.
    cy.viewport(1280, 800)
    cy.contains('nav a', 'QA Lab').click()
    // Clicking an anchor with href="#qa-lab" updates the URL's hash.
    cy.location('hash').should('eq', '#qa-lab')
    cy.get('#qa-lab').should('be.visible')
  })

  it('shows an accessible mobile menu on small viewports', () => {
    // cy.viewport(width, height) resizes the simulated browser window —
    // this drops us below the 980px breakpoint where Navbar.css switches
    // to the hamburger menu.
    cy.viewport(375, 800)
    cy.get('[data-testid="nav-toggle"]').should('be.visible').click()
    cy.get('[data-testid="nav-toggle"]').should('have.attr', 'aria-expanded', 'true')
    cy.get('[data-testid="nav-mobile"]').should('have.class', 'is-open')

    cy.get('[data-testid="nav-mobile"]').contains('Contact').click()
    cy.get('[data-testid="nav-mobile"]').should('not.have.class', 'is-open')
  })

  it('renders every top-level section', () => {
    // Loops through every section id and checks it exists in the DOM.
    // Add a new section id here if you add a new section to App.jsx.
    ;['about', 'qa-lab', 'automation', 'projects', 'skills', 'certificates', 'experience', 'writing', 'contact'].forEach((id) => {
      cy.get(`#${id}`).should('exist')
    })
  })

  it('shows footer content', () => {
    cy.contains('Built with React. Tested with Cypress.').should('be.visible')
  })
})
