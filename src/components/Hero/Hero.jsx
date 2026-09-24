import { useState } from 'react'
import { motion } from 'framer-motion'
import { site } from '../../data/site.js'
import GithubNote from '../GithubNote/GithubNote.jsx'
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
  // Controls whether the "before you head to GitHub" note is showing.
  const [githubNoteOpen, setGithubNoteOpen] = useState(false)

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
          Software QA Analyst focused on manual testing, exploratory testing,
          regression, UI and API testing, while continuously expanding my
          automation skills.
        </motion.p>

        <motion.div variants={item} className="hero__actions">
          {/* Scrolls to the QA Lab section further down this same page. */}
          <a href="#qa-lab" className="btn btn-primary">
            Explore QA Lab
          </a>
          {/* A <button> rather than a link, since clicking it opens the
              GithubNote modal below instead of navigating anywhere
              directly — the modal's own "Continue to GitHub" link is
              what actually navigates. */}
          <button type="button" className="btn btn-secondary" onClick={() => setGithubNoteOpen(true)}>
            View GitHub
          </button>
        </motion.div>

        <motion.span variants={item} className="pill" data-testid="hero-status">
          <span className="dot" />
          {site.status}
        </motion.span>
      </motion.div>

      <GithubNote open={githubNoteOpen} onClose={() => setGithubNoteOpen(false)} href={site.github} />
    </section>
  )
}
