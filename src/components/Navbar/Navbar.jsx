import { useEffect, useState } from 'react'
import { site } from '../../data/site.js'
import ThemeToggle from '../ThemeToggle/ThemeToggle.jsx'
import './Navbar.css'

// Each entry is just a label + the id of the section it should jump to
// (every <section> in the app has a matching id="..."). Add, remove, or
// reorder entries here to change the nav — the mobile menu reuses this
// same array, so you only ever edit it in one place.
const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'QA Lab', href: '#qa-lab' },
  { label: 'Automation', href: '#automation' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Writing', href: '#writing' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  // `open` tracks whether the mobile hamburger menu is currently expanded.
  // It only affects anything below 720px wide — see the @media rule at
  // the bottom of Navbar.css.
  const [open, setOpen] = useState(false)

  // If the viewport grows back past the mobile breakpoint while the
  // mobile menu is open, close it so it doesn't get stuck open.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 720) setOpen(false)
    }
    window.addEventListener('resize', handleResize)
    // Cleanup: remove the listener when Navbar unmounts, so we don't leak
    // event listeners if this component is ever added/removed dynamically.
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        {/* The terminal-prompt-style logo ("thomas@qa:~$") doubles as a
            "scroll to top" link via href="#top", which matches the id on
            the <section> in Hero.jsx. */}
        <a href="#top" className="navbar__logo mono" data-testid="nav-logo">
          {site.name.toLowerCase()}@qa<span className="navbar__cursor">:~$</span>
        </a>

        {/* Desktop navigation — hidden below 720px via CSS, replaced by
            the hamburger + mobile menu below. */}
        <nav className="navbar__links" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Grouped so both stay pinned to the right edge at every
            viewport width — the theme toggle is always visible, whether
            or not the mobile menu is open. */}
        <div className="navbar__controls">
          <ThemeToggle />

          {/* Hamburger button — only visible below 720px. aria-expanded
              and aria-controls tell screen readers this button toggles
              the #mobile-menu element below. */}
          <button
            type="button"
            className="navbar__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
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
        aria-label="Mobile"
        data-testid="nav-mobile"
      >
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}

