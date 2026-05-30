# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Build for production
npm run start    # Run production build
npm run lint     # Run ESLint
```

## Architecture

This is a Next.js 16 portfolio site using the App Router with React 19, TypeScript, and Tailwind CSS v4.

### Key Directories

- `app/` - Next.js App Router pages (home, about, experience, projects, contact, now)
- `components/` - React components with Framer Motion animations
- `components/os/` - Desktop OS-style UI components (windows, taskbar, icons)
- `lib/` - Utilities (`cn()` for class merging, `throttle()`) and i18n provider
- `data/portfolio.json` - Centralized portfolio content (experience, skills, projects)

### Theming System

The app uses a dynamic accent color system with 15 color options:

1. Colors are defined as CSS custom properties in `app/globals.css`
2. Active accent is set via `data-accent` attribute on `<body>` (e.g., `data-accent="ocean-breeze"`)
3. Tailwind integration via `@theme inline` directive exposes colors like `bg-accent`, `text-accent`
4. Theme persists in localStorage under `"accent"` key

To add a new accent color:
- Add the CSS variable in `:root` and `.dark` sections
- Add the `[data-accent="name"]` selector
- Add to `@theme inline` block
- Update the `accents` array in `components/nav.tsx`

### Internationalization

i18n is implemented via React Context in `lib/i18n.tsx`:
- Supported locales: `en`, `es`, `fr`
- All translations are in the `messages` object
- Use `useI18n()` hook to access `t()` function and `setLocale()`
- Persisted in localStorage under `"locale"` key

### Contact Form

The contact form at `app/api/contact/route.ts` uses Resend for email delivery. Requires:
- `RESEND_API_KEY` environment variable
- `CONTACT_EMAIL` environment variable (optional, defaults to aliburhan.dev.ai@gmail.com)

### Path Aliases

TypeScript paths configured with `@/*` mapping to project root (e.g., `@/components/nav`).
