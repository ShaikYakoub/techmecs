# Cohesion Portfolio — Next.js 16 (App Router & React 19)

A pixel-perfect, ultra-fast clone of [Cohesion Portfolio](https://cohesion.framer.ai/) built with **Next.js 16 (16.3.4), TypeScript, and React 19**, fully configured for **Cloudflare Pages** edge deployment with zero-config CDN caching, self-hosted static assets, 3D spring physics, scroll-scrubbed pinned sections, and dynamic CMS routing.

---

## ✨ Features & Architecture

### 1. Next.js 16 App Router & React 19
- Powered by **Next.js 16.3.4** and **React 19** (`^19.0.0`).
- Fully async route resolution (`params: Promise<{ slug: string[] }>`) in line with Next.js 15/16 App Router specifications.
- Ultra-fast static compilation (`generateStaticParams()`) generating 11 static pages in under a second.
- TypeScript enabled with strict type checks (`npx tsc --noEmit` clean).

### 2. Cloudflare Pages Native Configuration
- **`wrangler.jsonc`**: Cloudflare Pages configuration with `nodejs_compat` compatibility flag and standard build output routing.
- **`public/_routes.json`**: Explicit Cloudflare Pages routing table routing `/cms/*` and `/sites/*` through edge workers while serving all static assets (`/fonts/*`, `/images/*`, `/modules/*`, `/_next/*`) directly from Cloudflare's global edge CDN.
- **`public/_headers`**: Immutable long-term caching headers (`Cache-Control: public, max-age=31536000, immutable`) for fonts, SVGs, WebP images, and static JS modules.
- **`functions/[[path]].ts`**: Cloudflare Pages edge function handling `/cms/*` byte-range queries and `/sites/...` module aliasing directly on the edge.

### 3. 3D Floating Objects & Hero Animation
- Pre-rendered 3D geometric shapes (Orange Pyramid, Purple Sphere, Blue Cylinder, Turquoise Star, Lime Green Object, Yellow Cube, Purple Cube, Blue Pyramid).
- Spring-physics floating animations with interactive mouse tracking and parallax depth.
- Animated title rotator ("UX/UI Expertise", "HTML5/CSS3 Mastery", "Product Design", "Branding", "Collaborative Team Player").
- Bold animated typography ticker ("LARRY BRONX") in the hero background.

### 4. Interactive Navigation
- Floating glassmorphism pill navigation bar with dynamic active section indicator.
- Fully responsive mobile layout with spring-animated hamburger drawer.

### 5. Scroll-Scrubbed Pinning & Stacking
- **About Me Section**: 2,800px track with cards stacking sequentially into place on scroll scrub.
- **Tech Stack Section**: 3D turquoise cube with interactive design & build tool grid.
- **Services (01–12)**: Pinned accordion presentation showcasing Web Design, E-commerce, Design Systems, Mobile Apps, and more, each with distinctive 3D renders.
- **Pricing & Plans**: Interactive plan tiers ($750 / $1,200) with hover glow CTAs and FAQ accordion.

### 6. CMS Database & Dynamic Routing
- Next.js Route Handler (`app/cms/[...slug]/route.ts`) supporting HTTP Range queries (`?range=start-end`) on `.framercms` chunks.
- Dynamic SPA fallback and static routes for:
  - Project case study pages (e.g. `/neozen-portfolio-framer-template`, `/reelio-photography-film-studio-framer-template`)
  - Subpages (`/licensing`, `/sign-up`, `/forgot-password`, `/404`)
  - Legal pages (`/legal/privacy-policy`, `/legal/cookie-policy`)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or newer)
- npm (v9 or newer)

### Running Locally
```bash
# Install dependencies
npm install

# Start development server on port 3001
npm run dev

# Or build for production
npm run build
npm start
```

Open your browser at **`http://localhost:3001`**.

---

## ☁️ Deploying to Cloudflare Pages

### Option 1: Cloudflare Git Integration (Recommended)
1. Push this repository to GitHub or GitLab.
2. In the **Cloudflare Dashboard** -> **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**.
3. Configure build settings:
   - **Framework preset**: `None`
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Compatibility date**: `2026-09-01`
   - **Compatibility flags**: `nodejs_compat`
4. Deploy! Cloudflare Pages will use `wrangler.jsonc`, `public/_routes.json`, and `public/_headers` automatically.

### Option 2: Wrangler CLI
```bash
# Deploy with Wrangler
npx wrangler pages deploy out --project-name=techmecs-portfolio
```

