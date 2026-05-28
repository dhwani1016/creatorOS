import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Enforce relative asset paths for flexible hosting (Vercel, Netlify, GitHub Pages, etc.)
  build: {
    outDir: 'dist',
  }
});
