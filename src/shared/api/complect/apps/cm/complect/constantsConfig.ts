import { CmComIntensityLevel } from './enums';

export interface CmConstantsConfig {
  maxFavouritesCount: number;
  maxAvailableComLineLength: number;
  maxSelectedComsCount: number;
  maxLaterComsVizitedCount: number;
  maxComCommentAlternativesCount: number;
  maxComCommentHeadLen: number;
  maxComCommentBlockLen: number;
  maxComCommentLineLen: number;
  maxComCommentWordLen: number;
  maxComCommentChordLen: number;
  showFragmentSlidesBelow: CmComIntensityLevel;
}
