import { motion, useScroll } from 'framer-motion'
import './ScrollProgress.css'

// A thin bar fixed to the very top of the viewport that fills left-to-
// right as the visitor scrolls down the page — 0% at the top, 100% at
// the bottom. useScroll() (with no target) tracks the whole page's
// scroll position and returns `scrollYProgress`, a Framer Motion
// "motion value" from 0 to 1; we bind it directly to scaleX so it
// updates every frame without triggering a React re-render each time.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />
}
