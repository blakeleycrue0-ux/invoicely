# [BRAND] — Cinematic Shopify Intro

A full-screen, premium landing intro for a smart LED water-bottle store.

- **`intro.liquid`** — the real-time **Three.js + GLSL** version (no media assets to host).
- **`intro-webm.liquid`** — a drop-in version that plays a **pre-rendered photoreal WebM**
  and uses the same transition / skip / once-per-session / reduced-motion logic. Use this
  if you later have a photoreal clip rendered (the most "Apple keynote" route).

Both are fully self-contained and scoped under `#wb-intro` / `wb-` so they cannot clash
with your theme's CSS or JS.

---

## What it does (≈4.6s, slow & confident)

1. **Fade in on black** → a sleek matte dark-stainless 3D bottle under soft studio light
   with real environment reflections; the **LED cap display powers on** with a cool blue glow
   and ramps up a temperature readout.
2. **Refractive water rises and fills the scene** — animated surface line, caustics, depth tint.
3. **The brand name coalesces out of the water** — a noise-dissolve "surface-tension" reveal
   with bright wet edges, while droplets condense toward the center.
4. **Camera dollies through** and the whole overlay cross-fades into your live homepage.

Behaviour built in:
- **Skippable** (subtle pill button, bottom-right).
- **Plays once per session** via `sessionStorage` (clear it / use a private window to re-test).
- **Respects `prefers-reduced-motion`** → the overlay never shows; visitor lands straight on the store.
- **Lazy-loads Three.js** only when it will actually play; capped pixel ratio + reduced particle
  count on mobile; auto-disposes GPU resources when done.
- **Fail-safe**: if WebGL or the CDN import fails, it removes itself and shows the store.

---

## 1) Set your brand name

Open `intro.liquid` and edit the one attribute near the top:

```html
<div id="wb-intro" data-brand="[BRAND]" data-duration="4600" ...>
```

Change `data-brand="[BRAND]"` to e.g. `data-brand="AURACORE"`.
`data-duration` is total runtime in milliseconds (4600 = 4.6s).

---

## 2) Where to paste it in Shopify

You have two equally valid placements. **Option A** is the easiest and is recommended.

### Option A — Custom Liquid section on the homepage (recommended, no code editor)
1. Shopify admin → **Online Store → Themes → Customize**.
2. Make sure you're editing the **Home page** template.
3. In the left panel, **Add section → Custom Liquid** (it can sit anywhere; the overlay is
   `position:fixed` and covers the viewport regardless of where the section lives).
4. Paste the **entire contents of `intro.liquid`** into the Custom Liquid box.
5. **Save**. Open your store in a fresh/private window to see it play once.

> This makes it play only on the homepage. That's the usual choice for a landing intro.

### Option B — `theme.liquid` (plays on every page's first visit of the session)
1. Shopify admin → **Online Store → Themes → ⋯ → Edit code**.
2. Open **`layout/theme.liquid`**.
3. Paste the entire contents of `intro.liquid` **immediately after the opening `<body>` tag**.
4. **Save**.

> Because of the `sessionStorage` gate it still plays only once per visit, but Option B can
> fire on any entry page, not just `/`. Prefer **Option A** for a true "landing" intro.

---

## 3) Assets you must host

**`intro.liquid` (real-time version): none.** It generates the bottle, water, LED and text
procedurally, and loads Three.js from the jsDelivr CDN at runtime:

- `three@0.160.0/build/three.module.js`
- `three@0.160.0/examples/jsm/environments/RoomEnvironment.js`

If your theme has a strict **Content-Security-Policy**, allow `https://cdn.jsdelivr.net`
(or self-host those two files in **Settings → Files** / your theme assets and swap the two
URLs near the bottom of the script).

---

## 4) Optional: photoreal WebM route (`intro-webm.liquid`)

If you commission/render a true photoreal clip (e.g. in Blender/Cinema 4D/Houdini):

1. Export **two** files for broad support:
   - `intro.webm` (VP9, transparent or black background) — primary, smallest.
   - `intro.mp4` (H.264) — Safari/iOS fallback.
   Aim for ~1080p, ~4.6s, **under ~3–4 MB** each; design the last 0.5s as a push-to-white
   or push-through so the cross-fade into the store feels seamless.
2. Upload both in **Settings → Files** and copy their CDN URLs.
3. Open `intro-webm.liquid`, set `data-webm` and `data-mp4` to those URLs (and `data-poster`
   to a first-frame JPG for instant paint).
4. Paste it the same way as Option A above (instead of `intro.liquid`).

---

## Tuning cheatsheet (in `intro.liquid`)

- **Speed / timing:** `data-duration` (ms) and the `P = { fadeIn, water, brand, through }`
  phase fractions in the timeline.
- **Bottle color/finish:** the `steel` / `steelDark` `MeshStandardMaterial` (`color`,
  `metalness`, `roughness`).
- **Water color:** `waterUniforms.uColor` (deep) and `uTint` (highlight).
- **LED color/temp:** `drawLED()` (`#bfe6ff` text, `#3aa0ff` glow) and the `temp` ramp.
- **Brand font/weight/letter-spacing:** the `brandCanvas` drawing block.
