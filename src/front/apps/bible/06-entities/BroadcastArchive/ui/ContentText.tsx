import { BibleBroadcastTextMapBlocks } from '$bible/features/BroadcastTextMapBlocks';
import { useBibleSlideMapBlocks } from '$bible/shared/hooks/useBibleSlideText';
import { BibleBroadcastAddress } from '$bible/shared/model/base';

export const BibleBroadcastArchiveContentText = ({ item }: { item: BibleBroadcastAddress }) => {
  return (
    <BibleBroadcastTextMapBlocks
      isTextOnly
      Elem="span"
      blocks={useBibleSlideMapBlocks(item, true, false)}
    />
  );
};
