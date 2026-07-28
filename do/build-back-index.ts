import { build } from 'esbuild';

export const buildBackIndexFile = async () => {
  return Promise.all(
    ['back.index', 'drizzle.schema', 'drizzle.config'].map(async fileName => {
      const filePath = `src/back/${fileName}`;
      const outfile = `${filePath}.cjs`;

      await build({
        entryPoints: [`${filePath}.ts`],
        outfile,
        bundle: true,
        minify: false,
        platform: 'node',
        format: 'cjs',
        keepNames: true,
        minifyWhitespace: true,
        // minifyIdentifiers: true,
        treeShaking: true,
        minifySyntax: true,

        charset: 'utf8',
        external: ['node-schedule', 'ws', 'postgres', 'drizzle-orm', 'drizzle-kit', './.env.json'],
        // drop: ['console', 'debugger'],
        dropLabels: ['DEV', 'TEST'],
      });

      return outfile;
    }),
  );
};
