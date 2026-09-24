import { useRef, useState } from 'react'
import './BugHunter.css'

// The single source of truth for which bugs exist. `id` must match a key
// in the WIDGETS map further down (that's how each bug's metadata gets
// paired with the component that actually reproduces it). To add a 6th
// bug: write a new mini-widget component below, add it to WIDGETS, and
// add one line here.
const BUGS = [
  { id: 'counter', title: 'Counter skips a number', category: 'Logic', difficulty: 2 },
  { id: 'toggle', title: "Success message doesn't reset", category: 'State', difficulty: 1 },
  { id: 'cart', title: 'Button can be double-triggered', category: 'Interaction', difficulty: 2 },
  { id: 'promo', title: 'Promo code accepts invalid input', category: 'Validation', difficulty: 2 },
  { id: 'delete', title: 'Misleading error message', category: 'Messaging', difficulty: 1 },
]

// Each widget below hides exactly one real, reproducible bug — no red
// herrings. See QA_NOTES.md for the full breakdown.

function CounterBug() {
  const [count, setCount] = useState(0)

  function increment() {
    // BUG: skips 3 on the way up from 2.
    setCount((c) => (c === 2 ? c + 2 : c + 1))
  }

  return (
    <div className="bug-widget">
      <p className="bug-widget__label">Click counter</p>
      <button type="button" className="btn btn-secondary" onClick={increment} data-testid="bug-counter-btn">
        Count: {count}
      </button>
    </div>
  )
}

function ToggleBug() {
  const [checked, setChecked] = useState(false)
  const [everChecked, setEverChecked] = useState(false)

  function handleChange(event) {
    setChecked(event.target.checked)
    // BUG: once shown, the success message never re-hides when the box
    // is unchecked again.
    if (event.target.checked) setEverChecked(true)
  }

  return (
    <div className="bug-widget">
      <label className="bug-widget__checkbox">
        <input type="checkbox" checked={checked} onChange={handleChange} data-testid="bug-toggle-input" />
        Accept terms
      </label>
      {everChecked && <p className="bug-widget__success">Terms accepted.</p>}
    </div>
  )
}

function CartBug() {
  const [items, setItems] = useState(0)
  const lastClick = useRef(0)

  function handleClick() {
    const now = Date.now()
    // BUG: clicks within 300ms of each other both register, adding 2
    // items instead of 1 — no debounce on the button.
    if (now - lastClick.current < 300) {
      setItems((n) => n + 2)
    } else {
      setItems((n) => n + 1)
    }
    lastClick.current = now
  }

  return (
    <div className="bug-widget">
      <button type="button" className="btn btn-secondary" onClick={handleClick} data-testid="bug-cart-btn">
        Add to cart
      </button>
      <p className="bug-widget__meta mono">Items: {items}</p>
    </div>
  )
}

function PromoBug() {
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')

  function handleCheck() {
    // BUG: intended rule is "exactly 6 uppercase letters", but this check
    // is case-insensitive and never checks length.
    const isValid = /^[a-z]+$/i.test(code)
    setMessage(isValid ? 'Valid code!' : 'Invalid code.')
  }

  return (
    <div className="bug-widget">
      <label className="bug-widget__field">
        <span>Promo code</span>
        <input type="text" value={code} onChange={(e) => setCode(e.target.value)} data-testid="bug-promo-input" />
      </label>
      <button type="button" className="btn btn-secondary" onClick={handleCheck} data-testid="bug-promo-btn">
        Apply
      </button>
      {message && <p className="bug-widget__meta mono">{message}</p>}
    </div>
  )
}

function DeleteBug() {
  const [message, setMessage] = useState('')

  function handleDelete() {
    // BUG: shows a generic, unrelated error regardless of the real cause
    // (nothing was selected — that's what the message should say).
    setMessage('Network error. Please try again.')
  }

  return (
    <div className="bug-widget">
      <button type="button" className="btn btn-secondary" onClick={handleDelete} data-testid="bug-delete-btn">
        Delete item
      </button>
      {message && <p className="bug-widget__error">{message}</p>}
    </div>
  )
}

const WIDGETS = {
  counter: CounterBug,
  toggle: ToggleBug,
  cart: CartBug,
  promo: PromoBug,
  delete: DeleteBug,
}

// The inline "file a bug report" form shown when a visitor clicks
// "Report this bug" on a card. All fields are local state here — nothing
// is validated or persisted, since submitting always just calls
// onSubmit() to mark that bug as found.
function BugReportForm({ bug, onSubmit, onCancel }) {
  const [steps, setSteps] = useState('')
  const [expected, setExpected] = useState('')
  const [actual, setActual] = useState('')
  const [severity, setSeverity] = useState('Medium')

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form className="bug-report" onSubmit={handleSubmit} data-testid={`bug-report-form-${bug.id}`}>
      <label className="bug-report__field">
        <span>Title</span>
        <input type="text" value={bug.title} readOnly />
      </label>
      <label className="bug-report__field">
        <span>Steps to reproduce</span>
        <textarea rows={2} value={steps} onChange={(e) => setSteps(e.target.value)} />
      </label>
      <label className="bug-report__field">
        <span>Expected behavior</span>
        <input type="text" value={expected} onChange={(e) => setExpected(e.target.value)} />
      </label>
      <label className="bug-report__field">
        <span>Actual behavior</span>
        <input type="text" value={actual} onChange={(e) => setActual(e.target.value)} />
      </label>
      <label className="bug-report__field">
        <span>Severity</span>
        <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>
      </label>
      <div className="bug-report__actions">
        <button type="submit" className="btn btn-primary">
          Submit report
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  )
}

// `found` is purely local component state: { counter: true, toggle: false, ... }.
// Nothing here is sent to a server or saved anywhere — refreshing the
// page resets everything, by design (see the brief: "No backend is
// required. Do not send or store visitor information.").
export default function BugHunter() {
  const [found, setFound] = useState({})
  const [reportingId, setReportingId] = useState(null) // Which bug's report form is currently open (or null for none).

  const foundCount = Object.values(found).filter(Boolean).length
  const allFound = foundCount === BUGS.length

  function submitReport(id) {
    setFound((prev) => ({ ...prev, [id]: true }))
    setReportingId(null)
  }

  function resetAll() {
    setFound({})
    setReportingId(null)
  }

  return (
    <div className="bug-hunter">
      <div className="bug-hunter__head">
        <p className="eyebrow">Can you find the bugs?</p>
        <p className="bug-hunter__intro">I've hidden {BUGS.length} intentional bugs around this little application.</p>
        <p className="bug-hunter__count mono" data-testid="bug-hunter-count">
          {foundCount} / {BUGS.length} bugs found
        </p>
      </div>

      {allFound ? (
        // Once every bug is found, the whole grid is replaced by the
        // completion panel — "Play again" just clears `found`, which
        // brings the grid back.
        <div className="panel bug-hunter__complete">
          <p>You broke it.</p>
          <p className="bug-hunter__complete-sub">That's exactly what I wanted you to do.</p>
          <button type="button" className="btn btn-secondary" onClick={resetAll}>
            Play again
          </button>
        </div>
      ) : (
        <div className="bug-hunter__grid">
          {BUGS.map((bug) => {
            const Widget = WIDGETS[bug.id] // Look up this bug's actual interactive widget component.
            const isFound = Boolean(found[bug.id])
            return (
              <div key={bug.id} className="panel bug-hunter__card">
                <Widget />
                {/* Three states per card, in priority order:
                    1. Already found -> show the "BUG FOUND" badge.
                    2. Currently filling out the report form for THIS bug.
                    3. Neither -> show the "Report this bug" button. */}
                {isFound ? (
                  <p className="bug-hunter__found mono">
                    🐛 BUG FOUND
                    <br />
                    Category: {bug.category}
                    <br />
                    Difficulty: {'★'.repeat(bug.difficulty)}
                    {'☆'.repeat(3 - bug.difficulty)}
                  </p>
                ) : reportingId === bug.id ? (
                  <BugReportForm bug={bug} onSubmit={() => submitReport(bug.id)} onCancel={() => setReportingId(null)} />
                ) : (
                  <button
                    type="button"
                    className="bug-hunter__report-btn"
                    onClick={() => setReportingId(bug.id)}
                    data-testid={`bug-report-btn-${bug.id}`}
                  >
                    🐛 Report this bug
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
