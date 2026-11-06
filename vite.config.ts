import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/rss': {
        target: 'https://giaoducthoidai.vn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/rss/, '/rss'),
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, 'src'),
    },
  },
});
