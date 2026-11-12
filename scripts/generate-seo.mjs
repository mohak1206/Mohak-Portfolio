import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const siteUrlEnv = process.env.VITE_SITE_URL;
if (!siteUrlEnv) {
  console.warn('⚠️  VITE_SITE_URL environment variable is missing. Using fallback "https://mohakagrawal.dev".');
}
const siteUrl = (siteUrlEnv || 'https://mohakagrawal.dev').replace(/\/$/, '');

// 1. Extract project slugs from src/data/projects.ts
const projectsFilePath = path.join(rootDir, 'src', 'data', 'projects.ts');
let projectSlugs = [];
if (fs.existsSync(projectsFilePath)) {
  const content = fs.readFileSync(projectsFilePath, 'utf8');
  const matches = content.matchAll(/slug:\s*["']([^"']+)["']/g);
  for (const match of matches) {
    if (!projectSlugs.includes(match[1])) {
      projectSlugs.push(match[1]);
    }
  }
}

// 2. Extract published notes from src/content/notes/*.md
const notesDir = path.join(rootDir, 'src', 'content', 'notes');
const publishedNotes = [];

if (fs.existsSync(notesDir)) {
  const files = fs.readdirSync(notesDir);
  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    const filePath = path.join(notesDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const slug = file.replace(/\.md$/, '');

    // Parse frontmatter
    const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!fmMatch) continue;

    const fmLines = fmMatch[1].split(/\r?\n/);
    const meta = {};
    for (const line of fmLines) {
      const idx = line.indexOf(':');
      if (idx !== -1) {
        const key = line.slice(0, idx).trim();
        let val = line.slice(idx + 1).trim();
        if (val === 'true') meta[key] = true;
        else if (val === 'false') meta[key] = false;
        else {
          meta[key] = val.replace(/^["']|["']$/g, '');
        }
      }
    }

    if (!meta.draft) {
      publishedNotes.push({
        slug,
        title: meta.title || slug,
        summary: meta.summary || '',
        date: meta.date || new Date().toISOString().split('T')[0],
      });
    }
  }
}

// 3. Assemble sitemap routes
const routes = [
  '/',
  '/projects',
  ...projectSlugs.map((slug) => `/projects/${slug}`),
  '/resume',
  '/notes',
  ...publishedNotes.map((note) => `/notes/${note.slug}`),
];

const today = new Date().toISOString().split('T')[0];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${siteUrl}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '/' ? '1.0' : route.startsWith('/projects') ? '0.8' : '0.7'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

// 4. Assemble robots.txt
const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

// 5. Assemble rss.xml
const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Mohak Agrawal — Notes</title>
  <link>${siteUrl}/notes</link>
  <description>Short write-ups about AI/ML models, computer vision with YOLOv8, and full-stack software.</description>
  <language>en-us</language>
  <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
${publishedNotes
  .map(
    (n) => `  <item>
    <title><![CDATA[${n.title}]]></title>
    <link>${siteUrl}/notes/${n.slug}</link>
    <description><![CDATA[${n.summary}]]></description>
    <pubDate>${new Date(n.date).toUTCString()}</pubDate>
    <guid isPermaLink="true">${siteUrl}/notes/${n.slug}</guid>
  </item>`
  )
  .join('\n')}
</channel>
</rss>`;

// Write output files to public/
const publicDir = path.join(rootDir, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf8');
fs.writeFileSync(path.join(publicDir, 'rss.xml'), rssXml, 'utf8');

console.log(`✅ SEO artifacts generated successfully for ${siteUrl}:`);
console.log(`   - public/sitemap.xml (${routes.length} routes)`);
console.log(`   - public/robots.txt`);
console.log(`   - public/rss.xml (${publishedNotes.length} published notes)`);

