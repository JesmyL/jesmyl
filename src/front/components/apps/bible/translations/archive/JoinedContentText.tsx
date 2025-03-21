import { useBibleSlideText } from '$bible/basis/lib/hooks/useBibleSlideText';
import { BibleTranslationJoinAddress } from '$bible/basis/model/base';

export function BibleTranslationArchiveJoinedContentText({ item }: { item: BibleTranslationJoinAddress }) {
  return <>{useBibleSlideText(item, true)}</>;
}
