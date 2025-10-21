import { useCallback } from 'react';
import { useScreenBroadcastConfigsSet, useScreenBroadcastConfigsValue } from '../atoms';
import { ScreenBroadcastConfig } from '../model';

export const useUpdateScreenBroadcastConfig = () => {
  const configs = useScreenBroadcastConfigsValue();
  const set = useScreenBroadcastConfigsSet();

  return useCallback(
    (configi: number, config: Partial<ScreenBroadcastConfig> | null) => {
      const newConfigs = [...configs];

      if (config === null) newConfigs.splice(configi, 1);
      else newConfigs[configi] = { ...newConfigs[configi], ...config };

      set(newConfigs);
    },
    [configs, set],
  );
};
