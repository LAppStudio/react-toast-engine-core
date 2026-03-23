import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    native: "src/native/reanimated/index.ts",
  },
  dts: {
    resolve: true,
    entry: "./src/index.ts",
  },
  format: ["esm", "cjs"],
  clean: true,
  minify: true,
  external: ["react", "zustand", "react-native", "react-native-reanimated"],
  splitting: true,
  treeshake: true,
  outDir: "dist",
});
