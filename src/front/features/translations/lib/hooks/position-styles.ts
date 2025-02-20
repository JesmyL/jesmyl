import { CSSProperties, useMemo } from 'react';
import { ScreenTranslationPositionConfig } from '../../model/Position.model';
import { defaultScreenTranslationPositionConfig } from '../defaults';

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
