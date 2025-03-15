import { useBibleScreenTranslationFontSizeAdapter } from '#shared/lib/hooks/useFontSizeAdapter';
import { BibleTranslationScreenConfig } from '$bible/translations/model';
import { useIsScreenTranslationTextVisible } from 'front/components/apps/+complect/translations/atoms';

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
