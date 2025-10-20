import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',           // ✅ for custom domains (root hosting)
  build: { outDir: 'docs' },
  optimizeDeps: { exclude: ['lucide-react'] },
});