import { AlertLineConfig, ScreenTranslationConfig } from 'front/widgets/translations/model/Configs.model';
import { TranslationViewApp } from 'front/widgets/translations/model/Translations.model';

export type ComplectStore = {
  alertLineConfigs: AlertLineConfig[];
  isReverseTheme: boolean;
  currentTranslationTextApp: TranslationViewApp;
  translationAlertLine: null | string;
  screenTranslationConfigs: ScreenTranslationConfig[];
  expands: Set<string>;
};
