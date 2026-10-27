import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/electron-app/src/main.ts', 'src/electron-app/src/preload.ts'],
  outDir: 'src/electron-app/dist',
  format: ['cjs'],
  splitting: false,
  sourcemap: false,
  clean: true,

  treeshake: true,
  minify: true,
  external: ['electron', 'electron-updater'],
  // Root-only packages must be bundled: the packaged app ships only src/electron-app/node_modules.
  noExternal: ['tsjrpc', 'regexpert', 'md5', 'pptxtojson'],
});
