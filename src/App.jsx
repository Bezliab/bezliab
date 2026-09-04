import { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { PortfolioProvider } from "./context/PortfolioContext";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import PortfolioPage from "./pages/PortfolioPage";

/**
 * Scroll behaviour across route changes.
 *
 * Two jobs: land at the top when the mode changes, and honour a hash so
 * /developer#work works as a shareable deep link (react-router doesn't do
 * either on its own).
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        requestAnimationFrame(() =>
          target.scrollIntoView({ behavior: "smooth", block: "start" }),
        );
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}

/* Each route owns its mode. The provider writes it to <html data-mode>, which is what swaps the theme — see styles/variables.css. */
function Shell({ mode, children }) {
  return <PortfolioProvider mode={mode}>{children}</PortfolioProvider>;
}

/**
 * Routes are real routes rather than component state (spec §28) so that the
 * two portfolios have their own URLs, their own titles and descriptions, and
 * can be shared with the audience they're for.
 */
export function App() {
  return (
    <BrowserRouter>
      <ScrollManager />

      <Routes>
        <Route
          path="/"
          element={
            <Shell mode="landing">
              <Landing />
            </Shell>
          }
        />

        <Route
          path="/developer"
          element={
            <Shell mode="developer">
              <PortfolioPage />
            </Shell>
          }
        />

        <Route
          path="/designer"
          element={
            <Shell mode="designer">
              <PortfolioPage />
            </Shell>
          }
        />

        {/* friendly aliases, in case a link gets typed from memory */}
        <Route path="/dev" element={<Navigate to="/developer" replace />} />
        <Route path="/design" element={<Navigate to="/designer" replace />} />

        <Route
          path="*"
          element={
            <Shell mode="landing">
              <NotFound />
            </Shell>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
