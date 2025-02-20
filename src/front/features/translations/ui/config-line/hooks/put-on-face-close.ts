import { useRemoveScreenTranslationConfig } from '#features/translations/lib/hooks/configs';
import { TranslationWindow, useUpdateScreenTranslationWindows } from '#features/translations/lib/hooks/windows';
import { useUpdateScreenTranslationConfig } from '#features/translations/lib/hooks/with-config';
import { useCallback } from 'react';
import { ScreenTranslationConfig } from '../../../model/Configs.model';

export const useScreenTranslationPutOnFaceClose = <Config>(
  configs: ScreenTranslationConfig[],
  currentConfigi: number,
  setCurrentConfigi: (configi: number) => void,
  windows: readonly (nil | TranslationWindow)[],
  updateExternalConfig: (config: Config | null, configi: number) => void,
) => {
  const updateConfig = useUpdateScreenTranslationConfig();
  const updateWindows = useUpdateScreenTranslationWindows();
  const removeConfig = useRemoveScreenTranslationConfig();

  return useCallback(
    (configi: number): PropagationStopper => {
      return event => {
        event.stopPropagation();
        removeConfig(configi);

        updateConfig(configi, null);
        updateExternalConfig(null, configi);

        windows[configi]?.win.close();

        setTimeout(() => {
          const newWindows = [...windows];
          newWindows.splice(configi, 1);

          updateWindows(newWindows);
        });

        if (currentConfigi === configs.length - 1) {
          setCurrentConfigi(configs.length - 2);
          return;
        }

        if (currentConfigi > configi) {
          setCurrentConfigi(currentConfigi - 1);
        }
      };
    },
    [
      removeConfig,
      updateConfig,
      updateExternalConfig,
      windows,
      currentConfigi,
      configs.length,
      updateWindows,
      setCurrentConfigi,
    ],
  );
};
