/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import { globSync } from "glob";
import path, { resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";

// https://vite.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.tsx"),
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      input: Object.fromEntries(
        globSync(["src/index.tsx"]).map((file) => {
          // This remove `src/` as well as the file extension from each
          // file, so e.g. src/nested/foo.js becomes nested/foo
          const entryName = path.relative("src", file.slice(0, file.length - path.extname(file).length));
          // This expands the relative paths to absolute paths, so e.g.
          // src/nested/foo becomes /project/src/nested/foo.js
          const entryUrl = fileURLToPath(new URL(file, import.meta.url));
          return [entryName, entryUrl];
        })
      ),
      output: {
        entryFileNames: "[name].js",
        assetFileNames: "assets/[name][extname]",
        globals: {
          react: "React",
          "react-dom": "React-dom",
          "react/jsx-runtime": "react/jsx-runtime",
        },
      },
    },
    copyPublicDir: false,
  },
  plugins: [
    react(),
    libInjectCss(),
    dts({
      tsconfigPath: "./tsconfig.json",
    }),
  ],
});
