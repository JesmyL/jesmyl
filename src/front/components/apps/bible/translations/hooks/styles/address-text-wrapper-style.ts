import { BibleTranslationScreenConfig } from '$bible/translations/model';
import { useScreenTranslationPositionsStyles } from 'front/components/apps/+complect/translations/complect/hooks/position-styles';
import { useScreenTranslationTextStyles } from 'front/components/apps/+complect/translations/complect/hooks/text-styles';
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
