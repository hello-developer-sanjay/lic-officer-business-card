import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        entryFileNames: 'main.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
  server: {
    proxy: {
      '/': {
        target: 'https://lic-backend-8jun.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path, // Keep the path as is
      },
      '/api': {
        target: 'https://lic-backend-8jun.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path,
      },
    },
  },
});
