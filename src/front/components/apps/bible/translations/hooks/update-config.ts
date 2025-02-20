import { useScreenTranslationCurrentConfigi } from '#features/translations/lib/hooks/configs';
import { useCallback } from 'react';
import { BibleTranslationScreenConfig } from '../model';
import { useBibleScreenTranslationConfigsSet } from './configs';

export const useUpdateBibleTranslationConfig = (topConfigi?: number) => {
  const setConfigs = useBibleScreenTranslationConfigsSet();

  return useCallback(
    (config: Partial<BibleTranslationScreenConfig> | null, configi?: number) => {
      setConfigs(configs => {
        const configIndex = topConfigi ?? configi;
        if (configIndex == null) return configs;

        const newConfigs = [...configs];
        if (config === null) {
          newConfigs.splice(configIndex, 1);
        } else newConfigs[configIndex] = { ...newConfigs[configIndex], ...config };
        return newConfigs;
      });
    },
    [setConfigs, topConfigi],
  );
};

export const useUpdateBibleCurrentTranslationConfig = () => {
  return useUpdateBibleTranslationConfig(useScreenTranslationCurrentConfigi());
};
