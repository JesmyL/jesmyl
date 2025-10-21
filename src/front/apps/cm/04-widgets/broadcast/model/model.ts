import { ScreenBroadcastPositionConfig, ScreenBroadcastTextConfig } from '#features/broadcast/complect/model';
import { BackgroundConfigProps } from '#shared/ui/configurators/model';

export type CmBroadcastTextScreenConfig = ScreenBroadcastPositionConfig & ScreenBroadcastTextConfig;

export interface CmBroadcastScreenConfig extends CmBroadcastTextScreenConfig, BackgroundConfigProps {
  subs?: Partial<Record<'next', CmBroadcastTextScreenConfig>>;
  pushKind?: number;
}
