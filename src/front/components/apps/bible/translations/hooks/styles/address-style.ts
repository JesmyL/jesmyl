import { useScreenTranslationBackgroundStyles } from '#features/translations/lib/hooks/background-styles';
import { useMemo } from 'react';
import { CSSProperties } from 'styled-components';
import { BibleTranslationScreenConfig } from '../../model';

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
