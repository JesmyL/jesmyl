import { useScreenTranslationTextStyles } from '#features/translations/lib/hooks/text-styles';
import { CSSProperties, useMemo } from 'react';
import { BibleTranslationScreenConfig } from '../../model';
import { addressGridArea } from './address-style';
import { screenGridArea } from './screen-style';

export const useGetBibleScreenTranslationWrapperStyle = (currentConfig: BibleTranslationScreenConfig | und) => {
  const textStyles = useScreenTranslationTextStyles(currentConfig);

  return useMemo((): CSSProperties => {
    return currentConfig !== undefined
      ? {
          ...textStyles,
          display: 'grid',
          gridTemplateRows: `1fr ${currentConfig.addressPanel.height}%`,
          gridTemplateAreas: `'${screenGridArea}' '${addressGridArea}'`,
        }
      : {};
  }, [currentConfig, textStyles]);
};
