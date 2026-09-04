import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { modes } from '../data/site'

/* ==========================================================================
   PortfolioContext

   Owns exactly one thing: which experience the visitor is currently in.

   - `mode` is 'developer' | 'designer' | 'landing'
   - `config` is the matching object from data/site.js (null on the landing)
   - `lastMode` remembers the side someone chose, so the landing page's own
     nav links point somewhere sensible on a return visit
   - the mode is written to <html data-mode="..."> where variables.css picks
     it up, which is what makes the theme swap a crossfade rather than a
     re-render of every styled component
   ========================================================================== */

const PortfolioContext = createContext(null)

const STORAGE_KEY = 'bezliab:last-mode'

function readStoredMode() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored === 'developer' || stored === 'designer' ? stored : 'developer'
  } catch {
    // private browsing / storage disabled — the default is fine
    return 'developer'
  }
}

export function PortfolioProvider({ mode = 'landing', children }) {
  const [lastMode, setLastMode] = useState(readStoredMode)

  // Remember a real portfolio mode; 'landing' is not a destination.
  useEffect(() => {
    if (mode !== 'developer' && mode !== 'designer') return
    setLastMode(mode)
    try {
      window.localStorage.setItem(STORAGE_KEY, mode)
    } catch {
      /* ignore */
    }
  }, [mode])

  // Drive the CSS theme from the document root.
  useEffect(() => {
    const root = document.documentElement
    root.dataset.mode = mode
    return () => {
      delete root.dataset.mode
    }
  }, [mode])

  const value = useMemo(
    () => ({
      mode,
      config: modes[mode] ?? null,
      isLanding: mode === 'landing',
      lastMode,
      otherMode: mode === 'designer' ? modes.developer : modes.designer,
    }),
    [mode, lastMode]
  )

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  const context = useContext(PortfolioContext)
  if (!context) {
    throw new Error('usePortfolio must be used inside a PortfolioProvider')
  }
  return context
}
