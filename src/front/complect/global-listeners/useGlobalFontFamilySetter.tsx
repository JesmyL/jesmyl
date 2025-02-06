import { useEffect } from 'react';
import { useAppFontFamily } from '../../components/index/atoms';
import { applyFontFamilyFromMyFiles } from '../configurators/utils/set-font-family-effect';

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
