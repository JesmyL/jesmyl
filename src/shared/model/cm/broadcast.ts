import { CmComOrder } from '$cm/ext';

export type CmBroadcastMonolineSlide = {
  ord: CmComOrder;
  lines: string[];
  fromLinei: number;
  toLinei: number;
  textHash: string;
  repeats?: number;
};

export type CmBroadcastSlideLine = {
  ord: CmComOrder;
  line: string;
  blocki: number;
  linei: number;
  repeati: number;
  totalLinei: number;
};
