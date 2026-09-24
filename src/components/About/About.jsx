import { site } from '../../data/site.js'
import './About.css'

// The little "Location / Role / Experience / Focus" panel is built from
// this array, which just pulls its values from src/data/site.js — so to
// change what shows up here, edit site.js rather than this file.
const meta = [
  { label: 'Location', value: site.location },
  { label: 'Role', value: site.role },
  { label: 'Experience', value: `${site.experienceStart} — Present` },
  { label: 'Focus', value: site.focus },
]

export default function About() {
  return (
    <section id="about" className="section about">
      {/* Two-column layout on wide screens (prose left, meta panel
          right), stacked on mobile — see the @media rule in About.css. */}
      <div className="container about__grid">
        <div className="section-head">
          <h2>A little about me</h2>
        </div>

        {/* The two paragraphs below are hand-written prose, not pulled
            from a data file — edit them directly here if you want to
            change the wording. */}
        <div className="about__body">
          <p>
            I'm a Software QA Analyst with experience working across the
            software development lifecycle. My work involves understanding
            requirements, validating acceptance criteria, testing happy
            paths and edge cases, documenting defects, and making sure
            changes don't break what already works.
          </p>
          <p>
            I'm especially interested in the space between development and
            quality, and I'm currently expanding my automation skills with
            Cypress while building projects with React and JavaScript.
          </p>
        </div>

        {/* <dl> (description list) is the semantically correct HTML
            element for a set of label/value pairs like this — better for
            screen readers than a plain <div> grid would be. */}
        <dl className="about__meta panel">
          {meta.map((row) => (
            <div key={row.label} className="about__meta-row">
              <dt className="mono">{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
