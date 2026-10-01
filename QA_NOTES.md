# QA Notes — intentional bugs in the QA Lab

Internal reference only; not shown on the site. Every bug below is real and
reproducible in the running app (not staged), so Cypress tests can assert
against this actual behaviour.

## Login Lab (`src/components/QALab/LoginLab/LoginLab.jsx`)

1. **Whitespace-only email is accepted.** The "required" check tests the
   raw (untrimmed) length, so a whitespace-only string is "present". The
   format check only runs when the *trimmed* value is non-empty — so a
   whitespace-only email skips both checks and is accepted.
2. **No minimum password length.** A one-character password is accepted;
   no length rule was ever implemented.
3. **No submit debounce.** The login button never disables itself while a
   (simulated) request is pending, so two rapid clicks can both go
   through. Reproduced deterministically via the "Double-click Login"
   scenario, which fires two attempts 100ms apart against a 450ms
   simulated delay.

Everything else (empty email/password, invalid format, whitespace *around*
otherwise-valid credentials, incorrect credentials, valid credentials) is
implemented correctly and is expected to always pass.

## Form Validation Lab (`src/components/QALab/FormLab/FormLab.jsx`)

1. **Whitespace-only message is accepted.** Unlike name/email/phone (which
   correctly check the trimmed length), the message field's required check
   uses the raw length — a whitespace-only message passes it.
2. **No maximum length enforced on the message field.** Submitting a
   message over 500 characters is accepted with no error and no
   truncation.

The "Test results" panel grades each check from the latest submission only:
checks the submission didn't exercise show as "not tested" instead of a
made-up pass.
