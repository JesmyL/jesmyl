import { useBibleSimpleAddressText } from '@bible/hooks/texts';
import { BibleTranslationSingleAddress } from '@bible/model';

export function BibleTranslationArchiveSingleAddressText({ item }: { item: BibleTranslationSingleAddress }) {
  return <>{useBibleSimpleAddressText(...item, 1)}</>;
}
