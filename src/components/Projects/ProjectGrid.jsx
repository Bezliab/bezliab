import ProjectCard from './ProjectCard'
import './ProjectGrid.css'

/* --------------------------------------------------------------------------
   The featured grid is deliberately asymmetric (spec §10) — but it is also
   data-driven, so it can't depend on a human arranging six cards by hand.
   These patterns are balanced compositions for each possible count: every
   row adds up to the 6-column track, so any number of featured projects
   between 1 and 6 lands on a complete grid.
   -------------------------------------------------------------------------- */
const FEATURED_PATTERNS = {
  1: ['full'],
  2: ['half', 'half'],
  3: ['wide', 'narrow', 'full'],
  4: ['wide', 'narrow', 'narrow', 'wide'],
  5: ['wide', 'narrow', 'half', 'half', 'full'],
  6: ['wide', 'narrow', 'half', 'half', 'narrow', 'wide'],
}

const FEATURED_RATIOS = {
  full: '21 / 9',
  wide: '16 / 10',
  half: '4 / 3',
  narrow: '3 / 4',
}

/* Browsing is a different job: scanning many projects rather than reading a
   composition. Developer projects are uniform; design projects use the `size`
   field they already carry, densely packed. */
const BROWSE_SIZES = {
  standard: { size: 'half', ratio: '4 / 3' },
  tall: { size: 'half', ratio: '3 / 4' },
  wide: { size: 'wide', ratio: '16 / 9' },
  large: { size: 'wide', ratio: '16 / 10' },
}

function layoutFor(project, index, count, variant) {
  if (variant === 'featured') {
    const pattern = FEATURED_PATTERNS[Math.min(count, 6)] ?? FEATURED_PATTERNS[6]
    const size = pattern[index % pattern.length]
    return { size, ratio: FEATURED_RATIOS[size] }
  }

  return BROWSE_SIZES[project.size ?? 'standard'] ?? BROWSE_SIZES.standard
}

/**
 * The project grid. Never knows what a project is — it just lays out
 * whatever the data layer hands it.
 */
export function ProjectGrid({ projects, variant = 'featured', onOpen }) {
  return (
    <div className={`project-grid project-grid--${variant}`}>
      {projects.map((project, index) => {
        const { size, ratio } = layoutFor(
          project,
          index,
          projects.length,
          variant
        )

        return (
          <div
            className={`project-grid__cell project-grid__cell--${size}`}
            key={project.id}
          >
            <ProjectCard
              project={project}
              size={size}
              ratio={ratio}
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
