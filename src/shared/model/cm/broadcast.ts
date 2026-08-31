import { ScreenBroadcastPositionConfig, ScreenBroadcastTextConfig } from '#features/broadcast/complect/model';
import { BackgroundConfigProps } from '#shared/ui/configurators/model';
import { CmComLineText, CmComLinei, CmComNewlinerRepeati, CmComNewlinerSamei, CmComOrderWid } from 'shared/api';
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

export type CmBroadcastMonolineSlideOrdStrId =
  `w${CmComOrderWid}l${CmComLinei}${`r${CmComNewlinerRepeati}` | ''}${`s${CmComNewlinerSamei}` | ''}`;

export type CmBroadcastMonolineSlideSelectorId =
  | CmBroadcastMonolineSlideOrdSelectorId
  | CmBroadcastMonolineSlideLineSelectorId
  | CmBroadcastMonolineSlideRepeatSelectorId
  | CmBroadcastMonolineSlideSameSelectorId;

export type CmBroadcastMonolineSlideOrdSelectorId = [CmComOrderWid];

export type CmBroadcastMonolineSlideLineSelectorId =
  CmBroadcastMonolineSlideOrdSelectorId | [CmComOrderWid, CmComLinei];

export type CmBroadcastMonolineSlideRepeatSelectorId =
  CmBroadcastMonolineSlideLineSelectorId | [CmComOrderWid, CmComLinei, CmComNewlinerRepeati];

export type CmBroadcastMonolineSlideSameSelectorId =
  CmBroadcastMonolineSlideRepeatSelectorId | [CmComOrderWid, CmComLinei, CmComNewlinerRepeati, CmComNewlinerSamei];

export type CmBroadcastMonolineSlide = {
  /** zero-samei technical id */
  _id: CmBroadcastMonolineSlideOrdStrId;
  /** unique slide id */
  id: CmBroadcastMonolineSlideOrdStrId;
  /** slide id includes in slide */
  ids: Set<CmBroadcastMonolineSlideOrdStrId>;
  /** first lead ord */
  ord: CmComOrder;
  /** slide text lines */
  lines: string[];
  /** repeated text */
  text: string;
  /** order line index */
  linei: CmComLinei;
  /** repeat order index */
  repeati: CmComNewlinerRepeati;
  /** same line divide index */
  samei: CmComNewlinerSamei;
  /** total from line index */
  fromLinei: CmComLinei;
  /** total to line index */
  toLinei: CmComLinei;
  minText?: string;
  /** repeats of same slides */
  r?: { r: number };
  /** repeats remaining */
  rem?: number;
};

export type CmBroadcastSlideLine = {
  ord: CmComOrder;
  line: CmComLineText;
  blocki: number;
  linei: CmComLinei;
  repeati: CmComNewlinerRepeati;
  totalLinei: CmComLinei;
};

export type CmComNewlinerSymbolFreeUpperCaseLine = `_${Uppercase<CmComLineText>}`;
