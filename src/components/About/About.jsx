import { useLang } from '../../i18n/LanguageContext.jsx'
import Reveal from '../Reveal/Reveal.jsx'
import CountUp from '../CountUp/CountUp.jsx'
import './About.css'

// The little "Location / Role / Experience / Focus" panel is built from
// this array, which just pulls its values from src/data/site.js — so to
// change what shows up here, edit site.js rather than this file.
export default function About() {
  const { t, c } = useLang()
  const { site, about, interests, certificates, posts } = c
  // Location / Role / Experience / Focus panel, from the site data.
  const meta = [
    { label: t.about.location, value: site.location },
    { label: t.about.role, value: site.role },
    { label: t.about.experience, value: `${site.experienceStart} ${t.about.present}` },
    { label: t.about.focus, value: site.focus },
  ]
  // Computed, so it can't go stale: years from site.experienceStart,
  // certificates and articles counted from their data.
  const years = new Date().getFullYear() - Number(site.experienceStart)
  const stats = [
    { key: 'years', label: t.about.years, value: `${years}+` },
    { key: 'certs', label: t.about.certificates, value: certificates.length },
    { key: 'articles', label: t.about.articles, value: posts.length },
  ]

  return (
    <section id="about" className="section about">
      {/* Two-column layout on wide screens (prose left, meta panel
          right), stacked on mobile — see the @media rule in About.css. */}
      <div className="container about__grid">
        {/* Each grid child is wrapped in its own <Reveal> rather than one
            Reveal around the whole group — CSS grid needs each item to be
            a direct child of the grid container to lay out correctly. */}
        <Reveal className="section-head">
          <h2>{t.about.title}</h2>
        </Reveal>

        {/* Paragraphs come from the `about` array in src/data/site.js. */}
        <Reveal className="about__body" delay={0.05}>
          {about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
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

        <Reveal as="ul" className="about__stats" delay={0.05} data-testid="about-stats">
          {stats.map((stat) => (
            <li key={stat.key} className="about__stat panel">
              <span className="about__stat-value mono">
                <CountUp value={stat.value} />
              </span>
              <span className="about__stat-label">{stat.label}</span>
            </li>
          ))}
        </Reveal>

        <Reveal className="about__interests" delay={0.05}>
          <p className="eyebrow">{t.about.into}</p>
          <ul className="about__interest-grid">
            {interests.map((interest) => (
              <li key={interest.title} className="about__interest panel" data-testid="about-interest">
                <h3>{interest.title}</h3>
                <p>{interest.description}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
