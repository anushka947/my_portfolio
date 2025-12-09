import { defineConfig, createLogger } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const logger = createLogger();

export default defineConfig({
  logLevel: "error",
  customLogger: {
    ...logger,
    warn(msg, options) {
      if (
        typeof msg === "string" &&
        (msg.includes("postcss.parse") ||
          (msg.includes("vision_bundle.mjs") && msg.includes("Use of eval")))
      ) {
        return;
      }
      logger.warn(msg, options);
    },
  },
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  esbuild: {
    target: "esnext",
    format: "esm",
  },
  css: {
    // Provide an explicit `from` to silence PostCSS plugins that omit it.
    postcss: {
      from: path.resolve(import.meta.dirname, "client", "src", "index.css"),
      plugins: [tailwindcss, autoprefixer],
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      // Silence noisy PostCSS "from" warnings emitted by third-party plugins.
      onwarn(warning, defaultHandler) {
        if (
          warning.plugin === "vite:css" &&
          typeof warning.message === "string" &&
          warning.message.includes("postcss.parse")
        ) {
          return;
        }
        if (
          typeof warning.message === "string" &&
          warning.message.includes("vision_bundle.mjs") &&
          warning.message.includes("Use of eval")
        ) {
          return;
        }
        defaultHandler(warning);
      },
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-dom/client'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'ui-vendor': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-select',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
            '@radix-ui/react-tooltip',
          ],
          'query-vendor': ['@tanstack/react-query'],
          'animation-vendor': ['framer-motion', 'gsap'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
