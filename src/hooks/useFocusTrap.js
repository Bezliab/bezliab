import { useEffect } from 'react'

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

/**
 * Modal keyboard contract:
 *   ESC        closes
 *   TAB        cycles inside the dialog and never escapes it
 *   on open    focus moves into the dialog
 *   on close   focus returns to whatever opened it
 *
 * This is the difference between a modal that looks finished and one that is.
 */
export function useFocusTrap(ref, active, onClose) {
  useEffect(() => {
    if (!active) return undefined

    const node = ref.current
    if (!node) return undefined

    const previouslyFocused = document.activeElement

    // Move focus in. Prefer the close button so ESC-averse users see the way out.
    const focusables = () =>
      Array.from(node.querySelectorAll(FOCUSABLE)).filter(
        (element) => element.offsetParent !== null || element === document.activeElement
      )

    const initial = node.querySelector('[data-autofocus]') ?? focusables()[0] ?? node
    // rAF so the element exists after the entry animation mounts it
    const raf = requestAnimationFrame(() => initial.focus?.())

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose?.()
        return
      }

      if (event.key !== 'Tab') return

      const items = focusables()
      if (items.length === 0) {
        event.preventDefault()
        return
      }

      const first = items[0]
      const last = items[items.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    node.addEventListener('keydown', onKeyDown)

    return () => {
      cancelAnimationFrame(raf)
      node.removeEventListener('keydown', onKeyDown)
      previouslyFocused?.focus?.()
    }
  }, [ref, active, onClose])
}
