import { useEffect, useState } from 'react'

/** Small media-query hook — used to drop hover-only behaviour on touch. */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const list = window.matchMedia(query)
    const onChange = (event) => setMatches(event.matches)

    setMatches(list.matches)
    list.addEventListener('change', onChange)
    return () => list.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** True on devices that can actually hover — the cursor label opts out otherwise. */
export function useCanHover() {
  return useMediaQuery('(hover: hover) and (pointer: fine)')
}
