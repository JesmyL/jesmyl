import { useEffect } from 'react';
import { applyFontFamilyFromMyFiles } from '../../../../../complect/configurators/utils/set-font-family-effect';

export const useApplyScreenFontFamilyEffect = (fontFamily: string | und, win: Window | und) => {
  useEffect(() => {
    applyFontFamilyFromMyFiles(fontFamily, win);
  }, [fontFamily, win]);
};
