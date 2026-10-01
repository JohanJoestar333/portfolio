import Reveal from '../Reveal/Reveal.jsx'
import './Automation.css'

// This list is just for display — it mirrors (and should be kept in sync
// with) the actual spec files under /cypress/e2e. It's deliberately
// labeled "Example test suite" / "Demo output" below rather than showing
// a live pass count, since generating a real count here would mean
// running Cypress from the browser, which this static site can't do.
const SUITE_FILES = [
  { file: 'homepage.cy.js', description: 'Page loads, navigation links resolve, hero content renders.' },
  { file: 'login.cy.js', description: 'Login Lab scenarios, including the documented validation bugs.' },
  { file: 'form-validation.cy.js', description: 'Required fields, email format, and the live test checklist.' },
  { file: 'bug-hunter.cy.js', description: 'All five Bug Hunter widgets are reportable and reach 5 / 5.' },
  { file: 'accessibility.cy.js', description: 'Automated axe-core checks across the page, QA Lab tabs, and the mobile menu.' },
]

export default function Automation() {
  return (
    <section id="automation" className="section automation">
      <div className="container automation__grid">
        {/* Each grid child gets its own Reveal (rather than one Reveal
            around everything) so automation__grid's two-column layout in
            Automation.css still applies — see the same note in
            About.jsx. */}
        <Reveal className="section-head">
          <h2>Automation</h2>
          <p>Some tests are better when they run themselves.</p>
        </Reveal>

        <Reveal as="p" className="automation__body" delay={0.05}>
          I'm currently expanding my automation skills with Cypress. This
          portfolio doubles as a small automation project, with automated
          coverage for important user flows and regression scenarios.
        </Reveal>

        <Reveal className="panel automation__panel" delay={0.1}>
          <div className="automation__panel-head">
            <p className="eyebrow">Example test suite</p>
            <span className="pill">Demo output</span>
          </div>

          <ul className="automation__suite mono">
            {SUITE_FILES.map((item) => (
              <li key={item.file}>
                <span className="automation__suite-check" aria-hidden="true">
                  ✓
                </span>
                <span className="automation__suite-file">{item.file}</span>
                <span className="automation__suite-desc">{item.description}</span>
              </li>
            ))}
          </ul>

          <p className="automation__note">
            Illustrative, not live CI output — the real suite lives in{' '}
            <span className="mono">/cypress/e2e</span> and runs via{' '}
            <span className="mono">npm run test:e2e</span>.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
