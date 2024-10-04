import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
  },
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
        "no-unused-vars": ["warn"],
        "@typescript-eslint/no-unused-vars": ["warn"],
    },
  },
  {
    ignores: [
      "tests/**/*.jest.{js,ts}",
      "dist",
      "*.config.{js,ts,mjs,cjs}"
    ],
  }
];
