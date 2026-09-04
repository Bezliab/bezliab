import Modal from '../ui/Modal'
import ProjectFilters from './ProjectFilters'
import ProjectGrid from './ProjectGrid'
import './ProjectBrowser.css'

/**
 * "View More Projects" — a full-screen browser, not a separate page (spec §11).
 *
 * Everything about a project can be reached without a page load: the grid is
 * filtered and searchable in place, and opening a project stacks the detail
 * modal on top of this one (the scroll lock is reference-counted, so closing
 * the detail view doesn't hand scrolling back to the page underneath).
 */
export function ProjectBrowser({
  open,
  onClose,
  title,
  filters,
  category,
  onCategory,
  query,
  onQuery,
  projects,
  onOpenProject,
  onReset,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      variant="sheet"
      level={1}
      labelledBy="project-browser-title"
      header={
        <div className="browser__header">
          <h2 className="browser__title" id="project-browser-title">
            {title}
          </h2>
          <ProjectFilters
            filters={filters}
            category={category}
            onCategory={onCategory}
            query={query}
            onQuery={onQuery}
            count={projects.length}
          />
        </div>
      }
    >
      {projects.length > 0 ? (
        <ProjectGrid
          projects={projects}
          variant="browse"
          onOpen={onOpenProject}
        />
      ) : (
        <div className="browser__empty">
          <p className="browser__empty-title">Nothing matches that.</p>
          <p className="browser__empty-body">
            Try another category, or clear the filters.
          </p>
          <button type="button" className="btn btn--ghost" onClick={onReset}>
            Clear filters
          </button>
        </div>
      )}
    </Modal>
  )
}

export default ProjectBrowser
