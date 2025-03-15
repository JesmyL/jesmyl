import { BibleTranslationScreenConfig } from '$bible/translations/model';
import { useScreenTranslationBackgroundStyles } from 'front/components/apps/+complect/translations/complect/hooks/background-styles';
import { CSSProperties, useMemo } from 'react';

export const addressGridArea = 'address-grid-area';

export const useGetBibleScreenTranslationAddressStyle = (
  isVisible: boolean,
  currentConfig: BibleTranslationScreenConfig | und,
) => {
  const background = useScreenTranslationBackgroundStyles(currentConfig?.address);

  return useMemo((): CSSProperties => {
    if (currentConfig === undefined) return {};

    return {
      position: 'relative',
      color: currentConfig.address.color,
      gridArea: addressGridArea,
      bottom: 0,

      display: isVisible ? undefined : 'none',
      background,
      zIndex: 10,
    };
  }, [background, currentConfig, isVisible]);
};
