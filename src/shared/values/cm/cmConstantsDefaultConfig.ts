import { CmComIntensityLevel, CmConstantsConfig } from 'shared/api';

export const cmConstantsDefaultConfig: CmConstantsConfig = {
  maxFavouritesCount: 30,
  maxAvailableComLineLength: 47,
  maxSelectedComsCount: 50,
  maxLaterComsVizitedCount: 4,
  maxComCommentAlternativesCount: 3,
  showFragmentSlidesBelow: CmComIntensityLevel.Medium,
};
