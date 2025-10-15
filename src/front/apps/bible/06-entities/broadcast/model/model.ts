import {
  ScreenTranslationPositionConfig,
  ScreenTranslationSimpleTextConfig,
  ScreenTranslationTextConfig,
} from '#features/broadcast/complect/model';
import { BackgroundConfigProps } from '#shared/ui/configurators/model';

export interface BibleBroadcastScreenConfig extends BackgroundConfigProps, ScreenTranslationTextConfig {
  addressPanel: ScreenTranslationPositionConfig;

  screen: ScreenTranslationPositionConfig;

  insertedtext?: ScreenTranslationSimpleTextConfig;
  textinbrackets?: ScreenTranslationSimpleTextConfig;
  godswords?: ScreenTranslationSimpleTextConfig;

  address: {
    isOnBottom: boolean;
  } & BackgroundConfigProps &
    ScreenTranslationPositionConfig &
    ScreenTranslationTextConfig;
}
