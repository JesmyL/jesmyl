import { BibleTranslationJoinAddress } from '../../model';
import { useBibleJoinedSlideText } from '../hooks/texts';

export const BibleTranslationArchiveJoinedContentText = ({ item }: { item: BibleTranslationJoinAddress }) => {
  return <>{useBibleJoinedSlideText(item, true)}</>;
};
