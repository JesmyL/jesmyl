import { CmBroadcastShowChordedSlideMode } from '#shared/model/cm/Cm.model';
import { HorizontalDirection } from '#shared/model/Direction';
import { CmComWid } from 'shared/api';
import { CmBroadcastMonolineSlideOrdId, CmBroadcastScreenConfig } from 'shared/model/cm/broadcast';

export interface CmBroadcastSchWgtLiveDataValue {
  slideId: CmBroadcastMonolineSlideOrdId | nil;
  comw: CmComWid;
  fromLinei: number;
  toLinei: number;
  isChorded: boolean;
  isNextChorded: boolean;
  /** @deprecated */
  text: string | string[];
  html: string | string[];
  hash: string;
  nextText: string;
  config: CmBroadcastScreenConfig;
  dir: HorizontalDirection;
  chordedMode: CmBroadcastShowChordedSlideMode;
}
