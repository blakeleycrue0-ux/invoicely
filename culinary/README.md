# [YOUR BRAND NAME] — Cooking Companion PWA

The companion app to my cooking content: where viewers go to actually cook the
dishes I post and learn the **one pro technique** behind each one. Self-taught
dev energy, restaurant-cook ambitions.

> **Not** a generic recipe database. It's a creator's world — built mobile-first
> for someone standing in a kitchen with messy hands.

## ✨ Features

- **Home** — branded hero + an editorial feed of dish cards.
- **Dish detail** — embedded TikTok/YouTube video, a **servings scaler**, a
  tap-to-check ingredient list, full method, and a standout **Technique** note
  (the differentiator).
- **Cook Mode** — full-screen, one step at a time, huge text, built-in **timers**
  for timed steps, screen-stays-awake, fat thumb targets.
- **Save / favorites** + an **"I cooked this"** toggle that builds a streak.
- **About / Follow** — loops people back to the content with prominent socials.
- **Installable PWA** — add to home screen, works offline.

## 🧱 Stack

Vite + React + TypeScript + Tailwind CSS. 100% client-side. **Zero paid
services**: content is a typed local file, user data is `localStorage`.

## ✏️ Make it yours

Two files, no build knowledge required:

| What | Where |
| --- | --- |
| Brand name, handle, socials, tagline, about text | `src/lib/brand.ts` |
| Dishes (recipes, steps, timers, technique notes) | `src/data/dishes.ts` |

Each dish is a typed object — copy an existing one and edit. Add a `videoUrl`
(YouTube or TikTok link) and an optional `image` URL; if you omit the image, a
designed placeholder is shown automatically. Set `seconds` on a step to make
Cook Mode show a timer for it.

> The `[YOUR BRAND NAME]` / `[@yourhandle]` placeholders live in `brand.ts`,
> `index.html`, `public/manifest.webmanifest`, and `src/routes/About.tsx`.
> Search-and-replace those to brand the whole app.

## 🚀 Run locally

```bash
cd culinary
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## 🌐 Deploy to Netlify (GitHub → Netlify, zero config)

This app lives in the **`culinary/`** subfolder of the repo, so:

1. Push this repo to GitHub.
2. In Netlify → **Add new site → Import from Git**, pick the repo.
3. Set **Base directory** to `culinary`.
   - Build command (`npm run build`) and publish dir (`dist`) are already in
     `culinary/netlify.toml`, including the SPA redirect — Netlify picks them up.
4. Deploy. Every push to the branch auto-deploys.

## 🖼️ App icons

The icon ships as SVG (`public/icons/icon.svg` + `maskable.svg`), which modern
Chrome/Edge accept for install. If you want PNG icons for the widest device
support, export those SVGs to `192×192` and `512×512` PNGs and add them to the
`icons` array in `public/manifest.webmanifest`.

## 🔌 Later: swap in a backend (Supabase)

v1 is intentionally backend-free. Two clearly-commented **seams** make the
upgrade isolated:

- `src/data/dishes.ts` — move content into a `dishes` table; only this file's
  read functions change.
- `src/lib/storage.ts` — keep the public API (`toggleSaved`, `toggleCookedToday`,
  `useUserData`, …) and swap the `localStorage` internals for Supabase + auth.

The UI never touches storage or data directly, so nothing else needs to change.
