# Architecture

This document describes the high-level architecture of the Cybersecurity Portfolio SPA.

---

## System Overview

```
Browser
  └── Static SPA (React + Vite)
        ├── index.html          (entry point, meta tags, CSP)
        ├── /assets             (compiled JS/CSS chunks)
        └── /public             (robots.txt, sitemap.xml, images)
              └── Contact Form  → Web3Forms API (external)
```

The portfolio is a **purely static, client-rendered SPA**. There is no backend, no database, and no authentication. All data is hardcoded in `src/constants/portfolio.ts` and shipped as part of the JavaScript bundle.

---

## Frontend Architecture

### Component Hierarchy

```
App.tsx
├── Header              (sticky nav, theme toggle, mobile menu)
├── main > section#home
│     └── HeroSection   (terminal window, CTA buttons)
├── main > section#about
│     └── AboutSection  (bio, skills, experience, education)
├── main > section#proof
│     └── ProofSection  (certifications, CTF stats, TryHackMe)
├── main > section#projects
│     └── PortfolioGrid (projects grid, modals)
├── main > section#blogs
│     └── BlogsSection  (blog/writeup cards)
├── main > section#contact
│     └── ContactSection (terminal-style form, Web3Forms)
└── footer
```

### Layered Architecture

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│  sections/ shared/ ui/ pages/           │
├─────────────────────────────────────────┤
│           Logic Layer                   │
│       hooks/  services/                 │
├─────────────────────────────────────────┤
│           Data Layer                    │
│       constants/  api/                  │
├─────────────────────────────────────────┤
│         Infrastructure Layer            │
│  vite.config.ts  tsconfig.json  .env    │
└─────────────────────────────────────────┘
```

---

## Key Design Decisions

### 1. Static-First, No Backend
**Decision:** All portfolio data lives in `src/constants/portfolio.ts`.  
**Rationale:** Eliminates server maintenance, hosting costs, and attack surface. Updates require a new build + deploy, which takes under 10 seconds.

### 2. Code-Splitting via React.lazy
**Decision:** All sections below the fold are lazy-loaded.  
**Rationale:** Reduces initial JS parse time. The main chunk (`index.js`) only includes the Hero section, Header, and routing logic. Sections are loaded as separate chunks when they are about to enter the viewport.

```
dist/assets/
  index-*.js          (Hero + Header + App shell, ~84 KB)
  vendor-*.js         (react, react-dom, lucide-react, ~155 KB)
  AboutSection-*.js   (~12 KB)
  PortfolioGrid-*.js  (~12 KB)
  ProofSection-*.js   (~11 KB)
  BlogsSection-*.js   (~8 KB)
  ContactSection-*.js (~7 KB)
```

### 3. CSS Custom Properties for Theming
**Decision:** All colours are defined as CSS custom properties in `globals.css`.  
**Rationale:** Theme switching (dark/light) is achieved purely by toggling the `.dark` class on `<html>`. No JavaScript re-renders required. The primary hacker theme (neon green `#00ff41` on near-black `#0a0a0a`) is the default dark mode.

### 4. Hardcoded Data vs. CMS
**Decision:** No CMS integration.  
**Rationale:** The data update frequency is low (new project every few weeks). A headless CMS would add complexity, a network dependency, and a potential failure point. Editing `constants/portfolio.ts` and pushing to `main` achieves the same result with better type safety.

### 5. Web3Forms for Contact
**Decision:** Contact form submits to the Web3Forms REST API.  
**Rationale:** Zero server-side code required. The API key is domain-scoped. It is a `VITE_` environment variable (intentionally public) — no proxy layer is needed.

---

## Data Flow

### Navigation
```
User clicks nav link
  → Header calls onSectionChange(id)
  → App.handleSectionChange()
    → checks prefers-reduced-motion
    → document.getElementById(id).scrollIntoView()
  → useActiveSection hook detects new IntersectionObserver entry
    → activeSection state updates
    → Header re-renders active nav item
```

### Contact Form Submission
```
User fills form → ContactSection local state
  → handleSubmit()
    → sanitizeInput() strips control chars
    → calls submitContactForm(data) from src/api/contact.ts
      → POST https://api.web3forms.com/submit
        → { access_key, name, email, message }
  → setStatus('success') or setStatus('error')
  → terminal output updates to reflect result
```

### Terminal Window Commands
```
User types command → TerminalWindow input state
  → useTerminal hook processes command string
    → maps command to handler (help, about, clear, etc.)
    → returns output lines array
  → TerminalWindow renders output
  → navigation commands call onSectionChange() → see Navigation above
```

---

## Scroll and Visibility

`useActiveSection` uses a single `IntersectionObserver` instance watching all section IDs. When a section's intersection ratio exceeds 30%, it becomes the active section. This is used by `Header` to highlight the corresponding nav link.

The scroll indicator in `HeroSection` uses a separate `IntersectionObserver` to trigger the terminal tour dismissal when the user scrolls past it.

---

## Bundle Analysis

As of v1.3.0:

| Chunk | Size (gzip) |
|---|---|
| vendor (react + react-dom + lucide-react) | 48.95 KB |
| index (app shell + Hero + Header) | 26.03 KB |
| CSS | 19.02 KB |
| AboutSection | 2.54 KB |
| PortfolioGrid | 3.03 KB |
| ProofSection | 2.29 KB |
| BlogsSection | 2.14 KB |
| ContactSection | 2.43 KB |
| **Total (gzip)** | **~106 KB** |
