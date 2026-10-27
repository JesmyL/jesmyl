import { ScreenBroadcastTextConfig } from '#features/broadcast/complect/model';
import { PresentationSlide } from 'shared/api/tsjrpc.electtron/presentations';

export type PresentationBroadcastConfig = ScreenBroadcastTextConfig & {
  bgColor: string;
};

export type PresentationBroadcastLiveData = {
  slides: PresentationSlide[];
  slid: number;
  config: PresentationBroadcastConfig;
};
