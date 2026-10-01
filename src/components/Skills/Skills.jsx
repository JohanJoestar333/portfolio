import { skillCategories, currentlyLearning } from '../../data/skills.js'
import Reveal from '../Reveal/Reveal.jsx'
import './Skills.css'

// All the actual skill names come from src/data/skills.js — this
// component only handles the layout. Skills are rendered as plain tags,
// not percentage bars, per the brief ("no percentage proficiency bars" —
// they read as arbitrary and don't actually communicate skill level).
export default function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <h2>Testing Toolkit</h2>
          </div>
        </Reveal>

        {/* skills__grid (not .container) is the actual CSS grid here, so
            each category card can safely get its own Reveal — they're
            still direct children of the grid. A small per-card delay
            (capped at 0.3s so a long skill list doesn't take forever to
            finish revealing) makes the cards cascade in one after
            another instead of all appearing at once. */}
        <div className="skills__grid">
          {skillCategories.map((category, index) => (
            <Reveal
              key={category.title}
              className="panel skills__category"
              delay={Math.min(index * 0.08, 0.3)}
            >
              <h3>{category.title}</h3>
              <ul className="skills__tags">
                {category.skills.map((skill) => (
                  <li key={skill} className="skills__tag mono">
                    {skill}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="panel skills__learning">
          <p className="eyebrow">Currently learning</p>
          <ul className="skills__tags">
            {currentlyLearning.map((skill) => (
              <li key={skill} className="skills__tag skills__tag--learning mono">
                <span className="dot" />
                {skill}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
