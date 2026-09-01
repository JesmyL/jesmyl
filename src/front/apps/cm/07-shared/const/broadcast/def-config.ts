import {
  defaultScreenBroadcastBackgroundConfig,
  defaultScreenBroadcastPositionConfig,
  defaultScreenBroadcastTextConfig,
} from '#features/broadcast/complect/defaults';
import { BackgroundConfigProps } from '#shared/ui/configurators/model';
import { CmBroadcastScreenConfig } from 'shared/model/cm/broadcast';

export const cmBroadcastDefaultConfig: CmBroadcastScreenConfig & BackgroundConfigProps = {
  ...defaultScreenBroadcastPositionConfig,
  ...defaultScreenBroadcastTextConfig,
  ...defaultScreenBroadcastBackgroundConfig,
  withBg: false,
};
