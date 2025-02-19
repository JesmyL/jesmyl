import { useBibleJoinedSlideText } from '../../hooks/texts';
import { BibleTranslationJoinAddress } from '../../model';

export const BibleTranslationArchiveJoinedContentText = ({ item }: { item: BibleTranslationJoinAddress }) => {
  return <>{useBibleJoinedSlideText(item, true)}</>;
};
