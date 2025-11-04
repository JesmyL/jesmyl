import { deployTheCode } from './deploy-the-code.mjs';

deployTheCode(
  {
    builtFolder: 'build',
  },
  {
    targetDir: 'jesmyl.ru',
    loadToDirFiles: makePaths('./src/back', {
      'apps/cm': ['~/#/*.json'],
      'apps/cm/coms': ['~/#/*.json'],
      'apps/bible': ['~/#/*.json'],
      // 'apps/bible': ['./src/bibles/*.json'],
      'apps/index': ['~/#/*.json'],
      'apps/q': ['~/#/*.json'],
      'apps/storages/list': ['~/#/*.json'],
    }),
  },
);

function makePaths(prefix, dict) {
  const newDict = {};
  Object.keys(dict).forEach(key => {
    const replace = str => str.replace('#', key).replace('~', prefix);

    newDict[key] = dict[key].map(replace);
  });

  console.log(newDict);
  return newDict;
}
