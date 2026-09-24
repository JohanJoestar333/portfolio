import { posts } from '../../data/writing.js'
import './Writing.css'

// Renders whatever is in src/data/writing.js. If that array is empty
// (e.g. you deleted the placeholder and haven't added a real post yet),
// this shows a quiet fallback instead of an empty section.
export default function Writing() {
  return (
    <section id="writing" className="section writing">
      <div className="container">
        <div className="section-head">
          <h2>Writing</h2>
          <p>Some notes on QA, testing, and automation.</p>
        </div>

        {posts.length === 0 ? (
          <p className="writing__empty">Nothing published yet — check back soon.</p>
        ) : (
          <div className="writing__list">
            {posts.map((post, index) => (
              <a
                key={post.url}
                href={post.url}
                className="panel writing__post"
                target="_blank"
                rel="noreferrer"
                data-testid={`writing-post-${index}`}
              >
                <div className="writing__post-text">
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                </div>
                <span className="writing__post-cta mono">Read on Medium →</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
