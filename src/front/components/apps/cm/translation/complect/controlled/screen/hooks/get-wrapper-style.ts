import { useScreenTranslationBackgroundStyles } from 'front/components/apps/+complect/translations/complect/hooks/background-styles';
import { CSSProperties, useMemo } from 'react';
import { CmTranslationScreenConfig } from '../../model';

export const useGetCmScreenTranslationWrapperStyle = (currentConfig: CmTranslationScreenConfig | und) => {
  const background = useScreenTranslationBackgroundStyles(currentConfig);

  return useMemo((): CSSProperties => {
    return currentConfig !== undefined
      ? {
          background,
        }
      : {};
  }, [background, currentConfig]);
};
