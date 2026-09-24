import { useState } from 'react'
import './FormLab.css'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const INITIAL_VALUES = { name: '', email: '', phone: '', age: '', message: '' }
const MESSAGE_MAX_LENGTH = 500

// BUG (message required-check): uses the raw, untrimmed length — a
// whitespace-only message is treated as "provided" and never flagged.
// Name/email/phone all use the trimmed length correctly. (QA_NOTES.md)
function validate(values) {
  const errors = {}

  if (values.name.trim().length === 0) errors.name = 'This field is required.'
  if (values.phone.trim().length === 0) errors.phone = 'This field is required.'
  if (values.email.trim().length === 0) errors.email = 'This field is required.'
  if (values.message.length === 0) errors.message = 'This field is required.'

  if (!errors.email && values.email.trim().length > 0 && !EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }

  if (values.age.trim().length > 0) {
    const ageNum = Number(values.age)
    if (Number.isNaN(ageNum) || ageNum < 0 || ageNum > 120) {
      errors.age = 'Enter a number between 0 and 120.'
    }
  }

  // BUG: no maximum length is enforced on the message field.

  return errors
}

export default function FormLab() {
  const [values, setValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState({}) // Field-level error messages from the most recent submit.
  const [submitted, setSubmitted] = useState(false) // Has the form been submitted at least once? Gates when errors/checklist show.
  const [submitCount, setSubmitCount] = useState(0) // Just a small "Submissions this session" counter, shown at the bottom.
  // These two flip to `true` the first time a submission proves the bug
  // exists, and then stay `true` for the rest of the session — like a
  // real regression that's been found and logged, not something that can
  // un-happen. That's why they're separate booleans rather than being
  // recomputed fresh on every submit.
  const [maxLengthFound, setMaxLengthFound] = useState(false)
  const [whitespaceFound, setWhitespaceFound] = useState(false)

  // Returns an onChange handler for a specific field, so each <input>
  // below doesn't need its own inline handler.
  function handleChange(field) {
    return (event) => setValues((prev) => ({ ...prev, [field]: event.target.value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    setSubmitted(true)
    setSubmitCount((c) => c + 1)

    // Check whether THIS submission is the one that reveals either known
    // gap — if so, flip the sticky flag on (see comment above).
    if (values.message.length > MESSAGE_MAX_LENGTH) setMaxLengthFound(true)
    if (values.message.length > 0 && values.message.trim().length === 0) setWhitespaceFound(true)
  }

  // The five rows shown in the "Test results" panel. "required", "email",
  // and "empty" are always true because those checks are genuinely
  // implemented correctly in validate() above — they're not fake, they
  // just don't have a way to fail given this form's logic.
  const checklist = [
    { id: 'required', label: 'Required fields', pass: true },
    { id: 'email', label: 'Email validation', pass: true },
    { id: 'maxlength', label: 'Maximum length', pass: !maxLengthFound },
    { id: 'empty', label: 'Empty submission', pass: true },
    { id: 'whitespace', label: 'Whitespace handling', pass: !whitespaceFound },
  ]

  return (
    <div className="qa-lab-experience form-lab">
      <div className="panel form-lab__app">
        <p className="eyebrow">App under test</p>
        <form onSubmit={handleSubmit} noValidate>
          <label className="form-lab__field">
            <span>Name</span>
            <input type="text" value={values.name} onChange={handleChange('name')} data-testid="form-name" />
          </label>
          {submitted && errors.name && <p className="form-lab__error">{errors.name}</p>}

          <label className="form-lab__field">
            <span>Email</span>
            <input type="text" value={values.email} onChange={handleChange('email')} data-testid="form-email" />
          </label>
          {submitted && errors.email && <p className="form-lab__error">{errors.email}</p>}

          <label className="form-lab__field">
            <span>Phone</span>
            <input type="text" value={values.phone} onChange={handleChange('phone')} data-testid="form-phone" />
          </label>
          {submitted && errors.phone && <p className="form-lab__error">{errors.phone}</p>}

          <label className="form-lab__field">
            <span>Age</span>
            <input type="text" value={values.age} onChange={handleChange('age')} data-testid="form-age" />
          </label>
          {submitted && errors.age && <p className="form-lab__error">{errors.age}</p>}

          <label className="form-lab__field">
            <span>Message</span>
            <textarea rows={4} value={values.message} onChange={handleChange('message')} data-testid="form-message" />
          </label>
          {submitted && errors.message && <p className="form-lab__error">{errors.message}</p>}

          <button type="submit" className="btn btn-primary" data-testid="form-submit">
            Submit
          </button>
        </form>
      </div>

      <div className="panel form-lab__qa">
        <p className="eyebrow">Test results</p>
        {!submitted ? (
          <p className="form-lab__hint">Submit the form to see live test results here.</p>
        ) : (
          <ul className="form-lab__checklist mono" data-testid="form-checklist">
            {checklist.map((check) => (
              <li key={check.id} className={check.pass ? 'is-pass' : 'is-fail'}>
                <span aria-hidden="true">{check.pass ? '✓' : '✗'}</span> {check.label}
              </li>
            ))}
          </ul>
        )}
        <p className="form-lab__meta mono">Submissions this session: {submitCount}</p>
      </div>
    </div>
  )
}
