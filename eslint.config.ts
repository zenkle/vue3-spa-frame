import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import configPrettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";
import autoImportConfig from "./.eslintrc-auto-import.json" assert { type: "json" };
export default tseslint.config(
  // 忽略文件
  {
    ignores: ["**/*.d.ts", "node_modules", "dist", "*.min.js"],
  },
  // JavaScript 基础配置
  js.configs.recommended,
  // TypeScript 推荐配置
  ...tseslint.configs.recommended,
  // Vue 推荐配置
  ...pluginVue.configs["flat/recommended"],
  // Prettier 配置（必须放在最后以覆盖冲突规则）
  configPrettier,
  // 全局配置
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...autoImportConfig.globals,
      },
    },
  },
  // TypeScript 文件配置
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        sourceType: "module",
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
  // Vue 文件配置
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  // Prettier 规则
  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
);
