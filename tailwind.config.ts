import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#F7F3EC',
        cream: '#EFE8DD',
        charcoal: '#191919',
        'muted-grey': '#77716B',
        'burnt-orange': '#C94F17',
        'light-orange': '#E47B43',
        'warm-border': '#DDD4C8',
        'pure-white': '#FFFFFF',
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

