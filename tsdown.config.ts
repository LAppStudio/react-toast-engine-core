import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    core: "src/core/index.ts",
    native: "src/native/index.ts",
  },
  format: ["esm", "cjs"],
  clean: true,
  minify: true,
  dts: true,
  external: ["react", "react-dom", "zustand"],
  treeshake: true,
  outDir: "dist",
  platform: "neutral",
});
