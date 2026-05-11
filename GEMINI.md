# Himalayan Vistas (Trekking Project)

## Project Overview
Himalayan Vistas is an elite trekking expedition platform built with a modern web stack. It features a public-facing website for discovering and inquiring about treks, as well as a protected admin dashboard for managing regions, treks, and inquiries.

### Core Technologies
- **Framework:** [Next.js 16.2.4](https://nextjs.org) (App Router)
- **UI Library:** [React 19](https://react.dev)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com) (using `@tailwindcss/postcss`)
- **Backend & Auth:** [Supabase](https://supabase.com) (PostgreSQL views, Auth, and SSR)
- **Language:** [TypeScript](https://www.typescriptlang.org)
- **Fonts:** Noto Serif (Serif), Be Vietnam Pro (Body)

### Architecture
- **`app/`**: Route handlers and page components using the Next.js App Router.
  - `/admin`: Protected management dashboard (requires authentication).
  - `/treks`: Public trek listings and slug-based detail pages.
  - `/destinations`: Region-specific information and landing pages.
- **`components/`**: Feature-organized UI components (e.g., `admin/`, `trek/`, `home/`).
- **`lib/supabase/`**: Centralized Supabase integration.
  - `queries/`: Server-side functions ("use server") for fetching data from Supabase views (`v_trek_listing`, `v_trek_detail`) and tables.
- **`middleware.ts`**: Handles session refreshing and protects `/admin` routes via Supabase Auth.

## Building and Running

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm run start
```

### Linting
```bash
npm run lint
```

## Development Conventions

### Data Fetching
- **Server Components:** Prefer fetching data directly in Server Components using functions from `lib/supabase/queries/`.
- **"use server":** All query functions in `lib/supabase/queries/` should be marked with `"use server"`.
- **Database Views:** Complex joins and aliases should be handled via Supabase views (e.g., `v_trek_listing`) to keep the application logic clean.

### Styling
- **Tailwind CSS 4:** Use utility classes for all styling.
- **Variables:** Use the custom font variables (`--font-serif`, `--font-body`) for typography consistency.
- **Design System:** Follow the stone/primary-container color palette established in `TopNavBar.tsx` and `globals.css`.

### Authentication
- Authentication is managed via Supabase SSR.
- Admin routes (`/admin/*`) are protected by `middleware.ts`.
- Role-based checks should be performed within the pages or layouts of the admin section.

### Next.js 16 Specifics
- This project uses Next.js 16. Always refer to the latest documentation in `node_modules/next/dist/docs/` as APIs may differ from earlier versions. (See `Agents.md` for more details).
