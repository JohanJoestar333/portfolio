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
          <p className="projects__empty">Nothing added yet. Check back soon.</p>
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

                {project.stats?.length > 0 && (
                  <ul className="projects__stats">
                    {project.stats.map((stat) => (
                      <li key={stat.label} className="projects__stat">
                        <span className="projects__stat-value">{stat.value}</span>
                        <span className="projects__stat-label">{stat.label}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {project.highlights?.length > 0 && (
                  <ul className="projects__highlights">
                    {project.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}

                {project.workflow?.steps?.length > 0 && (
                  <div className="projects__workflow">
                    {project.workflow.title && (
                      <h4 className="projects__workflow-title">{project.workflow.title}</h4>
                    )}
                    <ol className="projects__steps">
                      {project.workflow.steps.map((step, i) => (
                        <li key={step.title} className="projects__step">
                          <span className="projects__step-num" aria-hidden="true">
                            {i + 1}
                          </span>
                          <strong>{step.title}</strong>
                          <span>{step.text}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {project.flow?.items?.length > 0 && (
                  <div className="projects__flow">
                    {project.flow.title && <h4 className="projects__workflow-title">{project.flow.title}</h4>}
                    <ol className="projects__flow-list">
                      {project.flow.items.map((item) => (
                        <li key={item} className="projects__flow-item">
                          {item}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {project.findings?.items?.length > 0 && (
                  <div className="projects__findings">
                    {project.findings.title && (
                      <h4 className="projects__workflow-title">{project.findings.title}</h4>
                    )}
                    <ul className="projects__findings-list">
                      {project.findings.items.map((item) => (
                        <li key={item.label}>
                          <span className="projects__finding-label">{item.label}</span>
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
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
