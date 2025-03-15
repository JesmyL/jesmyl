import { BibleTranslationScreenConfig } from '$bible/translations/model';
import { useScreenTranslationTextStyles } from 'front/components/apps/+complect/translations/complect/hooks/text-styles';
import { CSSProperties, useMemo } from 'react';
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
