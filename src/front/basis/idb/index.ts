import { DexieDB } from '#shared/lib/_DexieDB';
import { defaultComplectConfig } from '../../components/apps/+complect/translations/atoms';
import { ComplectStore } from './model';

export const complectIDB = new DexieDB<ComplectStore>('complect', {
  alertLineConfigs: {
    id: '++',
  },
  isReverseTheme: { $byDefault: true },
  currentTranslationTextApp: { $byDefault: 'cm' },
  translationAlertLine: { $byDefault: null },
  screenTranslationConfigs: { $byDefault: [defaultComplectConfig] },
  expands: { $byDefault: new Set() },
});
