import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'

// Counts up to a number the first time it scrolls into view. Accepts a
// number or a string like "4+": the leading digits animate, the rest is
// kept as a suffix. Anything non-numeric is shown as-is.
export default function CountUp({ value }) {
  const match = String(value).match(/^(\d+)(.*)$/)
  const isNumeric = Boolean(match)
  const target = match ? Number(match[1]) : 0
  const suffix = match ? match[2] : ''
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [n, setN] = useState(reduced ? target : 0)

  useEffect(() => {
    if (!isNumeric || reduced || !inView) return undefined
    const controls = animate(0, target, {
      duration: 1.3,
      ease: 'easeOut',
      onUpdate: (v) => setN(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, target, reduced, isNumeric])

  if (!isNumeric) return <span ref={ref}>{value}</span>
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  )
}
