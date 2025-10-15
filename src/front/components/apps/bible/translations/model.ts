import { BackgroundConfigProps } from '#shared/ui/configurators/model';
import {
  ScreenTranslationPositionConfig,
  ScreenTranslationSimpleTextConfig,
  ScreenTranslationTextConfig,
} from '../../../../features/translations/complect/model';

export interface BibleTranslationScreenConfig extends BackgroundConfigProps, ScreenTranslationTextConfig {
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
