import { CmComOrder } from '$cm/ext';
import { CmComOrderWid } from 'shared/api';

export type CmBroadcastSlideGrouperKindSingleValue = CmBroadcastSlideGrouperOrdCombiner | number | string;

export type CmBroadcastSlideGrouperKindCombiner = { s?: string; n?: number; d: CmBroadcastSlideGrouperOrdCombiner };

export type CmBroadcastSlideGrouperKind = number | string | CmBroadcastSlideGrouperKindCombiner;

export type CmBroadcastSlideGrouperOrdCombiner = PRecord<`${CmComOrderWid}${'' | `/${number}`}`, number>;

export type CmBroadcastMonolineSlide = {
  ord: CmComOrder;
  blocki: number;
  lines: string[];
  fromLinei: number;
  toLinei: number;
  isLastSlide?: boolean;
};

export type CmBroadcastGroupedSlide = {
  ord: CmComOrder;
  slides: CmBroadcastMonolineSlide[][];
  rule: number;
  defaultRule: number;
  repeat: '' | `/${number}`;
};
