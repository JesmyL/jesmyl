import { applyFontFamilyFromMyFiles } from '#shared/ui/configurators/utils/set-font-family-effect';
import { useEffect } from 'react';

export const useApplyScreenFontFamilyEffect = (fontFamily: string | und, win: Window | und) => {
  useEffect(() => {
    applyFontFamilyFromMyFiles(fontFamily, win);
  }, [fontFamily, win]);
};
