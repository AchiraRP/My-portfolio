# Contributing Guide

Thank you for your interest in contributing to this portfolio project. Contributions are welcome in the form of bug reports, documentation improvements, and feature suggestions.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Branch Strategy](#branch-strategy)
- [Commit Conventions](#commit-conventions)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Reporting Bugs](#reporting-bugs)

---

## Code of Conduct

Please be respectful and constructive. Harassment, discrimination, or abusive language of any kind will not be tolerated.

---

## Getting Started

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/<your-username>/My-portfolio.git
   cd My-portfolio
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Configure environment:**
   ```bash
   cp .env.example .env
   # Fill in your values
   ```
5. **Create a feature branch** from `main`:
   ```bash
   git switch -c feature/your-feature-name
   ```

---

## Branch Strategy

| Branch pattern | Purpose |
|---|---|
| `main` | Stable, production-ready code |
| `feature/<name>` | New features |
| `fix/<name>` | Bug fixes |
| `refactor/<name>` | Code quality improvements |
| `docs/<name>` | Documentation-only changes |
| `chore/<name>` | Build, dependencies, configuration |

**Never push directly to `main`.** Open a Pull Request.

---

## Commit Conventions

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<optional scope>): <short description>

[optional body]
[optional footer]
```

### Types

| Type | When to use |
|---|---|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation changes only |
| `style` | Formatting, missing semicolons, etc. (no logic change) |
| `refactor` | Code change that is neither a fix nor a feature |
| `perf` | Performance improvement |
| `test` | Adding or updating tests |
| `chore` | Build process, dependency updates |
| `ci` | CI/CD configuration |

### Examples

```
feat(contact): add input character counter
fix(header): prevent nav flicker on mobile scroll
docs(readme): update deployment instructions
refactor(portfolio-grid): extract modal into own component
chore(deps): upgrade vite to 6.4.3
```

---

## Pull Request Process

1. Ensure your branch is up-to-date with `main`:
   ```bash
   git fetch origin
   git rebase origin/main
   ```
2. Verify the build passes before opening a PR:
   ```bash
   npm run typecheck
   npm run build
   ```
3. Open a Pull Request with a clear title (following Conventional Commits) and a description explaining:
   - **What** changed
   - **Why** the change is needed
   - **How** to test it
4. Request a review. Merge is only performed after approval.

---

## Coding Standards

### TypeScript
- Strict mode is enabled (`"strict": true` in `tsconfig.json`). All code must be type-safe.
- Prefer explicit return types on exported functions.
- Avoid `any`. Use `unknown` with type guards where necessary.

### React
- Functional components only. No class components.
- Keep components focused on a single responsibility.
- Extract repeated logic into custom hooks under `src/hooks/`.
- Use `useCallback` / `useMemo` for stable references passed as props.

### Styling
- Use Tailwind CSS utilities. Avoid inline `style` attributes except for dynamic values (e.g., `animationDelay`).
- Do not add new CSS rules to `globals.css` without justification.
- Respect the existing `--primary`, `--background`, `--foreground` CSS custom property tokens.

### File Naming
- Components: `PascalCase.tsx` (e.g., `PortfolioGrid.tsx`)
- Hooks: `camelCase.ts` prefixed with `use` (e.g., `useActiveSection.ts`)
- Utilities / constants: `camelCase.ts`
- Types: `camelCase.ts` or `PascalCase.ts`

---

## Reporting Bugs

Please open a [GitHub Issue](https://github.com/achirarp/My-portfolio/issues) with:

1. A clear, descriptive title
2. Steps to reproduce the bug
3. Expected behaviour
4. Actual behaviour
5. Environment details (OS, browser, Node.js version)

For security vulnerabilities, **do not open a public issue.** See [SECURITY.md](./SECURITY.md) instead.
