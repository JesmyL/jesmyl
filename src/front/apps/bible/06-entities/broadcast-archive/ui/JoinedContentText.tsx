import { useBibleSlideText } from '$bible/shared/hooks/useBibleSlideText';
import { BibleBroadcastJoinAddress } from '$bible/shared/model/base';

export function BibleBroadcastArchiveJoinedContentText({ item }: { item: BibleBroadcastJoinAddress }) {
  return <>{useBibleSlideText(item, true)}</>;
}
