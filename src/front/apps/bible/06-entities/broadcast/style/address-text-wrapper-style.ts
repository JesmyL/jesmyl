import { useScreenTranslationPositionsStyles } from '#features/broadcast/complect/hooks/position-styles';
import { useScreenTranslationTextStyles } from '#features/broadcast/complect/hooks/text-styles';
import { CSSProperties, useMemo } from 'react';
import { BibleBroadcastScreenConfig } from '../model/model';

export const useBibleBroadcastScreenTranslationAddressTextWrapperStyle = (
  currentConfig: BibleBroadcastScreenConfig | und,
) => {
  const textStyles = useScreenTranslationTextStyles(currentConfig?.address);
  const positions = useScreenTranslationPositionsStyles(currentConfig?.address);

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
