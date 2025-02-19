import { useBibleJoinedAddressText } from '../../hooks/texts';
import { BibleTranslationJoinAddress } from '../../model';

export const BibleTranslationArchiveJoinedAddressText = ({ item }: { item: BibleTranslationJoinAddress }) => {
  return <>{useBibleJoinedAddressText(item, 1)}</>;
};
