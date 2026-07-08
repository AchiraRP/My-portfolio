# Changelog

All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/) and [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### Added
- Professional documentation suite (README, CONTRIBUTING, CHANGELOG, SECURITY, Architecture, Development, Deployment, FolderStructure)

---

## [1.3.0] — 2026-07-08

### Added — Accessibility & SEO (`refactor/accessibility-seo`)
- WCAG 2.1 compliant keyboard navigation for `PortfolioGrid` card overlays (`group-focus-within`)
- `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` attributes on all modal dialogs
- `Escape` key handler to dismiss modals and terminal tour overlay from keyboard
- `aria-hidden="true"` on the matrix binary background to silence screen readers
- `@media (prefers-reduced-motion: reduce)` global CSS rule disabling all animations for motion-sensitive users
- `prefers-reduced-motion` check in `handleSectionChange` — falls back to `behavior: 'auto'`
- Comprehensive `<title>`, `<meta name="description">`, Open Graph, and Twitter Card tags in `index.html`
- JSON-LD `Person` structured data for Google rich results
- `public/robots.txt` — allows all crawlers, references sitemap
- `public/sitemap.xml` — canonical URL with `lastmod` and priority

### Changed
- `<meta name="robots">` changed from `noindex, nofollow` to `index, follow`
- Page title changed from `Achira_RP` to `Achira Pathiraja | Cybersecurity & SOC Analyst`

---

## [1.2.0] — 2026-07-08

### Added — Security Hardening (`refactor/security`)
- `Content-Security-Policy`, `X-Content-Type-Options`, and `Referrer-Policy` meta headers in `index.html`
- `public/robots.txt` and `public/sitemap.xml` (later superseded by v1.3.0 versions)
- `.env.example` template for developer onboarding
- `maxLength` constraints on contact form inputs (name: 100, email: 200, message: 1000)
- `sanitizeInput()` utility to strip control characters from terminal state

### Changed
- Removed hardcoded Web3Forms API key fallback from `src/api/contact.ts`
- Upgraded `vite` to `6.4.3` (patching 7 high-severity CVEs)
- Upgraded `react-router` to `7.18.1` (patching 7 high-severity CVEs)

### Security
- Removed `.env` from git tracking (`git rm --cached .env`)

---

## [1.1.0] — 2026-07-08

### Added — React Performance Optimisation
- `React.lazy` / `Suspense` lazy loading for all below-the-fold sections
- `manualChunks` in `vite.config.ts` isolating `react`, `react-dom`, and `lucide-react` into a vendor chunk
- Native `loading="lazy"` and `decoding="async"` on `ImageWithFallback`
- `IntersectionObserver` in `HeroSection` replacing `scroll` event listener for scroll indicator

---

## [1.0.0] — 2026-07-07

### Added — Initial Release
- Terminal-themed SPA portfolio with dark / light mode toggle
- Interactive in-page command shell (`TerminalWindow`) supporting `help`, `about`, `projects`, `contact`, `clear`
- Section components: Hero, About, ProofSection (certifications/CTF), PortfolioGrid (projects & labs), Blogs, Contact
- Web3Forms contact form integration
- `useActiveSection` hook for scroll-based active nav link tracking
- CSS animations: shimmer, bounce, fade, cyber-border glow
- Project architecture refactor: `api/`, `hooks/`, `types/`, `constants/`, `services/`, `pages/`, `components/`
- `.editorconfig`, `.gitignore`, `LICENSE` (MIT)

---

## Legend

| Symbol | Meaning |
|---|---|
| **Added** | New features |
| **Changed** | Changes to existing functionality |
| **Deprecated** | Features that will be removed in a future release |
| **Removed** | Features that have been removed |
| **Fixed** | Bug fixes |
| **Security** | Vulnerabilities addressed |
