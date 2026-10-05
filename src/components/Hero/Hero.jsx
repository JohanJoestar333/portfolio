import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { site } from '../../data/site.js'
import HeroCube from '../HeroCube/HeroCube.jsx'
import './Hero.css'

// Staggered entrance for the text column: each child starts 0.12s after
// the previous one.
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

// The name flips up letter by letter in 3D. Each letter's color is mixed
// between the text color and the accent, so the name carries a gradient
// without gradient-clipped text (which breaks under 3D transforms).
const letter = {
  hidden: { opacity: 0, rotateX: -90, y: 24 },
  show: { opacity: 1, rotateX: 0, y: 0, transition: { type: 'spring', stiffness: 160, damping: 16 } },
}

// Little decorative stickers scattered around the cube. Each is a tiny
// inline SVG painted with the pastel tokens, floating at its own pace.
function Stickers() {
  return (
    <div className="hero__stickers" aria-hidden="true">
      <svg className="hero__sticker hero__sticker--sun" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="9" fill="var(--strong-butter)" />
        <g stroke="var(--strong-butter)" strokeWidth="3" strokeLinecap="round">
          <path d="M24 4v6M24 38v6M4 24h6M38 24h6M9.9 9.9l4.2 4.2M33.9 33.9l4.2 4.2M9.9 38.1l4.2-4.2M33.9 14.1l4.2-4.2" />
        </g>
      </svg>
      <svg className="hero__sticker hero__sticker--leaf" viewBox="0 0 48 48">
        <path d="M8 40C8 20 20 8 40 8c0 20-12 32-32 32Z" fill="var(--strong-sage)" />
        <path d="M10 38C20 28 28 20 36 12" stroke="var(--pastel-sage)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </svg>
      <svg className="hero__sticker hero__sticker--spark" viewBox="0 0 48 48">
        <path d="M24 3c1.5 12 9 19.500 21 21-12 1.500-19.500 9-21 21C22.500 33 15 25.500 3 24 15 22.500 22.500 15 24 3Z" fill="var(--strong-rose)" />
      </svg>
      <svg className="hero__sticker hero__sticker--wave" viewBox="0 0 64 20">
        <path d="M2 10Q10 0 18 10T34 10T50 10T62 10" fill="none" stroke="var(--strong-sky)" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <svg className="hero__sticker hero__sticker--flower" viewBox="0 0 48 48">
        <g fill="var(--strong-lilac)">
          <circle cx="24" cy="12" r="8" /><circle cx="36" cy="24" r="8" /><circle cx="24" cy="36" r="8" /><circle cx="12" cy="24" r="8" />
        </g>
        <circle cx="24" cy="24" r="6" fill="var(--strong-butter)" />
      </svg>
    </div>
  )
}

const ROTATING = ['new features', 'edge cases', 'regressions', 'APIs', 'accessibility']

function Rotator() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % ROTATING.length), 2200)
    return () => clearInterval(id)
  }, [])
  return (
    <p className="hero__rotator" aria-hidden="true">
      <span>I test </span>
      <span className="hero__rotator-window">
        <AnimatePresence mode="wait">
          <motion.span
            key={ROTATING[i]}
            className="hero__rotator-word"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {ROTATING[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </p>
  )
}

export default function Hero() {
  const letters = site.name.split('')
  return (
    // id="top" is what the navbar's logo link (href="#top") scrolls to.
    <section id="top" className="hero">
      {/* Decorative background: two soft pastel blobs and a dotted-paper texture. */}
      <div className="hero__dots" aria-hidden="true" />
      <div className="hero__blob hero__blob--a" aria-hidden="true" />
      <div className="hero__blob hero__blob--b" aria-hidden="true" />

      <div className="container hero__layout">
        <motion.div className="hero__inner" variants={container} initial="hidden" animate="show">
          <motion.p variants={item} className="eyebrow">
            {site.role}
          </motion.p>

          <motion.h1 className="hero__name" aria-label={site.name} variants={container}>
            {letters.map((ch, idx) => (
              <motion.span
                key={`${ch}-${idx}`}
                variants={letter}
                className="hero__letter"
                aria-hidden="true"
                style={{
                  color: `color-mix(in srgb, var(--accent) ${Math.round((idx / Math.max(letters.length - 1, 1)) * 100)}%, var(--text-primary))`,
                }}
              >
                {ch}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div variants={item}>
            <Rotator />
          </motion.div>

          <motion.blockquote variants={item} className="hero__quote">
            “I don’t just test if it works.
            <br />
            I try to find out how it breaks.”
          </motion.blockquote>

          <motion.p variants={item} className="hero__lede">
            {site.heroLede}
          </motion.p>

          <motion.div variants={item} className="hero__actions">
            <a href="#qa-lab" className="btn btn-primary">
              Explore QA Lab
            </a>
            <a href="#projects" className="btn btn-secondary">
              See Projects
            </a>
            <a href={site.resumePath} download className="btn btn-secondary" data-testid="hero-resume">
              Download Resume
            </a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" className="btn btn-secondary" data-testid="hero-linkedin">
              LinkedIn
            </a>
          </motion.div>

          <motion.span variants={item} className="pill" data-testid="hero-status">
            <span className="dot dot--pulse" />
            {site.status}
          </motion.span>
        </motion.div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.85, rotateY: -25 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: 'easeOut' }}
        >
          <HeroCube />
          <Stickers />
        </motion.div>
      </div>
    </section>
  )
}
