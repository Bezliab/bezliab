import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { usePortfolio } from '../../context/PortfolioContext'
import { useProjects } from '../../hooks/useProjects'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import ProjectBrowser from './ProjectBrowser'
import ProjectGrid from './ProjectGrid'
import ProjectModal from './ProjectModal'
import './Work.css'

/**
 * Selected Work.
 *
 * The homepage shows `featured: true` projects only, in an asymmetric grid.
 * Everything else lives behind "View More", which opens the full-screen
 * browser rather than navigating away — so a visitor never loses their place
 * on the page (spec §10, §11).
 *
 * Note what this component does NOT contain: any project. It renders whatever
 * the data layer returns, which is the whole point of the architecture.
 */
export function Work() {
  const { mode, config } = usePortfolio()
  const {
    featured,
    filters,
    filtered,
    category,
    setCategory,
    query,
    setQuery,
    reset,
    total,
  } = useProjects(mode)

  const [browserOpen, setBrowserOpen] = useState(false)
  const [active, setActive] = useState(null)

  const hasMore = total > featured.length

  return (
    <section
      className="section section-divider work"
      id="work"
      aria-labelledby="work-title"
    >
      <div className="container">
        <SectionHeading
          eyebrow={config.work.eyebrow}
          title={config.work.title}
          support={config.work.support}
          id="work-title"
        />

        <div className="work__grid">
          <ProjectGrid
            projects={featured}
            variant="featured"
            onOpen={setActive}
          />
        </div>

        {hasMore && (
          <Reveal className="work__more">
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => setBrowserOpen(true)}
            >
              {config.work.viewMoreLabel}
              <ArrowRight size={17} aria-hidden="true" />
            </button>
            <p className="work__count">
              Showing {featured.length} of {total}
            </p>
          </Reveal>
        )}
      </div>

      <ProjectBrowser
        open={browserOpen}
        onClose={() => setBrowserOpen(false)}
        title={config.work.modalTitle}
        filters={filters}
        category={category}
        onCategory={setCategory}
        query={query}
        onQuery={setQuery}
        projects={filtered}
        onOpenProject={setActive}
        onReset={reset}
      />

      <ProjectModal
        project={active}
        open={Boolean(active)}
        onClose={() => setActive(null)}
        level={browserOpen ? 2 : 1}
      />
    </section>
  )
}

export default Work
