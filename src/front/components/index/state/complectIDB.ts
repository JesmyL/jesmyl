import { defaultComplectConfig } from '#features/translations/consts';
import { AlertLineConfig, ScreenTranslationConfig } from '#features/translations/model';
import { TranslationViewApp } from '#features/translations/Translations.model';
import { DexieDB } from '#shared/lib/DexieDB';

type Store = {
  alertLineConfigs: AlertLineConfig[];
  isDarkMode: boolean;
  currentTranslationTextApp: TranslationViewApp;
  translationAlertLine: null | string;
  screenTranslationConfigs: ScreenTranslationConfig[];
  expands: Set<string>;
};

export const complectIDB = new DexieDB<Store>('complect', {
  alertLineConfigs: { id: '++' },
  isDarkMode: { $byDefault: false },
  currentTranslationTextApp: { $byDefault: 'cm' },
  translationAlertLine: { $byDefault: null },
  screenTranslationConfigs: { $byDefault: [defaultComplectConfig] },
  expands: { $byDefault: new Set() },
});
