import { hostConfig, hostConfigFileName } from './hostConfig.mjs';

export const deployPathsDict = {
  '': [hostConfigFileName, 'hostConfig.mjs'],

  ...(hostConfig.isUpdateAllStarts
    ? {
        'apps/bible': ['./src/bibles/*.json'],
        'apps/index': ['~/#/*.json', '~/#/*.secure', '~/#/emailTextingLetterVariants'],
      }
    : {}),

  'apps/cm': ['~/#/*.json'],
  'apps/cm/coms': ['~/#/*.json'],
  'apps/cm/comComments': ['~/#/*.json'],
  'apps/index': ['~/#/*.json'],
  'apps/index/schedules': ['~/#/*.json'],
  'apps/q': ['~/#/*.json'],
  'apps/q/blanks': ['~/#/*.json'],
  'apps/storages/list': ['~/#/*.json'],
};
