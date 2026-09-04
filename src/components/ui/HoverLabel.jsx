import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useCanHover } from '../../hooks/useMediaQuery'
import './HoverLabel.css'

/**
 * The shared interaction language: hovering any piece of work reveals what
 * clicking it will do — "Case study" in developer mode, "Explore" in designer
 * mode. Same mechanic, different word, which is the cheapest way to give the
 * two modes distinct personalities.
 *
 * Opts out entirely on touch and for reduced-motion users, where a
 * cursor-tracking label is either impossible or unwelcome.
 */
export function HoverLabel({ label, children, className = '' }) {
  const canHover = useCanHover()
  const reduceMotion = useReducedMotion()
  const ref = useRef(null)
  const [point, setPoint] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  const enabled = canHover && !reduceMotion && Boolean(label)

  if (!enabled) {
    return <div className={`hover-label ${className}`}>{children}</div>
  }

  function onMove(event) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    setPoint({ x: event.clientX - rect.left, y: event.clientY - rect.top })
  }

  return (
    <div
      ref={ref}
      className={`hover-label is-enabled ${className}`}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onMouseMove={onMove}
    >
      {children}

      <AnimatePresence>
        {visible && (
          <motion.span
            className="hover-label__chip"
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{ left: point.x, top: point.y }}
          >
            {label}
            <ArrowUpRight size={13} aria-hidden="true" />
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HoverLabel
