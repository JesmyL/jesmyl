import { useEffect } from 'react';
import { applyFontFamilyFromMyFiles } from '../../../../../07-basis/lib/utils/applyFontFamilyFromMyFiles';

export const useApplyScreenFontFamilyEffect = (fontFamily: string | und, win: Window | und) => {
  useEffect(() => {
    applyFontFamilyFromMyFiles(fontFamily, win);
  }, [fontFamily, win]);
};
