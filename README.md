# homa

Portfolio of **Victory Homa Obuzor**: HR, corporate communications and brand strategy.

Built with Next.js (App Router, static export), Tailwind CSS and Framer Motion.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Publish

Every push to `main` builds the site and publishes it to GitHub Pages
(`.github/workflows/pages.yml`). One-time setup: **Settings → Pages → Source: GitHub Actions**.
The site is then live at `https://<user>.github.io/homa/`.

To build by hand: `npm run build` writes a static site to `out/`.

## Where things live

| Path | What it is |
| --- | --- |
| `app/globals.css`, `tailwind.config.js` | Design tokens: colour, type scale, radius, motion easing |
| `app/site.css` | Nav, drawer, hero, tabs, archive rows, form fields |
| `components/` | One file per section, in page order (see `app/page.jsx`) |
| `components/motion.jsx` | Shared motion: reveals, staggers, masked word rises |
| `public/legacy/script.js` + `app/legacy.css` | Interactive layer: dossiers, CV reader, career vault, archive, budget calculator |
| `public/assets/` | Photos and CV PDFs |

Fonts (Bodoni Moda, Plus Jakarta Sans) and Font Awesome icons are bundled with the site, so nothing loads from a third-party CDN.

Developed by Acies Technology Africa.
