import { useScreenTranslationBackgroundStyles } from '#features/broadcast/complect/hooks/background-styles';
import { CSSProperties, useMemo } from 'react';
import { CmTranslationScreenConfig } from '../model/model';

export const useCmTranslationScreenWrapperStyle = (currentConfig: CmTranslationScreenConfig | und) => {
  const background = useScreenTranslationBackgroundStyles(currentConfig);

  return useMemo((): CSSProperties => {
    return currentConfig !== undefined
      ? {
          background,
        }
      : {};
  }, [background, currentConfig]);
};
