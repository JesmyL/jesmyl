import { ScreenBroadcastPositionConfig, ScreenBroadcastTextConfig } from '#features/broadcast/complect/model';
import { BackgroundConfigProps } from '#shared/ui/configurators/model';
import { CmComLineText, CmComNewlinerLinei, CmComNewlinerRepeati, CmComOrderWid } from 'shared/api';
import { CmComOrder } from 'shared/const/cm/order/Order';

export type CmBroadcastTextScreenConfig = ScreenBroadcastPositionConfig & ScreenBroadcastTextConfig;

export interface CmBroadcastScreenConfigSubConfigs {
  /** next slide config */
  next: CmBroadcastTextScreenConfig;
  /** chorded block slide config */
  chorded: CmBroadcastTextScreenConfig;
}

export interface CmBroadcastScreenConfig extends CmBroadcastTextScreenConfig, BackgroundConfigProps {
  subs?: Partial<CmBroadcastScreenConfigSubConfigs>;
}

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
  textHash: string;
  /** repeats of same slides */
  repeated?: { r: number };
  repeatsRemaining?: number;
};

export type CmBroadcastSlideLine = {
  ord: CmComOrder;
  line: CmComLineText;
  blocki: number;
  linei: CmComNewlinerLinei;
  repeati: CmComNewlinerRepeati;
  totalLinei: number;
};

export type CmComNewlinerSymbolFreeUpperCaseLine = `_${Uppercase<CmComLineText>}`;
