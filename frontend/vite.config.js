import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    // Copy public directory assets without bundling JavaScript
    copyPublicDir: true,
    // Disable Rollup bundling by setting no entries
    rollupOptions: {
      output: {
        // Ensure assets are output with their original names
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
      },
      '/scripts': {
        target: 'http://localhost:5173',
        changeOrigin: true,
        secure: false
      }
    }
  }
});
