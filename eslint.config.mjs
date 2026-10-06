import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Keep project imports unchanged; this versioned upstream fork is CommonJS and needs only these imports.
    files: ["vendor/partsunion-braces/**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
    },
    rules: {
      "@typescript-eslint/no-require-imports": [
        "error",
        {
          allow: [
            "^\\./(?:lib/)?(?:stringify|compile|expand|parse|constants|utils)$",
            "^fill-range$",
          ],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // Rule overrides for this project.
  {
    rules: {
      // German marketing copy uses double quotes and apostrophes in the
      // middle of sentences all over the place. The default rule would
      // force escaping them with &quot;/&apos; on every occurrence, which
      // makes the source unreadable without any real benefit. Downgrade
      // to warn so it's visible but doesn't break CI/builds.
      "react/no-unescaped-entities": "warn",

      // recharts 3.x ships chart components whose prop types force `any`
      // in legacy wrappers. We cap this at warn for now — the components
      // that trigger it are already marked and isolated.
      "@typescript-eslint/no-explicit-any": "warn",

      // Downgrade unused-vars to warn so linting ignores shelf-warmers
      // while still surfacing them in editor output.
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
]);

export default eslintConfig;
