import { useEffect, useState } from 'react'
import { useLang } from '../../i18n/LanguageContext.jsx'
import Reveal from '../Reveal/Reveal.jsx'
import './Skills.css'

// How many columns the board has at the current window width. Matches the
// breakpoints used elsewhere on the site (640px and 980px).
function getColumnCount() {
  if (typeof window === 'undefined') return 3
  if (window.innerWidth >= 980) return 3
  if (window.innerWidth >= 640) return 2
  return 1
}

// Pinterest-style masonry: each card goes into whichever column is
// currently shortest (by how many tags it holds), so the board stays
// balanced whatever the data looks like. Real columns (instead of CSS
// multi-column) keep every card a normal block, so the hover tilt and
// reveal animations behave exactly like the cards in other sections.
function distribute(categories, count) {
  const columns = Array.from({ length: count }, () => ({ weight: 0, items: [] }))
  categories.forEach((category, index) => {
    const target = columns.reduce((a, b) => (b.weight < a.weight ? b : a))
    target.items.push({ category, index })
    target.weight += category.skills.length + 3 // +3 ≈ the card's heading and padding
  })
  return columns.map((c) => c.items)
}

// All the actual skill names come from src/data/skills.js — this
// component only handles the layout. Skills are rendered as plain tags,
// not percentage bars, per the brief ("no percentage proficiency bars" —
// they read as arbitrary and don't actually communicate skill level).
export default function Skills() {
  const { t, c } = useLang()
  const { skillCategories, currentlyLearning } = c
  const [count, setCount] = useState(getColumnCount)
  useEffect(() => {
    const onResize = () => setCount(getColumnCount())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  const columns = distribute(skillCategories, count)

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <h2>{t.skills.title}</h2>
          </div>
        </Reveal>

        {/* One flex column per masonry column. Each card still gets its own
            Reveal, with a small per-card delay (capped at 0.3s) so the
            cards cascade in one after another. */}
        <div className="skills__grid" style={{ '--cols': count }}>
          {columns.map((items, colIndex) => (
            <div key={colIndex} className="skills__col">
              {items.map(({ category, index }) => (
                <Reveal
                  key={category.id}
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
          ))}
        </div>

        <Reveal className="panel skills__learning">
          <p className="eyebrow">{t.skills.learning}</p>
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
