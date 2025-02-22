import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import { VitePWA } from 'vite-plugin-pwa';
import * as tsconf from './tsconfig.json';

const tsConfig = { ...tsconf };

const alias = {};

Object.entries(tsConfig.compilerOptions.paths).forEach(([aliasKey, [path]]) => {
  alias[aliasKey.slice(0, -2)] = `/src${path.slice(1, -2)}`;
});

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    plugins: [
      react(),
      eslint({
        emitWarning: false,
        // failOnWarning: false,
        // lintOnStart: false,
      }),
      VitePWA({ injectRegister: 'auto', strategies: 'generateSW', registerType: 'autoUpdate' }),
    ],
    resolve: { alias },
  };
});
