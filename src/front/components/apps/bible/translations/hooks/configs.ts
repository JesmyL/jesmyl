import { bibleIDB } from '$bible/basis/lib/store/bibleIDB';
import {
  defaultScreenTranslationBackgroundConfig,
  defaultScreenTranslationPositionConfig,
  defaultScreenTranslationTextConfig,
} from 'front/components/apps/+complect/translations/complect/defaults';
import {
  useMakeScreenTranslationConfigsFillPack,
  useScreenTranslationCurrentConfigi,
} from 'front/components/apps/+complect/translations/hooks/configs';
import { BibleTranslationScreenConfig } from '../model';

export const defaultBibleConfig: BibleTranslationScreenConfig = {
  ...defaultScreenTranslationTextConfig,
  ...defaultScreenTranslationBackgroundConfig,
  insertedtext: { color: '#ffffff', opacity: 0.7 },
  textinbrackets: { color: '#ffffff', display: 'none' },
  addressPanel: { height: 20, left: 0, top: 80, width: 100 },

  screen: defaultScreenTranslationPositionConfig,

  address: {
    ...defaultScreenTranslationPositionConfig,
    ...defaultScreenTranslationTextConfig,
    ...defaultScreenTranslationBackgroundConfig,
    isOnBottom: true,
  },
};

export const useBibleScreenTranslationConfigsSet = () => bibleIDB.useSet.translationScreenConfigs();
export const useBibleScreenTranslationConfigs = () =>
  useMakeScreenTranslationConfigsFillPack(bibleIDB.useValue.translationScreenConfigs(), defaultBibleConfig);

export const useBibleScreenTranslationConfig = (configi: number | und): BibleTranslationScreenConfig | und => {
  const configs = useBibleScreenTranslationConfigs();
  return configi === undefined ? undefined : configs[configi];
};

export const useBibleScreenTranslationCurrentConfig = (): BibleTranslationScreenConfig | und =>
  useBibleScreenTranslationConfigs()[useScreenTranslationCurrentConfigi()];
