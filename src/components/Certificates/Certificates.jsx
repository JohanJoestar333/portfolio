import { useState } from 'react'
import { useLang } from '../../i18n/LanguageContext.jsx'
import Reveal from '../Reveal/Reveal.jsx'
import './Certificates.css'

// A generic certificate/ribbon icon, shown instead of a broken <img> for
// any entry that doesn't have a real image yet (see certificates.js).
// The first few cards show by default; a button reveals the rest.
const INITIAL_COUNT = 8

function CertificateIcon() {
  return (
    <svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="12" cy="8.5" r="5.5" />
      <path d="M9 13.5 7.5 21l4.5-2.5 4.5 2.5-1.5-7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Renders whatever is in src/data/certificates.js. Each card is a full
// link (the whole card is clickable, not just the title) that opens the
// certificate's url in a new tab. `image` and `year` are optional.
export default function Certificates() {
  const { t, c } = useLang()
  const { certificates: allCertificates, certificatesIntro } = c
  const [expanded, setExpanded] = useState(false)
  const hasMore = allCertificates.length > INITIAL_COUNT
  const certificates = expanded ? allCertificates : allCertificates.slice(0, INITIAL_COUNT)
  return (
    <section id="certificates" className="section certificates">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <h2>{certificatesIntro.title}</h2>
            <p>{certificatesIntro.description}</p>
          </div>
        </Reveal>

        {certificates.length === 0 ? (
          <p className="certificates__empty">{t.certificates.empty}</p>
        ) : (
          <div className="certificates__grid">
            {certificates.map((cert, index) => (
              <Reveal
                key={cert.url}
                as="a"
                href={cert.url}
                className="panel certificates__card"
                target="_blank"
                rel="noreferrer"
                data-testid={`certificate-${index}`}
                delay={Math.min(index * 0.08, 0.3)}
              >
                {cert.image ? (
                  <img
                    src={cert.image}
                    alt={t.certificates.alt(cert.title)}
                    className={`certificates__image${cert.fit === 'contain' ? ' certificates__image--contain' : ''}`}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="certificates__image certificates__image--placeholder">
                    <CertificateIcon />
                  </div>
                )}
                <div className="certificates__text">
                  <p className="certificates__title">{cert.title}</p>
                  <p className="certificates__org mono">
                    {cert.organization}
                    {cert.year && ` · ${cert.year}`}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {hasMore && (
          <div className="certificates__more">
            <button
              type="button"
              className="btn btn-secondary"
              aria-expanded={expanded}
              onClick={() => setExpanded((v) => !v)}
              data-testid="certificates-toggle"
            >
              {expanded ? t.certificates.showLess : t.certificates.showAll(allCertificates.length)}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
