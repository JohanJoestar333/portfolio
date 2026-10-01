import { site } from '../../data/site.js'
import Reveal from '../Reveal/Reveal.jsx'
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
        {/* Each grid child is wrapped in its own <Reveal> rather than one
            Reveal around the whole group — CSS grid needs each item to be
            a direct child of the grid container to lay out correctly, so
            wrapping all three in a single outer element would collapse
            them into one grid cell. Reveal's className prop puts the
            grid-item class (about__body, etc.) directly on the element
            it renders, so the grid rules in About.css still apply
            exactly as before. */}
        <Reveal className="section-head">
          <h2>A little about me</h2>
        </Reveal>

        {/* The two paragraphs below are hand-written prose, not pulled
            from a data file — edit them directly here if you want to
            change the wording. */}
        <Reveal className="about__body" delay={0.05}>
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
        </Reveal>

        {/* <dl> (description list) is the semantically correct HTML
            element for a set of label/value pairs like this — better for
            screen readers than a plain <div> grid would be. as="dl" tells
            Reveal to render a <motion.dl> instead of its default <div>. */}
        <Reveal as="dl" className="about__meta panel" delay={0.1}>
          {meta.map((row) => (
            <div key={row.label} className="about__meta-row">
              <dt className="mono">{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
