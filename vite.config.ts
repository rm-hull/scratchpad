/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import { execSync } from "child_process";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(() => {
  process.env.VITE_GIT_COMMIT_DATE = execSync("git log -1 --format=%cI").toString().trimEnd();
  process.env.VITE_GIT_COMMIT_HASH = execSync("git describe --always --dirty").toString().trimEnd();

  return {
    plugins: [react({babel: {plugins: ["babel-plugin-react-compiler"]}}), tsconfigPaths()],
    base: "/scratchpad",
    build: {
      sourcemap: true,
    }
  };
});
