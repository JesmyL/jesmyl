import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { attrStylerVitePlugin } from 'attr-styler';
import dns from 'dns';
import { regExpertVitePlugin } from 'regexpert';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as tsconf from './tsconfig.json';
import { vitePWAOptions } from './vite-pwa.options';

dns.setDefaultResultOrder('verbatim');

const tsConfig = { ...tsconf };

const alias: Record<string, string> = {};

Object.entries(tsConfig.compilerOptions.paths).forEach(([aliasKey, [path]]) => {
  alias[aliasKey.slice(0, -2)] = `/src${path.slice(1, -2)}`;
});

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
      target: 'es2020',
      // minify: 'esbuild',
      minify: false,
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              let file = [
                'react/',
                'react-dom/',
                'scheduler/',
                '@tanstack',
                '@emotion',
                '@radix-ui',
                'date-fns',
                'tone/',
              ].find(file => id.includes(`node_modules/${file}`));

              if (file) {
                if (file.startsWith('@')) file = file.slice(1);
                if (file.endsWith('/')) file = file.slice(0, -1);

                return `vendor-${file}`;
              }

              if (id.includes('node_modules/dexie/') || id.includes('node_modules/dexie-react-hooks/'))
                return 'vendor-dexie';

              return 'vendor-utils';
            }
          },
        },
      },
    },
    server: { port: 3627 },
    test: {
      globals: true,
      environment: 'jsdom',
      server: {
        deps: {
          inline: ['html-encoding-sniffer', 'jsdom'],
        },
      },
    },
    plugins: [
      regExpertVitePlugin(),
      TanStackRouterVite({ target: 'react', autoCodeSplitting: true, routesDirectory: 'src/front/routes' }),
      tsconfigPaths(),
      eslint({
        emitWarning: false,
        failOnError: true,
      }),
      VitePWA(vitePWAOptions),
      tailwindcss(),
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
      attrStylerVitePlugin({
        fileExtToAnalize: ['.css', '.scss', '.styler.ts'],
        prefixes: ['st-', 'com-letter-', 'com-word-'],
      }),
    ],
    resolve: { alias },
  };
});
