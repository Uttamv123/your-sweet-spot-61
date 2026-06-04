import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2020",
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes("node_modules/@radix-ui/")) return "radix-ui";
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/react-router-dom/")
          ) return "react-vendor";
          if (
            id.includes("node_modules/framer-motion/") ||
            id.includes("node_modules/lenis/")
          ) return "motion";
          if (id.includes("node_modules/@tanstack/react-query")) return "query";
          if (id.includes("node_modules/lucide-react/")) return "icons";
          if (id.includes("node_modules/recharts/")) return "charts";
          if (id.includes("node_modules/@supabase/supabase-js/")) return "supabase";
        },
      },
    },
  },
}));
