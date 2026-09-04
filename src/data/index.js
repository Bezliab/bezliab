/* ==========================================================================
   DATA — single access point.

   Components never import a project array directly; they ask for a mode.
   That is what keeps "add a project" a data change: sorting, featuring,
   filtering and validation all happen here, once.
   ========================================================================== */

import { developerProjects } from './developerProjects'
import { designProjects } from './designProjects'
import { developerSkills } from './developerSkills'
import { designCapabilities, designTools } from './designCapabilities'
import { experience } from './experience'
import { process } from './process'
import { certificates } from './certificates'
import { filters } from './filters'
import { modes, modeList, navSections, site, footer } from './site'

const byMode = {
  developer: developerProjects,
  designer: designProjects,
}

/* --------------------------------------------------------------------------
   Normalise: give every project a sane order, and sort once.
   -------------------------------------------------------------------------- */
function normalise(list) {
  return [...list]
    .map((project, index) => ({
      ...project,
      order: typeof project.order === 'number' ? project.order : index + 1,
      categories: project.categories ?? [],
      featured: Boolean(project.featured),
    }))
    .sort((a, b) => a.order - b.order)
}

const projects = {
  developer: normalise(developerProjects),
  designer: normalise(designProjects),
}

/* --------------------------------------------------------------------------
   Public accessors
   -------------------------------------------------------------------------- */

/** Every project for a mode, ordered. */
export function getProjects(mode) {
  return projects[mode] ?? []
}

/** Homepage grid: `featured: true` only. */
export function getFeaturedProjects(mode) {
  return getProjects(mode).filter((project) => project.featured)
}

/** Look a project up by id, across both modes. */
export function findProject(id) {
  return (
    projects.developer.find((project) => project.id === id) ??
    projects.designer.find((project) => project.id === id) ??
    null
  )
}

/**
 * Filters for a mode, with a live count per category and any category that
 * has no projects dropped — so the filter bar never offers a dead end.
 */
export function getFiltersFor(mode) {
  const list = getProjects(mode)
  return (filters[mode] ?? [])
    .map((filter) => ({
      ...filter,
      count:
        filter.slug === 'all'
          ? list.length
          : list.filter((project) => project.categories.includes(filter.slug))
              .length,
    }))
    .filter((filter) => filter.count > 0)
}

/** Apply a category slug and a free-text query. */
export function filterProjects(list, category = 'all', query = '') {
  const term = query.trim().toLowerCase()

  return list.filter((project) => {
    const inCategory =
      category === 'all' || project.categories.includes(category)
    if (!inCategory) return false
    if (!term) return true

    const haystack = [
      project.title,
      project.category,
      project.description,
      ...(project.technologies ?? []),
      ...(project.services ?? []),
      ...(project.tools ?? []),
      ...(project.categories ?? []),
    ]
      .join(' ')
      .toLowerCase()

    return haystack.includes(term)
  })
}

export function getSkills(mode) {
  return mode === 'developer' ? developerSkills : designCapabilities
}

/* --------------------------------------------------------------------------
   Dev-only sanity check. Catches the three mistakes that actually happen:
   duplicate ids, a category slug that no filter knows about, and a missing
   cover image path. Silent in production builds.
   -------------------------------------------------------------------------- */
if (import.meta.env.DEV) {
  const seen = new Set()

  Object.entries(projects).forEach(([mode, list]) => {
    const known = new Set((filters[mode] ?? []).map((f) => f.slug))

    list.forEach((project) => {
      if (seen.has(project.id)) {
        console.warn(
          `[data] duplicate project id "${project.id}" — ids must be unique across both modes.`
        )
      }
      seen.add(project.id)

      if (!project.image) {
        console.warn(`[data] project "${project.id}" has no image.`)
      }

      project.categories.forEach((slug) => {
        if (!known.has(slug)) {
          console.warn(
            `[data] project "${project.id}" uses category "${slug}", which is not in filters.${mode}. It will never show under a filter.`
          )
        }
      })
    })
  })
}

export {
  modes,
  modeList,
  navSections,
  site,
  footer,
  filters,
  experience,
  process,
  certificates,
  designTools,
  developerSkills,
  designCapabilities,
}
