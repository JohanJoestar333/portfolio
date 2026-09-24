import { site } from '../../data/site.js'
import './Footer.css'

export default function Footer() {
  // Computed at render time rather than hardcoded, so the copyright year
  // stays correct on its own every January without needing an edit here.
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <p className="footer__name">{site.name}</p>
          <p className="footer__role">{site.role}</p>
        </div>
        <p className="footer__tagline mono">Built with React. Tested with Cypress.</p>
        <p className="footer__copyright mono">
          © {year} {site.name}
        </p>
      </div>
    </footer>
  )
}
