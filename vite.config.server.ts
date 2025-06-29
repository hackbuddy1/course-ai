import { defineConfig } from "vite";
import path from "path";

// Server build configuration
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "server/index.ts"), // ✅ fixed path
      name: "node-build", // Optional, just matches your filename
      fileName: () => "node-build.mjs", // ✅ consistent filename
      formats: ["es"],
    },
    outDir: "dist/server",
    target: "node22",
    ssr: true,
    rollupOptions: {
      external: [
        "fs", "path", "url", "http", "https", "os", "crypto", "stream",
        "util", "events", "buffer", "querystring", "child_process",
        "express", "cors"
      ],
      output: {
        format: "es",
        entryFileNames: "[name].mjs",
      },
    },
    minify: false,
    sourcemap: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});
