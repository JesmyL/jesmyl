import { useScreenTranslationPositionsStyles } from '#features/translations/lib/hooks/position-styles';
import { useScreenTranslationTextStyles } from '#features/translations/lib/hooks/text-styles';
import { CSSProperties, useMemo } from 'react';
import { CmTranslationTextScreenConfig } from '../../model';

export const useGetCmScreenTranslationStyle = (
  isVisible: boolean,
  currentConfig: CmTranslationTextScreenConfig | und,
) => {
  const textStyles = useScreenTranslationTextStyles(currentConfig);
  const position = useScreenTranslationPositionsStyles(currentConfig);

  return useMemo((): CSSProperties => {
    return currentConfig !== undefined
      ? {
          ...textStyles,
          ...position,
          justifyContent:
            textStyles.textAlign === 'left' ? 'flex-start' : textStyles.textAlign === 'right' ? 'flex-end' : 'center',

          color: isVisible ? currentConfig.color : 'transparent',
        }
      : {
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center',
        };
  }, [currentConfig, isVisible, position, textStyles]);
};
