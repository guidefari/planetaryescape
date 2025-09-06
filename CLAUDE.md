# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start local development server at localhost:3000 |
| `npm run build` | Build production site to ./dist/ |
| `npm run preview` | Preview build locally before deploying |
| `npm run astro check` | Run Astro's type checking and validation |
| `sst deploy` | Deploy the webring serverless function to AWS |
| `sst dev` | Start local SST development environment |

## Architecture Overview

This is an Astro-based website with two main components:

### 1. Static Website (Astro)
- **Framework**: Astro with Preact integration
- **Styling**: Tailwind CSS v4 (alpha) with custom theme variables
- **Structure**: 
  - `src/pages/` - Route-based pages (index, opensauce, webring)
  - `src/components/` - Reusable components (global navigation, landing sections)
  - `src/layouts/` - Page layouts (BaseLayout)
  - `src/styles/global.css` - Tailwind CSS imports and custom styles

### 2. Serverless Webring API (Hono + SST)
- **Framework**: Hono.js deployed as AWS Lambda
- **Infrastructure**: SST (Serverless Stack) for AWS deployment
- **Location**: `webring/` directory
- **Endpoints**:
  - `/webring` - Handles next/prev/random site navigation
  - `/webring/list` - JSON API for all sites
  - `/webring/list/html` - HTML list of all sites

## Key Technical Details

### Tailwind CSS v4 (Alpha)
- Uses single CSS file approach in `src/styles/global.css`
- Custom theme variables defined with `@theme` directive
- Plugins imported via `@plugin` directives instead of config file

### TypeScript Configuration
- Path aliases configured: `@/*` maps to `src/*`
- ESNext target with node module resolution
- No transpilation (Astro handles TypeScript directly)

### Custom Styling
- Custom font: "Basement" (BSBlack) loaded via @font-face
- Color palette: black (#1e1e1e), white (#e7e7d8), eagle (#afac95), orange (#ea4125)
- Custom animations: marquee effect for scrolling text
- Gradient grid background pattern utility

### Deployment
- Main site: Astro static site (domain: planetaryescape.xyz)
- Webring API: AWS Lambda via SST
- Production retention policy for AWS resources