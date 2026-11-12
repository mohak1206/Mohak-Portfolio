export interface NoteMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  draft: boolean;
  readingTime: string;
}

export interface NoteItem extends NoteMeta {
  content: string;
}

// Load markdown files as raw text strings
const rawNotes = import.meta.glob('/src/content/notes/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function parseFrontmatter(raw: string): { data: Record<string, any>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const yaml = match[1];
  const content = match[2];
  const data: Record<string, any> = {};

  for (const line of yaml.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf(':');
    if (idx !== -1) {
      const key = trimmed.slice(0, idx).trim();
      let val = trimmed.slice(idx + 1).trim();
      if (val === 'true') {
        data[key] = true;
      } else if (val === 'false') {
        data[key] = false;
      } else if (key === 'tags') {
        data[key] = val
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean);
      } else {
        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
          val = val.slice(1, -1);
        }
        data[key] = val;
      }
    }
  }

  return { data, content };
}

function calculateReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export function getAllNotes(): NoteItem[] {
  const isProd = import.meta.env.PROD;
  const notes: NoteItem[] = [];

  for (const [path, raw] of Object.entries(rawNotes)) {
    const slug = path.split('/').pop()?.replace(/\.md$/, '') || '';
    const { data, content } = parseFrontmatter(raw);

    const isDraft = Boolean(data.draft);
    // Exclude draft notes from production builds
    if (isProd && isDraft) {
      continue;
    }

    notes.push({
      slug,
      title: data.title || slug,
      date: data.date || '',
      summary: data.summary || '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      draft: isDraft,
      readingTime: calculateReadingTime(content),
      content,
    });
  }

  // Sort newest first
  return notes.sort((a, b) => (b.date > a.date ? 1 : -1));
}

export function getPublishedNotes(): NoteItem[] {
  // Always only non-draft notes
  return getAllNotes().filter((n) => !n.draft);
}

export function getNoteBySlug(slug: string): NoteItem | undefined {
  return getAllNotes().find((n) => n.slug === slug);
}

