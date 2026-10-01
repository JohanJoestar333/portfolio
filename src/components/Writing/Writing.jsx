import { posts } from '../../data/writing.js'
import Reveal from '../Reveal/Reveal.jsx'
import './Writing.css'

// Renders whatever is in src/data/writing.js. If that array is empty
// (e.g. you deleted the placeholder and haven't added a real post yet),
// this shows a quiet fallback instead of an empty section.
export default function Writing() {
  return (
    <section id="writing" className="section writing">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <h2>Writing</h2>
            <p>Some notes on QA, testing, and automation.</p>
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
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                </div>
                <span className="writing__post-cta mono">Read on Medium →</span>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
