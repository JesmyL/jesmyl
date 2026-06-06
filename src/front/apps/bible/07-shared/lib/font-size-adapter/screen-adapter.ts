import { isBroadcastTextVisibleAtom } from '#features/broadcast/atoms';
import { useBibleBroadcastScreenFontSizeAdapter } from '#shared/lib/hooks/useFontSizeAdapter';
import { useAtomValue } from 'atomaric';
import { BibleBroadcastScreenConfig } from 'shared/model/bible/broadcast';

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
        currentConfig.fontFileId +
        currentConfig.addressPanel.height) +
    windowResizeUpdatesNum +
    useAtomValue(isBroadcastTextVisibleAtom);

  return useBibleBroadcastScreenFontSizeAdapter(content, subUpdater);
};
