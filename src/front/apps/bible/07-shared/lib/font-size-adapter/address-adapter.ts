import { useIsScreenBroadcastTextVisible } from '#features/broadcast/atoms';
import { useBibleBroadcastScreenFontSizeAdapter } from '#shared/lib/hooks/useFontSizeAdapter';
import { BibleBroadcastScreenConfig } from '$bible/entities/broadcast';

export const useBibleBroadcastScreenFontSizeAddressAdapter = (
  content: string,
  currentConfig: BibleBroadcastScreenConfig | und,
  windowResizeUpdatesNum: number | und,
) => {
  return useBibleBroadcastScreenFontSizeAdapter(
    content,
    '' +
      windowResizeUpdatesNum +
      useIsScreenBroadcastTextVisible() +
      (currentConfig === undefined
        ? '-'
        : currentConfig.address.height +
          currentConfig.address.width +
          currentConfig.fontWeight +
          currentConfig.fontFamily +
          currentConfig.addressPanel.height),
  );
};
