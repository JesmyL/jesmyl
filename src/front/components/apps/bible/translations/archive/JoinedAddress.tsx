import { BibleTranslationJoinAddress } from '../../model';
import { useBibleJoinedAddressText } from '../hooks/texts';

export const BibleTranslationArchiveJoinedAddressText = ({ item }: { item: BibleTranslationJoinAddress }) => {
  return <>{useBibleJoinedAddressText(item, 1)}</>;
};
