import { process as defaultProcess } from '../../data/process'
import ProjectMedia from '../ui/ProjectMedia'
import './ProjectDetails.css'

/**
 * The design case study.
 *
 * Same modal, different content model (spec §6, §12): a client instead of a
 * role, services and tools instead of a stack, no repository link — and the
 * gallery is the point rather than a footnote, so it runs full width at the
 * top of the read instead of being tucked at the end.
 *
 * A project can override the studio process with its own `process` array;
 * otherwise the shared four steps are shown.
 */
export function DesignProjectDetails({ project }) {
  const steps = project.process ?? defaultProcess

  return (
    <div className="details details--design">
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
            <h4 className="details__label">The work</h4>
            <p className="details__lead">{project.description}</p>
          </section>

          {project.challenge && (
            <section className="details__block">
              <h4 className="details__label">The brief</h4>
              <p>{project.challenge}</p>
            </section>
          )}

          {project.solution && (
            <section className="details__block">
              <h4 className="details__label">The direction</h4>
              <p>{project.solution}</p>
            </section>
          )}
        </div>

        <aside className="details__aside">
          <dl className="details__facts">
            {project.client && (
              <div>
                <dt>Client</dt>
                <dd>{project.client}</dd>
              </div>
            )}
            <div>
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt>Discipline</dt>
              <dd>{project.category}</dd>
            </div>
          </dl>

          {project.services?.length > 0 && (
            <div className="details__stack">
              <h4 className="details__label">Services</h4>
              <ul className="details__list">
                {project.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </div>
          )}

          {project.tools?.length > 0 && (
            <div className="details__stack">
              <h4 className="details__label">Tools</h4>
              <ul className="tag-list">
                {project.tools.map((tool) => (
                  <li className="tag" key={tool}>
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      {project.gallery?.length > 0 && (
        <section className="details__plates">
          {project.gallery.map((src, index) => (
            <ProjectMedia
              key={src}
              src={src}
              alt={`${project.title} — ${index + 1}`}
              ratio={index % 3 === 0 ? '16 / 10' : '4 / 3'}
              sizes="(max-width: 1100px) 100vw, 1080px"
            />
          ))}
        </section>
      )}

      {steps?.length > 0 && (
        <section className="details__process">
          <h4 className="details__label">Process</h4>
          <ol className="details__steps">
            {steps.map((step) => (
              <li key={step.step}>
                <span className="details__step-index">{step.step}</span>
                <span className="details__step-title">{step.title}</span>
                <p className="details__step-body">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {project.deliverables?.length > 0 && (
        <section className="details__block details__block--wide">
          <h4 className="details__label">Delivered</h4>
          <ul className="details__features">
            {project.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

export default DesignProjectDetails
