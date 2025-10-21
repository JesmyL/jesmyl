import { useScreenBroadcastPositionsStyles } from '#features/broadcast/complect/hooks/position-styles';
import { useScreenBroadcastTextStyles } from '#features/broadcast/complect/hooks/text-styles';
import { CSSProperties, useMemo } from 'react';
import { CmBroadcastTextScreenConfig } from '../model/model';

export const useCmBroadcastScreenStyle = (isVisible: boolean, currentConfig: CmBroadcastTextScreenConfig | und) => {
  const textStyles = useScreenBroadcastTextStyles(currentConfig);
  const position = useScreenBroadcastPositionsStyles(currentConfig);

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
