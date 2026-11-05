import { useState } from 'react'
import { useLang } from '../../i18n/LanguageContext.jsx'
import Reveal from '../Reveal/Reveal.jsx'
import './Video.css'

// The Loom walkthrough, placed right under the hero because it is one of the
// biggest highlights. The video itself only loads after the visitor presses
// play, so the page stays fast. The link lives in src/data/site.js (loomUrl).
function loomEmbedUrl(url) {
  const id = url.split('/').pop().split('?')[0]
  return `https://www.loom.com/embed/${id}?autoplay=1&hide_owner=true&hideEmbedTopBar=true`
}

export default function Video() {
  const { t, c } = useLang()
  const { loomUrl } = c.site
  const [playing, setPlaying] = useState(false)

  return (
    <section id="video" className="section video" aria-labelledby="video-title">
      <div className="container video__inner">
        <Reveal className="video__text">
          <p className="video__eyebrow">{t.video.eyebrow}</p>
          <h2 id="video-title">{t.video.title}</h2>
          <p>{t.video.description}</p>
          <a
            className="btn btn-secondary"
            href={loomUrl}
            target="_blank"
            rel="noreferrer"
            data-testid="video-loom-link"
          >
            {t.video.openLoom}
          </a>
        </Reveal>

        <Reveal className="video__frame panel" delay={0.1}>
          {playing ? (
            <iframe
              className="video__player"
              src={loomEmbedUrl(loomUrl)}
              title={t.video.playerTitle}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              className="video__poster"
              onClick={() => setPlaying(true)}
              aria-label={t.video.play}
              data-testid="video-play"
            >
              <span className="video__play" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                  <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
                </svg>
              </span>
              <span className="video__poster-label">{t.video.posterLabel}</span>
            </button>
          )}
        </Reveal>
      </div>
    </section>
  )
}
