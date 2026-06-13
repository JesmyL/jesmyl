import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { deployTheCode } from './deploy-the-code.mjs';
import { hostConfig } from './hostConfig.mjs';
import { deployPathsDict } from './paths.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const baseDir = join(__dirname, 'src/back');

deployTheCode(
  {
    builtFolder: 'build',
  },
  {
    targetDir: hostConfig.host,
    loadToDirFiles: makePaths('./src/back', {
      ...deployPathsDict,

      '': [...(deployPathsDict[''] || []), 'start.mjs', 'paths.mjs'],
    }),
  },
);

function makePaths(prefix, dict) {
  const newDict = {};
  const keyPostfix = hostConfig.isUpdateAllStarts ? '/+case' : '';

  Object.keys(dict).forEach(key => {
    const replace = str => str.replace('#', key + keyPostfix).replace('~', prefix);

    newDict[key] = dict[key].map(replace);
  });

  return newDict;
}
