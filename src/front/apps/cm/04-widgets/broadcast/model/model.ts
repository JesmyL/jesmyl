import { ScreenBroadcastPositionConfig, ScreenBroadcastTextConfig } from '#features/broadcast/complect/model';
import { BackgroundConfigProps } from '#shared/ui/configurators/model';
import { CmBroadcastSlideGrouperKind } from 'shared/model/cm/broadcast';

export type CmBroadcastTextScreenConfig = ScreenBroadcastPositionConfig & ScreenBroadcastTextConfig;

export interface CmBroadcastScreenConfigSubConfigs {
  /** next slide config */
  next: CmBroadcastTextScreenConfig;
  /** chorded block slide config */
  chorded: CmBroadcastTextScreenConfig;
}

export interface CmBroadcastScreenConfig extends CmBroadcastTextScreenConfig, BackgroundConfigProps {
  subs?: Partial<CmBroadcastScreenConfigSubConfigs>;
  pushKind?: CmBroadcastSlideGrouperKind;
}
