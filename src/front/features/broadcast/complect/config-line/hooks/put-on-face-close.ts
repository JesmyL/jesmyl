import { currentBroadcastConfigiAtom } from '#features/broadcast/atoms';
import { useCallback } from 'react';
import { useRemoveScreenBroadcastConfig } from '../../../hooks/configs';
import { BroadcastWindow, useUpdateScreenBroadcastWindows } from '../../../hooks/windows';
import { useUpdateScreenBroadcastConfig } from '../../../hooks/with-config';
import { ScreenBroadcastConfig } from '../../../model';

export const useScreenBroadcastPutOnFaceClose = <Config>(
  configs: ScreenBroadcastConfig[],
  currentConfigi: number,
  windows: readonly (nil | BroadcastWindow)[],
  updateExternalConfig: (config: Config | null, configi: number) => void,
) => {
  const updateConfig = useUpdateScreenBroadcastConfig();
  const updateWindows = useUpdateScreenBroadcastWindows();
  const removeConfig = useRemoveScreenBroadcastConfig();

  return useCallback(
    (configi: number): PropagationStopper => {
      return event => {
        event.stopPropagation();
        removeConfig(configi);

        updateConfig(configi, null);
        updateExternalConfig(null, configi);

        windows[configi]?.win?.close();

        setTimeout(() => {
          const newWindows = [...windows];
          newWindows.splice(configi, 1);

          updateWindows(newWindows);
        });

        if (currentConfigi === configs.length - 1) {
          currentBroadcastConfigiAtom.set(configs.length - 2);
          return;
        }

        if (currentConfigi > configi) {
          currentBroadcastConfigiAtom.set(currentConfigi - 1);
        }
      };
    },
    [removeConfig, updateConfig, updateExternalConfig, windows, currentConfigi, configs.length, updateWindows],
  );
};
