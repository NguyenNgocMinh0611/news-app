import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: 'news-website/public',
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, 'src'),
      '@news': resolve(import.meta.dirname, 'news-website/src'),
    },
  },
});
