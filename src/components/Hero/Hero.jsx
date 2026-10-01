import { motion } from 'framer-motion'
import { site } from '../../data/site.js'
import './Hero.css'

// `container` and `item` are Framer Motion "variants" — reusable sets of
// animation states. Any <motion.X variants={container}> element controls
// its children's timing via staggerChildren/delayChildren; any
// <motion.X variants={item}> element fades up individually. Together they
// create the "everything appears in sequence on page load" effect,
// instead of everything popping in at once.
const container = {
  hidden: {},
  show: {
    // Each child starts 0.12s after the previous one, and the whole
    // group waits 0.1s before starting at all.
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 }, // Start invisible, 16px lower than final position.
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Hero() {
  return (
    // id="top" is what the navbar's logo link (href="#top") scrolls to.
    <section id="top" className="hero">
      {/* The outer motion.div uses the "container" variant and starts the
          animation immediately on mount (initial="hidden" -> animate="show").
          Every direct <motion.X variants={item}> child below automatically
          staggers in because it inherits timing from this parent. */}
      <motion.div
        className="container hero__inner"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p variants={item} className="eyebrow">
          {site.role}
        </motion.p>

        <motion.h1 variants={item} className="hero__name">
          {site.name}
        </motion.h1>

        <motion.blockquote variants={item} className="hero__quote">
          “I don’t just test if it works.
          <br />
          I try to find out how it breaks.”
        </motion.blockquote>

        <motion.p variants={item} className="hero__lede">
          {site.heroLede}
        </motion.p>

        <motion.div variants={item} className="hero__actions">
          {/* Scrolls to the QA Lab section further down this same page. */}
          <a href="#qa-lab" className="btn btn-primary">
            Explore QA Lab
          </a>
          {/* Straight to the thing most recruiters want: the resume. */}
          <a href={site.resumePath} download className="btn btn-secondary" data-testid="hero-resume">
            Download Resume
          </a>
          <a href={site.linkedin} target="_blank" rel="noreferrer" className="btn btn-secondary" data-testid="hero-linkedin">
            LinkedIn
          </a>
        </motion.div>

        <motion.span variants={item} className="pill" data-testid="hero-status">
          <span className="dot" />
          {site.status}
        </motion.span>
      </motion.div>
    </section>
  )
}
