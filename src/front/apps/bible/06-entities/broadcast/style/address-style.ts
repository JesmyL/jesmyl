import { makeBroadcastTextStroke } from '#features/broadcast/complect/defaults';
import { takeScreenBroadcastBackgroundStyles } from '#features/broadcast/complect/hooks/background-styles';
import { CSSProperties, useMemo } from 'react';
import { BibleBroadcastScreenConfig } from 'shared/model/bible/broadcast';

export const bibleBroadcastAddressGridArea = 'address-grid-area';

export const useBibleBroadcastScreenAddressStyle = (
  isVisible: boolean,
  currentConfig: BibleBroadcastScreenConfig | und,
) => {
  return useMemo((): CSSProperties => {
    if (currentConfig === undefined) return {};

    return {
      ...takeScreenBroadcastBackgroundStyles(currentConfig?.address),
      ...makeBroadcastTextStroke(currentConfig?.address),

      position: 'relative',
      color: currentConfig.address.color,
      gridArea: bibleBroadcastAddressGridArea,
      bottom: 0,

      display: isVisible ? undefined : 'none',
      zIndex: 10,
    };
  }, [currentConfig, isVisible]);
};
