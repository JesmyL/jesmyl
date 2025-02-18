import { BibleTranslationJoinAddress } from '../../../../../07-basis/model/bible';
import { useBibleJoinedAddressText } from '../../hooks/texts';

export default function BibleTranslationArchiveJoinedAddressText({ item }: { item: BibleTranslationJoinAddress }) {
  return <>{useBibleJoinedAddressText(item, 1)}</>;
}
