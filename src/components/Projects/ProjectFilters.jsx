import { Search, X } from 'lucide-react'
import './ProjectFilters.css'

/**
 * Category filters plus search, for the full-screen browser (spec §11).
 *
 * The categories come from data/filters.js with live counts, and any category
 * with nothing in it is already dropped by the data layer — so this bar can
 * never offer a filter that leads to an empty grid.
 */
export function ProjectFilters({
  filters,
  category,
  onCategory,
  query,
  onQuery,
  count,
}) {
  return (
    <div className="project-filters">
      <div className="project-filters__row" role="group" aria-label="Filter by category">
        {filters.map((filter) => (
          <button
            key={filter.slug}
            type="button"
            className="project-filters__chip"
            data-active={category === filter.slug || undefined}
            aria-pressed={category === filter.slug}
            onClick={() => onCategory(filter.slug)}
          >
            {filter.label}
            <span className="project-filters__count">{filter.count}</span>
          </button>
        ))}
      </div>

      <div className="project-filters__search">
        <Search size={16} aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(event) => onQuery(event.target.value)}
          placeholder="Search projects…"
          aria-label="Search projects"
        />
        {query && (
          <button
            type="button"
            className="project-filters__clear"
            onClick={() => onQuery('')}
            aria-label="Clear search"
          >
            <X size={14} aria-hidden="true" />
          </button>
        )}
      </div>

      {/* announced to screen readers as the grid updates */}
      <p className="project-filters__status" role="status">
        {count} {count === 1 ? 'project' : 'projects'}
      </p>
    </div>
  )
}

export default ProjectFilters
