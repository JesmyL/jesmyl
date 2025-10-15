import eslintReact from '@eslint-react/eslint-plugin';
import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import customESLintConfigs from './custom-eslint.mjs';

export default tseslint.config(
  ...customESLintConfigs(),
  { ignores: ['dist', 'build', '**/*.js', 'src/**/the-icon/icons'] },
  {
    extends: [js.configs.recommended, tseslint.configs.recommended, eslintReact.configs['recommended-typescript']],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    ignores: ['.src/front/shared/ui/the-icon/icons'],
    rules: {
      ...reactHooks.configs.recommended.rules,

      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react-hooks/exhaustive-deps': 'warn',

      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unsafe-function-type': 'off',

      'no-constant-condition': 'warn',

      '@eslint-react/no-missing-key': 1,
      '@eslint-react/hooks-extra/no-unnecessary-use-prefix': 0,
      '@eslint-react/web-api/no-leaked-timeout': 0,
      '@eslint-react/hooks-extra/no-direct-set-state-in-use-effect': 0,
      '@eslint-react/dom/no-dangerously-set-innerhtml': 0,
      '@eslint-react/no-array-index-key': 0,
      '@eslint-react/dom/no-missing-button-type': 0,
    },
  },
);
