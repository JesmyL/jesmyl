import { HorizontalDirection } from '#shared/model/Direction';
import { CmBroadcastShowChordedSlideMode } from '$cm/shared/model';
import { CmBroadcastScreenConfig } from '$cm/widgets/broadcast';
import { CmComWid } from 'shared/api';
import { CmBroadcastMonolineSlideOrdId } from 'shared/model/cm/broadcast';

export interface CmBroadcastSchWgtLiveDataValue {
  slideId: CmBroadcastMonolineSlideOrdId | nil;
  comw: CmComWid;
  fromLinei: number;
  toLinei: number;
  isChorded: boolean;
  isNextChorded: boolean;
  text: string | string[];
  nextText: string;
  config: CmBroadcastScreenConfig;
  dir: HorizontalDirection;
  chordedMode: CmBroadcastShowChordedSlideMode;
}
