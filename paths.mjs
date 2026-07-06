import { hostConfig, hostConfigFileName } from './hostConfig.mjs';
import { deployPathsBasicDict } from './paths.basic.mjs';

export const deployPathsDict = {
  '': [hostConfigFileName, 'hostConfig.mjs'],

  ...(hostConfig.isUpdateAllStarts
    ? {
        'apps/bible': ['./src/bibles/*.json'],
        'apps/index': ['~/#/*.json', '~/#/*.secure', '~/#/emailTextingLetterVariants'],
        ...deployPathsBasicDict,
      }
    : deployPathsBasicDict),
};
