import { useEffect } from 'react'

// One set of delegated listeners (instead of per-component handlers) that
// powers the site's "alive" feel. Everything here is progressive
// enhancement: it only runs for a fine pointer (mouse/trackpad) and is
// skipped entirely when the visitor prefers reduced motion.
//
//  - Cursor glow:  sets --gx/--gy on <html>; globals.css paints a soft
//                  light that follows the cursor behind the page.
//  - Spotlight:    sets --mx/--my on any .panel under the cursor so its
//                  hover highlight tracks the pointer.
//  - 3D tilt:      cards listed in TILT lean toward the cursor. Uses the
//                  individual `rotate` CSS property (not `transform`) so it
//                  never fights Framer Motion's entrance animations.
//  - Magnetic:     buttons drift slightly toward the cursor (`translate`).
const TILT = '.skills__category, .certificates__card, .projects__card, .writing__post, .about__interest, .about__stat'
const MAX_TILT_DEG = 7

export default function useInteractions() {
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return undefined

    const root = document.documentElement
    let tilted = null
    let magnet = null

    const resetTilt = () => {
      if (tilted) tilted.style.rotate = ''
      tilted = null
    }
    const resetMagnet = () => {
      if (magnet) magnet.style.translate = ''
      magnet = null
    }

    const onMove = (e) => {
      root.style.setProperty('--gx', `${e.clientX}px`)
      root.style.setProperty('--gy', `${e.clientY}px`)

      const panel = e.target.closest?.('.panel')
      if (panel) {
        const r = panel.getBoundingClientRect()
        panel.style.setProperty('--mx', `${e.clientX - r.left}px`)
        panel.style.setProperty('--my', `${e.clientY - r.top}px`)
      }

      const card = e.target.closest?.(TILT)
      if (tilted && tilted !== card) resetTilt()
      if (card) {
        const r = card.getBoundingClientRect()
        const px = ((e.clientX - r.left) / r.width - 0.5) * 2
        const py = ((e.clientY - r.top) / r.height - 0.5) * 2
        const angle = Math.min(Math.hypot(px, py), 1) * MAX_TILT_DEG
        card.style.rotate = `${-py.toFixed(3)} ${px.toFixed(3)} 0 ${angle.toFixed(2)}deg`
        tilted = card
      }

      const btn = e.target.closest?.('.btn')
      if (magnet && magnet !== btn) resetMagnet()
      if (btn) {
        const r = btn.getBoundingClientRect()
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.18
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.28
        btn.style.translate = `${dx.toFixed(1)}px ${dy.toFixed(1)}px`
        magnet = btn
      }
    }

    const onLeave = () => {
      resetTilt()
      resetMagnet()
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      onLeave()
    }
  }, [])
}
