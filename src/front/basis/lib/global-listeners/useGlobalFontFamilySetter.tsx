import { indexIDB } from '$index/shared/state';
import { useEffect } from 'react';
import { applyFontFamilyFromMyFiles, takeMyFileFontFamily } from 'x/my-files';

export const useGlobalFontFamilySetter = () => {
  const appFontFamilyId = indexIDB.useValue.appFontFamilyId();

  useEffect(() => {
    if (appFontFamilyId == null) return;
    applyFontFamilyFromMyFiles(window, appFontFamilyId);
    document.body.style.fontFamily = `"${takeMyFileFontFamily(appFontFamilyId)}"`;

    return () => {
      document.body.style.fontFamily = '';
    };
  }, [appFontFamilyId]);
};
