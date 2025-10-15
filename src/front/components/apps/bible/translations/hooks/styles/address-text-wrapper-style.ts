import { useScreenTranslationPositionsStyles } from '#features/translations/complect/hooks/position-styles';
import { useScreenTranslationTextStyles } from '#features/translations/complect/hooks/text-styles';
import { BibleTranslationScreenConfig } from '$bible/translations/model';
import { CSSProperties, useMemo } from 'react';

export const useGetBibleScreenTranslationAddressTextWrapperStyle = (
  currentConfig: BibleTranslationScreenConfig | und,
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
