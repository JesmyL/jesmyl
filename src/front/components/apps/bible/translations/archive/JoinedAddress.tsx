import { useBibleJoinedAddressText } from '$bible/hooks/texts';
import { BibleTranslationJoinAddress } from '$bible/model';

export function BibleTranslationArchiveJoinedAddressText({ item }: { item: BibleTranslationJoinAddress }) {
  return <>{useBibleJoinedAddressText(item, 1)}</>;
}
