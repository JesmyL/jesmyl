import {
  defaultScreenTranslationBackgroundConfig,
  defaultScreenTranslationPositionConfig,
  defaultScreenTranslationTextConfig,
} from '#features/broadcast/complect/defaults';
import {
  useMakeScreenTranslationConfigsFillPack,
  useScreenTranslationCurrentConfigi,
} from '#features/broadcast/hooks/configs';
import { bibleIDB } from '$bible/shared/state/bibleIDB';
import { BibleBroadcastScreenConfig } from '../model/model';

export const bibleBroadcastDefaultConfig: BibleBroadcastScreenConfig = {
  ...defaultScreenTranslationTextConfig,
  ...defaultScreenTranslationBackgroundConfig,
  insertedtext: { color: '#ffffff', opacity: 0.7 },
  textinbrackets: { color: '#ffffff', display: 'none' },
  godswords: { color: '#ffffff', display: 'none' },
  addressPanel: { height: 20, left: 0, top: 80, width: 100 },

  screen: defaultScreenTranslationPositionConfig,

  address: {
    ...defaultScreenTranslationPositionConfig,
    ...defaultScreenTranslationTextConfig,
    ...defaultScreenTranslationBackgroundConfig,
    isOnBottom: true,
  },
};

export const useBibleBroadcastScreenConfigsSet = () => bibleIDB.useSet.translationScreenConfigs();
export const useBibleBroadcastScreenConfigs = () =>
  useMakeScreenTranslationConfigsFillPack(bibleIDB.useValue.translationScreenConfigs(), bibleBroadcastDefaultConfig);

export const useBibleBroadcastScreenConfig = (configi: number | und): BibleBroadcastScreenConfig | und => {
  const configs = useBibleBroadcastScreenConfigs();
  return configi === undefined ? undefined : configs[configi];
};

export const useBibleBroadcastScreenCurrentConfig = (): BibleBroadcastScreenConfig | und =>
  useBibleBroadcastScreenConfigs()[useScreenTranslationCurrentConfigi()];
