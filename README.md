# BEZLIAB

One personal website, two portfolio experiences, one brand.

`/` is a brand entrance that asks the visitor which side they came for.
`/developer` is for recruiters and engineering leads. `/designer` is for design
clients. Both are real routes with their own title and description, so each can
be sent to the audience it's for — and the navbar switches between them at any
time, without leaving the site.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview  # serve the production build on :4173
```

React 18 + Vite. Plain CSS with custom properties — no Tailwind, no CSS-in-JS.
Framer Motion for entrances and the mode crossfade, Lucide for icons.

---

## Adding a project

This is the one workflow the whole architecture exists to serve. **No project is
hard-coded in JSX.** Adding one touches a single data file and nothing else — no
component, no grid, no modal, no CSS.

**A developer project**

1. Drop images in `public/projects/<id>/` — `cover.webp` plus any gallery shots
2. Add one object to [src/data/developerProjects.js](src/data/developerProjects.js)
3. Save

**A design project**

1. Drop images in `public/projects/design/<id>/`
2. Add one object to [src/data/designProjects.js](src/data/designProjects.js)
3. Save

The full field list for each is in the header comment of its file. The two
schemas are deliberately different — development work has `technologies`,
`architecture`, `liveUrl`, `githubUrl`; design work has `client`, `services`,
`tools`, `deliverables`, and a gallery that *is* the case study.
[ProjectModal.jsx](src/components/Projects/ProjectModal.jsx) dispatches on
`project.type` and renders the right detail view.

Two fields control placement:

| Field | Effect |
| --- | --- |
| `featured: true` | appears in the homepage grid (keep it to 3–6) |
| `order` | lower sorts first, in both the grid and the browser |

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

## Replacing my placeholder content with yours

Everything personal lives in `src/data/`. Search the project for `TODO(you)` —
that marks every value written as a stand-in:

| File | What to replace |
| --- | --- |
| [site.js](src/data/site.js) | email, phone/WhatsApp, social URLs, location, both About narratives, the stats |
| [experience.js](src/data/experience.js) | real roles, companies and dates |
| [certificates.js](src/data/certificates.js) | empty by design — the section stays hidden until you add one |
| [developerSkills.js](src/data/developerSkills.js) | grouped skill lists (no skill bars, on purpose) |
| [designCapabilities.js](src/data/designCapabilities.js) | the designer-side equivalent |
| [process.js](src/data/process.js) | the four design process steps |

**About the stats:** the ones in `site.js` are placeholders. Replace them with
numbers you can genuinely stand behind, or delete the ones you can't — an
invented "50+ projects" is the fastest way to lose a reader who was otherwise
convinced. Same for `certificates.js`: it ships as an empty array and the
section doesn't render until it isn't.

---

## The contact form

There is no backend. Submitting validates the fields, then composes a
pre-filled email and hands it to the visitor's mail client — so the site stays a
static deploy with no secrets, and a message is never silently swallowed by a
form posting nowhere.

To collect submissions properly, open
[Contact.jsx](src/components/Contact/Contact.jsx) and either point the form's
`action` at a service (Formspree, Basin, Netlify Forms) or replace
`handleSubmit` with a `fetch` POST to your own endpoint. The markup, validation
and success/error states already work either way.

---

## How the two modes work

One theme file, one attribute. [PortfolioContext.jsx](src/context/PortfolioContext.jsx)
writes `data-mode="landing" | "developer" | "designer"` onto `<html>`;
[variables.css](src/styles/variables.css) redefines the tokens per mode. No
component contains theme logic, and no component asks "which mode am I in?" to
pick a colour.

```
--primary    #006838   deep green — the foundation, 60%
--highlight  #F5E862   yellow — CTAs, hover, active nav, tags, key stats only, 10%
--surface    white / near-white
```

The two sides share the brand and the interaction language and differ in
*personality*: developer is precise, structured, systematic — designer is
editorial, image-led, expressive. Same site, two voices. If they ever start to
look like two unrelated websites, the palette has drifted.

Where they genuinely diverge:

| | Developer | Designer |
| --- | --- | --- |
| Hero visual | floating browser mock (dashboard UI) | image collage + type specimen |
| Third section | Experience timeline | Process — Research → Concept → Exploration → Final |
| Work grid | structured, text-supported | image-heavy, minimal text over artwork |
| Card hover | `CASE STUDY →` | `EXPLORE →` |

[PortfolioPage.jsx](src/pages/PortfolioPage.jsx) is a single page shared by both
routes; the third section is chosen from a lookup, not an `if`.

---

## Structure

```
src/
  data/          all content. index.js is the only access point
  context/       PortfolioContext — current mode + its config
  hooks/         focus trap, body-scroll lock, scroll state, active section, meta
  components/
    ui/          Modal, ProjectMedia, HoverLabel, Reveal, SectionHeading,
                 SocialLinks, Wordmark, BrowserMock, Collage
    Navbar/ Hero/ About/ Skills/ Projects/ Experience/ Process/ Contact/ Footer/
  pages/         Landing, PortfolioPage, NotFound
  styles/        variables.css (tokens), global.css (base), animations.css
```

Every component imports its own CSS file beside it. Sections live under
`src/components/<Section>/`; the eight reusable primitives live under
`src/components/ui/`.

---

## Details worth knowing before you edit

**Modals.** ESC closes, click-outside closes, focus moves in and returns to
whatever opened it, TAB can't escape, and the body scroll lock is
reference-counted — so opening a project detail *on top of* the browser and
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
