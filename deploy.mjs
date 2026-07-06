import { deployTheCode } from './deploy-the-code.mjs';
import { hostConfig } from './hostConfig.mjs';
import { deployPathsDict } from './paths.mjs';

deployTheCode(
  {
    builtFolder: 'build',
  },
  {
    targetDir: hostConfig.host,
    loadToDirFiles: makePaths('./src/back', {
      ...deployPathsDict,

      '': [...(deployPathsDict[''] || []), 'paths.mjs', 'paths.basic.mjs', '~/#root-orientir.js'],
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
