# Folder Structure

Annotated directory tree for the Cybersecurity Portfolio project as of v1.3.0.

```
My-portfolio/
│
├── public/                         # Static files copied verbatim to dist/
│   ├── favicon.svg                 # Browser tab icon
│   ├── profile-with-mask.png       # Profile image (used in Hero)
│   ├── profile-without-mask.png    # Profile image (hover variant)
│   ├── robots.txt                  # Search crawler instructions
│   └── sitemap.xml                 # XML sitemap for Google Search Console
│
├── src/                            # All TypeScript/TSX application source
│   │
│   ├── App.tsx                     # Root component: layout shell, lazy section loading, scroll logic
│   ├── main.tsx                    # React DOM entry point, ThemeProvider, StrictMode
│   │
│   ├── api/                        # External API integrations
│   │   └── contact.ts              # Web3Forms HTTP POST wrapper
│   │
│   ├── assets/                     # Images / files imported directly by source code
│   │   └── (static assets)
│   │
│   ├── components/
│   │   │
│   │   ├── sections/               # Heavy, page-level section components (one per page area)
│   │   │   ├── AboutSection.tsx    # Bio, skills grid, experience, education timeline
│   │   │   ├── BlogsSection.tsx    # Blog and writeup cards with external links
│   │   │   ├── ContactSection.tsx  # Terminal-style contact form (Web3Forms)
│   │   │   ├── Header.tsx          # Fixed navigation bar, theme toggle, mobile hamburger
│   │   │   ├── HeroSection.tsx     # Terminal window, CTA buttons, scroll indicator
│   │   │   ├── PortfolioGrid.tsx   # Projects/labs card grid with filter modal
│   │   │   ├── ProofSection.tsx    # Certifications, CTF stats, TryHackMe badges
│   │   │   └── SkillsSection.tsx   # Skills list (currently unused in main layout)
│   │   │
│   │   ├── shared/                 # Reusable components used across multiple sections
│   │   │   ├── ImageWithFallback.tsx  # <img> with lazy loading and error fallback
│   │   │   └── TerminalWindow.tsx     # Interactive command-line shell component
│   │   │
│   │   └── ui/                     # Generic, stateless UI primitives (shadcn/ui pattern)
│   │       ├── badge.tsx           # Pill/tag badge
│   │       ├── button.tsx          # Button with variants (default, outline, ghost)
│   │       ├── card.tsx            # Card container with header/content/footer slots
│   │       ├── input.tsx           # Styled text input
│   │       ├── textarea.tsx        # Styled textarea
│   │       └── (other primitives)
│   │
│   ├── constants/                  # Static data — all portfolio content lives here
│   │   ├── index.ts                # Section IDs list (used by scroll tracking)
│   │   └── portfolio.ts            # Projects, labs, blogs, certifications, skills, bio
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── useActiveSection.ts     # IntersectionObserver-based active section tracker
│   │   └── useTerminal.ts          # Terminal command parser and output state manager
│   │
│   ├── lib/                        # Pure utility functions (no React)
│   │   └── utils.ts                # `cn()` class-name merger (clsx + tailwind-merge)
│   │
│   ├── pages/                      # Full-page route components (standalone views)
│   │   └── (page components)
│   │
│   ├── services/                   # Business-logic services (non-API, non-hook)
│   │   └── (service modules)
│   │
│   ├── styles/                     # Global CSS
│   │   └── globals.css             # CSS custom properties, Tailwind base, custom animations
│   │
│   └── types/                      # Shared TypeScript interfaces
│       └── index.ts                # PortfolioItem, BlogPost, Certification, etc.
│
├── docs/                           # Project documentation
│   ├── Architecture.md             # System design and component architecture
│   ├── Deployment.md               # Deployment guides (GitHub Pages, Vercel, Netlify, nginx)
│   ├── Development.md              # Developer workflow, conventions, content updates
│   └── FolderStructure.md          # This file
│
├── .editorconfig                   # Cross-editor formatting rules (indent, charset, EOL)
├── .env                            # Local environment variables (git-ignored)
├── .env.example                    # Template — copy to .env and fill in values
├── .gitignore                      # Files excluded from version control
├── CHANGELOG.md                    # Version history (Keep a Changelog format)
├── CONTRIBUTING.md                 # Contribution guidelines
├── index.html                      # Vite HTML entry — meta tags, CSP, JSON-LD, app root
├── LICENSE                         # MIT License
├── package.json                    # npm scripts, dependencies, peer deps
├── package-lock.json               # Lockfile (committed for reproducible installs)
├── postcss.config.mjs              # PostCSS config (required by Tailwind v4)
├── README.md                       # Project overview and quick-start guide
├── SECURITY.md                     # Security policy and vulnerability reporting
├── tsconfig.json                   # TypeScript compiler config (strict mode, path aliases)
├── tsconfig.node.json              # TypeScript config for Vite/Node tooling files
└── vite.config.ts                  # Vite build configuration (plugins, aliases, chunk splitting)
```

---

## Key File Responsibilities

| File | What to edit here |
|---|---|
| `src/constants/portfolio.ts` | Add/edit projects, labs, blogs, certifications |
| `src/styles/globals.css` | Colour tokens, global animations, `prefers-reduced-motion` |
| `index.html` | Page title, meta description, Open Graph, JSON-LD, CSP |
| `vite.config.ts` | Build optimisation, plugins, path aliases, chunk splitting |
| `public/sitemap.xml` | Domain URL, lastmod date after deployments |
| `public/robots.txt` | Crawler rules |

---

## What Lives Where — Decision Guide

| Question | Answer |
|---|---|
| I want to add a new project card | Edit `src/constants/portfolio.ts` |
| I want to add a new page/route | Create in `src/pages/`, add to router in `main.tsx` |
| I want to add a reusable button style | Add variant to `src/components/ui/button.tsx` |
| I want to add a new section to the homepage | Create in `src/components/sections/`, lazy-import in `App.tsx` |
| I want to share logic between two sections | Extract to `src/hooks/` (if stateful) or `src/lib/` (if pure) |
| I want to call a new external API | Add to `src/api/` |
| I want to add a new environment variable | Add to `.env`, `.env.example`, and document in `docs/Development.md` |
