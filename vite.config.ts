/// <reference types="vitest" />

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";
import { analyzer } from "vite-bundle-analyzer";
import path from "path";
import { peerDependencies } from "./package.json";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "vite-react-ts-button",
      fileName: (format) => `index.${format}.js`,
      formats: ["cjs", "es"],
    },
    rollupOptions: {
      external: [...Object.keys(peerDependencies)],
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [
    dts(),
    react(),
    analyzer({
      analyzerMode: "static",
      fileName: path.resolve(process.cwd(), "bundle-analyzer/index.html"),
      reportTitle: "DataTable Bundle Analyzer",
    }),
  ],
  test: {
    setupFiles: "./vitest.setup.ts",
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
});
