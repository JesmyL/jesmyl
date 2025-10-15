import { useScreenTranslationCurrentConfigi } from '#features/broadcast/hooks/configs';
import { useCallback } from 'react';
import { bibleBroadcastDefaultConfig, useBibleBroadcastScreenConfigsSet } from '../config/configs';
import { BibleBroadcastScreenConfig } from '../model/model';

export const useBibleBroadcastUpdateConfig = (topConfigi?: number) => {
  const setConfigs = useBibleBroadcastScreenConfigsSet();

  return useCallback(
    (config: Partial<BibleBroadcastScreenConfig> | null, configi?: number) => {
      setConfigs(configs => {
        const configIndex = topConfigi ?? configi;
        if (configIndex == null) return configs;

        const newConfigs = [...configs];

        if (config === null) {
          newConfigs.splice(configIndex, 1);
        } else newConfigs[configIndex] = { ...bibleBroadcastDefaultConfig, ...newConfigs[configIndex], ...config };

        return newConfigs;
      });
    },
    [setConfigs, topConfigi],
  );
};

export const useBibleBroadcastUpdateCurrentConfig = () => {
  return useBibleBroadcastUpdateConfig(useScreenTranslationCurrentConfigi());
};
