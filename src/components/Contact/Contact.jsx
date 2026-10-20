import { useLang } from '../../i18n/LanguageContext.jsx'
import Reveal from '../Reveal/Reveal.jsx'
import './Contact.css'

// Small hand-written SVG icons — kept inline here (rather than pulling in
// an icon library) since only three are needed. Each is just a <svg>
// with `fill="currentColor"` or `stroke="currentColor"`, which is what
// lets .contact__link-icon's CSS `color` property control the icon color
// instead of it being hardcoded.
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

// The resume path lives in src/data/site.js (resumePath) so Hero and
// Contact always point at the same file.

// Turns "https://linkedin.com/in/..." into "linkedin.com/in/..." for a
// cleaner-looking label under the link.
function displayUrl(url) {
  return url.replace(/^https?:\/\//, '')
}

// All three link/download straight away on click — no confirmation step.
// `download: true` adds the HTML `download` attribute, which tells the
// browser to save the file instead of trying to navigate to/render it.

export default function Contact() {
  const { t, c } = useLang()
  const site = c.site
  const LINKS = [
    { key: 'linkedin', label: t.contact.linkedin, value: displayUrl(site.linkedin.split('?')[0]), href: site.linkedin, Icon: LinkedinIcon, external: true },
    { key: 'email', label: t.contact.email, value: site.email, href: `mailto:${site.email}`, Icon: MailIcon, external: false },
    { key: 'resume', label: t.contact.resume, value: t.contact.resumeValue, href: site.resumePath, Icon: DownloadIcon, download: true },
  ]
  return (
    <section id="contact" className="section contact">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <h2>{t.contact.title}</h2>
            <p>{t.contact.subtitle}</p>
          </div>
        </Reveal>

        <div className="contact__links">
          {LINKS.map(({ key, label, value, href, Icon, external, download }, index) => (
            <Reveal
              key={key}
              as="a"
              href={href}
              className="contact__link panel"
              target={external ? '_blank' : undefined}
              rel={external ? 'noreferrer' : undefined}
              download={download || undefined}
              data-testid={`contact-${key}`}
              delay={index * 0.08}
            >
              <span className="contact__link-icon">
                <Icon />
              </span>
              <span className="contact__link-text">
                <span className="contact__link-label">{label}</span>
                <span className="contact__link-value mono">{value}</span>
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
