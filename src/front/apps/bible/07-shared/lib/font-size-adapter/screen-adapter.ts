import { useIsScreenBroadcastTextVisible } from '#features/broadcast/atoms';
import { useBibleBroadcastScreenFontSizeAdapter } from '#shared/lib/hooks/useFontSizeAdapter';
import { BibleBroadcastScreenConfig } from '$bible/entities/broadcast';

export const useBibleBroadcastScreenFontSizeScreenAdapter = (
  content: string,
  currentConfig: BibleBroadcastScreenConfig | und,
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
    useIsScreenBroadcastTextVisible();

  return useBibleBroadcastScreenFontSizeAdapter(content, subUpdater);
};
