import { hostConfig, hostConfigFileName } from './freshHostConfig';
import { deployPathsBasicDict } from './paths.basic';

export const deployPathsDict: Record<string, string[]> = {
  '': [hostConfigFileName, 'hostConfig.mjs'],

  ...(hostConfig.isUpdateAllStarts
    ? {
        ...deployPathsBasicDict,
        'apps/bible': ['./src/bibles/*.json'],
        'apps/index': ['~/#/*.json', '~/#/*.secure', '~/#/emailTextingLetterVariants'],
      }
    : deployPathsBasicDict),
};
