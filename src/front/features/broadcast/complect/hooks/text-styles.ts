import { CSSProperties, useMemo } from 'react';
import { takeMyFileFontFamily } from 'x/my-files/shared/utils/applyFontFamilyFromMyFiles';
import { defaultScreenBroadcastTextConfig, makeBroadcastTextStroke } from '../defaults';
import { ScreenBroadcastTextConfig } from '../model';

export const useScreenBroadcastTextStyles = (config: ScreenBroadcastTextConfig | und) => {
  const theConfig = config ?? defaultScreenBroadcastTextConfig;

  return useMemo((): CSSProperties => {
    const fontFamily = 'main,calibri,georgia,times,serif,verdana,arial';

    return {
      fontWeight: theConfig.fontWeight,
      textAlign: theConfig.textAlign,
      fontStyle: theConfig.fontStyle,
      fontFamily:
        theConfig.fontFileId == null ? fontFamily : `'${takeMyFileFontFamily(theConfig.fontFileId)}'`,
      ...makeBroadcastTextStroke(theConfig),
    };
  }, [theConfig]);
};
