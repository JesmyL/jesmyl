import { readdir, rename } from 'fs/promises';
import { dirname, extname, join } from 'path';
import { fileURLToPath } from 'url';
import { deployTheCode } from './deploy-the-code.mjs';

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
        console.log(`Переименован: ${file} → ${newName}`);
      }
    });
  })
  .catch(error => console.error('Ошибка:', error.message));

deployTheCode(
  {
    builtFolder: 'build',
  },
  {
    targetDir: 'jesmyl.ru',
    loadToDirFiles: makePaths('./src/back', {
      // down: ['~/*.exe'],
      // './down': ['~/*.AppImage'],
      // 'apps/bible': ['./src/bibles/*.json'],

      'apps/cm': ['~/#/*.json'],
      'apps/cm/coms': ['~/#/*.json'],
      'apps/cm/comComments': ['~/#/*.json'],
      'apps/bible': ['~/#/*.json'],
      'apps/index': ['~/#/*.json'],
      'apps/q': ['~/#/*.json'],
      'apps/q/blanks': ['~/#/*.json'],
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

  return newDict;
}
