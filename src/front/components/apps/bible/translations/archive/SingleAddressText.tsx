import { useBibleSimpleAddressText } from '@bible/shared/translations/hooks/address';
import { BibleTranslationSingleAddress } from '../../model';

export const BibleTranslationArchiveSingleAddressText = ({ item }: { item: BibleTranslationSingleAddress }) => {
  return <>{useBibleSimpleAddressText(...item, 1)}</>;
};
