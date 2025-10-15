import { useBibleSlideText } from '$bible/shared/hooks/useBibleSlideText';
import { BibleTranslationJoinAddress } from '$bible/shared/model/base';

export function BibleBroadcastArchiveJoinedContentText({ item }: { item: BibleTranslationJoinAddress }) {
  return <>{useBibleSlideText(item, true)}</>;
}
