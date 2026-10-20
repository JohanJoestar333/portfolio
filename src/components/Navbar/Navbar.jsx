import { useEffect, useState } from 'react'
import { useLang } from '../../i18n/LanguageContext.jsx'
import ThemeToggle from '../ThemeToggle/ThemeToggle.jsx'
import './Navbar.css'

// Each entry is just a label + the id of the section it should jump to
// (every <section> in the app has a matching id="..."). Add, remove, or
// reorder entries here to change the nav — the mobile menu reuses this
// same array, so you only ever edit it in one place.
const navLinks = [
  { key: 'about', href: '#about' },
  { key: 'experience', href: '#experience' },
  { key: 'skills', href: '#skills' },
  { key: 'qaLab', href: '#qa-lab' },
  { key: 'automation', href: '#automation' },
  { key: 'projects', href: '#projects' },
  { key: 'certificates', href: '#certificates' },
  { key: 'writing', href: '#writing' },
  { key: 'contact', href: '#contact' },
]

export default function Navbar() {
  // `open` tracks whether the mobile hamburger menu is currently expanded.
  // It only affects anything at or below 980px wide (the point where nine
  // links no longer fit on one line) — see the @media rule in Navbar.css.
  const { t, c, lang, toggle } = useLang()
  const site = c.site
  const [open, setOpen] = useState(false)

  // Scrollspy: highlight the nav link for whichever section is crossing
  // the middle of the viewport.
  const [active, setActive] = useState('')
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // If the viewport grows back past the mobile breakpoint while the
  // mobile menu is open, close it so it doesn't get stuck open.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 980) setOpen(false)
    }
    // Escape closes the menu too, like any well-behaved popover.
    const handleKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('resize', handleResize)
    window.addEventListener('keydown', handleKey)
    // Cleanup: remove the listeners when Navbar unmounts, so we don't leak
    // event listeners if this component is ever added/removed dynamically.
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('keydown', handleKey)
    }
  }, [])

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        {/* The wordmark doubles as a "scroll to top" link via href="#top",
            which matches the id on the <section> in Hero.jsx. */}
        <a href="#top" className="navbar__logo" data-testid="nav-logo" onClick={() => setOpen(false)}>
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" className="navbar__mark">
            <circle cx="12" cy="12" r="5" fill="var(--strong-butter)" />
            <g stroke="var(--strong-peach)" strokeWidth="2" strokeLinecap="round">
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" />
            </g>
          </svg>
          {site.name}
        </a>

        {/* Desktop navigation — hidden at 980px and below via CSS, replaced by
            the hamburger + mobile menu below. */}
        <nav className="navbar__links" aria-label={t.nav.primary}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={active === link.href ? 'is-active' : undefined}
              aria-current={active === link.href ? 'location' : undefined}
            >
              {t.nav[link.key]}
            </a>
          ))}
        </nav>

        {/* Grouped so both stay pinned to the right edge at every
            viewport width — the theme toggle is always visible, whether
            or not the mobile menu is open. */}
        <div className="navbar__controls">
          <button
            type="button"
            className="lang-toggle"
            onClick={toggle}
            aria-label={t.language.switchTo}
            lang={lang === 'en' ? 'pt-BR' : 'en'}
            data-testid="lang-toggle"
          >
            <span className={lang === 'en' ? 'is-on' : undefined}>EN</span>
            <span className={lang === 'pt' ? 'is-on' : undefined}>PT</span>
          </button>
          <ThemeToggle />

          {/* Hamburger button — only visible at 980px and below. aria-expanded
              and aria-controls tell screen readers this button toggles
              the #mobile-menu element below. */}
          <button
            type="button"
            className="navbar__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            data-testid="nav-toggle"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile menu panel. Clicking any link inside it also closes the
          menu (onClick={() => setOpen(false)}), so it doesn't stay open
          after the visitor has already navigated somewhere. */}
      <nav
        id="mobile-menu"
        className={`navbar__mobile ${open ? 'is-open' : ''}`}
        aria-label={t.nav.mobile}
        data-testid="nav-mobile"
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={active === link.href ? 'is-active' : undefined}
            aria-current={active === link.href ? 'location' : undefined}
            onClick={() => setOpen(false)}
          >
            {t.nav[link.key]}
          </a>
        ))}
      </nav>
    </header>
  )
}

