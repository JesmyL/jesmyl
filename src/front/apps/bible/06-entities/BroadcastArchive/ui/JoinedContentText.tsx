import { BibleBroadcastTextMapBlocks } from '$bible/features/BroadcastTextMapBlocks';
import { useBibleSlideMapBlocks } from '$bible/shared/hooks/useBibleSlideText';
import { BibleBroadcastJoinAddress } from '$bible/shared/model/base';

export function BibleBroadcastArchiveJoinedContentText({ item }: { item: BibleBroadcastJoinAddress }) {
  return (
    <BibleBroadcastTextMapBlocks
      isTextOnly
      Elem="span"
      blocks={useBibleSlideMapBlocks(item, true)}
    />
  );
}
