import { useEffect } from 'react';
import { applyFontFamilyFromMyFiles } from '../../../04-widgets/configurators/utils/set-font-family-effect';
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
