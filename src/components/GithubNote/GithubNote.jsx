import { useEffect, useRef } from 'react'
import './GithubNote.css'

const NOTE_TEXT =
  "Some projects and repositories aren't publicly accessible because they contain private or proprietary work. I'm happy to walk you through relevant examples or provide access where appropriate."

// Shown before sending someone to GitHub (from the Hero button and the
// Contact card), so the "some repos are private" context is visible
// right away instead of being a surprise once they're already there.
// `open`/`onClose` are controlled by whichever parent renders this —
// each caller keeps its own useState for whether the modal is open.
export default function GithubNote({ open, onClose, href }) {
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    panelRef.current?.focus()
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    // Clicking the dark backdrop closes the modal; stopPropagation on the
    // panel itself stops a click inside the panel from bubbling up and
    // triggering that same close handler.
    <div className="github-note__overlay" onClick={onClose}>
      <div
        className="github-note__panel panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="github-note-heading"
        tabIndex={-1}
        ref={panelRef}
        onClick={(event) => event.stopPropagation()}
        data-testid="github-note-modal"
      >
        <button type="button" className="github-note__close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <h3 id="github-note-heading">Before you head over</h3>
        <p>{NOTE_TEXT}</p>

        <div className="github-note__actions">
          <a href={href} className="btn btn-primary" target="_blank" rel="noreferrer" onClick={onClose}>
            Continue to GitHub
          </a>
          <a href="#contact" className="btn btn-secondary" onClick={onClose}>
            Get in touch instead
          </a>
        </div>
      </div>
    </div>
  )
}
