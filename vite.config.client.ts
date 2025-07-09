// vite.config.client.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";


export default defineConfig({
  root: "./client",
  server: {
    proxy: {
      // Any request starting with '/api' will be forwarded
      '/api': {
        target: 'http://localhost:5000', // Your backend server
        changeOrigin: true, // Recommended for this to work smoothly
      },
    },
  },
  build: {
    outDir: "../dist/spa",
    emptyOutDir: true,
  },
  plugins: [
    react(),
    tsconfigPaths(), 
  ],
});
