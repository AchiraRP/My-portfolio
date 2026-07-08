# Security Policy

## Supported Versions

| Version | Supported |
|---|---|
| 1.x (latest) | ✅ Yes |
| < 1.0 | ❌ No |

---

## Reporting a Vulnerability

**Do not open a public GitHub issue for security vulnerabilities.**

Please report security issues responsibly by emailing:

> **achira [at] example.com** *(replace with your actual email)*

Include the following in your report:

- A clear description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Any suggested mitigations (optional)

You will receive an acknowledgement within **72 hours**. If a fix is required, a patched release will be published and credit will be given to the reporter (unless anonymity is requested).

---

## Security Design

### Client-Side Architecture

This is a fully static Single-Page Application with **no server-side execution**. There is no database, no authentication system, and no dynamic server. The attack surface is limited to:

- The contact form (Web3Forms API)
- Third-party JavaScript dependencies

### Environment Variables

All `VITE_` prefixed variables are **embedded in the client bundle at build time** by Vite. They are not secrets — they are public by design.

| Implication | Action taken |
|---|---|
| `VITE_WEB3FORMS_ACCESS_KEY` is public | Web3Forms keys are scoped by domain — limit to your domain in the Web3Forms dashboard |
| `.env` file previously tracked by git | Removed with `git rm --cached .env`; `.env` is in `.gitignore` |
| Hardcoded fallback key existed in source | Removed — the application now fails explicitly if the env var is missing |

### Content Security Policy

The following CSP is set via `<meta http-equiv="Content-Security-Policy">` in `index.html`:

```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval';
style-src 'self' 'unsafe-inline';
img-src 'self' data: https:;
connect-src 'self' https://api.web3forms.com ws: wss:;
font-src 'self' data:;
```

> **Note:** `'unsafe-inline'` and `'unsafe-eval'` are required by Vite's HMR in development and by some bundled UI libraries. In a future iteration, nonce-based CSP can be implemented at the reverse-proxy or CDN edge level for stricter enforcement.

### Input Validation

The contact form enforces:
- `maxLength` attributes: name (100), email (200), message (1000)
- Control character stripping via `sanitizeInput()` before terminal state mutations
- HTML is not injected (React's JSX escapes all values by default)

### Dependency Management

- `npm audit` is run as part of the CI workflow.
- Dependencies are updated proactively. Run `npm audit` locally to check for known CVEs.
- High-severity vulnerabilities are patched within the same sprint.

### Browser Security Headers

The following headers are set at the meta-tag level. For production, these should additionally be set at the CDN / hosting edge for full effectiveness:

| Header | Value |
|---|---|
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |

### Recommended Hosting Configuration

When deploying to Vercel or Netlify, add the following to `vercel.json` or `netlify.toml` to enforce headers at the edge:

**Vercel (`vercel.json`):**
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

**Netlify (`netlify.toml`):**
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"
```
