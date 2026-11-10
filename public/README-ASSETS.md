# Asset Guidelines for Mohak Agrawal's Portfolio

To replace the built-in SVG fallbacks and placeholders with your real media, drop your files into the designated paths below. The application will automatically detect and render them.

## 1. Resume Document
- **Destination:** `/public/Mohak_Agrawal_Resume.pdf`
- **Format:** PDF document
- **Purpose:** Linked directly to the primary "Resume ↗" button in the navigation and hero sections.

## 2. Hero & About Photos (Part 0.2b)
- **Hero Arch Image:**
  - **Destination:** `/public/images/hero-mountain.jpg`
  - **Subject:** Warm-toned mountain peak at sunrise with low clouds (portrait crop, ~800x1200px).
  - **Recommended Royalty-Free Sources:** Unsplash / Pexels ("mountain sunrise clouds", "alpine dawn golden hour").
- **About Mountain Image:**
  - **Destination:** `/public/images/about-mountain-bw.jpg`
  - **Subject:** Black-and-white mountain peak (landscape crop, ~1000x700px).
  - **Recommended Royalty-Free Sources:** Unsplash / Pexels ("black and white mountain peak", "dramatic mountain monochrome").
- **Optional Profile Headshot:**
  - **Destination:** `/public/profile.jpg`
  - **Subject:** Professional portrait photo.

## 3. Project Covers & Screenshots
Drop 16:10 or 4:3 screenshots / detection result images into `/public/projects/`:
- `/public/projects/signature-detection.jpg` — Signature bounding box outputs
- `/public/projects/fire-smoke-detection.jpg` — Real-time detection visualization
- `/public/projects/inventory-management.jpg` — Dashboard / inventory table screenshot
- `/public/projects/alumni-connect.jpg` — Flutter mobile application screen
- `/public/projects/civic-i.jpg` — Palghar issue map and reporting interface

*Note: If any image is absent, the site automatically renders an elegant architectural SVG fallback in the editorial design palette (#F7F3EC, #191919, #C94F17).*

## 4. Certificates
Place verification image scans or credential badges in `/public/credentials/`:
- `/public/credentials/google-ai-essentials.jpg`
- `/public/credentials/meta-llm.jpg`
