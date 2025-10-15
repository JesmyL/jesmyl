import { CSSProperties, useMemo } from 'react';
import { defaultScreenTranslationPositionConfig } from '../defaults';
import { ScreenTranslationPositionConfig } from '../model';

export const useScreenTranslationPositionsStyles = (config: ScreenTranslationPositionConfig | und) => {
  const theConfig = config ?? defaultScreenTranslationPositionConfig;

  return useMemo((): CSSProperties => {
    return {
      width: theConfig.width + '%',
      height: theConfig.height + '%',
      left: theConfig.left + '%',
      top: theConfig.top + '%',
    };
  }, [theConfig.height, theConfig.left, theConfig.top, theConfig.width]);
};
