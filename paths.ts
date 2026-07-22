import { hostConfigFileName } from './freshHostConfig';
import { deployPathsBasicDict } from './paths.basic';

export const deployPathsDict: Record<string, string[]> = {
  '': [hostConfigFileName, 'hostConfig.mjs'],
  ...deployPathsBasicDict,

  ...{
    // 'apps/bible': ['./src/bibles/*.json'],
    // 'apps/index': ['~/#/*.json', '~/#/*.secure', '~/#/emailTextingLetterVariants'],
  },
};
