# homa

Portfolio of **Victory Homa Obuzor**: HR, corporate communications and brand strategy.

Built with Next.js (App Router, static export), Tailwind CSS and Framer Motion.

## How this repo is laid out

- `source/` is the Next.js project you edit.
- The repo root holds the **built site** (`index.html`, `_next/`, `assets/` and so on). GitHub Pages serves it straight from `main` / root at https://sylvesterofficail.github.io/homa/, so no Actions are needed.

## Edit and publish

```bash
cd source
npm install
npm run dev        # preview at http://localhost:3000
npm run publish    # build and copy the site to the repo root
cd ..
git add -A && git commit -m "Update site" && git push
```

## Where things live

| Path | What it is |
| --- | --- |
| `source/app/globals.css`, `source/tailwind.config.js` | Design tokens: colour, type scale, radius, motion easing |
| `source/app/site.css` | Nav, drawer, hero, tabs, archive rows, form fields |
| `source/components/` | One file per section, in page order (see `source/app/page.jsx`) |
| `source/components/motion.jsx` | Shared motion: reveals, staggers, masked word rises |
| `source/public/legacy/script.js` + `source/app/legacy.css` | Interactive layer: dossiers, CV reader, career vault, archive, budget calculator |
| `source/public/assets/` | Photos and CV PDFs |

Fonts (Bodoni Moda, Plus Jakarta Sans) and Font Awesome icons are bundled with the site, so nothing loads from a third-party CDN.

Developed by Acies Technology Africa.
