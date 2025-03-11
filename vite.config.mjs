import tailwindcss from '@tailwindcss/vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react';
import dns from 'dns';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as tsconf from './tsconfig.json';

dns.setDefaultResultOrder('verbatim');

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
    server: {
      https: true,
    },
    plugins: [
      react(),
      tsconfigPaths(),
      eslint({
        emitWarning: false,
        failOnError: true,
        // failOnWarning: false,
        // lintOnStart: false,
      }),
      VitePWA({ injectRegister: 'auto', strategies: 'generateSW', registerType: 'autoUpdate' }),
      tailwindcss(),
      basicSsl(),
    ],
    resolve: { alias },
  };
});
