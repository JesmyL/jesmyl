import { CSSProperties, useMemo } from 'react';
import { ScreenTranslationTextConfig } from '../../model/Position.model';
import { defaultScreenTranslationTextConfig } from '../defaults';

export const useScreenTranslationTextStyles = (config: ScreenTranslationTextConfig | und) => {
  const theConfig = config ?? defaultScreenTranslationTextConfig;

  return useMemo((): CSSProperties => {
    const fontFamily = 'montserrat,main,calibri,georgia,times,serif,verdana,arial';

    return {
      fontWeight: theConfig.fontWeight,
      textAlign: theConfig.textAlign,
      fontStyle: theConfig.fontStyle,
      fontFamily: theConfig.fontFamily === undefined ? fontFamily : `'${theConfig.fontFamily}'`,
    };
  }, [theConfig.fontFamily, theConfig.fontStyle, theConfig.fontWeight, theConfig.textAlign]);
};
