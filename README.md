# LinkForge OSS

A modern, self-hostable, open-source Linktree alternative. Build beautiful link-in-bio pages with a powerful block-based editor — no vendor lock-in, no ads, no tracking.

[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL%203.0-blue.svg)](https://opensource.org/licenses/AGPL-3.0)
[![Next.js](https://img.shields.io/badge/Next.js%2016-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-black?logo=supabase)](https://supabase.com)

## Features

- **Block-Based Editor**: 8 block types — Header, Button, Text, Image, Divider, Social Links, Gallery, Video
- **6 Themes**: Minimal, Dark, Light, Nature, Ocean, Sunset — powered by CSS custom property design tokens
- **Live Preview**: See changes instantly as you build
- **Analytics**: Track page views and button clicks — no cookies, no fingerprinting, no third-party scripts
- **Custom Domains**: Bring your own domain with DNS TXT verification
- **Self-Hosted**: Full Docker compose stack — Postgres, PostgREST REST API, Kong gateway
- **No Signup Required**: Open the dashboard and start building immediately
- **Mobile-First**: Responsive on all devices

## Quick Start

```bash
git clone https://github.com/linkforge/linkforge.git
cd linkforge
pnpm install
cp .env.example .env.local
docker compose up -d
pnpm dev
```

Visit `http://localhost:3000` and start building.

## Local Development

### Prerequisites

- Node.js 20+
- pnpm 9+
- Docker Compose v2+

### Step-by-step

1. **Clone and install**:
   ```bash
   git clone https://github.com/linkforge/linkforge.git
   cd linkforge
   pnpm install
   ```

2. **Start the local Supabase stack**:
   ```bash
   docker compose up -d
   ```
   This starts Postgres, PostgREST (REST API), and Kong (API gateway) on `localhost:8000`.

3. **Configure environment**:
   ```bash
   cp .env.example .env.local
   ```

4. **Run migrations** (first time only):
   Migrations in `supabase/migrations/` are auto-applied on container startup via `docker-entrypoint-initdb.d`. If you need to re-apply:
   ```bash
   docker compose exec -T db psql -U postgres -d postgres < supabase/migrations/00001_initial_schema.sql
   docker compose exec -T db psql -U postgres -d postgres < supabase/migrations/00002_social_links.sql
   docker compose exec -T db psql -U postgres -d postgres < supabase/migrations/00003_custom_domains.sql
   docker compose exec -T db psql -U postgres -d postgres < supabase/migrations/00004_remove_auth.sql
   ```

5. **Start the dev server**:
   ```bash
   pnpm dev
   ```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase API URL | `http://localhost:8000` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | built-in demo key |
| `NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | built-in demo key |
| `SITE_TITLE` | Site name in meta tags | LinkForge |
| `SITE_DESCRIPTION` | Site description in meta tags | A modern... |
| `SITE_DOMAIN` | Canonical domain | localhost:3000 |
| `MAX_PAGES` | Max pages per user | 50 |
| `MAX_BLOCKS_PER_PAGE` | Max blocks per page | 20 |
| `MAX_FILE_SIZE` | Max upload size in MB | 10 |
| `MAX_SOCIAL_LINKS` | Max social links per page | 10 |

## Database Schema

```
profiles       → User profile (display name, bio, avatar)
pages          → Link-in-bio pages (title, slug, theme, published, social_links)
blocks         → Block content stored as JSON (header, button, text, image, etc.)
assets         → Uploaded media files (images, videos)
page_views     → Page view analytics (referrer, user agent)
click_events   → Button click analytics (block type, referrer)
custom_domains → Custom domain mapping with DNS verification status
```

The public page view tracking uses fire-and-forget inserts — no auth required.

## Architecture

```
src/
  app/              # Next.js App Router pages and API routes
  components/
    blocks/         # Block renderer (public) and editor (builder)
    builder/        # Builder UI components
    dashboard/      # Sidebar, page list, row actions
    ui/             # shadcn/ui primitives
  lib/
    constants/      # Block types, themes, feature flags, limits
    tokens/         # CSS custom property design tokens per theme
    db.ts           # Supabase client factory
    theme/          # Theme registry (6 themes)
    utils.ts        # cn(), formatDate(), formatNumber(), etc.
  services/         # Business logic: pages, blocks, assets, analytics, domains, profiles
  types/            # TypeScript types
supabase/
  migrations/       # SQL migrations (00001-00004)
  kong.yml          # Kong API gateway declarative config
docker-compose.yml  # Local Supabase stack
```

## Scripts

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm lint         # Lint with ESLint
pnpm typecheck    # TypeScript check (zero errors)
pnpm format       # Format with Prettier
pnpm test         # Run unit tests (Vitest)
pnpm test:e2e     # Run E2E tests (Playwright)
```

## Deployment

### Docker (recommended)

Build and run with Docker:

```bash
docker build -t linkforge .
docker run -p 3000:3000 --env-file .env linkforge
```

### Manual

```bash
pnpm build
pnpm start
```

Point a reverse proxy (nginx, Caddy) at port 3000. Ensure all env vars point to a production Supabase instance.

## License

AGPL-3.0
