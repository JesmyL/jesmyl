import { isBroadcastTextVisibleAtom } from '#features/broadcast/atoms';
import { useBibleBroadcastScreenFontSizeAdapter } from '#shared/lib/hooks/useFontSizeAdapter';
import { BibleBroadcastScreenConfig } from '$bible/entities/broadcast';
import { useAtomValue } from 'atomaric';

export const useBibleBroadcastScreenFontSizeScreenAdapter = (
  content: string,
  currentConfig: BibleBroadcastScreenConfig | und,
  windowResizeUpdatesNum: number | und,
) => {
  const subUpdater =
    (currentConfig === undefined
      ? '-'
      : '' +
        currentConfig.screen.height +
        currentConfig.screen.width +
        currentConfig.address.height +
        currentConfig.fontWeight +
        currentConfig.fontFamily +
        currentConfig.addressPanel.height) +
    windowResizeUpdatesNum +
    useAtomValue(isBroadcastTextVisibleAtom);

  return useBibleBroadcastScreenFontSizeAdapter(content, subUpdater);
};
