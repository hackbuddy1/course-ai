import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path'; // <-- Import the 'path' module from Node.js

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: '../dist/spa',
    emptyOutDir: true,
  },
  resolve: { // <-- Add this 'resolve' section
    alias: {
      '@': path.resolve(__dirname, './client'), // <-- This is the explicit rule
    },
  },
  plugins: [
    react(),
    // We are no longer using tsconfigPaths, so it can be removed.
  ],
});