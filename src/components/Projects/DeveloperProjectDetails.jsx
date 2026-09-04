import { ExternalLink, Github } from 'lucide-react'
import ProjectMedia from '../ui/ProjectMedia'
import './ProjectDetails.css'

/**
 * The developer case study.
 *
 * A recruiter reading this wants four things quickly: what it is, what you
 * did, what was hard, and how you solved it. So the prose runs in one column
 * and the facts (role, year, stack, links) sit in a sidebar that can be
 * skimmed without reading a word of the prose.
 */
export function DeveloperProjectDetails({ project }) {
  return (
    <div className="details">
      <ProjectMedia
        src={project.image}
        alt={`${project.title} — cover`}
        ratio="16 / 9"
        priority
        className="details__cover"
        sizes="(max-width: 1100px) 100vw, 1080px"
      />

      <div className="details__grid">
        <div className="details__main">
          <section className="details__block">
            <h4 className="details__label">Overview</h4>
            <p className="details__lead">{project.description}</p>
          </section>

          {project.challenge && (
            <section className="details__block">
              <h4 className="details__label">The problem</h4>
              <p>{project.challenge}</p>
            </section>
          )}

          {project.solution && (
            <section className="details__block">
              <h4 className="details__label">What I built</h4>
              <p>{project.solution}</p>
            </section>
          )}

          {project.architecture && (
            <section className="details__block">
              <h4 className="details__label">How it fits together</h4>
              <p className="details__mono">{project.architecture}</p>
            </section>
          )}

          {project.features?.length > 0 && (
            <section className="details__block">
              <h4 className="details__label">Key features</h4>
              <ul className="details__features">
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="details__aside">
          <dl className="details__facts">
            {project.role && (
              <div>
                <dt>Role</dt>
                <dd>{project.role}</dd>
              </div>
            )}
            <div>
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>{project.category}</dd>
            </div>
            {project.status && (
              <div>
                <dt>Status</dt>
                <dd>{project.status}</dd>
              </div>
            )}
          </dl>

          {project.technologies?.length > 0 && (
            <div className="details__stack">
              <h4 className="details__label">Built with</h4>
              <ul className="tag-list">
                {project.technologies.map((tech) => (
                  <li className="tag" key={tech}>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(project.liveUrl || project.githubUrl) && (
            <div className="details__links">
              {project.liveUrl && (
                <a
                  className="btn btn--primary btn--sm"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Live site
                  <ExternalLink size={15} aria-hidden="true" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  className="btn btn--ghost btn--sm"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Source
                  <Github size={15} aria-hidden="true" />
                </a>
              )}
            </div>
          )}
        </aside>
      </div>

      {project.gallery?.length > 0 && (
        <section className="details__gallery">
          <h4 className="details__label">Screens</h4>
          <div className="details__gallery-grid">
            {project.gallery.map((src, index) => (
              <ProjectMedia
                key={src}
                src={src}
                alt={`${project.title} — screen ${index + 1}`}
                ratio="16 / 10"
                sizes="(max-width: 700px) 100vw, 520px"
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default DeveloperProjectDetails
