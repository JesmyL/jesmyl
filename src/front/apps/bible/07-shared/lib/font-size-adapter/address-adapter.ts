import { isBroadcastTextVisibleAtom } from '#features/broadcast/atoms';
import { useBibleBroadcastScreenFontSizeAdapter } from '#shared/lib/hooks/useFontSizeAdapter';
import { useAtomValue } from 'atomaric';
import { BibleBroadcastScreenConfig } from 'shared/model/bible/broadcast';

export const useBibleBroadcastScreenFontSizeAddressAdapter = (
  content: string,
  currentConfig: BibleBroadcastScreenConfig | und,
) => {
  return useBibleBroadcastScreenFontSizeAdapter(
    content,
    '' +
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
