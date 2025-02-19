import { AlertLineConfig, ScreenTranslationConfig } from 'front/components/apps/+complect/translations/model';
import { TranslationViewApp } from 'front/components/apps/+complect/translations/Translations.model';

export type ComplectStore = {
  alertLineConfigs: AlertLineConfig[];
  isReverseTheme: boolean;
  currentTranslationTextApp: TranslationViewApp;
  translationAlertLine: null | string;
  screenTranslationConfigs: ScreenTranslationConfig[];
  expands: Set<string>;
};
