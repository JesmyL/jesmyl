import { useBibleSimpleAddressText } from '../../hooks/texts';
import { BibleTranslationSingleAddress } from '../../model';

export const BibleTranslationArchiveSingleAddressText = ({ item }: { item: BibleTranslationSingleAddress }) => {
  return <>{useBibleSimpleAddressText(...item, 1)}</>;
};
