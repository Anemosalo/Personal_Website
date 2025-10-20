import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Personal_Website/', // ✅ this tells Vite to prefix all assets correctly
  build: {
    outDir: 'docs', // ✅ ensures GitHub Pages can serve from /docs
  },
  optimizeDeps: { exclude: ['lucide-react'] },
});
