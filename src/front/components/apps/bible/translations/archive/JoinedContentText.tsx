import { useBibleJoinedSlideText } from '$bible/hooks/texts';
import { BibleTranslationJoinAddress } from '$bible/model';

export function BibleTranslationArchiveJoinedContentText({ item }: { item: BibleTranslationJoinAddress }) {
  return <>{useBibleJoinedSlideText(item, true)}</>;
}
