# Thomas — Software QA Analyst Portfolio

A personal portfolio built as both a showcase and a working QA/testing
playground: an interactive QA Lab, Cypress test suite, and CI via GitHub
Actions.

## Status

**Phase 6 of 8 complete:** the real Cypress suite is in place — 5 spec
files (31 tests), exercising the exact bugs documented in
`QA_NOTES.md`, the correct-path behavior, and automated accessibility
checks. Remaining phases add GitHub Actions CI and a responsive polish
pass.

Also added outside the original phase plan:

- A **Writing** section (`src/components/Writing/`) that reads from
  `src/data/writing.js` — add your Medium posts there.
- A **downloadable resume** — `public/Thomas-Pessoa-Resume.pdf`, linked
  from the "Resume" card in the Contact section.
- **Automated accessibility testing** via `cypress-axe` —
  `cypress/e2e/accessibility.cy.js` checks the homepage, each QA Lab
  tab, and the mobile menu for common, mechanically-detectable a11y
  issues (missing labels, contrast, ARIA misuse, etc.). This doesn't
  replace real assistive-tech testing, but it catches a lot
  automatically. **Run `npm install` again** after pulling these
  changes — `cypress-axe` and `axe-core` are new devDependencies that
  weren't there before.
- A **dark/light theme toggle** (`src/components/ThemeToggle/`) in the
  navbar. The choice is remembered (`localStorage`), defaults to the
  visitor's OS-level preference on first visit, and applies before the
  page paints (see the inline script in `index.html`) so there's no
  flash of the wrong theme.
- A **Certificates** section (`src/components/Certificates/`) that reads
  from `src/data/certificates.js` — add your certificate images to
  `public/certificates/` and reference them there.
- **Scroll-triggered animations** — a reusable `<Reveal>` component
  (`src/components/Reveal/`) fades content up into place the first time
  it scrolls into view, used throughout every section below the Hero.
  There's also a thin progress bar fixed to the top of the page
  (`src/components/ScrollProgress/`) that fills in as you scroll down.

There is intentionally no GitHub link anywhere on the site — Contact
only shows LinkedIn, Email, and Resume.

Run the test suite with:

```bash
npm run test:e2e         # headless, starts the dev server automatically
npm run test:e2e:open    # interactive Cypress runner
```

Before deploying, swap in an updated resume PDF whenever yours changes
(keep the same filename, or update `RESUME_PATH` in
`src/components/Contact/Contact.jsx`).

## Getting started

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Then open the printed local URL (defaults to `http://localhost:5173`).

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run test:e2e` | Start the dev server and run the full Cypress suite headlessly |
| `npm run test:e2e:open` | Start the dev server and open the Cypress UI |

## Running Cypress, step by step

Starting from nothing but the GitHub repository link:

1. **Clone the repository.**

   ```bash
   git clone <your-repo-url>
   ```

   Replace `<your-repo-url>` with the actual GitHub link once the repo is
   pushed (e.g. `git clone https://github.com/your-username/thomas-qa-portfolio.git`).

2. **Move into the project folder.**

   ```bash
   cd thomas-qa-portfolio
   ```

3. **Install dependencies.**

   ```bash
   npm install
   ```

   On newer npm versions you may see a message about "pending install
   scripts" for `cypress` and `esbuild`. That's npm's supply-chain safety
   check blocking Cypress from downloading its own test-runner binary.
   Approve both with:

   ```bash
   npm approve-scripts cypress esbuild
   ```

   Then confirm the Cypress binary actually installed:

   ```bash
   npx cypress verify
   ```

   If that says the binary is missing, force it with `npx cypress install`.

4. **Run the suite.** You have two options:

   - **Headless** (fastest, good for a quick check or for CI): this
     single command starts the Vite dev server, waits until it's ready,
     runs every spec in `cypress/e2e/`, prints a pass/fail summary in the
     terminal, then shuts the dev server back down automatically.

     ```bash
     npm run test:e2e
     ```

   - **Interactive** (best while writing or debugging tests): this opens
     the actual Cypress desktop app.

     ```bash
     npm run test:e2e:open
     ```

     In the app that opens: choose **E2E Testing**, pick a browser (Chrome
     or Electron both work fine), then click any spec file
     (e.g. `login.cy.js`) to watch it run step by step in a real browser
     window, with the DOM state visible at every step.

5. **Read the results.**
   - In headless mode, a ✓ or ✗ appears next to each test name directly
     in your terminal, with a summary count at the end.
   - In interactive mode, the same information appears in the left-hand
     panel of the Cypress app, and you can click any step to see exactly
     what the page looked like at that moment.
   - If a headless run fails, Cypress automatically saves a screenshot
     (and, if configured, a video) of the failure — check
     `cypress/screenshots/` (these are gitignored, so they won't show up
     in the repository itself).

## Customization Guide

A map from "I want to change X" to the file that controls it — almost
everything content-related lives in `src/data/`, so you rarely need to
touch a component file just to update text or links.

| I want to change... | Edit this file |
| --- | --- |
| Name, role, location, focus, the "Currently building" status pill, LinkedIn/email | `src/data/site.js` |
| Your resume PDF | Replace `public/Thomas-Pessoa-Resume.pdf` with your updated file (keep the same filename, or update `RESUME_PATH` in `src/components/Contact/Contact.jsx`) |
| Skills listed under Testing Toolkit, or the "Currently learning" list | `src/data/skills.js` |
| Work history (add/edit/remove a role) | `src/data/experience.js` — it's an array, so copy an existing entry to add a new role |
| Medium posts in the Writing section | `src/data/writing.js` — copy an existing entry, fill in `title`, `description`, `url` |
| Certificates (add/edit/remove one) | `src/data/certificates.js` — copy an existing entry, fill in `title`, `organization`, `url`, and `image`; drop the actual image file in `public/certificates/` |
| Nav links, their order, or the mobile menu | `src/components/Navbar/Navbar.jsx` — edit the `navLinks` array near the top |
| Order of sections on the page | `src/App.jsx` — sections render in the order they're listed there |
| Colors, fonts, spacing, or the accent color (dark theme) | `src/styles/globals.css` — the `:root` block near the top of the file |
| Colors for light mode specifically | `src/styles/globals.css` — the `:root[data-theme='light']` block right below the dark one |
| Whether the theme toggle shows in the nav | `src/components/Navbar/Navbar.jsx` — remove the `<ThemeToggle />` line to drop it entirely |
| How much content fades up on scroll, or the effect itself | `src/components/Reveal/Reveal.jsx` — adjust the `initial`/`whileInView` values, or wrap/unwrap `<Reveal>` around content in any section |
| Login Lab's preset test scenarios | `src/components/QALab/LoginLab/LoginLab.jsx` — the `SCENARIOS` array |
| Form Validation Lab's fields or checklist copy | `src/components/QALab/FormLab/FormLab.jsx` |
| Bug Hunter's bugs (add/remove one) | `src/components/QALab/BugHunter/BugHunter.jsx` — add metadata to the `BUGS` array, write a small widget component, and register it in the `WIDGETS` map |
| Cypress test coverage | `cypress/e2e/*.cy.js` — one file per major area; add a new `.cy.js` file for a new area |

**To add a brand-new section** (say, a "Testimonials" section):

1. Create a folder `src/components/Testimonials/` with `Testimonials.jsx` and `Testimonials.css`, following the pattern of any existing section (e.g. `src/components/Skills/`).
2. Give the outer `<section>` a unique `id` (e.g. `id="testimonials"`) — that's what nav links and Cypress tests hook into.
3. Import and render it in `src/App.jsx`, in the position you want it to appear.
4. If it should be reachable from the nav, add a `{ label: 'Testimonials', href: '#testimonials' }` entry to `navLinks` in `Navbar.jsx`.

## Stack

React + Vite + JavaScript + CSS, Cypress for testing, GitHub Actions for CI.
