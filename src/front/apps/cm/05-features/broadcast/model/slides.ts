import { CmBroadcastMonolineSlide, CmBroadcastMonolineSlideOrdId } from 'shared/model/cm/broadcast';

export type CmBroadcastSlidesContextState = {
  slides: CmBroadcastMonolineSlide[];
  html: string;
  nextHtml: string;
  slidei: number;
  slideId: CmBroadcastMonolineSlideOrdId;
  nextSlidei: number;
  toSlide: (dir: 1 | -1) => void;
  setSlidei: (newSlidei: number) => void;
};
