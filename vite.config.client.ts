import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';


export default defineConfig({
  
  root: 'client',

  
  build: {
    outDir: '../dist/spa',
    emptyOutDir: true,
  },

  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client'),
    },
  },

  plugins: [
    react(),
  ],
});