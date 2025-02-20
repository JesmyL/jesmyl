import { useScreenTranslationBackgroundStyles } from '#features/translations/lib/hooks/background-styles';
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
