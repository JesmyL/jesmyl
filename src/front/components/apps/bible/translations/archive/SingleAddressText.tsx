import { makeBibleJoinedAddressText } from '$bible/basis/lib/hooks/texts';
import { BibleTranslationSingleAddress } from '$bible/basis/model/base';

export function BibleTranslationArchiveSingleAddressText({ item }: { item: BibleTranslationSingleAddress }) {
  return <>{makeBibleJoinedAddressText(item, 1)}</>;
}
