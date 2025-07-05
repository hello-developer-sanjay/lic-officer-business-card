import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    // Prevent Vite from generating index.html
    rollupOptions: {
      input: {},
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    }
  },
  server: {
    proxy: {
      '/': {
        target: 'https://mrooyp7uw6.execute-api.ap-south-1.amazonaws.com/prod',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path
      }
    }
  }
});
