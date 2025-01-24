import { useCallback } from 'react';
import { useScreenTranslationConfigsSet, useScreenTranslationConfigsValue } from '../atoms';
import { ScreenTranslationConfig } from '../model';

export const useUpdateScreenTranslationConfig = () => {
  const configs = useScreenTranslationConfigsValue();
  const set = useScreenTranslationConfigsSet();

  return useCallback(
    (configi: number, config: Partial<ScreenTranslationConfig> | null) => {
      const newConfigs = [...configs];

      if (config === null) newConfigs.splice(configi, 1);
      else newConfigs[configi] = { ...newConfigs[configi], ...config };

      set(newConfigs);
    },
    [configs, set],
  );
};
