import { BibleTranslationSingleAddress } from '../../../../../07-basis/model/bible';
import { useBibleSimpleAddressText } from '../../hooks/texts';

export default function BibleTranslationArchiveSingleAddressText({ item }: { item: BibleTranslationSingleAddress }) {
  return <>{useBibleSimpleAddressText(...item, 1)}</>;
}
