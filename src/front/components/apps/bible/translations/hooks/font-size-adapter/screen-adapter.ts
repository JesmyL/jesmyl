import { useIsScreenTranslationTextVisible } from '#features/translations/atoms';
import { useBibleScreenTranslationFontSizeAdapter } from '#shared/lib/hooks/useFontSizeAdapter';
import { BibleTranslationScreenConfig } from '$bible/translations/model';

export const useBibleScreenTranslationFontSizeScreenAdapter = (
  content: string,
  currentConfig: BibleTranslationScreenConfig | und,
  windowResizeUpdatesNum: number | und,
) => {
  const subUpdater =
    (currentConfig === undefined
      ? '-'
      : currentConfig.screen.height +
        currentConfig.screen.width +
        currentConfig.address.height +
        currentConfig.fontWeight +
        currentConfig.fontFamily +
        currentConfig.addressPanel.height) +
    windowResizeUpdatesNum +
    useIsScreenTranslationTextVisible();

  return useBibleScreenTranslationFontSizeAdapter(content, subUpdater);
};
