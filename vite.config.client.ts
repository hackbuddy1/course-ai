import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // 1. Explicitly define the client app's root directory.
  root: 'client',

  // 2. Configure the build output directory relative to the project root.
  build: {
    outDir: '../dist/spa',
    emptyOutDir: true,
  },

  // 3. Manually and explicitly define the path alias.
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client'),
    },
  },

  plugins: [
    react(),
  ],
});