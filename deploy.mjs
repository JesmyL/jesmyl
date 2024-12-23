import { deployTheCode } from './deploy-the-code.mjs';

deployTheCode(
  {
    builtFolder: 'build',
  },
  {
    targetDir: 'jesmyl.ru',
    loadToDirFiles: {
      'apps/cm': ['./src/back/apps/cm/*.json'],
      'apps/bible': ['./src/back/apps/bible/*.json'],
    },
  },
);
