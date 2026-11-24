import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { attrStylerVitePlugin } from 'attr-styler';
import dns from 'dns';
import { readFileSync } from 'fs';
import { regExpertVitePlugin } from 'regexpert';
import { createLogger, defineConfig, loadEnv, Plugin } from 'vite';
import eslint from 'vite-plugin-eslint';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';
import { configDefaults } from 'vitest/config';
import { constEnumVitePlugin } from './do/vite-plugin-const-enums';
import * as tsconf from './tsconfig.json';
import { vitePWAOptions } from './vite-pwa.options';

dns.setDefaultResultOrder('verbatim');

const devLogger = createLogger();
const logViteError = devLogger.error.bind(devLogger);

devLogger.error = (message, options) => {
  const error = options?.error;
  const isDeadProxyError =
    error != null &&
    message.includes('proxy') &&
    (error.message.includes('ECONNREFUSED') || error.message.includes('ECONNRESET'));

  if (isDeadProxyError) return;

  logViteError(message, options);
};

const tsConfig = { ...tsconf };

const pultAssetsVersion = (JSON.parse(readFileSync('src/shared/values/+version.json', 'utf-8')) as { num: number }).num;

const emitPultAssets = (): Plugin => ({
  name: 'emit-pult-assets',
  generateBundle(_options, bundle) {
    const entryChunk = Object.values(bundle).find(item => {
      return item.type === 'chunk' && item.isEntry && item.name === 'pult';
    });

    if (entryChunk?.type !== 'chunk') return;

    const files = new Set<string>(['/pult.html']);
    const pendingChunks = [entryChunk];

    while (pendingChunks.length > 0) {
      const chunk = pendingChunks.pop();
      if (chunk == null || files.has(`/${chunk.fileName}`)) continue;

      files.add(`/${chunk.fileName}`);

      for (const fileName of [...chunk.imports, ...chunk.dynamicImports]) {
        const imported = bundle[fileName];
        if (imported?.type === 'chunk') pendingChunks.push(imported);
      }

      for (const fileName of chunk.viteMetadata?.importedCss ?? []) files.add(`/${fileName}`);
      for (const fileName of chunk.viteMetadata?.importedAssets ?? []) files.add(`/${fileName}`);
    }

    this.emitFile({
      type: 'asset',
      fileName: 'pult-assets.json',
      source: JSON.stringify({ version: pultAssetsVersion, files: Array.from(files) }),
    });
  },
});

const stripPwaFromPult = (): Plugin => ({
  name: 'strip-pwa-from-pult',
  enforce: 'post',
  transformIndexHtml: {
    order: 'post',
    handler(html, ctx) {
      if (!ctx.filename.endsWith('pult.html')) return html;

      return html
        .replace(/<link rel="manifest"[^>]*>/g, '')
        .replace(/<script id="vite-plugin-pwa:[^"]*"[^>]*><\/script>/g, '');
    },
  },
});

const alias: Record<string, string> = {};

Object.entries(tsConfig.compilerOptions.paths).forEach(([aliasKey, [path]]) => {
  const isGlob = aliasKey.endsWith('/*');

  alias[isGlob ? aliasKey.slice(0, -2) : aliasKey] = isGlob ? `/src${path.slice(1, -2)}` : `/src${path.slice(1)}`;
});

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isHttps = env.VITE_IS_HTTPS === '1';

  return {
    customLogger: devLogger,
    esbuild: {
      pure: ['console.log'],
      legalComments: 'none',
    },
    build: {
      outDir: 'build',
      target: 'es2020',
      minify: 'esbuild',
      cssMinify: true,
      sourcemap: false,
      rollupOptions: {
        input: {
          main: 'index.html',
          pult: 'pult.html',
        },
        output: {
          chunkFileNames(chunkInfo) {
            // The entry chunk must always be pre-cached: a static import pulling editor
            // modules into it would otherwise prefix it and silently drop the app shell
            // from the manifest (which filters `cm-edit-`).
            if (chunkInfo.isEntry) return 'assets/[name]-[hash].js';

            const isCmEditorChunk = chunkInfo.moduleIds.some(
              id => id.includes('apps/cm+editor/') || id.includes('routes/tree/cm/edit/'),
            );

            return `assets/${isCmEditorChunk ? 'cm-edit-' : ''}[name]-[hash].js`;
          },
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

                return `v-${file}`;
              }

              if (id.includes('node_modules/dexie/') || id.includes('node_modules/dexie-react-hooks/')) return 'v-dx';

              return 'v-u';
            }
          },
        },
      },
    },
    server: {
      port: 3627,
      host: true,
      cors: true,
      ...(isHttps && {
        https: {
          key: readFileSync('src/back/dev-certs/privkey.pem'),
          cert: readFileSync('src/back/dev-certs/fullchain.pem'),
        },
      }),
      ...(command === 'serve' && {
        proxy: {
          '/remote': {
            target: `ws://localhost:${env.REMOTE_BROADCAST_DEV_PORT || 4738}`,
            ws: true,
            bypass: (_request, response) => (response == null ? undefined : '/index.html'),
          },
        },
      }),
    },
    test: {
      globals: true,
      environment: 'jsdom',
      server: {
        deps: {
          inline: ['html-encoding-sniffer', 'jsdom'],
        },
      },
      exclude: [...configDefaults.exclude, 'src/electron-app/**'],
    },
    plugins: [
      constEnumVitePlugin(),
      regExpertVitePlugin(),
      TanStackRouterVite({
        target: 'react',
        autoCodeSplitting: true,
        routesDirectory: 'src/front/routes/tree/',
        generatedRouteTree: 'src/front/routes/routeTree.gen.ts',
      }),
      tsconfigPaths(),
      eslint({
        emitWarning: false,
        failOnError: true,
      }),
      VitePWA(vitePWAOptions),
      emitPultAssets(),
      stripPwaFromPult(),
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
