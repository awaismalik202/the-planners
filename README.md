# The Planners — Marketing Site

Static marketing site for **The Planners** (event planning studio). Production-path build for GitHub + Netlify.

## Pages

| File | Route |
|------|--------|
| `index.html` | Home |
| `services.html` | Services |
| `about.html` | About |
| `portfolio.html` | Portfolio |
| `inquiry.html` | Contact / Inquiry |

Assets (logos + `tokens.css`) live in `assets/`. Optional brand notes: `brand/README.md`.

## Open locally

From this folder:

```bash
# Option A — open in browser
open index.html          # macOS
xdg-open index.html      # Linux

# Option B — local static server (recommended)
npx --yes serve .
# or: python3 -m http.server 8080
```

Then visit `http://localhost:3000` (serve) or `http://localhost:8080`.

## Deploy on Netlify

1. Push this folder to a GitHub repo (site root = repo root, or set Base directory to this folder if nested).
2. In Netlify: **Add new site → Import from Git**.
3. Build settings:
   - **Build command:** leave empty (static HTML)
   - **Publish directory:** `.` (see `netlify.toml`)
4. Deploy. Custom domain optional under Domain settings.

`netlify.toml` already sets `publish = "."`.

Inquiry form uses mailto intake (`abdulmoeed095@gmail.com`) with Monica-locked required fields. No backend build step required.

## Not included

Private planning docs (IA, blockers, inventory PDFs, etc.) stay outside this deploy root.
