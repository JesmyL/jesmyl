import { CmComOrder } from '$cm/ext';
import { CmComNewlinerLinei, CmComNewlinerRepeati, CmComOrderWid } from 'shared/api';

export type CmBroadcastMonolineSlideLineId =
  `${CmComNewlinerLinei}${`r${CmComNewlinerRepeati}` | ''}${`s${number}` | ''}`;
export type CmBroadcastMonolineSlideOrdId = `w${CmComOrderWid}l${CmBroadcastMonolineSlideLineId}`;

export type CmBroadcastMonolineSlide = {
  /** zero-samei technical id */
  _id: CmBroadcastMonolineSlideOrdId;
  /** unique slide id */
  id: CmBroadcastMonolineSlideOrdId;
  /** slide id includes in slide */
  ids: Set<CmBroadcastMonolineSlideOrdId>;
  /** first lead ord */
  ord: CmComOrder;
  /** slide text lines */
  lines: string[];
  /** order line index */
  linei: CmComNewlinerLinei;
  /** repeat order index */
  repeati: CmComNewlinerRepeati;
  /** same line divide index */
  samei: number;
  /** total from line index */
  fromLinei: number;
  /** total to line index */
  toLinei: number;
  /** technical field for calculating slide repeats */
  _textHash: string;
  /** repeats of same slides */
  repeats?: number;
};

export type CmBroadcastSlideLine = {
  ord: CmComOrder;
  line: string;
  blocki: number;
  linei: CmComNewlinerLinei;
  repeati: CmComNewlinerRepeati;
  totalLinei: number;
};
