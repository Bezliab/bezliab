import { useEffect, useState } from 'react'

/**
 * Which section is currently in view, for the navbar's active state.
 *
 * IntersectionObserver is the trigger (it only fires when a section crosses
 * the reading band, so this costs nothing while the page sits still) but the
 * decision is a rect comparison: the active section is the last one whose top
 * has passed the reading line.
 *
 * That ordering matters more than it looks. Comparing intersectionRatio
 * instead makes a short section beat a tall one that fills the screen, because
 * the ratio is relative to each target's own height. And returning ids[0]
 * before any scrolling would light up "About" while the visitor is still
 * looking at the hero — above the first section, nothing should be active.
 */
export function useActiveSection(ids = []) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (ids.length === 0) return undefined

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (elements.length === 0) return undefined

    function evaluate() {
      // a little above centre: where a reader's eye actually sits
      const line = window.innerHeight * 0.35
      let current = null

      elements.forEach((element) => {
        if (element.getBoundingClientRect().top <= line) current = element.id
      })

      setActive(current)
    }

    const observer = new IntersectionObserver(evaluate, {
      // ignore the sliver under the sticky navbar, favour the upper band
      rootMargin: '-88px 0px -55% 0px',
      threshold: [0, 0.05, 0.5],
    })

    elements.forEach((element) => observer.observe(element))
    window.addEventListener('resize', evaluate)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', evaluate)
    }
  }, [ids.join(',')]) // eslint-disable-line react-hooks/exhaustive-deps

  return active
}
