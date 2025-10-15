import { makeBibleJoinedAddressText } from '$bible/shared/hooks/texts';
import { BibleTranslationJoinAddress } from '$bible/shared/model/base';

export function BibleBroadcastArchiveJoinedAddressText({ item }: { item: BibleTranslationJoinAddress }) {
  return <>{makeBibleJoinedAddressText(item, 'short')}</>;
}
