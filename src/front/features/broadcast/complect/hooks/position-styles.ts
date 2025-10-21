import { CSSProperties, useMemo } from 'react';
import { defaultScreenBroadcastPositionConfig } from '../defaults';
import { ScreenBroadcastPositionConfig } from '../model';

export const useScreenBroadcastPositionsStyles = (config: ScreenBroadcastPositionConfig | und) => {
  const theConfig = config ?? defaultScreenBroadcastPositionConfig;

  return useMemo((): CSSProperties => {
    return {
      width: theConfig.width + '%',
      height: theConfig.height + '%',
      left: theConfig.left + '%',
      top: theConfig.top + '%',
    };
  }, [theConfig.height, theConfig.left, theConfig.top, theConfig.width]);
};
