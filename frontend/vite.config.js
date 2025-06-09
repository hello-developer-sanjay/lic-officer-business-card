import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export uvedefault defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      fastRefresh: true,
    }),
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
    },
  },
  build: {
    minify: 'esbuild',
    sourcemap: true,
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets',
    manifest: true,
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://lic-backend-8jun.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path,
      },
    },
  },
});
