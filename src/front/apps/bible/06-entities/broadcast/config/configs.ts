import { currentBroadcastConfigiAtom } from '#features/broadcast/atoms';
import {
  defaultScreenBroadcastBackgroundConfig,
  defaultScreenBroadcastPositionConfig,
  defaultScreenBroadcastTextConfig,
} from '#features/broadcast/complect/defaults';
import { useMakeScreenBroadcastConfigsFillPack } from '#features/broadcast/hooks/configs';
import { bibleIDB } from '$bible/shared/state/bibleIDB';
import { useAtomValue } from 'atomaric';
import { BibleBroadcastScreenConfig } from '../model/model';

export const bibleBroadcastDefaultConfig: BibleBroadcastScreenConfig = {
  ...defaultScreenBroadcastTextConfig,
  ...defaultScreenBroadcastBackgroundConfig,
  insertedtext: { color: '#ffffff', opacity: 0.7 },
  textinbrackets: { color: '#ffffff', display: 'none' },
  godswords: { color: '#ffffff', display: 'none' },
  addressPanel: { height: 20, left: 0, top: 80, width: 100 },

  screen: defaultScreenBroadcastPositionConfig,

  address: {
    ...defaultScreenBroadcastPositionConfig,
    ...defaultScreenBroadcastTextConfig,
    ...defaultScreenBroadcastBackgroundConfig,
    isOnBottom: true,
  },
};

export const useBibleBroadcastScreenConfigsSet = () => bibleIDB.useSet.broadcastScreenConfigs();
export const useBibleBroadcastScreenConfigs = () =>
  useMakeScreenBroadcastConfigsFillPack(bibleIDB.useValue.broadcastScreenConfigs(), bibleBroadcastDefaultConfig);

export const useBibleBroadcastScreenConfig = (configi: number | und): BibleBroadcastScreenConfig | und => {
  const configs = useBibleBroadcastScreenConfigs();
  return configi === undefined ? undefined : configs[configi];
};

export const useBibleBroadcastScreenCurrentConfig = (): BibleBroadcastScreenConfig | und =>
  useBibleBroadcastScreenConfigs()[useAtomValue(currentBroadcastConfigiAtom)];
