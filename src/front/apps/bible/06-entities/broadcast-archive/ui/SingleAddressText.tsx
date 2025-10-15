import { makeBibleJoinedAddressText } from '$bible/shared/hooks/texts';
import { BibleTranslationSingleAddress } from '$bible/shared/model/base';

export function BibleBroadcastArchiveSingleAddressText({ item }: { item: BibleTranslationSingleAddress }) {
  return <>{makeBibleJoinedAddressText(item, 'short')}</>;
}
