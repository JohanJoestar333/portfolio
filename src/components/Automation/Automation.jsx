import { automationIntro, suite, testCount, specCount } from '../../data/automation.js'
import Reveal from '../Reveal/Reveal.jsx'
import './Automation.css'

// Copy, the spec list, and the counts all come from src/data/automation.js,
// which reads the real files in /cypress/e2e at build time — so this
// section always matches the actual test suite.
export default function Automation() {
  return (
    <section id="automation" className="section automation">
      <div className="container automation__grid">
        {/* Each grid child gets its own Reveal (rather than one Reveal
            around everything) so automation__grid's two-column layout in
            Automation.css still applies — see the same note in
            About.jsx. */}
        <Reveal className="section-head">
          <h2>{automationIntro.title}</h2>
          <p>{automationIntro.tagline}</p>
        </Reveal>

        <Reveal as="p" className="automation__body" delay={0.05}>
          {automationIntro.body}
        </Reveal>

        <Reveal className="panel automation__panel" delay={0.1}>
          <div className="automation__panel-head">
            <p className="eyebrow">Cypress test suite</p>
            <span className="pill" data-testid="automation-count">
              {testCount} tests · {specCount} specs
            </span>
          </div>

          <ul className="automation__suite mono">
            {suite.map((item) => (
              <li key={item.file}>
                <span className="automation__suite-check" aria-hidden="true">
                  ▸
                </span>
                <span className="automation__suite-file">{item.file}</span>
                <span className="automation__suite-desc">
                  {item.description} ({item.tests} {item.tests === 1 ? 'test' : 'tests'})
                </span>
              </li>
            ))}
          </ul>

          <p className="automation__note">
            The list and counts are read from <span className="mono">/cypress/e2e</span>, so they
            update when a spec is added. Run it yourself with{' '}
            <span className="mono">npm run test:e2e</span>; every push also runs it in GitHub
            Actions.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
