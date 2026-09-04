import { useEffect } from 'react'

/* Reference-counted so a detail modal opening on top of the project browser
   doesn't unlock the page when the inner one closes. */
let locks = 0
let restoreScrollbarGutter = ''

/**
 * Freeze the page behind a modal, without the layout shift you get from
 * simply setting overflow: hidden on a page that had a scrollbar.
 */
export function useLockBodyScroll(active) {
  useEffect(() => {
    if (!active) return undefined

    if (locks === 0) {
      const gutter = window.innerWidth - document.documentElement.clientWidth
      restoreScrollbarGutter = document.body.style.paddingRight
      if (gutter > 0) {
        document.body.style.paddingRight = `${gutter}px`
      }
      document.body.classList.add('is-locked')
    }
    locks += 1

    return () => {
      locks = Math.max(0, locks - 1)
      if (locks === 0) {
        document.body.classList.remove('is-locked')
        document.body.style.paddingRight = restoreScrollbarGutter
      }
    }
  }, [active])
}
