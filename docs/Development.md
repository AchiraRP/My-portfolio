# Development Guide

This document covers the local development workflow, tooling, coding conventions, and best practices for contributing to this project.

---

## Prerequisites

| Tool | Minimum version | Check |
|---|---|---|
| Node.js | 18.0.0 | `node --version` |
| npm | 9.0.0 | `npm --version` |
| Git | 2.30.0 | `git --version` |

---

## First-Time Setup

```bash
# Clone the repository
git clone https://github.com/achirarp/My-portfolio.git
cd My-portfolio

# Install all dependencies
npm install

# Set up environment variables
cp .env.example .env
# Open .env and fill in your values
```

### Environment Variables

| Variable | Description | Where to get it |
|---|---|---|
| `VITE_WEB3FORMS_ACCESS_KEY` | Contact form API key | [web3forms.com](https://web3forms.com) → Create Form |
| `VITE_CONTACT_EMAIL` | Your contact email | — |
| `VITE_GITHUB_USERNAME` | Your GitHub handle | — |
| `VITE_LINKEDIN_USERNAME` | Your LinkedIn handle | — |
| `VITE_TRYHACKME_USERNAME` | Your TryHackMe handle | — |

> Variables are loaded by Vite at startup. Restart `npm run dev` after editing `.env`.

---

## Development Server

```bash
npm run dev
```

- **URL:** http://localhost:5173
- **HMR:** Full React Fast Refresh — components update without losing state
- **Port conflict:** If port 5173 is occupied, Vite will increment to 5174, etc.

---

## Available Scripts

| Script | Command | Description |
|---|---|---|
| Development | `npm run dev` | Vite dev server with HMR |
| Type check | `npm run typecheck` | `tsc --noEmit` — no file output |
| Build | `npm run build` | Production bundle → `/dist` |
| Preview | `npm run preview` | Serves `/dist` locally for smoke-testing |

### Pre-commit checks (recommended)

Before every commit, run:

```bash
npm run typecheck
npm run build
```

Both must pass with no errors.

---

## Project Conventions

### File and Folder Naming

| Type | Convention | Example |
|---|---|---|
| React component | PascalCase | `PortfolioGrid.tsx` |
| Hook | `use` prefix, camelCase | `useActiveSection.ts` |
| Utility | camelCase | `sanitizeInput.ts` |
| Type file | camelCase or PascalCase | `index.ts` |
| Constant file | camelCase | `portfolio.ts` |

### Import Order

Organise imports in this order (enforced by convention, not a linter):

```typescript
// 1. React and framework imports
import { useState, useCallback } from 'react';

// 2. Third-party libraries
import { Terminal } from 'lucide-react';

// 3. Internal — components
import { Button } from '../ui/button';

// 4. Internal — hooks, services, api
import { useTerminal } from '../../hooks/useTerminal';

// 5. Internal — types, constants
import type { PortfolioItem } from '../../types';
```

### Path Aliases

The `@` alias maps to `src/`. Use it for absolute imports from `src/`:

```typescript
// Preferred
import { portfolioData } from '@/constants/portfolio';

// Avoid
import { portfolioData } from '../../../constants/portfolio';
```

---

## Updating Portfolio Content

All portfolio data lives in a single file:

**[`src/constants/portfolio.ts`](../src/constants/portfolio.ts)**

### Adding a New Project

1. Open `src/constants/portfolio.ts`.
2. Add a new entry to the `projects` array following the `PortfolioItem` interface:

```typescript
{
  id: 'my-new-project',
  title: 'My New Project',
  description: 'Short description of what it does.',
  image: '/path/to/image.png',
  tags: ['Python', 'Security', 'Automation'],
  links: {
    github: 'https://github.com/achirarp/my-new-project',
    live: 'https://demo.example.com',   // optional
  },
}
```

3. Save the file. HMR will reload instantly.

### Adding a New Blog Post

Add an entry to the `blogs` array in `portfolio.ts` following the same pattern.

---

## Theming

The design system is entirely driven by CSS custom properties defined in `src/styles/globals.css`.

### Dark Mode (default)

| Property | Value | Usage |
|---|---|---|
| `--primary` | `#00ff41` (neon green) | Borders, accents, active states |
| `--background` | `#0a0a0a` (near-black) | Page background |
| `--foreground` | `#00ff41` | Default text |
| `--muted-foreground` | `#00aa29` | Secondary text |

### Light Mode

| Property | Value |
|---|---|
| `--primary` | `#000000` |
| `--background` | `#ffffff` |
| `--foreground` | `#000000` |

### Changing the Accent Colour

To update the primary accent colour for dark mode, change `--primary` in the `.dark` block in `globals.css`. All themed elements will update automatically.

---

## Adding a New Section

1. Create the component file in `src/components/sections/MySection.tsx`.
2. Add a lazy import in `src/App.tsx`:
   ```typescript
   const MySection = lazy(() =>
     import('./components/sections/MySection').then(m => ({ default: m.MySection }))
   );
   ```
3. Add a `<section id="my-section">` element inside the `<Suspense>` block in `App.tsx`.
4. Add the section ID to `src/constants/index.ts`:
   ```typescript
   export const sectionIds = ['home', 'about', ..., 'my-section'];
   ```
5. Add the nav link to `src/components/sections/Header.tsx`.

---

## TypeScript Strict Mode

The project runs with `"strict": true`. Common patterns to follow:

```typescript
// ✅ Use explicit prop types
interface MyProps {
  title: string;
  onClick: () => void;
  count?: number;
}

// ✅ Use useCallback for stable function references
const handleClick = useCallback(() => {
  // ...
}, [dependency]);

// ✅ Prefer type narrowing over casting
if (typeof value === 'string') {
  console.log(value.toUpperCase());
}

// ❌ Avoid `any`
const data: any = fetchData(); // never do this
```

---

## VSCode Recommended Extensions

Add to `.vscode/extensions.json`:

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Contact form not submitting | Missing `VITE_WEB3FORMS_ACCESS_KEY` | Check `.env` — restart dev server |
| TypeScript errors on startup | Outdated Node/TypeScript | `npm install` then `npm run typecheck` |
| Styles not applying | Tailwind class not recognised | Verify the class exists in Tailwind v4 docs |
| Port 5173 in use | Another Vite instance running | Kill it or use `vite --port 5174` |
