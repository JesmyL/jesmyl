import { readdir, rename } from 'fs/promises';
import { dirname, extname, join } from 'path';
import { fileURLToPath } from 'url';
import { deployTheCode } from './deploy-the-code.mjs';
import { deployPathsDict, projectConfig } from './paths.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const baseDir = join(__dirname, 'src/back');

readdir(baseDir)
  .then(files => {
    files.forEach(async file => {
      const filePrefix = ['JESMYL_PRO', 'JESMYL_test_PRO'].find(
        prefix => file.startsWith(prefix) && file[prefix.length] !== '.',
      );

      if (filePrefix) {
        const oldPath = join(baseDir, file);
        const ext = extname(file);
        const newName = `${filePrefix}${ext}`;
        const newPath = join(baseDir, newName);

        await rename(oldPath, newPath);
        console.info(`Переименован: ${file} → ${newName}`);
      }
    });
  })
  .catch(error => console.error('Ошибка:', error.message));

deployTheCode(
  {
    builtFolder: 'build',
  },
  {
    targetDir: projectConfig.dns,
    loadToDirFiles: makePaths('./src/back', {
      ...deployPathsDict,

      './': [...(deployPathsDict['./'] || []), 'start.mjs', 'paths.mjs'],
    }),
  },
);

function makePaths(prefix, dict) {
  const newDict = {};
  const keyPostfix = !'is deploy case files' ? '/+case' : '';

  Object.keys(dict).forEach(key => {
    const replace = str => str.replace('#', key + keyPostfix).replace('~', prefix);

    newDict[key] = dict[key].map(replace);
  });

  return newDict;
}
