import { useScreenTranslationCurrentConfigi } from '#features/translations/lib/hooks/configs';
import { cmIDB } from '@cm/basis/lib/cmIdb';
import { useCallback } from 'react';
import { CmTranslationScreenConfig } from '../model';
import { defaultCmConfig } from './configs';

export const useUpdateCmTranslationConfig = () => {
  const [configs, setConfigs] = cmIDB.use.translationScreenConfigs();

  return useCallback(
    (config: Partial<CmTranslationScreenConfig> | null, configi: number) => {
      const newConfigs = [...configs];
      if (config === null) {
        newConfigs.splice(configi, 1);
      } else newConfigs[configi] = { ...defaultCmConfig, ...newConfigs[configi], ...config };
      setConfigs(newConfigs);
    },
    [configs, setConfigs],
  );
};

export const useUpdateCmCurrentTranslationConfig = (): ((
  config: Partial<CmTranslationScreenConfig> | null,
) => void) => {
  const update = useUpdateCmTranslationConfig();
  const currentConfigi = useScreenTranslationCurrentConfigi();

  return useCallback(
    (config: Partial<CmTranslationScreenConfig> | null) => update(config, currentConfigi),
    [currentConfigi, update],
  );
};
