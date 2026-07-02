# OpenSite Website

Next.js website built from the Google Stitch design export for OpenSite Digital Agency.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home |
| `/services/` | Services (bento grid) |
| `/case-studies/` | Case studies portfolio |
| `/case-studies/nexus-pay/` | Case study detail |
| `/about/` | About / mission |
| `/contact/` | Contact form |
| `/insights/` | Blog / insights hub |

## Tech stack

- **Next.js 15** (App Router)
- **React 19**
- **Tailwind CSS 4**
- **Framer Motion** — page transitions, scroll reveals, stagger animations
- **Static export** — ready for Hostinger / any static hosting

## Requirements

- Node.js 18.18+ (recommended: 20 LTS)
- npm

## Run locally

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### If `npm install` fails with SSL / certificate errors (Windows)

Your network may block npm’s default certificate chain. Run:

```powershell
$env:NODE_OPTIONS="--use-system-ca"
npm install
```

Then use the same variable when running `npm run dev` or `npm run build` if needed.

## Build for production

```bash
cd web
npm install
npm run build
```

This creates a static site in `web/out/` — upload that folder to Hostinger.

## Deploy to GitHub

```bash
cd web
git init
git add .
git commit -m "Initial OpenSite website from Stitch design"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/opensite-website.git
git push -u origin main
```

## Deploy to Hostinger

### Option A — Static upload (recommended)

1. Run `npm run build` locally
2. In Hostinger hPanel → **Websites** → your domain → **File Manager**
3. Open `public_html` and delete default files (keep a backup first)
4. Upload **all contents** of the `out/` folder into `public_html`
5. Visit your domain — the site should load

### Option B — Git + Node.js hosting (if your plan supports it)

1. Push the repo to GitHub
2. In Hostinger, create a **Node.js** app connected to your repo
3. Set:
   - **Build command:** `npm run build`
   - **Output / start:** serve the `out` folder, or use `npx serve out`
4. Deploy

For most Hostinger shared plans, **Option A** is simplest and fastest.

## Project structure

```
web/
├── src/
│   ├── app/              # Next.js routes
│   ├── components/
│   │   ├── motion/       # Framer Motion wrappers
│   │   └── pages/        # Page content (from Stitch HTML)
│   ├── Header.tsx
│   └── Footer.tsx
├── public/
└── out/                  # Generated after npm run build
```

## Design source

Original Stitch export is in `../stitch_opensite_saas_website_redesign/`.

## Customization

- **Contact email/phone:** edit `ContactPage.tsx` and `HomePage.tsx`
- **Colors & fonts:** edit `src/app/globals.css` (`@theme` block)
- **Navigation:** edit `src/components/Header.tsx`

## Notes

- Images load from Google CDN (Stitch export URLs). Replace with local assets in `public/` for production if needed.
- Contact form is front-end only — connect to Formspree, Resend, or your API when ready.
