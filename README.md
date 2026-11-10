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

## 📁 Project Architecture

```
mohak-agrawal-portfolio/
├── public/
│   ├── images/                # Hero and About photographic assets
│   ├── projects/              # Real project screenshots and detection outputs
│   ├── credentials/           # Certificate badges and verification documents
│   ├── favicon.svg            # MA monogram brand favicon
│   ├── robots.txt             # Search engine crawling rules
│   ├── sitemap.xml            # SEO sitemap with route definitions
│   ├── Mohak_Agrawal_Resume.pdf # Downloadable resume PDF
│   └── README-ASSETS.md       # Guidelines for dropping in personalized media
├── src/
│   ├── components/
│   │   ├── about/             # 3-column About section and academic narrative
│   │   ├── common/            # Navbar, Footer, SectionLabel, Fallback illustrations
│   │   ├── contact/           # Editorial contact invitation and social channels
│   │   ├── credentials/       # Certifications and leadership cards
│   │   ├── experience/        # Milestones and career timeline
│   │   ├── hero/              # Signature arch composition, sun circle & terminal
│   │   ├── projects/          # Selected works, interactive cards, and detail modal
│   │   └── skills/            # Technical capability matrix (hands-on vs exploring)
│   ├── data/
│   │   ├── credentials.ts     # Certifications & leadership records
│   │   ├── experience.ts      # Timeline items and internships
│   │   ├── profile.ts         # Bio, true metrics, education, and links
│   │   ├── projects.ts        # Case studies, test metrics, and Lab & Ideas
│   │   └── skills.ts          # Categorized technical competencies
│   ├── pages/
│   │   ├── HomePage.tsx       # Primary single-page portfolio layout
│   │   ├── ProjectsPage.tsx   # Complete project archive (including Civic-I)
│   │   └── ProjectDetailPage.tsx # Deep-linkable `/projects/:slug` route
│   ├── types/                 # Shared TypeScript interfaces
│   ├── App.tsx                # Client-side router configuration
│   ├── index.css              # Tailwind base, utilities, and reduced-motion rules
│   └── main.tsx               # Application entry point
├── vercel.json                # SPA rewrite rules for direct deep-linking
└── vite.config.ts             # Vite configuration with alias support
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
4. **Resume:** Replace `public/Mohak_Agrawal_Resume.pdf` with your updated PDF.

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
# Follow prompts, choose defaults, deploy to production:
vercel --prod
```

---

## ♿ Accessibility & Performance
- **Reduced Motion:** Fully complies with `prefers-reduced-motion` settings.
- **Keyboard Navigation:** Focus states, Skip-to-content anchor, and Escape-to-close modals.
- **SEO & Social:** Open Graph, Twitter Summary Cards, and structured JSON-LD Person schema.
