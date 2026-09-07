// import { Link } from 'react-router-dom'
// import { site } from '../../data/site'
// import { usePortfolio } from '../../context/PortfolioContext'
// import logoColour from '../../assets/logos/bezliab-logo-colour.png'
// import logoWc from '../../assets/logos/bezliab-logo-wc.png'
// import './Wordmark.css'

// /**
//  * The BEZLIAB logo mark.
//  *
//  * Landing sits on the dark green background, so it gets the white/yellow
//  * ("w&c") lockup. Developer and designer sit on light surfaces, so they get
//  * the full-colour (green/yellow) lockup. Same mark, matched to the surface
//  * it's on.
//  */
// export function Wordmark({ to = '/', showTagline = false, size = 'md' }) {
//   const { isLanding } = usePortfolio()
//   const logo = isLanding ? logoWc : logoColour

//   const content = (
//     <>
//       <img className="wordmark__logo" src={logo} alt={site.brand} />
//       {showTagline && (
//         <span className="wordmark__tagline">{site.tagline}</span>
//       )}
//     </>
//   )

//   if (!to) {
//     return <span className={`wordmark wordmark--${size}`}>{content}</span>
//   }

//   return (
//     <Link
//       to={to}
//       className={`wordmark wordmark--${size}`}
//       aria-label={`${site.brand} — home`}
//     >
//       {content}
//     </Link>
//   )
// }

// export default Wordmark

import { Link } from "react-router-dom";
import { site } from "../../data/site";
import { usePortfolio } from "../../context/PortfolioContext";
import logoColour from "../../assets/logos/bezliab-logo-colour.png";
import logoWc from "../../assets/logos/bezliab-logo-wc.png";
import "./Wordmark.css";

/**
 * The BEZLIAB logo mark.
 *
 * Landing sits on the dark green background, so it gets the white/yellow
 * ("w&c") lockup. Developer and designer sit on light surfaces, so they get
 * the full-colour (green/yellow) lockup. Same mark, matched to the surface
 * it's on.
 */
export function Wordmark({ to = "/", showTagline = false, size = "md" }) {
  const { isLanding } = usePortfolio();
  const logo = isLanding ? logoWc : logoColour;

  const content = (
    <>
      <img className="wordmark__logo" src={logo} alt={site.brand} />
      {showTagline && <span className="wordmark__tagline">{site.tagline}</span>}
    </>
  );

  if (!to) {
    return <span className={`wordmark wordmark--${size}`}>{content}</span>;
  }

  return (
    <Link
      to={to}
      className={`wordmark wordmark--${size}`}
      aria-label={`${site.brand} — home`}
    >
      {content}
    </Link>
  );
}

export default Wordmark;
