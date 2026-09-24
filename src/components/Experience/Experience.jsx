import { experience } from '../../data/experience.js'
import './Experience.css'

// Loops over every entry in src/data/experience.js and renders one card
// per role. `location` is optional per entry — the {entry.location && ...}
// check below just skips rendering that line if an entry doesn't have one.
export default function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="container">
        <div className="section-head">
          <h2>Experience</h2>
        </div>

        <div className="experience__list">
          {experience.map((entry) => (
            <div key={`${entry.company}-${entry.role}`} className="panel experience__entry">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
