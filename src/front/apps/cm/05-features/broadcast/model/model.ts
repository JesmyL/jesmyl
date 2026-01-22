import { HorizontalDirection } from '#shared/model/Direction';
import { CmBroadcastScreenConfig } from '$cm/widgets/broadcast';
import { CmComWid } from 'shared/api';

export interface CmBroadcastSchWgtLiveDataValue {
  slidei: number;
  comw: CmComWid;
  fromLinei: number;
  toLinei: number;
  isChorded: boolean;
  isNextChorded: boolean;
  text: string;
  nextText: string;
  config: CmBroadcastScreenConfig;
  dir: HorizontalDirection;
  isForceSlideMode?: boolean;
}
