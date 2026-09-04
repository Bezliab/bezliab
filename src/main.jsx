import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

/* Order matters: tokens, then base, then the animation helpers. */
import './styles/variables.css'
import './styles/global.css'
import './styles/animations.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
