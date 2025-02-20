import { useEffect } from 'react';
import { applyFontFamilyFromMyFiles } from '../../../../../shared/ui/configurators/utils/set-font-family';

export const useApplyScreenFontFamilyEffect = (fontFamily: string | und, win: Window | und) => {
  useEffect(() => {
    applyFontFamilyFromMyFiles(fontFamily, win);
  }, [fontFamily, win]);
};
