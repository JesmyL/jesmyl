import { currentBroadcastConfigiAtom } from '#features/broadcast/atoms';
import { bibleIDB } from '$bible/shared/state/bibleIDB';
import { BibleBroadcastScreenConfig } from 'shared/model/bible/broadcast';
import { bibleBroadcastDefaultConfig } from '../config/configs';

export const bibleBroadcastUpdateCurrentConfig = (
  config: Partial<BibleBroadcastScreenConfig> | null,
  configi?: number,
) => {
  const topConfigi = currentBroadcastConfigiAtom.get();
  bibleIDB.set.broadcastScreenConfigs(configs => {
    const configIndex = topConfigi ?? configi;
    if (configIndex == null) return configs;

    const newConfigs = [...configs];

    if (config === null) {
      newConfigs.splice(configIndex, 1);
    } else newConfigs[configIndex] = { ...bibleBroadcastDefaultConfig, ...newConfigs[configIndex], ...config };

    return newConfigs;
  });
};
