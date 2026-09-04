import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { modeList } from '../../data/site'
import { usePortfolio } from '../../context/PortfolioContext'
import './ModeSwitch.css'

/**
 * The switch between the two portfolios.
 *
 * This is the spine of the whole idea (spec §4): choosing Developer or
 * Designer on the landing page is never permanent. The switch is present in
 * the navbar on every page, in both modes, and moving between them is a
 * route change — so both experiences stay linkable and indexable — not a
 * different website.
 *
 * `variant` also namespaces the animated indicator, so the copy inside the
 * mobile menu doesn't fight the one in the navbar for the same layoutId.
 */
export function ModeSwitch({ variant = 'bar', onNavigate }) {
  const { mode } = usePortfolio()
  const reduceMotion = useReducedMotion()

  return (
    <div
      className={`mode-switch mode-switch--${variant}`}
      role="group"
      aria-label="Choose a portfolio"
    >
      {modeList.map((item) => {
        const isActive = mode === item.key

        return (
          <Link
            key={item.key}
            to={item.path}
            className="mode-switch__item"
            data-active={isActive || undefined}
            aria-current={isActive ? 'page' : undefined}
            onClick={onNavigate}
          >
            {isActive &&
              (reduceMotion ? (
                <span className="mode-switch__indicator" aria-hidden="true" />
              ) : (
                <motion.span
                  className="mode-switch__indicator"
                  layoutId={`mode-switch-indicator-${variant}`}
                  aria-hidden="true"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              ))}
            <span className="mode-switch__label">{item.label}</span>
          </Link>
        )
      })}
    </div>
  )
}

export default ModeSwitch
