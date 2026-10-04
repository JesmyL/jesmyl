import { build } from 'esbuild';

export const buildBackIndexFile = async () => {
  return Promise.all(
    [
      'back.index.cjs',
      'drizzle.schema.cjs',
      'drizzle.config.cjs',
      // 'initializeBack.cjs',
      '/paths.basic.mjs',
      '/paths.mjs',
    ].map(async fileName => {
      const outfile = fileName.startsWith('/') ? fileName.slice(1) : `src/back/${fileName}`;

      await build({
        entryPoints: [`${outfile.slice(0, -4)}.ts`],
        outfile,
        bundle: true,
        minify: false,
        platform: 'node',
        format: fileName.endsWith('.mjs') ? 'esm' : 'cjs',
        keepNames: true,
        minifyWhitespace: true,
        treeShaking: true,
        minifySyntax: true,

        charset: 'utf8',
        external: ['node-schedule', 'ws', 'postgres', 'drizzle-orm', 'drizzle-kit', './.env.json'],
        dropLabels: ['DEV', 'TEST'],
      });

      return outfile;
    }),
  );
};
