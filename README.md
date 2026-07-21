# LinkForge — Open source link-in-bio page builder

> A modern, self-hosted Linktree alternative. Build beautiful link-in-bio pages with a block editor — no ads, no tracking, no vendor lock-in.

[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL%203.0-blue.svg)](https://opensource.org/licenses/AGPL-3.0)
[![Next.js](https://img.shields.io/badge/Next.js%2016-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-black?logo=supabase)](https://supabase.com)
[![Docker](https://img.shields.io/badge/Docker-compose-2496ED?logo=docker)](https://docker.com)
![GitHub stars](https://img.shields.io/github/stars/mangodxd/linkforge?style=social)

**Keywords:** link-in-bio, linktree alternative, self-hosted, open source, page builder, bio link, social links, next.js, supabase, docker

---

## Why LinkForge?

| | LinkForge | Linktree | Bio.link | Campsite |
|---|---|---|---|---|
| Self-hosted | ✅ | ❌ | ❌ | ❌ |
| Open source | ✅ AGPL-3.0 | ❌ | ❌ | ❌ |
| Your data | ✅ Full control | ❌ Third-party | ❌ Third-party | ❌ Third-party |
| No ads | ✅ | ❌ | ❌ | ❌ |
| Custom domains | ✅ | ✅ Paid | ❌ | ❌ |
| Analytics | ✅ Built-in | ✅ Paid | ❌ | ❌ |
| Pricing | $0 | Free tier + paid | Free tier + paid | Paid |

---

## Features

- **Block editor** — 8 block types: Header, Button, Text, Image, Divider, Social Links, Gallery, Video
- **6 themes** — Minimal, Dark, Light, Nature, Ocean, Sunset. CSS custom property tokens
- **Live preview** — See changes instantly as you build
- **Analytics** — Page views, button clicks, referrers. No cookies, no third-party scripts
- **Custom domains** — Bring your own domain with DNS TXT verification
- **No signup required** — Open the dashboard and start building immediately
- **Mobile-first** — Responsive on every device

---

## Quick start

```bash
git clone https://github.com/mangodxd/linkforge.git
cd linkforge
pnpm install
cp .env.example .env.local
docker compose up -d
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Tech stack

| Layer | Stack |
|-------|-------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| UI | Tailwind CSS v4, Framer Motion, shadcn/ui |
| Database | PostgreSQL 15 |
| API | PostgREST, Kong gateway |
| Fonts | Fira Code + Fira Sans, Poppins + Open Sans |

---

## Local development

### Prerequisites

- Node.js 20+
- pnpm 9+
- Docker Compose v2+

### Step-by-step

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Start backend**
   ```bash
   docker compose up -d
   ```
   Starts Postgres, PostgREST, and Kong on `localhost:8000`.

3. **Configure env**
   ```bash
   cp .env.example .env.local
   ```

4. **Run migrations**
   ```bash
   docker compose exec -T db psql -U postgres -d postgres < supabase/migrations/00001_initial_schema.sql
   docker compose exec -T db psql -U postgres -d postgres < supabase/migrations/00002_social_links.sql
   docker compose exec -T db psql -U postgres -d postgres < supabase/migrations/00003_custom_domains.sql
   docker compose exec -T db psql -U postgres -d postgres < supabase/migrations/00004_remove_auth.sql
   ```

5. **Start dev server**
   ```bash
   pnpm dev
   ```

### Environment variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase API URL | `http://localhost:8000` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | built-in demo key |
| `NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | built-in demo key |
| `SITE_TITLE` | Site name in meta tags | LinkForge |
| `SITE_DOMAIN` | Canonical domain | localhost:3000 |

---

## Project structure

```
src/
  app/              # Next.js App Router pages + API routes
  components/
    blocks/         # Public block renderer + builder editor
    dashboard/      # Sidebar, page list, dashboard overview
    landing/        # Marketing page sections
    ui/             # shadcn/ui primitives
  lib/
    constants/      # Block types, themes, limits
    db.ts           # Supabase client
    theme/          # 6 theme definitions with CSS tokens
    utils.ts        # cn(), formatDate(), formatNumber()
  services/         # Business logic layer
supabase/
  migrations/       # 00001–00004
  kong.yml          # Kong API gateway config
docker-compose.yml  # DB + REST API + gateway
```

---

## Scripts

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm lint         # ESLint
pnpm typecheck    # TypeScript (zero errors)
pnpm format       # Prettier
pnpm test         # Vitest
pnpm test:e2e     # Playwright
```

---

## Deployment

### Docker

```bash
docker build -t linkforge .
docker run -p 3000:3000 --env-file .env linkforge
```

### Manual

```bash
pnpm build
pnpm start
```

Point a reverse proxy (nginx, Caddy) at port 3000.

---

## License

AGPL-3.0
