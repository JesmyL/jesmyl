import { CmBroadcastMonolineSlide, CmBroadcastMonolineSlideOrdId } from 'shared/model/cm/broadcast';

export type CmBroadcastSlidesContextState = {
  slides: CmBroadcastMonolineSlide[];
  html: string;
  nextHtml: string;
  slidei: number;
  slideId: CmBroadcastMonolineSlideOrdId;
  nextSlidei: number;
  toNextSlide: () => void;
  toPrevSlide: () => void;
  setSlidei: (nextSlidei: number) => void;
};
