import { suite, testCount, specCount } from '../../data/automation.js'
import { useLang } from '../../i18n/LanguageContext.jsx'
import Reveal from '../Reveal/Reveal.jsx'
import './Automation.css'

// Copy, the spec list, and the counts all come from src/data/automation.js,
// which reads the real files in /cypress/e2e at build time — so this
// section always matches the actual test suite.
export default function Automation() {
  const { t, c, lang } = useLang()
  const automationIntro = c.automationIntro
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
            <p className="eyebrow">{t.automation.eyebrow}</p>
            <span className="pill" data-testid="automation-count">
              {t.automation.counts(testCount, specCount)}
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
                  {lang === 'pt' ? item.descriptionPt : item.description} ({item.tests} {t.automation.testWord(item.tests)})
                </span>
              </li>
            ))}
          </ul>

          <p className="automation__note">
            {t.automation.noteA}
            <span className="mono">/cypress/e2e</span>
            {t.automation.noteB}
            <span className="mono">npm run test:e2e</span>
            {t.automation.noteC}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
