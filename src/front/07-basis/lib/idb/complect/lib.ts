import { DexieDB } from 'front/08-shared/lib/_DexieDB';
import { defaultComplectConfig } from 'front/components/apps/+complect/translations/atoms';
import { ComplectIDBStore } from './model';

export const complectIDB = new DexieDB<ComplectIDBStore>('complect', {
  alertLineConfigs: {
    id: '++',
  },
  isReverseTheme: { $byDefault: true },
  currentTranslationTextApp: { $byDefault: 'cm' },
  translationAlertLine: { $byDefault: null },
  screenTranslationConfigs: { $byDefault: [defaultComplectConfig] },
  expands: { $byDefault: new Set() },
});
