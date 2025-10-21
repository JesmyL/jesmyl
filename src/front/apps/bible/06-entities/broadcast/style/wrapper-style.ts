import { useScreenBroadcastTextStyles } from '#features/broadcast/complect/hooks/text-styles';
import { CSSProperties, useMemo } from 'react';
import { BibleBroadcastScreenConfig } from '../model/model';
import { bibleBroadcastAddressGridArea } from './address-style';
import { bibleBroadcastScreenGridArea } from './screen-style';

export const useBibleBroadcastScreenWrapperStyle = (currentConfig: BibleBroadcastScreenConfig | und) => {
  const textStyles = useScreenBroadcastTextStyles(currentConfig);

  return useMemo((): CSSProperties => {
    return currentConfig !== undefined
      ? {
          ...textStyles,
          display: 'grid',
          gridTemplateRows: `1fr ${currentConfig.addressPanel.height}%`,
          gridTemplateAreas: `'${bibleBroadcastScreenGridArea}' '${bibleBroadcastAddressGridArea}'`,
        }
      : {};
  }, [currentConfig, textStyles]);
};
