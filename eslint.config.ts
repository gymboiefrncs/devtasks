import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier"; // 1. Add this import
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: { globals: globals.node },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig, // 2. Add this at the very end
];
