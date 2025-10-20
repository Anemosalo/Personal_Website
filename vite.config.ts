import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',               // ✅ since you're using anemosaloupis.com
  build: {
    outDir: 'docs',        // ✅ output here for GitHub Pages
    assetsDir: 'assets',   // ✅ ensures images go to /docs/assets/
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
