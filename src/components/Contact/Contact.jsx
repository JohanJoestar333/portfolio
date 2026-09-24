import { useState } from 'react'
import { site } from '../../data/site.js'
import GithubNote from '../GithubNote/GithubNote.jsx'
import './Contact.css'

// Three small hand-written SVG icons — kept inline here (rather than
// pulling in an icon library) since only three are needed. Each is just
// a <svg> with `fill="currentColor"` or `stroke="currentColor"`, which is
// what lets .contact__link-icon's CSS `color` property control the icon
// color instead of it being hardcoded.
function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
      <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.17.69-3.84-1.34-3.84-1.34-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.53-.29-5.19-1.27-5.19-5.63 0-1.24.44-2.26 1.17-3.06-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.17a10.9 10.9 0 0 1 5.74 0c2.19-1.48 3.15-1.17 3.15-1.17.62 1.57.23 2.73.11 3.02.73.8 1.17 1.82 1.17 3.06 0 4.37-2.67 5.34-5.21 5.62.41.36.77 1.06.77 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.2.66.79.55A11.26 11.26 0 0 0 23.25 11.75C23.25 5.48 18.27.5 12 .5Z" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="1.5" y="1.5" width="21" height="21" rx="4" />
      <circle cx="7" cy="7.5" r="1.1" fill="currentColor" stroke="none" />
      <path d="M7 10.5v8" strokeLinecap="round" />
      <path d="M12 18.5v-5c0-1.4.9-2.6 2.5-2.6s2.5 1.2 2.5 2.6v5" strokeLinecap="round" />
      <path d="M12 10.5v8" strokeLinecap="round" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m3 6 9 7 9-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3v12" strokeLinecap="round" />
      <path d="m6 11 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 21h16" strokeLinecap="round" />
    </svg>
  )
}

// Lives in public/, so Vite serves it at this exact path in both dev and
// a production build — no import needed, it's just a static file.
const RESUME_PATH = '/Thomas-Pessoa-Resume.pdf'

// Turns "https://github.com/your-username" into "github.com/your-username"
// for a cleaner-looking label under each link.
function displayUrl(url) {
  return url.replace(/^https?:\/\//, '')
}

// LinkedIn, Email, and Resume link/download straight away on click.
// GitHub is handled separately below, since clicking it first opens a
// short note about private repos (see GithubNote.jsx) rather than
// navigating immediately. `download: true` adds the HTML `download`
// attribute, which tells the browser to save the file instead of trying
// to navigate to/render it.
const LINKS = [
  { key: 'linkedin', label: 'LinkedIn', value: displayUrl(site.linkedin), href: site.linkedin, Icon: LinkedinIcon, external: true },
  { key: 'email', label: 'Email', value: site.email, href: `mailto:${site.email}`, Icon: MailIcon, external: false },
  { key: 'resume', label: 'Resume', value: 'PDF · Download', href: RESUME_PATH, Icon: DownloadIcon, download: true },
]

export default function Contact() {
  const [githubNoteOpen, setGithubNoteOpen] = useState(false)

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="section-head">
          <h2>Let's talk</h2>
          <p>Interested in QA, testing, automation, or just found a bug I missed?</p>
        </div>

        <div className="contact__links">
          {/* Rendered as a <button>, not an <a> — clicking it opens the
              modal below rather than navigating directly. */}
          <button
            type="button"
            className="contact__link panel"
            onClick={() => setGithubNoteOpen(true)}
            data-testid="contact-github"
          >
            <span className="contact__link-icon">
              <GithubIcon />
            </span>
            <span className="contact__link-text">
              <span className="contact__link-label">GitHub</span>
              <span className="contact__link-value mono">{displayUrl(site.github)}</span>
            </span>
          </button>

          {LINKS.map(({ key, label, value, href, Icon, external, download }) => (
            <a
              key={key}
              href={href}
              className="contact__link panel"
              target={external ? '_blank' : undefined}
              rel={external ? 'noreferrer' : undefined}
              download={download || undefined}
              data-testid={`contact-${key}`}
            >
              <span className="contact__link-icon">
                <Icon />
              </span>
              <span className="contact__link-text">
                <span className="contact__link-label">{label}</span>
                <span className="contact__link-value mono">{value}</span>
              </span>
            </a>
          ))}
        </div>
      </div>

      <GithubNote open={githubNoteOpen} onClose={() => setGithubNoteOpen(false)} href={site.github} />
    </section>
  )
}
