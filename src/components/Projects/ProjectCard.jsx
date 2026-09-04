import { usePortfolio } from '../../context/PortfolioContext'
import HoverLabel from '../ui/HoverLabel'
import ProjectMedia from '../ui/ProjectMedia'
import './ProjectCard.css'

/**
 * One project card, for either kind of project.
 *
 * The card is an <article> with a single covering button rather than a
 * clickable div: the whole surface is the hit target, the accessible name is
 * the project title, and the heading stays a real heading.
 *
 * HoverLabel wraps the whole card (not just the image) so the cursor chip
 * keeps tracking while the pointer is over the covering hit area.
 *
 * Developer cards lead with information (year, stack, what it does).
 * Design cards lead with the artwork and keep the text out of the way.
 */
export function ProjectCard({
  project,
  ratio = '4 / 3',
  size = 'half',
  priority = false,
  onOpen,
}) {
  const { config } = usePortfolio()
  const isDesign = project.type === 'design'

  return (
    <article
      className={`project-card project-card--${size} project-card--${project.type}`}
    >
      <HoverLabel label={config.work.hoverLabel} className="project-card__inner">
        <div className="project-card__media">
          <ProjectMedia
            src={project.image}
            alt={project.title}
            ratio={ratio}
            priority={priority}
            sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 40vw"
          />
        </div>

        <div className="project-card__text">
          <p className="project-card__meta">
            <span>{project.category}</span>
            <span className="project-card__dot" aria-hidden="true" />
            <span>{project.year}</span>
            {project.status && (
              <span className="project-card__status">{project.status}</span>
            )}
          </p>

          <h3 className="project-card__title">
            <button
              type="button"
              className="project-card__button"
              onClick={onOpen}
            >
              {project.title}
            </button>
          </h3>

          {!isDesign && (
            <p className="project-card__description">{project.description}</p>
          )}

          {!isDesign && project.technologies?.length > 0 && (
            <ul className="project-card__tech">
              {project.technologies.slice(0, 4).map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          )}

          {isDesign && project.services?.length > 0 && (
            <p className="project-card__services">
              {project.services.slice(0, 3).join(' · ')}
            </p>
          )}
        </div>
      </HoverLabel>
    </article>
  )
}

export default ProjectCard
