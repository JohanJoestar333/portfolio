import { useLang } from '../../i18n/LanguageContext.jsx'
import Reveal from '../Reveal/Reveal.jsx'
import './Experience.css'

// Loops over every entry in src/data/experience.js and renders one card
// per role. `location` is optional per entry — the {entry.location && ...}
// check below just skips rendering that line if an entry doesn't have one.
export default function Experience() {
  const { t, c } = useLang()
  const { experience } = c
  return (
    <section id="experience" className="section experience">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <h2>{t.experience.title}</h2>
          </div>
        </Reveal>

        {/* experience__list (not .container) is a plain flex column, not
            a grid, but each entry still gets its own Reveal + small
            stagger so multiple roles cascade in one after another rather
            than all appearing at once. */}
        <div className="experience__list">
          {experience.map((entry, index) => (
            <Reveal
              key={`${entry.company}-${entry.role}`}
              className="panel experience__entry"
              delay={Math.min(index * 0.1, 0.3)}
            >
              <div className="experience__header">
                <div>
                  <h3>{entry.role}</h3>
                  <p className="experience__company">{entry.company}</p>
                </div>
                <div className="experience__meta">
                  <p className="experience__period mono">{entry.period}</p>
                  {entry.location && <p className="experience__location mono">{entry.location}</p>}
                </div>
              </div>
              <ul className="experience__bullets">
                {entry.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
