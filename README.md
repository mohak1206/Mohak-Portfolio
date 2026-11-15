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

## ⚙️ Environment Variables

Copy `.env.example` to `.env.local` for local development:
```bash
cp .env.example .env.local
```

| Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `VITE_FORMSPREE_ID` | Formspree endpoint ID for the contact form | `mppdzyda` |
| `VITE_CAL_15_URL` | Cal.com booking link for 15-minute quick chats | `https://cal.com/mohak-agrawal/15min` |
| `VITE_CAL_30_URL` | Cal.com booking link for 30-minute project discussions | `https://cal.com/mohak-agrawal/30min` |
| `VITE_SITE_URL` | Canonical production domain without trailing slash (set on Vercel) | `https://mohakagrawal.dev` |

> **Important Notes on Environment Variables:**
> 1. Vite embeds `VITE_*` variables at **build time**. After creating or editing `.env.local`, you must **restart the dev server** (`npm run dev`) for changes to take effect.
> 2. When variables are left empty, their respective components (e.g. the Formspree contact form or Cal booking buttons) automatically hide with no broken UI or console errors.
> 3. In production, configure the same variables under **Vercel Project Settings → Environment Variables**, then trigger a redeploy.

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
Generates an optimized, tree-shaken static production bundle in the `/dist` directory. The build automatically triggers `prebuild` (`node scripts/generate-seo.mjs`) to generate `sitemap.xml`, `robots.txt`, and `rss.xml`.

> **Note on Analytics & Speed Insights:**
> This project includes `@vercel/analytics` and `@vercel/speed-insights`. For visitor metrics and performance telemetry to collect, Web Analytics must be enabled in your **Vercel Project Dashboard** (under the **Analytics** and **Speed Insights** tabs).

### 5. Preview Production Build Locally
```bash
npm run preview
```

---

## 📁 Exact Project Architecture

```
mohak-portfolio/
├── .env.local                  # Local environment overrides (git-ignored)
├── .env.example                # Example environment variables template
├── index.html                  # SEO meta tags, fonts, favicon, JSON-LD
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts          # Colour and font tokens
├── vercel.json                 # Static rewrites, caching, and PDF headers
├── README.md
├── scripts/
│   └── generate-seo.mjs        # Builds sitemap.xml, robots.txt, and rss.xml
├── public/
│   ├── favicon.svg             # MA monogram
│   ├── apple-touch-icon.png    # 180x180 app icon
│   ├── og-image.png            # Social share preview (1200x630)
│   ├── Mohak_Agrawal_Resume.pdf# Authentic resume PDF
│   ├── Resume.pdf              # PDF alias
│   ├── images/                 # Atmospheric mountains & photos
│   └── projects/               # Project screenshots
└── src/
    ├── main.tsx
    ├── App.tsx                 # Routes: "/", "/projects", "/resume", "/blogs" (and "/notes"), "*"
    ├── index.css               # CSS variables, prose-editorial, print styles
    ├── content/
    │   └── notes/              # Markdown articles with frontmatter
    │       ├── signature-detector-92-mAP.md
    │       └── why-smoke-is-harder-than-fire.md
    ├── data/                   # Structured data
    │   ├── profile.ts          # Bio, contact, education, stats
    │   ├── availability.ts     # Real-time availability status pill
    │   ├── services.ts         # Freelance service offerings & process
    │   ├── faq.ts              # Working with me accordion Q&As
    │   ├── projects.ts         # Case studies & metrics
    │   ├── skills.ts           # Hands-on skills by category
    │   ├── experience.ts       # Work experience & leadership
    │   └── credentials.ts      # Certifications
    ├── hooks/
    │   ├── usePageMeta.ts      # Dynamic SEO document & OG tags per route
    │   ├── useScrollSpy.ts     # Active section tracking
    │   ├── useFinePointer.ts   # Pointer device detection
    │   └── useReducedMotion.ts # Motion preferences
    ├── lib/
    │   ├── notes.ts            # Markdown loader, parser, and reading time
    │   └── lenis.ts            # Smooth scrolling controller
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.tsx
    │   │   ├── MobileMenu.tsx
    │   │   └── Footer.tsx
    │   ├── ui/                 # Reusable primitives
    │   │   ├── AvailabilityBadge.tsx
    │   │   ├── ContactForm.tsx # Formspree form with validation & honeypot
    │   │   ├── Skeleton.tsx
    │   │   ├── Button.tsx
    │   │   └── CommandPalette.tsx
    │   └── sections/
    │       ├── Hero.tsx
    │       ├── About.tsx
    │       ├── Expertise.tsx
    │       ├── SelectedWorks.tsx
    │       ├── LabIdeas.tsx
    │       ├── Experience.tsx
    │       ├── Credentials.tsx
    │       ├── FromNotes.tsx   # Recent 2 blog articles home preview
    │       ├── Services.tsx    # Freelance services cards & workflow
    │       ├── FAQ.tsx         # Accessible accordion
    │       └── Contact.tsx
    └── pages/
        ├── Home.tsx            # Main portfolio
        ├── ProjectsPage.tsx    # Filterable project catalog
        ├── ProjectDetail.tsx   # Detailed case study
        ├── ResumePage.tsx      # Printable A4 web resume
        ├── NotesPage.tsx       # Filterable technical blogs list (/blogs and /notes)
        ├── NoteDetailPage.tsx  # Editorial reading layout with TOC & code copy
        └── NotFoundPage.tsx    # Themed interactive 404 terminal
```

---

## ✏️ How to Update Content

All content is decoupled from presentation and stored as structured TypeScript files in `src/data/` or Markdown files in `src/content/`:

- **Change Availability Status:**  
  Edit [`src/data/availability.ts`](file:///src/data/availability.ts) (`status: "open" | "limited" | "closed"`).
- **Edit Services & Workflow:**  
  Edit [`src/data/services.ts`](file:///src/data/services.ts).
- **Update "Working with Me" FAQ:**  
  Edit [`src/data/faq.ts`](file:///src/data/faq.ts). Entries containing `TODO` are automatically hidden in production.
- **Write or Publish Notes (Blog):**  
  Add `.md` files in [`src/content/notes/`](file:///src/content/notes/). Set `draft: false` to publish.
- **Change Bio, Contact, or Stats:**  
  Edit [`src/data/profile.ts`](file:///src/data/profile.ts).
- **Add or Modify Projects:**  
  Edit [`src/data/projects.ts`](file:///src/data/projects.ts).
- **Update Skills & Tooling:**  
  Edit [`src/data/skills.ts`](file:///src/data/skills.ts).
- **Add Work History:**  
  Edit [`src/data/experience.ts`](file:///src/data/experience.ts).
- **Update Certifications:**  
  Edit [`src/data/credentials.ts`](file:///src/data/credentials.ts).

---

## ☁️ Deploying to Vercel

The repository includes `vercel.json` ensuring client-side routes (e.g. `/projects/signature-detection`, `/resume`, `/blogs`, `/notes`) work smoothly on refresh, with optimized caching and PDF serving headers.

1. Push your repository to your GitHub account (`https://github.com/mohak1206/...`).
2. In the [Vercel Dashboard](https://vercel.com/), click **"Add New"** → **"Project"**.
3. Import your repository (Vite is detected automatically).
4. In **Settings → Environment Variables**, add:
   - `VITE_FORMSPREE_ID`: `mppdzyda`
   - `VITE_CAL_15_URL`: `https://cal.com/mohak-agrawal/15min`
   - `VITE_CAL_30_URL`: `https://cal.com/mohak-agrawal/30min`
   - `VITE_SITE_URL`: `https://your-domain.vercel.app`
5. Click **"Deploy"**.

---

## ♿ Accessibility & Performance
- **Reduced Motion:** Fully complies with `prefers-reduced-motion` settings and in-app motion toggle.
- **Keyboard Navigation:** ARIA attributes, Skip-to-content anchor, roving focus on FAQ accordion, and command palette (`⌘K`).
- **SEO & Social:** Open Graph, Twitter Summary Cards, structured JSON-LD (Person, FAQPage, BlogPosting), sitemap, and RSS feed.
