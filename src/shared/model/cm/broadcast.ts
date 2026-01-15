import { CmComOrder } from '$cm/ext';
import { CmComOrderWid } from 'shared/api';

export type CmBroadcastSlideGrouperKindSingleValue = CmBroadcastSlideGrouperOrdCombiner | number | string;

export type CmBroadcastSlideGrouperKindCombiner = { s?: string; n?: number; d: CmBroadcastSlideGrouperOrdCombiner };

export type CmBroadcastSlideGrouperKind = number | string | CmBroadcastSlideGrouperKindCombiner;

export type CmBroadcastSlideGrouperOrdCombiner = PRecord<CmComOrderWid, number>;

export type CmBroadcastGroupedSlide = {
  ord: CmComOrder;
  blocki: number;
  lines: string[];
  fromLinei: number;
  toLinei: number;
  preLinesCount: number;
  isLastSlide?: boolean;
};

export type CmBroadcastSlideGrouperOrdWithListAndRule = {
  ord: CmComOrder;
  lines: string[][];
  rule: number;
  defaultRule: number;
};
