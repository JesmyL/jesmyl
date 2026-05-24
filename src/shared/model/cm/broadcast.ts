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
  totalLinei: number;
  ordLinei: number;
  selfLinei: number;
  blocki: number;
};
