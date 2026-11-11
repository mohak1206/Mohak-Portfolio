import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: 'var(--color-bg)',
        cream: 'var(--color-surface-secondary)',
        card: 'var(--color-card-surface)',
        'card-surface': 'var(--color-card-surface)',
        charcoal: 'var(--color-text-primary)',
        'muted-grey': 'var(--color-text-muted)',
        'burnt-orange': 'var(--color-accent)',
        'light-orange': 'var(--color-accent-hover)',
        'warm-border': 'var(--color-border)',
        'pure-white': 'var(--color-pure-white)',
      },
      fontFamily: {
        serif: ['"Playfair Display Variable"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter Variable"', '"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        'card': '6px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(25, 25, 25, 0.05)',
        'float': '0 12px 32px -4px rgba(25, 25, 25, 0.08)',
        'modal': '0 24px 48px -8px rgba(25, 25, 25, 0.16)',
      },
    },
  },
  plugins: [],
};

export default config;

