import { CmTranslationScreenConfig } from '$cm/widgets/translation';
import { CmComWid } from 'shared/api';

export interface CmTranslationSchWgtLiveDataValue {
  texti: number;
  comw: CmComWid;
  fromLinei: number;
  toLinei: number;
  text: string;
  nextText: string;
  config: CmTranslationScreenConfig;
}
