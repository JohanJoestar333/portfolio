import { projects, projectsIntro } from '../../data/projects.js'
import Reveal from '../Reveal/Reveal.jsx'
import './Projects.css'

// Renders whatever is in src/data/projects.js. Every field except `title`
// and `description` is optional, so a card only shows what you filled in.
export default function Projects() {
  return (
    <section id="projects" className="section projects">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <h2>{projectsIntro.title}</h2>
            <p>{projectsIntro.description}</p>
          </div>
        </Reveal>

        {projects.length === 0 ? (
          <p className="projects__empty">Nothing added yet — check back soon.</p>
        ) : (
          <div className="projects__list">
            {projects.map((project, index) => (
              <Reveal
                key={project.title}
                className="panel projects__card"
                data-testid={`project-${index}`}
                delay={Math.min(index * 0.08, 0.3)}
              >
                {project.tag && <p className="projects__tag mono">{project.tag}</p>}
                <h3>{project.title}</h3>
                <p className="projects__desc">{project.description}</p>

                {project.highlights?.length > 0 && (
                  <ul className="projects__highlights">
                    {project.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}

                {project.stack?.length > 0 && (
                  <ul className="projects__stack" aria-label="Tools and skills">
                    {project.stack.map((item) => (
                      <li key={item} className="pill">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {project.links?.length > 0 && (
                  <div className="projects__links">
                    {project.links.map((link, i) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className={`btn ${i === 0 ? 'btn-primary' : 'btn-secondary'}`}
                        data-testid="project-link"
                        {...(link.download
                          ? { download: '' }
                          : { target: '_blank', rel: 'noreferrer' })}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
