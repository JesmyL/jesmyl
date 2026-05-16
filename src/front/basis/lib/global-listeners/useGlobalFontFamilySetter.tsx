import { indexIDB } from '$index/shared/state';
import { useEffect } from 'react';
import { applyFontFamilyFromMyFiles } from 'x/my-files';

export const useGlobalFontFamilySetter = () => {
  const appFontFamilyId = indexIDB.useValue.appFontFamilyId();

  useEffect(() => {
    if (appFontFamilyId == null) return;
    applyFontFamilyFromMyFiles(window, appFontFamilyId);
    document.body.style.fontFamily = `"${appFontFamilyId}"`;

    return () => {
      document.body.style.fontFamily = '';
    };
  }, [appFontFamilyId]);
};
