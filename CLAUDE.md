# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is an Astro-based personal portfolio website for Tirth Shroff, deployed to GitHub Pages via GitHub Actions and served from the custom domain `tirthshroff.com`. It's a single page (`/`) presented as a fake retro-futurist operating system ("TIRTH.OS"): a status bar, a dock that swaps between seven full-screen "screens", a companion widget, and a boot overlay. There is no client-side framework runtime — Astro ships static HTML/CSS plus one TypeScript entry point (`src/scripts/os.ts`) that drives every interaction.

## Development

- `npm install` — install dependencies. Runtime: `astro` plus two self-hosted font packages (`@fontsource-variable/space-grotesk`, `@fontsource-variable/jetbrains-mono`). Dev-only: `typescript`, `@astrojs/check`, `@types/node`, `@playwright/mcp`.
- `npm run dev` — start the local dev server.
- `npm run build` — produce the production build in `dist/`.
- `npm run preview` — serve the production build locally to sanity-check before pushing.

Node `>=22.12.0` is required (`engines` in `package.json`).

Pushing to `master` triggers `.github/workflows/deploy.yml`, which builds via `withastro/action@v3` and deploys with `actions/deploy-pages@v4` (Actions-based deploy, not the legacy branch-based build).

## Architecture

- `src/pages/index.astro` — composes the OS shell: `StatusBar`, `DockNav`, the seven screens from `src/components/os/screens/` (`Home`, `About`, `Skills`, `Projects`, `Work`, `Education`, `Contact`), then `CompanionWidget`, `GlitchOverlay`, and `BootOverlay` — all wrapped in `src/layouts/BaseLayout.astro`.
- `src/layouts/BaseLayout.astro` — handles `<head>` (meta description, Open Graph/Twitter tags, favicon, apple-touch-icon) and imports `global.css` plus the two font packages. Fonts are **self-hosted through npm**; there are no Google Fonts or Font Awesome CDN links, and no Bootstrap, jQuery, or Popper.
- `src/scripts/os.ts` — all client-side behavior in one module, imported once from `BaseLayout`: dock-driven screen switching, the typed-role rotator, the boot sequence, companion messages/quips, and a Konami-code easter egg. Checks `prefers-reduced-motion` up front and degrades accordingly.
- `src/content.config.ts` — two content collections backed by markdown, using Astro's `glob` loader:
  - `projects` (`src/content/projects/*.md`) — required: `title`, `repoUrl`, `order`. Optional: `liveUrl`, `image`, `stack` (string array), `summary`. Plus `featured` (boolean, defaults to `false`).
  - `work` (`src/content/work/*.md`) — required: `company`, `role`, `dates`, `order`. Optional: `image`. Plus `tier` (`'primary' | 'compact' | 'hidden'`, defaults to `'compact'`).

  How these actually render is non-obvious and worth reading before editing content:
  - `Projects.astro` renders **only `featured: true` entries** as cards, built from `image`, `stack`, and `summary`. Every non-featured entry is collapsed into a single trailing line (`+ Name, Name → full archive on GitHub`). **Project markdown bodies are never rendered** — the visible card copy comes from the `summary` frontmatter field, so bullets in the body are effectively notes-to-self.
  - `Work.astro` renders the single `tier: 'primary'` entry as a full block including its markdown body (via `render()`). `tier: 'compact'` entries render as a one-line `company · role · dates` row **with no body**. `tier: 'hidden'` renders nothing at all. The work `image` field is currently not rendered by anything.
- `src/data/site.ts` — site-wide constants: name, title, description, tagline, social links, about bio paragraphs + image, the education block (school, dates, degree, `gradImage`, `resumePath`), `githubReposUrl`, and `copyrightYear`. Single source of truth so screens don't duplicate the GitHub/LinkedIn URLs.
- `src/data/education.ts` — the `semesters` array (`term`, optional `note`, `courses`) powering the coursework timeline on the Education screen.
- `src/data/os.ts` — the OS-flavored content: `homeStats` (tenure is computed at build time from a `JOIN_DATE` constant, so it self-updates), `typedRoles`, `bootLines`, companion messages/quips, and `KONAMI_CODE`.
- `src/data/skills.ts` — the three skills categories (Frontend, Backend & Data, Leadership & Delivery) as a typed array. Note: each category carries an `icon` field holding Font Awesome classes that **nothing reads** — `Skills.astro` renders numbered labels and tag pills instead, and no Font Awesome stylesheet is loaded. It's a dead field left over from the previous design.
- `src/styles/global.css` — all styling (~1,200 lines), no CSS framework. The dark neon theme is defined once as custom properties in `:root`: `--bg-void` (`#060a12`), `--text` (`#e8f1f8`), accents `--cyan` (`#5ee6ff`) / `--pink` (`#ff7ec0`) / `--purple` (`#a78bfa`), plus panel/border tokens and layout constants (`--dock-width`, `--statusbar-height`). One layout breakpoint at `max-width: 899px` (desktop-first), alongside `prefers-reduced-motion` and `(hover: hover)` queries.
- `public/images/`, `public/resume/`, `public/favicon.ico`, `public/CNAME` — static assets served verbatim at the same paths. Reference them in components via `` `${import.meta.env.BASE_URL}images/...` `` rather than hardcoding a leading `/`, so the base stays configurable in one place.
- `astro.config.mjs` — sets `site: 'https://tirthshroff.com'` and `base: '/'`. The site is served from the apex custom domain (declared in `public/CNAME`), **not** from a `github.io/portfolio` project path, so there is no path prefix in production and `import.meta.env.BASE_URL` resolves to `/`.

## Adding a new project entry

Add a markdown file to `src/content/projects/` with `title`, `repoUrl`, and `order` in frontmatter, and put the screenshot in `public/images/`.

To make it appear as a card, set `featured: true` and fill in `summary` (the description shown on the card), `stack` (rendered as the card's tag line), and `image`. Without `featured: true` the project only shows up as a name in the archive line at the bottom of the screen. Body bullets are optional and are not displayed. `Projects.astro` picks the file up automatically — no component editing required.

## Adding a new work entry

Same pattern in `src/content/work/`: `company`, `role`, `dates`, and `order`, plus `tier`.

`tier` decides the treatment: `primary` is the single highlighted role and is the **only** one whose markdown body is rendered (keep exactly one), `compact` produces a one-line entry in the past-roles list with the body ignored, and `hidden` keeps the entry in the repo without rendering it. Omitting `tier` defaults to `compact`.
