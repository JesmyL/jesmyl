import fs from 'fs';
import md5 from 'md5';
import { hostConfig } from '../freshHostConfig';
import { deployPathsDict } from '../paths';
import { deployTheCode } from './deploy-the-code';

// create this file manually
import * as secret from './secret.json';

fs.writeFileSync('./do/secret.md5.json', JSON.stringify({ md5ecret: md5(secret.secret) }, null, 2));

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

function makePaths(prefix: string, dict: Record<string, string[]>) {
  const newDict: Record<string, string[]> = {};
  const keyPostfix = hostConfig.isUpdateAllStarts ? '/+case' : '';

  Object.keys(dict).forEach(key => {
    const replace = (str: string) => str.replace('#', key + keyPostfix).replace('~', prefix);

    newDict[key] = dict[key].map(replace);
  });

  return newDict;
}
