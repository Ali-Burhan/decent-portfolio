# Changelog

## [Unreleased] - 2025-12-07

### Added

- **Theme System**: Implemented light/dark mode using `next-themes`.
- **Theme Toggle**: Added a responsive sun/moon toggle component using `lucide-react` icons.
- **Accent Colors**: Defined custom CSS variables for "The Visionary", "The Depth Seeker", and "The Subtle Luxe" palettes in `globals.css`.
- **Typography**: Integrated `Inter` font and removed `Geist`.
- **Typography Scale**: Implemented a refined sizing scale (Hero: 60px, H2: 36px, etc.) and weight system.
- **Demo Page**: Updated `app/page.tsx` to demonstrate the new color system and typography.

### Changed

- **Layout**: Wrapped the application in `ThemeProvider` and added the `ThemeToggle` to the top-right corner.
- **Tailwind Config**: Extended the theme with new color utilities (`visionary`, `depth-seeker`, `subtle-luxe`) and font settings.
