# Thomas — Software QA Analyst Portfolio

[![CI](https://github.com/JohanJoestar333/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/JohanJoestar333/portfolio/actions/workflows/ci.yml)

A personal portfolio built as both a showcase and a working QA/testing
playground: an interactive QA Lab with intentional bugs to find, a Cypress
suite that tests the site itself, automated accessibility checks, and CI
that runs everything on every push.

## What's on the site

Sections appear in this order, chosen so a recruiter sees who you are, your
experience, and your skills first, with the proof (QA Lab, Automation,
certificates, writing) after.

- **Hero** — one-line pitch with direct *Download Resume* and *LinkedIn*
  buttons.
- **About** — a recruiter-friendly intro, a live numbers strip (years in
  QA, automated tests, certificates, articles — all computed, never typed
  in), and a "What I'm into" grid covering AI-assisted QA, building
  websites, test case design, and test automation.
- **Experience** — roles and responsibilities.
- **Testing Toolkit** — skills by category, plus what I'm learning now.
- **QA Lab** — two interactive apps (Login Lab, Form Validation Lab) with
  documented, reproducible bugs (see `QA_NOTES.md`).
- **Automation** — the real Cypress spec list and test counts, read from
  `cypress/e2e/` at build time so they can't go stale.
- **Projects** — hands-on QA work beyond the site (currently the QA Test
  Case Workbook, with a download button), driven by `src/data/projects.js`;
  downloadable files live in `public/projects/`.
- **Certificates** — clickable cards with images, driven by one data file.
- **Writing** — articles on QA, testing, and AI, driven by one data file.
- **Contact** — LinkedIn, email, and a resume download.
- Dark/light theme (remembers your choice), scroll-reveal animations, a
  scroll progress bar, and a mobile menu.

There is intentionally no GitHub link anywhere on the site — Contact only
shows LinkedIn, Email, and Resume.

## Look & feel

- **Cozy moodboard theme** — warm paper (light, the default) and a
  lamp-lit evening (dark), Fraunces + Caveat + DM Sans, pastel stickers,
  masonry skills board, polaroid certificates, a pinned-note project.
  All colors are tokens in `globals.css`.
- **3D hero** — a draggable pastel "toy block" (`HeroCube`) built from
  CSS 3D transforms, ringed by floating stickers. No 3D library.
- **Interactions** (`src/hooks/useInteractions.js`) — cursor glow, card
  spotlight, 3D tilt on cards, and magnetic buttons. Fine pointers only,
  and all of it is off when the visitor prefers reduced motion.
- **Motion** — letter-by-letter 3D name entrance, rotating "I test …"
  line, toolkit marquee, count-up stats, scrollspy nav underline, and
  scroll-drawn section accents.

## Testing & CI

**5 Cypress spec files, 35 tests**, covering:

| Spec | Covers |
| --- | --- |
| `homepage.cy.js` | Page load, navigation, mobile menu, every section renders |
| `login.cy.js` | Login Lab scenarios, including the documented bugs |
| `form-validation.cy.js` | Form Validation Lab rules and live results panel |
| `accessibility.cy.js` | Automated axe-core checks (`cypress-axe`) on the page, each QA Lab tab, and the mobile menu |
| `content.cy.js` | Every certificate and post renders with a working `https` link; every certificate image loads; About stats/interests and the Hero resume button are present |

`content.cy.js` loops over whatever is rendered, so **new certificates and
posts you add are tested automatically**.

GitHub Actions (`.github/workflows/ci.yml`) installs dependencies, runs the
production build, and runs the full Cypress suite on every push to `main`
and every pull request. Screenshots from failed tests are uploaded as a
downloadable artifact.

Run the suite locally:

```bash
npm run test:e2e         # headless, starts the dev server automatically
npm run test:e2e:open    # interactive Cypress runner
```

## Adding content

Almost everything is edited in `src/data/` — you rarely touch a component.
Each data file has a copy-paste template in a comment at the top.

### Add a certificate

1. Put the image in `public/certificates/`. Use a WebP or JPEG around
   1200px wide and under ~200 KB (https://squoosh.app converts for free).
2. Open `src/data/certificates.js`, copy an entry to the end of the
   `certificates` array, and fill it in:

   ```js
   {
     title: 'Course or certification name',
     organization: 'Who issued it',
     url: 'https://…',                      // verification / badge page
     image: '/certificates/your-file.webp', // optional — omit for an icon
     year: '2026',                          // optional
   },
   ```

3. Save. The card appears, the "Certificates" number in About goes up, and
   `content.cy.js` starts checking it.

### Add a writing post

Open `src/data/writing.js`, copy an entry to the **top** of the `posts`
array (newest first), and fill it in:

```js
{
  title: 'Your article title',
  description: 'One sentence on what the reader will get out of it.',
  url: 'https://medium.com/@you/your-article',
  tag: 'QA',            // optional label above the title
  date: 'Oct 2026',     // optional, shown next to the tag
  platform: 'Medium',   // optional, defaults to Medium ("Read on …")
},
```

The section heading and description above the list live in the
`writingIntro` object in the same file.

### Edit the About text or interests

`src/data/site.js` — `about` is an array of paragraphs (add, remove, or
reword freely) and `interests` is the "What I'm into" card list.

### Add a spec

Create any `cypress/e2e/*.cy.js` file. It's picked up by `npm run test:e2e`
and CI, and shows up in the Automation section with its test count. Add an
optional one-line description for it in `src/data/automation.js`.

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

   Replace `<your-repo-url>` with the GitHub link of this repository
   (e.g. `git clone https://github.com/JohanJoestar333/portfolio.git`).

2. **Move into the project folder.**

   ```bash
   cd portfolio
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
| Name, role, location, focus, the "Currently building" status pill, Hero tagline, LinkedIn/email, resume path | `src/data/site.js` |
| About paragraphs and the "What I'm into" cards | `src/data/site.js` — the `about` and `interests` arrays |
| Your resume PDF | Replace `public/Thomas-Pessoa-Resume.pdf` with your updated file (keep the same filename, or update `resumePath` in `src/data/site.js`) |
| Skills listed under Testing Toolkit, or the "Currently learning" list | `src/data/skills.js` |
| Work history (add/edit/remove a role) | `src/data/experience.js` — it's an array, so copy an existing entry to add a new role |
| Writing posts, and the Writing section's intro text | `src/data/writing.js` — see "Add a writing post" above |
| Certificates (add/edit/remove one), and the section's intro text | `src/data/certificates.js` — see "Add a certificate" above |
| Automation section intro and spec descriptions | `src/data/automation.js` (the spec list itself is generated from `cypress/e2e/`) |
| Nav links, their order, or the mobile menu | `src/components/Navbar/Navbar.jsx` — edit the `navLinks` array near the top |
| Order of sections on the page | `src/App.jsx` — sections render in the order they're listed there |
| Colors, fonts, spacing, or the accent color (dark theme) | `src/styles/globals.css` — the `:root` block near the top of the file |
| Colors for light mode specifically | `src/styles/globals.css` — the `:root[data-theme='light']` block right below the dark one |
| Whether the theme toggle shows in the nav | `src/components/Navbar/Navbar.jsx` — remove the `<ThemeToggle />` line to drop it entirely |
| How much content fades up on scroll, or the effect itself | `src/components/Reveal/Reveal.jsx` — adjust the `initial`/`whileInView` values, or wrap/unwrap `<Reveal>` around content in any section |
| Login Lab's preset test scenarios | `src/components/QALab/LoginLab/LoginLab.jsx` — the `SCENARIOS` array |
| Form Validation Lab's fields or checklist copy | `src/components/QALab/FormLab/FormLab.jsx` |
| Cypress test coverage | `cypress/e2e/*.cy.js` — one file per major area; add a new `.cy.js` file for a new area |

**To add a brand-new section** (say, a "Testimonials" section):

1. Create a folder `src/components/Testimonials/` with `Testimonials.jsx` and `Testimonials.css`, following the pattern of any existing section (e.g. `src/components/Skills/`).
2. Give the outer `<section>` a unique `id` (e.g. `id="testimonials"`) — that's what nav links and Cypress tests hook into.
3. Import and render it in `src/App.jsx`, in the position you want it to appear.
4. If it should be reachable from the nav, add a `{ label: 'Testimonials', href: '#testimonials' }` entry to `navLinks` in `Navbar.jsx`.

## Stack

React + Vite + JavaScript + CSS, Framer Motion for animation, Cypress +
cypress-axe for testing, GitHub Actions for CI.
