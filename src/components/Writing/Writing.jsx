import { posts, writingIntro } from '../../data/writing.js'
import Reveal from '../Reveal/Reveal.jsx'
import './Writing.css'

// Renders whatever is in src/data/writing.js — both the intro text and the
// list of posts. If the posts array is empty, this shows a quiet fallback
// instead of an empty section.
export default function Writing() {
  return (
    <section id="writing" className="section writing">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <h2>{writingIntro.title}</h2>
            <p>{writingIntro.description}</p>
          </div>
        </Reveal>

        {posts.length === 0 ? (
          <p className="writing__empty">Nothing published yet — check back soon.</p>
        ) : (
          <div className="writing__list">
            {posts.map((post, index) => (
              <Reveal
                key={post.url}
                as="a"
                href={post.url}
                className="panel writing__post"
                target="_blank"
                rel="noreferrer"
                data-testid={`writing-post-${index}`}
                delay={Math.min(index * 0.08, 0.3)}
              >
                <div className="writing__post-text">
                  {/* tag and date are optional — the row only renders
                      if at least one of them is set. */}
                  {(post.tag || post.date) && (
                    <p className="writing__post-meta mono">
                      {post.tag}
                      {post.tag && post.date && ' · '}
                      {post.date}
                    </p>
                  )}
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                </div>
                <span className="writing__post-cta mono">Read on {post.platform ?? 'Medium'} →</span>
              </Reveal>
            ))}
          </div>
        )}

        {writingIntro.profileUrl && (
          <Reveal className="writing__more" delay={0.1}>
            <a href={writingIntro.profileUrl} target="_blank" rel="noreferrer" className="mono" data-testid="writing-profile">
              {writingIntro.profileLabel ?? 'More writing →'}
            </a>
          </Reveal>
        )}
      </div>
    </section>
  )
}
