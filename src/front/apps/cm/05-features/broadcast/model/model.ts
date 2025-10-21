import { CmBroadcastScreenConfig } from '$cm/widgets/broadcast';
import { CmComWid } from 'shared/api';

export interface CmBroadcastSchWgtLiveDataValue {
  texti: number;
  comw: CmComWid;
  fromLinei: number;
  toLinei: number;
  text: string;
  nextText: string;
  config: CmBroadcastScreenConfig;
}
