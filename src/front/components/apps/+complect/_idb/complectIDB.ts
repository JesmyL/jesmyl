import { DexieDB } from '#shared/lib/_DexieDB';
import { defaultComplectConfig } from '../translations/atoms';
import { AlertLineConfig, ScreenTranslationConfig } from '../translations/model';
import { TranslationViewApp } from '../translations/Translations.model';

type Store = {
  alertLineConfigs: AlertLineConfig[];
  isReverseTheme: boolean;
  currentTranslationTextApp: TranslationViewApp;
  translationAlertLine: null | string;
  screenTranslationConfigs: ScreenTranslationConfig[];
  expands: Set<string>;
};

export const complectIDB = new DexieDB<Store>('complect', {
  alertLineConfigs: {
    id: '++',
  },
  isReverseTheme: { $byDefault: true },
  currentTranslationTextApp: { $byDefault: 'cm' },
  translationAlertLine: { $byDefault: null },
  screenTranslationConfigs: { $byDefault: [defaultComplectConfig] },
  expands: { $byDefault: new Set() },
});
