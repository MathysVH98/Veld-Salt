# Veld & Salt

Premium South African biltong brand site. Air-dried, hand-cut, single-farm sourced from the **Waterberg region of Limpopo**.

Built as an immersive, scroll-driven brand experience with a 3D hero, parallax storytelling, paginated shop, and WhatsApp-first ordering.

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS** with a custom biltong-inspired design system
- **React Three Fiber + drei** for the 3D hero (drifting spice particles + a distorted cured slab)
- **Framer Motion** for reveals, page motion and parallax
- **Lenis + GSAP** for buttery smooth scrolling
- **lucide-react** icons

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Project structure

```
src/
  app/
    page.tsx        Home (hero, story, process, products, reviews, CTA)
    shop/           Full range with category filter + pagination
    story/          Heritage / brand story
    contact/        WhatsApp order builder + details
    layout.tsx      Fonts, smooth scroll, nav, footer
  components/
    three/HeroScene.tsx   R3F 3D hero
    ...                   Nav, Hero, parallax sections, product cards, etc.
  lib/
    products.ts     Product catalogue + helpers
    utils.ts        Brand config, WhatsApp link helper
```

## Before going live (placeholders to replace)

All in `src/lib/utils.ts`:

- `BRAND.whatsapp` set to the real WhatsApp business number (format: country code + number, no `+`, e.g. `2782...`)
- `BRAND.email` set to the real orders inbox
- `BRAND.phone` set to the real phone number

Product imagery is currently rendered procedurally (`ProductVisual.tsx`) so the site looks designed with zero external assets. Swap in real photography per product when available.

## Design tokens

| Token | Hex | Use |
| --- | --- | --- |
| Espresso | `#15110E` | Backgrounds |
| Oxblood | `#5C1A16` | Cured-meat primary |
| Ember | `#B5402A` | Accents / CTAs |
| Coriander | `#D6A24A` | Highlights / 3D spice |
| Bone | `#F2E9D8` | Text on dark |
| Sage | `#8A9079` | Subtle support |
