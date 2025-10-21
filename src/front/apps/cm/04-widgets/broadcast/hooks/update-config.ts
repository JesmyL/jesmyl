import { useScreenBroadcastCurrentConfigi } from '#features/broadcast/hooks/configs';
import { cmIDB } from '$cm/shared/state';
import { useCallback } from 'react';
import { CmBroadcastScreenConfig } from '../model/model';
import { cmBroadcastDefaultConfig } from './configs';

export const useCmBroadcastUpdateConfig = () => {
  const [configs, setConfigs] = cmIDB.use.broadcastScreenConfigs();

  return useCallback(
    (config: Partial<CmBroadcastScreenConfig> | null, configi: number) => {
      const newConfigs = [...configs];
      if (config === null) {
        newConfigs.splice(configi, 1);
      } else newConfigs[configi] = { ...cmBroadcastDefaultConfig, ...newConfigs[configi], ...config };
      setConfigs(newConfigs);
    },
    [configs, setConfigs],
  );
};

export const useCmBroadcastUpdateCurrentConfig = (): ((config: Partial<CmBroadcastScreenConfig> | null) => void) => {
  const update = useCmBroadcastUpdateConfig();
  const currentConfigi = useScreenBroadcastCurrentConfigi();

  return useCallback(
    (config: Partial<CmBroadcastScreenConfig> | null) => update(config, currentConfigi),
    [currentConfigi, update],
  );
};
