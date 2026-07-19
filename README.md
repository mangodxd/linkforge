# LinkForge OSS

A modern, self-hostable, open-source Linktree alternative. Build beautiful link-in-bio pages with a powerful block-based editor — no vendor lock-in, no ads, no tracking.

[![CI](https://github.com/linkforge/linkforge/actions/workflows/ci.yml/badge.svg)](https://github.com/linkforge/linkforge/actions/workflows/ci.yml)
[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL%203.0-blue.svg)](https://opensource.org/licenses/AGPL-3.0)
[![Next.js](https://img.shields.io/badge/Next.js%2015-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-black?logo=supabase)](https://supabase.com)

## Features

- **8 Block Types**: Header, Buttons, Text, Images, Gallery, Video, Dividers, Social Links
- **6 Themes**: Minimal, Dark, Light, Nature, Ocean, Sunset (all powered by design tokens)
- **Analytics**: Track page views and button clicks — no cookies, no fingerprinting
- **Self-Hosted**: Run on your own infrastructure with Docker
- **OAuth & Email Auth**: Google, GitHub, Magic Links, or email/password
- **Mobile-First**: Responsive design that works on all devices

## Quick Start

```bash
git clone https://github.com/linkforge/linkforge.git
cd linkforge
pnpm install
pnpm dev
```

Visit `http://localhost:3000` to get started.

## Setup

### Prerequisites

- Node.js 18+
- pnpm 9+
- Docker (for local Supabase)

### Local Development

1. Clone and install dependencies:
   ```bash
   git clone https://github.com/linkforge/linkforge.git
   cd linkforge
   pnpm install
   ```

2. Set up Supabase locally:
   ```bash
   supabase init
   supabase start
   ```

3. Create `.env.local` from `.env.example`:
   ```bash
   cp .env.example .env.local
   ```

4. Run the development server:
   ```bash
   pnpm dev
   ```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |

## Database Schema

```
profiles   → User profile data
pages      → Link-in-bio pages
blocks     → Page content (JSON)
assets     → Uploaded media
page_views → Page view tracking
click_events → Button click tracking
```

All tables use Row Level Security (RLS) for secure multi-tenant access.

## Architecture

```
src/
  app/          # Next.js App Router
  components/   # React components
    blocks/     # Block renderer + editor
    builder/    # Builder UI
    dashboard/  # Dashboard layout
    ui/         # shadcn/ui primitives
  lib/
    constants/  # Block types, themes, limits
    supabase/   # Supabase client helpers
    tokens/     # Design tokens
    validations/ # Zod schemas
  services/     # Business logic layer
  repositories/ # Data access layer
  types/        # TypeScript types
supabase/
  migrations/   # SQL migrations
```

## Development Scripts

```bash
pnpm dev        # Start dev server
pnpm build      # Production build
pnpm lint       # Lint code
pnpm typecheck  # TypeScript check
pnpm test       # Run tests
pnpm format     # Format with Prettier
```

## Contributing

PRs welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

AGPL-3.0