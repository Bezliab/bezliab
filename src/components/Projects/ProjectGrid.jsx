import { imageSizes } from '../../data/imageSizes'
import ProjectCard from './ProjectCard'
import './ProjectGrid.css'

/* --------------------------------------------------------------------------
   Every card takes the shape of its own picture, and a row's width is shared
   out by those shapes (see ui/Justified.css) — so each picture shows whole,
   with no cropping and no bars, and the row stays tidy however the pictures
   differ. Nothing here needs arranging by hand: add a project and it finds
   its place.
   -------------------------------------------------------------------------- */
const DEFAULT_RATIO = 4 / 3

function ratioOf(project) {
  const size = imageSizes[project.image]
  return size ? size[0] / size[1] : DEFAULT_RATIO
}

/* only used to size the card's title — wide pictures read as bigger cards */
function sizeFor(ratio) {
  if (ratio >= 1.45) return 'wide'
  if (ratio < 0.9) return 'narrow'
  return 'half'
}

/**
 * The project grid. Never knows what a project is — it just lays out
 * whatever the data layer hands it.
 */
export function ProjectGrid({ projects, variant = 'featured', onOpen }) {
  return (
    <div className={`project-grid project-grid--${variant} justified`}>
      {projects.map((project, index) => {
        const ratio = ratioOf(project)

        return (
          <div
            className="project-grid__cell"
            style={{ '--ar': ratio }}
            key={project.id}
          >
            <ProjectCard
              project={project}
              size={sizeFor(ratio)}
              priority={variant === 'featured' && index === 0}
              onOpen={() => onOpen?.(project)}
            />
          </div>
        )
      })}
    </div>
  )
}

export default ProjectGrid
