import { BackgroundConfigProps } from '#shared/ui/configurators/model';
import {
  ScreenTranslationPositionConfig,
  ScreenTranslationSimpleTextConfig,
  ScreenTranslationTextConfig,
} from '../../+complect/translations/complect/model';

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
