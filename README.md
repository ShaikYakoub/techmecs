# Cohesion Portfolio — 1:1 Clone

A pixel-perfect, 1:1 clone of [Cohesion Portfolio](https://cohesion.framer.ai/) featuring complete 3D object motion, spring physics, scroll-scrubbed pinned sections, dynamic CMS routing, and self-hosted assets.

---

## ✨ Features & Architecture

### 1. 3D Floating Objects & Hero Animation
- Pre-rendered 3D geometric shapes (Orange Pyramid, Purple Sphere, Blue Cylinder, Turquoise Star, Lime Green Object, Yellow Cube, Purple Cube, Blue Pyramid).
- Spring-physics floating animations with interactive mouse tracking and parallax depth.
- Animated title rotator ("UX/UI Expertise", "HTML5/CSS3 Mastery", "Product Design", "Branding", "Collaborative Team Player").
- Bold animated typography ticker ("LARRY BRONX") in the hero background.

### 2. Interactive Navigation
- Floating glassmorphism pill navigation bar.
- Animated active indicator tracking current scroll section (`#home`, `#about`, `#stack`, `#services`, `#pricing`, `#projects`, `#contact`).
- Fully responsive mobile drawer menu with spring physics hamburger toggle.

### 3. Scroll-Scrubbed Pinning & Stacking
- **About Me Section**: 2,800px track with cards stacking sequentially into place on scroll scrub.
- **Tech Stack Section**: 3D turquoise cube with interactive design & build tool grid.
- **Services (01–12)**: Pinned accordion presentation showcasing Web Design, E-commerce, Design Systems, Mobile Apps, and more, each with distinctive 3D renders.
- **Pricing & Plans**: Interactive plan tiers ($750 / $1,200) with hover glow CTAs and FAQ accordion.

### 4. CMS Database & Dynamic Routing
- Self-hosted Framer CMS binary database (`.framercms` chunks & index tables).
- HTTP Range-query support for chunked CMS queries.
- Dynamic SPA fallback routing for:
  - Project case study pages (e.g. `/neozen-portfolio-framer-template`, `/reelio-photography-film-studio-framer-template`)
  - Subpages (`/licensing`, `/sign-up`, `/forgot-password`, `/404`)
  - Legal pages (`/legal/privacy-policy`, `/legal/cookie-policy`)
- Cookie consent settings modal with local persistence.

### 5. 100% Self-Hosted & Zero Dependencies
- All fonts (`Inter`, `Onest`, `Public Sans`, `PT Serif`) served locally in `public/fonts/`.
- All images, avatars, 3D renders, and SVGs served locally in `public/images/`.
- All JavaScript bundles and chunks served locally in `public/modules/`.
- Node.js zero-dependency HTTP server with automatic MIME detection and SPA fallback routing.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or newer)

### Running Locally
```bash
# Start the production server
npm start

# Or with dev alias
npm run dev
```

Open your browser at **`http://localhost:5173`**.

---

## 📁 Directory Structure

```text
├── index.html              # Homepage SSR document
├── server.js               # Node.js static & SPA HTTP server (with CMS range query support)
├── package.json            # Project manifest & scripts
├── public/
│   ├── subpage.html        # Dynamic SPA template for subroutes & CMS pages
│   ├── modules/            # Local ES module bundles & chunks (Framer runtime & components)
│   ├── images/             # 3D assets, photos, avatars, and SVGs
│   ├── fonts/              # Custom woff2 fonts
│   └── cms/                # CMS chunks and index files
└── README.md
```
