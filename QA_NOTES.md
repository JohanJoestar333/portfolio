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

Both are "sticky" in the UI once triggered — the checklist item flips to a
fail and stays that way for the session, mirroring how a real regression
would be tracked.

## Bug Hunter (`src/components/QALab/BugHunter/BugHunter.jsx`)

Five widgets, five real bugs, no red herrings:

1. **Counter** — incrementing from 2 jumps to 4 (skips 3).
2. **Accept-terms toggle** — the "Terms accepted" message never disappears
   once shown, even after unchecking the box.
3. **Add to cart** — clicks within 300ms of each other both register,
   adding 2 items instead of 1 (no debounce).
4. **Promo code** — the check is case-insensitive and never enforces
   length, so short or lowercase input incorrectly reports "Valid code!".
5. **Delete item** — always shows a generic "Network error" message
   regardless of the actual (unimplemented) cause.

The bug-report form (title/steps/expected/actual/severity) is purely
local component state — nothing is sent or persisted anywhere.
