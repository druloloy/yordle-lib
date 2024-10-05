import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"], // Build for commonJS and ESmodules
  dts: true, // Generate declaration file (.d.ts)
  bundle: true, // disclude empty folders from being bundled
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: 'terser',
  terserOptions: {
    compress: {
      passes: 10
    }
  },
  minifySyntax: true,
  minifyIdentifiers: true
});
