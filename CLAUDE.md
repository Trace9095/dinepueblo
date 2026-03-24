# DinePueblo.com — Pueblo, CO Dining Guide

> AGENTS: Read this file BEFORE touching any code. Check git log. Do NOT redo completed work.
> Last updated: 2026-03-24 (Session 133)
> **MONOREPO:** Web is at `apps/web/`, mobile at `apps/mobile/` (scaffold). Vercel rootDirectory = `apps/web`.

## Project Overview

DinePueblo.com is a Colorado tourism directory site focused on dining in Pueblo, CO — Pueblo Sloppers, authentic Mexican food, craft breweries, Italian restaurants, and the Arkansas River Riverwalk dining scene. Part of the Wave 8 directory site build sprint (S129).

- **Location in APPS:** `~/Documents/APPS/_new-projects/dinepueblo/`
- **GitHub:** https://github.com/Trace9095/dinepueblo
- **Branch:** main
- **Production URL:** dinepueblo.com
- **Vercel Slug:** `dinepueblo`
- **Version:** 0.1.0
- **Admin:** CEO@epicai.ai / Trace87223!

## Current Status

- **Build:** ✅ READY
- **Deployment:** On Vercel, rootDirectory = `apps/web`
- **Neon DB:** Connected via Vercel Storage integration
- **Drizzle schema:** Pushed
- **GA4:** Wired (gtag.js in head)
- **Google Search Console:** Verification meta tag configured
- **Vercel Analytics + Speed Insights:** Wired in layout.tsx
- **DNS:** dinepueblo.com — A: 76.76.21.21, CNAME www: cname.vercel-dns.com (configured S129)
- **Last commit:** `f351c35` — fix: correct pricing from $99/year to $99/mo across all pages

## Monorepo Structure

```
dinepueblo/
├── apps/
│   ├── web/           ← Next.js 16.1.6 (Vercel root directory)
│   │   ├── src/app/   ← App Router pages
│   │   └── drizzle.config.ts
│   └── mobile/        ← Expo (scaffold only)
├── packages/
│   └── shared/        ← Shared types
├── turbo.json
└── package.json
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.1.6 (App Router, Turbopack) |
| Language | TypeScript strict |
| Styling | Tailwind CSS v4 |
| Database | Neon PostgreSQL + Drizzle ORM |
| Auth | JWT (jose) + bcryptjs |
| Payments | Stripe ($99/mo minimum listings) |
| Email | Resend |
| Fonts | Geist (via geist package) |
| Icons | Lucide React |
| Analytics | GA4 + Vercel Analytics + Speed Insights |

## Root Directory & Build Command

```bash
# Monorepo: web app is at apps/web/
# Vercel rootDirectory = apps/web
# Build command (via turbo):
npx next build
# Dev:
npm run dev:web  (or: npm run dev)
# DB migrations:
cd apps/web && npx drizzle-kit push
# DB seed:
cd apps/web && npx tsx src/db/seed.ts
```

## Key Routes

| Route | Purpose |
|-------|---------|
| `/` | Landing — hero + featured restaurants + categories |
| `/(website)/restaurants` | Restaurants directory listing |
| `/(website)/categories` | Browse by category |
| `/(website)/blog` | Blog / content |
| `/(website)/pricing` | Business listing pricing ($99/mo minimum) |
| `/(website)/request-listing` | Business listing request form |
| `/(website)/claim` | Claim a listing |
| `/(website)/manage` | Business management |
| `/admin` | Admin dashboard |
| `/api/` | API routes |
| `/sitemap.ts` | Dynamic sitemap |
| `/robots.ts` | Robots config |

## Brand Identity

- **Theme:** Dark #0D1117 background, Southwestern color scheme (gold fork favicon)
- **Font:** Geist Sans + Geist Mono
- **Icons:** Lucide React (no emojis)
- **Style:** Dining directory — warm, Southwestern/New Mexican inspired

## CEO Rules for This Project (Wave 8 Directives)

1. **$99/mo minimum** for business listings — NO free tier ever
2. Sister businesses appear as ACTUAL directory entries (not just banners)
3. Every business verified as real and OPEN before listing
4. Every external URL tested before deploy
5. Real photos from real businesses only — no stock photos
6. Southwestern color scheme — must look independent from other directory sites
7. **The Edge Zip is NOT listed** on any directory site (permanent exclusion)
8. GA4 + Google Ads conversion tracking wired
9. Separate Neon DB (no sharing between sites)
10. No emojis anywhere — use Lucide icons
11. De-branding: Must NOT show "Epic AI" to visitors
12. Fritz Restaurant Salida is CLOSED — never list it (not applicable here, but rule stands)

## Recent Commits

```
f351c35 fix: correct pricing from $99/year to $99/mo across all pages
dde2198 chore: eas.json config
00fc69f fix: add gtag.js to head for GSC verification
58a6983 chore: trigger redeploy for GA4 activation
fcaf0b3 feat: add Google Search Console verification meta tag
ac7f2d5 feat: wire GA4 tracking + Google Search Console verification slot
115e118 feat: add icon.tsx and apple-icon.tsx favicons (gold fork, southwestern)
03c671f chore: add web .gitignore
```

## Completed Work (DO NOT REDO)

- ✅ Full directory site built (restaurants, categories, pricing, blog)
- ✅ Neon DB connected, Drizzle schema pushed
- ✅ GA4 + Vercel Analytics + Speed Insights wired
- ✅ Google Search Console verification meta tag
- ✅ Pricing corrected to $99/mo minimum (fixed from $99/year)
- ✅ Favicons wired (gold fork, southwestern theme)
- ✅ DNS configured (dinepueblo.com → Vercel)
- ✅ EAS config added

## Known Issues / TODO

1. Replace stock photo placeholders with gradient fallbacks + "Claim this listing" CTA
2. Final visual QA sweep — every page, every button, every link
3. Google Ads conversion tracking (GA4 is wired, but Ads tag may need verification)
4. Submit sitemap to Google Search Console (Trace must verify domain ownership first)

## Environment Variables

```
DATABASE_URL=                # Neon PostgreSQL (via Vercel Storage integration)
NEXT_PUBLIC_APP_URL=         # https://dinepueblo.com
NEXT_PUBLIC_GA_ID=           # GA4 Measurement ID
STRIPE_SECRET_KEY=           # Stripe secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=  # Stripe publishable
JWT_SECRET=                  # Auth JWT secret
RESEND_API_KEY=              # Resend for emails
```

## GitHub & Remote

- **Repo:** https://github.com/Trace9095/dinepueblo
- **Branch:** main (auto-deploy to Vercel)
