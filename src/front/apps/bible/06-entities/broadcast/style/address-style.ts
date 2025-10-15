import { useScreenTranslationBackgroundStyles } from '#features/broadcast/complect/hooks/background-styles';
import { CSSProperties, useMemo } from 'react';
import { BibleBroadcastScreenConfig } from '../model/model';

export const bibleBroadcastAddressGridArea = 'address-grid-area';

export const useBibleBroadcastScreenTranslationAddressStyle = (
  isVisible: boolean,
  currentConfig: BibleBroadcastScreenConfig | und,
) => {
  const background = useScreenTranslationBackgroundStyles(currentConfig?.address);

  return useMemo((): CSSProperties => {
    if (currentConfig === undefined) return {};

    return {
      position: 'relative',
      color: currentConfig.address.color,
      gridArea: bibleBroadcastAddressGridArea,
      bottom: 0,

      display: isVisible ? undefined : 'none',
      background,
      zIndex: 10,
    };
  }, [background, currentConfig, isVisible]);
};
