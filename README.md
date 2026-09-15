# BEZLIAB

One personal website, two portfolio experiences, one brand.

`/` is a brand entrance that asks the visitor which side they came for.
`/developer` is for recruiters and engineering leads. `/designer` is for design
clients. Both are real routes with their own title and description, so each can
be sent to the audience it's for — and the navbar switches between them at any
time, without leaving the site.

React 18 + Vite. Plain CSS with custom properties — no Tailwind, no CSS-in-JS.
Framer Motion for entrances and the mode crossfade, Lucide for icons.

---

## Adding a project

This is the one workflow the whole architecture exists to serve. **No project is
hard-coded in JSX.** Adding one touches a single data file and nothing else — no
component, no grid, no modal, no CSS.

The full field list for each is in the header comment of its file. The two
schemas are deliberately different — development work has `technologies`,
`architecture`, `liveUrl`, `githubUrl`; design work has `client`, `services`,
`tools`, `deliverables`, and a gallery that _is_ the case study.
[ProjectModal.jsx](src/components/Projects/ProjectModal.jsx) dispatches on
`project.type` and renders the right detail view.

Two fields control placement:

| Field            | Effect                                              |
| ---------------- | --------------------------------------------------- |
| `featured: true` | appears in the homepage grid (keep it to 3–6)       |
| `order`          | lower sorts first, in both the grid and the browser |

Everything not featured still appears under **View More Projects →**, which opens
a full-screen browser with category filters and search — not a separate page.

**Categories.** A project's `categories` array uses slugs from
[src/data/filters.js](src/data/filters.js). In dev, [src/data/index.js](src/data/index.js)
warns in the console about an unknown slug, a duplicate `id`, or a missing
required field, so a typo surfaces immediately instead of quietly hiding a
project from a filter.

**Images.** `.webp`, sized for the slot they fill. Covers read best at 16:10;
design covers can be any ratio — the grid uses the optional `size` field
(`large` / `wide` / `tall` / `standard`) to weight them. Anything below the fold
is `loading="lazy"`. Until a real file exists at the given path,
[ProjectMedia.jsx](src/components/ui/ProjectMedia.jsx) renders a deterministic
branded placeholder, so a half-finished data entry never breaks a layout.

**The featured grid is asymmetric but not hand-placed.**
[ProjectGrid.jsx](src/components/Projects/ProjectGrid.jsx) holds one composition
per featured count (1–6) where every row fills the 6-column track. Change how
many projects are featured and you land on a different complete composition —
you never land on a broken one.

---

## Details worth knowing before you edit

**Modals.** ESC closes, click-outside closes, focus moves in and returns to
whatever opened it, TAB can't escape, and the body scroll lock is
reference-counted — so opening a project detail _on top of_ the browser and
closing it again doesn't unlock the page underneath. Overlays portal to
`document.body`, because `backdrop-filter` on the navbar would otherwise trap
`position: fixed` children.

**Motion is restrained on purpose.** Entrance fade-and-rise, `scale(1.03)` on
card images, a 20px modal rise, the navbar background transition, the mode
crossfade. No particles, no spinning 3D, no WebGL, no loading screen.
`prefers-reduced-motion` is honoured everywhere — animated indicators fall back
to static ones rather than snapping.

**Deploying.** Any static host. It's an SPA, so `/developer` must serve
`index.html` instead of 404ing — `public/_redirects` covers Netlify; on Vercel
add a rewrite, on Nginx `try_files $uri /index.html`. Set the real domain in the
`<link rel="canonical">` in [index.html](index.html).

---

© Isaac Adeniji — Software Developer · Graphic Designer
