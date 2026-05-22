import { CmBroadcastMonolineSlide } from 'shared/model/cm/broadcast';

export type CmBroadcastSlidesContextState = {
  isDefault?: boolean;
  slides: CmBroadcastMonolineSlide[];
  html: string;
  nextHtml: string;
  currentSlidei: number;
  nextSlidei: number;
  toNextSlide: () => void;
  toPrevSlide: () => void;
  setSlidei: (nextSlidei: number) => void;
};
