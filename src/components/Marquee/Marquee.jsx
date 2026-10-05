import { skillCategories } from '../../data/skills.js'
import './Marquee.css'

// A slow, endless ribbon of the testing toolkit, built from the same
// data as the Skills section (so it never goes stale). Purely decorative:
// hidden from assistive tech, since the Skills section lists the same things.
const items = [
  ...new Set(
    skillCategories
      .filter((c) => c.title !== 'Development & Workflow')
      .flatMap((c) => c.skills)
  ),
]

export default function Marquee() {
  // The list is rendered twice and the track slides by exactly 50%, which
  // makes the loop seamless.
  const loop = [...items, ...items]
  return (
    <div className="marquee" aria-hidden="true" data-testid="marquee">
      <div className="marquee__track">
        {loop.map((item, i) => (
          <span key={`${item}-${i}`} className="marquee__item">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
