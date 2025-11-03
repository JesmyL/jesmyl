import { deployTheCode } from './deploy-the-code.mjs';

deployTheCode(
  {
    builtFolder: 'build',
  },
  {
    targetDir: 'jesmyl.ru',
    loadToDirFiles: {
      'apps/cm': ['./src/back/apps/cm/*.json'],
      'apps/cm/coms': ['./src/back/apps/cm/coms/*.json'],
      'apps/bible': ['./src/back/apps/bible/*.json'],
      // 'apps/bible': ['./src/bibles/*.json'],
      'apps/index': ['./src/back/apps/index/*.json'],
      'apps/q': ['./src/back/apps/q/*.json'],
      'apps/storages/list': ['./src/back/apps/storages/list/*.json'],
    },
  },
);
