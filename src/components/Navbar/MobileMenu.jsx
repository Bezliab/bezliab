import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'
import { site } from '../../data/site'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'
import SocialLinks from '../ui/SocialLinks'
import ModeSwitch from './ModeSwitch'
import './MobileMenu.css'

/**
 * The mobile navigation panel.
 *
 * Portalled to <body> on purpose: the navbar uses backdrop-filter, which makes
 * it a containing block for fixed-position descendants, so a panel rendered
 * inside the header would be clipped to it.
 *
 * Gets the same contract as every other overlay on the site — ESC closes,
 * TAB is trapped, focus returns to the burger, the page behind can't scroll.
 */
export function MobileMenu({ open, onClose, sections, active }) {
  const panelRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useLockBodyScroll(open)
  useFocusTrap(panelRef, open, onClose)

  const panelMotion = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.15 },
      }
    : {
        initial: { opacity: 0, y: -16 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -12 },
        transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
      }

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="mobile-menu__panel"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            ref={panelRef}
            {...panelMotion}
          >
            <div className="mobile-menu__top">
              <span className="eyebrow eyebrow--plain">Menu</span>
              <button
                type="button"
                className="mobile-menu__close"
                onClick={onClose}
                data-autofocus
                aria-label="Close menu"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <ModeSwitch variant="stack" onNavigate={onClose} />

            <nav className="mobile-menu__nav" aria-label="Sections">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="mobile-menu__link"
                  data-active={active === section.id || undefined}
                  onClick={onClose}
                >
                  <span>{section.label}</span>
                  <ArrowRight size={20} aria-hidden="true" />
                </a>
              ))}
            </nav>

            <div className="mobile-menu__foot">
              <a
                className="mobile-menu__email"
                href={`mailto:${site.contact.email}`}
              >
                {site.contact.email}
              </a>
              <SocialLinks variant="icons" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default MobileMenu
