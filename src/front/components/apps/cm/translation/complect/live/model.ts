import { CmComWid } from 'shared/api';
import { CmTranslationScreenConfig } from '../controlled/model';

export interface CmSchWTranslationLiveDataValue {
  texti: number;
  comw: CmComWid;
  fromLinei: number;
  toLinei: number;
  text: string;
  nextText: string;
  config: CmTranslationScreenConfig;
}
