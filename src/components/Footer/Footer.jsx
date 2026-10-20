import { useLang } from '../../i18n/LanguageContext.jsx'
import './Footer.css'

export default function Footer() {
  const { t, c } = useLang()
  const site = c.site
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
        <p className="footer__tagline mono">{t.footer.tagline}</p>
        <p className="footer__copyright mono">
          © {year} {site.name}
        </p>
      </div>
    </footer>
  )
}
