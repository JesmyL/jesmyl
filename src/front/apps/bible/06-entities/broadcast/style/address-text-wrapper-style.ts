import { useScreenBroadcastPositionsStyles } from '#features/broadcast/complect/hooks/position-styles';
import { useScreenBroadcastTextStyles } from '#features/broadcast/complect/hooks/text-styles';
import { CSSProperties, useMemo } from 'react';
import { BibleBroadcastScreenConfig } from '../model/model';

export const useBibleBroadcastScreenAddressTextWrapperStyle = (currentConfig: BibleBroadcastScreenConfig | und) => {
  const textStyles = useScreenBroadcastTextStyles(currentConfig?.address);
  const positions = useScreenBroadcastPositionsStyles(currentConfig?.address);

  return useMemo((): CSSProperties => {
    return currentConfig !== undefined
      ? {
          ...textStyles,
          ...positions,

          justifyContent:
            currentConfig.address.textAlign === 'left'
              ? 'start'
              : currentConfig.address.textAlign === 'right'
                ? 'end'
                : 'center',
          zIndex: 10,
        }
      : { color: '#777777', fontWeight: 'bold', textAlign: 'center' };
  }, [currentConfig, positions, textStyles]);
};
