import { CmBroadcastMonolineSlide, CmBroadcastMonolineSlideOrdStrId } from 'shared/model/cm/broadcast';

export type CmBroadcastSlidesContextState = {
  slides: CmBroadcastMonolineSlide[];
  html: string;
  nextHtml: string;
  hash: string;
  slidei: number;
  slideId?: CmBroadcastMonolineSlideOrdStrId | nil;
  nextSlidei: number;
  toSlide: (dir: 1 | -1) => void;
  setSlidei: (newSlidei: number) => void;
};
