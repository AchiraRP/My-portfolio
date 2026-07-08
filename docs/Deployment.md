# Deployment Guide

This is a static Single-Page Application (SPA). The production build produces a `/dist` directory containing plain HTML, CSS, and JavaScript — deployable to any static host with zero server-side configuration.

---

## Build the Production Bundle

```bash
# 1. Set production environment variables
cp .env.example .env
# Fill in real values

# 2. Type-check before building
npm run typecheck

# 3. Build
npm run build

# Output:
# dist/
#   index.html
#   assets/
#     index-*.js
#     vendor-*.js
#     *.css
#   robots.txt
#   sitemap.xml
#   favicon.svg
#   profile-with-mask.png
#   profile-without-mask.png
```

---

## Deployment Targets

### GitHub Pages (Recommended for portfolio use)

**Setup once:**

1. Push your repository to GitHub.
2. Go to **Settings → Pages → Source** → select `gh-pages` branch or `main /docs` (if you prefer).

**Automated deploy with GitHub Actions:**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        env:
          VITE_WEB3FORMS_ACCESS_KEY: ${{ secrets.VITE_WEB3FORMS_ACCESS_KEY }}
          VITE_CONTACT_EMAIL: ${{ secrets.VITE_CONTACT_EMAIL }}
          VITE_GITHUB_USERNAME: ${{ secrets.VITE_GITHUB_USERNAME }}
          VITE_LINKEDIN_USERNAME: ${{ secrets.VITE_LINKEDIN_USERNAME }}
          VITE_TRYHACKME_USERNAME: ${{ secrets.VITE_TRYHACKME_USERNAME }}
        run: npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

3. Add your environment variables to **GitHub → Settings → Secrets and Variables → Actions**.

**Important:** If your repo is not at the domain root (e.g., `https://username.github.io/My-portfolio/`), add a `base` config to `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/My-portfolio/',
  // ... rest of config
});
```

---

### Vercel (Zero-config, instant CDN)

1. Import your GitHub repository at [vercel.com/new](https://vercel.com/new).
2. Vercel auto-detects Vite. Override settings if needed:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Add environment variables under **Project → Settings → Environment Variables**.
4. Add `vercel.json` to the project root for security headers:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
```

---

### Netlify

1. Import your GitHub repository at [app.netlify.com](https://app.netlify.com).
2. Set:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
3. Add environment variables under **Site → Environment variables**.
4. Add `netlify.toml` to the project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

> The `[[redirects]]` rule ensures React Router client-side routes work correctly on direct URL access.

---

### Manual / Self-hosted (nginx)

```bash
# Build
npm run build

# Copy dist/ to your web server root
scp -r dist/ user@server:/var/www/portfolio/

# nginx site config
server {
    listen 80;
    server_name portfolio.example.com;
    root /var/www/portfolio;
    index index.html;

    # SPA fallback — route all requests to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets aggressively
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "DENY";
    add_header X-Content-Type-Options "nosniff";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
}
```

---

## Post-Deployment Checklist

After every deployment, verify:

- [ ] Site loads at the production URL
- [ ] Dark/Light mode toggle works
- [ ] Contact form submits successfully (test with a real email)
- [ ] All project images load
- [ ] Navigation scrolls correctly on mobile
- [ ] `https://yourdomain.com/robots.txt` is accessible
- [ ] `https://yourdomain.com/sitemap.xml` is accessible
- [ ] Open Graph preview works (use [opengraph.xyz](https://opengraph.xyz))
- [ ] Google Search Console — submit sitemap URL

---

## Updating the Sitemap

After changing your domain or adding new pages, update `public/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://your-actual-domain.com/</loc>
    <lastmod>YYYY-MM-DD</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

Also update the matching `<meta property="og:url">` and JSON-LD `url` in `index.html`.

---

## Rollback

All deployments on GitHub Pages, Vercel, and Netlify are immutable and versioned. To rollback:

- **GitHub Actions:** Re-run a previous successful workflow.
- **Vercel:** Go to **Deployments** → click a previous deployment → **Promote to Production**.
- **Netlify:** Go to **Deploys** → click a previous deploy → **Publish deploy**.
