import { useMemo, useState } from 'react'
import {
  filterProjects,
  getFeaturedProjects,
  getFiltersFor,
  getProjects,
} from '../data'

/**
 * Everything the project sections need for one mode.
 *
 * Category and query state live here so the featured grid and the full-screen
 * browser stay in sync when the browser is reopened.
 */
export function useProjects(mode) {
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')

  const all = useMemo(() => getProjects(mode), [mode])
  const featured = useMemo(() => getFeaturedProjects(mode), [mode])
  const filters = useMemo(() => getFiltersFor(mode), [mode])

  const filtered = useMemo(
    () => filterProjects(all, category, query),
    [all, category, query]
  )

  function reset() {
    setCategory('all')
    setQuery('')
  }

  return {
    all,
    featured,
    filters,
    filtered,
    category,
    setCategory,
    query,
    setQuery,
    reset,
    total: all.length,
  }
}
