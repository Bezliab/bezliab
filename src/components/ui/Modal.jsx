import { useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'
import './Modal.css'

/**
 * The shared modal shell.
 *
 * Contract, applied identically everywhere:
 *   - ESC closes
 *   - clicking the backdrop closes
 *   - TAB is trapped inside the dialog
 *   - focus enters on open and returns to the trigger on close
 *   - the page behind cannot scroll, and does not shift when it locks
 *
 * `level` lets a project detail open on top of the project browser without
 * either one unlocking the page early.
 */
export function Modal({
  open,
  onClose,
  title,
  labelledBy,
  variant = 'sheet',
  level = 1,
  children,
  header,
}) {
  const dialogRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useLockBodyScroll(open)
  useFocusTrap(dialogRef, open, onClose)

  const onBackdrop = useCallback(
    (event) => {
      if (event.target === event.currentTarget) onClose?.()
    },
    [onClose]
  )

  const motionProps = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.15 },
      }
    : {
        initial: { opacity: 0, y: 20, scale: variant === 'panel' ? 0.98 : 1 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 12, scale: variant === 'panel' ? 0.99 : 1 },
        transition: { duration: 0.34, ease: [0.22, 1, 0.36, 1] },
      }

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className={`modal modal--${variant}`}
          style={{ zIndex: level > 1 ? 'var(--z-modal-nested)' : 'var(--z-modal)' }}
          onMouseDown={onBackdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <motion.div
            className="modal__dialog"
            role="dialog"
            aria-modal="true"
            aria-label={labelledBy ? undefined : title}
            aria-labelledby={labelledBy}
            ref={dialogRef}
            {...motionProps}
          >
            <div className="modal__bar">
              <div className="modal__bar-content">{header}</div>
              <button
                type="button"
                className="modal__close"
                onClick={onClose}
                data-autofocus
                aria-label="Close"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="modal__body">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default Modal
