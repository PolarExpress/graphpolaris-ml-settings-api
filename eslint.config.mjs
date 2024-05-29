/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import baseConfig from "@graphpolaris/ts-configs/eslint";
import react from "eslint-plugin-react/configs/all.js";
import { FlatCompat } from "@eslint/eslintrc";

export default [
  ...baseConfig,
  {
    ...react,
    settings: {
      react: {
        version: "detect"
      }
    }
  },
  ...new FlatCompat().extends("plugin:react-hooks/recommended"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "import/no-anonymous-default-export": "off",
      "perfectionist/sort-interfaces": "off",
      "perfectionist/sort-objects": "off",
      "perfectionist/sort-object-types": "off",
      "unicorn/consistent-function-scoping": "off",
      "unicorn/no-abusive-eslint-disable": "off"
    },
    ignores: ["docs/**", "dist/**"]
  }
];
