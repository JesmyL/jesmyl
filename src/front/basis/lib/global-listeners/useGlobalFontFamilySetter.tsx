import { applyFontFamilyFromMyFiles } from '#shared/ui/configurators/utils/set-font-family-effect';
import { useAppFontFamily } from 'front/components/index/atoms';
import { useEffect } from 'react';

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
