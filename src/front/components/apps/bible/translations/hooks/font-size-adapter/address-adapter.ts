import { useIsScreenTranslationTextVisible } from '#features/translations/atoms';
import { useBibleScreenTranslationFontSizeAdapter } from '#shared/lib/hooks/useFontSizeAdapter';
import { BibleTranslationScreenConfig } from '$bible/translations/model';

export const useBibleScreenTranslationFontSizeAddressAdapter = (
  content: string,
  currentConfig: BibleTranslationScreenConfig | und,
  windowResizeUpdatesNum: number | und,
) => {
  return useBibleScreenTranslationFontSizeAdapter(
    content,
    '' +
      windowResizeUpdatesNum +
      useIsScreenTranslationTextVisible() +
      (currentConfig === undefined
        ? '-'
        : currentConfig.address.height +
          currentConfig.address.width +
          currentConfig.fontWeight +
          currentConfig.fontFamily +
          currentConfig.addressPanel.height),
  );
};
