import { build } from 'esbuild';

export const buildBackIndexFile = async () => {
  const filePath = 'src/back/back.index';

  await build({
    entryPoints: [`${filePath}.ts`],
    outfile: `${filePath}.js`,
    bundle: true,
    minify: false,
    platform: 'node',
    format: 'cjs',
    keepNames: true,
    minifyWhitespace: true,
    // minifyIdentifiers: true,
    treeShaking: true,

    charset: 'utf8',
    external: ['node-schedule', 'ws', '@prisma/client', '.prisma/client', 'MyLib'],
    // drop: ['console', 'debugger'],
    dropLabels: ['DEV', 'TEST'],
  });

  return filePath;
};
