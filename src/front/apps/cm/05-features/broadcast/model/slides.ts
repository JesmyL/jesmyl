import { CmBroadcastMonolineSlide, CmBroadcastMonolineSlideOrdId } from 'shared/model/cm/broadcast';

export type CmBroadcastSlidesContextState = {
  slides: CmBroadcastMonolineSlide[];
  html: string;
  nextHtml: string;
  hash: string;
  slidei: number;
  slideId?: CmBroadcastMonolineSlideOrdId | nil;
  nextSlidei: number;
  toSlide: (dir: 1 | -1) => void;
  setSlidei: (newSlidei: number) => void;
};
