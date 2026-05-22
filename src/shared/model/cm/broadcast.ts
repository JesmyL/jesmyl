import { CmComOrder } from '$cm/ext';

export type CmBroadcastMonolineSlide = {
  ord: CmComOrder;
  lines: string[];
  fromLinei: number;
  toLinei: number;
  isLastSlide?: boolean;
};

export type CmBroadcastSlideLine = {
  ord: CmComOrder;
  line: string;
  totalLinei: number;
  ordLinei: number;
  blocki: number;
};
