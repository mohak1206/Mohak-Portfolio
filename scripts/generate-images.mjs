import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const heroSvg = `<svg viewBox="0 0 600 900" width="600" height="900" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#DFC3AF" />
      <stop offset="40%" stop-color="#ECCDB8" />
      <stop offset="75%" stop-color="#E9B796" />
      <stop offset="100%" stop-color="#C97A52" />
    </linearGradient>
    <linearGradient id="sunGlow" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#C94F17" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#E47B43" stop-opacity="0.6" />
    </linearGradient>
    <linearGradient id="peakLight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F5EFE6" />
      <stop offset="100%" stop-color="#D9C5B2" />
    </linearGradient>
    <linearGradient id="peakShadow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#322E2B" />
      <stop offset="100%" stop-color="#191919" />
    </linearGradient>
    <linearGradient id="fog" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#F7F3EC" stop-opacity="0.75" />
      <stop offset="100%" stop-color="#EFE8DD" stop-opacity="0.95" />
    </linearGradient>
  </defs>
  <rect width="600" height="900" fill="url(#skyGrad)" />
  <circle cx="240" cy="380" r="160" fill="url(#sunGlow)" />
  <polygon points="40,680 180,480 320,680" fill="#58453A" opacity="0.35" />
  <polygon points="260,680 420,440 580,680" fill="#4B3B32" opacity="0.4" />
  <polygon points="300,240 180,560 300,560" fill="url(#peakLight)" />
  <polygon points="300,240 300,560 460,560" fill="url(#peakShadow)" />
  <polygon points="190,420 120,580 260,580" fill="#E4D3C2" />
  <polygon points="380,360 330,550 490,550" fill="#24211E" />
  <polygon points="-50,900 150,620 400,900" fill="#24201D" />
  <polygon points="220,900 450,590 650,900" fill="#1C1816" />
  <path d="M-20,680 Q100,650 250,670 T550,660 T700,680 L700,900 L-20,900 Z" fill="url(#fog)" />
  <path d="M-20,740 Q150,710 320,730 T650,720 L650,900 L-20,900 Z" fill="#F7F3EC" opacity="0.9" />
</svg>`;

const aboutSvg = `<svg viewBox="0 0 800 500" width="800" height="500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bwSky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#4A4A4A" />
      <stop offset="50%" stop-color="#7A7A7A" />
      <stop offset="100%" stop-color="#BDBDBD" />
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#bwSky)" />
  <polygon points="100,380 260,200 420,380" fill="#5E5E5E" />
  <polygon points="350,400 520,180 690,400" fill="#474747" />
  <polygon points="380,110 200,420 380,420" fill="#EAEAEA" />
  <polygon points="380,110 380,420 580,420" fill="#1A1A1A" />
  <polygon points="380,110 360,280 380,420" fill="#C4C4C4" />
  <polygon points="-50,500 180,340 450,500" fill="#141414" />
  <polygon points="320,500 580,310 850,500" fill="#0D0D0D" />
  <path d="M0,420 Q200,390 400,410 T800,400 L800,500 L0,500 Z" fill="#EEEEEE" opacity="0.35" />
</svg>`;

const imagesDir = path.resolve('public/images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

await sharp(Buffer.from(heroSvg))
  .resize(600, 750)
  .webp({ quality: 82, effort: 6 })
  .toFile(path.join(imagesDir, 'hero-mountain.webp'));

await sharp(Buffer.from(aboutSvg))
  .resize(800, 500)
  .webp({ quality: 82, effort: 6 })
  .toFile(path.join(imagesDir, 'about-mountain-bw.webp'));

console.log('Generated hero-mountain.webp and about-mountain-bw.webp successfully!');
