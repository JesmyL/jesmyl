import { useEffect } from 'react';
import { applyFontFamilyFromMyFiles } from '../../../07-basis/lib/utils/applyFontFamilyFromMyFiles';
import { useAppFontFamily } from '../../../components/index/atoms';

export const useGlobalFontFamilySetter = () => {
  const [appFontFamily] = useAppFontFamily();

  useEffect(() => {
    if (appFontFamily == null) return;
    applyFontFamilyFromMyFiles(appFontFamily, window);
    document.body.style.fontFamily = '"' + appFontFamily + '"';

    return () => {
      document.body.style.fontFamily = '';
    };
  }, [appFontFamily]);
};
