import {
  ScreenTranslationPositionConfig,
  ScreenTranslationSimpleTextConfig,
  ScreenTranslationTextConfig,
} from '#features/translations/model/Position.model';
import { BackgroundConfigProps } from '#shared/ui/configurators/model';

export interface BibleTranslationScreenConfig extends BackgroundConfigProps, ScreenTranslationTextConfig {
  addressPanel: ScreenTranslationPositionConfig;

  screen: ScreenTranslationPositionConfig;

  insertedtext?: ScreenTranslationSimpleTextConfig;
  textinbrackets?: ScreenTranslationSimpleTextConfig;

  address: {
    isOnBottom: boolean;
  } & BackgroundConfigProps &
    ScreenTranslationPositionConfig &
    ScreenTranslationTextConfig;
}
