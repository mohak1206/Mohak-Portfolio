import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Ensure VITE_SITE_URL is available for %VITE_SITE_URL% substitution in index.html
process.env.VITE_SITE_URL = (process.env.VITE_SITE_URL || 'https://mohakagrawal.dev').replace(/\/$/, '');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            if (id.includes('marked')) {
              return 'marked';
            }
            if (id.includes('lenis')) {
              return 'lenis';
            }
            if (
              id.includes('react') ||
              id.includes('scheduler') ||
              id.includes('react-dom') ||
              id.includes('react-router')
            ) {
              return 'react-vendor';
            }
            if (id.includes('lucide-react')) {
              return 'lucide';
            }
            return 'vendor';
          }
        },
      },
    },
  },
});
