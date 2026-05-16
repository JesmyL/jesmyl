import { currentBroadcastConfigiAtom } from '#features/broadcast/atoms';
import { bibleIDB } from '$bible/shared/state/bibleIDB';
import { useAtomValue } from 'atomaric';
import { useCallback } from 'react';
import { bibleBroadcastDefaultConfig } from '../config/configs';
import { BibleBroadcastScreenConfig } from '../model/model';

export const useBibleBroadcastUpdateConfig = (topConfigi?: number) => {
  return useCallback(
    (config: Partial<BibleBroadcastScreenConfig> | null, configi?: number) => {
      bibleIDB.set.broadcastScreenConfigs(configs => {
        const configIndex = topConfigi ?? configi;
        if (configIndex == null) return configs;

        const newConfigs = [...configs];

        if (config === null) {
          newConfigs.splice(configIndex, 1);
        } else newConfigs[configIndex] = { ...bibleBroadcastDefaultConfig, ...newConfigs[configIndex], ...config };

        return newConfigs;
      });
    },
    [topConfigi],
  );
};

export const useBibleBroadcastUpdateCurrentConfig = () => {
  return useBibleBroadcastUpdateConfig(useAtomValue(currentBroadcastConfigiAtom));
};
