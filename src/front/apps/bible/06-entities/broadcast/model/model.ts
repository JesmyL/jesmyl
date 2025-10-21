import {
  ScreenBroadcastPositionConfig,
  ScreenBroadcastSimpleTextConfig,
  ScreenBroadcastTextConfig,
} from '#features/broadcast/complect/model';
import { BackgroundConfigProps } from '#shared/ui/configurators/model';

export interface BibleBroadcastScreenConfig extends BackgroundConfigProps, ScreenBroadcastTextConfig {
  addressPanel: ScreenBroadcastPositionConfig;

  screen: ScreenBroadcastPositionConfig;

  insertedtext?: ScreenBroadcastSimpleTextConfig;
  textinbrackets?: ScreenBroadcastSimpleTextConfig;
  godswords?: ScreenBroadcastSimpleTextConfig;

  address: {
    isOnBottom: boolean;
  } & BackgroundConfigProps &
    ScreenBroadcastPositionConfig &
    ScreenBroadcastTextConfig;
}
