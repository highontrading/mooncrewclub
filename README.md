# Mooncrew Club website

The website for **Mooncrew Club**: a private crew trip to Hilltop Festival, Weekend 2 (4–8 Feb 2027, Vagator, Goa).
It is a plain static site with no framework and no npm dependencies, built the same way as the Attention Labs site.

## Run locally

```bash
npm run dev        # builds into ./dist and serves it on http://localhost:4321
```

## Edit content

All copy lives in **`src/data.mjs`**: contacts, trip facts, itinerary, what's included, price, FAQs and the gallery. After you edit it, run `npm run build` (Netlify does this on every push).

| What | Where |
| --- | --- |
| Phone numbers, WhatsApp, Instagram | `site` in `src/data.mjs` |
| Page templates | `build.mjs` |
| Design system / styles | `assets/css/style.css` (tokens at the top) |
| Animations & interactions | `assets/js/main.js` |
| Photos and videos | `assets/img/` (WebP), `assets/video/` |

**Before going live:**
1. Check Vinita's number in `src/data.mjs` (it currently has 9 digits).
2. Add the Instagram handle (`instagram: 'yourhandle'`) to show the Instagram buttons.

## Pages

- `/`: home
- `/hilltop/`: the full trip: festival, day-by-day plan, inclusions, price, FAQ
- `/gallery/`: photos with filters and a lightbox
- `/apply/`: call or WhatsApp the hosts, or apply through a form that opens WhatsApp with the application filled in
- `404.html`

## Motion

Preloader, curtain page transitions, Lenis smooth scroll, split-text reveals, clip-path image reveals, scroll-filled text, count-up stats, full-screen menu with image previews, custom cursor and magnetic buttons, hover-reveal images on the itinerary, photo and word marquees, accordion, lightbox. Everything respects `prefers-reduced-motion`.

## Deploy on Netlify

`netlify.toml` is included: build command `node build.mjs`, publish directory `dist`. Connect the repo once and every push to `main` updates the live site.
