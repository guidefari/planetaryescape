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

## Design System

### Color Palette
- **Primary Black**: `#1e1e1e` (--color-black) - Main background color
- **Primary White**: `#e7e7d8` (--color-white) - Main text and contrast color
- **Eagle Gray**: `#afac95` (--color-eagle) - Secondary text and accents
- **Orange**: `#ea4125` (--color-orange) - CTA buttons and highlights

### Typography
- **Display Font**: "Basement" (BSBlack) - Used for headings and branding
  - Applied via `.font-display` class
  - Always uppercase for consistency
  - Font weight: 700
- **Body Font**: InterVariable - Used for body text and descriptions
- **Text Hierarchy**:
  - Hero titles: `text-3xl lg:text-7xl uppercase font-display`
  - Section headers: `text-3xl lg:text-6xl uppercase font-display`
  - Card titles: `text-xl font-medium sm:text-2xl`
  - Body text: Default sizing with Inter

### Layout Patterns
- **Container**: `max-w-7xl mx-auto` - Standard content container
- **Section Borders**: `border-b border-white/20` - Section dividers
- **Content Borders**: `border-white/20 border-x` - Side borders for content areas
- **Padding**: `p-8` for standard content padding

### Component Patterns

#### Navigation
- Black background with white/20% opacity borders
- Logo on left, action buttons on right
- Responsive flex layout (column on mobile, row on desktop)
- Primary CTA: white background with black text
- Secondary links: black background with white text and border

#### Cards/Services
- White background with black text for content cards
- Hover effects: `-translate-x-2 -translate-y-2` transform
- Dashed border backdrop effect
- Black border on white background pattern

#### Buttons & CTAs
- **Primary**: White background, black text, full width on mobile
- **Secondary**: Black background, white text, white border
- Hover states with color inversion
- Consistent padding: `px-6 py-4`

### Animation & Effects
- **Marquee**: `animate-marquee` - 15s linear infinite scroll
- **Gradient Grid**: `.gradient-grid` - Subtle grid pattern background
- **Hover Transforms**: Consistent `-translate-x-2 -translate-y-2` pattern
- **Transitions**: `duration-200` for all interactive elements

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), 2xl (1536px)
- Grid layouts: 1 column mobile → 2 columns tablet → 4 columns desktop
- Typography scales appropriately across breakpoints

### Accessibility
- High contrast color combinations (black/white, orange accents)
- Proper semantic HTML structure
- Keyboard navigation support via standard link/button elements