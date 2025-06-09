import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    manifest: true,
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://lic-backend-8jun.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path,
      },
      '/': {
        target: 'https://lic-backend-8jun.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path,
      },
    },
  },
});
