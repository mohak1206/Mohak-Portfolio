# Mohak Agrawal — Premium Editorial Portfolio Website

A modern, minimal, editorial portfolio website built for **Mohak Agrawal**, AI/ML & Full-Stack Developer. 

Engineered with React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, and Lucide Icons. Designed with an editorial aesthetic ("The Modern Maker"), balancing clean typography, warm natural palettes, architectural geometries, and subtle technical annotations.

---

## 🎨 Design System & Palette

| Token Name | Hex Code | Usage |
| :--- | :--- | :--- |
| **Warm Ivory** | `#F7F3EC` | Primary background across the entire application |
| **Soft Cream** | `#EFE8DD` | Secondary background sections & card containers |
| **Charcoal** | `#191919` | Primary headings, body copy, and high-contrast text |
| **Muted Grey** | `#77716B` | Secondary meta-labels, descriptions, and dividers |
| **Burnt Orange** | `#C94F17` | Primary accent (MA. dot, active nav, primary CTAs, emphasis) |
| **Light Orange** | `#E47B43` | Interactive hover states and warm graphic gradients |
| **Warm Border** | `#DDD4C8` | Structural framing, hairline borders, and subtle dividers |
| **Pure White** | `#FFFFFF` | Elevated cards, modal dialogs, and surface containers |

### Typography
- **Headings:** *Playfair Display* (Editorial serif with italic accents)
- **Body Text:** *Inter* (Clean, legible geometric sans-serif)
- **Technical Annotations:** *JetBrains Mono* (Code snippets, coordinates, tags, metrics)

---

## 🚀 Quick Start & Development

### 1. Prerequisites
- Node.js (v18.0 or newer)
- npm or pnpm

### 2. Install Dependencies
```bash
npm install
```

### 3. Launch Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
```
Generates an optimized, tree-shaken static production bundle in the `/dist` directory.

### 5. Preview Production Build Locally
```bash
npm run preview
```

---

## 📁 Exact Project Architecture

```
mohak-portfolio/
├── index.html                  # SEO meta tags, fonts, favicon link
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts          # colour and font tokens
├── postcss.config.js
├── vercel.json                 # SPA rewrite so /projects/:slug works on refresh
├── README.md
├── public/
│   ├── favicon.svg             # MA monogram
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── og-image.png            # social share preview
│   ├── Mohak_Agrawal_Resume.pdf
│   ├── profile.jpg             # headshot (optional)
│   ├── README-ASSETS.md        # list of files you still need to add
│   ├── images/
│   │   ├── hero-mountain.jpg
│   │   └── about-mountain-bw.jpg
│   ├── projects/               # screenshots, named by project slug
│   │   ├── signature-detection.jpg
│   │   ├── fire-smoke-detection.jpg
│   │   ├── inventory-management.jpg
│   │   ├── alumni-connect.jpg
│   │   └── civic-i.jpg
│   └── certificates/
│       ├── google-ai-essentials.jpg
│       └── meta-llm.jpg
└── src/
    ├── main.tsx
    ├── App.tsx                 # routes: "/", "/projects", "/projects/:slug"
    ├── index.css               # CSS variables, base styles, font imports
    ├── data/                   # ALL content lives here
    │   ├── profile.ts          # name, tagline, about text, stats, contact links
    │   ├── skills.ts
    │   ├── projects.ts         # five projects plus the Lab & Ideas list
    │   ├── experience.ts
    │   └── credentials.ts
    ├── types/
    │   └── index.ts            # TypeScript types for the data
    ├── hooks/
    │   ├── useScrollSpy.ts     # highlights the active nav link
    │   └── useReducedMotion.ts
    ├── lib/
    │   └── utils.ts
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.tsx
    │   │   ├── MobileMenu.tsx
    │   │   └── Footer.tsx
    │   ├── ui/                 # reusable pieces
    │   │   ├── Button.tsx
    │   │   ├── SectionLabel.tsx
    │   │   ├── Tag.tsx
    │   │   ├── Card.tsx
    │   │   ├── Reveal.tsx      # scroll fade-up wrapper
    │   │   └── ProjectCover.tsx # real image or generated SVG fallback
    │   ├── art/                # decorative SVGs
    │   │   ├── ContourLines.tsx
    │   │   ├── ArchFrame.tsx
    │   │   └── MountainFallback.tsx
    │   └── sections/
    │       ├── Hero.tsx        # arch, sun, terminal card, tags card, stats
    │       ├── About.tsx
    │       ├── Expertise.tsx
    │       ├── SelectedWorks.tsx
    │       ├── LabIdeas.tsx
    │       ├── Experience.tsx
    │       ├── Credentials.tsx
    │       └── Contact.tsx
    └── pages/
        ├── Home.tsx
        ├── ProjectsPage.tsx    # "View all projects"
        └── ProjectDetail.tsx   # case-study page
```

---

## ✏️ How to Update Content

All content is decoupled from presentation and stored as structured TypeScript files in `src/data/`:

- **Change Bio, Contact, or Stats:**  
  Edit [`src/data/profile.ts`](file:///src/data/profile.ts)
- **Add or Modify Projects:**  
  Edit [`src/data/projects.ts`](file:///src/data/projects.ts)
- **Update Skills & Tooling:**  
  Edit [`src/data/skills.ts`](file:///src/data/skills.ts)
- **Add Work History or Milestones:**  
  Edit [`src/data/experience.ts`](file:///src/data/experience.ts)
- **Update Certifications:**  
  Edit [`src/data/credentials.ts`](file:///src/data/credentials.ts)

---

## 🖼️ Adding Custom Media & Photos

The application includes high-fidelity SVG fallbacks for every image. To replace them with real photography:

1. **Hero Mountain Arch:** Drop a warm sunrise mountain photo in `public/images/hero-mountain.jpg`.
2. **About Section Mountain:** Drop a monochrome mountain photo in `public/images/about-mountain-bw.jpg`.
3. **Project Screenshots:** Drop `<slug>.jpg` (e.g. `signature-detection.jpg`) into `public/projects/`.
4. **Certificates:** Drop credentials in `public/certificates/`.
5. **Resume:** Replace `public/Mohak_Agrawal_Resume.pdf` with your updated PDF.

Refer to [`public/README-ASSETS.md`](file:///public/README-ASSETS.md) for detailed image dimensions and search terms.

---

## ☁️ Deploying to Vercel

The repository is pre-configured with `vercel.json` ensuring client-side routes (like `/projects/signature-detection`) work seamlessly on page refresh.

### Method A: Connect via GitHub (Recommended)
1. Push your repository to your GitHub account (`https://github.com/mohak1206/...`).
2. Log in to [Vercel](https://vercel.com/) and click **"Add New"** → **"Project"**.
3. Select your repository and click **"Import"**.
4. Framework Preset will auto-detect as **Vite**.
5. Click **"Deploy"**.

### Method B: Deploy using Vercel CLI
```bash
npm i -g vercel
vercel
vercel --prod
```

---

## ♿ Accessibility & Performance
- **Reduced Motion:** Fully complies with `prefers-reduced-motion` settings.
- **Keyboard Navigation:** Focus states, Skip-to-content anchor, and Escape-to-close modals.
- **SEO & Social:** Open Graph, Twitter Summary Cards, and structured JSON-LD Person schema.
