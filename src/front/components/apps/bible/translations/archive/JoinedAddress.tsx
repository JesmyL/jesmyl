import { makeBibleJoinedAddressText } from '$bible/basis/lib/hooks/texts';
import { BibleTranslationJoinAddress } from '$bible/basis/model/base';

export function BibleTranslationArchiveJoinedAddressText({ item }: { item: BibleTranslationJoinAddress }) {
  return <>{makeBibleJoinedAddressText(item, 1)}</>;
}
