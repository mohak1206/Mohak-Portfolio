import { useEffect } from 'react';

interface PageMetaOptions {
  title?: string;
  description?: string;
  path?: string;
}

const DEFAULT_TITLE = 'Mohak Agrawal — AI/ML & Full-Stack Developer';
const DEFAULT_DESCRIPTION =
  'Mohak Agrawal: AI/ML & Full-Stack Developer. Computer vision with YOLOv8, React, Flask and Flutter projects.';

export function usePageMeta({ title, description, path = '' }: PageMetaOptions = {}) {
  useEffect(() => {
    const siteUrl = (
      import.meta.env.VITE_SITE_URL || 'https://mohakagrawal.dev'
    ).replace(/\/$/, '');

    const fullTitle = title
      ? title.includes('Mohak Agrawal')
        ? title
        : `${title} | Mohak Agrawal`
      : DEFAULT_TITLE;

    const fullDesc = description || DEFAULT_DESCRIPTION;
    const fullUrl = `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;

    document.title = fullTitle;

    // Helper to set or create meta tag
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Helper to set link tag
    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    setMeta('name', 'description', fullDesc);
    setLink('canonical', fullUrl);

    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', fullDesc);
    setMeta('property', 'og:url', fullUrl);

    setMeta('property', 'twitter:title', fullTitle);
    setMeta('property', 'twitter:description', fullDesc);
    setMeta('property', 'twitter:url', fullUrl);
  }, [title, description, path]);
}

