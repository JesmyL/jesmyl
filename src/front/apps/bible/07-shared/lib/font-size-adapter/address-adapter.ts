import { isBroadcastTextVisibleAtom } from '#features/broadcast/atoms';
import { useBibleBroadcastScreenFontSizeAdapter } from '#shared/lib/hooks/useFontSizeAdapter';
import { useAtomValue } from 'atomaric';
import { BibleBroadcastScreenConfig } from 'shared/model/bible/broadcast';

export const useBibleBroadcastScreenFontSizeAddressAdapter = (
  content: string,
  currentConfig: BibleBroadcastScreenConfig | und,
  windowResizeUpdatesNum: number | und,
) => {
  return useBibleBroadcastScreenFontSizeAdapter(
    content,
    '' +
      windowResizeUpdatesNum +
      useAtomValue(isBroadcastTextVisibleAtom) +
      (currentConfig === undefined
        ? '-'
        : currentConfig.address.height +
          currentConfig.address.width +
          currentConfig.fontWeight +
          currentConfig.bgFileId +
          currentConfig.fontFileId +
          currentConfig.addressPanel.height),
  );
};
