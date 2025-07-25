/// <reference types="vitest" />

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";
import { analyzer } from "vite-bundle-analyzer";
import path from "path";
import { peerDependencies } from "./package.json";

export default defineConfig(({ mode }) => ({
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "vite-data-table",
      fileName: (format) => `index.${format}.js`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [...Object.keys(peerDependencies), "react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    sourcemap: mode !== "production",
    minify: "esbuild",
    emptyOutDir: true,
    cssCodeSplit: true,
    target: "es2015",
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
    react(),
    analyzer({
      analyzerMode: "static",
      fileName: path.resolve(process.cwd(), "bundle-analyzer.html"),
      reportTitle: "DataTable Bundle Analyzer",
      openAnalyzer: false,
    }),
  ],
  test: {
    setupFiles: "./vitest.setup.ts",
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
}));
