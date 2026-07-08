# Achira Pathiraja — Cybersecurity Portfolio

> A terminal-themed, performance-first portfolio for a Cybersecurity Student and aspiring SOC Analyst. Built with React 18, TypeScript, and Vite.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF.svg)](https://vitejs.dev/)

---

## Overview

This portfolio is a fully static Single-Page Application (SPA) built to present cybersecurity projects, CTF lab writeups, blogs, certifications, and professional contact information in a hacker-themed terminal UI. It ships with zero server-side code and deploys to any static host in seconds.

**Live site:** [https://achirarp.github.io](https://achirarp.github.io)

---

## Features

- ⚡ **Vite 6** — Sub-second HMR, optimised production bundle
- 🔒 **Security-hardened** — CSP headers, no hardcoded secrets, `npm audit` clean
- ♿ **WCAG-compliant** — Full keyboard navigation, ARIA roles, `prefers-reduced-motion`
- 📈 **SEO-ready** — Open Graph, Twitter Cards, JSON-LD structured data, sitemap
- 🎨 **Dark / Light mode** — CSS custom property theming with `next-themes`
- 📦 **Code-split** — Lazy-loaded sections, isolated vendor chunk
- 🖥️ **Interactive terminal** — In-page command shell for navigating the site

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18.3 |
| Language | TypeScript 5.x (strict mode) |
| Build tool | Vite 6 |
| Styling | Tailwind CSS v4 |
| UI primitives | Radix UI / shadcn-ui pattern |
| Icons | Lucide React |
| Forms API | Web3Forms |
| Routing | React Router v7 |
| Package manager | npm |

---

## Quick Start

### Prerequisites

- **Node.js** ≥ 18.0.0
- **npm** ≥ 9.0.0

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/achirarp/My-portfolio.git
cd My-portfolio

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env and fill in your values (see Environment Variables below)

# 4. Start development server
npm run dev
# → http://localhost:5173
```

---

## Environment Variables

Copy `.env.example` → `.env` and populate each value:

| Variable | Required | Description |
|---|---|---|
| `VITE_WEB3FORMS_ACCESS_KEY` | ✅ Yes | Web3Forms access key for the contact form |
| `VITE_CONTACT_EMAIL` | Optional | Email shown in the contact section |
| `VITE_GITHUB_USERNAME` | Optional | GitHub username for profile links |
| `VITE_LINKEDIN_USERNAME` | Optional | LinkedIn username for profile links |
| `VITE_TRYHACKME_USERNAME` | Optional | TryHackMe username for the proof section |

> **Security note:** All `VITE_` variables are embedded in the client bundle at build time. Never store private secrets here. See [SECURITY.md](./SECURITY.md).

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server with HMR |
| `npm run build` | Compile a production-optimised bundle to `/dist` |
| `npm run typecheck` | Run `tsc --noEmit` to verify type correctness |
| `npm run preview` | Serve the production `/dist` build locally |

---

## Project Structure

See [docs/FolderStructure.md](./docs/FolderStructure.md) for a complete annotated tree.

```
src/
├── api/              # External service integrations (Web3Forms)
├── assets/           # Static assets imported by source files
├── components/
│   ├── sections/     # Page-level section components
│   ├── shared/       # Reusable cross-section components
│   └── ui/           # Generic UI primitives (Button, Card, Badge)
├── constants/        # Static data — portfolio content, nav config
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── pages/            # Full-page route components
├── services/         # Business-logic services
├── styles/           # Global CSS and Tailwind base
└── types/            # TypeScript interfaces and type aliases
```

---

## Documentation

| Document | Description |
|---|---|
| [Architecture.md](./docs/Architecture.md) | System design and component architecture |
| [Development.md](./docs/Development.md) | Developer workflow and conventions |
| [Deployment.md](./docs/Deployment.md) | Deployment to GitHub Pages, Vercel, Netlify |
| [FolderStructure.md](./docs/FolderStructure.md) | Annotated directory tree |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | How to contribute |
| [CHANGELOG.md](./CHANGELOG.md) | Version history |
| [SECURITY.md](./SECURITY.md) | Security policy and reporting |

---

## License

This project is licensed under the **MIT License** — see [LICENSE](./LICENSE) for details.
