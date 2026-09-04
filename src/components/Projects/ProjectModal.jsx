import Modal from '../ui/Modal'
import DesignProjectDetails from './DesignProjectDetails'
import DeveloperProjectDetails from './DeveloperProjectDetails'
import './ProjectModal.css'

/**
 * The project detail modal.
 *
 * This is the dispatch point described in spec §6: the modal itself knows
 * nothing about either kind of work, it just picks a detail view by
 * `project.type`. A third kind of project (say `type: 'photography'`) would
 * be a new details component and one line here — no other file changes.
 */
const VIEWS = {
  development: DeveloperProjectDetails,
  design: DesignProjectDetails,
}

export function ProjectModal({ project, open, onClose, level = 2 }) {
  const Details = VIEWS[project?.type] ?? DeveloperProjectDetails

  return (
    <Modal
      open={Boolean(open && project)}
      onClose={onClose}
      variant="panel"
      level={level}
      labelledBy="project-modal-title"
      header={
        project && (
          <div className="project-modal__header">
            <p className="project-modal__meta">
              <span>{project.category}</span>
              <span aria-hidden="true">·</span>
              <span>{project.year}</span>
            </p>
            <h2 className="project-modal__title" id="project-modal-title">
              {project.title}
            </h2>
          </div>
        )
      }
    >
      {project && (
        <div className="project-modal__content">
          <Details project={project} />
        </div>
      )}
    </Modal>
  )
}

export default ProjectModal
