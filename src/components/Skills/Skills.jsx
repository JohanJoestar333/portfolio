import { skillCategories, currentlyLearning } from '../../data/skills.js'
import './Skills.css'

// All the actual skill names come from src/data/skills.js — this
// component only handles the layout. Skills are rendered as plain tags,
// not percentage bars, per the brief ("no percentage proficiency bars" —
// they read as arbitrary and don't actually communicate skill level).
export default function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <div className="section-head">
          <h2>Testing Toolkit</h2>
        </div>

        <div className="skills__grid">
          {skillCategories.map((category) => (
            <div key={category.title} className="panel skills__category">
              <h3>{category.title}</h3>
              <ul className="skills__tags">
                {category.skills.map((skill) => (
                  <li key={skill} className="skills__tag mono">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="panel skills__learning">
          <p className="eyebrow">Currently learning</p>
          <ul className="skills__tags">
            {currentlyLearning.map((skill) => (
              <li key={skill} className="skills__tag skills__tag--learning mono">
                <span className="dot" />
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
