/* ==========================================================================
   SITE — brand, identity, contact, SEO
   Everything personal lives here. No component hard-codes your details.

   TODO(you): replace every value marked TODO with your real information.
   ========================================================================== */

export const site = {
  brand: "BEZLIAB",
  owner: "Isaac Adeniji",
  tagline: "Software × Design",
  role: "Software Developer · Graphic Designer",

  landing: {
    headline: ["I build.", "I design.", "I create."],
    support:
      "A multidisciplinary creative combining software engineering and visual design to turn ideas into useful digital experiences.",
  },

  // TODO(you): real contact details.
  contact: {
    email: "hello@bezliab.com",
    location: "Lagos, Nigeria",
    availability: "Open to roles and freelance projects",
    responseTime: "Usually replies within 24 hours",
  },

  /* Socials — remove any you don't actually use; the footer and contact
     section render whatever is in this array, in this order. */
  socials: [
    { label: "Email", href: "mailto:hello@bezliab.com", icon: "mail" },
    { label: "GitHub", href: "https://github.com/bezliab", icon: "github" },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/isaac-adeniji",
      icon: "linkedin",
    },
    { label: "Behance", href: "https://behance.net/bezliab", icon: "behance" },
    {
      label: "Instagram",
      href: "https://instagram.com/bezliab",
      icon: "instagram",
    },
    { label: "WhatsApp", href: "https://wa.me/0000000000", icon: "whatsapp" },
  ],
};

/* ==========================================================================
   MODES — everything that differs between the two portfolio experiences.
   PortfolioPage reads one of these objects and renders itself accordingly.
   ========================================================================== */

export const modes = {
  developer: {
    key: "developer",
    path: "/developer",
    label: "Developer",
    navLabel: "Software Developer",
    cardTitle: "SOFTWARE DEVELOPER",
    cardAction: "Build digital products",
    cardBlurb: "I build digital products, web applications and systems.",

    hero: {
      eyebrow: "Software Development",
      headline: "I build digital products that solve real problems.",
      support:
        "Full-stack developer focused on building reliable web and mobile applications, scalable backend systems and thoughtful user experiences.",
      primaryCta: { label: "View my work", href: "#work" },
      secondaryCta: { label: "Let's work together", href: "#contact" },
      /* the small subtle row under the CTAs */
      stack: [
        "React",
        "TypeScript",
        "Flutter",
        "ASP.NET",
        "PostgreSQL",
        "Node.js",
      ],
      visual: "browser",
    },

    about: {
      eyebrow: "About",
      statement: "A developer who understands the bigger picture.",
      body: [
        // TODO(you): rewrite in your own voice.
        "I started out designing before I started building, which means I think about software the way a designer thinks about a poster: what is this actually for, who is reading it, and what can be removed.",
        "Today I build full-stack applications end to end — data model, API, interface — and I care about the parts users never see: sensible states, honest error messages, pages that load quickly on a bad connection.",
      ],
      /* TODO(you): only numbers you can genuinely support. Delete any you can't. */
      stats: [
        { value: "3+", label: "Years building" },
        { value: "20+", label: "Projects shipped" },
        { value: "12", label: "Technologies" },
      ],
    },

    work: {
      eyebrow: "Portfolio",
      title: "Selected Work",
      support: "A selection of things I've designed, built and shipped.",
      viewMoreLabel: "View More Projects",
      modalTitle: "All Projects",
      hoverLabel: "Case study",
    },

    skills: {
      eyebrow: "Capabilities",
      title: "Technologies I work with",
      support:
        "No progress bars. Just what I reach for, grouped by where it sits in a system.",
    },

    /* the third section: developer gets Experience, designer gets Process */
    thirdSection: "experience",

    seo: {
      title: "Isaac Adeniji — Full Stack Software Developer",
      description:
        "Full-stack software developer building web, mobile and backend applications.",
    },
  },

  designer: {
    key: "designer",
    path: "/designer",
    label: "Designer",
    navLabel: "Graphic Designer",
    cardTitle: "GRAPHIC DESIGNER",
    cardAction: "Explore visual work",
    cardBlurb: "I create visual identities, graphics and digital experiences.",

    hero: {
      eyebrow: "Graphic Design",
      headline: "I turn ideas into visual identities people remember.",
      support:
        "Graphic designer creating brand identities, digital graphics, campaigns and visual systems that communicate clearly.",
      primaryCta: { label: "Explore my work", href: "#work" },
      secondaryCta: { label: "Start a project", href: "#contact" },
      stack: [
        "Illustrator",
        "Photoshop",
        "CorelDraw",
        "Figma",
        "After Effects",
      ],
      visual: "collage",
    },

    about: {
      eyebrow: "About",
      statement: "Design that has to work, not just look good.",
      body: [
        // TODO(you): rewrite in your own voice.
        "I design identities and visual systems — the logo, yes, but more usefully the rules around it: how it behaves at 16px, what happens when there is no room for the wordmark, which of the three greens is the right one.",
        "Because I also build software, I hand over work that survives implementation. Type scales that exist, colours that pass contrast, files a developer can actually use.",
      ],
      stats: [
        { value: "4+", label: "Years designing" },
        { value: "30+", label: "Brand & visual projects" },
        { value: "8", label: "Industries" },
      ],
    },

    work: {
      eyebrow: "Portfolio",
      title: "Selected Work",
      support:
        "Identities, campaigns and visual systems. Process included, not just the finished artwork.",
      viewMoreLabel: "View More Work",
      modalTitle: "All Design Work",
      hoverLabel: "Explore",
    },

    skills: {
      eyebrow: "Capabilities",
      title: "What I do",
      support: "From first conversation to the files that ship.",
    },

    thirdSection: "process",

    seo: {
      title: "Isaac Adeniji — Graphic Designer",
      description:
        "Graphic designer specializing in branding, visual identity, digital graphics and creative design.",
    },
  },
};

export const modeList = [modes.developer, modes.designer];

/* Shared sections that appear in both modes, in order.
   `id` doubles as the scroll anchor and the nav link target. */
export const navSections = {
  developer: [
    { id: "about", label: "About" },
    { id: "work", label: "Work" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ],
  designer: [
    { id: "about", label: "About" },
    { id: "work", label: "Work" },
    { id: "process", label: "Process" },
    { id: "contact", label: "Contact" },
  ],
};

export const footer = {
  headline: "Have a project in mind?",
  support: "Let's build something meaningful.",
  builtWith: "Built with React",
};
