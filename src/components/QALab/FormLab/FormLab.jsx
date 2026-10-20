import { useState } from 'react'
import { useLang } from '../../../i18n/LanguageContext.jsx'
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

// Grades the most recent submission. Each row is one of:
//   'pass'     — the form behaved correctly for input that exercised this check
//   'fail'     — the form behaved incorrectly (a real bug was hit)
//   'untested' — this submission didn't exercise the check, so nothing is claimed
// The expected behaviour is written independently of validate(), so the
// results reflect what the form actually did, not a hardcoded answer.
function buildChecks(values, errors) {
  const required = ['name', 'email', 'phone', 'message']
  const emptyFields = required.filter((f) => values[f].length === 0)
  const whitespaceFields = required.filter((f) => values[f].length > 0 && values[f].trim().length === 0)
  const allEmpty = [...required, 'age'].every((f) => values[f].length === 0)
  const emailText = values.email.trim()
  const ageText = values.age.trim()
  const ageNum = Number(ageText)
  const ageValid = ageText.length > 0 && !Number.isNaN(ageNum) && ageNum >= 0 && ageNum <= 120

  const grade = (tested, ok) => (!tested ? 'untested' : ok ? 'pass' : 'fail')

  return [
    { id: 'required', label: 'Required fields', status: grade(emptyFields.length > 0, emptyFields.every((f) => errors[f])) },
    { id: 'empty', label: 'Empty submission', status: grade(allEmpty, required.every((f) => errors[f])) },
    {
      id: 'email',
      label: 'Email validation',
      status: grade(emailText.length > 0, EMAIL_PATTERN.test(emailText) ? !errors.email : Boolean(errors.email)),
    },
    {
      id: 'age',
      label: 'Age range',
      status: grade(ageText.length > 0, ageValid ? !errors.age : Boolean(errors.age)),
    },
    {
      id: 'maxlength',
      label: 'Maximum length',
      status: grade(values.message.length > MESSAGE_MAX_LENGTH, Boolean(errors.message)),
    },
    {
      id: 'whitespace',
      label: 'Whitespace handling',
      status: grade(whitespaceFields.length > 0, whitespaceFields.every((f) => errors[f])),
    },
  ]
}

// Letters aren't allowed in the phone field: anything other than digits and
// the usual phone punctuation (+ - ( ) and spaces) is removed as it's typed
// or pasted.
function sanitizePhone(value) {
  return value.replace(/[^\d+\-() ]/g, '')
}

export default function FormLab() {
  const { t, tr } = useLang()
  const L = t.formLab
  const [values, setValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState({}) // Field-level error messages from the most recent submit.
  const [submitted, setSubmitted] = useState(false) // Has the form been submitted at least once? Gates when errors/checklist show.
  const [submitCount, setSubmitCount] = useState(0) // Just a small "Submissions this session" counter, shown at the bottom.
  // Graded results for the most recent submission (see buildChecks above).
  const [checks, setChecks] = useState([])

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
    setChecks(buildChecks(values, nextErrors))
  }

  return (
    <div className="qa-lab-experience form-lab">
      <div className="panel form-lab__app">
        <p className="eyebrow">{L.appUnderTest}</p>
        <form onSubmit={handleSubmit} noValidate>
          <label className="form-lab__field">
            <span>{L.name}</span>
            <input type="text" value={values.name} onChange={handleChange('name')} data-testid="form-name" />
          </label>
          {submitted && errors.name && <p className="form-lab__error">{tr(errors.name)}</p>}

          <label className="form-lab__field">
            <span>{L.email}</span>
            <input type="text" value={values.email} onChange={handleChange('email')} data-testid="form-email" />
          </label>
          {submitted && errors.email && <p className="form-lab__error">{tr(errors.email)}</p>}

          <label className="form-lab__field">
            <span>{L.phone}</span>
            <input
              type="tel"
              inputMode="tel"
              autoComplete="off"
              placeholder={L.phonePlaceholder}
              value={values.phone}
              onChange={(event) => setValues((prev) => ({ ...prev, phone: sanitizePhone(event.target.value) }))}
              data-testid="form-phone"
            />
          </label>
          {submitted && errors.phone && <p className="form-lab__error">{tr(errors.phone)}</p>}

          <label className="form-lab__field">
            <span>{L.age}</span>
            <input type="text" value={values.age} onChange={handleChange('age')} data-testid="form-age" />
          </label>
          {submitted && errors.age && <p className="form-lab__error">{tr(errors.age)}</p>}

          <label className="form-lab__field">
            <span>{L.message}</span>
            <textarea rows={4} value={values.message} onChange={handleChange('message')} data-testid="form-message" />
          </label>
          {submitted && errors.message && <p className="form-lab__error">{tr(errors.message)}</p>}

          <button type="submit" className="btn btn-primary" data-testid="form-submit">
            {L.submit}
          </button>
        </form>
      </div>

      <div className="panel form-lab__qa">
        <p className="eyebrow">{L.testResults}</p>
        <p className="form-lab__hint form-lab__desc">
          {L.desc}
        </p>
        {!submitted ? (
          <p className="form-lab__hint">{L.empty}</p>
        ) : (
          <ul className="form-lab__checklist mono" data-testid="form-checklist">
            {checks.map((check) => (
              <li key={check.id} className={`is-${check.status}`}>
                <span aria-hidden="true">{check.status === 'pass' ? '✓' : check.status === 'fail' ? '✗' : '–'}</span>{' '}
                {tr(check.label)}
                {check.status === 'untested' && <span className="form-lab__untested">{L.notTested}</span>}
              </li>
            ))}
          </ul>
        )}
        <p className="form-lab__meta mono">{L.submissions} {submitCount}</p>
      </div>
    </div>
  )
}
