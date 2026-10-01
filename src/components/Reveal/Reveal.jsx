import { motion } from 'framer-motion'

// Wrap any block of content in <Reveal> to make it fade up into place the
// first time it scrolls into view, instead of just appearing instantly.
// `viewport={{ once: true }}` means it only ever plays once per element
// (scrolling back up and down again won't re-trigger it) — this keeps it
// feeling like a one-time entrance rather than a distracting repeated
// effect. `amount: 0.2` means it starts as soon as 20% of the element is
// visible, so it plays a little before the element is fully in frame.
//
// `delay` lets a parent stagger multiple <Reveal>s slightly (e.g. 0, 0.1,
// 0.2) so a row of cards doesn't all pop in at the exact same instant.
// Respects prefers-reduced-motion automatically, via the global rule in
// globals.css that shortens all animation/transition durations to ~0 for
// visitors who've asked for reduced motion at the OS level.
export default function Reveal({ children, as = 'div', delay = 0, className, ...rest }) {
  const MotionTag = motion[as] ?? motion.div

  // `...rest` forwards anything else the caller passed — href/target/rel
  // when as="a", data-testid, aria attributes, and so on — straight onto
  // the rendered element, same as they would if this weren't wrapped in
  // Reveal at all.
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: 'easeOut', delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
