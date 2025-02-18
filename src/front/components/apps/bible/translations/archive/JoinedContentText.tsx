import { BibleTranslationJoinAddress } from '../../../../../07-basis/model/bible';
import { useBibleJoinedSlideText } from '../../hooks/texts';

export default function BibleTranslationArchiveJoinedContentText({ item }: { item: BibleTranslationJoinAddress }) {
  return <>{useBibleJoinedSlideText(item, true)}</>;
}
