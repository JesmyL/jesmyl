import { BibleBroadcastTextMapBlocks } from '$bible/features/BroadcastTextMapBlocks';
import { useBibleSlideMapBlocks } from '$bible/shared/hooks/useBibleSlideText';
import { BibleBroadcastSingleAddress } from '$bible/shared/model/base';

export function BibleBroadcastArchiveSingleContentText({ item }: { item: BibleBroadcastSingleAddress }) {
  return (
    <BibleBroadcastTextMapBlocks
      isTextOnly
      Elem="span"
      blocks={useBibleSlideMapBlocks(item, true)}
    />
  );
}
