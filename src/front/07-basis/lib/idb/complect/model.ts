import { TranslationViewApp } from '#basis/model/Translations.model';
import { AlertLineConfig, ScreenTranslationConfig } from 'front/components/apps/+complect/translations/model';

export type ComplectIDBStore = {
  alertLineConfigs: AlertLineConfig[];
  isReverseTheme: boolean;
  currentTranslationTextApp: TranslationViewApp;
  translationAlertLine: null | string;
  screenTranslationConfigs: ScreenTranslationConfig[];
  expands: Set<string>;
};
