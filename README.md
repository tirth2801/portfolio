# tirthshroff.com

My personal portfolio, built as a retro terminal "desktop OS" — a boot sequence, a status bar, a dock, and draggable-feeling screens for Home, About, Skills, Projects, Work, Education, and Contact. It's a static [Astro](https://astro.build) site with no client-side framework runtime, deployed to GitHub Pages at [tirthshroff.com](https://tirthshroff.com).

## Getting started

```bash
npm install
npm run dev       # start the local dev server
npm run build     # production build -> dist/
npm run preview   # serve the production build locally
```

Requires Node >= 22.12.

## Architecture

- `src/pages/index.astro` composes the whole page: a `BaseLayout` shell plus the OS chrome (`StatusBar`, `DockNav`, `CompanionWidget`, `BootOverlay`, `GlitchOverlay`) and a stack of screens under `src/components/os/screens/` (`Home`, `About`, `Skills`, `Projects`, `Work`, `Education`, `Contact`).
- `src/scripts/os.ts` is the one inline script driving the desktop-shell behavior (nav, boot sequence, etc.) — otherwise everything ships as static HTML/CSS.
- `src/content.config.ts` defines two content collections loaded from markdown via Astro's `glob` loader:
  - `projects` (`src/content/projects/*.md`) — frontmatter: `title`, `repoUrl`, `liveUrl` (optional), `image`, `order`, `featured`, `stack`, `summary`; write-up lives in the markdown body.
  - `work` (`src/content/work/*.md`) — frontmatter: `company`, `role`, `dates`, `image` (optional), `order`, `tier`; write-up lives in the markdown body.
- `src/data/` holds typed, hand-maintained content that changes rarely: `site.ts` (name, tagline, social links, bio, copyright year), `skills.ts`, `education.ts`, and `os.ts` (desktop-shell copy/config).
- `src/styles/global.css` holds all styling — a CSS custom-property theme plus plain CSS Grid/Flexbox layout, no CSS framework.
- `public/images/`, `public/resume/`, `public/favicon.ico` are served verbatim; reference them via `` `${import.meta.env.BASE_URL}images/...` `` rather than hardcoding a path.
- `astro.config.mjs` sets `site`/`base` for the custom domain (`tirthshroff.com`, served at `/`).

## Adding content

**A project:** add a markdown file to `src/content/projects/` with `title`, `repoUrl`, `liveUrl` (optional), `image`, `order`, and optionally `featured`/`stack`/`summary`; put the screenshot in `public/images/`. The Projects screen picks it up automatically.

**A work entry:** add a markdown file to `src/content/work/` with `company`, `role`, `dates`, `order`, `tier`, and an optional `image` (logo in `public/images/`; omit it to fall back to a generic building icon).

## Deployment

Pushing to `master` triggers `.github/workflows/deploy.yml`, which builds the site with `withastro/action` and deploys it to GitHub Pages.
