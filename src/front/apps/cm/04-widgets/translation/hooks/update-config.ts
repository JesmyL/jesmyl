import { useScreenTranslationCurrentConfigi } from '#features/translations/hooks/configs';
import { cmIDB } from '$cm/shared/state';
import { useCallback } from 'react';
import { CmTranslationScreenConfig } from '../model/model';
import { cmTranslationDefaultConfig } from './configs';

export const useCmTranslationUpdateConfig = () => {
  const [configs, setConfigs] = cmIDB.use.translationScreenConfigs();

  return useCallback(
    (config: Partial<CmTranslationScreenConfig> | null, configi: number) => {
      const newConfigs = [...configs];
      if (config === null) {
        newConfigs.splice(configi, 1);
      } else newConfigs[configi] = { ...cmTranslationDefaultConfig, ...newConfigs[configi], ...config };
      setConfigs(newConfigs);
    },
    [configs, setConfigs],
  );
};

export const useCmTranslationUpdateCurrentConfig = (): ((
  config: Partial<CmTranslationScreenConfig> | null,
) => void) => {
  const update = useCmTranslationUpdateConfig();
  const currentConfigi = useScreenTranslationCurrentConfigi();

  return useCallback(
    (config: Partial<CmTranslationScreenConfig> | null) => update(config, currentConfigi),
    [currentConfigi, update],
  );
};
