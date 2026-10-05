import { useEffect, useRef } from 'react'
import './HeroCube.css'

// The hero's centerpiece: a soft pastel "toy block" in real 3D (pure CSS
// 3D transforms, no library). Each face wears a different simple shape
// (sun, arch, stripes, dots, rainbow, ring) with a sticker label on top
// naming a kind of testing. It drifts on its own and can
// be dragged to spin (mouse or touch) with a little inertia after you let go.
const FACES = [
  { side: 'front', label: 'Manual' },
  { side: 'back', label: 'Regression' },
  { side: 'right', label: 'Functional' },
  { side: 'left', label: 'Exploratory' },
  { side: 'top', label: 'API' },
  { side: 'bottom', label: 'Test case writing' },
]

export default function HeroCube() {
  const stage = useRef(null)
  const cube = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const idle = reduced ? 0 : 0.25
    const state = { rx: -22, ry: 32, vy: idle, vx: 0, drag: false, lx: 0, ly: 0 }
    let raf = 0

    const paint = () => {
      if (cube.current) cube.current.style.transform = `rotateX(${state.rx}deg) rotateY(${state.ry}deg)`
    }

    const tick = () => {
      if (!state.drag) {
        // Ease any drag velocity back toward the gentle idle spin.
        state.vy += (idle - state.vy) * 0.02
        state.vx *= 0.94
        state.ry += state.vy
        state.rx = Math.max(-60, Math.min(60, state.rx + state.vx))
      }
      paint()
      raf = requestAnimationFrame(tick)
    }

    const el = stage.current
    const down = (e) => {
      state.drag = true
      state.lx = e.clientX
      state.ly = e.clientY
      el.setPointerCapture?.(e.pointerId)
      el.classList.add('is-dragging')
    }
    const move = (e) => {
      if (!state.drag) return
      const dx = e.clientX - state.lx
      const dy = e.clientY - state.ly
      state.lx = e.clientX
      state.ly = e.clientY
      state.ry += dx * 0.55
      state.rx = Math.max(-60, Math.min(60, state.rx - dy * 0.55))
      state.vy = dx * 0.35
      state.vx = -dy * 0.2
    }
    const up = () => {
      state.drag = false
      el.classList.remove('is-dragging')
    }

    el.addEventListener('pointerdown', down)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerup', up)
    el.addEventListener('pointercancel', up)
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointerdown', down)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerup', up)
      el.removeEventListener('pointercancel', up)
    }
  }, [])

  return (
    <div
      ref={stage}
      className="herocube"
      role="img"
      aria-label="A pastel 3D block labelled with the kinds of testing I do: manual, regression, functional, exploratory, API, and test case writing. Drag it to spin."
      data-testid="hero-cube"
    >
      <div className="herocube__scene">
        <div ref={cube} className="herocube__cube">
          {FACES.map((f) => (
            <div key={f.side} className={`herocube__face herocube__face--${f.side}`}>
              <span className="herocube__label">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="herocube__hint">psst… drag me</p>
    </div>
  )
}
