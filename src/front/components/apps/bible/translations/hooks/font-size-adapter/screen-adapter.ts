import { useBibleScreenTranslationFontSizeAdapter } from 'front/08-shared/lib/hooks/useFontSizeAdapter';
import { useIsScreenTranslationTextVisible } from '../../../../+complect/translations/atoms';
import { BibleTranslationScreenConfig } from '../../model';

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
