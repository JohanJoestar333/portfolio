import { useRef, useState } from 'react'
import './LoginLab.css'

const DEMO_EMAIL = 'demo@thomas.dev'
const DEMO_PASSWORD = 'Testing123'
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const SUBMIT_DELAY = 450

// Each preset scenario below auto-fills the two fields and immediately
// submits, so a visitor can see a specific bug (or correct behavior)
// without having to type it themselves. `classify()` further down maps
// ANY input — preset or hand-typed — to one of these same ids, so typing
// your own whitespace-only email produces the same result as clicking
// the "Whitespace-only email" button.
const SCENARIOS = [
  { id: 'empty-email', label: 'Empty email', email: '', password: 'Testing123' },
  { id: 'empty-password', label: 'Empty password', email: 'demo@thomas.dev', password: '' },
  { id: 'invalid-format', label: 'Invalid email format', email: 'not-an-email', password: 'Testing123' },
  { id: 'whitespace-email', label: 'Whitespace-only email', email: '   ', password: 'Testing123' },
  { id: 'short-password', label: 'One-character password', email: 'demo@thomas.dev', password: 'x' },
  {
    id: 'padded-credentials',
    label: 'Whitespace around valid credentials',
    email: '  demo@thomas.dev  ',
    password: 'Testing123',
  },
  { id: 'incorrect-credentials', label: 'Incorrect credentials', email: 'demo@thomas.dev', password: 'wrongpassword' },
  { id: 'valid-credentials', label: 'Valid credentials', email: 'demo@thomas.dev', password: 'Testing123' },
  { id: 'double-click', label: 'Double-click Login', email: 'demo@thomas.dev', password: 'Testing123' },
]

// Expected behaviour + how to read the "actual" result for each scenario
// category. Kept separate from the validation logic below so the rules of
// the demo are easy to audit independently of the (partly buggy) app code.
const CATEGORY_CONFIG = {
  'empty-email': {
    expected: 'Validation message shown for the email field.',
    isBug: (r) => !r.emailError,
    actual: (r) =>
      r.emailError ? 'Validation message shown for the email field.' : 'No validation shown — form allowed submission.',
  },
  'empty-password': {
    expected: 'Validation message shown for the password field.',
    isBug: (r) => !r.passwordError,
    actual: (r) =>
      r.passwordError
        ? 'Validation message shown for the password field.'
        : 'No validation shown — form allowed submission.',
  },
  'invalid-format': {
    expected: 'Validation message shown for the email field.',
    isBug: (r) => !r.emailError,
    actual: (r) => (r.emailError ? 'Validation message shown for the email field.' : 'Input accepted without a format check.'),
  },
  'whitespace-email': {
    expected: 'Input rejected as empty.',
    isBug: (r) => !r.emailError,
    actual: (r) => (r.emailError ? 'Input rejected as empty.' : 'Input accepted as if it were a real value.'),
  },
  'short-password': {
    expected: 'Validation message shown — password too short.',
    isBug: (r) => !r.passwordError,
    actual: (r) =>
      r.passwordError ? 'Validation message shown — password too short.' : 'Accepted with no minimum length check.',
  },
  'padded-credentials': {
    expected: 'Whitespace trimmed automatically; login succeeds.',
    isBug: (r) => !r.success,
    actual: (r) => (r.success ? 'Whitespace trimmed automatically; login succeeded.' : 'Login failed — whitespace was not trimmed.'),
  },
  'incorrect-credentials': {
    expected: '"Invalid email or password" message shown.',
    isBug: (r) => !r.invalidCredentials,
    actual: (r) =>
      r.invalidCredentials ? '"Invalid email or password" message shown.' : 'Unexpected result for incorrect credentials.',
  },
  'valid-credentials': {
    expected: 'Login succeeds.',
    isBug: (r) => !r.success,
    actual: (r) => (r.success ? 'Login succeeded.' : 'Login failed unexpectedly for valid credentials.'),
  },
}

const SCENARIO_LABELS = Object.fromEntries(SCENARIOS.map((s) => [s.id, s.label]))

// The validation logic below is intentionally imperfect in two documented
// places — see the BUG comments. Everything else behaves correctly.
// (Internal decisions log: QA_NOTES.md)
function evaluate(rawEmail, rawPassword) {
  let emailError = null
  let passwordError = null

  // Required checks run on the raw (untrimmed) length.
  if (rawEmail.length === 0) {
    emailError = 'Email is required.'
  }
  if (rawPassword.length === 0) {
    passwordError = 'Password is required.'
  }

  if (!emailError) {
    const trimmed = rawEmail.trim()
    // BUG: this guard assumes an empty-after-trim value was already
    // caught by the required check above — but that check used the raw
    // length, so a whitespace-only email slips past both checks untouched.
    if (trimmed.length > 0 && !EMAIL_PATTERN.test(trimmed)) {
      emailError = 'Enter a valid email address.'
    }
  }

  // BUG: no minimum length is enforced on the password field.

  const hasError = Boolean(emailError || passwordError)
  const isMatch = rawEmail.trim().toLowerCase() === DEMO_EMAIL && rawPassword.trim() === DEMO_PASSWORD

  return {
    emailError,
    passwordError,
    hasError,
    success: !hasError && isMatch,
    invalidCredentials: !hasError && !isMatch,
  }
}

function classify(rawEmail, rawPassword) {
  if (rawEmail.length === 0) return 'empty-email'
  if (rawPassword.length === 0) return 'empty-password'
  if (rawEmail.trim().length === 0) return 'whitespace-email'
  if (!EMAIL_PATTERN.test(rawEmail.trim())) return 'invalid-format'
  if (rawPassword.length === 1) return 'short-password'
  if (rawEmail !== rawEmail.trim() || rawPassword !== rawPassword.trim()) return 'padded-credentials'
  const isMatch = rawEmail.trim().toLowerCase() === DEMO_EMAIL && rawPassword === DEMO_PASSWORD
  return isMatch ? 'valid-credentials' : 'incorrect-credentials'
}

let logId = 0

export default function LoginLab() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [touched, setTouched] = useState(false) // Have we attempted a login yet? Controls whether errors/banner show at all.
  const [result, setResult] = useState(null) // Output of evaluate() for the most recent attempt.
  const [log, setLog] = useState([]) // History of attempts, newest first — rendered in the "Results" panel.
  const inFlight = useRef(0) // Counts in-progress (simulated) login requests — used by the double-click scenario.

  // Adds one entry to the top of the results log, capped at 8 so the
  // list doesn't grow forever during a long visit.
  function pushLog(entry) {
    logId += 1
    setLog((prev) => [{ id: logId, ...entry }, ...prev].slice(0, 8))
  }

  // Runs the actual validation for one login attempt (from either the
  // real form or a preset scenario) and logs the result.
  function runAttempt(rawEmail, rawPassword, { label } = {}) {
    setTouched(true)
    const evalResult = evaluate(rawEmail, rawPassword)
    setResult(evalResult)

    const category = classify(rawEmail, rawPassword)
    const config = CATEGORY_CONFIG[category]
    pushLog({
      title: label ?? SCENARIO_LABELS[category] ?? 'Manual attempt',
      isBug: config.isBug(evalResult),
      expected: config.expected,
      actual: config.actual(evalResult),
    })
  }

  function handleFormSubmit(event) {
    event.preventDefault()
    runAttempt(email, password)
  }

  function runScenario(scenario) {
    setEmail(scenario.email)
    setPassword(scenario.password)

    if (scenario.id === 'double-click') {
      runDoubleClick(scenario.email, scenario.password)
      return
    }

    runAttempt(scenario.email, scenario.password, { label: scenario.label })
  }

  // Simulates two rapid clicks on the login button. Because the real
  // handleSubmit/evaluate path never disables the button while a request
  // is "in flight", firing two attempts 100ms apart (much less than the
  // 450ms fake network delay) lets both land at once — proving the bug
  // is real rather than staged.
  async function runDoubleClick(rawEmail, rawPassword) {
    setTouched(true)
    let maxInFlight = 0

    const fire = async () => {
      inFlight.current += 1
      maxInFlight = Math.max(maxInFlight, inFlight.current)
      await new Promise((res) => setTimeout(res, SUBMIT_DELAY))
      inFlight.current -= 1
    }

    const first = fire()
    await new Promise((res) => setTimeout(res, 100))
    const second = fire()
    await Promise.all([first, second])

    setResult(evaluate(rawEmail, rawPassword))
    pushLog({
      title: 'Double-click Login',
      isBug: maxInFlight > 1,
      expected: 'Only one login request is processed per submission.',
      actual:
        maxInFlight > 1
          ? `${maxInFlight} overlapping requests were processed — the button doesn't disable while a request is pending.`
          : 'Only one request was processed.',
    })
  }

  const bannerText =
    touched && result && !result.hasError ? (result.success ? 'Login succeeded.' : 'Invalid email or password.') : ''
  const bannerClass = result?.success ? 'is-success' : bannerText ? 'is-failure' : ''

  return (
    // .qa-lab-experience is the shared "app on the left, QA panel on the
    // right" grid defined once in QALab.css and reused by FormLab too.
    <div className="qa-lab-experience login-lab">
      <div className="panel login-lab__app">
        <p className="eyebrow">App under test</p>
        <form onSubmit={handleFormSubmit} noValidate>
          <label className="login-lab__field">
            <span>Email</span>
            <input
              type="text"
              autoComplete="off"
              value={email}
              data-testid="login-email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          {touched && result?.emailError && (
            <p className="login-lab__error" data-testid="login-email-error">
              {result.emailError}
            </p>
          )}

          <label className="login-lab__field">
            <span>Password</span>
            <input
              type="password"
              autoComplete="off"
              value={password}
              data-testid="login-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {touched && result?.passwordError && (
            <p className="login-lab__error" data-testid="login-password-error">
              {result.passwordError}
            </p>
          )}

          <button type="submit" className="btn btn-primary" data-testid="login-submit">
            Log in
          </button>
        </form>

        <p
          className={`login-lab__banner ${bannerClass}`}
          role="status"
          aria-live="polite"
          data-testid="login-banner"
        >
          {bannerText}
        </p>

        <p className="login-lab__hint mono">
          Try <strong>demo@thomas.dev</strong> / <strong>Testing123</strong>
        </p>
      </div>

      <div className="panel login-lab__qa">
        <p className="eyebrow">Test scenarios</p>
        <div className="login-lab__scenarios">
          {SCENARIOS.map((scenario) => (
            <button
              key={scenario.id}
              type="button"
              className="login-lab__scenario-btn"
              data-testid={`login-scenario-${scenario.id}`}
              onClick={() => runScenario(scenario)}
            >
              {scenario.label}
            </button>
          ))}
        </div>

        <p className="eyebrow login-lab__results-label">Results</p>
        <ul className="login-lab__log scroll-x" data-testid="login-log">
          {log.length === 0 && <li className="login-lab__log-empty">No attempts yet — try a scenario or log in above.</li>}
          {log.map((entry) => (
            <li key={entry.id} className="login-lab__log-entry">
              <div className="login-lab__log-head">
                <span>{entry.title}</span>
                <span className={`status ${entry.isBug ? 'status-fail' : 'status-pass'}`}>
                  {entry.isBug ? 'BUG FOUND' : 'PASS'}
                </span>
              </div>
              <p className="login-lab__log-line mono">
                <span>Expected:</span> {entry.expected}
              </p>
              <p className="login-lab__log-line mono">
                <span>Actual:</span> {entry.actual}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
