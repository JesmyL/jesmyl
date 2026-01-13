import { CmComOrder } from '$cm/ext';
import { CmComOrderWid } from 'shared/api';

export type CmBroadcastSlideGrouperKindSingleValue = CmBroadcastSlideGrouperOrdCombiner | number | string;

export type CmBroadcastSlideGrouperKindCombiner = { s?: string; n?: number; d: CmBroadcastSlideGrouperOrdCombiner };

export type CmBroadcastSlideGrouperKind = number | string | CmBroadcastSlideGrouperKindCombiner;

export type CmBroadcastSlideGrouperOrdCombiner = PRecord<CmComOrderWid, number>;

export type CmBroadcastSlideGrouperOrdWithList = {
  ord: CmComOrder;
  list: string[];
  isLastSlide?: boolean;
}[];

export type CmBroadcastSlideGrouperLinesDiapason = {
  ord: CmComOrder;
  lines: string[];
  toLinei: number;
  fromLinei: number;
  preLinesCount: number;
  blocki: number;
};

export type CmBroadcastSlideGrouperOrdWithListAndRule = {
  ord: CmComOrder;
  list: string[][];
  rule: number;
  defaultRule: number;
};
