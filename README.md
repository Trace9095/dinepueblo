# DinePueblo.com

Pueblo, Colorado's premier dining directory. Discover Pueblo Sloppers, authentic Mexican food, craft breweries, Italian restaurants, and the best dining along the Arkansas River Riverwalk.

**Live:** [dinepueblo.com](https://dinepueblo.com) · **Vercel:** `dinepueblo`

---

## Stack

- **Framework:** Next.js 16.1.6 App Router (Turbopack)
- **Database:** Neon PostgreSQL + Drizzle ORM
- **Payments:** Stripe ($99/mo minimum listings)
- **Monorepo:** Turborepo (npm workspaces)
- **Deployment:** Vercel (rootDirectory: `apps/web`)

## Quick Start

```bash
npm install
npm run dev:web          # Next.js dev server

# Database
cd apps/web
npx drizzle-kit push     # push schema
npx tsx src/db/seed.ts   # seed data
```

## Structure

```
apps/web/   — Next.js 16 (Vercel root dir)
apps/mobile/ — Expo (scaffold)
packages/shared/ — @dine/shared
```

## CEO Rules

- $99/mo minimum for listings — NO free tier
- No emojis — Lucide icons only
- No Epic AI branding visitor-facing
- Real photos only — no stock photos
- Every business verified real and OPEN before listing
