import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // ✅ No proxy needed because Express is mounted directly below
  },
  build: {
    outDir: "dist/spa",
  },
  plugins: [react(), expressPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

// ✅ This plugin mounts your Express server into Vite dev server
function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only applies during `vite dev`
    configureServer(server) {
      const app = createServer();

      // ✅ Mount express middleware
      server.middlewares.use(app);
    },
  };
}
