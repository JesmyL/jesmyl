import { useScreenBroadcastBackgroundStyles } from '#features/broadcast/complect/hooks/background-styles';
import { CSSProperties, useMemo } from 'react';
import { CmBroadcastScreenConfig } from '../model/model';

export const useCmBroadcastScreenWrapperStyle = (currentConfig: CmBroadcastScreenConfig | und) => {
  const background = useScreenBroadcastBackgroundStyles(currentConfig);

  return useMemo((): CSSProperties => {
    return currentConfig !== undefined
      ? {
          background,
        }
      : {};
  }, [background, currentConfig]);
};
