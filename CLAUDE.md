# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is an Astro-based personal portfolio website for Tirth Shroff, deployed to GitHub Pages via GitHub Actions. It's a single page (`/`) composed of typed components and content collections — there is no client-side framework runtime; Astro ships static HTML/CSS plus one small inline script for the mobile nav toggle.

## Development

- `npm install` — install dependencies (single dependency: `astro`).
- `npm run dev` — start the local dev server.
- `npm run build` — produce the production build in `dist/`.
- `npm run preview` — serve the production build locally to sanity-check before pushing.

Pushing to `master` triggers `.github/workflows/deploy.yml`, which builds the site and deploys it to GitHub Pages (Actions-based deploy, not the legacy branch-based build).

## Architecture

- `src/pages/index.astro` — composes the page as a sequence of section components (`Nav`, `Intro`, `About`, `Education`, `Skills`, `Projects`, `Work`, `Contact`) in `src/components/`, wrapped in `src/layouts/BaseLayout.astro` (handles `<head>`: meta tags, Google Fonts/Font Awesome CDN links, favicon).
- `src/content.config.ts` — defines two content collections backed by markdown files, using Astro's `glob` loader:
  - `projects` (`src/content/projects/*.md`) — frontmatter: `title`, `repoUrl`, `liveUrl` (optional), `image`, `order`; bullet write-up lives in the markdown body.
  - `work` (`src/content/work/*.md`) — frontmatter: `company`, `role`, `dates`, `image` (optional — omit to render a generic building icon instead of a logo), `order`; bullet write-up in the markdown body.
  - `Projects.astro`/`Work.astro` fetch + sort these by `order` and render each entry through `ProjectCard.astro`/`WorkEntry.astro`.
- `src/data/site.ts` — site-wide constants used across multiple sections (name, tagline, social links, about bio, education block, per-section quotes, copyright year) — the single source of truth so, e.g., About and the footer don't duplicate the GitHub/LinkedIn URLs.
- `src/data/skills.ts` — the three skills categories (Frontend, Backend & Data, Leadership & Delivery) as a typed array. These change rarely enough that a full content collection would be overkill.
- `src/styles/global.css` — all styling. The two-color theme (`#e8f1f5` light, `#005691` dark) is defined once as CSS custom properties (`--color-light`, `--color-dark`, plus derived hover/muted tones) in `:root` and reused throughout. Layout uses plain CSS Grid/Flexbox (a `.split` two-column pattern, mobile-first with a single breakpoint at 900px) — no Bootstrap.
- `public/images/`, `public/resume/`, `public/favicon.ico` — static assets served verbatim at the same paths (prefixed with the `/portfolio` base in production). Reference them in components via `` `${import.meta.env.BASE_URL}images/...` `` rather than hardcoding the base path.
- `astro.config.mjs` — sets `site`/`base` for GitHub Pages project-site hosting (`tirth2801.github.io/portfolio/`).

External dependencies still loaded via CDN in `BaseLayout.astro`: Google Fonts and Font Awesome (pure CSS/font assets, no JS behavior tied to them). Bootstrap, jQuery, and Popper.js have been removed entirely.

## Adding a new project entry

Add a new markdown file to `src/content/projects/` with `title`, `repoUrl`, `liveUrl` (optional), `image`, and an `order` (controls display position) in frontmatter, and the bullet write-up as a markdown list in the body. Add the screenshot to `public/images/`. No HTML editing required — `Projects.astro` picks it up automatically.

## Adding a new work entry

Same pattern in `src/content/work/`: `company`, `role`, `dates`, `order`, and an optional `image` (a logo in `public/images/`; omit it to fall back to a generic building icon, as C3.ai currently does).
